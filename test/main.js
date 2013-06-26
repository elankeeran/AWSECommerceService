"use strict";
var should = require('should');
var AWSECommerceService = require('../lib/main');

describe('AWSECommerceService', function() {
	 	var result = new AWSECommerceService({
        	publicKey : 'xxxxxx',
        	privateKey : 'aaaaas',
        	affiliateTag : 'affiliateTag'
        });

        it('base URL webservices.amazon.com', function() {
           result.baseURL.host.should.equal("webservices.amazon.com");
        });

        it('method should be GET' , function(){
        	 result.baseURL.method.should.equal("GET");
        });
});
