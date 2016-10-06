from utilities import BASE_TEST_URL, start_server
from os.path import dirname, join, realpath
import subprocess


class bcolors:
    HEADER = '\033[95m'
    OKBLUE = '\033[94m'
    OKGREEN = '\033[92m'
    WARNING = '\033[93m'
    FAIL = '\033[91m'
    ENDC = '\033[0m'
    BOLD = '\033[1m'
    UNDERLINE = '\033[4m'


def get_command_output_lines(command, cwd=None):
    popen = subprocess.Popen(command, shell=True, stdout=subprocess.PIPE,
                             stderr=subprocess.STDOUT, cwd=cwd)
    return iter(popen.stdout.readline, b"")


def start_manual_test():
    ext_path = join(dirname(dirname(realpath(__file__))),
                    'automation', 'Extension', 'firefox')
    ff_bin_path = join(dirname(dirname(realpath(__file__))),
                       'firefox-bin', 'firefox')
    cmd_jpm = "jpm run --binary-args 'url %s' -b %s" % (BASE_TEST_URL, ff_bin_path)
    server, thread = start_server()
    try:
        # http://stackoverflow.com/a/4417735/3104416
        for line in get_command_output_lines(cmd_jpm, cwd=ext_path):
            print bcolors.OKGREEN, line, bcolors.ENDC,
    except KeyboardInterrupt:
        print "Keyboard Interrupt detected, shutting down..."
    print "\nClosing server thread..."
    server.shutdown()
    thread.join()


if __name__ == '__main__':
    start_manual_test()
