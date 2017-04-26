"""
A stateless crawl of the top sites where we try to log in with Facebook

The following instrumentation is enabled:
* Javascript calls
* Cookie Access
* HTTP Requests and Responses
* Javascript Bodies
* JS Errors

"""
from automation import TaskManager, CommandSequence
from automation.Errors import CommandExecutionError
import crawl_utils
import time
import os

# The list of sites that we wish to crawl
NUM_BROWSERS = 15
NUM_BATCH = 5000
TOTAL_NUM_SITES = 35000

manager_params, browser_params = TaskManager.load_default_params(NUM_BROWSERS)

prefix = '2017-04-25_facebook_login_1'
manager_params['database_name'] = prefix + '.sqlite'
manager_params['data_directory'] = '~/' + prefix
manager_params['log_directory'] = '~/' + prefix

# Read the site list
sites = crawl_utils.sample_top_sites(location=manager_params['data_directory'])

for i in xrange(NUM_BROWSERS):
    browser_params[i]['headless'] = True
    browser_params[i]['js_instrument'] = True
    browser_params[i]['cookie_instrument'] = True
    browser_params[i]['http_instrument'] = True
    browser_params[i]['save_javascript'] = True
    browser_params[i]['record_js_errors'] = True

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

manager = TaskManager.TaskManager(manager_params, browser_params,
                                  process_watchdog=True)
current_index = 0
for i in range(start_index, end_index):
    current_index = i
    if current_index >= TOTAL_NUM_SITES:
        break
    try:
        command_sequence = CommandSequence.CommandSequence(
            'http://'+sites[i], reset=True)
        command_sequence.get(sleep=3, timeout=120)
        command_sequence.facebook_login(sites[i], timeout=120)
        command_sequence.save_screenshot(sites[i])
        command_sequence.recursive_dump_page_source('post_login')
        command_sequence.browse_and_dump_source(num_links=5,
                                                sleep=3,
                                                timeout=120)
        manager.execute_command_sequence(command_sequence)
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
