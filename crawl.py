"""
A stateless crawl of 50,000 sites to test current instrumentation

* Extension-based HTTP Instrumentation
* Extension-based Cookies
* JS calls
* JS bodies
* HTTP Proxy
* Autofill enabled

XXX: You MUST update the xpi manually. I have to disable it in this branch
     because the cronjob I use to run the crawl doesn't find jpm.
"""
from automation import TaskManager, CommandSequence
from automation.Errors import CommandExecutionError
import crawl_utils
import time
import os
from automation.Commands.utils.form_utils import fill_input_elements_and_submit

# The list of sites that we wish to crawl
NUM_BROWSERS = 15
NUM_BATCH = 5000
TOTAL_NUM_SITES = 5000

manager_params, browser_params = TaskManager.load_default_params(NUM_BROWSERS)

prefix = '2017-01_social_spoofing_and_form_filling'
manager_params['database_name'] = prefix + '.sqlite'
manager_params['data_directory'] = '~/' + prefix
manager_params['log_directory'] = '~/' + prefix

# Read the site list
sites = crawl_utils.get_top_1m(location=manager_params['data_directory'])

for i in xrange(NUM_BROWSERS):
    browser_params[i]['headless'] = True
    browser_params[i]['js_instrument'] = True
    browser_params[i]['cookie_instrument'] = True
    browser_params[i]['http_instrument'] = True
    browser_params[i]['save_javascript'] = True
    browser_params[i]['spoof_social_login'] = True
    browser_params[i]['record_js_errors'] = True
    #browser_params[i]['custom_prefs'] = {"signon.rememberSignons": True}
    #browser_params[i]['extension']['fakeAutofill'] = True

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

manager = TaskManager.TaskManager(manager_params, browser_params, process_watchdog=True)
current_index = 0
for i in range(start_index, end_index):
    current_index = i
    try:
        cs = CommandSequence.CommandSequence('http://'+sites[i], reset=True)
        cs.get(sleep=10, timeout=120)
        cs.run_custom_function(fill_input_elements_and_submit, (), timeout=100)
        manager.execute_command_sequence(cs)
        with open(os.path.expanduser('~/.openwpm/current_site_index'),'w') as f:
            f.write(str(i))
    except CommandExecutionError:
        with open(os.path.expanduser('~/.openwpm/reboot'), 'w') as f:
            f.write(str(1))
        break
    if current_index >= TOTAL_NUM_SITES:
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
