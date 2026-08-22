console.log("Let's write some JavaScript");

let currentsong = new Audio();
let play = document.querySelector(".play img");
let songs;

let currentPlaylist = [];
let currentIndex = 0;

function secondsToMinutesSeconds(seconds) {
    if (isNaN(seconds) || seconds < 0) return "Loading....";

    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);

    return `${String(minutes).padStart(2, "0")}:${String(remainingSeconds).padStart(2, "0")}`;
}

function playmusic(track, title = "", artist = "", playlist = [], index = 0) {
    currentPlaylist = playlist;
    currentIndex = index;

    currentsong.pause();
    currentsong.currentTime = 0;
    currentsong.src = track;
    currentsong.play().catch(e => console.log(e));

    play.src = "pause.svg";

    if (title !== "") {
        document.querySelector(".songinfo").innerHTML = `${title}<br>${artist}`;
    } else {

        document.querySelector(".songinfo").innerHTML = decodeURIComponent(track.split("/%5Csongs%5C")[1]);
    }
    document.querySelector(".songtime").innerHTML = "00:00 / 00:00";
}
function playNext() {
    if (currentPlaylist.length === 0) return;
    currentIndex = (currentIndex + 1) % currentPlaylist.length; // loop
    playmusic(currentPlaylist[currentIndex], "", "", currentPlaylist, currentIndex);
}

function playPrevious() {
    if (currentPlaylist.length === 0) return;
    currentIndex = (currentIndex - 1 + currentPlaylist.length) % currentPlaylist.length; // loop
    playmusic(currentPlaylist[currentIndex], "", currentPlaylist, currentIndex);
}

async function getsongs(folder) {
    let response = await fetch(folder);
    let text = await response.text();
    let div = document.createElement("div");
    div.innerHTML = text;
    let links = div.getElementsByTagName("a");
    let songs = [];
    for (let i = 0; i < links.length; i++) {
        if (links[i].href.endsWith(".mp3")) {
            songs.push(links[i].href);
        }
    }
    return songs;
}

async function main() {

    songs = await getsongs("http://192.168.0.104:3000/songs/");
    let songUL = document.querySelector(".songlist ul");
    songUL.innerHTML = "";

    songs.forEach(song => {
        let name = decodeURIComponent(song.split("/%5Csongs%5C")[1]);
        songUL.innerHTML += `
        <li>
            <img src="music.svg">
            ${name}
            <img src="play.svg">
        </li>`;
    });

    Array.from(songUL.getElementsByTagName("li")).forEach((li, index) => {
        li.addEventListener("click", () => {
            playmusic(songs[index], "", "", songs, index);
        });
    });


    play.addEventListener("click", () => {
        if (currentsong.paused) {
            currentsong.play();
            play.src = "pause.svg";
        } else {
            currentsong.pause();
            play.src = "play.svg";
        }
    });


    document.querySelector(".previous").addEventListener("click", playPrevious);

    document.querySelector(".next").addEventListener("click", playNext);

   
    currentsong.addEventListener("ended", playNext);

    currentsong.addEventListener("timeupdate", () => {
        if (currentsong.duration) {
            document.querySelector(".songtime").innerHTML =
                `${secondsToMinutesSeconds(currentsong.currentTime)} / ${secondsToMinutesSeconds(currentsong.duration)}`;
            document.querySelector(".circle").style.left = (currentsong.currentTime / currentsong.duration) * 100 + "%";
        }
    });

    document.querySelector(".seekbar").addEventListener("click", e => {
        let percent = (e.offsetX / e.target.getBoundingClientRect().width) * 100;
        document.querySelector(".circle").style.left = percent + "%";
        currentsong.currentTime = currentsong.duration * percent / 100;
    });

    let trendingSongs = await getsongs("http://192.168.0.104:3000/songs/trending/");
    document.querySelectorAll(".trending ul li").forEach((li, index) => {
        li.addEventListener("click", () => {
            if (trendingSongs[index]) {
                playmusic(trendingSongs[index], li.querySelector("h3").innerText, li.querySelector("p").innerText, trendingSongs, index);
            }
        });
    });

    let artistSongs = await getsongs("http://192.168.0.104:3000/songs/artist/");
    document.querySelectorAll(".artist ul li").forEach((li, index) => {
        li.addEventListener("click", () => {
            if (artistSongs[index]) {
                playmusic(artistSongs[index], li.querySelector("h3").innerText, li.querySelector("p").innerText, artistSongs, index);
            }
        });
    });

    let albumSongs = await getsongs("http://192.168.0.104:3000/songs/album/");
    document.querySelectorAll(".albums ul li").forEach((li, index) => {
        li.addEventListener("click", () => {
            if (albumSongs[index]) {
                playmusic(albumSongs[index], li.querySelector("h3").innerText, li.querySelector("p").innerText, albumSongs, index);
            }
        });
    });

    document.querySelector(".hamberguer").addEventListener("click", () => {
        document.querySelector(".left").style.left = "0";
    });

    document.querySelector(".cross").addEventListener("click", () => {
        document.querySelector(".left").style.left = "-100%";
    });

}
main();

