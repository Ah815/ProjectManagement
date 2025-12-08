import dotenv from 'dotenv';
import express from 'express';
import app from './app.js';

dotenv.config();
const PORT = process.env.PORT

app.listen (PORT ,( ) => {
    console.log (`Server is running on port ${PORT}`);
})