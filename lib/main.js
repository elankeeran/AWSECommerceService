"use strict";

// You need Access Identifiers to make valid web service requests.
// Please visit the Access Identifiers section of your account
// to obtain your identifier and to learn more:
// http://aws-portal.amazon.com/gp/aws/developer/account/index.html?action=access-key

var Client = module.exports = exports = function Client(options) {
  if (!options.publicKey) throw new Error('aws "publicKey" required');
  if (!options.privateKey) throw new Error('aws "privateKey" required');
  if (!options.affiliateTag) throw new Error('aws "affiliateTag" required');

	this.baseURL = {
		'method' 			: 'GET',
		'host'				: 'webservices.amazon.com',
		'uri'				: '/onca/xml',
		'AWSAccessKeyId'	: options.publicKey
	};


	var generateSignature = function(params){
		var param = {
			'service'			: 'AWSECommerceService',
			'AWSAccessKeyId'	: this.baseURL.AWSAccessKeyId,
			'timestamp'			: new Date().getTime(),
			'version'			: '2009-10-01'
		};

		return param;
	};
};

/**
* Get signed url response
* @param string region
* @param array params
* @return string signedUrl a query url with signature
*/

Client.prototype.getSignedUrl = function(params){
	var signedUrl = "";
	var signature = this.generateSignature(params);
	return signedUrl = "http://" + this.baseURL.host + this.baseURL.uri + '?Service=' + this.baseURL.service + '&AWSAccessKeyId=';
};

/*$parameters=array(
	"region"=>"com",
	"AssociateTag"=>'affiliateTag',
	"Condition"=>"All",
	"Operation"=>"ItemSearch",
	'ResponseGroup'=>'Large',
	"SearchIndex"=>"Books",
	"Keywords"=>$isbn //"145161036X"
);*/
