import json
import pytest
import utilities
from base64 import b64decode
from openwpmtest import OpenWPMTest
from ..automation import TaskManager
from ..automation import CommandSequence
from ..automation.utilities import db_utils
from time import sleep
from selenium.common.exceptions import WebDriverException

DISPLAYED_DATA = {
    "name": "Betty G. Forbes",
    "email": "BettyGForbes@teleworm.us",
    "emailC": "BettyGForbes@teleworm.us",
    "phone": "816-598-7768",
    "ship-address": "797 White Oak Drive",
    "ship-city": "Blue Springs",
    "ship-state": "MO",
    "ship-zip": "64015",
    "ship-country": "United States of America",
    "maiden-name": "Johns",
    "ssn": "078-05-1120",
    "birthday": "September 30, 1971",
    "username": "Evety1971",
    "password": "Ohph0Eo8aeSh",
    "website": "TrafficMoms.com",
    "profession": "Sales engineer",
    "ccname": "Betty G. Forbes",
    "cardnumber": "5221 2537 9417 5916",
    "cardnumber_lastfour": "5916",
    "cvc": "221",
    "cc-exp": "5/2022"
    }

FORM_DATA = {
    "name": "Jeff J. Ryan",
    "email": "JeffJRyan@armyspy.com",
    "emailC": "JeffJRyan@armyspy.com",
    "phone": "408-635-1896",
    "ship-address": "416 Friendship Lane",
    "ship-city": "Milpitas",
    "ship-state": "CA",
    "ship-zip": "95035",
    "ship-country": "France",
    "maiden-name": "Kuhn",
    "ssn": "554-40-1120",
    "birthday": "July 5, 1977",
    "username": "Pokeed",
    "password": "ooZaegh8",
    "website": "coloursinice.com",
    "profession": "Employee relations manager",
    "ccname": "Jeff J. Ryan",
    "cardnumber": "4539 2182 6707 4391",
    "cardnumber_lastfour": "4391",
    "cvc": "521",
    "cc-exp": "6/2021"
    }


def fill_out_form(**kwargs):
    driver = kwargs['driver']
    form = driver.find_element_by_id('usrForm')
    for elem_name, elem_value in FORM_DATA.iteritems():
        # print elem_name, elem_value
        elem = form.find_element_by_name(elem_name)
        try:
            elem.click()  # move focus to the input element
        except WebDriverException:
            # Even if the element is displayed and enabled we can
            # get an "Element is not clickable at point" exception
            # since "Other element would receive the click"
            pass
        elem.clear()
        # TODO add a click
        elem.send_keys(elem_value)  # type the text
        sleep(0.3)


class TestDOMExfiltration(OpenWPMTest):
    """This is not a part of the automated test suite."""
    BASE_DOMAIN = utilities.BASE_TEST_URL + '/DOM_exfiltration_masking/'

    def get_config(self, data_dir=""):
        return self.get_test_config(data_dir)

    def run_dom_exfiltration_test(self, test_type):
        manager_params, browser_params = self.get_config()
        browser_params[0]['http_instrument'] = True
        # browser_params[0]['record_js_errors'] = True
        # browser_params[0]['headless'] = False
        manager = TaskManager.TaskManager(manager_params, browser_params)
        if test_type in ["yandex", "fullstory", "hotjar"]:
            # use localhost instead of localtest.me
            localhost_domain = self.BASE_DOMAIN.replace("localtest.me",
                                                        "localhost")
            test_url = localhost_domain + test_type + "/"
        else:
            test_url = self.BASE_DOMAIN + 'index.html?test_type=%s' % test_type
        cs = CommandSequence.CommandSequence(test_url, blocking=True)
        cs.get(sleep=3, timeout=60)
        cs.run_custom_function(fill_out_form)
        manager.execute_command_sequence(cs)
        sleep(5)
        manager.close()
        assert not db_utils.any_command_failed(manager_params['db'])
        return manager_params['db']

    def test_userreplay(self):
        db = self.run_dom_exfiltration_test("userreplay")
        self.check_leaks(db)

    def test_sessioncam(self):
        db = self.run_dom_exfiltration_test("sessioncam")
        self.check_leaks(db)

    def test_skimlinks(self):
        db = self.run_dom_exfiltration_test("skimlinks")
        self.check_leaks(db)

    def test_hotjar(self):
        db = self.run_dom_exfiltration_test("hotjar")
        self.check_leaks(db)

    def test_fullstory(self):
        db = self.run_dom_exfiltration_test("fullstory")
        self.check_leaks(db)

    def test_yandex(self):
        db = self.run_dom_exfiltration_test("yandex")
        self.check_leaks(db, test_type="yandex")

    def search_leak_in_http_req(self, bait_type, observed_form_leaks,
                                url, method, post_body, test_type=""):
        if bait_type == "form_data":
            bait_dict = FORM_DATA
        elif bait_type == "displayed_data":
            bait_dict = DISPLAYED_DATA

        for elem_name, elem_value in bait_dict.iteritems():
            leak_found = False
            if method in ["GET" or "OPTIONS"] and elem_value in url:
                leak_found = True
            elif post_body:
                if elem_value in post_body:
                    leak_found = True
                try:
                    post_body_obj = json.loads(post_body)
                except Exception:
                    continue
                if "wv-data" in post_body_obj:
                    wv_decoded = ""
                    try:
                        wv_decoded = b64decode(post_body_obj["wv-data"])
                    except Exception as e:
                        for piece in post_body_obj["wv-data"].split("*"):
                            try:
                                wv_decoded += b64decode(piece)
                                print "Adding decoded piece", piece
                            except Exception as exc:
                                print "Exception decoding piece", piece, exc
                                pass
                        # print "ERROR decoding", e, "POST DATA\n", post_body_obj["wv-data"], "\n"

                    if elem_value in wv_decoded:
                        print "Found leak in base64 encoded data", bait_type, elem_name, elem_value
                        leak_found = True

            if leak_found:
                observed_form_leaks.add(elem_name)

    def check_leaks(self, db, test_type=""):
        query = ("SELECT url, method, post_body FROM http_requests")
        checked_for_leaks = False  # to make sure we checked the leaks
        observed_form_leaks = set()
        observed_display_leaks = set()
        for url, method, post_body in db_utils.query_db(db, query):
            # print url, method, post_body
            checked_for_leaks = True
            # we might need to check for encodings and hashes
            # but we observed_form_leaks that the tested scripts send eveything
            # unencoded, except Yandex
            self.search_leak_in_http_req("form_data", observed_form_leaks,
                                         url, method, post_body, test_type)
            self.search_leak_in_http_req("displayed_data",
                                         observed_display_leaks, url, method,
                                         post_body, test_type)

        if not checked_for_leaks:
            pytest.fail("No requests sent by the tested script")

        print "******** RESULTS *********"
        if observed_form_leaks == set(FORM_DATA.keys()):
            print "All Form data is sent UNMASKED"
        else:
            print "Form data is sent with masking or not sent at all"

        if observed_display_leaks == set(DISPLAYED_DATA.keys()):
            print "All displayed data is sent UNMASKED"
        else:
            print "Displayed data is sent with masking or not sent at all"

        for item in FORM_DATA.iterkeys():
            if item not in observed_form_leaks:
                print "Masked?", item, FORM_DATA[item]
            else:
                print "UNMASKED", item, FORM_DATA[item]

        for item in DISPLAYED_DATA.iterkeys():
            if item not in observed_display_leaks:
                print "Display data masked?", item, DISPLAYED_DATA[item]
