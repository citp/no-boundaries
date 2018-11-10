import unittest
from automation.utilities.common import FORM_FILL_EMAIL, FORM_FILL_PASSWORD
from analysis import LeakDetector


TEST_URLS = [
    "https://d.adroll.com/emailc/FYTZRQUEVVGS7EWCIOE64A/MNBMU5UBV5A6DJOSTXTI32"
    "?pv=69385629193.64719&cookie=3453DKN27BBTHNHIEAGU3M%3A1%7CMNBMU5UBV5A6DJO"
    "STXTI32%3A1%7CFYTZRQUEVVGS7EWCIOE64A%3A1&keyw=&adroll_external_data=shotg"
    "un%3D1%26adroll_email%3Drandomtestuser.1234%2540gmail.com%26input_id%3Dem"
    "ail%26input_name%3Demail%26input_type%3Demail%26input_class%3Dform-contro"
    "l%2520email%26sibling_label_text%3D%26source%3Dfocus%26form_id%3Dsignup_f"
    "orm%26form_name%3D%26form_action%3Djavascript%253A%253B%26form_method%3D%"
    "26form_class%3Dform-vertical%2520signup",
    # we cannot detect the leaks in following URLs without substring search
    "http://cspix.media6degrees.com/orbserv/hbpix?pixId=1598&pcv=45&curl=http:"
    "//www.fodors.com/newsletter/thanks/?source=header?email=randomtestuser.12"
    "34@gmail.com&ptid=100&tpuv=01&tpu=596c2f1a52152737&cckz=true",
    "https://www.dice.com/config/dice/api.json?path=%2Fvalidations%2Femail%2F"
    "randomtestuser.1234%40gmail.com",
    "http://pixel.quantserve.com/pixel;r=1985358177;a=p-d0i2EbAMl-wE2;id=%7B%7"
    "B%23logged_in%7D%7D%7B%7Bmember_id_url%7D%7D%7B%7B%2Flogged_in%7D%7D;rf=3"
    ";fpan=0;fpa=P0-785340677-1500262163543;ns=0;ce=1;cm=;je=0;sr=1366x768x24;"
    "enc=n;dst=0;et=1500262209538;tzo=0;ref=http%3A%2F%2Fwww.fodors.com%2Fnews"
    "letter%2Fsignup%3Fsource%3Dheader;url=http%3A%2F%2Fwww.fodors.com%2Fnewsl"
    "etter%2Fthanks%2F%3Fsource%3Dheader%3Femail%3Drandomtestuser.1234%40gmail"
    ".com;ogl=title.Subscribe%20to%20the%20Fodor's%20Newsletter%2Cdescription."
    "Subscribe%20to%20the%20Fodor's%20newsletter%20for%20the%20latest%20in%20t"
    "ravel%20news%252C%20tips%252C%20bargain%2Curl.http%3A%2F%2Fwww%252Efodors"
    "%252Ecom%2Fnewsletter%2Fsignup%2F"]


class TestLeakDetector(unittest.TestCase):

    def test_url_leak_detection(self):
        search_strings = [FORM_FILL_EMAIL, FORM_FILL_PASSWORD]
        detector = LeakDetector.LeakDetector(
            search_strings, encoding_set=LeakDetector.ENCODINGS_NO_ROT,
            encoding_layers=3, hash_layers=3, debugging=True
        )
        for url in TEST_URLS:
            url_leaks = detector.check_url(url)
            # print "url_leaks", url_leaks
            assert len(url_leaks) > 0
