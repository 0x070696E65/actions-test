const core = require('@actions/core');
const github = require('@actions/github');

require('dotenv').config();

function getValue(data, ward){
    const lines = data.split("\n");
    console.log(lines);

    function filterWards(arr, query) {
        return arr.filter(function(el) {
            return el.indexOf(query) !== -1;
        });
    }
    const filterd = filterWards(lines, ward);
    return filterd[0].replace(ward, "");
}

try {
  // `who-to-greet` input defined in action metadata file
  const payload = JSON.stringify(github.context.payload, undefined, 2)
  console.log(`The event payload: ${payload}`);
  console.log(github.context.payload.issue.title);
  console.log(github.context.payload.issue.body);
  const comment = github.context.payload.issue.body;
  console.log(getValue(comment, "#reward="))
  console.log(getValue(comment, "#address="))
} catch (error) {
  core.setFailed(error.message);
}