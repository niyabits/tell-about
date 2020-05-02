#!/usr/bin/env node
const {prompt} = require('enquirer');
const getPackageInfo = require('./getPkgInfo');

const log = console.log;

// Get the arugments passed after the command.
const args = process.argv.slice(2)[0];

if (typeof args !== 'undefined') {
  getPackageInfo(args);
} else {
  async function run() {
    const packageInput = await prompt({
      type: 'input',
      name: 'name',
      message: 'Enter name of the Package:',
    });

    getPackageInfo(packageInput.name);
  }
  run();
}
