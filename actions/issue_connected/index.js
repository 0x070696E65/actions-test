const core = require('@actions/core');
const github = require('@actions/github');
const axios = require('axios');
const {api_url} = require('../const');

try {
  const payload = JSON.stringify(github.context.payload, undefined, 2)
  console.log(`The event payload: ${payload}`);
  
  console.log(github.context.payload);
  console.log(github.context.payload.repository);
} catch (error) {
  core.setFailed(error.message);
}