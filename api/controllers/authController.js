import User from '../models/userModel.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { errorHandler } from '../utils/error.js';

export const signup = async (req, res, next) => {
    try {
        const { username, email, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({
            username,
            email,
            password: hashedPassword
        });
        res.status(201).json('User created successfully!');
    } catch (error) {
        next(errorHandler(500, error.message));
    }
};

export const signin = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email })
        if (!user) {
            return next(errorHandler(404, 'User not found!'));
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return next(errorHandler(401, 'Invalid credentials!'));
        }
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        const { password: userPassword, ...rest } = user._doc;
        res.cookie('access_token', token, { httpOnly: true });
        res.status(200).json({
            message: 'User signed in successfully!',
            result: rest
        });
    }
    catch (error) {
        next(errorHandler(500, error.message));
    }
}