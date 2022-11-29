const apiKey = "AIzaSyCmtN6JemTcM9BG7u-ZoTgEdKS1-m8ngOk";
// const getRequest = "https://www.googleapis.com/youtube/v3/search";
// https://www.youtube.com/embed?listType=playlist&list=PL${original_title}

// Loads Iframe Player API code
let iframe = document.createElement("iframe");
iframe.id = "iframe-video";
iframe.src = "https://www.youtube.com/embed/899lBFnd4Tg";
let youTube = document.getElementsByTagName("iframe")[0];
youTube.parentNode.insertBefore(iframe, youTube);

let video;
function onYouTubeIframeAPIReady() {
  video = new YT.Player("player", {
    videoId: "",
    events: {
      onReady: onPlayerReady,
      onStateChange: onPlayerStateChange,
    },
  });
}
// API will call this function when the video player is ready
function onPlayerReady(event) {
  document.getElementById("player").style.borderColor = "#FF6D00";
}
function changeBorderColor(playerStatus) {
  let color;
  if (playerStatus == -1) {
    color = "#37474F"; // not started  is gray
  } else if (playerStatus == 0) {
    color = "#FFFF00"; // ended is yellow
  } else if (playerStatus == 1) {
    color = "#33691E"; //playing is green
  } else if (playerStatus == 2) {
    color = "#DD2C00"; // paused is red
  } else if (playerStatus == 3) {
    color = "#AA00FF"; //buffering is purple
  } else if (playerStatus == 5) {
    color = "#FF6DOO"; // video cued is orange
  }
  if (color) {
    document.getElementById("player").style.borderColor = color;
  }
}
function onPlayerStateChange(event) {
  changeBorderColor(event.data);
}
function onPlayerReady(event) {
  let cc_load_policy = 1;
  event.target.playVideo();
}

// let ytPlayer = document.getElementById("player");

// player.parentNode.insertBefore(youtube, player);

// add event to trigger iframe loading
document.getElementById("begin").addEventListener("click", function () {
  // add iframe to webpage
  // player.appendChild(youtube);
  // player.parentNode.insertBefore(youtube, "player");
  // let youtube = document.getElementsByTagName("iframe")[0];
});

// API calls function when player state changes; the player should play for six seconds and stop.
let done = false;
function onPlayerStateChange(event) {
  if (event.data == onYouTubeIframeAPIReady.PlayerState.PLAYING && !done) {
    setTimeout(stopVideo, 6000);
    done = true;
  }
}
function stopVideo() {
  player.stopVideo();
}

// YouTube API call for movie clips
function fetchVideo() {
  fetch(
    `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=20&q=${movieTitle}&type=video&key=${apiKey}`
  )
    //// `https://youtube.googleapis.com/youtube/v3/search?key=${apiKey}&apix_params=%7B"q"%3A"bad_santa%20trailer"%7D`
    //   //   pending promise from fetch (tested this to see if it was working by using console.log(fetch(`https://youtube.googleapis.com/youtube/v3/search?key=${apiKey}`)))
    .then((response) => {
      console.log(response);
      if (!response.ok) {
        throw Error("Error");
      }
      return response.json();
    })
    // Looked at response in network and used "items" to console.log to get array to appear in console
    .then((video) => {
      console.log(video.items);
    })
    // catching errors with the below function
    .catch((error) => {
      console.log(error);
    });
}

fetchVideo();

// cueVideoById();

// async function cueVideoById() {
//     const request = await fetch(

//     )
// }
// player.cueVideoById({videoId: 'original_title', startSeconds: 3
// });
