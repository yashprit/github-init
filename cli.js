#!/usr/bin/env node

'use strict';
var meow = require('meow');
var githubInit = require('./lib');

var cli = meow({
  help: [
    'Usage',
    '  github-init <input>',
    '',
    'Example',
    '  github-init Unicorn'
  ].join('\n')
});

githubInit (cli.input[0]);
