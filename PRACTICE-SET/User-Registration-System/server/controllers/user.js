import express from "express";
import bcrypt, { hash } from "bcrypt";
import { User } from "../models/Users";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";

dotenv.config();

const handleSignup = async (req, res) => {
  const { name, email, password, role, profileImage } = req.body;

  const secretKey = process.env.SECRETKEY;

  try {
    const isEixisting = await User.findOne({ email });

    if (isEixisting) {
      return res.status(409).json({
        message: "User already exists!",
      });
    }

    const hashPassword = await bcrypt.hash(password, 12);

    const token = await jwt.sign({
      name,
      role,
      secretKey,
    });

    const newUser = await User.createOne({
      name,
      email,
      password: hashPassword,
      role,
      profileImage,
    });

    return res.status(201).json(
      {
        message: "User created successfully!",
        user: newUser,
        token,
      },
      { expiresIn: "1h" },
    );
  } catch (error) {
    console.log("signup error", error);
    return res.json({
      status: 500,
      message: "Internal Server Error!",
    });
  }
};

export default handleSignup;
