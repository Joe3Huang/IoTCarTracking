'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  API_URL: '"http://192.168.99.100:8080/RestApi"',
  CLIENT_SECRET: '"JInx5GkilhknZ7TNmSOOHfPkQAUZSOhgec97WMMK"',
  CLIENT_ID: '"2"',
  SOCKET_URL: "'ws://192.168.99.100:8080/Socket'"
})

// module.exports = merge(prodEnv, {
//   NODE_ENV: '"development"',
//   API_URL : '"http://35.197.110.192/RestApi"',
//   CLIENT_SECRET : '"rq0vQncofZlec9CjgqU2I6eIi6YCEbanLvffV2YE"',
//   CLIENT_ID : '"2"',
//   SOCKET_URL : "'ws://35.197.110.192/Socket'"
// })
