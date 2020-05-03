'use strict';

var expect = require('chai').expect;
var numWithCommas = require('./utils/commas');
var convToDateStr = require('./utils/date');

describe('Add Commas Helper Function', function () {
  it('should contain commas for > 3 digit nums.', function () {
    expect(containsCommas(numWithCommas(9999999))).to.be.true;
  });
  it('should not contain commas for <= 3 digit nums', function () {
    expect(containsCommas(numWithCommas(999))).to.be.false;
  });
});

function containsCommas(number) {
  return number.includes(',');
}

describe('ISO Strings converting to Date strings correctly', () => {
  it('Should return a date string.', () => {
    expect(returnsString(convToDateStr('2020-03-19T19:53:13.309Z'))).to.be.true;
  });

  it('Should return an empty string.', () => {
    expect(returnsString(convToDateStr(undefined))).to.be.true;
  });
});

function returnsString(ISOStr) {
  return typeof convToDateStr(ISOStr) === 'string';
}
