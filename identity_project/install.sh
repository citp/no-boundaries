AUTHORIZED_KEYS=~/.ssh/authorized_keys

# Copy public keys to authorized keys
printf "WARNING: This will append all public keys in ./public_keys/ to
         $AUTHORIZED_KEYS. Don't run this on your personal machine!\n"
printf "Continue? [y,N]\n"
read -s -n 1 response
if [ "$response" == 'y' ] || [ "$response" == 'Y' ]; then
  printf "\n===== Appending keys =====\n"
  for keyfile in public_keys/*.pub; do
    key="$(cat $keyfile)"
    if ! grep -q "$key" $AUTHORIZED_KEYS; then
      printf "appending $keyfile to $AUTHORIZED_KEYS\n"
      echo $key >> $AUTHORIZED_KEYS
    fi
  done
fi

# Additional dependencies, above that of OpenWPM
printf "\n===== Installing dependencies =====\n"
sudo apt-get install pbzip2
