const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5001;

app.use(cors());
app.use(express.json());

// Main health endpoint
app.get('/api/health', (req, res) => {
    res.json({ 
        status: 'success', 
        message: 'ANTIGRAVITY Backend API Engine is live.',
        timestamp: new Date().toISOString()
    });
});

app.listen(PORT, () => {
    console.log(`🚀 Antigravity Backend Server running on port ${PORT}`);
});
