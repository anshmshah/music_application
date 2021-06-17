const music = document.querySelector("audio");
const play = document.getElementById("play");
const pause = document.getElementById("pause");
const img = document.querySelector(".img img");
const title = document.getElementById('title');
const artist = document.getElementById('artist');
const next = document.getElementById('next');
const prev = document.getElementById('prev');

let progress = document.getElementById('progress');
let total_duration = document.getElementById('duration');
let current_time = document.getElementById('current_time');
const progress_div = document.getElementById('progress_div');


const songs = [
    {
        name:"one",
        title:"Anniversary",
        artist: "COP Studio"
    },
    {
        name:"two",
        title:"baby",
        artist: "Justin Biber"
    },
    {
        name:"three",
        title:"Shape of You",
        artist: "Ed Shreen"
    },
    {
        name:"four",
        title:"game over",
        artist: "unknown"
    }
]


let isPlaying = false;

play.addEventListener('click', (()=>{
    isPlaying = true;
    music.play();
    img.classList.add("anime");
    pause.style.display="block";
    play.style.display="none";
}));

pause.addEventListener('click', ()=>{
    isPlaying = false;
    music.pause();
    img.classList.remove("anime");
    play.style.display="block";
    pause.style.display="none";
});

// changing title & artist

const loadSong = (songs)=>{
    title.textContent = songs.title;
    artist.textContent = songs.artist;
    music.src = `music/${songs.name}.mp3`;
    img.src = `imgs/${songs.name}.jpg`;
}

songIndex = 0;
// loadSong(songs[2]);

const nextSong = ()=>{
    songIndex = (songIndex + 1) % songs.length;
    loadSong(songs[songIndex]);
    isPlaying = true;           //also make the function to do not repeate yourself
    music.play();
    img.classList.add("anime");
    pause.style.display="block";
    play.style.display="none";
}

const prevSong = ()=>{
    songIndex = (songIndex - 1 + songs.length) % songs.length;
    loadSong(songs[songIndex]);
    isPlaying = true;           //also make the function to do not repeate yourself
    music.play();
    img.classList.add("anime");
    pause.style.display="block";
    play.style.display="none";
}

// progress js works
music.addEventListener('timeupdate',(event)=>{
    // console.log(event);
    const {currentTime,duration} =event.srcElement;
    // console.log(currentTime);
    // console.log(duration);

    let progress_time = (currentTime / duration) * 100;
    progress.style.width = `${progress_time}%`;

    // music direction update
    // console.log(duration); 
    let minute_dur = Math.floor(duration / 60);
    let second_dur = Math.floor(duration % 60);
    // console.log(`${minute_dur}:${second_dur}`);

    let total_dur = `${minute_dur}:${second_dur}`;
    if (duration) {
        total_duration.textContent = `${total_dur}`;
    }

    // current direction update
    // console.log(duration); 
    let minute_currentTime = Math.floor(currentTime / 60);
    let second_currentTime = Math.floor(currentTime % 60);
    // console.log(`${minute_dur}:${second_dur}`);

    if (second_currentTime < 10) {
        second_currentTime = `0${second_currentTime}`
    }

    let total_currentTime = `${minute_currentTime}:${second_currentTime}`;
    current_time.textContent = `${total_currentTime}`;
    
});

// progress onclick functionallity 
progress_div.addEventListener('click', (event)=>{
    console.log(event);
    const {currentTime,duration} = music;   //this is the object destructing of (const duration = music.duration)
    let move_process = (event.offsetX / event.srcElement.clientWidth) * duration;
    
    // console.log(duration);
    // console.log(move_process);

    music.currentTime = move_process;
})

// if music end call next song function
music.addEventListener('ended', nextSong);

next.addEventListener('click', nextSong);
prev.addEventListener('click', prevSong);