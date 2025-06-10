const jwt = require('jsonwebtoken');
const { User } = require('../models');

const auth = async (req, res, next) => {
  try {
    console.log('Auth middleware - Headers:', req.headers);
    
    const authHeader = req.header('Authorization');
    console.log('Auth header:', authHeader);
    
    if (!authHeader) {
      console.log('No authorization header found');
      return res.status(401).json({ 
        error: 'Access denied. No authorization header provided.',
        debug: 'Missing Authorization header'
      });
    }

    const token = authHeader.replace('Bearer ', '');
    console.log('Extracted token:', token ? 'Token exists' : 'No token');
    
    if (!token) {
      console.log('No token found after Bearer extraction');
      return res.status(401).json({ 
        error: 'Access denied. No token provided.',
        debug: 'Authorization header missing token'
      });
    }

    console.log('JWT_SECRET exists:', !!process.env.JWT_SECRET);
    
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log('Token decoded successfully:', decoded);
    
    const user = await User.findByPk(decoded.id);
    console.log('User found:', user ? `User ID: ${user.id}` : 'No user found');
    
    if (!user) {
      console.log('User not found in database');
      return res.status(401).json({ 
        error: 'Invalid token. User not found.',
        debug: 'User ID from token not found in database'
      });
    }

    req.user = user;
    console.log('Auth middleware passed, user attached:', user.id);
    next();
  } catch (error) {
    console.error('Auth middleware error:', error.message);
    
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ 
        error: 'Token expired.',
        debug: 'JWT token has expired'
      });
    }
    
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({ 
        error: 'Invalid token.',
        debug: `JWT error: ${error.message}`
      });
    }
    
    res.status(500).json({ 
      error: 'Authentication error.',
      debug: error.message
    });
  }
};

module.exports = auth;