import express from "express";
import dotenv from "dotenv";
import connectDb from "./connection.js";
import cors from "cors";
import userRouter from "./routes/authenticationRoute.js";
dotenv.config();

const PORT = process.env.PORT;
const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  }),
);

app.use(express.json());
app.use(express.urlencoded({ extended: true })); // 👈 also add this

connectDb();
app.use("/api", userRouter);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
