
// Import the MongoClient class from the MongoDB package
import { MongoClient } from 'mongodb';

// Function to establish a connection to the MongoDB database
export default async function connectToDatabase(connectionString) {
  let mongoClient;

  try {
      // Initialize the MongoClient instance with the provided connection string
      mongoClient = new MongoClient(connectionString);
      console.log('Connecting to the Database Cluster...');
      
      // Attempt to connect to the database cluster
      await mongoClient.connect();
      console.log('Successfully connected to MongoDB Atlas!');

      // Return the mongoClient instance, which is now connected
      return mongoClient;
  } catch (error) {
      // If an error occurs while connecting to the database, log the error
      console.error('Database connection failed!', error);
      
      // Exit the process with a non-zero code to indicate failure
      process.exit();
  }
}
