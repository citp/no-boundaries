import SimpleHTTPServer
import SocketServer
import threading
import os
from random import choice
from os.path import realpath, dirname


LOCAL_WEBSERVER_PORT = 8000
BASE_TEST_URL_DOMAIN = "localtest.me"
BASE_TEST_URL_NOPATH = "http://%s:%s" % (BASE_TEST_URL_DOMAIN,
                                         LOCAL_WEBSERVER_PORT)
BASE_TEST_URL = "%s/test_pages" % BASE_TEST_URL_NOPATH
BASE_TEST_URL_NOSCHEME = BASE_TEST_URL.split('//')[1]


class MyTCPServer(SocketServer.TCPServer):
    """Subclass TCPServer to be able to reuse the same port (Errno 98)."""
    allow_reuse_address = True


def start_server():
    """ Start a simple HTTP server to run local tests.

    We need this since page-mod events in the extension
    don't fire on `file://*`. Instead, point test code to
    `http://localtest.me:8000/test_pages/...`
    """
    print "Starting HTTP Server in a separate thread"
    # switch to test dir, this is where the test files are
    os.chdir(dirname(realpath(__file__)))
    Handler = SimpleHTTPServer.SimpleHTTPRequestHandler
    server = MyTCPServer(("localhost", LOCAL_WEBSERVER_PORT), Handler)
    thread = threading.Thread(target=server.serve_forever)
    thread.daemon = True
    thread.start()
    print "...serving at port", LOCAL_WEBSERVER_PORT
    return server, thread


def rand_str(size=8):
    """Return random string with the given size."""
    RAND_CHARS = "abcdefghijklmnopqrstuvwxyz0123456789"
    return ''.join(choice(RAND_CHARS) for _ in range(size))


def filter_dict(dct, keys):
    """Filter dictionary to specifed keys"""
    return {key: dct[key] for key in keys}


def replace_functions(dct):
    """Replace function strings in dct values with 'function...' (in place).

    Many argument lists have a long function argument. To avoid clutter we
    cut these down to 'function...' when checking against expected values.
    """
    if not type(dct) == dict:
        raise TypeError("dct argument must be of type `dict`")
    for key, value in dct.items():
        if value.startswith('function'):
            dct[key] = 'function...'
    return dct
