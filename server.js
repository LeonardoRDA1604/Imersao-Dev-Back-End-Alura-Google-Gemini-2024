
// Import the express library to handle routing and server creation
import express from "express";
// Import custom routes from the 'postsRoutes.js' file
import routes from "./src/routes/postsRoutes.js";

// Create an instance of the Express application
const app = express();

// Set up a static folder 'uploads' to serve files directly (e.g., images, documents)
app.use(express.static("uploads"));

// Define the port the server will listen on
const port = 3000;

// Use the routes defined in 'postsRoutes.js' for handling requests
routes(app);

// Start the server and listen for incoming requests on the specified port
app.listen(3000, () => {
    // Log a message once the server is up and running
    console.log(`Server is running on port ${port}.`);
});

// Below commented-out code is for handling a GET request to fetch a post by its ID, if needed
// function getElementbyId(id) {
//     // Find the index of a post based on its ID
//     return posts.findIndex((post) =>{
//         return post.id === Number(id)
//     });
// };

// // Define a GET endpoint that fetches a post by its ID from the URL parameter
// app.get ("/posts/:id", (req, res) => {
//     const index = getElementbyId(req.params.id)
//     // Send the found post as a JSON response with a 200 status code
//     res.status(200).json(posts[index]);
// });
