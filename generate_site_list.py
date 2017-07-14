from bs4 import BeautifulSoup
import multiprocess
import urlparse
import requests
import json
import os

from automation.utilities import domain_utils as du
import crawl_utils

DATA_DIR = os.path.join(os.path.dirname(__file__), 'data')
SAMPLED_SITES = 'sampled_sites.json'
ALL_INTERNAL_LINKS = 'homepage_links.json'
USER_AGENT = 'Mozilla/5.0 (X11; Linux x86_64; rv:45.0) Gecko/20100101 Firefox/45.0'  # noqa


def get_internal_links(site):
    """Request and parse internal links from `site`"""
    headers = requests.utils.default_headers()
    headers.update({'User-Agent': USER_AGENT})
    try:
        try:
            resp = requests.get('http://'+site, headers=headers, timeout=60)
        except Exception as e:
            resp = requests.get('http://www.'+site, headers=headers,
                                timeout=60)
        if resp.status_code != 200:
            print "Non-200 response code %i for site %s" % (
                resp.status_code, site)
            return (site, None)
        if resp.content is None:
            print "No content returned for site %s" % site
            return (site, None)

        # Current URL after HTTP Redirects
        current_url = resp.url
        top_ps1 = du.get_ps_plus_1(current_url)

        # Find all internal a tags
        soup = BeautifulSoup(resp.content, 'lxml')
        links = set()
        for tag in soup.find_all('a'):
            href = tag.get('href')
            if href is None:
                continue
            href = urlparse.urljoin(current_url, href)
            if (not href.startswith('http') or
                    du.get_ps_plus_1(href) != top_ps1):
                continue
            links.add(urlparse.urldefrag(href)[0])
        return site, list(links)
    except (KeyboardInterrupt, SystemExit):
        raise
    except Exception as e:
        print "Exception while requesting %s\n%s" % (site, str(e))
        return (site, None)


def collect_homepage_links(sites, nprocesses=35):
    """Collect all homepage links for the given list of `sites`"""
    pool = multiprocess.Pool(processes=nprocesses)
    results = pool.map(get_internal_links,
                       [x[1] for x in sites],
                       chunksize=100)
    pool.close()
    pool.join()
    print "Saving results to disk %s" % ALL_INTERNAL_LINKS
    with open(ALL_INTERNAL_LINKS, 'w') as f:
        json.dump(results, f)


def sample_top_1m():
    return crawl_utils.get_sampled_sites(
        location=DATA_DIR,
        include_rank=True,
        slices=[(15000, 0, 15000),
                (15000, 15000, 100000),
                (20000, 100000, 1000000)]
    )


if __name__ == '__main__':
    sites = sample_top_1m()
    collect_homepage_links(sites)
