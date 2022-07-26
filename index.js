const core = require('@actions/core');
const github = require('@actions/github');
const fs = require('fs');
require('dotenv').config();

function test(){
    fs.readFile('.env', 'utf-8', function(err, data) {
        var ward = "ADDRESS";
        const lines = data.split("\n");

        console.log(lines);

        function filterWards(arr, query) {
            return arr.filter(function(el) {
                return el.indexOf(query) == -1;
            });
        }
        const henkou = filterWards(lines, ward);
        console.log(henkou);

        fs.writeFile(".env", henkou.join("\n"), function(err) {});
    });
}
try {
  // `who-to-greet` input defined in action metadata file
  const nameToGreet = core.getInput('who-to-greet');
  console.log(`Hello ${nameToGreet}!`);
  const time = (new Date()).toTimeString();
  const address = process.env.ADDRESS;
  const fee = process.env.FEE;
  console.log(address);
  console.log(fee);
  core.setOutput("time", time);
  // Get the JSON webhook payload for the event that triggered the workflow
  const payload = JSON.stringify(github.context.payload, undefined, 2)
  console.log(`The event payload: ${payload}`);
  test();
} catch (error) {
  core.setFailed(error.message);
}