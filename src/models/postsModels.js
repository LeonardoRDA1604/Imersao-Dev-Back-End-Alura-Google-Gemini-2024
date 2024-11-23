
// Import environment variables from the .env file
import 'dotenv/config';
// Import ObjectId from MongoDB to work with document IDs
import { ObjectId } from "mongodb";
// Import the database connection function
import connectToDatabase from "../config/dbConfig.js";

// Establish the connection to the database using the connection string from environment variables
const connection = await connectToDatabase(process.env.CONNECTION_STRING);

// Function to retrieve all posts from the database
export async function getAllPosts() {
    // Get the database object from the connection
    const db = connection.db("imersao-backend");
    // Get the "posts" collection from the database
    const collection = db.collection("posts");
    // Fetch all posts as an array and return the result
    return collection.find().toArray();
};

// Function to create a new post in the database
export async function createPost(newPost) {
    // Get the database object from the connection
    const db = connection.db("imersao-backend");
    // Get the "posts" collection from the database
    const collection = db.collection("posts");
    // Insert the new post into the collection and return the result
    return collection.insertOne(newPost);
}

// Function to update an existing post in the database
export async function updatePost(id, newPost) {
    // Get the database object from the connection
    const db = connection.db("imersao-backend");
    // Get the "posts" collection from the database
    const collection = db.collection("posts");
    // Convert the string ID to an ObjectId to be used for MongoDB queries
    const objId = ObjectId.createFromHexString(id);
    // Update the post with the specified ID, setting the new data
    return collection.updateOne({ _id: new ObjectId(objId) }, { $set: newPost });
}
