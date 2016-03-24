import pytest # NOQA
import os
from openwpmtest import OpenWPMTest
from ..automation import TaskManager
import utilities
import expected


class TestFBAPICalls(OpenWPMTest):
    NUM_BROWSERS = 1

    def get_config(self, data_dir):
        manager_params, browser_params = TaskManager.load_default_params(self.NUM_BROWSERS)
        manager_params['data_directory'] = data_dir
        manager_params['log_directory'] = data_dir
        browser_params[0]['headless'] = True
        browser_params[0]['extension']['enabled'] = True
        browser_params[0]['extension']['jsInstrument'] = True
        manager_params['db'] = os.path.join(manager_params['data_directory'],
                                            manager_params['database_name'])
        return manager_params, browser_params

    def test_fb_api_calls(self, tmpdir):
        db = self.visit('/fb_api/fb_login.html', str(tmpdir), sleep_after=20)
        rows = utilities.get_javascript_entries(db)
        assert expected.fb_api_calls == rows

    def test_fake_first_party_sdk(self, tmpdir):
        """Make sure we can fake a first party that loads and initializes
        the FB SDK.
        """
        db = self.visit('/fb_api/fb_api_call_no_first_party.html', str(tmpdir),
                        sleep_after=10)
        rows = utilities.get_javascript_entries(db)
        assert expected.fb_api_fake_first_party_sdk_calls == rows
