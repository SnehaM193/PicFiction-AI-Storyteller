// src/utils/geminiApi.js

import { GoogleGenAI } from "@google/genai";

// Initialize the GoogleGenAI client with the environment variable
const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

if (apiKey) {
  console.log("Gemini API Key Loaded (starts with):", apiKey.substring(0, 4) + '...');
} else {
console.error(
"VITE_GEMINI_API_KEY is not set. Stories will use sample text."
);
}

const ai = apiKey ? new GoogleGenAI({ apiKey }) : null;
const model = "gemini-2.5-flash";

/**
 * Reads a browser File object and converts it to a raw Base64 string.
 * This is necessary for sending the image data to the Gemini API.
 * @param {File} file - The image file from the browser's input.
 * @returns {Promise<string>} A Promise that resolves with the Base64 data (without the data URL prefix).
 */
function fileToBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const base64Part = reader.result ? reader.result.split(',')[1] : '';
      resolve(base64Part); 
    };
    reader.onerror = (error) => reject(error);
    reader.readAsDataURL(file);
  });
}

/**
 * Converts a File object OR a Sample object into a Part object required by the Gemini API.
 * * **FIXED LOGIC:** Checks if the input is a Sample object and returns a text part,
 * preventing the 'readAsDataURL' error.
 * * @param {File | object} input - The uploaded image file or a sample object ({src, alt}).
 * @returns {Promise<object>} A Part object for the Gemini API.
 */
async function fileToGenerativePart(input) {
  if (!input) {
    throw new Error("Cannot convert null or undefined input to GenerativePart.");
  }
  
  // 1. Check for Sample Object (Simple JS object with 'alt' property, but NOT a File)
  // This prevents the FileReader error when selecting a sample image.
  if (!(input instanceof File) && input.alt) {
      console.log("Processing sample image as text description.");
      return { text: `The art piece is a sample image with the visual description: ${input.alt}. Use this as the primary subject for the story.` };
  }

  // 2. Process Actual File Upload (must be a File object)
  if (input instanceof File) {
      const base64Data = await fileToBase64(input);
      
      const mimeType = input.type || 
                       (input.name.endsWith('.png') ? 'image/png' : 
                       input.name.endsWith('.gif') ? 'image/gif' : 
                       'application/octet-stream');
      
      return {
        inlineData: {
          data: base64Data,
          mimeType: mimeType, 
        },
      };
  }
  
  // Throw if input is invalid (not File, not Sample)
  throw new Error("Input is neither a File nor a recognized Sample object.");
}

/**
 * Generates a story based on an image, genre, and length.
 * @param {File | object} imageInput - The uploaded image file or a sample object.
 * @param {string} genre - The selected story genre (e.g., 'Fantasy', 'Mystery').
 * @param {string} lengthWords - The target story length in words (e.g., '100 words').
 * @returns {Promise<string>} The generated story text.
 */
export async function generateStory(imageInput, genre, lengthWords) {
  if (!ai) {
    // Return a sample story if API Key is missing
    return `
      ⚠️ Setup Required: Please set your VITE_GEMINI_API_KEY.

      In a land filled with **${genre}** wonders, a traveler gazed upon the art in your image.
      The air hummed with magic, hinting at a quest for an ancient relic that would be just **${lengthWords}** long.
      This is a sample story to show the app's functionality.
    `;
  }

  try {
    // Convert input (File or Sample object) to the correct Generative Part
    const imagePart = await fileToGenerativePart(imageInput); 
    
    // Determine word count number for prompt consistency
    const wordCount = lengthWords.split(' ')[0];

    // High-quality, robust prompt for better stories
    const prompt = `
        You are a master storyteller and art historian.
        
        **Task:** Analyze the provided visual/subject matter to uncover its hidden lore. Do not describe the image visually. Instead, write a captivating narrative that serves as the unique, imaginative backstory or prequel to the moment captured in the art.
        
        **Requirements:**
        1. **Genre:** Strictly adhere to the **${genre}** genre.
        2. **Length:** The story must be approximately **${wordCount}** words.
        3. **Style:** Write in the **voice of a seasoned, evocative novelist**, using rich descriptive language, strong verbs, and a clear, compelling narrative structure with a distinct beginning, middle, and end.
        4. **Mood:** The story should evoke a strong sense of ${genre === 'Horror' ? 'dread and suspense' : genre === 'Mystery' ? 'intrigue and tension' : genre === 'Scifi' ? 'wonder and technological isolation' : 'epic wonder and deep history'}.
        5. **Format:** Output only the story text.
    `;

    const response = await ai.models.generateContent({
      model: model,
      contents: [
        imagePart, 
        { text: prompt }
      ],
    });

    return response.text.trim();
  } catch (error) {
    console.error("Gemini API Error:", error);
    // Return a more user-friendly error in the UI
    const errorString = error.message || String(error);
    return `An error occurred while generating the story: ${errorString.substring(0, 150)}... (See console for details)`;
  }
}