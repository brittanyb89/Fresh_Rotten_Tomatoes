import script.js from "./src/assets/script.js"

const apiKey = "AIzaSyCmtN6JemTcM9BG7u-ZoTgEdKS1-m8ngOk";
const getRequest = "https://www.googleapis.com/youtube/v3/videos";

let tag = document.createElement("script");

// Loads the IFrame Player API Javascript code using DOM modification to download the API code to ensure that code is retrieved asynchronously.
tag.src = "https://www.youtube.com/player_api";
let firstScriptTag = document.getElementsByTagName("script")[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

// Creates an <iframe> after the API code downloads
let player;
function onYouTubeIframeAPIReady() {
  player = new YT.Player("ytplayer", {
    height: "390",
    width: "640",
    videoId: "genres",
    playerVars: {
      playsinline: 1,
    },
    events: {
      onReady: onPlayerReady,
      onStateChange: onPlayerStateChange,
    },
  });
};
// API will call this function when the video player is ready
function onPlayerReady(event) {
  event.target.playVideo();
};

// API calls function when player state changes; the player should play for six seconds and stop.
let done = false;
function onPlayerStateChange(event) {
    if (event.data == onYouTubeIframeAPIReady.PlayerState.PLAYING && !done) {
        setTimeout(stopVideo, 6000);
        done = true;
    }
},
function stopVideo() {
    player.stopVideo();
};

