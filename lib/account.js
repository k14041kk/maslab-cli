//Userデータを管理
var Preferences = require("preferences");//データ保存

var DOMAIN = 'jp.ac.aitech.maslab';

module.exports.getAccount = function(){

	var prefs = new Preferences(DOMAIN);
	return prefs;

}

module.exports.isLogin = function(){

	var prefs = new Preferences(DOMAIN);
	return prefs.login;

}

module.exports.setUserData = function(data){

	var prefs = new Preferences(DOMAIN);

	prefs.account = {};
	prefs.account.username = data["username"];
	prefs.account.password = data["password"];

	return prefs;

}

module.exports.getDomain = function(){
	return DOMAIN;
}



