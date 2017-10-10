#!/bin/bash
# Script to check error rate of crawls

# Exit if we hit any errors
set -e

if [ "$#" -lt 1 ]; then
    echo "Usage: ./check_crawl.sh <server_ip_or_hostname>"
    exit 1
fi

key=/home/***REMOVED***/.ssh/crawler_access
LOG_FILE=/home/ubuntu/crontab.log
INDEX_FILE=/home/ubuntu/.openwpm/current_site_index
host=ubuntu@$1
HIDE_SINGLE_ERRORS=true

printf '\nTail of crontab log: \n'
printf '==================== \n'
ssh -o StrictHostKeyChecking=no -i $key $host 'tail -n 30 '$LOG_FILE

printf '\nTotal number of visits: \n'
printf '======================= \n'
ssh -o StrictHostKeyChecking=no -i $key $host 'cat '$INDEX_FILE

printf '\n\nTotal number of timeouts: \n'
printf '========================= \n'
ssh -o StrictHostKeyChecking=no -i $key $host 'cat '$LOG_FILE' | grep "Timeout" | wc -l'

printf '\nDisk Usage:\n'
printf '=========== \n'
disk=`ssh -o StrictHostKeyChecking=no -i $key $host 'df -h'`
echo "$disk" | head -n 1
echo "$disk" | grep "/$"

printf '\nError counts: \n'
printf '============= \n'
ssh -o StrictHostKeyChecking=no -i $key $host 'cat '$LOG_FILE' | grep "ERROR    - BROWSER" | cut -d ":" -f 2- | sort | uniq -c | sort -n -r'

printf '\nBrowser crash counts: \n'
printf '===================== \n'
if [ $HIDE_SINGLE_ERRORS ]; then
  ssh -o StrictHostKeyChecking=no -i $key $host 'cat '$LOG_FILE' | grep -B 2 "Received failure status while executing command" | grep -A 1 "\-\-" | sed "/--\s*/d" | sort | uniq -c | sed -r "/^\s*1\s+/d" | sort -n -r'
  single_errors=`ssh -o StrictHostKeyChecking=no -i $key $host 'cat '$LOG_FILE' | grep -B 2 "Received failure status while executing command" | grep -A 1 "\-\-" | sed "/--\s*/d" | sort | uniq -c | grep -P "^\s*1\s+" | wc -l'`
  echo "$single_errors single-line errors hidden"
else
  ssh -o StrictHostKeyChecking=no -i $key $host 'cat '$LOG_FILE' | grep -B 2 "Received failure status while executing command" | grep -A 1 "\-\-" | sed "/--\s*/d" | sort | uniq -c | sort -n -r'
fi
