import utilities
from ..automation import CommandSequence
from ..automation import TaskManager
from ..automation.utilities import db_utils
from openwpmtest import OpenWPMTest

NESTED_FRAMES_URL = utilities.BASE_TEST_URL + '/recursive_iframes/parent.html'
# Page structure:
#
#  Parent page with a bunch of nested iframes
#    |--Depth 1 - Child A
#    |    |--Depth 2 - Child A
#    |    |    |--Depth 3 - Child A
#    |    |         |--Depth 4 - Child A
#    |    |              |--Depth 5 - Child A
#    |    |                   |--Depth 6 - Child A
#    |    |--Depth 2 - Child B
#    |
#    |--Depth 1 - Child B
#    |
#    |--Depth 1 - Child C
#    |    |--Depth 2 - Child C
#    |         |--Depth 3 - Child B
#    |         |--Depth 3 - Child C
#    |         |--Depth 3 - Child D

DOCUMENT_TITLES = {
    (u'Parent page with a bunch of nested iframes', 0),
    (u'Depth 1 - Child A', 1),
    (u'Depth 1 - Child B', 1),
    (u'Depth 1 - Child C', 1),
    (u'Depth 2 - Child A', 2),
    (u'Depth 2 - Child B', 2),
    (u'Depth 2 - Child C', 2),
    (u'Depth 3 - Child A', 3),
    (u'Depth 3 - Child B', 3),
    (u'Depth 3 - Child C', 3),
    (u'Depth 3 - Child D', 3),
    (u'Depth 4 - Child A', 4),
    (u'Depth 5 - Child A', 5)
}


class TestWebDriverExtensions(OpenWPMTest):
    """Test for webdriver extensions utility file"""

    def test_recursive_iframe(self):
        """ Test `execute_in_all_frames` """

        from ..automation.Commands.utils import webdriver_extensions as wd_ext
        from ..automation.SocketInterface import clientsocket

        def collect_links(**kwargs):
            """ Collect titles of all nested frames """
            driver = kwargs['driver']

            # Set up results table
            manager_params = kwargs['manager_params']
            sock = clientsocket()
            sock.connect(*manager_params['aggregator_address'])

            query = ("CREATE TABLE IF NOT EXISTS document_titles ("
                     "title TEXT, depth INTEGER);")
            sock.send((query, ()))

            def collect_titles(driver, frame_stack, titles=[], socket=None):
                title = driver.execute_script("return document.title;")
                depth = len(frame_stack) - 1
                query = ("INSERT INTO document_titles (title, depth) "
                         "VALUES (?, ?)")
                socket.send((query, (title, depth)))
                titles.append(title)

            all_titles = list()
            wd_ext.execute_in_all_frames(driver, collect_titles,
                                         {'titles': all_titles,
                                          'socket': sock})
            print "All titles: " + str(all_titles)
            sock.close()

        manager_params, browser_params = self.get_test_config()
        manager = TaskManager.TaskManager(manager_params, browser_params)
        cs = CommandSequence.CommandSequence(NESTED_FRAMES_URL)
        cs.get(sleep=3, timeout=60)
        cs.run_custom_function(collect_links)
        manager.execute_command_sequence(cs)
        manager.close()
        query_result = db_utils.query_db(
            manager_params['db'],
            "SELECT title, depth FROM document_titles;",
            as_tuple=True
        )
        assert DOCUMENT_TITLES == set(query_result)
