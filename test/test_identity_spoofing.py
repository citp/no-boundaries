from selenium.common.exceptions import NoSuchElementException
from openwpmtest import OpenWPMTest
from ..automation import TaskManager, CommandSequence
from ..automation.utilities import db_utils
import utilities as util

DOM_EMAIL = 'jeromecisco@hotmail.com'
DOM_NAME = 'Jerome Cisco'


class TestIdentitySpoofing(OpenWPMTest):
    NUM_BROWSERS = 1

    def get_config(self, data_dir=""):
        manager_params, browser_params = self.get_test_config(data_dir)
        browser_params[0]['js_instrument'] = True
        browser_params[0]['spoof_identity']['enabled'] = True
        return manager_params, browser_params

    def test_real_script_interception(self):
        """Verify that we redirect requests to platform.js to a noop"""
        manager_params, browser_params = self.get_config()
        browser_params[0]['spoof_identity']['dom'] = True
        manager = TaskManager.TaskManager(manager_params, browser_params)
        test_url = util.BASE_TEST_URL + '/simple_a.html'

        # Verify that DOM contains identity
        def check_dom_identity(**kwargs):
            driver = kwargs['driver']

            # Verify that we can grep the email
            try:
                elem = driver.find_element_by_xpath(
                    "//*[text()[contains(.,'@hotmail.com')]]")
            except NoSuchElementException:
                assert False  # assert because otherwise browser will catch
            assert elem.get_attribute('innerHTML') == DOM_EMAIL

            # Verify that we can grep the name
            try:
                elem = driver.find_element_by_xpath(
                    "//*[text()[contains(.,'Welcome')]]")
            except NoSuchElementException:
                assert False  # assert because otherwise browser will catch
            assert elem.get_attribute('innerHTML') == "Welcome %s!" % DOM_NAME

        cs = CommandSequence.CommandSequence(test_url, blocking=True)
        cs.get(sleep=2, timeout=60)
        cs.run_custom_function(check_dom_identity)
        manager.execute_command_sequence(cs)
        manager.close()
        assert not db_utils.any_command_failed(manager_params['db'])
