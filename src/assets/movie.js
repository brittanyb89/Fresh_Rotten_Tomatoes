const apiKey = "AIzaSyCmtN6JemTcM9BG7u-ZoTgEdKS1-m8ngOk";
const getRequest = "https://www.googleapis.com/youtube/v3/videos";

let tag = document.createElement("script");

// Loads the IFrame Player API Javascript code using DOM modification to download the API code to ensure that code is retrieved asynchronously.
tag.src = "https://www.youtube.com/iframe_api";
let firstScriptTag = document.getElementsByTagName("script")[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

// Creates an <iframe> after the API code downloads
let player;
function onYouTubeIframeAPIReady() {
  player = new onYouTubeIframeAPIReady.Player("player", {
    height: "390",
    width: "640",
    videoId: "M7lc1UVf-VE",
    playerVars: {
      playsinline: 1,
    },
    events: {
      onReady: onPlayerReady,
      onStateChange: onPlayerStateChange,
    },
  });
}
// API will call this function when the video player is ready
function onPlayerReady(event) {
  event.target.playVideo();
}
