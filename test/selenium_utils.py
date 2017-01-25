from selenium.webdriver.firefox.firefox_binary import FirefoxBinary
from selenium import webdriver
import os


def get_webdriver():
    current_dir = os.path.dirname(__file__)
    fb = FirefoxBinary(os.path.join(current_dir, '../firefox-bin/firefox'))
    return webdriver.Firefox(firefox_binary=fb)
