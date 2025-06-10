import { Request, Response } from 'express';
import jwt, { SignOptions } from 'jsonwebtoken';
import { User, IUser } from '../../database/models/user.model';
import { config } from '../../core/config';
import { Types } from 'mongoose';
import path from 'path';

interface JwtPayload {
  id: string;
}

export class UserController {
  async register(req: Request, res: Response) {
    try {
      const { name, username, email, password, bio } = req.body;
      
      // Get photo path if uploaded
      const photo = req.file ? `/uploads/${req.file.filename}` : '';

      // Check if user already exists
      const existingUser = await User.findOne({ $or: [{ email }, { username }] });
      if (existingUser) {
        return res.status(400).json({ message: 'User already exists' });
      }

      // Create new user
      const user = new User({
        name,
        username,
        email,
        password,
        photo,
        bio,
      });

      await user.save();

      // Generate JWT token
      const payload: JwtPayload = { id: user._id.toString() };
      const options: SignOptions = { expiresIn: '24h' };
      const token = jwt.sign(payload, config.jwt.secret, options);

      res.status(201).json({
        message: 'User registered successfully',
        token,
        user: {
          id: user._id,
          name: user.name,
          username: user.username,
          email: user.email,
          photo: user.photo,
          bio: user.bio,
        },
      });
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }

  async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;

      // Find user by email
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }

      // Check password
      const isPasswordValid = await user.comparePassword(password);
      if (!isPasswordValid) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }

      // Generate JWT token
      const payload: JwtPayload = { id: user._id.toString() };
      const options: SignOptions = { expiresIn: '24h' };
      const token = jwt.sign(payload, config.jwt.secret, options);

      res.json({
        message: 'Login successful',
        token,
        user: {
          id: user._id,
          name: user.name,
          username: user.username,
          email: user.email,
          photo: user.photo,
          bio: user.bio,
        },
      });
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }

  async getProfile(req: Request, res: Response) {
    try {
      const user = await User.findById(req.user._id).select('-password');
      res.json(user);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }

  async getUsers(req: Request, res: Response) {
    res.json({ message: 'Get users' });
  }

  async createUser(req: Request, res: Response) {
    res.json({ message: 'Create user' });
  }
} 