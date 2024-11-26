import Twilio from 'twilio';
import dotenv from 'dotenv';
dotenv.config();

// Initialize the Twilio client with SID and Auth Token from environment variables
export const twilioClient = new Twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);
