var http = require('http')
var agent = require('http-ssh-agent')

// per default the agent will authenticate using ~/.ssh/id_rsa as your private key
var ssh = agent('ssh.github.com')

http.get({
  port: 443, // assuming the remote server is running on port 8080
  host: 'github.com', // the host is resolved via ssh so 127.0.0.1 -> example.com
  agent: ssh // simply pass the agent
}, function(response) {
  response.pipe(process.stdout)
});
