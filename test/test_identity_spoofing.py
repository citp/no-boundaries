from selenium.common.exceptions import NoSuchElementException
from openwpmtest import OpenWPMTest
from ..automation import TaskManager, CommandSequence
from ..automation.utilities import db_utils
import utilities as util

DOM_EMAIL = 'jeromecisco@hotmail.com'
DOM_NAME = 'Jerome Cisco'

COOKIES = {
    u'xxx-name': u'ChiefWiggins',
    u'xxx-email': u'chief_wiggins@hotmail.com',
    u'xxx-uid': u'36732d0b-a127-4903-83a9-482cbcb56aef'
}


class TestIdentitySpoofing(OpenWPMTest):
    NUM_BROWSERS = 1

    def get_config(self, data_dir=""):
        manager_params, browser_params = self.get_test_config(data_dir)
        browser_params[0]['js_instrument'] = True
        browser_params[0]['spoof_identity']['enabled'] = True
        return manager_params, browser_params

    def test_dom_and_storage_spoofing(self):
        """Verify that we redirect requests to platform.js to a noop"""
        manager_params, browser_params = self.get_config()
        browser_params[0]['spoof_identity']['dom'] = True
        browser_params[0]['spoof_identity']['storage'] = True
        manager = TaskManager.TaskManager(manager_params, browser_params)
        test_url = util.BASE_TEST_URL + '/simple_with_iframe.html'

        # Verify that DOM contains identity
        def check_dom_and_storage(**kwargs):
            driver = kwargs['driver']

            def get_email():
                try:
                    elem = driver.find_element_by_xpath(
                        "//*[text()[contains(.,'@hotmail.com')]]")
                except NoSuchElementException:
                    return ''
                return elem.get_attribute('innerHTML')

            def get_name():
                try:
                    elem = driver.find_element_by_xpath(
                        "//*[text()[contains(.,'Welcome')]]")
                except NoSuchElementException:
                    return ''
                return elem.get_attribute('innerHTML')

            def get_cookies():
                cookies = dict()
                for cookie in driver.get_cookies():
                    if cookie['name'] == '__cfduid':
                        continue
                    cookies[cookie['name']] = cookie['value']
                return cookies

            # Check main frame, should have both DOM and cookies
            assert get_email() == DOM_EMAIL
            assert DOM_NAME in get_name()
            assert get_cookies() == COOKIES

            # Check iframe, should have DOM but NOT cookies
            iframe = driver.find_element_by_tag_name('iframe')
            driver.switch_to_frame(iframe)
            assert get_email() == DOM_EMAIL
            assert DOM_NAME in get_name()
            assert get_cookies() == dict()

        cs = CommandSequence.CommandSequence(test_url, blocking=True)
        cs.get(sleep=2, timeout=60)
        cs.run_custom_function(check_dom_and_storage)
        manager.execute_command_sequence(cs)
        manager.close()
        assert not db_utils.any_command_failed(manager_params['db'])
