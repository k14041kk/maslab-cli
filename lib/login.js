var Preferences = require("preferences"); //データ保存
var inquirer = require('inquirer'); //対話形式
var account = require('./account');

var libMain = require('./lib-main');

//login関係の処理
module.exports.actionLogin = function() {

    //UserIDとPWを取得
    module.exports.doLogin(function() {

        var data = arguments["0"];

        account.setUserData(data);

    });

}

module.exports.doLogin = function(callback) {

    var questions = new Array(2);
    questions[0] = libMain.generateQuestions(
        'username',
        'input',
        'Enter your Maslab username',
        'Please enter your Maslab username'
    );

    questions[1] = libMain.generateQuestions(
        'password',
        'password',
        'Enter your password:',
        'Please enter your password'
    );

    inquirer.prompt(questions).then(callback);

}
