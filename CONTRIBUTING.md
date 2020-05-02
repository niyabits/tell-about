# Contributing to tell-about

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Code Organization](code-organization)
- [Running the Project locally](running-the-project-locally)
- [Submitting a Pull Request](submitting-a-pull-request)

## Code of Conduct

tell-about has adopted a Code of Conduct that we expect project participants to adhere to. Please read [the full text](./CODE_OF_CONDUCT.md) so that you can understand what actions will and will not be tolerated.

## Code Organization

tell-about has a fairly simple code organization.

- `src/index.js` : Heart of tell-about.
- `src/index.test.js` : All the test of tell-about
- `utils/` Contains some helper functions to make things look good.

## Running the Project locally

After you have downloaded your own fork of tell-about on your local machine.

1. Run `yarn` in your terminal to install all the packages.
2. Run `npm run validate` to validate that everything is working fine.
3. Run `npm run watch:test` to validate that everything you do doesn't break the application.
4. Make your desired changes.
5. Run `npm run commit` to commit your changes.
6. Run `git push` to push the changes.

## Submitting a Pull Request

On GitHub go to your issue, and only if you have been assigned the issue open a pull request.

If you have not been assigned and the issue has been disccused and has been confirmed as a valid issue/feature request then you can request in the issue itself to be assigned.

After you are assigned the issue you can open the pull request.