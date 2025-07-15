const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },

  enrolledTracks: [
    {
      title: String,
      progress: { type: Number, default: 0 },     // Total progress in %
      completed: { type: Boolean, default: false },
      modulesCompleted: [Number]                  // ✅ New: list of completed module indexes
    }
  ]
});

module.exports = mongoose.model('User', userSchema);
