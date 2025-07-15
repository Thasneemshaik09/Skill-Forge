const User = require('../models/User');
const axios = require('axios');
const jwt = require('jsonwebtoken');

const allTracks = [
  "DSA Mastery",
  "Full Stack Web Dev",
  "AI & ML Essentials",
  "System Design",
  "Cloud Computing Basics",
  "DevOps Fundamentals",
  "Cybersecurity Essentials",
  "JavaScript Mastery",
  "Python for Everyone",
  "React Deep Dive",
  "Node.js Essentials",
  "Databases & SQL",
  "Data Science with Python",
  "Natural Language Processing",
  "Docker & Kubernetes",
  "Blockchain Basics",
  "Operating Systems",
  "Computer Networks",
  "Design Thinking",
  "Agile & Scrum"
];

// Optional helper to extract JSON titles from messy Gemini replies
const extractTitles = (text) => {
  try {
    return JSON.parse(text);
  } catch {
    const matches = text.match(/"([^"]+)"/g);
    return matches ? matches.map(t => t.replace(/"/g, '').trim()) : [];
  }
};

exports.getRecommendations = async (req, res) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({ message: 'Unauthorized' });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id).populate('enrolledTracks');

    const enrolled = user.enrolledTracks.map(t => t.title);
    const available = allTracks.filter(t => !enrolled.includes(t));

    if (available.length === 0) {
      return res.json({ recommended: [] });
    }

    const prompt = `
User is currently enrolled in: ${enrolled.join(', ')}.
From the following available tracks: ${available.join(', ')},
recommend 1-2 other learning tracks that would best complement their current learning.

Reply ONLY with a JSON array like: ["System Design", "AI & ML Essentials"]
`;

    const geminiRes = await axios.post(
      'https://generativelanguage.googleapis.com/v1/models/gemini-2.5-flash:generateContent',
      {
        contents: [{ parts: [{ text: prompt }] }],
      },
      {
        headers: { 'Content-Type': 'application/json' },
        params: { key: process.env.GEMINI_API_KEY },
      }
    );

    const replyText = geminiRes.data.candidates?.[0]?.content?.parts?.[0]?.text || '[]';

    // Logging for debug
    console.log("🔍 Gemini response raw:", geminiRes.data);
    console.log("🧠 Gemini raw reply:", replyText);

    const recommended = extractTitles(replyText);
    console.log("🎯 Extracted Titles:", recommended);

    res.json({ recommended });
  } catch (err) {
    console.error('❌ Recommendation Error:', err.message);
    res.status(500).json({ message: 'Failed to get recommendations' });
  }
};
