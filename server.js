let express = require('express');
let server = express();
let nunjucks = require('nunjucks');


// server.use('/public', express.static('/assets'));
// server.use(nunjucks);
nunjucks.configure('views', {
    autoescape: true,
    express: server
});

server.use('/assets', express.static(__dirname + '/public'));

server.get('/', (req, res)=>{
    res.render("index.html", {
        'dev': true,
        'artist': true
    });
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

server.listen(8088);