const core = require('@actions/core');
const github = require('@actions/github');
const axios = require('axios');

try {
  const issue = github.context.payload.issue;
  const assigneeId = issue.assignee.login;
  console.log(assigneeId);
  const issue_number = issue.number;
  console.log(issue_number);

  axios
    .post('http://localhost:1337/api/auth/local', {
      identifier: 'matsukawa5955+bot@gmail.com',
      password: 'Bot1234567890',
    })
    .then((resAuth) => {
      console.log('User profile', resAuth.data.user);
      const token = resAuth.data.jwt;
      console.log('User token', token);
      axios
        .get('http://localhost:1337/api/users')
        .then((resUser) => {
          const users = resUser.data;
          console.log(users);

          const user = users.find((d) => d.githubId === assigneeId);
          console.log(user);
          const data = {
            "data": {
              "githubId": assigneeId,
              "symbolAddress": user.symbolAddress,
            }
          }
          axios
            .get('http://localhost:1337/api/rewards')
            .then((resReward) => {
              const rewards = resReward.data.data;
              const reward = rewards.find((d) => d.attributes.issueNumber === issueNumber);
              console.log(reward.id);

              axios
                .put('http://localhost:1337/api/rewards/' + reward.id, data, {
                  headers: {
                    Authorization: `Bearer ${token}`,
                  }
                })
                .then((resUpdateReward) => {
                  console.log('Data: ', resUpdateReward.data);
                })
                .catch((error) => {
                  console.log('An error occurred:', error.response);
                });
            })
            .catch((error) => {
              console.log('An error occurred:', error.response);
            });
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
