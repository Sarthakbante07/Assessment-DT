const { MongoClient } = require('mongodb');

const uri = 'mongodb://localhost:27017';  // Replace with your MongoDB URI
const dbName = 'eventDB';  // Replace with your database name

let db = null;  // This will hold the DB connection instance

// Function to connect to the database
async function connectDB() {
    if (db) {
        // Return the existing DB connection if already connected
        return db;
    }

    try {
        const client = new MongoClient(uri, { useUnifiedTopology: true });
        const connection = await client.connect();  // Establish connection
        db = connection.db(dbName);  // Set DB instance
        console.log('Connected to MongoDB');
        return db;
    } catch (error) {
        console.error('Failed to connect to MongoDB:', error);
        throw error;  // Propagate the error if connection fails
    }
}

// Function to get the DB instance
function getDB() {
    if (!db) {
        throw new Error('Database connection not established. Please connect first.');
    }
    return db;
}

module.exports = { connectDB, getDB };
