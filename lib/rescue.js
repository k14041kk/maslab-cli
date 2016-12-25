//Rescue用

var libResearch = require('./lib-research');

var url = 'https://aitech.ac.jp/maslab/~k14041kk/maslab-cli/resources/rescue.tar.gz';

module.exports.initRescue = function() {


    libResearch.initProject('rescue', url, 'setupWorkspace');
    

}