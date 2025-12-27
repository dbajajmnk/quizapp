import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import { API_ENDPOINTS } from '../config/api';

const QuizCreate: React.FC = () => {
  const [settings, setSettings] = useState({
    timeLimit: { min: 10, max: 60, total: 30 },
    technology: 'All',
    difficulty: 'all',
    questionLength: 'all',
    numberOfQuestions: 10,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await api.post(API_ENDPOINTS.QUIZ.CREATE, { settings });
      if (response.data.success) {
        navigate(`/quiz/${response.data.data._id}`);
      } else {
        setError(response.data.message || 'Failed to create quiz');
      }
    } catch (error: any) {
      console.error('Failed to create quiz:', error);
      const errorMessage = error.response?.data?.message || 
                          error.message || 
                          'Failed to create quiz. Please try again.';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="quiz-create fade-in">
      <h1>🎯 Create Quiz</h1>
      {error && (
        <div className="error-message">
          {error}
        </div>
      )}
      <div style={{
        background: 'white',
        padding: '2rem',
        borderRadius: '1rem',
        boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
        maxWidth: '600px',
        margin: '0 auto'
      }}>
        <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Number of Questions</label>
          <input
            type="number"
            min="1"
            max="50"
            value={settings.numberOfQuestions}
            onChange={(e) => setSettings({ ...settings, numberOfQuestions: parseInt(e.target.value) || 1 })}
            required
          />
        </div>

        <div className="form-group">
          <label>Technology</label>
          <select
            value={settings.technology}
            onChange={(e) => setSettings({ ...settings, technology: e.target.value })}
          >
            <option value="All">All</option>
            <option value="JavaScript">JavaScript</option>
            <option value="React">React</option>
            <option value="Both">Both</option>
          </select>
        </div>

        <div className="form-group">
          <label>Difficulty</label>
          <select
            value={settings.difficulty}
            onChange={(e) => setSettings({ ...settings, difficulty: e.target.value })}
          >
            <option value="all">All</option>
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>
        </div>

        <button type="submit" disabled={loading} className="btn-primary">
          {loading ? 'Creating...' : '🚀 Start Quiz'}
        </button>
      </form>
      </div>
    </div>
  );
};

export default QuizCreate;


