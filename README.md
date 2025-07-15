🚀 SkillForge

SkillForge is a modern learning platform that blends personalized learning, AI-powered recommendations, and progress tracking. Built using the MERN stack with Google Gemini 2.5 Flash integration, it enables users to explore curated learning tracks, track their progress, and receive smart suggestions tailored to their journey.

🛠️ Tech Stack

Frontend: React.js, CSS
Backend: Node.js, Express.js
Database: MongoDB (with Mongoose)
Authentication: JWT-based Auth
AI Integration: Google Gemini 2.5 Flash API

✨ Features

🧑‍💻 Authentication & User Management
JWT-based secure login and registration
authMiddleware to protect private routes
/users/me route to fetch current user info

🎓 Learning Tracks

~20 curated learning tracks like:
DSA Mastery
AI & ML Essentials
System Design
Cloud Computing, DevOps, Game Dev, etc.

Each track has:

Title, Description, Difficulty Level
Dynamic progress tracking & completion status

✅ Enroll in Tracks

Enroll in any learning track
Tracks saved in MongoDB under enrolledTracks

📈 Progress Tracking

View progress with module checkboxes & percentage bar
Toggle modules as completed
"Hide Completed" option in UI
Backend stores completion in enrolledTracks.modulesCompleted

🧠 AI-Powered Recommendations

Recommends tracks using Gemini 2.5 Flash
Context-aware suggestions based on:
Enrolled vs un-enrolled tracks
Gemini not called if all tracks are already enrolled

💬 Chat System (WIP)

AI chat UI integrated (for future learning assistant)
