
// Import the GoogleGenerativeAI module from the @google/generative-ai package
import { GoogleGenerativeAI } from "@google/generative-ai";

// Initialize the Google Generative AI client using the API key from environment variables
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
// Set the model to be used for content generation (Gemini model version 1.5)
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

// Export an asynchronous function that generates a description for an image using Gemini
export default async function generateDescriptionWithGemini(imageBuffer) {
  // The prompt given to the model to generate the description
  const prompt =
    "Generate a short description, up to 50 characters, for the following image.";
  
  try {
    // Prepare the image data for input by converting the buffer to base64 and specifying its mime type
    const image = {
      inlineData: {
        data: imageBuffer.toString("base64"), // Convert image buffer to base64 encoded string
        mimeType: "image/png", // Specify the image MIME type (PNG format)
      },
    };

    // Call the Gemini model to generate the content (description) based on the prompt and image data
    const res = await model.generateContent([prompt, image]);

    // Return the generated description, or a fallback message if it's not available
    return res.response.text() || "description-text not available.";
  } catch (error) {
    // Log any errors that occur during the API call
    console.error("Error retrieving description-text:", error.message, error);
    // Throw a new error with a custom message for the caller
    throw new Error("Error retrieving Gemini's description-text.");
  }
};
