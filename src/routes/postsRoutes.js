
// Import necessary libraries for handling routing, file uploads, and CORS
import express from "express";
import multer from "multer";
import { ShowAllPosts, createNewPost, uploadImage, updateNewPost } from "../controllers/postsController.js";
import cors from "cors";

// Configure CORS options to allow requests from a specific origin (localhost:8000)
const corsOptions = {
    origin: "http://localhost:8000", // Allow only requests from this origin
    optionsSuccessStatus: 200 // Set the success status code for preflight requests
}

// Configure multer for handling file uploads, including destination and filename settings
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        // Set the folder where uploaded files will be stored ('uploads/')
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        // Use the original name of the file for saving it
        cb(null, file.originalname);
    }
})

// Initialize multer with the specified storage configuration
const upload = multer({ dest: "./uploads", storage })

// Define the routes for the application
const routes = (app) => {
    // Use express.json() middleware to parse incoming JSON requests
    app.use(express.json());
    // Enable CORS with the previously defined options
    app.use(cors(corsOptions));

    // Define a route to get all posts (GET request to '/posts')
    app.get("/posts", ShowAllPosts);
    
    // Define a route to create a new post (POST request to '/posts')
    app.post("/posts", createNewPost);
    
    // Define a route to handle image upload (POST request to '/upload')
    // The file will be processed by multer middleware before reaching the uploadImage controller
    app.post("/upload", upload.single("image"), uploadImage);
    
    // Define a route to update an existing post (PUT request to '/upload/:id')
    app.put("/upload/:id", updateNewPost);
}

// Export the routes to be used in the server.js file
export default routes;
