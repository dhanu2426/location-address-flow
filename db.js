const { MongoClient } = require('mongodb');

// MongoDB connection URI (Replace with your MongoDB Atlas URI)
const uri = "mongodb+srv://baikandhanusha24:Dhanu%232426@cluster1.lauom.mongodb.net/?retryWrites=true&w=majority&appName=Cluster1";

// Database and collection names (Replace with your database and collection names)
const dbName = "locationAddress"; // Example database name
const collectionName = "addresses"; // Example collection name

// Function to connect to MongoDB and insert a document
async function connectAndInsert() {
    try {
        // Connect to MongoDB
        const client = await MongoClient.connect(uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        console.log('Connected to MongoDB Atlas!');
        
        // Get the database and collection
        const db = client.db(dbName);
        const collection = db.collection(collectionName);

        // Create a new document to insert
        const newDocument = {
            name: 'John Doe',
            email: 'johndoe@example.com',
            address: '123 Main St, Example City, EX',
            dateInserted: new Date()
        };

        // Insert the document into MongoDB
        const result = await collection.insertOne(newDocument);
        console.log('Inserted document:', result);

        // Close the MongoDB connection
        client.close();
    } catch (err) {
        console.error('Error connecting to MongoDB or inserting document:', err);
    }
}

// Call the function to connect and insert a document
connectAndInsert();
