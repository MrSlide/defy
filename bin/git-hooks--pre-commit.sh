#!/bin/sh

echo "Making sure that the code conforms to the coding standard"

if [ -f ./pre-commit ]
then
  cd ../../
fi

npmExec=$(which npm)

if [ $gulpExec != "" ]
then
  exec $npmExec run precommit
fi
