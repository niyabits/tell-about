#!/usr/bin/env node
'use strict';

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var _require = require('enquirer'),
    prompt = _require.prompt;

var getPackageInfo = require('./getPkgInfo');

var log = console.log;

// Get the arugments passed after the command.
var args = process.argv.slice(2)[0];

if (typeof args !== 'undefined') {
  getPackageInfo(args);
} else {
  var run = function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
      var packageInput;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return prompt({
                type: 'input',
                name: 'name',
                message: 'Enter name of the Package:'
              });

            case 2:
              packageInput = _context.sent;


              getPackageInfo(packageInput.name);

            case 4:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, this);
    }));

    return function run() {
      return _ref.apply(this, arguments);
    };
  }();

  run();
}