from urlparse import urlparse
from collections import defaultdict
import numpy as np
import sqlite3

#con = sqlite3.connect('/mnt/ssd/2016-10_identity_crawl_form_filling/2016-10_identity_crawl_form_filling.sqlite')
#con = sqlite3.connect('/mnt/ssd/2016-10_identity_test_crawl/2016-10_identity_test_crawl.sqlite')
con = sqlite3.connect('/mnt/ssd/2016-11_http_differences_test/2016-11_http_differences_test.sqlite')
cur = con.cursor()
cur.execute("PRAGMA cache_size = -%i" % (0.1 * 10**7)) # 10 GB
cur.execute("PRAGMA temp_store = 2") # Store temp tables, indicies in memory

def fetchiter(cursor, arraysize=10000):
    """ Generator for cursor results """
    while True:
        rows = cursor.fetchmany(arraysize)
        if rows == []:
            break
        for row in rows:
            yield row

ids = set()
old_urls = set()
print "Grabbing requests from http_requests table"
cur.execute("SELECT visit_id, url FROM http_requests")
for visit_id, url in fetchiter(cur):
    ids.add(visit_id)
    url = urlparse(url)
    if url is None or url == '':
        continue
    try:
        surl = url.scheme + '://' + url.hostname + url.path
    except TypeError:
        try:
            surl = url.scheme + '://' + url.hostname
        except TypeError:
            print "Unexpected Error"
            print url
            continue
    old_urls.add((visit_id,surl))
old_url_set = defaultdict(set)
for visit_id, surl in old_urls:
    old_url_set[visit_id].add(surl)

new_urls = set()
print "Grabbing requests from http_requests_ext table"
cur.execute("SELECT visit_id, url FROM http_requests_ext")
for visit_id, url in fetchiter(cur):
    ids.add(visit_id)
    purl = urlparse(url)
    if purl is None or purl == '':
        continue
    try:
        surl = purl.scheme + '://' + purl.hostname + purl.path
    except TypeError:
        try:
            surl = purl.scheme + '://' + purl.hostname
        except TypeError:
            print "Unexpected Error"
            print purl
            continue
    new_urls.add((visit_id,surl))
new_url_set = defaultdict(set)
for visit_id, surl in new_urls:
    new_url_set[visit_id].add(surl)

site_visits = dict()
cur.execute("SELECT visit_id, site_url FROM site_visits;")
for visit_id, site_url in cur.fetchall():
    site_visits[visit_id] = site_url

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

print "Number of requests equal: %i, # old > new: %i, # new > old: %i" % (equal, len(old_gt_new), len(new_gt_old))
print "Average/Median # of additional requests in old: %0.2f, %0.2f" % (np.mean(old_gt_new.values()), np.median(old_gt_new.values()))
print "Average/Median # of additional requests in new: %0.2f, %0.2f" % (np.mean(new_gt_old.values()), np.median(new_gt_old.values()))

for row_id in old_gt_new.keys():
    print "\n\n" + site_visits[row_id]
    print old_url_set[row_id].difference(new_url_set[row_id])

for row_id in new_gt_old.keys():
    print "\n\n" + site_visits[row_id]
    print new_url_set[row_id].difference(old_url_set[row_id])

with open('bad_sites.txt', 'w') as f:
    for row_id in set(old_gt_new.keys()).union(set(new_gt_old.keys())):
        f.write(site_visits[row_id] + '\n')
