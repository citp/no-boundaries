#!/usr/bin/env bash

if [[ -f /tmp/crawl.running ]] ; then
    exit
fi
touch /tmp/crawl.running

while [ ! -e ~/.openwpm/crawl_done ] ; do
	echo !!!! Starting crawler !!!!
	python ~/OpenWPM_Leuven_Princeton/crawl.py

	# Reboot if we have crash issues
	if [ -e ~/.openwpm/reboot ] ; then
		echo !!!! Found reboot flag, rebooting !!!!
		rm /tmp/crawl.running
		sudo reboot --force
		exit
	fi
done
rm /tmp/crawl.running
