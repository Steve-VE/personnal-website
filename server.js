const port = require('./config').port;

let express = require('express');
let server = express();
let nunjucks = require('nunjucks');

nunjucks.configure('views', {
    autoescape: true,
    express: server
});

server.use('/assets', express.static(__dirname + '/public'));
server.use('/assets/js', express.static(__dirname + '/node_modules/zbx-javascript'));

server.get('/', (req, res)=>{
    // res.render("index.html", {
    //     'dev': true,
    //     'artist': true
    // });
    res.redirect('/dev');
});
server.get('/dev', (req, res)=>{
    res.render("index.html", {
        'dev': true
    });
});
server.get('/artist', (req, res)=>{
    res.render("index.html", {
        'artist': true
    });
});

server.get('*', (req, res)=>{
    res.redirect('/');
});

server.listen(port, '127.0.0.1');
console.log("-- Server's running on port " + port + ".");