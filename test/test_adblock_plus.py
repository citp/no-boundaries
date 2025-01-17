from urlparse import urlparse
import pytest
import os

from ..automation import TaskManager
from ..automation.Errors import BrowserConfigError
from ..automation.utilities.platform_utils import fetch_adblockplus_list
from ..automation.utilities import domain_utils, db_utils

import utilities
from openwpmtest import OpenWPMTest

psl = domain_utils.get_psl()

ADBLOCKPLUS = {
    "%s/abp/adblock_plus_test.html" % utilities.BASE_TEST_URL,
    # favicon request is made to URL without a path
    "%s/favicon.ico" % utilities.BASE_TEST_URL_NOPATH}


class TestABP(OpenWPMTest):

    def get_config(self, data_dir=""):
        manager_params, browser_params = self.get_test_config(data_dir)
        browser_params[0]['http_instrument'] = True
        browser_params[0]['adblock-plus'] = True
        return manager_params, browser_params

    def test_list_fetch(self, tmpdir):
        data_dir = str(tmpdir)
        fetch_adblockplus_list(data_dir)
        assert os.path.isfile(os.path.join(data_dir, 'patterns.ini'))
        assert os.path.isfile(os.path.join(data_dir, 'elemhide.css'))

    def test_blocks_includes(self, tmpdir):
        data_dir = str(tmpdir)
        list_loc = os.path.join(data_dir, 'adblock_plus')
        manager_params, browser_params = self.get_config(data_dir)
        fetch_adblockplus_list(list_loc)
        browser_params[0]['adblock-plus_list_location'] = list_loc
        manager = TaskManager.TaskManager(manager_params, browser_params)
        manager.get(utilities.BASE_TEST_URL + '/abp/adblock_plus_test.html')
        manager.close()

        db = os.path.join(data_dir, manager_params['database_name'])
        rows = db_utils.query_db(db, "SELECT url FROM http_requests")
        urls = set()
        for url, in rows:
            ps1 = psl.get_public_suffix(urlparse(url).hostname)
            # exclude requests to safebrowsing and tracking protection backends
            if ps1 not in ("mozilla.com", "mozilla.net"):
                urls.add(url)
        assert urls == ADBLOCKPLUS

    def test_error_with_missing_option(self):
        manager_params, browser_params = self.get_config()
        with pytest.raises(BrowserConfigError):
            manager = TaskManager.TaskManager(manager_params, browser_params)
            manager.close()

    def test_error_with_missing_list(self, tmpdir):
        data_dir = str(tmpdir)
        list_loc = os.path.join(data_dir, 'adblock_plus')
        manager_params, browser_params = self.get_config(data_dir)
        browser_params[0]['adblock-plus_list_location'] = list_loc
        with pytest.raises(BrowserConfigError):
            manager = TaskManager.TaskManager(manager_params, browser_params)
            manager.close()
