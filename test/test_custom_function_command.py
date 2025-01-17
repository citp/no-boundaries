import utilities
from ..automation import CommandSequence
from ..automation import TaskManager
from ..automation.utilities import db_utils
from openwpmtest import OpenWPMTest

url_a = utilities.BASE_TEST_URL + '/simple_a.html'

PAGE_LINKS = {
    (u'http://localtest.me:8000/test_pages/simple_a.html',
     u'http://localtest.me:8000/test_pages/simple_c.html'),
    (u'http://localtest.me:8000/test_pages/simple_a.html',
     u'http://localtest.me:8000/test_pages/simple_d.html'),
    (u'http://localtest.me:8000/test_pages/simple_a.html',
     u'http://example.com/test.html?localtest.me'),
}


class TestCustomFunctionCommand(OpenWPMTest):
    """Test `custom_function` command's ability to handle inline functions"""

    def get_config(self, data_dir=""):
        return self.get_test_config(data_dir)

    def test_custom_function(self):
        """ Test `custom_function` with an inline func that collects links """

        from ..automation.SocketInterface import clientsocket

        def collect_links(table_name, scheme, **kwargs):
            """ Collect links with `scheme` and save in table `table_name` """
            driver = kwargs['driver']
            manager_params = kwargs['manager_params']
            link_elements = driver.find_elements_by_tag_name('a')
            link_urls = [elem.get_attribute("href") for elem in link_elements]
            link_urls = filter(lambda x: x.startswith(scheme+'://'), link_urls)
            current_url = driver.current_url

            sock = clientsocket()
            sock.connect(*manager_params['aggregator_address'])

            query = ("CREATE TABLE IF NOT EXISTS %s ("
                     "top_url TEXT, link TEXT);" % table_name)
            sock.send((query, ()))

            for link in link_urls:
                query = ("INSERT INTO %s (top_url, link) "
                         "VALUES (?, ?)" % table_name)
                sock.send((query, (current_url, link)))
            sock.close()

        manager_params, browser_params = self.get_config()
        manager = TaskManager.TaskManager(manager_params, browser_params)
        cs = CommandSequence.CommandSequence(url_a)
        cs.get(sleep=0, timeout=60)
        cs.run_custom_function(collect_links, ('page_links', 'http'))
        manager.execute_command_sequence(cs)
        manager.close()
        query_result = db_utils.query_db(
            manager_params['db'],
            "SELECT top_url, link FROM page_links;",
            as_tuple=True
        )
        assert PAGE_LINKS == set(query_result)
