const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Handle TSX form submissions
app.post('/submit', (req, res) => {
    const { h, acttime, actstatus } = req.body;
    
    if (!h || !acttime || !actstatus) {
        return res.status(400).json({ error: 'All fields (h, acttime, actstatus) are required' });
    }

    console.log('Received submission:', { h, acttime, actstatus });

    res.json({ success: true, message: 'Submission received successfully' });
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
