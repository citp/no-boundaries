import pytest
import utilities
from openwpmtest import OpenWPMTest
from ..automation import TaskManager
from ..automation import CommandSequence
from ..automation.utilities import db_utils


def fill_out_form(**kwargs):
    """ Check if webdriver self-identification attributes in the DOM"""
    driver = kwargs['driver']
    # TODO
    pass


class TestDOMExfiltration(OpenWPMTest):
    """This is not a part of the automated test suite."""
    BASE_DOMAIN = utilities.BASE_TEST_URL + '/DOM_exfiltration_masking/'

    def get_config(self, data_dir=""):
        return self.get_test_config(data_dir)

    def run_dom_exfiltration_test(self, test_type):
        manager_params, browser_params = self.get_config()
        browser_params[0]['headless'] = False
        browser_params[0]['record_js_errors'] = True
        manager = TaskManager.TaskManager(manager_params, browser_params)
        test_url = self.BASE_DOMAIN + 'index.html?test_type=%s' % test_type
        cs = CommandSequence.CommandSequence(test_url, blocking=True)
        cs.get(sleep=30, timeout=60)
        cs.run_custom_function(fill_out_form)
        manager.execute_command_sequence(cs)
        manager.close()
        assert not db_utils.any_command_failed(manager_params['db'])

    def test_userreplay(self):
        self.run_dom_exfiltration_test("userreplay")

    def test_sessioncam(self):
        self.run_dom_exfiltration_test("sessioncam")

    def test_skimlinks(self):
        self.run_dom_exfiltration_test("skimlinks")
