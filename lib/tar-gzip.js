//tar.gzを解凍する
var fs   = require('fs');
var tar = require('tar');
var zlib = require('zlib');

module.exports.extract = function(input,output,callback){

	var gunzip    = zlib.createGunzip();
	var extractor = tar.Extract({path: output});

	fs.createReadStream(input)
		.pipe(gunzip)
		.pipe(extractor)
		.on('finish', callback);

}