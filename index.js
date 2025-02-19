const express = require("express");
const cors = require("cors");
const mysql = require("mysql2");

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

// ✅ CORS Headers Middleware (For Cross-Origin Requests)
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  next();
});

// MySQL Database Connection Pool
const db = mysql.createPool({
    host: 'sql12.freemysqlhosting.net',
    user: 'sql12762989',
    password: 'kGgrfBqrn2',
    database: 'sql12762989',
    port: 3306,
    connectionLimit: 10, // Adjust the limit as needed
    waitForConnections: true, // Ensure connections wait in the queue if max connections are in use
    connectTimeout: 10000, // Timeout after 10 seconds if connection cannot be established
    acquireTimeout: 10000, // Timeout for acquiring a connection from the pool
    timeout: 10000 // Set timeout for each query
});

// Handle TSX form submissions
app.post('/submit', (req, res) => {
    const { h, acttime, actstatus } = req.body;

    // Console log received data
    console.log('Received Data:', { h, acttime, actstatus });

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
