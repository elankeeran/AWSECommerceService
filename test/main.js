// test/main.js
var should = require('should');
var AWSECommerceService = require('../lib/main');

describe('AWSECommerceService', function() {
    describe('with no arguments', function() {
        it('returns an empty array', function() {
            var result = AWSECommerceService();
            result.should.eql([]);
        });
    });
});

