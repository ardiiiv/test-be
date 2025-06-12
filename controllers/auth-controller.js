import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Users from "../models/user.js";
import { generateAccessToken, generateRefreshToken } from "../utils/genereteToken.js";


export const register = async (req, res) => {

    try {
    const { email, username, password, } = req.body;
    
    if (!username || !password || !email ) {
        return res.status(400).json({ message: "All fields are required" });
    }

    const userExists = await Users.findOne({ username });
    if (userExists) {
        return res.status(400).json({ message: "User already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await Users.create({  
        email,
        username,
        password : hashedPassword,
    });

    const newUser = await user.save();

    res.status(201).json({ message: "User registered successfully", user: newUser });
    } catch (error) {
    res.status(500).json({ message: "Internal server error", error: error.message });
    }
};


export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await Users.findOne({ email });
        
        if (!user) {
            return res.status(401).json({ message: "User not found" });
        }
        
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: "Invalid password" });
        }

      

        
        const accessToken = generateAccessToken(user, user.email);
        const refreshToken = generateRefreshToken(user);

        user.refreshToken = refreshToken;
        await user.save();

        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            secure: true,
            sameSite: "none",
            maxAge: 24 * 60 * 60 * 1000
        });
        
        res.status(200).json({
            message: "Login successful",
            accessToken,
            refreshToken,
            user: { email: user.email }
        });
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
};