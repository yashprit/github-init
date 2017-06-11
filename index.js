/**
 *
 * github init, do init repository and
 * create remote repo on git
 *
 */

var gitLocalCreate = require('git-local-create');
var gitRemoteCreate = require('git-remote-create');
var gitRemoteAdd = require('git-remote-add');
var gitRepoUrl = require('git-repo-url');
var gitFirstCommit = require('git-first-commit');
var chalk = require('chalk');

var githubInit = function(config) {

  let local = function() {
    return new Promise((resolve, reject) => {
      gitLocalCreate(function(err, isCreated) {
        if (err) {
          reject(err);
        } else {
          resolve(isCreated);
        }
      });
    });
  }

  let remote = function() {
    return new Promise((resolve, reject) => {
      gitRemoteCreate(config.token, config.reponame, function(err, isAdded) {
        if (err) {
          reject(err);
        } else {
          resolve(isAdded);
        }
      });
    });
  }

  let remoteAdd = function() {
    return new Promise((resolve, reject) => {
      Promise.all([local(), remote()]).then((result) => {
        gitRemoteAdd(config.username, config.reponame, function(err, remoteAdded) {
          if (err) {
            reject(err);
          } else {
            resolve(remoteAdded);
          }
        });
      }, (err) => {
        reject(err);
      })
    });
  }

  let firstCommit = function() {
    return new Promise((resolve, reject) => {
      let message = config.message || "intial commit"
      gitFirstCommit(message, function(err, commited) {
        if (err) {
          reject(err);
        } else {
          resolve(commited);
        }
      });
    });
  }

  let commit = function() {
    return new Promise((resolve, reject) => {
      remoteAdd().then(data => {
        firstCommit().then(result => {
          var logMessage = [chalk.blue("Git repo is"), chalk.green(gitRepoUrl.https(config.username, config.reponame))];
          data.message = "\n\n" + logMessage.join(" ") + "\n";
          resolve(data);
        }, error => {
          var logMessage = [
            chalk.red("One or more opreation failed, please run manually"),
            chalk.green("1. git init"),
            chalk.green("2. Create repo on github"),
            chalk.green("3. git remote add <reponame>"),
            chalk.green("4. git add --all & git commit -m 'intial commit'") + error
          ];

          logMessage = "\n\n" + logMessage.join("\n")
          reject(logMessage);
        });
      }, error => {
        var logMessage = [
          chalk.red("One or more opreation failed, please run manually"),
          chalk.green("1. git init"),
          chalk.green("2. Create repo on github"),
          chalk.green("3. git remote add <reponame>"),
          chalk.green("4. git add --all & git commit -m 'intial commit'") + error
        ];

        logMessage = "\n\n" + logMessage.join("\n")
        reject(logMessage);
      });
    });
  }
  return commit();
}

module.exports = githubInit;