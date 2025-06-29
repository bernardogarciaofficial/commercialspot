// script.js -- For auto-reconnect and "always on" logic

const video = document.getElementById('tv-stream');
const sources = [
  // Put your main source first, then fallbacks if needed
  {src: "https://example.com/your-247-stream.m3u8", type: "application/x-mpegURL"},
  {src: "https://example.com/your-247-stream.mp4", type: "video/mp4"}
];

// Always play and auto-reconnect if stream fails
function ensurePlaying() {
  if (video.paused || video.ended) {
    video.play().catch(()=>{});
  }
}

// Attempt to reload source if error happens (for 24/7 channel)
video.addEventListener('error', function() {
  // Try to reload the stream after short delay
  setTimeout(() => {
    video.load();
    video.play().catch(()=>{});
  }, 2000);
});

// Try to always keep the video playing
video.addEventListener('pause', ensurePlaying);
video.addEventListener('ended', ensurePlaying);

// Optional: Reconnect every 6 hours for long uptime
setInterval(() => {
  video.load();
  video.play().catch(()=>{});
}, 6 * 60 * 60 * 1000); // 6 hours

// Extra: If you want to update the stream URL weekly, fetch it dynamically here
// (Example: fetch a new playlist URL from your backend and set video.src)
