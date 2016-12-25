//Rescue用

var chalk = require('chalk'); //文字に色
var fs = require('fs-extra'); //フォルダ操作
var mkdirp = require('mkdirp'); //フォルダ作成
var request = require('request'); //通信
var http = require('http');
var path = require('path');
var spawn = require('child_process').spawn; //Gralde
var execSync = require('child_process').execSync;

var targz = require('./tar-gzip');
var libResearch = require('./lib-research');

var url = 'https://aitech.ac.jp/maslab/~k14041kk/maslab-cli/resources/rescue.tar.gz';
//var url = "https://nodejs.org/dist/v7.3.0/node-v7.3.0-darwin-x64.tar.gz";
//var url = "http://localhost/rescue.tar.gz";
//var zipFile = require('../resources/rescue.zip');

module.exports.initRescue = function() {


    libResearch.initProject('rescue', url, 'setupWorkspace');
    

}

/*
module.exports.extractAndGradle = function(folder,name) {

    //zipを展開してgraldeを動かす
    //targz().extract(path.join(__dirname, '../resources/rescue.tar.gz'), folder)
    //targz().extract(path.join(folder, './rescue.tar.gz'), folder)
    targz.extract(
        path.join(folder, './rescue.tar.gz'),//入力
        folder,//出力
        function(){

            fs.copy(path.join(folder, './rescue'), folder, function(err) {
                if (err) return console.error(err);

                //削除
                fs.remove(path.join(folder, './rescue'), function(err) {
                    if (err) return console.error(err)

                    //console.log('success!')
                })

                //execSync('cd '+folder);//移動

                console.log("Preparing for Gradle...");

                const ls = spawn(path.join(folder, './gradlew'), ['setupWorkspace'], { cwd: folder });

                ls.stdout.on('data', (data) => {
                    console.log(`stdout: ${data}`);
                });

                ls.stderr.on('data', (data) => {
                    console.log(`stderr: ${data}`);
                });

                ls.on('close', (code) => {
                    console.log(`child process exited with code ${code}`);
                });
                //var result = "" + execSync(
                //  path.join(folder,'gradlew')+' setupWorkspace');
                //console.log("success!")
            });


        });

}*/