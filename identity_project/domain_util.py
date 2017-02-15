from publicsuffix import PublicSuffixList, fetch
from ipaddress import ip_address
from urlparse import urlparse
import codecs
import os

BASE_DIR = os.path.dirname(__file__)
PSL_CACHE_LOC = os.path.join(BASE_DIR, '../data/public_suffix_list.dat')


def get_psl():
    """
    Grabs an updated public suffix list.
    """
    if not os.path.isfile(PSL_CACHE_LOC):
        print "%s does not exist, downloading a copy." % PSL_CACHE_LOC
        psl_file = fetch()
        with codecs.open(PSL_CACHE_LOC, 'w', encoding='utf8') as f:
            f.write(psl_file.read())
    psl_cache = codecs.open(PSL_CACHE_LOC, encoding='utf8')
    return PublicSuffixList(psl_cache)


def is_ip_address(hostname):
    """
    Check if the given string is a valid IP address
    """
    try:
        ip_address(unicode(hostname))
        return True
    except ValueError:
        return False


def get_ps_plus_1(url, psl):
    """
    Returns the PS+1 of the url. This will also return
    an IP address if the hostname of the url is a valid
    IP address
    """
    hostname = urlparse(url).hostname
    if is_ip_address(hostname):
        return hostname
    else:
        return psl.get_public_suffix(hostname)


def hostname_subparts(url, psl, include_ps=False):
    """
    Returns a list of slices of a url's hostname down to the PS+1
    (or PS if include_ps)

    For example: http://a.b.c.d.com/path?query#frag would yield:
        [a.b.c.d.com, b.c.d.com, c.d.com, d.com] if include_ps == False
        [a.b.c.d.com, b.c.d.com, c.d.com, d.com, com] if include_ps == True
    """
    hostname = urlparse(url).hostname

    # If an IP address, just return a single item list with the IP
    if is_ip_address(hostname):
        return [hostname]

    subparts = list()
    ps_plus_1 = psl.get_public_suffix(hostname)

    # We expect all ps_plus_1s to have at least one '.'
    # If they don't, the url was likely malformed, so we'll just return an
    # empty list
    if '.' not in ps_plus_1:
        return []
    subdomains = hostname[:-(len(ps_plus_1)+1)].split('.')
    if subdomains == ['']:
        subdomains = []
    for i in range(len(subdomains)):
        subparts.append('.'.join(subdomains[i:])+'.'+ps_plus_1)
    subparts.append(ps_plus_1)
    if include_ps:
        try:
            subparts.append(ps_plus_1[ps_plus_1.index('.')+1:])
        except:
            pass
    return subparts


def get_stripped_url(url, scheme=False):
    """Returns a url stripped to (scheme)?+hostname+path"""
    purl = urlparse(url)
    surl = ''
    if scheme:
        surl += purl.scheme + '://'
    if purl.hostname is None:
        print "Empty hostname, corrupted url? %s" % url
        return None
    if purl.path is not None:
        return surl + purl.hostname + purl.path
    else:
        return surl + purl.hostname


def get_stripped_urls(urls, scheme=False):
    """ Returns a set (or list) of urls stripped to (scheme)?+hostname+path """
    new_urls = list()
    for url in urls:
        get_stripped_url(url, scheme)
    if type(urls) == set:
        return set(new_urls)
    return new_urls
