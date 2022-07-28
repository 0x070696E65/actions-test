const core = require('@actions/core');
const github = require('@actions/github');
const axios = require('axios');

function getValue(data, ward) {
  const lines = data.split("\n");
  function filterWards(arr, query) {
    return arr.filter(function (el) {
      return el.indexOf(query) !== -1;
    });
  }
  const filterd = filterWards(lines, ward);
  return filterd[0].replace(ward, "");
}

try {
  axios
    .post('http://localhost:1337/api/auth/local', {
      identifier: 'matsukawa5955+bot@gmail.com',
      password: 'Bot1234567890',
    })
    .then((response) => {
      console.log('Well done!');
      console.log('User profile', response.data.user);
      console.log('User token', response.data.jwt);

      const issue = github.context.payload.issue;
      const title = issue.title;
      const issue_url = issue.html_url;
      const comment = issue.body;
      const reward_amount = getValue(comment, "#reward=")

      console.log(github.context.payload);

      const data = {
        "data": {
          "issueTitle": title,
          "issueNumber": 0,
          "issueUrl": issue_url,
          "rewardType": 0,
          "rewardAmount": reward_amount,
        }
      }

      axios
        .post('http://localhost:1337/api/rewards', data, {
          headers: {
            Authorization: `Bearer ${response.data.jwt}`,
          }
        })
        .then((response) => {
          console.log('Data: ', response.data);
        })
        .catch((error) => {
          console.log('An error occurred:', error.response);
        });
    })
    .catch((error) => {
      console.log('An error occurred:', error.response);
    });
} catch (error) {
  core.setFailed(error.message);
}