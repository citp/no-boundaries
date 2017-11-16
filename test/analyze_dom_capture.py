from selenium.common.exceptions import NoSuchElementException
from openwpmtest import OpenWPMTest
from ..automation import TaskManager, CommandSequence
from ..automation.utilities import db_utils
from ..automation.Commands.utils import form_utils
import utilities as util


class TestIdentitySpoofing(OpenWPMTest):
    NUM_BROWSERS = 1
    BASE_DOMAIN = util.BASE_TEST_URL + '/DOM_exfiltration_masking/'

    def get_config(self, data_dir=""):
        manager_params, browser_params = self.get_test_config(data_dir)
        browser_params[0]['js_instrument'] = True
        browser_params[0]['http_instrument'] = True
        browser_params[0]['spoof_identity']['enabled'] = True
        browser_params[0]['spoof_identity']['dom_chunk'] = True

        return manager_params, browser_params

    def print_js_entries(self, db, test_type):
        rows = db_utils.get_javascript_entries(db)
        for script_url, symbol, operation, value, arguments in rows:
            print test_type, script_url, symbol, operation, value, arguments

    def run_dom_exfiltration_test(self, test_type):
        manager_params, browser_params = self.get_config()
        manager = TaskManager.TaskManager(manager_params, browser_params)
        if test_type in ["yandex", "fullstory", "hotjar"]:
            # use localhost instead of localtest.me
            localhost_domain = self.BASE_DOMAIN.replace("localtest.me",
                                                        "localhost")
            test_url = localhost_domain + test_type + "/"
        elif test_type == "clicktale":
            test_url = "http://intel.com"
        else:
            test_url = self.BASE_DOMAIN + 'index.html?test_type=%s' % test_type

        cs = CommandSequence.CommandSequence(test_url, blocking=True)
        cs.get(sleep=3, timeout=60)
        manager.execute_command_sequence(cs)
        manager.close()
        return manager_params['db']

    def test_userreplay(self):
        db = self.run_dom_exfiltration_test("userreplay")
        self.print_js_entries(db, test_type="userreplay")

    def test_sessioncam(self):
        db = self.run_dom_exfiltration_test("sessioncam")
        self.print_js_entries(db, test_type="sessioncam")

    def test_skimlinks(self):
        db = self.run_dom_exfiltration_test("skimlinks")
        self.print_js_entries(db, test_type="skimlinks")

    def test_hotjar(self):
        db = self.run_dom_exfiltration_test("hotjar")
        self.print_js_entries(db, test_type="hotjar")

    def test_fullstory(self):
        db = self.run_dom_exfiltration_test("fullstory")
        self.print_js_entries(db, test_type="fullstory")

    def test_yandex(self):
        db = self.run_dom_exfiltration_test("yandex")
        self.print_js_entries(db, test_type="yandex")

    def test_clicktale(self):
        db = self.run_dom_exfiltration_test("clicktale")
        self.print_js_entries(db, test_type="clicktale")
