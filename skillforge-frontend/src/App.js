import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Tracks from './pages/Tracks';
import Chat from './pages/Chat';
import PrivateRoute from './components/PrivateRoute';
import Navbar from './components/Navbar';
import AvailableTracks from './pages/AvailableTracks';
import RecommendedTracks from './pages/RecommendedTracks';

function App() {
  return (
    <Router>
      <Navbar /> {/* Always visible */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route path="/dashboard" element={
          <PrivateRoute><Dashboard /></PrivateRoute>
        } />

        <Route path="/tracks" element={
          <PrivateRoute><Tracks /></PrivateRoute>
        } />

        <Route path="/chat" element={
          <PrivateRoute><Chat /></PrivateRoute>
        } />

        <Route path="/available-tracks" element={
          <PrivateRoute><AvailableTracks /></PrivateRoute>
        } />

        <Route path="/recommendations" element={
          <PrivateRoute><RecommendedTracks /></PrivateRoute>
        } />
      </Routes>
    </Router>
  );
}

export default App;
