//人狼用

var chalk = require('chalk'); //文字に色
var fs = require('fs-extra'); //フォルダ操作
var mkdirp = require('mkdirp'); //フォルダ作成
var request = require('request'); //通信
var path = require('path');
var spawn = require('child_process').spawn; //Gralde
var execSync = require('child_process').execSync;

var targz = require('./tar-gzip');
var libResearch = require('./lib-research');

var url = 'https://aitech.ac.jp/maslab/~k14041kk/maslab-cli/resources/aiwolf.tar.gz';

//var zipFile = require('../resources/aiwolf.zip');

module.exports.initAIWolf = function(current) {

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

            var output = path.join(folder, './aiwolf.tar.gz');

            request({ url: url, encoding: null }, function(err, resp, body) {

                if (err) throw err;
                fs.writeFile(output, body, function(err) {

                    console.log('Downloaded aiwolf.tar.gz');
                    libResearch.extractAndGradle(folder, name,'aiwolf','eclipse');
                    //console.log("file written!");
                });
            });



            //fs.createReadStream(path.join(__dirname,'../resources/aiwolf.zip')).pipe(unzip.Extract({ path: folder }));


        }



    });

}

/*
var extractAndGradle = function(folder, name) {

    //zipを展開してgraldeを動かす
    //targz().extract(path.join(__dirname, '../resources/aiwolf.tar.gz'), folder)
    //targz().extract(path.join(folder, './aiwolf.tar.gz'), folder)    
    //    .then(function() {
    targz.extract(
        path.join(folder, './aiwolf.tar.gz'),
        folder,
        function() {

            fs.copy(path.join(folder, './aiwolf'), folder, function(err) {

                if (err) return console.error(err);

                //削除
                fs.remove(path.join(folder, './aiwolf'), function(err) {
                    if (err) return console.error(err)

                    //console.log('success!')
                })

                //execSync('cd '+folder);//移動

                console.log("Preparing for Gradle...");

                const ls = spawn(path.join(folder, './gradlew'), ['eclipse'], { cwd: folder });

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
