const core = require('@actions/core');
const github = require('@actions/github');
const axios = require('axios');
const api_url = require('../const');

try {
    //const issue = github.context.payload.issue;
    //const branchName = github.context.payload.repository.name;
    const issue_number = github.context.payload
    console.log(github.context.payload.number)
    console.log(github.context.payload.pull_request.number)
    console.log(github.context.payload.pull_request.head.ref)
    console.log(github.context.payload.sender.login)
    // test
    /*
    axios
        .post(api_url + '/api/auth/local', {
            identifier: process.env.BOT_ID,
            password: process.env.BOT_PASSWORD,
        })
        .then((resAuth) => {
            const token = resAuth.data.jwt;
            axios
                .get(api_url + '/api/rewards', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    }
                })
                .then((resRewards) => {
                    const rewards = resRewards.data.data;
                    const reward = rewards.find((d) => d.attributes.issueNumber === issueNumber);
                    if (reward == undefined) throw new Error("該当のIssueが存在しません")
                    if (reward.attributes.githubId !== assigneeId) throw new Error("GithubIdが違います")
                    if (reward.attributes.branchName !== branchName) throw new Error("Branch名が違います")
                    const address = reward.attributes.symbolAddress;
                    const amount = reward.attributes.rewardAmount;
                    axios
                        .get(api_url + '/api/auto-reward?address=' + address + '&amount=' + amount, {
                            headers: {
                                Authorization: `Bearer ${token}`,
                            }
                        })
                        .then((res) => {
                            console.log(res.data);
                        })
                        .catch((error) => {
                            console.error(error.message);
                            throw error;
                        });
                })
                .catch((error) => {
                    console.error(error.message);
                    throw error;
                });
        })
        .catch((error) => {
            console.error(error.message);
            throw error;
        });
    */
} catch (error) {
    core.setFailed(error.message);
}