import React, { useEffect, useState } from 'react';
import axios from '../api/axios';
import './RecommendedTracks.css'; // optional styling

function RecommendedTracks() {
  const [tracks, setTracks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get('/recommendations', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setTracks(res.data.recommended);
      } catch (err) {
        console.error('Error fetching recommendations:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchRecommendations();
  }, []);

  return (
    <div className="recommended-container">
      <h2>🎯 Recommended Learning Tracks</h2>

      {loading ? (
        <p>Loading recommendations...</p>
      ) : tracks.length === 0 ? (
        <p>No new tracks to recommend right now.</p>
      ) : (
        <ul className="track-list">
          {tracks.map((track) => (
            <li key={track._id} className="track-card">
              <h3>{track.title}</h3>
              <p>{track.description}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default RecommendedTracks;