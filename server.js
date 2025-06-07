// my-youtube-channel-server/server.js
const express = require('express');
const cors = require('cors'); // Required for cross-origin requests from your Netlify site
const app = express();
const PORT = process.env.PORT || 10000;

// Use CORS to allow your Netlify frontend to fetch data from this server
app.use(cors());

// --- YOUR YOUTUBE PLAYLIST DEFINITION ---
const youtubePlaylist = [
    { id: 'dQw4w9WgXcQ', title: 'Rick Astley - Never Gonna Give You Up' },
    { id: 'CvE67w4N-m4', title: 'The Internet - Dontcha Wanna Ride' },
    { id: 'kfVsfFXzlQw', title: 'Greatest Goals in Football History' },
    { id: 'LXb3EKWsInQ', title: 'Chill Lo-fi Study Beats' }
    // Add more { id: 'YOUR_VIDEO_ID', title: 'Your Video Title' } objects here
];
// --- END PLAYLIST DEFINITION ---

// Endpoint to get the entire playlist in sequence
app.get('/playlist', (req, res) => {
    res.json(youtubePlaylist);
});

// Endpoint to get a random video from the playlist
app.get('/random-video', (req, res) => {
    const randomIndex = Math.floor(Math.random() * youtubePlaylist.length);
    res.json(youtubePlaylist[randomIndex]);
});

// Optional: Serve a specific video by index if needed
app.get('/playlist/:index', (req, res) => {
    const index = parseInt(req.params.index, 10);
    if (index >= 0 && index < youtubePlaylist.length) {
        res.json(youtubePlaylist[index]);
    } else {
        res.status(404).send('Video not found in playlist.');
    }
});

app.listen(PORT, () => {
    console.log(`YouTube Channel Server listening on port ${PORT}`);
    console.log(`Access playlist via: http://127.0.0.1:${PORT}/playlist`);
    console.log(`Access random video via: http://127.0.0.1:${PORT}/random-video`);
});
