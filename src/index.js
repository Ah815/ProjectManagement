import dotenv from 'dotenv';
import express from 'express';

dotenv.config();
const app = express();
const PORT = process.env.PORT


app.get ('/', (req, res) => {
    res.send('Hello, World!');
});
app.listen (PORT ,( ) => {
    console.log (`Server is running on port ${PORT}`);
})