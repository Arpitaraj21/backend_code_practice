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

    const token = await jwt.sign({ name, role }, secretKey, {
      expiresIn: "1hr",
    });

    const newUser = await User.createOne({
      name,
      email,
      password: hashPassword,
      role,
      profileImage,
    });

    return res.status(201).json({
      message: "User created successfully!",
      user: newUser,
      token,
      sucess: true,
    });
  } catch (error) {
    console.log("signup error", error);
    return res.json({
      status: 500,
      message: "Internal Server Error!",
      sucess: false,
    });
  }
};

const handleLogin = async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      return res.status(401).json({
        message: "Email and Password is required!",
        success: false,
      });
    }

    const isUserExisting = await User.findOne({ email });

    if (!isUserExisting) {
      return res.status(400).json({
        message: "No user available",
        sucess: false,
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

    const token = jwt.sign({ id: user._id, role: user.role }, secretKey, {
      expiresIn: "1hr",
    });

    return res.status(200).json({
      message: "Login successful",
      token,
      success: true,
    });
  } catch (error) {
    console.log("error in login ", error);
    return res.status(500).json({
      message: "Internal Server Error!",
      sucess: false,
    });
  }
};
export default { handleSignup, handleLogin };
