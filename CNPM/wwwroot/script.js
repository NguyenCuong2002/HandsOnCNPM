const songs = [
  {
    path: "./asset/mp3/song1.mp3",
    name: "Sai gon ",
    singer: "Bray",
  },
  {
    path: "./asset/mp3/song2.mp3",
    name: "Tien",
    singer: "G-Ducky",
  },
];

const title = document.querySelector(".title-song");
const singer = document.querySelector(".singer");
const play = document.querySelector("#play");
const prev = document.querySelector(".pre");
const next = document.querySelector(".next");
const progress = document.querySelector(".progress")
const present_Song = document.querySelector('.present-song')
const total = document.querySelector('.total-song')
const volumn = document.querySelector('#volumn')
const volumn_show = document.querySelector('#volumn-show')
const speaker = document.querySelector('.speaker')

speaker.onclick = () => {
    
}







let playing_song = false;

let index_song = 0;

const track = document.createElement("audio");

function start() {
  load_song(index_song);
  present_Song.innerHTML = index_song+1
  total.innerHTML = songs.length
}

start();

function load_song(index) {
  track.src = songs[index].path;
  title.innerHTML = songs[index].name;
  singer.innerHTML = songs[index].singer;
  track.load();
}

function justPlay() {
  if (playing_song === false) {
    playSong();
  } else {
    pauseSong();
  }
}

function playSong() {
  track.play();
  playing_song = true;
  play.innerHTML = '<i class="fa fa-pause"></i>';
}

function pauseSong() {
  track.pause();
  playing_song = false;
  play.innerHTML = '<i class="fa fa-play"></i>';
}

next.onclick = () => {
  index_song++;
  if (index_song < songs.length) {
    track.src = songs[index_song].path;
    title.innerHTML = songs[index_song].name;
    singer.innerHTML = songs[index_song].singer;
  } else {
    index_song = 0;
  }
  start();
  pauseSong();
};

prev.onclick = () => {
  index_song--;
  if (index_song < 0) {
    index_song = songs.length - 1;
  } else {
    track.src = songs[index_song].path;
    title.innerHTML = songs[index_song].name;
    singer.innerHTML = songs[index_song].singer;
  }
  start();
  pauseSong();
};

progress.oninput = () => {
    progress.value = track.currentTime/180
    console.log(progress.value)
}

volumn.oninput = () => {
    volumn_show.innerHTML =volumn.value;
    track.volume = volumn.value/100;
    if(volumn.value == 0) {
        speaker.innerHTML = '<i class="fas fa-volume-mute"></i>'
    }
    else {
        speaker.innerHTML = '<i class="fas fa-volume-up"></i>'
    }

}

track.ontimeupdate = () => {
    progress.value = (track.currentTime / track.duration) * 100 || 0;

}

progress.oninput = (e) => {
    progress.value = e.target.value
    track.currentTime = progress.value * track.duration / 100;

}

track.onended = () => {
    index_song += 1;
    if(index_song >= songs.length) {
        index_song = 0;
    }
    load_song(index_song);
    track.play();
}
