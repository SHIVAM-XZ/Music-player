console.log('welcome to spotify');
let audioElem = new Audio('songs/1.mp3');
let songindex = 1;
let progressbar = document.getElementById('progressbar');
let masterplay = document.getElementById('masterplay');
let gif = document.getElementById('gif');
let changetitles = document.getElementById('changetitles');
let songItem = Array.from(document.getElementsByClassName('songItem'));
gif.style.opacity = 0;
let songs = [
    { songName: "Simroon Tera Naam", filePath: "songs/1.mp3", coverPath: "covers/1.jpg" },
    { songName: "Chaleya", filePath: "songs/2.mp3", coverPath: "covers/2.webp" },
    { songName: "Heeriye", filePath: "songs/3.mp3", coverPath: "covers/3.webp" },
    { songName: "Le Aaunga", filePath: "songs/4.mp3", coverPath: "covers/4.webp" },
    { songName: "Shayad x Samjhawan", filePath: "songs/5.mp3", coverPath: "covers/5.webp" },
    { songName: "Pasoori Nu", filePath: "songs/6.mp3", coverPath: "covers/6.webp" },
    { songName: "Agar Tum Saath Ho", filePath: "songs/7.mp3", coverPath: "covers/7.webp" },
]
songItem.forEach((element, i) => {
    console.log(element, i);
    element.getElementsByTagName('img')[0].src = songs[i].coverPath;
    element.getElementsByClassName('songName')[0].innerHTML = songs[i].songName
})


masterplay.addEventListener('click', () => {
    if (audioElem.paused || audioElem.currentTime <= 0) {
        audioElem.play();
        masterplay.classList.remove('fa-circle-play');
        masterplay.classList.add('fa-circle-pause');
        gif.style.opacity = 1;
    }
    else {
        audioElem.pause();
        masterplay.classList.remove('fa-circle-pause');
        masterplay.classList.add('fa-circle-play');
        gif.style.opacity = 0;
    }
})
audioElem.addEventListener('timeupdate', () => {
    console.log('timeupdate'); //only to check if its working or not
    progress = parseInt((audioElem.currentTime / audioElem.duration) * 100);
    console.log(progress); //only to check if its working or not
    progressbar.value = parseInt(progress);
})
progressbar.addEventListener('change', () => {
    audioElem.currentTime = (progressbar.value * audioElem.duration) / 100;// In this case, the parseInt function is not necessary because the value of progressbar.value is already an integer.

})
const makeAllPlays = () => {
    Array.from(document.getElementsByClassName('songItemplay')).forEach((element) => {

        element.classList.remove('fa-circle-pause');
        element.classList.add('fa-circle-play');


    })
}


Array.from(document.getElementsByClassName('songItemplay')).forEach((element) => {
    element.addEventListener('click', (e) => {
        makeAllPlays();
        if (audioElem.paused) {

            songindex = parseInt(e.target.id);
            e.target.classList.remove('fa-circle-play');
            e.target.classList.add('fa-circle-pause');
            masterplay.classList.remove('fa-circle-play');
            masterplay.classList.add('fa-circle-pause');
            changetitles.innerText = songs[songindex - 1].songName;
            audioElem.src = `songs/${songindex}.mp3`; //For example, if the clicked element is the third element with the 'songItemplay' class, the `index` variable will be set to 2 (since indices start at 0). The path of the corresponding audio file will then be constructed as `songs/2.mp3`.  `audioElem.src` property is set to the path of the clicked element's corresponding audio file.
            audioElem.currentTime = 0;
            audioElem.play();
            gif.style.opacity = 1;
        }
        else {

            audioElem.pause();
            masterplay.classList.add('fa-circle-play');
            masterplay.classList.remove('fa-circle-pause');

            gif.style.opacity = 0;
        }


    })

})// This code defines a function `makeAllPlays` that removes the 'fa-circle-pause' class and adds the 'fa-circle-play' class to all elements with the 'songItemplay' class. It then adds an event listener to each element with the 'songItemplay' class that calls the `makeAllPlays` function and removes the 'fa-circle-play' class and adds the 'fa-circle-pause' class to the clicked element.


document.getElementById('next').addEventListener('click', () => {

    if (songindex > 7) {
        songindex = 0;
    }
    else {
        songindex += 1;

    }
    audioElem.src = `songs/${songindex}.mp3`;
    audioElem.currentTime = 0;
    audioElem.play();
    masterplay.classList.remove('fa-circle-play');
    masterplay.classList.add('fa-circle-pause');
    changetitles.innerText = songs[songindex - 1].songName;
    gif.style.opacity = 1;
})
document.getElementById('previous').addEventListener('click', () => {
    if (songindex <= 7) {
        songindex -= 1;
    }
    else {
        songindex = 0;
    }
    audioElem.src = `songs/${songindex}.mp3`;
    audioElem.currentTime = 0;
    audioElem.play();
    masterplay.classList.remove('fa-circle-play');
    masterplay.classList.add('fa-circle-pause');
    changetitles.innerText = songs[songindex - 1].songName;
    gif.style.opacity = 1;
})