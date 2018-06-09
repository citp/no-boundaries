import multiprocessing as mp
import LeakDetector
import sqlite3
import json
import time
import sys
import os
from os.path import dirname

sys.path.append('../automation/utilities/')
import domain_utils as du  # noqa
from common import FORM_FILLING_MARK, FORM_SUBMISSION_MARK
import df_utils as dfu

# This assumes a folder structure like:
# DATA_DIR/2017-06-03_crawl_1/2017-06-03_crawl_1.sqlite
# DATA_DIR/2017-06-20_crawl_2/2017-06-20_crawl_2.sqlite
# DATA_DIR/...
# DATA_DIR/analysis/2017-06-03_crawl_1/<analysis_file_1>
# DATA_DIR/analysis/2017-06-03_crawl_1/<analysis_file_2>
# DATA_DIR/analysis/2017-06-20_crawl_2/...
# DATA_DIR/analysis/...
DATA_DIR = '***REMOVED***/identity_tracking_decompressed/'
if not os.path.isdir(DATA_DIR):
    DATA_DIR = '/media/***REMOVED***/Data/dev/no_boundaries/'
if not os.path.isdir(DATA_DIR):
    DATA_DIR = '***REMOVED***/identity_tracking'
OUT_BASE = os.path.join(DATA_DIR, 'analysis')


CHECK_REFERRER_LEAKS = True


def check_row_for_leaks(args):
    url, headers, post_body = args
    url_leaks = detector.check_url(url)
    url_leaks += detector.substring_search(url, max_layers=2)
    cookie_leaks = detector.check_cookies(headers)
    cookie_str = detector.get_cookie_str(headers, from_request=True)
    cookie_leaks += detector.substring_search(cookie_str, max_layers=2)
    post_leaks = detector.substring_search(post_body, max_layers=2)
    if CHECK_REFERRER_LEAKS:
        referrer_leaks = detector.check_referrer_header(headers)
        referrer_str = detector.get_referrer_str(headers)
        referrer_leaks += detector.substring_search(referrer_str, max_layers=2)
        return url_leaks, cookie_leaks, post_leaks, referrer_leaks
    else:
        return url_leaks, cookie_leaks, post_leaks


def check_resp_row_for_leaks(args):
    url, headers, location = args
    url_leaks = detector.check_url(url)
    url_leaks += detector.substring_search(url)
    set_cookie_leaks = detector.check_cookies(headers, from_request=False)
    cookie_str = detector.get_cookie_str(headers, from_request=False)
    set_cookie_leaks += detector.substring_search(cookie_str, max_layers=2)
    location_leaks = detector.check_location_header(location)
    location_str = detector.get_location_str(headers)
    location_leaks += detector.substring_search(location_str, max_layers=2)
    return url_leaks, set_cookie_leaks, location_leaks


########################################


if len(sys.argv) < 5:
    print ("Usage: detect_leaks_in_requests.py <db_folder> <output_name> <where_to_search>"
           "<search_string_1> ... <search_string_n>")
    sys.exit(1)

db_file = os.path.join(DATA_DIR, sys.argv[1], sys.argv[1] + '.sqlite')
output_dir = os.path.join(OUT_BASE, sys.argv[1])
if not os.path.isdir(output_dir):
    try:
        os.mkdir(output_dir)
    except Exception:
        cwd = os.getcwd()
        print "Cannot create directory in %s, will write to %s" % (output_dir,
                                                                   cwd)
        output_dir = cwd

output_file = os.path.join(output_dir, sys.argv[2])
where_to_search = sys.argv[3]  # requests or responses
search_strings = sys.argv[4:]

SEARCH_UPPER_CASE = True

if SEARCH_UPPER_CASE:
    search_strings_upper_case = [search_string.upper()
                                 for search_string in search_strings]
    search_strings = list(set(search_strings + search_strings_upper_case))
    print search_strings

print ("\n\nInput parameters:\nDatabase path:\n\t%s\nOutput file:\n\t%s\n"
       "where to search: %s\n"
       "Search strings:\n\t%s" % (db_file, output_file, where_to_search,
                                  search_strings))

detector = LeakDetector.LeakDetector(
    search_strings, encoding_set=LeakDetector.ENCODINGS_NO_ROT,
    encoding_layers=2, hash_layers=2
)

print "Will connect to DB", db_file
con = sqlite3.connect(db_file)
con.row_factory = sqlite3.Row
cur = con.cursor()

num_requests = tuple(cur.execute("SELECT MAX(id) FROM http_requests").fetchone())[0]
print "Total number of requests to process: %i" % num_requests

if where_to_search == "requests":
    cur.execute("SELECT r.id, r.crawl_id, r.visit_id, r.url, r.top_level_url, "
                "sv.site_url, sv.first_party, sv.site_rank, "
                "r.method, r.referrer, r.headers, r.loading_href, "
                "r.req_call_stack, r.content_policy_type, r.post_body, "
                "r.time_stamp FROM http_requests as r LEFT JOIN site_visits as"
                " sv ON r.visit_id = sv.visit_id "
                "WHERE r.method NOT IN ('%s', '%s');" %
                (FORM_FILLING_MARK, FORM_SUBMISSION_MARK))
elif where_to_search == "responses":
    cur.execute("SELECT r.id, r.crawl_id, r.visit_id, r.url, "
                "sv.site_url, sv.first_party, sv.site_rank, "
                "r.method, r.referrer, r.headers, r.response_status, "
                "r.location, r.time_stamp FROM http_responses as r "
                "LEFT JOIN site_visits as sv ON r.visit_id = sv.visit_id"
                " WHERE r.method NOT IN ('%s', '%s');" %
                (FORM_FILLING_MARK, FORM_SUBMISSION_MARK))
else:
    raise ValueError("<where_to_search> must be either requests' or 'responses'")

n_cpu = mp.cpu_count() - 1
print "Will use %s workers in parallel" % n_cpu
pool = mp.Pool(processes=n_cpu)

if n_cpu > 16:
    # cluster specific code
    # read in all requests at once to memory
    CHUNKSIZE = num_requests
else:
    CHUNKSIZE = 100000

# If set to True, it'd only work for request leak detection
ONLY_SEARCH_IN_THIRD_PARTY_HTTP = False
output = list()
counter = 0
start_time = time.time()
while True:
    counter += 1
    rows = cur.fetchmany(CHUNKSIZE)
    if len(rows) == 0:
        break
    tp_rows = list()
    if ONLY_SEARCH_IN_THIRD_PARTY_HTTP:
        # This is a major change: we start to look for leaks in the first
        # party requests/responses
        # This was the case for the form filling crawl, we now extend it to
        # other crawls.
        # TODO: Filter 3rd p requests and responses at the analysis stage
        # Having first party leaks is necessary when detecting the origin of
        #  the leaks or "first leaks"
        for row in rows:
            if (row['top_level_url'] is not None and row['top_level_url'] != ''
                    and du.get_ps_plus_1(row['site_url']) != du.get_ps_plus_1(row['url'])  # noqa
                    and du.get_ps_plus_1(row['site_url']) == du.get_ps_plus_1(row['top_level_url'])):  # noqa
                tp_rows.append(row)
        rows = tp_rows

    if where_to_search == "requests":
        results = pool.map(
            check_row_for_leaks,
            [(x['url'], x['headers'], x['post_body']) for x in rows]
        )
    else:
        results = pool.map(
            check_resp_row_for_leaks,
            [(x['url'], x['headers'], x['location']) for x in rows])

    # Save rows with leaks
    with open(output_file, 'a') as f:
        for i in range(len(results)):
            if any(map(lambda x: len(x) > 0, results[i])):
                output = tuple(rows[i]) + results[i]
                f.write(json.dumps(output) + '\n')
    if counter % 10 == 0:
        processed = counter * CHUNKSIZE
        progress = 100 * processed / float(num_requests)
        elapsed = time.time() - start_time
        speed = processed / elapsed
        remaining = (num_requests - processed)/speed
        print "Processed: %i (%0.2f) Speed: %d rows/s | Elapsed %0.2f | "
        "Remaining %d (mins)" % (processed, progress, speed, elapsed,
                                 remaining / 60)

pool.close()
pool.join()
print "Total time: %0.2f" % (time.time() - start_time)
