import { useEffect, useState } from 'react';
import './Tracks.css';
import axios from '../api/axios';

const allTracks = [
  { title: "DSA Mastery", description: "Crack coding interviews with strong data structures and algorithms.", level: "Intermediate" },
  { title: "Full Stack Web Dev", description: "Master MERN stack from frontend to backend.", level: "Beginner" },
  { title: "AI & ML Essentials", description: "Dive into machine learning and deep learning basics.", level: "Advanced" },
  { title: "System Design", description: "Learn how to design scalable systems like a pro.", level: "Intermediate" },
  { title: "Cloud Computing Basics", description: "Learn cloud fundamentals using AWS, Azure, or GCP.", level: "Beginner" },
  { title: "DevOps Fundamentals", description: "Understand CI/CD, Docker, Kubernetes, and monitoring.", level: "Intermediate" },
  { title: "Android Development", description: "Build mobile apps using Kotlin and Jetpack Compose.", level: "Intermediate" },
  { title: "iOS Development", description: "Create iOS apps using Swift and SwiftUI.", level: "Intermediate" },
  { title: "Cybersecurity 101", description: "Protect systems and networks from digital attacks.", level: "Beginner" },
  { title: "Blockchain Basics", description: "Learn how blockchain works and build simple dApps.", level: "Intermediate" },
  { title: "UI/UX Design", description: "Master design principles and tools like Figma.", level: "Beginner" },
  { title: "Game Development", description: "Learn game dev with Unity or Unreal Engine.", level: "Advanced" },
  { title: "Python for Everyone", description: "Intro to Python programming.", level: "Beginner" },
  { title: "Java Programming", description: "Learn Java from basics to OOP.", level: "Beginner" },
  { title: "Rust Essentials", description: "Learn systems programming with Rust.", level: "Advanced" },
  { title: "Competitive Programming", description: "Ace coding contests with speed and accuracy.", level: "Advanced" },
  { title: "Data Analytics", description: "Analyze data with Python, Pandas, and SQL.", level: "Intermediate" },
  { title: "Software Testing", description: "Test automation, unit testing, and TDD.", level: "Intermediate" },
  { title: "Big Data Foundations", description: "Explore Hadoop, Spark, and big data tools.", level: "Advanced" },
  { title: "React Native", description: "Build cross-platform mobile apps using React Native.", level: "Intermediate" },
];

function Tracks() {
  const [enrolledTracks, setEnrolledTracks] = useState([]);
  const [recommendedTracks, setRecommendedTracks] = useState([]);
  const [hideCompleted, setHideCompleted] = useState(false);
  const token = localStorage.getItem('token');

  const enrolledTitles = enrolledTracks.map(t => t.title);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const headers = { Authorization: `Bearer ${token}` };

        const userRes = await axios.get('/users/me', { headers });
        setEnrolledTracks(userRes.data.enrolledTracks);

        const recRes = await axios.get('/recommendations', { headers });
        const recTitles = recRes.data.recommended || [];

        const matched = allTracks.filter(track =>
          recTitles.includes(track.title)
        );
        setRecommendedTracks(matched);
      } catch (err) {
        console.error('❌ Error fetching tracks:', err);
      }
    };
    fetchData();
  }, [token]);

  const handleEnroll = async (title) => {
    try {
      const res = await axios.post('/users/enroll', { title }, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setEnrolledTracks(res.data.enrolledTracks);
    } catch (err) {
      console.error('Enrollment error:', err);
    }
  };

  const toggleCompletion = async (title) => {
    try {
      const res = await axios.post('/users/toggle-completion', { title }, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setEnrolledTracks(prev =>
        prev.map(t => t.title === title ? res.data.updatedTrack : t)
      );
    } catch (err) {
      console.error("Toggle completion failed:", err);
    }
  };

  return (
    <div className="tracks-container">
      <h2>🎯 Learning Tracks</h2>
      <label className="hide-toggle">
        <input
          type="checkbox"
          checked={hideCompleted}
          onChange={() => setHideCompleted(prev => !prev)}
        />
        Hide Completed
      </label>

      <div className="track-list">
        {allTracks.map((track, idx) => {
          const enrolled = enrolledTracks.find(t => t.title === track.title);
          if (hideCompleted && enrolled?.completed) return null;

          return (
            <div className={`track-card ${recommendedTracks.some(t => t.title === track.title) ? 'recommended' : ''}`} key={idx}>
              <h3>{track.title}</h3>
              <p>{track.description}</p>
              <span className="level">{track.level}</span>

              {enrolled ? (
                <>
                  <button className="enrolled-btn" disabled>✔ Enrolled</button>
                  <button
                    className={`complete-btn ${enrolled.completed ? 'done' : ''}`}
                    onClick={() => toggleCompletion(track.title)}
                  >
                    {enrolled.completed ? '✅ Completed' : '📘 Mark as Completed'}
                  </button>
                </>
              ) : (
                <button className="enroll-btn" onClick={() => handleEnroll(track.title)}>
                  ➕ Enroll
                </button>
              )}
            </div>
          );
        })}
      </div>

      {recommendedTracks.length > 0 && (
        <>
          <h2>🤖 Recommended for You</h2>
          <div className="track-list">
            {recommendedTracks.map((track, idx) => (
              <div className="track-card recommended" key={idx}>
                <h3>{track.title}</h3>
                <p>{track.description}</p>
                <span className="level">{track.level}</span>

                {enrolledTitles.includes(track.title) ? (
                  <button className="enrolled-btn" disabled>✔ Enrolled</button>
                ) : (
                  <button className="enroll-btn" onClick={() => handleEnroll(track.title)}>
                    ➕ Enroll
                  </button>
                )}
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default Tracks;
