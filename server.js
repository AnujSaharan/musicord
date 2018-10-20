var express = require ("express");
var app = express();
var http = require("http").Server(app);
var io = require('socket.io')(http);
var i = 0;

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');
});

app.get('/channel1', function (req, res) {
    res.sendFile(__dirname + '/channel.html');
});

io.on('connection', function (socket) {
//    console.log("Client Connected");

socket.on('room',function(room)
    {
        socket.join(room);
    });
    
    room = "testroom";
    io.sockets.in(room).emit('message', 'holy shit it worked');
    io.sockets.in('notroom').emit('message', 'yes');
    
    if (i == 0) {
//        console.log("first");
        socket.emit("first", "first");
    }

//    i = i + 1;

    socket.on("seek", function(msg) {
//        console.log(msg);
        io.emit("current", msg);
    });

    socket.on("play", function(msg) {
        io.emit("play", msg);
    });

    socket.on("pause",function(msg) {
        io.emit("pause", msg);
    });

    socket.on("reset", function(msg) {
        io.emit("reset", msg);
    });

    socket.on("disconnect", function () {
//        console.log("Client Disconnected");
//        i = i - 1;
    });
});


/*function startTimer () {
    // console.log(Date.now());
    io.emit("time", Math.round(Date.now()/1000));
    setTimeout(function() {
        startTimer();
    }, 150);
};*/

app.use(express.static(__dirname ));

http.listen(8887, function () {
//    console.log ("Server running on port 8888");
//     startTimer();
});