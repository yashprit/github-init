#!/usr/bin/env node

'use strict';
var args = require('minimist')(process.argv.slice(2))
var githubInit = require('./');

var username = args.u;
var reponame = args.r;
var token = args.t;


githubInit({
  username: username,
  reponame: reponame,
  token: token,
  callback: function(err, data) {
    console.log(err, data);
  }
});
