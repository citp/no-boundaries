from selenium.common.exceptions import NoSuchElementException
from openwpmtest import OpenWPMTest
from ..automation import TaskManager, CommandSequence
from ..automation.utilities import db_utils
from ..automation.Commands.utils import form_utils
import utilities as util


class TestIdentitySpoofing(OpenWPMTest):
    NUM_BROWSERS = 1

    def get_config(self, data_dir=""):
        manager_params, browser_params = self.get_test_config(data_dir)
        browser_params[0]['js_instrument'] = True
        browser_params[0]['http_instrument'] = True
        browser_params[0]['spoof_identity']['enabled'] = True
        browser_params[0]['spoof_identity']['dom_chunk'] = True

        return manager_params, browser_params

    def test_dom_and_storage_spoofing(self):
        """Verify that dom and storage spoofing functionality

        This verifies that DOM and Storage spoofing functions insert the
        correct elements into the DOM (and iframes). It also verifies that
        the honeypot form filling function works as expected."""
        manager_params, browser_params = self.get_config()
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

            def get_login():
                try:
                    elem = driver.find_element_by_id("dom-login-credentials")
                except NoSuchElementException:
                    return []
                return [x.get_attribute('name') for x in
                        elem.find_elements_by_tag_name('input')]

            def get_checkout():
                try:
                    elem = driver.find_element_by_id("dom-checkout-payment")
                except NoSuchElementException:
                    return []
                return [x.get_attribute('name') for x in
                        elem.find_elements_by_tag_name('input')]

            def get_cookies():
                cookies = dict()
                for cookie in driver.get_cookies():
                    if cookie['name'] == '__cfduid':
                        continue
                    cookies[cookie['name']] = cookie['value']
                return cookies

            def get_chunk():
                try:
                    chunk_id = "injected-for-research-purposes-contact-at-webtap.princeton.edu"  # noqa
                    el = driver.find_element_by_id(chunk_id)
                    return el.text
                except NoSuchElementException:
                    return ""

            # Check main frame, should have both DOM and cookies
            assert len(get_chunk()) == 500000
            assert get_email() == ''
            assert get_login() == []
            assert get_checkout() == []
            assert get_name() == ''
            assert get_cookies() == {}

            # Check iframe, shouldn't have anything
            iframe = driver.find_element_by_tag_name('iframe')
            driver.switch_to_frame(iframe)
            assert len(get_chunk()) == 0
            assert get_email() == ''
            assert get_login() == []
            assert get_checkout() == []
            assert get_name() == ''
            assert get_cookies() == {}

        cs = CommandSequence.CommandSequence(test_url, blocking=True)
        cs.get(sleep=2, timeout=60)
        cs.run_custom_function(check_dom_and_storage)
        manager.execute_command_sequence(cs)
        manager.close()
        assert not db_utils.any_command_failed(manager_params['db'])
