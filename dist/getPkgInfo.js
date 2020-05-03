'use strict';

var fetch = require('node-fetch');
var chalk = require('chalk');
var log = console.log;
var parseISOString = require('./utils/date');
var numberWithCommas = require('./utils/commas');

// Chalk Colors
var title = chalk.magenta.bold;
var error = chalk.red;

var getPackageInfo = function getPackageInfo(packageId) {
  fetch('https://api.npms.io/v2/package/' + packageId).then(function (res) {
    return res.json();
  }).then(function (data) {
    if (data.code === 'NOT_FOUND') {
      log(error('The NPM Package was not found.'));
    } else {
      var metadata = data.collected.metadata;
      var github = data.collected.github;
      var npm = data.collected.npm;


      log();
      log('\t' + chalk.bold.cyan.underline(metadata.name));
      log('\tv' + metadata.version);
      log('\t___');
      log();
      log('\t' + metadata.description);
      log('\n\t' + title('GitHub Stars') + ': ' + numberWithCommas(github && github.starsCount || ''));
      log('\t' + title('Latest Commit was on') + ': ' + parseISOString(github && github.commits[0].to || ''));
      log('\t' + title('Open Issues') + ': ' + (numberWithCommas(github && github.issues.openCount) || ''));
      log('\t' + title('Total Issues') + ': ' + (numberWithCommas(github && github.issues.count) || ''));
      log();
      log('\t' + title('GitHub') + ': ' + chalk.underline.cyan(metadata.links.repository || ''));
      log('\t' + title('Homepage') + ': ' + chalk.underline.cyan(metadata.links.homepage || ''));
      log('\t' + title('License') + ': ' + metadata.license);
      log('\t' + title('Latest Release was on') + ': ' + parseISOString(metadata.releases[0].from || ''));
      log();
      log('\t' + title('Download count') + ': ' + numberWithCommas(npm.downloads[0].count));
      log();

      return true;
    }
  }).catch(function (err) {
    log('Soemthing went wrong! Check the log below:');
    log(err);
  });
};

module.exports = getPackageInfo;