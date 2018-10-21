
$(function () {
    
    var socket = io.connect();
    var str = window.location.pathname
    str = str[str.length-1];
    
    var room = str;
    //alert(room);
    socket.on('connect', function() {
        socket.emit('room',room);
    });
    
    socket.on('message', function(data){
        console.log("message recieved:",data);
    });
    
    

    $('#tracknamebtn').click(function(){
        console.log(window.location.host + '/search/'+encodeURIComponent($('#trackname').val()));
        $.get('https://musiicord.appspot.com/search/'+encodeURIComponent($('#trackname').val()), function(data){
            console.log(data);
        });
    });



    var socket = io();

    socket.on('time', function (msg) {
         // $('.timer-div').html(msg);
         // $('.timer-div').html(audio.getCurrentTime());
    });

    var audio=wavesurfer;
    audio.load("../music/Sit Next To Me.mp3"); //document.getElementById('audio-id');
    
    socket.on('first', function (msg) {
        // $('#audio-id').attr('controls', "1"); 

        // $('.control-button').show();
        // $('.control-button').removeClass('hide');

        audio.ontimeupdate = function () {
            socket.emit("seek", audio.getCurrentTime());
        // $('.timer-div').html(audio.currentTime);
        };

        $('#play-button').click(function() {
            console.log("Play Clicked");
            socket.emit("play",audio.getCurrentTime(), room);
            //console.log(audio.getCurrentTime());
            
        });

        $('#pause-button').click(function() {
            console.log("Pause Clicked");
            socket.emit("pause", audio.getCurrentTime(), room);
        });

        $('input[name=track]').attr('disabled', false);

        $('input[name=track]').click(function() {
             socket.emit("reset", $(this).val());
        });
    });

    socket.on("current", function (msg) {
        var diff = audio.getCurrentTime();
        //if (diff < 0 || diff > 2000) {
        //    audio.currentTime = msg;
        //}
        $('.timer-span').html(msg);
    });

    socket.on("reset", function (msg) {
        //console.log(msg);
        socket.emit("pause", 0.00);
        $('input[name=track]').attr('checked', false);        
        $('input[value='+ msg +']').attr('checked', true);

        var label = "";
        var alltracks = [];
        $.get('https://musiicord.appspot.com/gettracks', function(data){
            alltracks = data.alltracks;
        }).done(function(){
            if (msg == 1) {
                label = "Sit Next To Me";
                $('.audio-source').attr('src', alltracks[0])
            }
            else if (msg == 2) {
                label = "One Foot";
                $('.audio-source').attr('src', alltracks[0])
            }
            if (msg == 3) {
                label = "Kamikaze";
                $('.audio-source').attr('src', 'music/Kamikaze.mp3')
            }

        });
        

        $('.label').html(label);
        audio.load();
    });



    socket.on("play", function (msg) {
        // audio.currentTime = msg;
        console.log("ROOMNUMBER:" +room);
        socket.emit()
        audio.play();
        // $('#play-button').addClass('hide');
        // $('#pause-button').removeClass('hide');
    });

    socket.on("pause", function(msg) {
        //audio.currentTime = msg;
        audio.pause();
        // $('#play-button').removeClass('hide');
        // $('#pause-button').addClass('hide');
    })
});