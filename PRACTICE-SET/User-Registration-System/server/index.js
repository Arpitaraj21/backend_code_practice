import express from 'express';
import dotenv from 'dotenv'
import connectDb from './connection.js';
import cors from 'cors';

dotenv.config();

const PORT = process.env.PORT;
const app = express();

app.use(cors({
    origin: 'http://localhost:3000',
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
}));


app.use(express.json());

connectDb();

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

