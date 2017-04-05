""" A collection of utilities for crawl scripts """
from StringIO import StringIO
import requests
import zipfile
import random
import shutil
import glob
import os

EC2_LIST = 'http://s3.amazonaws.com/alexa-static/top-1m.csv.zip'


def get_top_1m(location):
    """
    Returns list of top 1 million sites. If no list exists
    for the current day, a new one is fetched
    @param location lists where raw list is cached
    """
    location = os.path.expanduser(location)
    site_list = os.path.join(location, 'top-1m.csv')
    if not os.path.isfile(site_list):
        print "%s does not exist, downloading a copy." % site_list
        resp = requests.get(EC2_LIST)
        with zipfile.ZipFile(StringIO(resp.content), 'r') as zpf:
            contents = zpf.read(zpf.infolist()[0])
        if not os.path.isdir(location):
            os.makedirs(location)
        with open(site_list, 'w') as f:
            f.write(contents)
    else:
        with open(site_list, 'r') as f:
            contents = f.read()

    return [x.split(',')[-1] for x in contents.split('\n')]


def sample_top_sites(location):
    """
    Returns a subsample of 35k sites sliced from the top 1 million:

    [1, 10k]    - all sites
    (10k, 100k] - 10k sites
    (100k, 1M]  - 15k sites
    """
    location = os.path.expanduser(location)
    site_list = os.path.join(location, 'sampled-sites.csv')
    if not os.path.isfile(site_list):
        top_1m = get_top_1m(location)
        sites = top_1m[0:10000]
        sites.extend(random.sample(top_1m[10000:100000], 10000))
        sites.extend(random.sample(top_1m[100000:], 15000))
        if not os.path.isdir(location):
            os.makedirs(location)
        with open(site_list, 'w') as f:
            for site in sites:
                f.write(site + '\n')
    else:
        with open(site_list, 'r') as f:
            sites = f.read().strip().split('\n')
    return sites


def clear_tmp_folder():
    """
    Clear the tmp folder of directories / files that
    may have been missed during cleanup.
    """
    tmpfiles = glob.glob('/tmp/tmp*')
    for tmpfile in tmpfiles:
        try:
            shutil.rmtree(tmpfile)
        except OSError:
            pass
    tmpfiles = glob.glob('/tmp/.X*-lock')
    for tmpfile in tmpfiles:
        try:
            os.remove(tmpfile)
        except OSError:
            pass
