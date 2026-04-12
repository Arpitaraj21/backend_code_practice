import express from 'express';
import dotenv from 'dotenv'
import connectDb from './connection.js';
dotenv.config();

const app = express();
const PORT = process.env.PORT;

connectDb();

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

