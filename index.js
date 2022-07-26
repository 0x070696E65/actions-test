const core = require('@actions/core');
const github = require('@actions/github');
require('dotenv').config();

try {
  // `who-to-greet` input defined in action metadata file
  const nameToGreet = core.getInput('who-to-greet');
  console.log(`Hello ${nameToGreet}!`);
  const time = (new Date()).toTimeString();
  const address = process.env.ADDRESS;
  console.log(address);
  core.setOutput("time", time);
  const testadd = core.getInput('branch_dev');
  console.log(testadd);
  console.log(github.context);
  // Get the JSON webhook payload for the event that triggered the workflow
  const payload = JSON.stringify(github.context.payload, undefined, 2)
  console.log(`The event payload: ${payload}`);
} catch (error) {
  core.setFailed(error.message);
}