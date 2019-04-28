const {addonBuilder, serveHTTP, getRouter, publishToCentral } = require('stremio-addon-sdk');
var magnet = require("magnet-uri");
var fs = require('fs');
const mysql = require('sync-mysql');
var express = require('express');
var https = require('https');
var options = {
  key: fs.readFileSync('server.key'),
  cert: fs.readFileSync('server.cert')
};

// Create a service (the app object is just a callback).
var app = express();
app.get('*',function(req,res){  
    console.log('https://192.168.0.102/'+req.url);
    res.redirect('https://192.168.0.102/'+req.url);
})
https.createServer(options, app).listen(443);

//https://v3-cinemeta.strem.io/meta/' + type + '/' + imdbId + '.json

const builder = new addonBuilder({
    id: 'stremiodublado',
    version: '1.0.0',
    name: 'Dublado',
    catalogs: [],
    resources: ['stream'],
    types: ['movie', 'series'],
    idPrefixes: ['tt']
});

var host = 'localhost';
var database = 'registros';

//var exec = require('child_process').exec(' mysqldump -u root2 -proot registros > registros.sql');
//var exec = require('child_process').exec('mysql -u root2 -proot -h localhost -D registros --binary-mode -o  < modelo.sql');


var connection = new mysql({
    host: host,
    port: 3306,
    user: 'root2',
    password: 'root',
    database: database
});


builder.defineStreamHandler(function (args) {

    var key = args.id.replace(':', ' ').replace(':', ' ');
    var dataset_temp = [];
    var results = connection.query("SELECT * FROM registros where imdb='" + key + "'");

    results.forEach(function (row) {
        //console.log(row);
        //console.log(row.mapa);
        try {
            var converte = fromMagnetMap(row.magnet, row.mapa, row.nome);
            if (dataset_temp != null) {
                if (dataset_temp.indexOf(converte) > -1) {
                    console.log("Existe:", row.nome);
                } else {
                    dataset_temp.push(converte);
                }
            } else {
                dataset_temp = [converte];
            }
        } catch (e) {
        }

    });
    //console.log({streams: dataset_temp});
    return Promise.resolve({streams: dataset_temp});

});

function fromMagnetMap(uri, m, nome) {
    //console.log(uri);
    var parsed = magnet.decode(uri);
    // console.log(uri);
    var infoHash = parsed.infoHash.toLowerCase();
    nome = nome.toUpperCase();

    var tags = "";
    if (nome.match(/720P/i))
        tags = tags + ("720p ");
    if (nome.match(/1080P/i))
        tags = tags + ("1080p ");
    if (nome.match(/LEGENDADO/i))
        tags = tags + ("LEGENDADO ");
    if (nome.match(/DUBLADO/i))
        tags = tags + ("DUBLADO ");
    if (nome.match(/DUBLADA/i))
        tags = tags + ("DUBLADA ");
    if (nome.match(/DUAL/i))
        tags = tags + ("DUAL ÁUDIO ");
    if (nome.match(/4K/i))
        tags = tags + ("4K ");
    if (nome.match(/2160P/i))
        tags = tags + ("2160p ");
    if (nome.match(/UHD/i))
        tags = tags + ("UHD ");

    return {
        infoHash: infoHash,
        title: tags,
        fileIdx: m
    }
}

serveHTTP(builder.getInterface(), {port: 7000});
