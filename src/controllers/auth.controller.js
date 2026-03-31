import User from '../models/auth.model.js';
import jwt from 'jsonwebtoken';
import { OAuth2Client } from 'google-auth-library';

const googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

// Helper to generate token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET || 'fallback_secret', {
    expiresIn: '30d',
  });
};

// Helper: Create token and send cookie
const sendTokenResponse = (user, statusCode, res) => {
  const token = generateToken(user._id);
  const options = {
    expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days
    httpOnly: true, // Secure against XSS
    secure: process.env.NODE_ENV !== 'development', // HTTPS in prod
    sameSite: 'lax', 
  };
  
  res.status(statusCode).cookie('jwt', token, options).json({
    success: true,
    data: {
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      avatar: user.avatar,
      token, // Kept temporarily for backward compatibility if needed during transition
    }
  });
};

// @desc    Register a new user
// @route   POST /api/auth/register
// @access  Public
export const register = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ success: false, message: 'User already exists' });
    }

    const user = await User.create({
      name,
      email,
      password,
      role: role || 'user'
    });

    if (user) {
      sendTokenResponse(user, 201, res);
    } else {
      res.status(400).json({ success: false, message: 'Invalid user data' });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Auth user & get token
// @route   POST /api/auth/login
// @access  Public
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check for user
    const user = await User.findOne({ email }).select('+password');
    if (!user) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }

    // If user signed up with Google and has no password
    if (!user.password) {
      return res.status(401).json({ 
        success: false, 
        message: 'This account uses Google Sign-In. Please login with Google.' 
      });
    }

    // Check if password matches
    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }

    sendTokenResponse(user, 200, res);
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Google Auth (Login or Signup)
// @route   POST /api/auth/google
// @access  Public
export const googleAuth = async (req, res) => {
  try {
    const { idToken } = req.body;

    if (!idToken) {
      return res.status(400).json({ success: false, message: 'Google ID token is required' });
    }

    // Verify the Google ID token
    const ticket = await googleClient.verifyIdToken({
      idToken,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();
    const { sub: googleId, email, name, picture } = payload;

    if (!email) {
      return res.status(400).json({ success: false, message: 'Unable to get email from Google account' });
    }

    // Check if user already exists by googleId or email
    let user = await User.findOne({ $or: [{ googleId }, { email }] });

    if (user) {
      // If existing user found by email but doesn't have googleId, link the accounts
      if (!user.googleId) {
        user.googleId = googleId;
        if (picture && !user.avatar) user.avatar = picture;
        await user.save();
      }
    } else {
      // Create new user (no password needed for Google auth)
      user = await User.create({
        name: name || email.split('@')[0],
        email,
        googleId,
        avatar: picture,
        role: 'user',
      });
    }

    sendTokenResponse(user, 200, res);
  } catch (error) {
    console.error('Google Auth Error:', error);
    res.status(500).json({ success: false, message: 'Google authentication failed' });
  }
};

// @desc    Get current logged in user
// @route   GET /api/auth/me
// @access  Private
export const getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }
    res.status(200).json({
      success: true,
      data: user
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Log user out / clear cookie
// @route   POST /api/auth/logout
// @access  Private
export const logout = async (req, res) => {
  res.cookie('jwt', 'none', {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true,
  });
  res.status(200).json({ success: true, message: 'User logged out' });
};

