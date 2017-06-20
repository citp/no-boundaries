from selenium.common.exceptions import NoSuchElementException
from openwpmtest import OpenWPMTest
from ..automation import TaskManager, CommandSequence
from ..automation.utilities import db_utils
from ..automation.Commands.utils import form_utils
import utilities as util

DOM_EMAIL = 'jeromecisco@hotmail.com'
DOM_NAME = 'Jerome Cisco'
DOM_LOGIN = form_utils.DOM_LOGIN_ELEMS + ['submit']
DOM_CHECKOUT = form_utils.DOM_CHECKOUT_ELEMS + ['submit']

FILL_EMAIL = form_utils.FORM_FILL_EMAIL
FILL_PASSWORD = form_utils.FORM_FILL_PASSWORD

COOKIES = {
    u'xxx-name': u'ChiefWiggins',
    u'xxx-email': u'chief_wiggins@hotmail.com',
    u'xxx-uid': u'36732d0b-a127-4903-83a9-482cbcb56aef'
}

IFRAME_URL = u'https://rawgit.com/englehardt/e05f7b95f4713f94a70a9c0c55bad067/raw/160a3582fafece3e3287085f9d601e5e2b649a41/blank.html'  # noqa
TOP_LEVEL_URL = u'http://localtest.me:8000/test_pages/simple_with_iframe.html'


class TestIdentitySpoofing(OpenWPMTest):
    NUM_BROWSERS = 1

    def get_config(self, data_dir=""):
        manager_params, browser_params = self.get_test_config(data_dir)
        browser_params[0]['js_instrument'] = True
        browser_params[0]['http_instrument'] = True
        browser_params[0]['spoof_identity']['enabled'] = True
        return manager_params, browser_params

    def test_dom_and_storage_spoofing(self):
        """Verify that dom and storage spoofing functionality

        This verifies that DOM and Storage spoofing functions insert the
        correct elements into the DOM (and iframes). It also verifies that
        the honeypot form filling function works as expected."""
        manager_params, browser_params = self.get_config()
        browser_params[0]['spoof_identity']['dom_identity'] = True
        browser_params[0]['spoof_identity']['dom_checkout'] = True
        browser_params[0]['spoof_identity']['dom_login'] = True
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

            # Check main frame, should have both DOM and cookies
            assert get_email() == DOM_EMAIL
            assert get_login() == DOM_LOGIN
            assert get_checkout() == DOM_CHECKOUT
            assert DOM_NAME in get_name()
            assert get_cookies() == COOKIES

            # Check iframe, should have DOM but NOT cookies
            iframe = driver.find_element_by_tag_name('iframe')
            driver.switch_to_frame(iframe)
            assert get_email() == DOM_EMAIL
            assert get_login() == DOM_LOGIN
            assert get_checkout() == DOM_CHECKOUT
            assert DOM_NAME in get_name()
            assert get_cookies() == dict()

        # Verify that forms have been filled
        def check_form_filling(**kwargs):
            driver = kwargs['driver']

            def verify_spoofed_login_elements():
                form = driver.find_element_by_id('dom-login-credentials')
                elem = form.find_element_by_name('username')
                assert elem.get_attribute('value') == FILL_EMAIL

                elem = form.find_element_by_name('password')
                assert elem.get_attribute('value') == FILL_PASSWORD

            def verify_spoofed_checkout_elements():
                form = driver.find_element_by_id('dom-checkout-payment')
                for elem_name in form_utils.DOM_CHECKOUT_ELEMS:
                    elem = form.find_element_by_name(elem_name)
                    assert (elem.get_attribute('value') ==
                            form_utils.FORM_FILL_CHECKOUT[elem_name])

            # Check main frame and iframe
            # All spoofed elements should be present and filled in both
            driver.switch_to_default_content()
            verify_spoofed_login_elements()
            verify_spoofed_checkout_elements()
            iframe = driver.find_element_by_tag_name('iframe')
            driver.switch_to_frame(iframe)
            verify_spoofed_login_elements()
            verify_spoofed_checkout_elements()

        cs = CommandSequence.CommandSequence(test_url, blocking=True)
        cs.get(sleep=2, timeout=60)
        cs.run_custom_function(check_dom_and_storage)
        cs.run_custom_function(form_utils.fill_spoofed_elements_and_submit,
                               timeout=60)
        cs.run_custom_function(check_form_filling)
        manager.execute_command_sequence(cs)
        manager.close()
        assert not db_utils.any_command_failed(manager_params['db'])
