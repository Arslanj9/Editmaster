const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const passport = require('passport');
const nodemailer = require('nodemailer');
require('dotenv').config();

const router = express.Router();




// Register a new user
router.post('/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
    });

    // Save the user to the database
    await newUser.save();

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});




// Login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ userId: user._id, role: user.role }, 'your-secret-key', {
      expiresIn: '1h', 
    });

    res.json({ token, userId: user._id, role: user.role });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});




// Get User Data route
router.get('/userData/:userId', async (req, res) => {
  try {
    // Extract the user ID from the request parameters
    const userId = req.params.userId;

    // Get user data from the database using the user ID
    const user = await User.findById(userId).select('name email');

    // Check if user exists
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Send user data to the client
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});




// Change Name and Email - route
router.post('/updateProfile', async (req, res) => {
  const { newName, newEmail } = req.body;
  
  try {
    const token = req.headers.authorization.split(" ")[1]; // Extract token from Authorization header
    const decodedToken = jwt.verify(token, "your-secret-key"); // Replace "your_secret_key" with your actual secret key
    const userId = decodedToken.userId; // Extract userId from decoded token

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    if (newName) {
      user.name = newName;
    }

    if (newEmail) {
      user.email = newEmail;
    }

    await user.save();

    res.status(200).json({ message: 'Profile updated successfully', user });
  } catch (error) {
    console.error('Error updating profile:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});





// Forgot Password - Generate and send reset token via email
router.post('/forgot-password', async (req, res) => {
  try {
    const { email } = req.body;

    // Find the user in the database
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Generate reset token
    const resetToken = jwt.sign({ userId: user._id }, 'your-reset-secret-key', {
      expiresIn: '1h', // Token expiration time
    });

    // Construct the reset link with the token
    const resetLink = `http://localhost:5173/reset-password/${resetToken}`;

    // Send reset link via email
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_EMAIL,
        pass: process.env.GMAIL_APP_PASSWORD,
      },
    });

    const mailOptions = {
      from: 'your-email@gmail.com',
      to: email,
      subject: 'Password Reset',
      text: `Click the following link to reset your password: ${resetLink}`,
    };

    await transporter.sendMail(mailOptions);

    res.json({ message: 'Password reset link sent to your email' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});




// Reset Password
router.post('/reset-password/:token', async (req, res) => {
  try {
    const {token} = req.params
    const { newPassword } = req.body;

    // Verify reset token
    const decodedToken = jwt.verify(token, 'your-reset-secret-key');
    const userId = decodedToken.userId;

    // Find the user in the database
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Hash the new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update the user's password
    user.password = hashedPassword;
    await user.save();

    res.json({ message: 'Password reset successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});





// Initialize passport
router.use(passport.initialize());

// Passport Facebook Strategy
// You need to set up Facebook Developer App and obtain App ID and App Secret
const FacebookStrategy = require('passport-facebook').Strategy;
passport.use(new FacebookStrategy({
  clientID: process.env.FACEBOOK_CLIENTID,
  clientSecret: process.env.FACEBOOK_CLIENTSECRET,
  callbackURL: 'http://localhost:3000/api/auth/facebook/callback',
}, async (accessToken, refreshToken, profile, done) => {
  // Find or create a user based on the Facebook profile
  const user = await User.findOne({ email: profile.emails[0].value });
  if (user) {
    return done(null, user);
  } else {
    // Create a new user with Facebook profile data
    const newUser = new User({
      name: profile.displayName,
      email: profile.emails[0].value,
      password: '', // Social login doesn't require a password
    });

    await newUser.save();
    return done(null, newUser);
  }
}));

// Facebook authentication route
router.get('/facebook', passport.authenticate('facebook', { scope: ['email'] }));

// Facebook authentication callback route
router.get('/facebook/callback',
  passport.authenticate('facebook', { failureRedirect: '/' }),
  (req, res) => {
    // Redirect to the frontend URL after successful login
    res.redirect('http://localhost:3000/dashboard');
  }
);




// Passport Google Strategy
// You need to set up Google Developer Console and obtain Client ID and Client Secret
const GoogleStrategy = require('passport-google-oauth20').Strategy;
passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENTID,
  clientSecret: process.env.GOOGLE_CLIENTSECRET,
  callbackURL: 'http://localhost:5000/api/auth/google/callback',
}, async (accessToken, refreshToken, profile, done) => {
  // Find or create a user based on the Google profile
  const user = await User.findOne({ email: profile.emails[0].value });
  if (user) {
    return done(null, user);
  } else {
    // Create a new user with Google profile data
    const newUser = new User({
      name: profile.displayName,
      email: profile.emails[0].value,
      password: '', // Social login doesn't require a password
    });

    await newUser.save();
    return done(null, newUser);
  }
}));

// Google authentication route
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

// Google authentication callback route
router.get('/google/callback',
  passport.authenticate('google', { failureRedirect: '/' }),
  (req, res) => {
    // Redirect to the frontend URL after successful login
    res.redirect('http://localhost:3000/dashboard');
  }
);

module.exports = router;
