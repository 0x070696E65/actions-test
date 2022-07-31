const core = require('@actions/core');
const github = require('@actions/github');
const axios = require('axios');
const { api_url } = require('../const');

try {
    const branchName = github.context.payload.pull_request.head.ref;
    const issueNumber = Number(github.context.payload.pull_request.number);
    const assigneeId = github.context.payload.sender.login;

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
                    let reward = undefined;
                    for(let i = 0; i < rewards.length; i++) {
                        if(rewards[i].attributes.issueNumber) reward = rewards[i];
                    }
                    console.log(reward);
                    if (reward.attributes.issueNumber !== issueNumber) throw new Error("該当のIssueが存在しません");
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
                            console.error("A: " + error.message);
                            throw error;
                        });
                })
                .catch((error) => {
                    console.error("B: " + error.message);
                    throw error;
                });
        })
        .catch((error) => {
            console.error("C: " + error.message);
            throw error;
        });
} catch (error) {
    core.setFailed("D: " + error.message);
}