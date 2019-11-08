#!/bin/bash
set -euxo pipefail

#
# See http://qaru.site/questions/72791/checking-from-shell-script-if-a-directory-contains-files
#

pushd /www/web-app/frontend

files=$(shopt -s nullglob dotglob; echo /www/web-app/frontend/node_modules/*)
if (( ${#files} ))
then  # /db/mysql/ is not empty
  echo "starting react"
  npm run build
  serve -s build &
else  # /db/mysql/ is empty or not exist
  echo "installing node modules for react"
  npm install
  echo "starting react"
  npm run build
  serve -s build &
fi

popd
