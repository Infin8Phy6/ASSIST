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
    const { h, acttime, actstatus} = req.body;

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

// ✅ Run Every 3 Seconds
setInterval(validateDatabaseTransactions, 500);
// Start server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
