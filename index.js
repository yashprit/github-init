/**
 *
 * github init, do init repository and
 * create remote repo on git
 *
 */

import gitLocalCreate from 'git-local-create';
import gitRemoteCreate from 'git-remote-create';
import gitRemoteAdd from 'git-remote-add';
import gitRepoUrl from 'git-repo-url';
import gitFirstCommit from 'git-first-commit';
import chalk from 'chalk';

var githubInit = function(config) {

  let local = new Promise((resolve, reject) => {
    gitLocalCreate(function(err, isCreated) {
      if (err) {
        reject(err);
      } else {
        resolve(isCreated);
      }
    });
  });

  let remote = new Promise((resolve, reject) => {
    gitRemoteCreate(config.token, config.reponame, function(err, isAdded) {
      if (err) {
        reject(err);
      } else {
        resolve(isAdded);
      }
    });
  });

  let remoteAdd = new Promise((resolve, reject) => {
    Promise.all([local, remote]).then(() => {
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

  let firstCommit = new Promise((resolve, reject) => {
    gitFirstCommit(message, function(err, commited) {
      if (err) {
        reject(err);
      } else {
        resolve(commited);
      }
    });
  });

  let commit = new Promise(resolve, reject) {
    Promise.all([remoteAdd, firstCommit]).then((data) => {
      var logMessage = [chalk.blue("Git repo is"), chalk.green(gitRepoUrl.https(config.username, config.reponame))];
      data.message = "\n\n" + logMessage.join(" ") + "\n";
      resolve(data);
    }, (err) => {
      var logMessage = [
        chalk.red("One or more opreation failed, please run manually"),
        chalk.green("1. git init"),
        chalk.green("2. Create repo on github"),
        chalk.green("3. git remote add <reponame>"),
        chalk.green("4. git add --all & git commit -m 'intial commit'") + err
      ];

      logMessage = "\n\n" + logMessage.join("\n")
      reject(logMessage);
    });
  }
  return commit();
}

module.exports = githubInit;