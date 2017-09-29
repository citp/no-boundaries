#!/bin/bash
set -e

sudo pip install -U -r requirements-analysis.txt

#  No need to install pbzip2 and jupyter on Travis
if [ "$TRAVIS" != "true" ]; then
	sudo apt-get install pbzip2
	sudo pip install jupyter
fi
