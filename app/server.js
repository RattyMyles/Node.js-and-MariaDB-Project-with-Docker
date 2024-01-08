const express = require('express')
const db = require('./db')
const app = express()
const port = 8080
const bodyParser = require("body-parser");
 
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Instead of directly sending the result, convert BigInts to strings
// GET
app.get('/tasks', async (req, res) => {
    let conn;
    try {
        conn = await db.pool.getConnection();
        var query = "select * from tasks";
        var rows = await conn.query(query);
        res.send(rows);
        //res.json(resultWithStrings); // Use res.json instead of res.send
    } catch (err) {
        throw err;
    } finally {
        if (conn) return conn.release();
    }
});

// POST
app.post('/tasks', async (req, res) => {
    let conn;
    try {
        const { description } = req.body;

        conn = await db.pool.getConnection();

        // Insert the task into the database
        const result = await conn.query("INSERT INTO tasks (description) VALUES (?)", [description]);

        // Get the last inserted ID, ensuring it's a string
        const lastInsertedId = String(result.insertId);

        // Send a successful response with the last inserted ID
        res.json({ id: lastInsertedId });
    } catch (error) {
        // Handle errors gracefully and send an error response
        console.error("Error inserting task:", error);
        res.status(500).json({ error: "Internal Server Error" });
    } finally {
        if (conn) return conn.release();
    }
});

app.listen(port, () => console.log(`Listening on port ${port}`));
