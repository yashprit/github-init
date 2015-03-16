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
  request = require("request");


var API_ENDPOINT = "https://api.github.com/repos/yashprit/is-git1"

var doGet = function(param, callback) {
  request((API_ENDPOINT + param), function(err, data) {
    if (err) {
      callback(err);
      return
    }

    if (data.message === "Not Found") {
      callback(new Error("Error couldn\t find username"))
      return;
    }

    if (data.name) {
      callback(null, data);
      return;
    }
  });
}

/**
 * Promise wrapper around isGit
 *
 * @api @private
 *
 * @return {Boolean} is current directory is git directory or not
 */
var checkGit = function(fn) {
  return new Promise(function(resolve, reject) {
    isGit(function(err, exist) {
      if (err) reject(err);
      resolve(exists);
    });
  });
}

/**
 * run git init locally
 *
 * @api @private
 *
 * @throws {Error} If git init command fails
 *
 * @return {Promise} status of command
 *
 */
var doGitInit = function() {

}

/**
 * Check for remote repo present on not
 * @return {Boolean} file present or not
 */
var checkForRemote = function() {

}

/**
 * checks for repository exists, if not create new NODEJS repository
 *
 * @api @private
 *
 * @throws {Error} If remote send anything other than 200 OK
 *
 * @return {Promise} status of command
 */
var createRemoteRepo = function() {

}

/**
 * Link local repository with remote repository
 *
 * @api @private
 *
 * @return {Boolean} flag to tell success or error
 */
var doRemoteAdd = function() {

}

/**
 * Check if local and remote are linked to each other or not
 *
 * @api @private
 *
 * @return {Boolean} status of link
 */
var checkForremote = function() {

}

/**
 * Template function call all internal api as chainable promises
 *
 * @api @public
 *
 * @throws {Error} If any internal methods throws it
 */
var githubInit = function(username, token) {
  var module = process.cwd().split("/").pop(0);

  checkGit()
    .then(function(exists) {
      if (exists) {
        createRemoteRepo({
          username: username,
          token: token,
          repo: repo
        }, function(err, data) {
          console.log(data);
        })
      }
    })
    .catch(function(err) {
      console.log(err);
    });
}

module.exports = githubInit;
