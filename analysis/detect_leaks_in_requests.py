import multiprocessing as mp
import LeakDetector
import sqlite3
import json
import time
import sys
import os

sys.path.append('../automation/utilities/')
import domain_utils as du  # noqa

CHUNKSIZE = 100000

# This assumes a folder structure like:
# DATA_DIR/2017-06-03_crawl_1/2017-06-03_crawl_1.sqlite
# DATA_DIR/2017-06-20_crawl_2/2017-06-20_crawl_2.sqlite
# DATA_DIR/...
# DATA_DIR/analysis/2017-06-03_crawl_1/<analysis_file_1>
# DATA_DIR/analysis/2017-06-03_crawl_1/<analysis_file_2>
# DATA_DIR/analysis/2017-06-20_crawl_2/...
# DATA_DIR/analysis/...
DATA_DIR = '***REMOVED***/identity_tracking_decompressed/'
OUT_BASE = os.path.join(DATA_DIR, 'analysis')

if len(sys.argv) < 4:
    print ("Usage: detect_leaks_in_requests.py <db_folder> <output_name> "
           "<search_string_1> ... <search_string_n>")
    sys.exit(1)

db_file = os.path.join(DATA_DIR, sys.argv[1], sys.argv[1] + '.sqlite')
output_dir = os.path.join(OUT_BASE, sys.argv[1])
if not os.path.isdir(output_dir):
    os.mkdir(output_dir)
output_file = os.path.join(output_dir, sys.argv[2])
search_strings = sys.argv[3:]

print ("\n\nInput parameters:\nDatabase path:\n\t%s\nOutput file:\n\t%s\n"
       "Search strings:\n\t%s" % (db_file, output_file, search_strings))

detector = LeakDetector.LeakDetector(
    search_strings, encoding_set=LeakDetector.ENCODINGS_NO_ROT,
    encoding_layers=3, hash_layers=3
)


def check_row_for_leaks(args):
    url, headers, post_body = args
    url_leaks = detector.check_url(url)
    cookie_leaks = detector.check_cookies(headers)
    post_leaks = detector.substring_search(post_body, max_layers=2)
    return url_leaks, cookie_leaks, post_leaks


con = sqlite3.connect(db_file)
con.row_factory = sqlite3.Row
cur = con.cursor()

total = tuple(cur.execute("SELECT MAX(id) FROM http_requests").fetchone())[0]
print "Total number of requests to process: %i" % total

cur.execute("SELECT r.id, r.crawl_id, r.visit_id, r.url, r.top_level_url, "
            "sv.site_url, sv.first_party, sv.site_rank, r.method, r.referrer, "
            "r.headers, r.loading_href, r.req_call_stack, "
            "r.content_policy_type, r.post_body, r.time_stamp "
            "FROM http_requests as r LEFT JOIN site_visits as sv "
            "ON r.visit_id = sv.visit_id;")

pool = mp.Pool(processes=mp.cpu_count() - 1)

output = list()
counter = 0
start_time = time.time()
while True:
    counter += 1
    rows = cur.fetchmany(CHUNKSIZE)
    if len(rows) == 0:
        break
    tp_rows = list()
    for row in rows:
        if (row['top_level_url'] is not None and row['top_level_url'] != ''
                and du.get_ps_plus_1(row['site_url']) != du.get_ps_plus_1(row['url'])  # noqa
                and du.get_ps_plus_1(row['site_url']) == du.get_ps_plus_1(row['top_level_url'])):  # noqa
            tp_rows.append(row)

    results = pool.map(
        check_row_for_leaks,
        [(x['url'], x['headers'], x['post_body']) for x in tp_rows]
    )

    # Save rows with leaks
    with open(output_file, 'a') as f:
        for i in range(len(results)):
            if any(map(lambda x: len(x) > 0, results[i])):
                output = tuple(tp_rows[i]) + results[i]
                f.write(json.dumps(output) + '\n')
    if counter % 30 == 0:
        print "Processed: %i | Time %0.2f" % (
            counter*CHUNKSIZE, time.time() - start_time)
pool.close()
pool.join()
print "Total time: %0.2f" % (time.time() - start_time)
