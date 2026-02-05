const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Enable CORS
app.use(cors());

// Serve static files
app.use(express.static(path.join(__dirname)));

// Route for root - serve Serendipity.html (main home page)
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'Serendipity.html'));
});

// Catch-all for any 404s - serve the file if it exists, otherwise send 404
app.use((req, res) => {
    const filePath = path.join(__dirname, req.path);
    res.status(404).send('404 - File not found');
});

app.listen(PORT, () => {
    console.log(`Nexus server is running on port ${PORT}`);
    console.log(`Visit http://localhost:${PORT} to access the application`);
});
