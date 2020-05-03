const fetch = require('node-fetch');
const chalk = require('chalk');
const parseISOString = require('./utils/date');
const numberWithCommas = require('./utils/commas');

// Chalk Colors
// ONLY USE MAGENTA, CYAN, RED AND YELLOW
const title = chalk.yellow.bold;
const error = chalk.red;
const link = chalk.underline.cyan;

// Spacing
const s = '\t';

const log = console.log;
// Configure log to modified log
// We always need 2 things, a field and a value.
// The field is a static string while the value comes from the API.
function mlog(field, value, type) {
  // The value could be a number, date or string.
  // We need to reformat the numbers and date.
  let newValue;
  if (typeof value === 'number') {
    newValue = numberWithCommas(value);
  } else if (type === 'link') {
    newValue = link(value);
  } else {
    newValue = value;
  }

  log(s + title(field) + ': ' + newValue);
}

const getPackageInfo = (packageId) => {
  fetch(`https://api.npms.io/v2/package/${packageId}`)
    .then((res) => res.json())
    .then((data) => {
      if (data.code === 'NOT_FOUND') {
        log(error('The NPM Package was not found.'));
      } else {
        const {metadata} = data.collected;

        log();
        log(s + chalk.bold.magentaBright.underline(metadata.name));
        log(s + 'v' + metadata.version);
        log(s + '___');
        log();
        log(s + metadata.description);
        log();
        /*
         *
         *  NPM + LINKS
         */
        const {npm} = data.collected;
        mlog('Download Count', npm.downloads[0].count);
        mlog('Latest Release', metadata.releases[0].from);
        /*
         *
         * Links
         */
        const {links} = metadata;
        mlog('Homepage', links.homepage, 'link');
        log();
        mlog('npm', links.npm, 'link');
        mlog('Repository', links.repository, 'link');
        /*
         *
         * GITHUB METADATA
         */
        const {github} = data.collected;
        if (typeof github !== 'undefined') {
          log();
          mlog('GitHub Stars', github.starsCount);
          mlog('Latest Commit', github.commits[0].to);
          mlog('Open Issues', github.issues.openCount);
          mlog('Total Issues', github.issues.count);
        }

        mlog('License', metadata.license);
        log('\n');
      }
    })
    .catch((err) => {
      log('Soemthing went wrong! Check the log below:');
      log(err);
    });
};

module.exports = getPackageInfo;
