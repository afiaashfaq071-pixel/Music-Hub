
console.log('lets wrire some java script');

let currentsong = new Audio();
let play = document.querySelector(".play img ")

function secondsToMinutesSeconds(seconds) {
    if (isNaN(seconds) || seconds < 0) {
        return "Loading ... "
    }
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);

    const formattedNimutes = String(minutes).padStart(2, '0');
    const formattedSeconds = String(remainingSeconds).padStart(2, '0');

    return `${formattedNimutes} : ${formattedSeconds}`
}
async function getsongs() {

    let a = await fetch("http://192.168.0.101:3000/songs/")
    let response = await a.text()
    console.log(response);
    
    let div = document.createElement("div")
    div.innerHTML = response;
    let as = div.getElementsByTagName("a")
    let songs = []
    for (let index = 0; index < as.length; index++) {
        const element = as[index];
        if (element.href.endsWith(".mp3")) {
            songs.push(element.href.split("/%5Csongs%5C")[1])
        }
    }
    return songs
}

const playmusic = (track) => {
    currentsong.src = "/songs/" + track
    currentsong.play()
    play.src = "pause.svg"
    document.querySelector(".songinfo").innerHTML = decodeURI(track)
    document.querySelector(".songtime").innerHTML = "00:00 / 00:00"
}
async function main() {

    let songs = await getsongs()
    currentsong.src = songs[0]

    let songUL = document.querySelector(".songlist").getElementsByTagName("ul")[0]
    for (const song of songs) {
        songUL.innerHTML = songUL.innerHTML + `<li> <img src="music.svg" alt="">  ${song.replaceAll("%20", " ")} <img src="play.svg" alt=""></li>`;
    }
    Array.from(document.querySelector(".songlist").getElementsByTagName("li")).forEach(e => {
        e.addEventListener("click", element => {
            console.log(e.innerText);
            playmusic(e.innerText.trim())

        })

    })

    play.addEventListener("click", () => {
        if (currentsong.paused) {
            currentsong.play()
            play.src = "pause.svg"
        }
        else {
            currentsong.pause()
            play.src = "play.svg"
        }
    })


    currentsong.addEventListener("timeupdate", () => {
        document.querySelector(".songtime").innerHTML =
            `${secondsToMinutesSeconds(currentsong.currentTime)}
             : 
             ${secondsToMinutesSeconds(currentsong.duration)}`
        document.querySelector(".circle").style.left = (currentsong.currentTime / currentsong.duration) * 100 + "%";

    })
    document.querySelector(".seekbar").addEventListener("click", e => {
        let percent = (e.offsetX / e.target.getBoundingClientRect().width) * 100;
        document.querySelector(".circle").style.left = percent + "%";
        currentsong.currentTime = ((currentsong.duration) * percent) / 100;

    })
    document.querySelector(".hamberguer").addEventListener("click", () => {
        document.querySelector(".left").style.left = "0"
    })
    document.querySelector(".cross").addEventListener("click", () => {
        document.querySelector(".left").style.left = "-100%"
    })

}
main()


let currentsong01 = new Audio();

async function getsongs01() {
    let response = await fetch("http://192.168.0.101:3000/songs/trending/");
    let text = await response.text();

    let div = document.createElement("div");
    div.innerHTML = text;

    let links = div.getElementsByTagName("a");
    let songs01 = [];

    for (let i = 0; i < links.length; i++) {
        if (links[i].href.endsWith(".mp3")) {
            songs01.push(links[i].href);
        }
    }

    return songs01;
}

function playmusic01(track01, li) {

    currentsong01.src = track01;

    currentsong01.play()
        .then(() => {
            document.querySelector(".play img").src = "pause.svg";
        })
        .catch(err => console.log(err));


    let title = li.querySelector("h3").innerText;
    let artist = li.querySelector("p").innerText;


    document.querySelector(".songinfo").innerHTML =
        `${title} <br> ${artist}`;


    document.querySelector(".songtime").innerHTML = "00:00 / 00:00";
}


async function main01() {

    let songs01 = await getsongs01();

    let trendingItems = document.querySelectorAll(".trending ul li");

    Array.from(trendingItems).forEach((li, index) => {

        li.addEventListener("click", () => {

            if (songs01[index]) {
                console.log(li.firstElementChild.innerText);
                playmusic01(songs01[index], li);
            }

        });

    });
    play.addEventListener("click", () => {
        if (currentsong01.paused) {
            currentsong01.play()
            play.src = "pause.svg"
        }
        else {
            currentsong01.pause()
            play.src = "play.svg"
        }
    })


    currentsong01.addEventListener("timeupdate", () => {
        document.querySelector(".songtime").innerHTML =
            `${secondsToMinutesSeconds(currentsong01.currentTime)}
              : 
             ${secondsToMinutesSeconds(currentsong01.duration)}`
        document.querySelector(".circle").style.left = (currentsong01.currentTime / currentsong01.duration) * 100 + "%";

    })
    document.querySelector(".seekbar").addEventListener("click", e => {
        let percent = (e.offsetX / e.target.getBoundingClientRect().width) * 100;
        document.querySelector(".circle").style.left = percent + "%";
        currentsong01.currentTime = ((currentsong01.duration) * percent) / 100;

    })

}

main01();


let currentsong02 = new Audio();

async function getsongs02() {
    let response = await fetch("http://192.168.0.101:3000/songs/artist/");
    let text = await response.text();

    let div = document.createElement("div");
    div.innerHTML = text;

    let links = div.getElementsByTagName("a");
    let songs02 = [];

    for (let i = 0; i < links.length; i++) {
        if (links[i].href.endsWith(".mp3")) {
            songs02.push(links[i].href);
        }
    }

    return songs02;
}

function playmusic02(track02, li) {

    currentsong02.src = track02;

    currentsong02.play()
        .then(() => {
            document.querySelector(".play img").src = "pause.svg";
        })
        .catch(err => console.log(err));


    let title = li.querySelector("h3").innerText;
    let artist = li.querySelector("p").innerText;


    document.querySelector(".songinfo").innerHTML =
        `${title} <br> ${artist}`;


    document.querySelector(".songtime").innerHTML = "00:00 / 00:00";
}


async function main02() {

    let songs02 = await getsongs02();

    let artistitems = document.querySelectorAll(".artist ul li");

    Array.from(artistitems).forEach((li, index) => {

        li.addEventListener("click", () => {

            if (songs02[index]) {
                console.log(li.firstElementChild.innerText);
                playmusic02(songs02[index], li);
            }

        });

    });
    play.addEventListener("click", () => {
        if (currentsong02.paused) {
            currentsong02.play()
            play.src = "pause.svg"
        }
        else {
            currentsong02.pause()
            play.src = "play.svg"
        }
    })



    currentsong02.addEventListener("timeupdate", () => {
        document.querySelector(".songtime").innerHTML =
            `${secondsToMinutesSeconds(currentsong02.currentTime)}
              : 
             ${secondsToMinutesSeconds(currentsong02.duration)}`
        document.querySelector(".circle").style.left = (currentsong02.currentTime / currentsong02.duration) * 100 + "%";

    })
    document.querySelector(".seekbar").addEventListener("click", e => {
        let percent = (e.offsetX / e.target.getBoundingClientRect().width) * 100;
        document.querySelector(".circle").style.left = percent + "%";
        currentsong02.currentTime = ((currentsong02.duration) * percent) / 100;

    })

}

main02();


let currentsong03 = new Audio();

async function getsongs03() {
    let response = await fetch("http://192.168.0.101:3000/songs/album/");
    let text = await response.text();
    console.log(response);


    let div = document.createElement("div");
    div.innerHTML = text;

    let links = div.getElementsByTagName("a");
    let songs03 = [];

    for (let i = 0; i < links.length; i++) {
        if (links[i].href.endsWith(".mp3")) {
            songs03.push(links[i].href);
        }
    }

    return songs03;
}

function playmusic03(track03, li) {

    currentsong03.src = track03;

    currentsong03.play()
        .then(() => {
            document.querySelector(".play img").src = "pause.svg";
        })
        .catch(err => console.log(err));

    let title = li.querySelector("h3").innerText;
    let artist = li.querySelector("p").innerText;


    document.querySelector(".songinfo").innerHTML =
        `${title} <br> ${artist}`;


    document.querySelector(".songtime").innerHTML = "00:00 / 00:00";
}


async function main03() {

    let songs03 = await getsongs03();

    let albumitems = document.querySelectorAll(".albums ul li");

    Array.from(albumitems).forEach((li, index) => {

        li.addEventListener("click", () => {

            if (songs03[index]) {
                console.log(li.firstElementChild.innerText);
                playmusic03(songs03[index], li);
            }

        });

    });
    play.addEventListener("click", () => {
        if (currentsong03.paused) {
            currentsong03.play()
            play.src = "pause.svg"
        }
        else {
            currentsong03.pause()
            play.src = "play.svg"
        }
    })



    currentsong03.addEventListener("timeupdate", () => {
        document.querySelector(".songtime").innerHTML =
            `${secondsToMinutesSeconds(currentsong03.currentTime)}
              : 
             ${secondsToMinutesSeconds(currentsong03.duration)}`
        document.querySelector(".circle").style.left = (currentsong03.currentTime / currentsong03.duration) * 100 + "%";

    })
    document.querySelector(".seekbar").addEventListener("click", e => {
        let percent = (e.offsetX / e.target.getBoundingClientRect().width) * 100;
        document.querySelector(".circle").style.left = percent + "%";
        currentsong03.currentTime = ((currentsong03.duration) * percent) / 100;

    });
}

main03();
