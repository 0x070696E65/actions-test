const core = require('@actions/core');
const github = require('@actions/github');

require('dotenv').config();

try {
  const issue = github.context.payload.issue;
  const assigneeId = issue.assignee.login;
  console.log(assigneeId);
  const issue_number = issue.number;
  console.log(issue_number);

  const resAuth = await axios
    .post('http://localhost:1337/api/auth/local', {
      identifier: 'matsukawa5955+bot@gmail.com',
      password: 'Bot1234567890',
    })
  console.log('User profile', resAuth.data.user);
  const token = resAuth.data.jwt;
  console.log('User token', token);

  const resUser = await axios
    .get('http://localhost:1337/api/users');

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

  const resReward = await axios
    .get('http://localhost:1337/api/rewards');
  const rewards = resReward.data.data;
  const reward = rewards.find((d) => d.attributes.issueNumber === issueNumber);
  console.log(reward.id);

  const resUpdateReward = await axios
    .put('http://localhost:1337/api/rewards/' + reward.id, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    })
  console.log('Data: ', resUpdateReward.data);
} catch (error) {
  core.setFailed(error.message);
}
