#cloud-config
output: {{all: '| tee -a /var/log/cloud-init-output.log'}}

runcmd:
 - git clone https://{}:{}@github.com/englehardt/OpenWPM_Leuven_Princeton.git /home/ubuntu/OpenWPM_Leuven_Princeton
 - cd /home/ubuntu/OpenWPM_Leuven_Princeton
 - yes | ./install.sh
 - yes | ./install-dev.sh
 - sudo sed -i "s/date_prefix =.*/date_prefix = '{}'/" /home/ubuntu/OpenWPM_Leuven_Princeton/measurement_*
 - cd /home/ubuntu/OpenWPM_Leuven_Princeton/identity_project
 - y | ./install.sh
 - chown -R ubuntu:ubuntu /home/ubuntu
 - sudo sed -i "s/XXX.py/{}/" /home/ubuntu/OpenWPM_Leuven_Princeton/run_crawl.sh
 - su - ubuntu -c '(crontab -l 2>/dev/null; echo -e "SHELL=/bin/sh\nPATH=/usr/bin:/usr/local/bin:$PATH\n* * * * * /home/ubuntu/OpenWPM_Leuven_Princeton/run_crawl.sh >> /home/ubuntu/crontab.log 2>&1") | crontab - '
 - touch /home/ubuntu/setup-complete
