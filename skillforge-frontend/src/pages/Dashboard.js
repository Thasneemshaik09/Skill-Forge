import { useEffect, useState } from 'react';
import './Dashboard.css';
import axios from '../api/axios';

// ✅ Move token outside component scope to avoid missing dependency warning
const token = localStorage.getItem('token');

function Dashboard() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [progressInputs, setProgressInputs] = useState({});

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        console.log('Fetching user...');
        const res = await axios.get('/users/me', {
          headers: { Authorization: `Bearer ${token}` },
        });
        console.log('User fetched:', res.data);
        setUser(res.data);
        setProgressInputs(
          res.data.enrolledTracks.reduce((acc, t) => {
            acc[t.title] = t.progress;
            return acc;
          }, {})
        );
        setLoading(false);
      } catch (err) {
        console.error('Error fetching user:', err);
      }
    };
    fetchUserData();
  }, []);

  const handleProgressUpdate = async (title) => {
    try {
      const res = await axios.put('/users/track', {
        title,
        progress: progressInputs[title],
      }, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUser(prev => ({ ...prev, enrolledTracks: res.data.enrolledTracks }));
    } catch (err) {
      console.error('Error updating progress:', err);
    }
  };

  if (loading) return <div>Loading Dashboard...</div>;

  return (
    <div className="dashboard">
      <h2>Welcome back, {user?.name || 'Learner'}! 👋</h2>

      <section className="summary">
        <h3>Your Enrolled Tracks</h3>
        {user.enrolledTracks?.map((track, idx) => (
          <div key={idx} className="progress-item">
            <span>{track.title}</span>
            <div className="progress-bar">
              <div className="progress-fill" style={{ width: `${track.progress}%` }}></div>
            </div>
            <small>{track.progress}% complete</small>

            <input
              type="number"
              min="0"
              max="100"
              value={progressInputs[track.title]}
              onChange={(e) =>
                setProgressInputs({ ...progressInputs, [track.title]: e.target.value })
              }
            />
            <button onClick={() => handleProgressUpdate(track.title)}>Update</button>
          </div>
        ))}
      </section>

      <button className="chat-btn" onClick={() => window.location.href = "/chat"}>
        💬 Ask AI Doubts
      </button>
    </div>
  );
}

export default Dashboard;
