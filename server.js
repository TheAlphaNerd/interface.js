var app = require('express').createServer(),
    io = require('socket.io').listen(app),
    osc = require('node-osc'),
    client = new osc.Client('0.0.0.0', 3333),
    mdns = require('mdns');

app.listen(1337);

// advertise a http server on port 1337
var ad = mdns.createAdvertisement(mdns.tcp('http'), 1337);
ad.start();

app.get('/', function (req, res) {
  res.sendfile(__dirname + '/public/index.html');
});

app.get('/test', function (req, res) {
  res.sendfile(__dirname + '/public/test.html');
});

// app.get('/piano', function (req, res) {
//   res.sendfile(__dirname + '/public/piano.html');
// });


app.get('/*.(js|css|jpg)', function(req, res){
  res.sendfile("./public"+req.url);
});

io.sockets.on('connection', function (socket) {
    
    interval = setInterval(function(){
        socket.emit('poll', {send: 'it'});
    }, 100);
    
    socket.on('alpha', function (data) {
        client.send("/alpha", data);
    });
    socket.on('beta', function (data) {
        client.send("/beta", data);
    });
    socket.on('gamma', function (data) {
        client.send("/gamma", data);
    });
    socket.on('disconnect', function(){
        clearInterval(interval);
    });
});
