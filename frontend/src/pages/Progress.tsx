import React from 'react';
import { useNavigate } from 'react-router-dom';

const Progress: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="progress-page">
      <h1>My Progress</h1>
      <p>Progress tracking will be implemented here.</p>
      <button onClick={() => navigate('/dashboard')}>Back to Dashboard</button>
    </div>
  );
};

export default Progress;


