//開発環境を作成するためのLib

var inquirer = require('inquirer'); //対話形式

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