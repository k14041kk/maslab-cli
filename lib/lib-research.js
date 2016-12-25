//開発環境を作成するためのLib

var chalk = require('chalk'); //文字に色
var inquirer = require('inquirer'); //対話形式
var path = require('path');
var spawn = require('child_process').spawn; //Gralde
var fs = require('fs-extra');//フォルダ操作
var mkdirp = require('mkdirp'); //フォルダ作成
var request = require('request'); //通信

var targz = require('./tar-gzip');
var libMain = require('./lib-main');

//プロジェクトの生成
module.exports.initProject = function(projectName, projectURL, graldeCommand) {
    //カレントディレクトを取得
    var current = process.cwd();

    console.log(process.cwd());

    //名前を聞いて作成
    module.exports.getProjectName(function() {

        var data = arguments["0"];
        var name = data["projectname"];

        var folder = path.join(current, name);

        if (fs.existsSync(folder)) {
            //存在してたらcancel
            console.log(chalk.red("Directory  '" + name + "' already exists."));
        } else {

            mkdirp(folder);
            console.log('create project : ' + name);

            var output = path.join(folder, './' + projectName + '.tar.gz');

            request({ url: projectURL, encoding: null }, function(err, resp, body) {

                if (err) throw err;
                fs.writeFile(output, body, function(err) {

                    if (err) throw err;
                    //ダウンロードしたファイルを配置
                    console.log('Downloaded ' + projectName + '.tar.gz');
                    module.exports.extractAndGradle(folder, name, projectName, graldeCommand);
                    //console.log("file written!");
                });
            });



            //fs.createReadStream(path.join(__dirname,'../resources/aiwolf.zip')).pipe(unzip.Extract({ path: folder }));


        }



    });
}

module.exports.getProjectName = function(callback) {

    var questions = new Array(1);
    questions[0] = libMain.generateQuestions(
        'projectname',
        'input',
        'Enter your project name',
        'Please enter your project name'
    );

    /* = [{
            name: 'projectname',
            type: 'input',
            message: 'Enter your project name',
            validate: function(value) {
                if (value.length) {
                    return true;
                } else {
                    return 'Please enter your project name';
                }
            }
        }

    ];*/

    inquirer.prompt(questions).then(callback);

}

//解凍してGraldeを実行
module.exports.extractAndGradle = function(folder, name, projectName, graldeCommand) {

    //zipを展開してgraldeを動かす
    //targz().extract(path.join(__dirname, '../resources/aiwolf.tar.gz'), folder)
    //targz().extract(path.join(folder, './aiwolf.tar.gz'), folder)    
    //    .then(function() {
    targz.extract(
        path.join(folder, './' + projectName + '.tar.gz'),
        folder,
        function() {

            fs.copy(path.join(folder, './' + projectName), folder, function(err) {

                if (err) return console.error(err);

                //削除
                fs.remove(path.join(folder, './' + projectName), function(err) {
                    if (err) return console.error(err)

                    //console.log('success!')
                })

                //execSync('cd '+folder);//移動

                console.log("Preparing for Gradle...");

                const ls = spawn(path.join(folder, './gradlew'), [graldeCommand], { cwd: folder });

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

}
