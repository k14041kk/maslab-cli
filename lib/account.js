//Userデータを管理
var Preferences = require("preferences");//データ保存

module.exports.getAccount = function(){

	var prefs = new Preferences('jp.ac.aitech.maslab');
	return prefs;

}

module.exports.isLogin = function(){

	var prefs = new Preferences('jp.ac.aitech.maslab');
	return prefs.login;

}

module.exports.setUserData = function(data){

	var prefs = new Preferences('jp.ac.aitech.maslab',{

  				account: {
    				username: data["username"],
    				password: data["password"]
  				},
  				test: {
    				cycles: 1
 				},
 				login:true
			});

	return prefs;

}