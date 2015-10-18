'use strict';
/* eslint no-var: 0, func-names: 0 */

var Base = require('mocha').reporters.Base;
var color = Base.color;

module.exports = Reporter;

function Reporter (runner) {
   var scope = [];
   var pending = [];
   var self = this;
   // var stats = this.stats;
   var width = Base.window.width * 0.75 | 0;
   var n = -1;

   Base.call(this, runner);

   runner.on('start', function () {
      // Clear screen
      process.stdout.write('\u001b[2J');
      process.stdout.write('\u001b[1;3H');
   });

   runner.on('pending', function (test) {
      var current = [test];
      var parent = test.parent;

      if (++n % width === 0) process.stdout.write('\n  ');
      process.stdout.write(color('pending', ' ? '));

      // stack suites
      while ( !!parent ) {
         current.unshift(parent);
         parent = parent.parent;
      }

      // print titles
      current.forEach(function (val, key) {
         if (val !== scope[key]) {
            while ( scope.length > key ) scope.pop();
            pending.push(
               color('pending', '    ' + Array(key).join('  ') + val.title)
            );
            scope.push(val);
         }
      });
   });

   runner.on('pass', function (test) {
      if (++n % width === 0) process.stdout.write('\n  ');
      if (test.speed === 'slow') {
         process.stdout.write(color('bright yellow', '!'));
      } else {
         process.stdout.write(color('bright pass', '-'));
      }
   });

   runner.on('fail', function (/*test, err*/) {
      if ((++n % width) === 0) process.stdout.write('\n  ');
      process.stdout.write(color('fail', ' ' + Base.symbols.err + ' '));
   });

   runner.on('end', function () {
      console.log('\n');
      console.log(color('pending', '  Pending tests:'));
      console.log(pending.join('\n'));
      self.epilogue();
   });

}

Reporter.prototype = Object.create(Base.prototype);
