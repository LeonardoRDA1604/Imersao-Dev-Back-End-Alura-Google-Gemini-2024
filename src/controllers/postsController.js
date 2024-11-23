
// Import the necessary functions from the models and services
import { getAllPosts, createPost, updatePost } from "../models/postsModels.js";
import fs from "fs"; // Import the file system module for file operations
import generateDescriptionWithGemini from "../services/geminiService.js"; // Import the Gemini AI service for generating descriptions

// Controller function to handle showing all posts
export async function ShowAllPosts(req, res) {
    // Retrieve all posts from the database using the model function
    const posts = await getAllPosts();
    // Send the posts as a JSON response with status 200 (OK)
    res.status(200).json(posts);
}

// Controller function to handle creating a new post
export async function createNewPost(req, res) {
    // Extract the new post data from the request body
    const newPost = req.body;
    try {
        // Call the model function to insert the new post into the database
        const createdPost = await createPost(newPost);
        // Send the created post as a JSON response with status 200 (OK)
        res.status(200).json(createdPost);
    } catch (error) {
        // Log any errors that occur during the post creation process
        console.error(error.message);
        // Send a 500 Internal Server Error response with an error message
        res.status(500).json({ "Error": "Request failed" });
    }
}

// Controller function to handle image upload
export async function uploadImage(req, res) {
    // Define a new post object, which will be saved to the database
    const newPost = {
        name: "",
        species: "",
        breed: "",
        imgUrl: req.file.originalname, // Use the uploaded file's original name as the image URL
        description: "",
    };
    try {
        // Create the new post by calling the model's createPost function
        const createdPost = await createPost(newPost);
        // Generate the new image path with the post's inserted ID
        const updatedImage = `uploads/${createdPost.insertedId}.png`;
        // Rename the uploaded file to include the post's ID (saved in the 'uploads' folder)
        fs.renameSync(req.file.path, updatedImage);
        // Send the created post as a JSON response with status 200 (OK)
        res.status(200).json(createdPost);
    } catch (error) {
        // Log any errors during the image upload process
        console.error(error.message);
        // Send a 500 Internal Server Error response with an error message
        res.status(500).json({ "Error": "Request failed" });
    }
}

// Controller function to handle updating an existing post
export async function updateNewPost(req, res) {
    // Retrieve the post ID from the request parameters (URL)
    const id = req.params.id;
    // Construct the image URL to be used in the updated post
    const urlImage = `http://localhost:3000/${id}.png`;
    try {
        // Read the uploaded image file (stored in the 'uploads' directory)
        const imgBuffer = fs.readFileSync(`uploads/${id}.png`);
        // Generate a description for the image using the Gemini service
        const description = await generateDescriptionWithGemini(imgBuffer);
        // Define the updated post data
        const post = {
            name: req.body.name,
            species: req.body.species,
            breed: req.body.breed,
            imgUrl: urlImage,
            description: description, // Use the generated description
        };
        // Call the model function to update the post in the database
        const createdPost = await updatePost(id, post);
        // Send the updated post as a JSON response with status 200 (OK)
        res.status(200).json(createdPost);
    } catch (error) {
        // Log any errors during the post update process
        console.error(error.message);
        // Send a 500 Internal Server Error response with an error message
        res.status(500).json({ "Error": "Request failed" });
    }
}
