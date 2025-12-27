import React from 'react';
import { useNavigate } from 'react-router-dom';

const Subscription: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="subscription-page">
      <h1>Subscription</h1>
      <p>Subscription management will be implemented here.</p>
      <button onClick={() => navigate('/dashboard')}>Back to Dashboard</button>
    </div>
  );
};

export default Subscription;


