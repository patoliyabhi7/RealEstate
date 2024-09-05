import User from '../models/userModel.js';
import bcrypt from 'bcryptjs';
import {errorHandler} from '../utils/error.js';

export const signup = async (req, res, next) => {
    try {
        const { username, email, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({
            username,
            email,
            password: hashedPassword
        });
        res.status(201).json({ user, message: 'User created successfully' });
    } catch (error) {
        next(errorHandler(500, error.message));
    }
};