import bcrypt, { hash } from "bcrypt";
import User from "../models/Users/users.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import multer from "multer";
import { generateAccessToken, generateRefreshToken } from "../utils/token.js";


export const handleGetProfileDetails = async (req, res) => {
    try {
        const userId = req.user.id;
        console.log(userId);
        const user = await User.findById(userId).select("-password -refreshToken");

        if (!user) {
            return res.status(401).json({
                message: "User not found",
                success: false
            })
        }

        res.status(200).json({
            message: "Profile details fetched successfully",
            user,
            success: true,
        })
    } catch (error) {
        console.log("error in get profile controller", error);
        res.status(500).json({
            message: "Internal Server Error!",
            success: false
        })
    }
}


export const handleUpdateProfileDetails = async (req, res) => {
    try {
        const authId = req.cookies?.accessToken;

        if (!authId) {
            return res.status(401).json({
                message: "Unauthorized access!",
                success: false
            })
        }

        const decoded = jwt.verify(authId, process.env.SECRETKEY);
        const userId = decoded.id;

        const { name, username, password, profileImage } = req.body;
        let updatedFields = {
            name,
            username,
            password,
            profileImage
        }

        if (password) {
            updatedFields.password = await User.findByIdAndUpdate(userId, updatedFields, {
                newUser: true
            })
        }


    } catch (error) {
        console.log("error in update profile controller", error);
        res.status(500).json({
            message: "Internal Server Error",
            success: false
        })
    }
}


export const handleDeleteUserProfile = async (req, res) => {
    try {
        const token = req.headers.authorization;

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const userId = decoded.id;

        const deletedUser = await user.findByIdAndDelete(userId);

        if (!deletedUser) {
            return res.status(401).json({
                message: "User not found",
                status: false
            })
        }

        return res.status(200).json({
            message: "Deleted the user successfully",
            success: true
        })

    } catch (error) {
        console.log("error in deleting the data", error);
        res.status(500).json({
            message: 'Internal servr error',
            success: false
        })
    }
}