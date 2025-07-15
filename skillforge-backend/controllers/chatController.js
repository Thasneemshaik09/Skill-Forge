const User = require('../models/User');
const axios = require('axios');
const jwt = require('jsonwebtoken');

exports.chatWithGemini = async (req, res) => {
  const { message } = req.body;
  const token = req.headers.authorization?.split(' ')[1];
  console.log("Received request. API Key:", process.env.GEMINI_API_KEY);


  try {
    if (!token) return res.status(401).json({ reply: 'Unauthorized' });
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);

    const context = `User ${user.name} is enrolled in: ${user.enrolledTracks.map(t => `${t.title} (Progress: ${t.progress}%)`).join(', ')}.`;

    const fullPrompt = `${context}\n\nUser asked: "${message}"\n\nReply with guidance based on their learning path.`;

    const response = await axios.post(
      'https://generativelanguage.googleapis.com/v1/models/gemini-2.5-flash:generateContent',
      {
        contents: [{ parts: [{ text: fullPrompt }] }],
      },
      {
        headers: { 'Content-Type': 'application/json' },
        params: { key: process.env.GEMINI_API_KEY },
      }
    );

    const reply = response.data.candidates?.[0]?.content?.parts?.[0]?.text || 'No reply';
    res.json({ reply });
  } catch (err) {
    console.error('Gemini Chat Error:', err.response?.data || err.message);
    res.status(500).json({ reply: 'Gemini chat error occurred. Please try again.' });
  }
};
