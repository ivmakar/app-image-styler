#!/bin/bash
set -euxo pipefail

#download neurl network models and style images
pushd /www/styler

files=$(shopt -s nullglob dotglob; echo /www/styler/models/*)
if (( ${#files} ))
then  # /db/mysql/ is not empty
  echo "models already exists"
else  # /db/mysql/ is empty or not exist
  echo "downloading models"
  bash /www/styler/download_model.sh
fi

popd
