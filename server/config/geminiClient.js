import { GoogleGenerativeAI } from '@google/generative-ai';
import dotenv from 'dotenv';

dotenv.config();

const apiKey = process.env.GEMINI_API_KEY;

if (!apiKey) {
  console.warn('⚠️ WARNING: GEMINI_API_KEY is not set in server/.env file!');
}

// Initialize official Google Generative AI Client
export const genAI = new GoogleGenerativeAI(apiKey || 'DUMMY_KEY');

// Default Model Name
export const GEMINI_MODEL = 'gemini-1.5-flash';
