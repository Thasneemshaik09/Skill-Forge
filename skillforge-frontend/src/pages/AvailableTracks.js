import { useState, useEffect } from 'react';
import axios from '../api/axios';
import './AvailableTracks.css';

const availableTracks = [
  "System Design",
  "Machine Learning",
  "Frontend Projects",
  "Backend Projects",
  "Blockchain Basics",
];

const token = localStorage.getItem('token');

function AvailableTracks() {
  const [userTracks, setUserTracks] = useState([]);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get('/users/me', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUserTracks(res.data.enrolledTracks.map(t => t.title));
      } catch (err) {
        console.error('Failed to fetch user tracks:', err);
      }
    };
    fetchUser();
  }, []);

  const handleEnroll = async (title) => {
    try {
      const res = await axios.post('/users/enroll', { title }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setUserTracks(res.data.enrolledTracks.map(t => t.title));
    } catch (err) {
      console.error('Enrollment failed:', err);
    }
  };

  return (
    <div className="enroll-page">
      <h2>📚 Available Tracks</h2>
      <ul>
        {availableTracks.map((track, idx) => (
          <li key={idx}>
            <span>{track}</span>
            {userTracks.includes(track) ? (
              <button className="enrolled" disabled>Enrolled</button>
            ) : (
              <button onClick={() => handleEnroll(track)}>Enroll</button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AvailableTracks;
