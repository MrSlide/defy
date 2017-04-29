#!/bin/sh

echo "Making sure that the code conforms to the coding standard"

if [ -f ./pre-commit ]
then
  cd ../../
fi

exec npm run precommit
