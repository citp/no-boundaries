from openwpmtest import OpenWPMTest
from ..automation.utilities import db_utils
import expected


class TestFBAPICalls(OpenWPMTest):

    def get_config(self, data_dir=""):
        manager_params, browser_params = self.get_test_config(data_dir)
        browser_params[0]['js_instrument'] = True
        return manager_params, browser_params

    def test_fb_api_calls(self):
        db = self.visit('/fb_api/fb_login.html', sleep_after=20)
        rows = db_utils.get_javascript_entries(db)
        observed_calls = set()
        for row in rows:
            if row[2] != 'call':
                continue
            observed_calls.add(row)
        assert set(expected.fb_api_calls) == observed_calls

    def test_fake_first_party_sdk(self):
        """Make sure we can fake a first party that loads and initializes
        the FB SDK.
        """
        db = self.visit('/fb_api/fb_api_call_no_first_party.html',
                        sleep_after=10)
        rows = db_utils.get_javascript_entries(db)
        observed_calls = set()
        for row in rows:
            if row[2] != 'call':
                continue
            observed_calls.add(row)
        assert (set(expected.fb_api_fake_first_party_sdk_calls) ==
                observed_calls)
