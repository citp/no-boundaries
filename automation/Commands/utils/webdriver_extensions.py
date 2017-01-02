# A set of extensions to the functions normally provided by the selenium
# webdriver. These are primarily for parsing and searching.
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.support.ui import WebDriverWait
from selenium.common.exceptions import TimeoutException
from selenium.common.exceptions import ElementNotVisibleException
from selenium.common.exceptions import NoSuchElementException
from urlparse import urljoin
import random
import time

from ...utilities import domain_utils as du
import XPathUtil
from selenium.webdriver.common.action_chains import ActionChains


#### Basic functions
def scroll_down(driver):
    at_bottom = False
    while random.random() > .20 and not at_bottom:
        k = str(10 + int(200*random.random()))
        driver.execute_script("window.scrollBy(0,"+k+")")
        at_bottom = driver.execute_script("return (((window.scrollY + window.innerHeight ) +100 > document.body.clientHeight ))")
        time.sleep(0.5 + random.random())

def scroll_to_bottom(driver):
    driver.execute_script("window.scrollTo(0, document.body.scrollHeight);")
    return

def is_loaded(webdriver):
    return (webdriver.execute_script("return document.readyState") == "complete")

def wait_until_loaded(webdriver, timeout, period=0.25):
    mustend = time.time() + timeout
    while time.time() < mustend:
        if is_loaded(webdriver): return True
        time.sleep(period)
    return False

def get_intra_links(webdriver, url):
    ps1 = du.get_ps_plus_1(url)
    links = filter(lambda x: (x.get_attribute("href") and
                              du.get_ps_plus_1(urljoin(url, x.get_attribute("href"))) == ps1),
                   webdriver.find_elements_by_tag_name("a"))
    return links

##### Search/Block Functions
# locator_type: a text representation of the standard
# webdriver.find_element_by_* functions. You can either
# import selenium.webdriver.common.by.By and use By.LINK_TEXT, etc.
# or just remember the string representations. For example:
# By.LINK_TEXT is 'link text'
# By.CSS_SELECTOR is 'css selector'
# By.NAME is 'name' ... and so on
# locator: string that you are looking for
def wait_and_find(driver, locator_type, locator, timeout=3, check_iframes=True):
    if is_found(driver, locator_type, locator, timeout):
        return driver.find_element(locator_type, locator)
    else:
        if check_iframes: #this may return the browser with an iframe active
            driver.switch_to_default_content()
            iframes = driver.find_elements_by_tag_name('iframe')

            for iframe in iframes:
                driver.switch_to_default_content()
                driver.switch_to_frame(iframe)
                if is_found(driver, locator_type, locator, timeout=0):
                    return driver.find_element(locator_type, locator)

            #If we get here, search also fails in iframes
            driver.switch_to_default_content()
        raise NoSuchElementException, "Element not found during wait_and_find"

def is_found(driver, locator_type, locator, timeout=3):
    try:
        w = WebDriverWait(driver, timeout)
        w.until(lambda d: d.find_element(locator_type, locator))
        return True
    except TimeoutException:
        return False

def is_visible(driver, locator_type, locator, timeout=3):
    try:
        w = WebDriverWait(driver, timeout)
        w.until(EC.visibility_of_element_located((locator_type, locator)))
        return True
    except TimeoutException:
        return False

def title_is(driver, title, timeout=3):
    try:
        w = WebDriverWait(driver, timeout)
        w.until(EC.title_is(title))
        return True
    except TimeoutException:
        return False

def title_contains(driver, title, timeout=3):
    try:
        w = WebDriverWait(driver, timeout)
        w.until(EC.title_contains(title))
        return True
    except TimeoutException:
        return False

#Selenium requires an element to be visible and enabled to be
#clickable. We extend that to require it to have a tag capable
#of containing a link. NOTE: doesn't work 100%
def is_clickable(driver, full_xpath, xpath, timeout = 1):
    try:
        w = WebDriverWait(driver, timeout)
        w.until(EC.element_to_be_clickable(('xpath',xpath)))
        return XPathUtil.is_clickable(full_xpath)
    except (TimeoutException, ElementNotVisibleException):
        return False


def get_element_type(element):
    return element.get_attribute("type")


def str_element(element):
    """Return a human readable representation of webelement."""
    return '<%s type="%s" name="%s" value="%s" ...> x:%s y:%s w:%d h:%d' %\
        (element.tag_name, get_element_type(element),
         element.get_attribute("name"), element.get_attribute("value"),
         element.location["x"], element.location["y"],
         element.size["width"], element.size["height"])


def is_text_or_email_input(element):
    """Check if the given input element is a text or an email field."""
    element_type = get_element_type(element)
    return element_type in ["text", "email"]


def move_to_element(driver, element):
    ActionChains(driver).move_to_element(element).perform()


def is_active(input_element):
    """Check if we can interact with the given element."""
    try:
        return input_element.is_displayed() and input_element.is_enabled()
    except:
        return False


def get_button_text(element):
    """Get the text either via `value` attribute or using (inner) `text`.

    `value` attribute works for <input type="button"...> or
    <input type="submit".

    `text` works for <button>elements, e.g. <button>text</button>.
    """
    button_text = element.get_attribute("value") or element.text
    return button_text.lower()


def iter_frames(driver):
    """Return a generator for iframes."""
    driver.switch_to_default_content()
    iframes = driver.find_elements_by_tag_name('iframe')
    for iframe in iframes:
        driver.switch_to_default_content()
        yield iframe
    driver.switch_to_default_content()


#TODO Update this. No direct access to DB right now
'''
#get and set xpaths into xpath database
def get_xpath(driver, url, name):
cur = self.db.cursor()
cur.execute("SELECT xpath FROM xpath WHERE url = ? AND name = ?",(url, name))
response = cur.fetchone()
if response == None:
return None
else:
return response[0]

def set_xpath(driver, url, name, xpath, absolute_xpath = None):
cur = self.db.cursor()
if self.mp_lock is not None:
self.mp_lock.acquire()
cur.execute("UPDATE xpath SET xpath = ?, absolute_xpath = ? \
WHERE url = ? AND name = ?", (xpath, absolute_xpath, url, name))
if cur.rowcount == 0: #occurs when record does not already exist
cur.execute("INSERT INTO xpath (name, url, xpath, absolute_xpath) VALUES (?,?,?,?)",
(name, url, xpath, absolute_xpath))
self.db.commit()
if self.mp_lock is not None:
self.mp_lock.release()
return cur.lastrowid
'''

#Click an xpath using javascript -- not working correctly
#gets around visibility requirements of selenium.
#def click_xpath(driver, xpath):
# driver.execute_script('$(document.evaluate('+xpath+', document, null, 9, null).singleNodeValue).click();')
