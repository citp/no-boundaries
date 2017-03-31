import os
from ..automation.utilities import db_utils
from openwpmtest import OpenWPMTest
import utilities

# DOM modification instrumentation
TEST_PAGE = u'http://localtest.me:8000/test_pages/dom_modification.html'
INSERTED_ELEMENTS = {
        (TEST_PAGE,
         TEST_PAGE,
         u'true',
         u'BODY/DIV[1,test1,,false,,]/FORM[1,form1,,false,,]',
         u'FORM'),
        (TEST_PAGE,
         TEST_PAGE,
         u'true',
         u'BODY/DIV[1,test1,,false,,]/FORM[1,form1,,false,,]/'
         'INPUT[1,email1,,false,,]',
         u'INPUT'),
        (TEST_PAGE,
         TEST_PAGE,
         u'true',
         u'BODY/DIV[1,test1,,false,,]/FORM[1,form1,,false,,]/'
         'INPUT[2,password1,,false,,]',
         u'INPUT'),
        (TEST_PAGE,
         TEST_PAGE,
         u'false',
         u'BODY/DIV[2,test2,,false,,]/FORM[1,form2,,false,,]',
         u'FORM'),
        (TEST_PAGE,
         TEST_PAGE,
         u'true',
         u'BODY/DIV[2,test2,,false,,]/FORM[1,form2,,false,,]/'
         'INPUT[1,email2,,false,,]',
         u'INPUT'),
        (TEST_PAGE,
         TEST_PAGE,
         u'true',
         u'BODY/DIV[2,test2,,false,,]/FORM[1,form2,,false,,]/'
         'INPUT[2,password2,,false,,]',
         u'INPUT')
}
MODIFIED_ELEMENTS = {
        (TEST_PAGE,
         TEST_PAGE,
         u'BODY/DIV[1,test1,,false,,]/FORM[1,form1,,false,,]',
         u'FORM',
         u'autocomplete',
         u'',
         u'on'),
        (TEST_PAGE,
         TEST_PAGE,
         u'BODY/DIV[2,test2,,false,,]/FORM[1,form2,,false,,]',
         u'FORM',
         u'autocomplete',
         u'',
         u'on')
}


class TestDOMInstrumentation(OpenWPMTest):

    def get_config(self, data_dir=""):
        manager_params, browser_params = self.get_test_config(data_dir)
        browser_params[0]['js_instrument'] = True
        return manager_params, browser_params

    def test_dom_modification_events(self):
        """Check if we can detect element insertions and modifications"""
        test_url = os.path.join(utilities.BASE_TEST_URL,
                                'dom_modification.html')
        db = self.visit(test_url, sleep_after=5)

        # check element insertions
        rows = db_utils.query_db(
            db,
            "SELECT v.site_url, f.script_url, f.is_visible,"
            " f.node_path, f.element_type"
            " FROM inserted_elements AS f LEFT JOIN site_visits as v"
            " ON f.visit_id = v.visit_id"
            " WHERE guid NOT NULL AND guid != ''",
            as_tuple=True
        )
        assert set(rows) == INSERTED_ELEMENTS

        # check element modifications
        rows = db_utils.query_db(
            db,
            "SELECT v.site_url, f.script_url, f.node_path,"
            " f.element_type, f.attribute, f.prev_value, f.new_value"
            " FROM modified_elements AS f LEFT JOIN site_visits as v"
            " ON f.visit_id = v.visit_id"
            " WHERE guid NOT NULL AND guid != ''",
            as_tuple=True
        )
        assert set(rows) == MODIFIED_ELEMENTS
