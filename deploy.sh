#!/bin/bash

git push heroku master
if [ $? -eq 0 ]
then
    heroku config:set DB_MIGRATION_LAST=`date +%s`
fi
