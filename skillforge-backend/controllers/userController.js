// controllers/userController.js

const User = require('../models/User');
const jwt = require('jsonwebtoken');

exports.getMe = async (req, res) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({ message: 'Unauthorized' });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);

    res.json(user);
  } catch (err) {
    console.error('GetMe Error:', err.message);
    res.status(500).json({ message: 'Failed to fetch user data' });
  }
};

exports.markTrackCompleted = async (req, res) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({ message: 'Unauthorized' });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);

    const { title } = req.body;
    if (!title) return res.status(400).json({ message: 'Track title required' });

    if (!user.completedTracks.includes(title)) {
      user.completedTracks.push(title);
    }

    await user.save();
    res.json({ message: 'Track marked as completed', completedTracks: user.completedTracks });
  } catch (err) {
    console.error('Mark Complete Error:', err.message);
    res.status(500).json({ message: 'Failed to mark track as complete' });
  }
};
