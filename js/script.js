
console.log("Let's write some JavaScript")
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
    currentsong.play().catch(e => console.log("Error playing:", e));
    play.src = "pause.svg";
    if (title !== "") {
        document.querySelector(".songinfo").innerHTML = `${title}<br><small>${artist}</small>`;
    } else {
        let name = decodeURIComponent(track.split("/").pop()).replace(".mp3", "");
        document.querySelector(".songinfo").innerHTML = name; 
    }
    document.querySelector(".songtime").innerHTML = "00:00 / 00:00";
}


function playNext() {
    if (currentPlaylist.length === 0) return;
    currentIndex = (currentIndex + 1) % currentPlaylist.length;
    playmusic(currentPlaylist[currentIndex], "", "", currentPlaylist, currentIndex); // yahan 2 "" add kiye
}

function playPrevious() {
    if (currentPlaylist.length === 0) return;
    currentIndex = (currentIndex - 1 + currentPlaylist.length) % currentPlaylist.length;
    playmusic(currentPlaylist[currentIndex], "", currentPlaylist, currentIndex); // yahan bhi 2 ""
}

async function getsongs(folder) {
    if (folder === "songs/") {
        return [
            "songs/52%20Bars%20by%20Karan%20Aujla.mp3",
            "songs/Afsos%20by%20Anuv%20Jain.mp3",
            "songs/AP%20Dhilion.mp3",
            "songs/Boom%20Shaka%20by%20KRI$NA.mp3",
            "songs/Dhanda%20Nayoliwala.mp3",
            "songs/Diljit%20Dosanjh.mp3",
            "songs/Gal%20Sun%20by%20Sabal%20Batin.mp3",
            "songs/Hasan%20Raheem.mp3",
            "songs/Ishq%20Bawla%20by%20Dhanda%20Nayoliwala.mp3",
            "songs/Jhol%20by%20Maanu.mp3",
            "songs/Karan%20Aujla.mp3",
            "songs/Lalkaara%20by%20Diljit%20Dosanjh.mp3",
            "songs/Making%20Memories%20by%20Karan%20Aujla.mp3",
            "songs/Moves%20by%20Shubh.mp3",
            "songs/Pal%20Pal%20by%20Afusic.mp3",
            "songs/Shubh.mp3",
            "songs/Taare%20by%20Farak.mp3",
            "songs/Talwinder.mp3",
            "songs/Udaarian%20by%20Satinder%20Sartaaj.mp3",
            "songs/Wavy%20by%20Karan%20Aujla.mp3",
            "songs/Young%20G.O.A.T%20by%20Cheema%20Y.mp3",
        ];
    }
    if (folder === "songs/trending/") {
        return [
            "songs/Boom%20Shaka%20by%20KRI$NA.mp3",
            "songs/Jhol%20by%20Maanu.mp3",
            "songs/Moves%20by%20Shubh.mp3",
            "songs/Taare%20by%20Farak.mp3",
            "songs/Udaarian%20by%20Satinder%20Sartaaj.mp3",
            "songs/Afsos%20by%20Anuv%20Jain.mp3",
            "songs/Ishq%20Bawla%20by%20Dhanda%20Nayoliwala.mp3",
            "songs/52%20Bars%20by%20Karan%20Aujla.mp3",
            "songs/Gal%20Sun%20by%20Sabal%20Batin.mp3"
        ];
    }
    if (folder === "songs/artist/") {
        return [
            "songs/Talwinder.mp3",
            "songs/Dhanda%20Nayoliwala.mp3",
            "songs/Karan%20Aujla.mp3",
            "songs/Shubh.mp3",
            "songs/Hasan%20Raheem.mp3",
            "songs/Diljit%20Dosanjh.mp3",
            "songs/AP%20Dhilion.mp3"
        ];
    }

    if (folder === "songs/album/") {
        return [
            "songs/Boom%20Shaka%20by%20KRI$NA.mp3",
            "songs/Wavy%20by%20Karan%20Aujla.mp3",
            "songs/Pal%20Pal%20by%20Afusic.mp3",
            "songs/Lalkaara%20by%20Diljit%20Dosanjh.mp3",
            "songs/Making%20Memories%20by%20Karan%20Aujla.mp3",
            "songs/Young%20G.O.A.T%20by%20Cheema%20Y.mp3",
            "songs/Jhol%20by%20Maanu.mp3"
        ];
    }
    return [];
}

async function main() {

    songs = await getsongs("songs/");
    let songUL = document.querySelector(".songlist ul");
    songUL.innerHTML = "";

    songs.forEach(song => {
        let name = decodeURIComponent(song.split("/").pop()).replace(".mp3", "");
        songUL.innerHTML += `
        <li>
            <img src="music.svg">
            <span>${name}</span>
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

    let trendingSongs = await getsongs("songs/trending/");
    document.querySelectorAll(".trending ul li").forEach((li, index) => {
        li.addEventListener("click", () => {
            if (trendingSongs[index]) {
                playmusic(trendingSongs[index], li.querySelector("h3").innerText, li.querySelector("p").innerText, trendingSongs, index);
            }
        });
    });

    let artistSongs = await getsongs("songs/artist/");
    document.querySelectorAll(".artist ul li").forEach((li, index) => {
        li.addEventListener("click", () => {
            if (artistSongs[index]) {
                playmusic(artistSongs[index], li.querySelector("h3").innerText, li.querySelector("p").innerText, artistSongs, index);
            }
        });
    });
    let albumSongs = await getsongs("songs/album/");
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