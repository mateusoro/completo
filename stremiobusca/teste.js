var WebTorrent = require('webtorrent-hybrid');
const fs = require('fs');
var tableify = require('tableify');
var express = require('express');
//https://images.metahub.space/poster/medium/tt4913966/img
var sqlite = require('sqlite-sync');
sqlite.connect('../stremiodublado/linhas.sqlite3');
var CINEMETA_ENDPOINT = "http://cinemeta.strem.io/stremioget/stremio/v1";

var Stremio = require("stremio-addons");
var addons = new Stremio.Client();
addons.add(CINEMETA_ENDPOINT);

var peerflix = require('peerflix');


var client = new WebTorrent();
var magnetURI = 'magnet:?xt=urn:btih:739474dbb6cd1298d28a714805f3e026ca2dabc5&dn=%5bACESSE%20COMANDOTORRENTS.COM%5d%20O%20Menino%20que%20Queria%20Ser%20Rei%20(2019)%20%5b720p%5d%20%5bBluRay%5d%20%5bDUBLADO%5d&tr=udp%3a%2f%2ftracker.openbittorrent.com%3a80%2fannounce&tr=udp%3a%2f%2ftracker.opentrackr.org%3a1337%2fannounce&tr=udp%3a%2f%2ftracker.coppersurfer.tk%3a6969%2fannounce&tr=udp%3a%2f%2fglotorrents.pw%3a6969%2fannounce&tr=udp%3a%2f%2ftracker4.piratux.com%3a6969%2fannounce&tr=udp%3a%2f%2fcoppersurfer.tk%3a6969%2fannounce&tr=http%3a%2f%2ft2.pow7.com%2fannounce&tr=udp%3a%2f%2ftracker.yify-torrents.com%3a80%2fannounce&tr=http%3a%2f%2fwww.h33t.com%3a3310%2fannounce&tr=http%3a%2f%2fexodus.desync.com%2fannounce&tr=http%3a%2f%2ftracker.coppersurfer.tk%3a6969%2fannounce&tr=http%3a%2f%2fbt.careland.com.cn%3a6969%2fannounce&tr=http%3a%2f%2fexodus.desync.com%3a6969%2fannounce&tr=udp%3a%2f%2ftracker.publicbt.com%3a80%2fannounce&tr=udp%3a%2f%2ftracker.istole.it%3a80%2fannounce&tr=http%3a%2f%2ftracker.blazing.de%2fannounce&tr=udp%3a%2f%2ftracker.openbittorrent.com%3a80%2fannounce&tr=http%3a%2f%2ftracker.yify-torrents.com%2fannounce&tr=udp%3a%2f%2ftracker.prq.to%2fannounce&tr=udp%3a%2f%2ftracker.1337x.org%3a80%2fannounce&tr=udp%3a%2f%2f9.rarbg.com%3a2740%2fannounce&tr=udp%3a%2f%2ftracker.ex.ua%3a80%2fannounce&tr=udp%3a%2f%2fipv4.tracker.harry.lu%3a80%2fannounce&tr=udp%3a%2f%2f12.rarbg.me%3a80%2fannounce&tr=udp%3a%2f%2ftracker.publicbt.com%3a80%2fannounce&tr=udp%3a%2f%2ftracker.opentrackr.org%3a1337%2fannounce&tr=udp%3a%2f%2f11.rarbg.com%2fannounce&tr=udp%3a%2f%2ftracker.ccc.de%3a80%2fannounce&tr=udp%3a%2f%2ffr33dom.h33t.com%3a3310%2fannounce&tr=udp%3a%2f%2fpublic.popcorn-tracker.org%3a6969%2fannounce';

function addTorrent(mag, mapa) {
    console.log("addTorrent", mag);
    var html = "<!DOCTYPE html> \n" +
            "<html> \n" +
            "<head> \n" +
            "<meta charset=utf-8 /> \n" +
            "   \n" +
            "  <link href='https://unpkg.com/video.js/dist/video-js.css' rel='stylesheet'> \n" +
            "</head> \n" +
            "<body> \n" +
            "  \n" +
            "  <video-js id='my_video_1' class='vjs-default-skin' controls preload='auto' width='640' height='268'> \n" +
            "    <source src='http://192.168.0.120:porta' type='video/mp4'> \n" +
            "  </video-js> \n" +
            "   \n" +
            "  <script src='https://unpkg.com/video.js/dist/video.js'></script> \n" +
            "  <script src='https://unpkg.com/@videojs/http-streaming/dist/videojs-http-streaming.js'></script> \n" +
            "   \n" +
            "  <script> \n" +
            "    var player = videojs('my_video_1',{ \n" +
            "  html5: { \n" +
            "    hls: { \n" +
            "      overrideNative: true \n" +
            "    } \n" +
            "  }}); \n" +
            "  </script> \n" +
            "   \n" +
            "</body> \n" +
            "</html> \n";
    var html2 = "<script src='https://cdn.jsdelivr.net/npm/hls.js@latest'></script> \n" +
            "  <video controls id='video'></video> \n" +
            "  <script> \n" +
            "    if (Hls.isSupported()) { \n" +
            "      var video = document.getElementById('video'); \n" +
            "      var hls = new Hls(); \n" +
            "      // bind them together \n" +
            "      hls.attachMedia(video); \n" +
            "      hls.on(Hls.Events.MEDIA_ATTACHED, function () { \n" +
            "        console.log('video and hls.js are now bound together !'); \n" +
            "        hls.loadSource('http://192.168.0.120:porta'); \n" +
            "        hls.on(Hls.Events.MANIFEST_PARSED, function (event, data) { \n" +
            "          console.log('manifest loaded, found ' + data.levels.length + ' quality level'); \n" +
            "          video.play(); \n" +
            "        }); \n" +
            "      }); \n" +
            "    } \n" +
            "  </script>";
    var info = mag.split('&dn=')[0].replace('magnet:?xt=urn:btih:', '');

    var engine = peerflix(mag);

    engine.server.on('listening', function () {
        var myLink = 'http://localhost:' + engine.server.address().port + '/';
        html = html.replace('porta', engine.server.address().port);
        html2 = html2.replace('porta', engine.server.address().port);
        console.log(myLink);
        console.log(html2);
        r.send(html2);
    });

}

var app = express();
var r;
app.get('/', function (req, res) {
    r = res;
    sqlite.run("SELECT nome_imdb, nome, imdb, mapa FROM registros order by imdb desc", function (rows) {

        //console.log(rows);
        var html = tableify(rows);

        html = html.replace('<table>', '<table id="table_id" class="display">')
        html = "<script src='https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js'></script> \n" +
                "<link rel='stylesheet' type='text/css' href='https://cdn.datatables.net/1.10.19/css/jquery.dataTables.css'> \n" +
                "<script type='text/javascript' charset='utf8' src='https://cdn.datatables.net/1.10.19/js/jquery.dataTables.js'></script> \n" +
                "<script>" +
                "$(document).ready( function () { " +
                "$('#table_id').DataTable();\n" +
                "$('#table_id').on( 'page.dt', function () { \n" +
                "  $('#table_id tr').each(function () { \n" +
                "    console.log(this) \n" +
                "    var a = $(this).find('td').eq(3).text(); \n" +
                "    $(this).find('td').eq(2).on('click', function () {                \n" +
                "      event.preventDefault(); \n" +
                "      event.stopPropagation(); \n" +
                "      var link = 'http://192.168.0.120:3000/carregar?imdb='+$(this).text()+'&mapa='+a; \n" +
                "      window.open(link, '_blank'); \n" +
                "    }); \n" +
                "}) \n" +
                "} );  \n" +
                "$('#table_id tr').each(function () { \n" +
                "  console.log(this) \n" +
                "  var a = $(this).find('td').eq(3).text(); \n" +
                "  $(this).find('td').eq(2).on('click', function () {                \n" +
                "      event.preventDefault(); \n" +
                "      event.stopPropagation(); \n" +
                "      var link = 'http://192.168.0.120:3000/carregar?imdb='+$(this).text()+'&mapa='+a; \n" +
                "      window.open(link, '_blank'); \n" +
                "  }); \n" +
                "}) \n" +
                "}); </script>"
                + html;

        //console.log(html);
        res.send(html);
    });

});
//?imdb
app.get('/carregar', function (req, res) {
    r = res;
    console.log("SELECT magnet, mapa from registros where imdb ='" + req.query.imdb + "' and mapa='" + req.query.mapa + "' limit 1");
    sqlite.run("SELECT magnet, mapa from registros where imdb ='" + req.query.imdb + "' and mapa='" + req.query.mapa + "' limit 1", function (rows) {

        if (rows != null) {
            rows.forEach(function (row) {

                var mag = row.magnet;
                var mapa = row.mapa;

                addTorrent(mag, mapa);

            });
        }

    });
});
app.get('/teste', function (req, res) {
    r = res;
    addTorrent(magnetURI);

});

app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});

//carregarTodos();

function carregarTodos() {
    sqlite.run("SELECT distinct(substr(imdb, 1, instr(imdb || ' ', ' ') - 1)) as imdb_dis FROM registros where nome_imdb is null", function (rows) {

        if (rows != null) {
            rows.forEach(function (row) {
                try {
                    addons.meta.get({query: {imdb_id: row.imdb_dis}}, function (err, meta) {
                        if (err) {
                            console.log(meta, row.imdb_dis);
                            var sql = "update registros set nome_imdb=' ' where imdb like'%" + row.imdb_dis + "%'";
                            console.log(sql);
                            sqlite.run(sql);

                        }
                        if (meta != null) {
                            var sql = "update registros set nome_imdb='" + meta.name + "' where imdb like'%" + meta.imdb_id + "%'";
                            if (meta.alternative_titles != null) {
                                if (meta.alternative_titles.BR != null) {
                                    sql = "update registros set nome_imdb='" + meta.alternative_titles.BR + "' where imdb like'%" + meta.imdb_id + "%'";
                                }
                            }
                            console.log(sql);
                            sqlite.run(sql);
                        }
                    });

                } catch (e) {
                    console.log(e);
                }

            });
        }

    });
}
