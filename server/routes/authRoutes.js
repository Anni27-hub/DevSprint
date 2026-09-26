import express from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

// Generate JWT Token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET || 'devsprint_jwt_secret_2026', {
    expiresIn: '30d'
  });
};

/**
 * @route   POST /api/auth/register
 * @desc    Register a new user
 */
router.post('/register', async (req, res) => {
  const { name, email, password } = req.body;

  try {
    if (!name || !email || !password) {
      return res.status(400).json({ error: 'Please enter all fields' });
    }

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ error: 'User with this email already exists' });
    }

    const user = await User.create({ name, email, password });

    return res.status(201).json({
      success: true,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        token: generateToken(user._id)
      }
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

/**
 * @route   POST /api/auth/login
 * @desc    Authenticate user & get token
 */
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      return res.status(400).json({ error: 'Please enter email and password' });
    }

    const user = await User.findOne({ email }).select('+password');

    if (user && (await user.matchPassword(password))) {
      return res.json({
        success: true,
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          token: generateToken(user._id)
        }
      });
    } else {
      return res.status(401).json({ error: 'Invalid email or password' });
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

/**
 * @route   GET /api/auth/me
 * @desc    Get current user profile
 */
router.get('/me', protect, async (req, res) => {
  if (!req.user) {
    return res.status(401).json({ error: 'Not authenticated' });
  }
  res.json({ success: true, user: req.user });
});

export default router;
