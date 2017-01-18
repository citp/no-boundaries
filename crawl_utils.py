""" A collection of utilities for crawl scripts """
from StringIO import StringIO
import requests
import zipfile
import shutil
import glob
import os

def get_top_1m(location):
    """
    Returns list of top 1 million sites. If no list exists
    for the current day, a new one is fetched
    @param location lists where raw list is cached
    """
    location = os.path.expanduser(location)
    site_list = os.path.join(location,'top-1m.csv')
    if not os.path.isfile(site_list):
        print "%s does not exist, downloading a copy." % site_list
        resp = requests.get('http://s3.amazonaws.com/alexa-static/top-1m.csv.zip')
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
