import bcrypt, { hash } from "bcrypt";
import User from "../models/Users/users.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import multer from "multer";
import { generateAccessToken, generateRefreshToken } from "../utils/token.js";

dotenv.config();

// Sign up
export const handleSignup = async (req, res) => {
  const { name, username, email, password, role, profileImage } = req.body;

  const secretKey = process.env.SECRETKEY;

  try {
    const isEixistingUser = await User.findOne({ email });

    if (isEixistingUser) {
      return res.status(409).json({
        message: "User already exists!",
      });
    }

    const hashPassword = await bcrypt.hash(password, 12);

    const newUser = await User.create({
      name,
      username,
      email,
      password: hashPassword,
      role,
      profileImage,
    });

    const accessToken = jwt.sign(
      { id: newUser._id, role: newUser.role },
      secretKey,
      { expiresIn: "15m" },
    );

    const refreshToken = jwt.sign({ id: newUser._id }, secretKey, {
      expiresIn: "7d",
    });

    newUser.refreshToken = refreshToken;
    await newUser.save();

    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      maxAge: 15 * 60 * 1000,
      sameSite: "lax",
    });

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60 * 1000,
      sameSite: "lax",
    });

    return res.status(201).json({
      message: "User created successfully!",
      user: newUser,
      accessToken,
      success: true,
    });
  } catch (error) {
    console.log("signup error", error);
    return res.json({
      status: 500,
      message: "Internal Server Error!",
      success: false,
    });
  }
};

// login
export const handleLogin = async (req, res) => {
  const { identifier, password } = req.body;

  console.log("req body", req.body);
  try {
    if (!identifier || !password) {
      return res.status(401).json({
        message: "Email/username and Password is required!",
        success: false,
      });
    }

    const isUserExisting = await User.findOne({
      $or: [{ email: identifier.toLowerCase() }, { username: identifier }],
    });

    if (!isUserExisting) {
      return res.status(400).json({
        message: "No user available",
        success: false,
      });
    }

    const isPasswordMatch = await bcrypt.compare(
      password,
      isUserExisting.password,
    );

    if (!isPasswordMatch) {
      return res.status(400).json({
        message: "Invalid credentials",
        success: false,
      });
    }

    const accessToken = generateAccessToken(isUserExisting);
    const refreshToken = generateRefreshToken(isUserExisting);

    isUserExisting.refreshToken = refreshToken;
    await isUserExisting.save();

    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      maxAge: 15 * 60 * 1000,
      sameSite: "lax",
    });
    
    
    return res.status(200).json({
      message: "Login successful",
      success: true,
    });
    
  } catch (error) {
    console.log("error in login ", error);
    return res.status(500).json({
      message: "Internal Server Error!",
      success: false,
    });
  }
};



// get profile details
export const handleGetProfileDetails = async (req, res) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        message: "Unauthorized",
        success: false,
      });
    }

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.SECRETKEY);
    const userId = decoded.id;

    // return all fields except password and refreshToken
    const user = await User.findById(userId).select("-password -refreshToken");

    if (!user) {
      return res.status(404).json({
        message: "User not found!",
        success: false,
      });
    }

    return res.status(200).json({
      message: "User data",
      success: true,
      user,
    });
  } catch (error) {
    console.log("error in fetching the profile details", error);
    return res.status(500).json({
      message: "Internal server error!",
      success: false,
    });
  }
};
