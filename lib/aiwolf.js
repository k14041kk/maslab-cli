//人狼用

var libResearch = require('./lib-research');

var url = 'https://aitech.ac.jp/maslab/~k14041kk/maslab-cli/resources/aiwolf.tar.gz';

module.exports.initAIWolf = function() {

    libResearch.initProject('aiwolf', url, 'eclipse');

}

