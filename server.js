var express = require ("express");
var app = express();
var http = require("http").Server(app);
var io = require('socket.io')(http);
var i = 0;
var roomNumber = 0;

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/html/index.html');
 });

app.get('/channel1', function (req, res) {
    res.sendFile(__dirname + '/html/channel1.html');
});

 app.get('/channel2', function (req, res) {
    res.sendFile(__dirname + '/html/channel2.html');
});

app.get('/channel3', function (req, res) {
    res.sendFile(__dirname + '/html/channel3.html');
});

io.on('connection', function (socket) {
    console.log("Client Connected");

socket.on('room',function(room)
    {   
        socket.join(room);
        roomNumber = room;
        io.sockets.in(room).emit('message', 'room' + room);
    });
    
    //room = "testroom";
    
    //io.sockets.in(2).emit('message', 'room2');
    //io.sockets.in(3).emit('message', 'room3');
    
    if (i == 0) {
//        console.log("first");
        socket.emit("first", "first");
    }

//    i = i + 1;

    socket.on("seek", function(msg) {
//        console.log(msg);
        io.sockets.in(roomNumber).emit("current", msg);
    });

    socket.on("play", function(msg) {
        io.sockets.in(roomNumber).emit("play", msg);
        console.log(roomNumber);
    });

    socket.on("pause",function(msg) {
        io.sockets.in(roomNumber).emit("pause", msg);
    });

    socket.on("reset", function(msg) {
        io.sockets.in(roomNumber).emit("reset", msg);
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
var port = process.env.PORT || 1337;

http.listen(8888, function () {
console.log ("Server running on port 8888");
//     startTimer();
});
