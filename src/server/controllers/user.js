import User from "../models/user.js";
import bcrypt from "bcrypt";

export const Register = {
    registerUser: async (req, res) => {

        const { username, email, password } = req.body;

        try {
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);
            const newUser = new User({ username, email, password: hashedPassword });
            await newUser.save();
            res.status(201).json({ message: "User registered successfully", success: true });
        } catch (error) {
            console.error("Error registering user:", error);
            res.status(500).json({ message: "Internal server error", success: false });
        }
    }
};


export const Profile = {
    getProfile: async (req, res) => {
        try {
            const user = await User.findById(req.user._id).select("-password");
            if (!user) {
                return res.status(404).json({ message: "User not found" });
            }
            res.json({ data: { newUser: user }, success: true });
        } catch (error) {
            console.error("Error fetching profile:", error);
            res.status(500).json({ message: "Internal server error", success: false });
        }
    }
}
