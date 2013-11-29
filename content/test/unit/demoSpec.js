'use strict';
/*global AsyncSpec: false, describe: false, expect: false, it: false */

describe('math', function () {
  it('should handle addition', function () {
    var n = 2;
    expect(n).toBe(2);
  });
});

describe('async', function () {
  var async = new AsyncSpec(this);

  async.beforeEach(function (done) {
    setTimeout(function () {
      // do something here
      done();
    }, 10);
  });

  // can do the same with async.afterEach

  async.it('should work', function (done) {
    var n = 2;
    setTimeout(function () {
      n++;
      expect(n).toBe(3);
      done();
    }, 10);
  });
});
