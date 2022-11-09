#!/usr/bin/env node

const core = require("@actions/core");
const { context, GitHub } = require("@actions/github");

async function run() {
    const trigger = core.getInput("trigger", { required: true });
    const regexp = new RegExp(trigger, "g")
    const triggered= "triggered"
    const trigger_var = "trigger_var"

    const body = context.payload.pull_request.body || '';
    console.log("pull request body: \n"+body)
    if (regexp.test(body)) {
        core.setOutput(triggered, "true")
        console.log(regexp.exec(body))
        const word = regexp.exec(body)[1]
        core.setOutput(trigger_var, word)
    } else {
        core.setOutput(triggered, "false")
    }
}

run().catch(err => {
    console.error(err);
    core.setFailed("Unexpected error");
});
