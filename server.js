var express = require ("express");
var request = require('request');
var app = express();
var http = require("http").Server(app);
var io = require('socket.io')(http);
var i = 0;
var roomNumber = 0;
var token = null;
const uuidv1 = require('uuid/v1');


var admin = require("firebase-admin");

var serviceAccount = require("./musiicord-firebase-adminsdk-yx0ws-78750e4c26.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://musiicord.firebaseio.com"
});

var db = admin.firestore();

var options = {
  url: 'https://accounts.spotify.com/api/token',
  headers: {
    'Authorization': 'Basic N2VkNDA0ZjAxZTZlNDU1Mzk4ZmVjMjMzNGY5NjJmY2E6YjEyMDk3ZTFlOGY1NGQ0ZmE1YmU2NDE2YTAwZmI0MGU=',
    'Content-Type': 'application/x-www-form-urlencoded'
  },
  body:
    'grant_type=client_credentials'
};

request.post(options,
    function (error, response, body) {
    if (error) {
      return console.error('upload failed:', error);
    }
    token = JSON.parse(body).access_token;
    console.log('Upload successful!  Server responded with:', JSON.parse(body).access_token);
  });





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

app.get('/search/:trackname', function (req, res) {
    console.log('hit');
    var trackoptions = {
        url: "https://api.spotify.com/v1/search?" +
            "q=" + req.params.trackname + "&" +
            "type=track&" +
            "market=US&" +
            "limit=1",
        headers: {
            'Authorization': 'Bearer ' + token
        }
    }
    request.get(trackoptions,function (error, response, body) {
        if (error) {
          return console.error('upload failed:', error);
        }
        console.log(JSON.parse(body).tracks.items[0].preview_url);
        var trackurl = JSON.parse(body).tracks.items[0].preview_url;
        if (trackurl != null) {
            var docRef = db.collection('tracknames').doc(uuidv1());
            var setAda = docRef.set({
              url: trackurl
            });
            return res.send(trackurl);
       }
       else {
            return res.badRequest();
       }

    });
});

app.get('/gettracks', function (req, res) {
    var alltracks = [];
    var citiesRef = db.collection('tracknames');
    var allCities = citiesRef.get()
    .then(snapshot => {
      snapshot.forEach(doc => {
        alltracks.push(doc.data().url);
        console.log(doc.id, '=>', doc.data().url);
      });
      res.send(alltracks);
    })
    .catch(err => {
      console.log('Error getting documents', err);
    });
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
