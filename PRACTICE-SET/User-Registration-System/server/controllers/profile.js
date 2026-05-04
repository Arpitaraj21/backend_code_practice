import bcrypt, { hash } from "bcrypt";
import User from "../models/Users/users.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import multer from "multer";
import { generateAccessToken, generateRefreshToken } from "../utils/token.js";

dotenv.config();


// edit profile

export const handleProfileEdit = async (req, res) => {
    try {
        const token = req.cookies?.accessToken;

        if (!token) {
            return res.status(401).json({
                message: "Unauthorized",
                success: false,
            });
        }

        const decoded = jwt.verify(token, process.env.SECRETKEY);
        const userId = decoded.id;

        const { name, username, email, password, role, profileImage } = req.body;

        let updatedFields = {
            name,
            username,
            email,
            profileImage,
        };

        if (password) {
            updatedFields.password = await bcrypt.hash(password, 12);
        }

        const updatedUser = await User.findByIdAndUpdate(userId, updatedFields, {
            new: true,
        });

        if (!updatedUser) {
            return res.status(404).json({
                message: "User not found",
                status: false,
            });
        }
        return res.status(200).json({
            message: "Profile updated successfully",
            User: updatedUser,
            success: true,
        });
    } catch (error) {
        console.log("error in editing the profile", error);
        return res.status(200).json({
            message: "Internal server error!",
            success: false,
        });
    }
};


export const handleDeleteProfile = async (req, res) => {
    try {
        const token = req.cookies?.accessToken;

        if (!token) {
            return res.status(401).json({
                message: "Unauthorized",
                status: false
            });
        }

        const decoded = jwt.verify(token, process.env.SECRETKEY);
        const userId = decoded.id;

        const deletedUser = await User.findByIdAndDelete(userId);

        if (!deletedUser) {
            return res.status(404).json({
                message: 'User not found!',
                status: false,
            })
        }

        res.clearCookie('accessToken');
        res.clearCookie('refreshToken');

        return res.status(200).json({
            message: 'User successfully delete',
            success: false
        })

    } catch (error) {
        console.log("error in deleting the profile", error);
        return res.status(500).json({
            message: "Internal server error!",
            success: false
        })
    }
}


export const handleGetProfileDetails = async (req, res) => {
    try {

        const userId = req.user.id;
        console.log("userId", userId);
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
}