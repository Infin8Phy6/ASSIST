const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mysql = require('mysql2');

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MySQL Database Connection
const db = mysql.createConnection({
    host: 'sql12.freemysqlhosting.net',
    user: 'sql12762989',
    password: 'kGgrfBqrn2',
    database: 'sql12762989',
    port: 3306
});

// Connect to the database
db.connect((err) => {
    if (err) {
        console.error('Database connection failed:', err);
        return;
    }
    console.log('Connected to MySQL database.');
});

// Handle TSX form submissions
app.post('/submit', (req, res) => {
    const { h, acttime, actstatus, referralCode } = req.body;

    // Console log received data
    console.log('Received Data:', { h, acttime, actstatus});

    // Validate input
    if (!h || !acttime || !actstatus) {
        return res.status(400).json({ error: 'All fields (h, acttime, actstatus) are required' });
    }

    // Save data to MySQL
    const sql = 'INSERT INTO examinerusers (h, acttime, actstatus) VALUES (?, ?, ?)';
    db.query(sql, [h, acttime, actstatus], (err, result) => {
        if (err) {
            console.error('Error inserting data:', err);
            return res.status(500).json({ error: 'Failed to save data' });
        }
        console.log('Data successfully saved to database:', { h, acttime, actstatus });
        res.json({ success: true, message: 'Data saved successfully' });
    });
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
