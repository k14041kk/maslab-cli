#!/usr/bin/env node

'use strict';

var program = require('commander');//コマンド管理
var chalk = require('chalk');//文字に色
var figlet = require('figlet');//大きな文字
var inquirer = require('inquirer');//対話形式

var packagejson = require('./package.json');
var update = require('./lib/update');
var login = require('./lib/login');
var rescue = require('./lib/rescue');
var aiwolf = require('./lib/aiwolf');
var account = require('./lib/account');

var current = process.cwd();

program
    .version(packagejson.version)
    .usage('<keywords>')
    .option('-m, --member', 'output Maslab member list')
    .option('-a, --account', 'output your account data');

program
    .command('update [otherVersion]')
    .description('update Maslab-CLI')
    .action(update.updateMaslab);

program
    .command('login')
    .description('login Maslab')
    .action(login.actionLogin);

program
    .command('rescue')
    .description('create Rescue project')
    .action(function(){rescue.initRescue();});

program
    .command('aiwolf')
    .description('create AIWolf project')
    .action(function(){aiwolf.initAIWolf();});

program
    .command('soccer')
    .description('create Soccer project (coming soon...)')
    .action(function(){console.log("coming soon...");});

program
    .parse(process.argv);

//引数が何も無い時はヘルプを表示
if(program.args.length == 0 && getOptionSize(program) == 0) {

	console.log(
  		chalk.blue(
    		figlet.textSync('Maslab CLI', { horizontalLayout: 'full' })
  		)
	);
    program.help();
}

//アカウント情報を表示
if(program.account != null){

	if(account.isLogin()){
		console.log("Name : " + account.getAccount().account.username);
	}else{
		console.log("You are not logged");
	}
	
}

if(program.member != null){
	console.log("coming soon...");
}

function getOptionSize(program){

	var size = 0;
	var opts = program.opts();

	for (var key in opts) {
  		
  		if(key === 'version')continue;
  		if(opts[key] != null)size++;


	}

	return size;

}


