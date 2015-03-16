'use strict';
exports['truth is true'] = {
  setUp: function(done) {
    done();
  },
  'truth': function(test) {
    test.expect(1);
    test.ok(true, "Truth is true!");
    test.done();
  }
};
