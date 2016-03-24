from urlparse import urlparse
import tarfile
import pytest # NOQA
import os

from ..automation import TaskManager
import utilities

TEST_SITES = [
    'http://google.com',
    'http://facebook.com',
    'http://youtube.com',
    'http://yahoo.com',
    'http://baidu.com',
    'http://wikipedia.org',
    'http://qq.com',
    'http://linkedin.com',
    'http://taobao.com',
    'http://twitter.com',
    'http://live.com',
    'http://amazon.com',
    'http://sina.com.cn',
    'http://google.co.in',
    'http://hao123.com',
    'http://blogspot.com',
    'http://weibo.com',
    'http://wordpress.com',
    'http://yandex.ru',
    'http://yahoo.co.jp'
]

psl = utilities.get_psl()


class TestCrawl():
    """ Runs a short test crawl.

    This should be used to test any features that require real
    crawl data. This should be avoided if possible, as controlled
    tests will be easier to debug
    """
    NUM_BROWSERS = 1

    def get_config(self, data_dir):
        manager_params, browser_params = TaskManager.load_default_params(self.NUM_BROWSERS)
        manager_params['data_directory'] = data_dir
        manager_params['log_directory'] = data_dir
        manager_params['db'] = os.path.join(manager_params['data_directory'],
                                            manager_params['database_name'])
        browser_params[0]['profile_archive_dir'] = os.path.join(data_dir, 'browser_profile')
        browser_params[0]['headless'] = True
        return manager_params, browser_params

    @pytest.mark.slow
    def test_browser_profile_coverage(self, tmpdir):
        """ Test the coverage of the browser's profile

        This verifies that Firefox's places.sqlite database contains
        all visited sites (with a few exceptions). If it does not,
        it is likely the profile is lost at some point during the crawl
        """
        # Run the test crawl
        data_dir = os.path.join(str(tmpdir), 'data_dir')
        manager_params, browser_params = self.get_config(data_dir)
        manager = TaskManager.TaskManager(manager_params, browser_params)
        for site in TEST_SITES:
            manager.get(site)
        ff_db_tar = os.path.join(browser_params[0]['profile_archive_dir'],
                                 'profile.tar.gz')
        manager.close(post_process=False)

        # Extract crawl profile
        with tarfile.open(ff_db_tar) as tar:
            tar.extractall(browser_params[0]['profile_archive_dir'])

        # Output databases
        ff_db = os.path.join(browser_params[0]['profile_archive_dir'],
                             'places.sqlite')
        crawl_db = manager_params['db']

        # Grab urls from crawl database
        rows = utilities.query_db(crawl_db, "SELECT url FROM http_requests")
        req_ps = set()
        for url, in rows:
            req_ps.add(psl.get_public_suffix(urlparse(url).hostname))

        hist_ps = set()
        successes = dict()
        rows = utilities.query_db(crawl_db, "SELECT arguments, bool_success "
                                  "FROM CrawlHistory WHERE command='GET'")
        for url, success in rows:
            ps = psl.get_public_suffix(urlparse(url).hostname)
            hist_ps.add(ps)
            successes[ps] = success

        # Grab urls from Firefox database
        profile_ps = set()
        rows = utilities.query_db(ff_db, "SELECT url FROM moz_places")
        for host, in rows:
            try:
                profile_ps.add(psl.get_public_suffix(urlparse(host).hostname))
            except AttributeError:
                pass

        # We expect urls to be in the Firefox profile if:
        # 1. We've made requests to it
        # 2. The url is a top_url we entered into the address bar
        # 3. The url successfully loaded (see: Issue #40)
        # 4. The site does not respond to the initial request with a 204 (won't show in FF DB)
        missing_urls = req_ps.intersection(hist_ps).difference(profile_ps)
        unexpected_missing_urls = set()
        for url in missing_urls:
            if successes[url] == 0 or successes[url] == -1:
                continue

            rows = utilities.query_db(crawl_db,
                                      "SELECT COUNT(*) FROM http_responses "
                                      "WHERE top_url = ?",
                                      ('http://' + url,))
            if rows[0] > 1:
                continue
            rows = utilities.query_db(crawl_db,
                                      "SELECT response_status, location FROM "
                                      "http_responses WHERE top_url = ?",
                                      ('http://' + url,))
            response_status, location = rows[0]
            if response_status == 204:
                continue
            if location == 'http://':
                continue
            unexpected_missing_urls.add(url)

        assert len(unexpected_missing_urls) == 0
