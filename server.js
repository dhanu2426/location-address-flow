// Import required dependencies
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();

// Middleware to parse JSON requests
app.use(express.json());

// Enable CORS
app.use(cors());

// MongoDB URI - make sure to replace it with your actual MongoDB URI
const dbURI = process.env.MONGODB_URI || '"mongodb+srv://baikandhanusha24:Dhanu%232426@cluster1.lauom.mongodb.net/?retryWrites=true&w=majority&appName=Cluster1"';

// Connect to MongoDB
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('DB Connected');
  })
  .catch(err => {
    console.error('DB Connection Error:', err);
  });

// Define a sample Mongoose model (replace with your actual schema)
const Location = mongoose.model('Location', new mongoose.Schema({
  name: { type: String, required: true },
  address: { type: String, required: true },
  coordinates: {
    lat: { type: Number, required: true },
    long: { type: Number, required: true },
  },
}));

// Sample API route to get locations
app.get('/api/locations', async (req, res) => {
  try {
    const locations = await Location.find();
    res.json(locations);
  } catch (err) {
    console.error('Error fetching locations:', err);
    res.status(500).json({ error: 'Failed to fetch locations' });
  }
});

// Sample API route to add a new location
app.post('/api/locations', async (req, res) => {
  const { name, address, coordinates } = req.body;

  if (!name || !address || !coordinates) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  try {
    const newLocation = new Location({
      name,
      address,
      coordinates,
    });

    await newLocation.save();
    res.status(201).json(newLocation);
  } catch (err) {
    console.error('Error saving location:', err);
    res.status(500).json({ error: 'Failed to save location' });
  }
});

// Root route
app.get('/', (req, res) => {
  res.send('Welcome to the Location API!');
});

// Start the server on port 5000
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
