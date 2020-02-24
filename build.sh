#!/usr/bin/env bash

# generate the jsDoc
cd ./jsdoc/
jsdoc -c ./jsdoc.conf

# generate the VUEjs app
npm run build

# delete old docu
cd ..
rm -r ./docs/*
cp -r ./jsdoc/dist/ ./docs
