const core = require('@actions/core');
const github = require('@actions/github');
const axios = require('axios');
const api_url = "";
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
    .post(api_url + '/api/auth/local', {
      identifier: 'matsukawa5955+bot@gmail.com',
      password: 'Bot1234567890',
    })
    .then((resAuth) => {
      const token = resAuth.data.jwt;
      const issue = github.context.payload.issue;
      const title = issue.title;
      const issue_number = issue.number;
      const issue_url = issue.html_url;
      const comment = issue.body;
      const reward_amount = getValue(comment, "#reward=")

      const data = {
        "data": {
          "issueTitle": title,
          "issueNumber": issue_number,
          "issueUrl": issue_url,
          "rewardType": 0,
          "rewardAmount": reward_amount,
        }
      }

      axios
        .post(api_url + '/api/rewards', data, {
          headers: {
            Authorization: `Bearer ${token}`,
          }
        })
        .then((resReward) => {
          console.log('Data: ', resReward.data);
        })
        .catch((error) => {
          core.setFailed(error.message);
        });
    })
    .catch((error) => {
      core.setFailed(error.message);
    });
} catch (error) {
  core.setFailed(error.message);
}