/**
 *
 * github init, do init repository and
 * create remote repo on git
 *
 */

'use strict';

var
  isGit = require("is-git"),
  fs = require("fs"),
  Promise = require("bluebird"),
  request = require("request"),
  exec = require("child_process").exec;

var gitLocalCreate = require('git-local-create');
var gitRemoteCreate = require('git-remote-create');
var gitRemoteAdd = require('git-remote-add');
var gitRepoUrl = require('git-repo-url');
var gitFirstCommit = require('git-first-commit');


var githubInit = function(config) {

  gitLocalCreate(function(err, status) {
    if (status) {
      gitRemoteCreate(config.token, config.reponame, function(err, status) {
        if (status) {
          gitRemoteAdd(config.username, config.reponame, function(err, status) {
            if (status) {
              var message = config.message || "intial commit"
              gitFirstCommit(config.message, function(err, status) {
                var logMessage = "\n\n" +
                  "Git repo is ".blue + gitRepoUrl.https(config.username, config.reponame).green + "\n"
                console.log(logMessage);
              });
            }
          })
        }
      })
    }
  });
}

module.exports = githubInit;
