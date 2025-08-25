import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken';
import User from '../models/user.js';
import { promisify } from 'util';

export const TestController = {
    getTest: (req, res) => {
        res.json({ message: "Auth successful, Now start the google drive project!!!" });
    }
};

const isPwdMatch = async (password, hashedPassword) => {
    return await bcrypt.compare(password, hashedPassword);
}

const createAccessToken = async(user_id, user_email) => {
    return promisify(jwt.sign)({ id: user_id, email: user_email }, process.env.JWT_SECRET, { expiresIn: "1h" });
}

const createRrefreshToken = async(user_id, user_email) => {
    return promisify(jwt.sign)({ id: user_id, email: user_email }, process.env.JWT_SECRET, { expiresIn: "7d" });
}
export const Login = {
    loginUser: async (req, res) => {

        const { username, password } = req.body;

        const user = await User.findOne({ username });
        console.log(user);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const accessToken = await createAccessToken(user._id, user.email);
        const refreshToken = await createRrefreshToken(user._id, user.email);

        const isMatch = await isPwdMatch(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        res.json({ message: "User logged in successfully", success: true, accessToken, refreshToken, user });
    }
}

export const Logout = {
    logoutUser: async (req, res) => {
        res.json({ message: "User logged out successfully", success: true });
    }
}
