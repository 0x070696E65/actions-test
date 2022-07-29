const core = require('@actions/core');
const github = require('@actions/github');
const axios = require('axios');
const api_url = "";

try {
  console.log(github.context.payload);
} catch (error) {
  core.setFailed(error.message);
}