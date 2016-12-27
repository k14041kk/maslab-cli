var execSync = require('child_process').execSync;
var fs = require('fs-extra'); //フォルダ操作
var mkdirp = require('mkdirp'); //フォルダ作成
var request = require('request'); //通信
var path = require('path'); //パス

var targz = require('./tar-gzip');

var version = '0.1.2';
var url = 'https://github.com/k14041kk/maslab-cli/archive/version/0.1.2.tar.gz';

var updateURL = 'https://k14041kk.github.io/maslab-cli/update.json';

var localZip = 'maslab-cli-update.tar.gz';

module.exports.updateMaslab = function(otherVersion) {


    request(updateURL, function(error, response, body) {
    	
        if (!error && response.statusCode == 200) {

            var jsonDate = JSON.parse(body);

            var version_ =jsonDate.recommend.version;
            var url_ = jsonDate.recommend.url;
            if(otherVersion!=null && jsonDate.versions[otherVersion]!=null){
            	version_ = otherVersion;
            	url_ = jsonDate.versions[otherVersion];
            }

            updateMaslabFromURL(
                url_,
                version_);
        } else {
            console.log('error: ' + response.statusCode);
        }
    })

}

function updateMaslabFromURL(url_, version_) {

    url = url_;
    version = version_

    var current = process.cwd();

    var folder = path.join(current, './maslab-cli-update');

    mkdirp(folder);

    var output = path.join(folder, './' + localZip);

    var connectionProgress = 0;
    setInterval(function() {
        if (connectionProgress == -1) {
            clearTimeout(this);
            return;
        }
        if (connectionProgress % 4 == 0) process.stdout.write('\r' + 'Connection update server    ');
        if (connectionProgress % 4 == 1) process.stdout.write('\r' + 'Connection update server.   ');
        if (connectionProgress % 4 == 2) process.stdout.write('\r' + 'Connection update server..  ');
        if (connectionProgress % 4 == 3) process.stdout.write('\r' + 'Connection update server... ');
        connectionProgress++;
    }, 800);
    //console.log('Connection update server')

    request({ 'url': url, 'encoding': null }, function(err, resp, body) {

    	if(connectionProgress!=-1)
    	{
    		console.log('');
           	connectionProgress = -1;
        }

        if (err) throw err;

        console.log('Download start')

        fs.writeFile(output, body, function(err) {

            if (err) throw err;
            //ダウンロードしたファイルを配置
            console.log('Downloaded ' + 'maslab-cli-update' + '.tar.gz');

            extract(folder);
            //module.exports.extractAndGradle(folder, name, projectName, graldeCommand);
            //console.log("file written!");
        });
    });

    //var result = "" + execSync('npm -g install');
    //console.log(result);


}

function extract(folder) {


    targz.extract(
        path.join(folder, './' + localZip),
        folder,
        function() {

            version
            console.log('Update start');
            var result = "" + execSync('npm -g install', { 'cwd': path.join(folder, './' + 'maslab-cli-version-' + version) });
            console.log(result);

            //削除
            fs.remove(folder, function(err) {
                if (err) return console.error(err)

                //console.log('success!')
            })
            console.log('Update finish!');



        });

}
