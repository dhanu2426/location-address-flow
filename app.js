// app.js
const express = require('express');
const app = express();
const client = require('./db'); // Import db.js to ensure MongoDB connection


app.use(express.json());

// Example route to test MongoDB connection
app.get('/', (req, res) => {
  res.send('Hello, MongoDB connected!');
});

// Example route to insert a new document into MongoDB
app.post('/add-user', async (req, res) => {
  try {
    const { name, email, age } = req.body;

    const database = client.db('myDatabase'); // Use your actual database name
    const collection = database.collection('myCollection'); // Use your actual collection name

    const newUser = { name, email, age };
    const result = await collection.insertOne(newUser);
    
    res.status(201).json({ message: 'User added', user: result.ops[0] });
  } catch (error) {
    console.error('Error inserting user:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Start the server
app.listen(5000, () => {
  console.log('Server is running on port 5000');
});
