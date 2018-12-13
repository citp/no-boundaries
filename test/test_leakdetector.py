import unittest
import os
import sys
module_path = os.path.realpath('..')
sys.path.insert(0, module_path)

from ..automation.utilities.common import (FORM_FILL_EMAIL,
                                           FORM_FILL_PASSWORD)
from ..analysis import LeakDetector


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

TEST_COOKIES = [
    """[["Cookie","ThrALO=2017-07-16-22-47-31; visid_incap_949787=jmYxYJ3JTXqt+wLrCapbH6vqa1kAAAAAQUIPAAAAAACekjlh1KowMlKOUGeEbhL1; nlbi_949787=4O/CaFCqh32yuosIgK+UVgAAAABw8zECzqIocGWHQGlcGYM/; incap_ses_513_949787=n2ZFLxSMugjL4fUOOIseB6vqa1kAAAAARGbiqEy9yWbtD1YZFj9nrA==; bt_lastClick=direct; userVisitId=jstx-1500244658003-6ily; sc.ASP.NET_SESSIONID=vcnwhxfzuh4nnvtpu4kvo0xs; cmTPSet=Y; CoreID6=26927059566815002446587&ci=90208333; 90208333_clogin=v=1&l=1500244658&e=1500246513127; deepLinkVisited=true; Apache=23.235.40.47.1500244659976317; JSESSIONID=0000mOOTjWZfnlLKK1sNByWbpv0:180dpf9q9; WC_PERSISTENT=%2BBbXOimWfOtTqLJRY%2B9r%2Fv41T8g%3D%0A%3B2017-07-16+23%3A37%3A39.986_1500244659978-32838_11352_-1002%2C-1%2CGBP_11352; WC_SESSION_ESTABLISHED=true; WC_ACTIVEPOINTER=-1%2C11352; WC_USERACTIVITY_-1002=-1002%2C11352%2Cnull%2Cnull%2Cnull%2Cnull%2Cnull%2Cnull%2Cnull%2Cnull%2Cibp7zZmP1V2IyS2KSmnicO75ubAARrVc%2FDTidyrhzyPXPTvEcjvdAkyqkcSQSiCmqWYiKS0f6MCILJbrMGtGRXz1Ugz803ToTktSj8jILeTTAD4Yhiw6pBEin5mIYWwG9rh5j%2FVKb4SI%2BIhNbxEvYtm%2BQDfOrroBRwebPCX5bYiPGgIaAWP8BDouoGjfrcSthz3TTlrVk1qdOS8m3g5GCg%3D%3D; WC_GENERIC_ACTIVITYDATA=[7346939520%3Atrue%3Afalse%3A0%3ASfbieHxXtOXRU7KtIhJvGTk5JKY%3D][com.ibm.commerce.context.audit.AuditContext|1500244659978-32838][com.ibm.commerce.store.facade.server.context.StoreGeoCodeContext|null%26null%26null%26null%26null%26null][CTXSETNAME|Store][com.ibm.commerce.context.globalization.GlobalizationContext|-1%26GBP%26-1%26GBP][com.ibm.commerce.catalog.businesscontext.CatalogContext|28501%26null%26false%26false%26false][com.ibm.commerce.context.base.BaseContext|11352%26-1002%26-1002%26-1][com.ibm.commerce.context.experiment.ExperimentContext|null][com.ibm.commerce.context.entitlement.EntitlementContext|12002%2612002%26null%26-2000%26null%26null%26null][com.ibm.commerce.giftcenter.context.GiftCenterContext|null%26null%26null]; WC_CartOrderId_11352=; WC_CartOrderId_11355=; _ga=GA1.2.816793947.1500244666; _gid=GA1.2.1420556029.1500244666; _gat=1; _4c_=dVFNaxsxEP0rRQef3F1p9bkGU0pDS6DQS3vIqWi1E2fJxhKSHDkE%2F%2FeM1m6gLfZh%2FebrvdGbV1IeYE82TFLaCaEpZ4atySO8JLJ5JS7U7%2FMC%2FQhkQ1jf8EaSNYE9pkmII%2BJ7bCOGKd3zXujmQqaUwtq3z79vb66XD3HG4kPOYdO2pZRm8D6nxvmntsBgQ2iLS23KPgL%2BQXyeIbc%2FffhiM%2Bx8nCDdTCnM9uWTs9nOfnc7bjsjKVvNdl%2BDj2y1TCNkjMtuhbQRSpwybO9WO%2FA%2FQk7bO1xliL6gAq7zdYpw748fRH2oRyfI92l%2FOGKAeYhxacIoIQmi95UxlSE%2B1QGEoRrEEMze2bk2Hh7Phvy67shpTY7nc3DOqFbcGCTNaJJRgtYfdsRpvNyFCNozrWxvtZYCjHZcSqHdMDht3DAOKHjmM7SjStNOcSQIyLfM460vcp3sqUaFP3JMvMvVh%2FzTvSwnKNP%2FL3e28foMx8zfM6fTGw%3D%3D; _uetsid=_uet9f50a15d; ADRUM=s=1500244703222&r=http%3A%2F%2Fwww.boots.com%2Fwebapp%2Fwcs%2Fstores%2Fservlet%2FTopCategoriesDisplay%3F1153159006; WC_AUTHENTICATION_-1002=-1002%2C4qO%2FJNdTEzsOCUiSKMvsj2HXCBY%3D; _bdccookie_coRetURL=http%3A%2F%2Fwww.boots.com%2Fwebapp%2Fwcs%2Fstores%2Fservlet%2FTopCategoriesDisplay%3FcatalogId%3D28501%26langId%3D-1%26storeId%3D11352%26webrewrite%3DY%26geoOpts%3DY; WC_EmailPref=randomtestuser.1234%40gmail.com; ADRUM_BTa=R:130|g:e727b8c4-b52b-423a-99b5-cd8f628ad461|n:boots-prod_d78adf05-7218-4001-98ac-f5d8e0174fe2; ADRUM_BT1=R:130|i:146887|d:2; ADRUM_BT2=R:130|i:130064|e:34"]]"""  # noqa
]


class TestLeakDetector(unittest.TestCase):

    def test_url_leak_detection(self):
        SEARCH_STRINGS = [FORM_FILL_EMAIL, FORM_FILL_PASSWORD]
        detector = LeakDetector.LeakDetector(
            SEARCH_STRINGS, encoding_set=LeakDetector.ENCODINGS_NO_ROT,
            encoding_layers=3, hash_layers=3, debugging=True
        )
        for url in TEST_URLS:
            url_leaks = detector.check_url(url)
            # print "url_leaks", url_leaks
            assert len(url_leaks) > 0

    def test_cookie_leak_detection(self):
        SEARCH_STRINGS = [FORM_FILL_EMAIL, FORM_FILL_PASSWORD]
        detector = LeakDetector.LeakDetector(
            SEARCH_STRINGS, encoding_set=LeakDetector.ENCODINGS_NO_ROT,
            encoding_layers=3, hash_layers=3, debugging=True
        )
        for cookie_str in TEST_COOKIES:
            cookie_leaks = detector.check_cookies(cookie_str)
            # print "url_leaks", url_leaks
            assert len(cookie_leaks) > 0
