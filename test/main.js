"use strict";
var config = require('../config');
var should = require('should');
var AWSECommerceService = require('../lib/main');


describe('AWSECommerceService', function() {
	 	var result = new AWSECommerceService({
            'publicKey'     : config.accessKey.publicKey,
            'privateKey'    : config.accessKey.privateKey,
            'affiliateTag'  : config.accessKey.affiliateTag
        });

        it('base URL webservices.amazon.com', function() {
           result.baseURL.host.should.equal("webservices.amazon.com");
        });

        it('method should be GET' , function(){
        	 result.baseURL.method.should.equal("GET");
        });

        it('method should be GET' , function(){
             result.getSignedUrl().should.equal(0);
        });
});
