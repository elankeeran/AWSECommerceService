"use strict";
var config = require('../config');
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


	this.generateSignature = function(params){
		var param = {
			'service'			: 'AWSECommerceService',
			'AWSAccessKeyId'	: this.baseURL.AWSAccessKeyId,
			'timestamp'			: new Date().toISOString(),
			'version'			: '2009-10-01'
		};

		/*var keys = Object.keys(param), i, len = keys.length;

		keys.sort();

		for (i = 0; i < len; i++)
		{
		    k = keys[i];
		    alert(k + ':' + myObj[k]);
		}*/
		return param;
	};

	var rawurlencode = function(str) {
	    str = (str+'').toString();
	    return encodeURIComponent(str).replace(/!/g, '%21').replace(/'/g, '%27').replace(/\(/g, '%28').replace(/\)/g, '%29').replace(/\*/g, '%2A');
	};

	var encode64 = function (input) {
     input = escape(input);
     var output = "";
     var chr1, chr2, chr3 = "";
     var enc1, enc2, enc3, enc4 = "";
     var i = 0;

     do {
        chr1 = input.charCodeAt(i++);
        chr2 = input.charCodeAt(i++);
        chr3 = input.charCodeAt(i++);

        enc1 = chr1 >> 2;
        enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
        enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
        enc4 = chr3 & 63;

        if (isNaN(chr2)) {
           enc3 = enc4 = 64;
        } else if (isNaN(chr3)) {
           enc4 = 64;
        }

        output = output +
           keyStr.charAt(enc1) +
           keyStr.charAt(enc2) +
           keyStr.charAt(enc3) +
           keyStr.charAt(enc4);
        chr1 = chr2 = chr3 = "";
        enc1 = enc2 = enc3 = enc4 = "";
     } while (i < input.length);

     return output;
  	};

 	 var decode64 = function (input) {
     var output = "";
     var chr1, chr2, chr3 = "";
     var enc1, enc2, enc3, enc4 = "";
     var i = 0;

     // remove all characters that are not A-Z, a-z, 0-9, +, /, or =
     var base64test = /[^A-Za-z0-9\+\/\=]/g;
     if (base64test.exec(input)) {
        alert("There were invalid base64 characters in the input text.\n" +
              "Valid base64 characters are A-Z, a-z, 0-9, '+', '/',and '='\n" +
              "Expect errors in decoding.");
     }
     input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");

     do {
        enc1 = keyStr.indexOf(input.charAt(i++));
        enc2 = keyStr.indexOf(input.charAt(i++));
        enc3 = keyStr.indexOf(input.charAt(i++));
        enc4 = keyStr.indexOf(input.charAt(i++));

        chr1 = (enc1 << 2) | (enc2 >> 4);
        chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
        chr3 = ((enc3 & 3) << 6) | enc4;

        output = output + String.fromCharCode(chr1);

        if (enc3 != 64) {
           output = output + String.fromCharCode(chr2);
        }
        if (enc4 != 64) {
           output = output + String.fromCharCode(chr3);
        }

        chr1 = chr2 = chr3 = "";
        enc1 = enc2 = enc3 = enc4 = "";

     } while (i < input.length);

     return unescape(output);
  };

	/*var getDateTime = function(){
		var today = new Date();
   		var dd = today.getDate();
    	var mm = today.getMonth()+1; //January is 0!
    	var yyyy = today.getFullYear();
    	var hr	= today.getHours();
    	var min	= today.getMinutes();
    	var sec  = today.getSeconds();
    	if(dd<10){dd='0'+dd} if(mm<10){mm='0'+mm}
    	return  yyyy+'-'+mm+'-'+dd+'T'+ hr + ':' + min + ':' + sec + 'z' ;
	}*/
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
	//console.log(signature);
	return 0; //signedUrl = "http://" + this.baseURL.host + this.baseURL.uri + '?Service=' + this.baseURL.service + '&AWSAccessKeyId=';
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
