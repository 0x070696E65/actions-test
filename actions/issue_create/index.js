const core = require('@actions/core');
const github = require('@actions/github');

require('dotenv').config();

try {
  // `who-to-greet` input defined in action metadata file
  const payload = JSON.stringify(github.context.payload, undefined, 2)
  console.log(`The event payload: ${payload}`);
  console.log(github.context.payload.issue.title);
  console.log(github.context.payload.issue.body);
} catch (error) {
  core.setFailed(error.message);
}