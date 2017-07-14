from collections import defaultdict
import random
import glob
import json
import os
import re

from automation.utilities import domain_utils as du

DATA_DIR = os.path.join(os.path.dirname(__file__), 'data')
LINKS_FILE = 'homepage_links.json'
ALEXA = 'top-1m.csv'
LOW_PRIORITY_LINKS = ['privacy[^/]*policy',
                      'terms[^/]*of[^/]*service',
                      'terms[^/]*of[^/]*use',
                      '[^a-zA-Z]tos([^a-zA-Z]|$)',
                      '[^a-zA-Z]privacy([^a-zA-Z]|$)',
                      '[^a-zA-Z]terms([^a-zA-Z]|$)']
SIGNUP_LINKS = ['sign[^/]{0,1}in', 'log[^/]{0,1}in',
                'sign[^/]{0,1}up', 'register', 'subscribe',
                'create[^/]*account', 'join', 'newsletter']

# Data collected with requests crawl
REQUESTS_LINKS = os.path.join(DATA_DIR, LINKS_FILE)
OUTPUT_CRAWL_SITES = os.path.join(DATA_DIR, 'sites_to_crawl.json')
OUTPUT_CRAWL_SITES_FORM = os.path.join(DATA_DIR,
                                       'sites_to_crawl_form_filling.json')
OUTPUT_BAD_SITES = os.path.join(DATA_DIR, 'bad_sites_from_sample.txt')

# Data collected with OpenWPM crawl
OPENWPM_LINKS_DIR = '***REMOVED***/identity_tracking/internal_links_openwpm'
OPENWPM_OUTPUT_SITES = os.path.join(DATA_DIR, 'openwpm_sites_to_crawl.json')
OPENWPM_OUTPUT_SITES_FORM = os.path.join(
    DATA_DIR, 'openwpm_sites_to_crawl_form_filling.json')


def _load_top_1m():
    with open(os.path.join(DATA_DIR, ALEXA), 'r') as f:
        sites = [x.strip().split(',') for x in f.read().strip().split('\n')]
    ranked = dict()
    for rank, site in sites:
        ranked[site] = int(rank) - 1  # start at 0
    return ranked


def _load_links(location):
    """ load links gathered with requests"""
    with open(location, 'r') as f:
        return json.load(f)


def _load_links_from_openwpm(location):
    """ load links gathered with openwpm"""
    site_links = list()
    bad_sites = list()
    for link_file in glob.glob(os.path.join(location, '*')):
        with open(link_file, 'r') as f:
            site, links = json.load(f)
        if len(links) == 0:
            bad_sites.append(site)
        site_links.append([site, links])
    print "Number of links with empty internal sets: %i" % len(bad_sites)
    return site_links


def _check_keywords(keywords, url):
    """Return True if any keyword in `keywords` matches `url`"""
    for keyword in keywords:
        if re.search(keyword, url):
            return True
    return False


def sample_links_for_all_sites(all_links, low_priority=[],
                               high_priority=[], n=5):
    """Sample `n` links for all sites in dataset

    Parameters
    ----------
    all_links : list
        All links to sample from. Format: [<site_url>, [<link1>, <link2>, ...]]
    low_priority : list or str
        Keywords to avoid when sampling urls. Regex matching supported.
    high_priority : list of str
        Keywords to prefer when sampling urls. Regex matching supported.
    n : int
        Maximum number of links to sample per site

    Returns
    -------
    list of tuples
        Sampled links in the format: (url, alexa_rank, top_url)
    list of str
        List of sites which have no links (likely failures)
    """
    site_rank = _load_top_1m()
    crawl_list = list()
    bad_sites = list()
    for site_url, links in all_links:
        if links is None:
            bad_sites.append(site_url)
            continue
        if len(links) == 0:
            bad_sites.append(site_url)
            continue
        for url in sample_links(site_url, links, n=n,
                                low_priority=low_priority,
                                high_priority=high_priority):
            crawl_list.append((url, site_rank[site_url], site_url))
    return crawl_list, bad_sites


def sample_links(site_url, links, low_priority=[], high_priority=[], n=5):
    """Sample `n` links from `links`

    Parameters
    ----------
    site_url : str
        URL of site `links` are collected form
    links : list
        Links in the form: [<link1>, <link2>, <link3>, ...]
    low_priority : list or str
        Keywords to avoid when sampling urls. Regex matching supported.
    high_priority : list of str
        Keywords to prefer when sampling urls. Regex matching supported.
    n : int
        Maximum number of links to sample per site

    Returns
    -------
    list of tuples
        Sampled links in the format: (url, alexa_rank, top_url)
    """
    if links is None or len(links) == 0:
        return
    # Group links by stripped url
    stripped_links = dict()
    stripped_links['low'] = defaultdict(set)
    stripped_links['normal'] = defaultdict(set)
    stripped_links['high'] = defaultdict(set)
    for link in links:
        if not link.startswith('http'):
            continue
        try:
            surl = du.get_stripped_url(link)
        except TypeError:
            continue
        match = _check_keywords(high_priority, link)
        if match:
            stripped_links['high'][surl].add(link)
            continue
        match = _check_keywords(low_priority, link)
        if match:
            stripped_links['low'][surl].add(link)
            continue
        stripped_links['normal'][surl].add(link)

    # Shuffle the urls
    shuffled_links = dict()
    for priority, mapping in stripped_links.iteritems():
        shuffled_links[priority] = dict()
        for surl, links in mapping.iteritems():
            shuffled_links[priority][surl] = list(links)
            random.shuffle(shuffled_links[priority][surl])

    crawl_links = ['http://'+site_url]  # include homepage
    for priority in ['high', 'normal', 'low']:
        mapping = shuffled_links[priority]
        keys = random.sample(mapping.keys(), min(len(mapping.keys()), n))
        if len(keys) == 0 or len(crawl_links) >= n+1:
            continue

        # Sample the bins in the mapping
        all_zero = False
        while len(crawl_links) < n+1 and not all_zero:
            all_zero = True
            for key in keys:
                if len(crawl_links) >= n+1:
                    break
                if len(mapping[key]) == 0:
                    continue
                crawl_links.append(mapping[key].pop())
                all_zero = False
    return crawl_links


def sample_requests_links():
    print "Loading links from %s" % REQUESTS_LINKS
    all_links = _load_links(REQUESTS_LINKS)

    print "Sampling links for most crawls..."
    crawl_list, bad_sites = sample_links_for_all_sites(
        all_links, low_priority=LOW_PRIORITY_LINKS)
    with open(OUTPUT_CRAWL_SITES, 'w') as f:
        json.dump(crawl_list, f)
    with open(OUTPUT_BAD_SITES, 'w') as f:
        for site in bad_sites:
            f.write(site + '\n')
    print "Done!"

    print "Sampling links for form filling..."
    crawl_list, bad_sites = sample_links_for_all_sites(
        all_links, low_priority=LOW_PRIORITY_LINKS,
        high_priority=SIGNUP_LINKS
    )
    with open(OUTPUT_CRAWL_SITES_FORM, 'w') as f:
        json.dump(crawl_list, f)
    print "Done!"


def sample_openwpm_links():
    print "Loading links from %s" % REQUESTS_LINKS
    all_links = _load_links_from_openwpm(OPENWPM_LINKS_DIR)

    print "Sampling links for most crawls..."
    crawl_list, bad_sites = sample_links_for_all_sites(
        all_links, low_priority=LOW_PRIORITY_LINKS)
    with open(OPENWPM_OUTPUT_SITES, 'w') as f:
        json.dump(crawl_list, f)
    print "Done!"

    print "Sampling links for form filling..."
    crawl_list, bad_sites = sample_links_for_all_sites(
        all_links, low_priority=LOW_PRIORITY_LINKS,
        high_priority=SIGNUP_LINKS
    )
    with open(OPENWPM_OUTPUT_SITES_FORM, 'w') as f:
        json.dump(crawl_list, f)
    print "Done!"
