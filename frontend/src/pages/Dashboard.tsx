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
    <div className="dashboard">
      <header className="dashboard-header">
        <h1>Welcome, {user?.name}!</h1>
        <button onClick={handleLogout} className="btn-secondary">Logout</button>
      </header>
      
      <div className="dashboard-content">
        <div className="dashboard-cards">
          <div className="card" onClick={() => navigate('/quiz/create')}>
            <h3>Create Quiz</h3>
            <p>Start a new quiz with custom settings</p>
          </div>
          
          <div className="card" onClick={() => navigate('/progress')}>
            <h3>My Progress</h3>
            <p>View your quiz history and progress</p>
          </div>
          
          <div className="card" onClick={() => navigate('/profile-setup')}>
            <h3>Profile</h3>
            <p>Update your profile and preferences</p>
          </div>
          
          <div className="card" onClick={() => navigate('/subscription')}>
            <h3>Subscription</h3>
            <p>Manage your subscription</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;


