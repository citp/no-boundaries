import re
from os.path import realpath, dirname, join, isfile, isdir
from openwpmtest import OpenWPMTest


class TestDependencies(OpenWPMTest):

    BASE_DIR = dirname(dirname(realpath(__file__)))

    def test_dependencies(self):
        self.assert_is_installed("npm")
        self.assert_is_installed("jpm")
        self.assert_is_installed('mitmdump')
        self.assert_is_installed('firefox')
        ff_bin_dir = join(self.BASE_DIR, "firefox-bin")
        assert isdir(ff_bin_dir)
        ff_binary = join(ff_bin_dir, "firefox")
        assert isfile(ff_binary)

    def test_py_pkgs(self):
        PY_REQUIREMENTS_TXT = join(self.BASE_DIR, "requirements.txt")
        assert isfile(PY_REQUIREMENTS_TXT)
        for line in open(PY_REQUIREMENTS_TXT):
            if line.startswith("#"):
                continue
            pkg = re.split(r'[>=<]', line.strip())[0]
            print "Checking Python package", pkg
            self.assert_py_pkg_installed(pkg)

    def test_firefox_bin(self):
        ff_bin = join(dirname(dirname(realpath(__file__))),
                      'firefox-bin', 'firefox')
        assert isfile(ff_bin), "Can't find the Firefox binary in"\
            "OpenWPM/firefox-bin. Please run install.sh."
