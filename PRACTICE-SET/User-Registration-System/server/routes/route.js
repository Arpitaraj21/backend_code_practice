import express from "express";

const router = express.Router();

router.post("/authentication", handleSignup);

module.exports = { router };
