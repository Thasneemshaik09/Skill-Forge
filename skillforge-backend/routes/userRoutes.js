const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { protect } = require('../middleware/authMiddleware'); // ✅ Fixed import

// ✅ Get current user
router.get('/me', protect, async (req, res) => {
  res.json(req.user);
});

// ✅ Enroll in a track
router.post('/enroll', protect, async (req, res) => {
  try {
    const { title } = req.body;
    const user = req.user;

    const alreadyEnrolled = user.enrolledTracks.find(t => t.title === title);
    if (alreadyEnrolled) {
      return res.status(400).json({ message: 'Already enrolled' });
    }

    user.enrolledTracks.push({ title, progress: 0, completed: false });
    await user.save();

    res.json({ enrolledTracks: user.enrolledTracks });
  } catch (err) {
    console.error("❌ Enrollment Error:", err.message);
    res.status(500).json({ message: 'Enrollment failed' });
  }
});

// ✅ Toggle completion status of a track
router.post('/toggle-completion', protect, async (req, res) => {
  try {
    const user = req.user;
    const { title } = req.body;

    const track = user.enrolledTracks.find(t => t.title === title);
    if (!track) return res.status(404).json({ message: 'Track not found' });

    track.completed = !track.completed;
    await user.save();

    res.json({ updatedTrack: track });
  } catch (err) {
    console.error("❌ Toggle Completion Error:", err.message);
    res.status(500).json({ message: 'Error toggling completion' });
  }
});

module.exports = router;
