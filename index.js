/**
 *
 * github init, do init repository and
 * create remote repo on git
 *
 */

'use strict';

var gitLocalCreate = require('git-local-create');
var gitRemoteCreate = require('git-remote-create');
var gitRemoteAdd = require('git-remote-add');
var gitRepoUrl = require('git-repo-url');
var gitFirstCommit = require('git-first-commit');
var async = require('async');


var githubInit = function(config) {
  async.parallel([

    function(callback) {
      gitLocalCreate(function(err, status) {
        if (err) {
          callback(err);
        } else {
          callback(null, status);
        }
      })
    },
    function(callback) {
      gitRemoteCreate(config.token, config.reponame, function(err, status) {
        if (err) {
          callback(err);
        } else {
          callback(null, status);
        }
      });
    }
  ], function(err, results) {
    console.log(err, results);
    async.series([

      function(callback, results) {
        gitRemoteAdd(config.username, config.reponame, function(err, status) {
          console.log("remoteAdd ", err, status)
          if (err) {
            callback(err);
          } else {
            callback(null, status);
          }
        })
      },
      function(callback, results) {
        var message = config.message || "intial commit"
        gitFirstCommit(config.message, function(err, status) {
          console.log("gitAdd ", err, status)
          if (err) {
            callback(err);
          } else {
            var logMessage = "\n\n" +
              "Git repo is ".blue + gitRepoUrl.https(config.username, config.reponame).green + "\n"
            callback(null, logMessage)
          }
        });
      }
    ])
  });
}

module.exports = githubInit;
