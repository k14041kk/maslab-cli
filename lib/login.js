var Preferences = require("preferences");//データ保存
var inquirer = require('inquirer');//対話形式
var account = require('./account');

//login関係の処理
module.exports.actionLogin = function() {

    	//UserIDとPWを取得
		module.exports.doLogin(function(){

			var data = arguments["0"];
			console.log(arguments["0"]);

			account.setUserData(data);

		});

}

module.exports.doLogin = function(callback) {

        var questions = [{
                name: 'username',
                type: 'input',
                message: 'Enter your Maslab username',
                validate: function(value) {
                    if (value.length) {
                        return true;
                    } else {
                        return 'Please enter your Maslab username';
                    }
                }
            }, {
                name: 'password',
                type: 'password',
                message: 'Enter your password:',
                validate: function(value) {
                    if (value.length) {
                        return true;
                    } else {
                        return 'Please enter your password';
                    }
                }
            }



        ];

        inquirer.prompt(questions).then(callback);

}

