const fetch = require('node-fetch');
const chalk = require('chalk');
const log = console.log;
const parseISOString = require('./utils/date');
const numberWithCommas = require('./utils/commas');

// Chalk Colors
const title = chalk.magenta.bold;
const error = chalk.red;

const getPackageInfo = (packageId) => {
  fetch(`https://api.npms.io/v2/package/${packageId}`)
    .then((res) => res.json())
    .then((data) => {
      if (data.code === 'NOT_FOUND') {
        log(error('The NPM Package was not found.'));
      } else {
        const {metadata} = data.collected;
        const {github} = data.collected;
        const {npm} = data.collected;

        log();
        log('\t' + chalk.bold.cyan.underline(metadata.name));
        log('\tv' + metadata.version);
        log('\t___');
        log();
        log('\t' + metadata.description);
        log(
          `\n\t${title('GitHub Stars')}: ${numberWithCommas(github.starsCount)}`
        );
        log(
          `\t${title('Latest Commit was on')}: ${parseISOString(
            github.commits[0].to
          )}`
        );
        log(
          `\t${title('Open Issues')}: ${numberWithCommas(
            github.issues.openCount
          )}`
        );
        log(
          `\t${title('Total Issues')}: ${numberWithCommas(github.issues.count)}`
        );
        log();
        log(
          `\t${title('GitHub')}: ${chalk.underline.cyan(
            metadata.links.repository
          )}`
        );
        log(
          `\t${title('Homepage')}: ${chalk.underline.cyan(
            metadata.links.homepage
          )}`
        );
        log(`\t${title('License')}: ${metadata.license}`);
        log(
          `\t${title('Latest Release was on')}: ${parseISOString(
            metadata.releases[0].from
          )}`
        );
        log();
        log(
          `\t${title('Download count')}: ${numberWithCommas(
            npm.downloads[0].count
          )}`
        );
        log();

        return true;
      }
    })
    .catch((err) => {
      log('Soemthing went wrong! Check the log below:');
      log(err);
    });
};

module.exports = getPackageInfo;
