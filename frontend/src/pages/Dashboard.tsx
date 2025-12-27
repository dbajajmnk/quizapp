import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import { API_ENDPOINTS } from '../config/api';

interface User {
  id: string;
  name: string;
  email: string;
  profile: any;
}

const Dashboard: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await api.get(API_ENDPOINTS.AUTH.ME);
        if (response.data.success) {
          setUser(response.data.user);
          
          // Check if profile setup is needed
          if (!response.data.user.profile?.jobRole) {
            navigate('/profile-setup');
          }
        }
      } catch (error) {
        console.error('Failed to fetch user:', error);
        localStorage.removeItem('token');
        navigate('/login');
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="dashboard fade-in">
      <header className="dashboard-header">
        <h1>👋 Welcome, {user?.name}!</h1>
        <button onClick={handleLogout} className="btn-secondary">🚪 Logout</button>
      </header>
      
      <div className="dashboard-content">
        <div className="dashboard-cards">
          <div className="card fade-in" onClick={() => navigate('/quiz/create')} style={{ animationDelay: '0.1s' }}>
            <h3>📝 Create Quiz</h3>
            <p>Start a new quiz with custom settings and test your knowledge</p>
          </div>
          
          <div className="card fade-in" onClick={() => navigate('/progress')} style={{ animationDelay: '0.2s' }}>
            <h3>📊 My Progress</h3>
            <p>View your quiz history, statistics, and track your improvement</p>
          </div>
          
          <div className="card fade-in" onClick={() => navigate('/profile-setup')} style={{ animationDelay: '0.3s' }}>
            <h3>👤 Profile</h3>
            <p>Update your profile, preferences, and personal information</p>
          </div>
          
          <div className="card fade-in" onClick={() => navigate('/subscription')} style={{ animationDelay: '0.4s' }}>
            <h3>💎 Subscription</h3>
            <p>Manage your subscription plan and unlock premium features</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;


