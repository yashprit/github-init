/**
 *
 * github init, do init repository and
 * create remote repo on git
 *
 */

'use strict';

var
  gitLocalCreate = require('git-local-create'),
  gitRemoteCreate = require('git-remote-create'),
  gitRemoteAdd = require('git-remote-add'),
  gitRepoUrl = require('git-repo-url'),
  gitFirstCommit = require('git-first-commit'),
  async = require('async'),
  colors = require('colors');


var githubInit = function(config) {

  async.auto({
    local: function(callback) {
      gitLocalCreate(function(err, isCreated) {
        if (err) {
          callback(err);
        } else {
          callback(null, isCreated);
        }
      })
    },
    remote: function(callback) {
      gitRemoteCreate(config.token, config.reponame, function(err, isAdded) {
        if (err) {
          callback(err);
        } else {
          callback(null, isAdded);
        }
      });
    },
    remoteAdd: ['local', 'remote',
      function(callback, results) {
        gitRemoteAdd(config.username, config.reponame, function(err, remoteAdded) {
          if (err) {
            callback(err);
          } else {
            callback(null, remoteAdded);
          }
        })
      }
    ],
    commit: ['remoteAdd',
      function(callback, results) {
        var message = config.message || "intial commit"
        gitFirstCommit(message, function(err, commited) {
          if (err) {
            var logMessage = "\n\n" +
              "One or more opreation failed, please run manually\n".red +
              "1. git init \n".green +
              "2. Create repo on github\n".green +
              "3. git remote add <reponame>\n".green +
              "4. git add --all & git commit -m 'intial commit'\n".green +
              err
            callback(logMessage);
          } else {
            var logMessage = "\n\n" +
              "Git repo is ".blue + gitRepoUrl.https(config.username, config.reponame).green + "\n";
            results.message = logMessage
            callback(null, results);
          }
        });
      }
    ]
  }, function(err, results) {
    config.callback(err, results);
  });

}

module.exports = githubInit;
