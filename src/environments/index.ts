import * as dotenv from 'dotenv';
dotenv.config();

// environment
const DOMAIN: string = process.env.DOMAIN || 'localhost';
const PORT: number = +process.env.PORT || 3002;
const NODE_ENV: string = process.env.NODE_ENV || 'development';

// postgresql
const DATABASE_URL: string =
  process.env.DATABASE_URL ||
  'postgresql://user:1234@localhost:5432/mydb?schema=public&connection_limit=1';

// jsonwebtoken
const ACCESS_TOKEN_SECRET: string =
  process.env.ACCESS_TOKEN_SECRET || 'AIzaSyBEk5jiw1uPLwYtFs3VB0XIBLl4kJvJGrs';
const REFRESH_TOKEN_SECRET: string =
  process.env.REFRESH_TOKEN_SECRET || 'vJGrsAIzaSyBE3VB0XIBLl4kJk5jiw1uPLwYtFs';

export { DOMAIN, PORT, NODE_ENV, DATABASE_URL, ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET };
