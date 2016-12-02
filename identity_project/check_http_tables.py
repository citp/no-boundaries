from urlparse import urlparse
from collections import defaultdict, Counter
import numpy as np
import plyvel
import difflib
import sqlite3
import os

DATA_DIR = '/mnt/ssd/2016-12_500_http_differences_test_8/'

con = sqlite3.connect(os.path.join(DATA_DIR,
                    '2016-12_500_http_differences_test_8.sqlite'))
cur = con.cursor()
cur.execute("PRAGMA cache_size = -%i" % (0.1 * 10**7)) # 10 GB
cur.execute("PRAGMA temp_store = 2") # Store temp tables, indicies in memory

# Create an index if necessary
cur.execute("CREATE INDEX IF NOT EXISTS request_visit_id_index ON "
            "http_requests (visit_id)")
cur.execute("CREATE INDEX IF NOT EXISTS request_ext_visit_id_index ON "
            "http_requests_ext (visit_id)")
cur.execute("CREATE INDEX IF NOT EXISTS response_visit_id_index ON "
            "http_responses (visit_id)")
cur.execute("CREATE INDEX IF NOT EXISTS response_ext_visit_id_index ON "
            "http_responses_ext (visit_id)")
cur.execute("CREATE INDEX IF NOT EXISTS javascript_content_hash_index ON "
            "http_responses (content_hash)")
cur.execute("CREATE INDEX IF NOT EXISTS javascript_ext_content_hash_index ON "
            "http_responses_ext (content_hash)")

def fetchiter(cursor, arraysize=10000):
    """ Generator for cursor results """
    while True:
        rows = cursor.fetchmany(arraysize)
        if rows == []:
            break
        for row in rows:
            yield row

def strip_url(url):
    url = urlparse(url)
    if url is None or url == '':
        return
    try:
        surl = url.scheme + '://' + url.hostname + url.path
    except TypeError:
        try:
            surl = url.scheme + '://' + url.hostname
        except TypeError:
            print "Unexpected Error"
            print url
            return
    return surl

# Site visits
site_visits = dict()
cur.execute("SELECT visit_id, site_url FROM site_visits;")
for visit_id, site_url in cur.fetchall():
    site_visits[visit_id] = site_url

def diff_records(new_url_set, old_url_set):
    ids = set(new_url_set.keys()).intersection(set(old_url_set.keys()))
    new_gt_old = dict()
    old_gt_new = dict()
    equal = 0
    for row_id in ids:
        new = new_url_set[row_id]
        old = old_url_set[row_id]
        if len(new) > len(old):
            new_gt_old[row_id] = len(new) - len(old)
        elif len(old) > len(new):
            old_gt_new[row_id] = len(old) - len(new)
        else:
            equal += 1

    print "Number of requests equal: %i, # old > new: %i, # new > old: %i" % (
            equal, len(old_gt_new), len(new_gt_old))
    print "Average/Median # of additional requests in old: %0.2f, %0.2f" % (
            np.mean(old_gt_new.values()), np.median(old_gt_new.values()))
    print "Average/Median # of additional requests in new: %0.2f, %0.2f" % (
            np.mean(new_gt_old.values()), np.median(new_gt_old.values()))

    for row_id in old_gt_new.keys():
        print "\n\n" + site_visits[row_id]
        print old_url_set[row_id].difference(new_url_set[row_id])
        print new_url_set[row_id].difference(old_url_set[row_id])

    #for row_id in new_gt_old.keys():
    #    print "\n\n" + site_visits[row_id]
    #    print new_url_set[row_id].difference(old_url_set[row_id])

def diff_counts(new, old):
    for key in sorted(old.keys()):
        old_count = old[key]
        try:
            new_count = new[key]
            if new_count >= old_count:
                continue
            print "Key: %s | Old: %i | New: %i" % (str(key), old_count, new_count)
        except KeyError:
            print "New doesn't have key: %s" % str(key)

"""
HTTP REQUESTS
"""

ids = set()
def get_request_set(table_name):
    url_set = defaultdict(set)
    url_count = Counter()
    rowids = defaultdict(set)
    print "Grabbing requests from %s" % table_name
    cur.execute("SELECT id, visit_id, url FROM %s WHERE visit_id < 500" % table_name)
    for rowid, visit_id, url in fetchiter(cur):
        ids.add(visit_id)
        surl = strip_url(url)
        url_set[visit_id].add(surl)
        url_count[(visit_id, surl)] += 1
        rowids[(visit_id, surl)].add(rowid)

    return url_set, url_count, rowids

old_url_set, old_url_count, old_rowids = get_request_set("http_requests")
new_url_set, new_url_count, new_rowids = get_request_set("http_requests_ext")

diff_records(new_url_set, old_url_set)
diff_counts(new_url_count, old_url_count)

diff_records(new_url_set, old_url_set)

"""
HTTP Responses
"""

ids = set()
def get_response_set(table_name):
    url_set = defaultdict(set)
    url_count = Counter()
    rowids = defaultdict(set)
    print "Grabbing responses from %s" % table_name
    cur.execute("SELECT id, visit_id, url, referrer, response_status, location "
                "FROM %s WHERE visit_id < 500" % table_name)
    for rowid, visit_id, url, referrer, response_status, location in fetchiter(cur):
        ids.add(visit_id)
        surl = strip_url(url)
        url_set[visit_id].add(surl)
        url_count[(visit_id, surl)] += 1
        rowids[(visit_id, surl)].add(rowid)

    return url_set, url_count, rowids


old_url_set, old_url_count, old_rowids = get_response_set("http_responses")
new_url_set, new_url_count, new_rowids = get_response_set("http_responses_ext")

diff_records(new_url_set, old_url_set)
diff_counts(new_url_count, old_url_count)

"""
Javascript
"""

def get_diff(content1, content2):
    d = difflib.Differ()
    diff = d.compare(content1, content2)
    missing_content = list()
    for line in diff:
        if line[0:2] == '  ' or line[0:2] == '+ ':
            continue
        missing_content.append(line)
    return missing_content

def print_diff(content1, content2):
    d = difflib.Differ()
    diff = d.compare(content1, content2)
    output = ''
    for line in diff:
        if line[0:2] == '  ':
            continue
        output += line[2:]
    print output


ldb = plyvel.DB(os.path.join(DATA_DIR,'javascript.ldb'),
        create_if_missing = False,
        compression='snappy',
        lru_cache_size = 10**9,
        write_buffer_size = 128*10**4,
        bloom_filter_bits = 128)

old_js = dict()
old_loaded_js = defaultdict(set)
cur.execute("SELECT visit_id, url, content_hash FROM http_responses "
            "WHERE content_hash IS NOT NULL AND visit_id < 500;")
for visit_id, url, content_hash in fetchiter(cur):
    old_loaded_js[visit_id].add(url)
    surl = strip_url(url)
    if surl == None or surl == '':
        print ""
        print url
        print surl
        print visit_id
        print content_hash
    old_js[(visit_id,surl)] = ldb.get(str(content_hash))

new_js = dict()
new_loaded_js = defaultdict(set)
cur.execute("SELECT visit_id, url, content_hash FROM http_responses_ext "
            "WHERE content_hash IS NOT NULL AND visit_id < 500;")
for visit_id, url, content_hash in fetchiter(cur):
    new_loaded_js[visit_id].add(url)
    surl = strip_url(url)
    new_js[(visit_id,surl)] = ldb.get(str(content_hash))

same_same = set()
same_diff = dict()
not_in = set()
for key, old_content in old_js.iteritems():
    try:
        if new_js[key] == old_content:
            same_same.add(key)
            continue
        print "\nSame key, different content for:"
        print key
        same_diff[key] = (old_content, new_js[key])
    except KeyError:
        print "\nExtension does not have javascript for:"
        print key
        not_in.add(key)

cp_types = Counter()
for visit_id, surl in not_in:
    cur.execute("SELECT content_policy_type FROM http_requests_ext WHERE "
                "visit_id = ? AND url LIKE ?", (visit_id, surl + '%'))
    print str(visit_id) + surl
    for item in cur.fetchall():
        cp_types[item] += 1
        print item

# After going through 30 or so scripts this seems to be mostly encoding
# differences
#for key, content in same_diff.iteritems():
#    old_content, new_content = content
#    diff = get_diff(old_content, new_content)
#    if len(diff) > 0:
#        print ""
#        print key
#        print diff
