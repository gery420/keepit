import jwt from 'jsonwebtoken';
import { promisify } from 'util';
import User from '../models/user.js';

const Auth = async(req, resizeBy, next) => {
    try{
        let authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({ message: 'Unauthorized' });
        }
        const token = authHeader.split(' ')[1];
        console.log("Token received:", token);
        
        if (!token){
            throw new Error("No token provided");
        }

        const decoder = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
        console.log("Decoded token:", decoder.id);
        let user = await User.findById(decoder.id);
        if (!user) {
            throw new Error("User not found");
        }
        req.user = user;
        next();
    } catch (error) {
        console.error("Authentication error:", error);
        res.status(401).json({ message: 'Unauthorized' });
    }
}
export default Auth;