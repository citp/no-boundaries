# A set of extensions to the functions normally provided by the selenium
# webdriver. These are primarily for parsing and searching.
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.support.ui import WebDriverWait
from selenium.common.exceptions import TimeoutException
from selenium.common.exceptions import ElementNotVisibleException
from selenium.common.exceptions import NoSuchElementException
from selenium.common.exceptions import WebDriverException
from selenium.common.exceptions import StaleElementReferenceException
from urlparse import urljoin
import random
import time

from ...utilities import domain_utils as du
import XPathUtil
from selenium.webdriver.common.action_chains import ActionChains


# Basic functions ########
def scroll_down(driver):
    at_bottom = False
    while random.random() > .20 and not at_bottom:
        k = str(10 + int(200 * random.random()))
        driver.execute_script("window.scrollBy(0," + k + ")")
        at_bottom = driver.execute_script("""
            return (((window.scrollY + window.innerHeight ) + 100 > document.body.clientHeight ))""")  # noqa
        time.sleep(0.5 + random.random())


def scroll_to_bottom(driver):
    try:
        driver.execute_script(
            "window.scrollTo(0, document.body.scrollHeight);")
    except WebDriverException:
        pass


def is_loaded(webdriver):
    return (
        webdriver.execute_script("return document.readyState") == "complete")


def wait_until_loaded(webdriver, timeout, period=0.25):
    mustend = time.time() + timeout
    while time.time() < mustend:
        if is_loaded(webdriver):
            return True
        time.sleep(period)
    return False


def get_intra_links(webdriver, url):
    ps1 = du.get_ps_plus_1(url)
    links = filter(lambda x: (x.get_attribute("href") and
                              du.get_ps_plus_1(urljoin(
                                  url, x.get_attribute("href"))) == ps1),
                   webdriver.find_elements_by_tag_name("a"))
    return links


# Search/Block Functions
# locator_type: a text representation of the standard
# webdriver.find_element_by_* functions. You can either
# import selenium.webdriver.common.by.By and use By.LINK_TEXT, etc.
# or just remember the string representations. For example:
# By.LINK_TEXT is 'link text'
# By.CSS_SELECTOR is 'css selector'
# By.NAME is 'name' ... and so on
# locator: string that you are looking for


def wait_and_find(driver, locator_type, locator,
                  timeout=3, check_iframes=True):
    if is_found(driver, locator_type, locator, timeout):
        return driver.find_element(locator_type, locator)
    else:
        if check_iframes:  # this may return the browser with an iframe active
            driver.switch_to_default_content()
            iframes = driver.find_elements_by_tag_name('iframe')

            for iframe in iframes:
                driver.switch_to_default_content()
                driver.switch_to_frame(iframe)
                if is_found(driver, locator_type, locator, timeout=0):
                    return driver.find_element(locator_type, locator)

            # If we get here, search also fails in iframes
            driver.switch_to_default_content()
        raise NoSuchElementException("Element not found during wait_and_find")


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


def is_clickable(driver, full_xpath, xpath, timeout=1):
    """
    Selenium requires an element to be visible and enabled to be
    clickable. We extend that to require it to have a tag capable
    of containing a link. NOTE: doesn't work 100%
    """
    try:
        w = WebDriverWait(driver, timeout)
        w.until(EC.element_to_be_clickable(('xpath', xpath)))
        return XPathUtil.is_clickable(full_xpath)
    except (TimeoutException, ElementNotVisibleException):
        return False


def click_to_elem(element, sleep_after=0.5):
    """Click to element and handle WebDriverException."""
    try:
        element.click()
        time.sleep(sleep_after)
    except WebDriverException:
        pass


def get_element_type(element):
    try:
        return element.get_attribute("type")
    except WebDriverException:
        return ""


def get_placeholder_text(element):
    try:
        return element.get_attribute("placeholder")
    except WebDriverException:
        return ""


def str_element(element):
    """Return a human readable representation of a webelement.

    Return empty string if the element is not active anymore."""
    try:
        out = '<%s type="%s" name="%s" value="%s" placeholder="%s" ...> x:%s y:%s w:%d h:%d' % (  # noqa
            element.tag_name, get_element_type(element),
            element.get_attribute("name"), element.get_attribute("value"),
            get_placeholder_text(element),
            element.location["x"], element.location["y"],
            element.size["width"], element.size["height"])
    except Exception:
        out = ""
    return out


def str_form(element):
    """Return a human readable representation of a form.

    Return empty string if the element is not active anymore."""
    try:
        # TODO: return as JSON string
        out = '<form name="%s" action="%s" method="%s" ...> x:%s y:%s w:%d h:%d' % (  # noqa
            element.get_attribute("name"),
            element.get_attribute("action"),
            element.get_attribute("method"),
            element.location["x"], element.location["y"],
            element.size["width"], element.size["height"])
    except Exception:
        out = ""
    return out


def is_text_or_email_input(element):
    """Check if the given input element is an active text or email field.

    Due to exception handling, returns False for stale elements,
    regardless of their type.
    """
    try:
        element_type = get_element_type(element)
        return element_type in ["text", "email"]
    except WebDriverException:
        return False


def move_to_element(driver, element):
    try:
        ActionChains(driver).move_to_element(element).perform()
    except WebDriverException:
        pass


def is_active(input_element):
    """Check if we can interact with the given element."""
    try:
        return input_element.is_displayed() and input_element.is_enabled()
    except WebDriverException:
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


def switch_to_parent_frame(driver, frame_stack):
    """Switch driver to parent frame

    Selenium doesn't provide a method to switch up to a parent frame.
    Any frame handles collected in a parent frame can't be used in the
    child frame, so the only way to switch to a parent frame is to
    switch back to the top-level frame and then switch back down to the
    parent through all iframes.

    Parameters
    ----------
    driver : selenium.webdriver
        A Selenium webdriver instance.
    frame_stack : list of selenium.webdriver.remote.webelement.WebElement
        list of parent frame handles (including current frame)
    """
    driver.switch_to_default_content()  # start at top frame
    # First item is 'default', last item is current frame
    for frame in frame_stack[1:-1]:
        driver.switch_to_frame(frame)


def execute_in_all_frames(driver, func, kwargs={}, frame_stack=['default'],
                          max_depth=5):
    """Recursively apply `func` within each iframe

    When called at each level, `func` will be passed the webdriver instance
    as an argument as well as any named arguments given in `kwargs`. If you
    require a return value from `func` it should be stored in a mutable
    argument. Function returns and positional arguments are not supported.
    `func` should be defined with the following structure:

    >>> def print_and_gather_links(driver, frame_stack,
    >>>                            print_prefix='', links=[]):
    >>>     elems = driver.find_elements_by_tag_name('a')
    >>>     for elem in elems:
    >>>         link = elem.get_attribute('href')
    >>>         print print_prefix + link
    >>>         links.append(link)

    `execute_in_all_frames` should then be called as follows:

    >>> all_links = list()
    >>> execute_in_all_frames(driver, print_and_gather_links,
    >>>                       {'prefix': 'Link ', 'links': all_links})
    >>> print "All links on page (including all iframes):"
    >>> print all_links

    Parameters
    ----------
    driver : selenium.webdriver
        A Selenium webdriver instance.
    func : function
        A function handle to apply to the webdriver instance within each frame
    max_depth : int
        Maximum depth to recurse into
    frame_stack : list of selenium.webdriver.remote.webelement.WebElement
        list of parent frame handles (including current frame)
    """
    # Ensure we start at the top level frame
    if len(frame_stack) == 1:
        driver.switch_to_default_content()

    # Bail if past depth cutoff
    if len(frame_stack) - 1 > max_depth:
        return

    # Execute function in this frame
    func(driver, frame_stack, **kwargs)

    # Grab all iframes in the current frame
    frames = driver.find_elements_by_tag_name('iframe')

    # Recurse through frames
    for frame in frames:
        frame_stack.append(frame)
        try:
            driver.switch_to_frame(frame)
        except StaleElementReferenceException:
            print "Error while switching to frame %s" % str(frame)
            continue
        else:
            # Search within child frame
            execute_in_all_frames(driver, func, kwargs, frame_stack, max_depth)
            switch_to_parent_frame(driver, frame_stack)
        finally:
            frame_stack.pop()
