import { Link } from 'react-router-dom';
import './Home.css';

function Home() {
  return (
    <div className="home-container">
      <section className="hero">
        <h1>Welcome to <span className="highlight">SkillForge</span> 🚀</h1>
        <p>Your personalized learning assistant powered by AI.</p>
        <div className="home-buttons">
          <Link to="/register" className="btn">Get Started</Link>
          <Link to="/tracks" className="btn secondary">Browse Tracks</Link>
        </div>
      </section>

      <section className="features">
        <h2>Why SkillForge?</h2>
        <div className="feature-grid">
          <div className="feature-card">
            <h3>Track-Based Learning</h3>
            <p>Choose from curated paths like DSA, Web Dev, AI & more.</p>
          </div>
          <div className="feature-card">
            <h3>AI Assistance</h3>
            <p>Ask questions anytime and get instant guidance.</p>
          </div>
          <div className="feature-card">
            <h3>Progress Dashboard</h3>
            <p>Track your growth and stay motivated.</p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
