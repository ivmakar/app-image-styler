#!/bin/bash
set -euxo pipefail

#
# See http://qaru.site/questions/72791/checking-from-shell-script-if-a-directory-contains-files
#

pushd /www/web-app/backend

files=$(shopt -s nullglob dotglob; echo /www/webapp/backend/node_modules/*)
if (( ${#files} ))
then  # /db/mysql/ is not empty
  echo "starting node server"
  npm start &
else  # /db/mysql/ is empty or not exist
  echo "installing node modules for node server"
  npm install
  echo "starting node server"
  npm start &
fi

popd
