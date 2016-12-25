//開発環境を作成するためのLib

var inquirer = require('inquirer'); //対話形式
var path = require('path');
var spawn = require('child_process').spawn; //Gralde
var fs = require('fs-extra');

var targz = require('./tar-gzip');

module.exports.getProjectName = function(callback) {


    var questions = [{
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

    ];

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
