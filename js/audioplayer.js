
var wavesurfer = WaveSurfer.create({
    container: '#waveform',
    barWidth: 6,
    barGap: 4,
    barHeight: 5,
    waveColor: '#2c3e50',
    mediaControls : true,
    hideScrollBar: true
});

var songNames = [];
var songList = ["Sit Next To Me.mp3", "One Foot.mp3", "Kamikaze.mp3"];

for(i = 0; i < songList.length; i++){
    var ind = songList[i].indexOf(".");
    songNames[i] = songList[i].substring(0,ind); 
}

document.getElementById("SongTitle").innerHTML = songNames[0];
var songIndex = 0;

wavesurfer.on('ready', function () {
    // var timeline = Object.create(WaveSurfer.Timeline);
    // 
    // timeline.init({
    //     wavesurfer: wavesurfer,
    //     container: '#waveform-timeline'
    // });
});

wavesurfer.load("../music/" + songList[0]);

if (annyang) {
    var commands = {
        'play': function () {
            wavesurfer.play();
        },

        'pause': function () {
            wavesurfer.pause();
        },

        'next': function () {
            songIndex=(songIndex + 1) % 3;
            wavesurfer.load("Media/" + songList[songIndex]);
            document.getElementById("SongTitle").innerHTML = songNames[songIndex];
        },

        'previous': function () {
            if(songIndex == 0) {songIndex = 3;}
            songIndex=(songIndex - 1);
            wavesurfer.load("Media/" + songList[songIndex]);
            document.getElementById("SongTitle").innerHTML = songNames[songIndex];
        }
    };
    annyang.addCommands(commands);
    annyang.start();
}
