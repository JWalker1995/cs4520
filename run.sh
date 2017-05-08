#!/bin/bash

sudo service postgresql start
nvm use v7.9.0
node app.js
