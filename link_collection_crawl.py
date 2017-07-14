from automation import TaskManager, CommandSequence
from automation.Errors import CommandExecutionError
import automation.Commands.utils.webdriver_extensions as wd_ext
from automation.utilities import domain_utils as du
import crawl_utils
import urlparse
import json
import time
import os

# The list of sites that we wish to crawl
NUM_BROWSERS = 15
NUM_BATCH = 5000
DATA_DIR = os.path.join(os.path.dirname(__file__), 'data')

manager_params, browser_params = TaskManager.load_default_params(NUM_BROWSERS)

date_prefix = '2017-06-25'  # Updated by deployment script
prefix = date_prefix + '_link_collector'
manager_params['database_name'] = prefix + '.sqlite'
manager_params['data_directory'] = '~/' + prefix
manager_params['log_directory'] = '~/' + prefix

# Read the site list
with open(os.path.join(os.path.dirname(__file__),
                       'data', 'bad_sites_from_sample.txt')) as f:
    sites = f.read().strip().split('\n')
TOTAL_NUM_SITES = len(sites)

for i in xrange(NUM_BROWSERS):
    browser_params[i]['headless'] = True

start_time = time.time()

# Manage control files
if not os.path.isdir(os.path.expanduser('~/.openwpm/')):
    os.mkdir(os.path.expanduser('~/.openwpm/'))
if os.path.isfile(os.path.expanduser('~/.openwpm/reboot')):
    os.remove(os.path.expanduser('~/.openwpm/reboot'))
if os.path.isfile(os.path.expanduser('~/.openwpm/current_site_index')):
    with open(os.path.expanduser('~/.openwpm/current_site_index'), 'r') as f:
        start_index = int(f.read()) + 1
    end_index = start_index + NUM_BATCH
else:
    start_index = 0
    end_index = NUM_BATCH + 1


def save_links_to_file(top_url, **kwargs):
    """ Save a homepages internal links in a format used by the sampling
    script """
    driver = kwargs['driver']
    manager_params = kwargs['manager_params']
    data_dir = manager_params['data_directory']
    out_dir = os.path.join(data_dir, 'internal_links')
    out_file = os.path.join(out_dir, top_url)
    if not os.path.isdir(out_dir):
        os.mkdir(out_dir)
    intra_elems = wd_ext.get_intra_links(driver, driver.current_url)
    top_ps1 = du.get_ps_plus_1(driver.current_url)
    intra_links = set()
    for elem in intra_elems:
        try:
            href = elem.get_attribute('href')
        except (KeyboardInterrupt, SystemExit):
            raise
        except Exception:
            continue
        if href is None:
            continue
        href = urlparse.urljoin(driver.current_url, href)
        if (not href.startswith('http') or
                du.get_ps_plus_1(href) != top_ps1):
            continue
        intra_links.add(urlparse.urldefrag(href)[0])

    with open(out_file, 'w') as f:
        json.dump([top_url, list(intra_links)], f)


manager = TaskManager.TaskManager(manager_params, browser_params,
                                  process_watchdog=True)
current_index = 0
for i in range(start_index, end_index):
    current_index = i
    if current_index >= TOTAL_NUM_SITES:
        break
    try:
        url = sites[i]
        cs = CommandSequence.CommandSequence(
            'http://'+url,
            reset=True)
        cs.get(sleep=10, timeout=120)
        cs.run_custom_function(save_links_to_file, func_args=(url,), timeout=120)
        manager.execute_command_sequence(cs)
        with open(os.path.expanduser('~/.openwpm/current_site_index'),
                  'w') as f:
            f.write(str(i))
    except CommandExecutionError:
        with open(os.path.expanduser('~/.openwpm/reboot'), 'w') as f:
            f.write(str(1))
        break

print "CLOSING TaskManager after batch"
manager.close()

crawl_utils.clear_tmp_folder()

# Remove index file if we are done
if current_index >= TOTAL_NUM_SITES:
    os.remove(os.path.expanduser('~/.openwpm/current_site_index'))
    with open(os.path.expanduser('~/.openwpm/crawl_done'), 'w') as f:
        f.write(str(1))
print "Total time: " + str(time.time() - start_time)
