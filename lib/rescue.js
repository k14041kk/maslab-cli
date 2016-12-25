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

module.exports.initRescue = function(current) {

    console.log(current);

    //名前を聞いて作成
    libResearch.getProjectName(function() {

        var data = arguments["0"];
        var name = data["projectname"];

        var folder = path.join(current, name);



        if (fs.existsSync(folder)) {
            //存在してたらcancel
            console.log(chalk.red("Directory  '" + name + "' already exists."));
        } else {

            mkdirp(folder);
            console.log('create project : ' + name);

            var output = path.join(folder,'./rescue.tar.gz');

            //var outFile = fs.createWriteStream(path.join(folder,'./rescue.tar.gz'));

            //module.exports.extractAndGradle(folder,name);

            /*request(url)
            .pipe(fs.createWriteStream(output))
            .on('close', function () {
              console.log('File written!');
            });*/

            request({url: url, encoding: null}, function(err, resp, body) {
              if(err) throw err;
              fs.writeFile(output, body, function(err) {

                console.log('Downloaded rescue.tar.gz');
                libResearch.extractAndGradle(folder, name,'rescue','setupWorkspace');
                //module.exports.extractAndGradle(folder,name);
                //console.log("file written!");
              });
            });

            /*var req = http.get(url, function (res) {

              // ダウンロードした内容をそのまま、ファイル書き出し。
              res.pipe(outFile);

              // 終わったらファイルストリームをクローズ。
              res.on('end', function () {
                outFile.close();
              }); 

            });

            req.on('error', function (err) {
               console.log('Error: ', err); return;
            });*/

            /*var read = request.get(url);
            //var parse = targz().createParseStream(folder);
            read.on('response', function(response) {
              console.log(response.statusCode) // 200
              console.log(response.headers['content-type'])
            }).on('error', function(err){
              console.error(err.message);
            }).on('close', function(){
              console.log('download rescue.')
              module.exports.extractAndGradle(folder,name);
            })
            .pipe(fs.createWriteStream(path.join(folder,'./rescue')));
            */

            //read.pipe(parse);

            /*parse.on('error', function(err){
              console.error(err.message);
            });

            
            read.on('close', function(){
              console.log('download rescue.')
              module.exports.extractAndGradle(folder,name);
            });*/

            



            //fs.createReadStream(path.join(__dirname,'../resources/rescue.zip')).pipe(unzip.Extract({ path: folder }));


        }



    });

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