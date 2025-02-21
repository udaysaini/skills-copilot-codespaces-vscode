// create a web server
var http = require('http');
var url = require('url');
var fs = require('fs');
var path = require('path');
var comments = [];
var server = http.createServer(function(req, res) {
    var urlObj = url.parse(req.url, true);
    var pathname = urlObj.pathname;
    if (pathname === '/') {
        fs.readFile('./index.html', function(err, data) {
            if (err) {
                console.log(err);
            }
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end(data);
        });
    } else if (pathname === '/comment') {
        var comment = urlObj.query;
        comments.push(comment);
        res.end(JSON.stringify(comments));
    } else {
        fs.readFile('.' + pathname, function(err, data) {
            if (err) {
                console.log(err);
            }
            res.end(data);
        });
    }
});
server.listen(3000, function() {
    console.log('server is listening on port 3000');
});