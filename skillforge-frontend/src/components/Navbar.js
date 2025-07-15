import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
  const navigate = useNavigate();
  const isLoggedIn = !!localStorage.getItem('token');

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <h1>SkillForge</h1>
      <ul>
        <li><Link to="/home">Home</Link></li> 
        {isLoggedIn && (
          <>
            <li><Link to="/dashboard">Dashboard</Link></li>
            <li><Link to="/tracks">Tracks</Link></li>
            <li><Link to="/chat">AI Chat</Link></li>
            <li><button onClick={handleLogout}>Logout</button></li>
          </>
        )}
        {!isLoggedIn && (
          <>
            <li><Link to="/login">Login</Link></li>
            <li><Link to="/register">Register</Link></li>
          </>
        )}
      </ul>

    </nav>
  );
}

export default Navbar;



