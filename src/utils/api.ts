import axios from 'axios';
import { CREATOR_INFO } from '../constants/creator';

const API_KEY = 'AIzaSyAqNmL0VHUmOdTuanVAlnwY_wV_BNeUUTo';
const API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent';

export async function generateResponse(prompt: string): Promise<string> {
  try {
    // Check if the message is asking about the creator
    const creatorKeywords = ['who created you', 'who made you', 'who is your creator', 'tell me about your creator', 'who developed you'];
    const isAskingAboutCreator = creatorKeywords.some(keyword => 
      prompt.toLowerCase().includes(keyword)
    );

    if (isAskingAboutCreator) {
      return `I was created by ${CREATOR_INFO.name}. ${CREATOR_INFO.description}`;
    }

    const response = await axios.post(
      `${API_URL}?key=${API_KEY}`,
      {
        contents: [{ parts: [{ text: prompt }] }]
      }
    );
    return response.data.candidates[0].content.parts[0].text;
  } catch (error) {
    console.error('Error generating response:', error);
    throw new Error('Failed to generate response');
  }
}