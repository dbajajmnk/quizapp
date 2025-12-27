import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import { API_ENDPOINTS } from '../config/api';

interface ProgressStats {
  totalModules: number;
  totalQuizzes: number;
  totalQuestions: number;
  totalCorrect: number;
  overallAverage: number;
  moduleProgress: any[];
}

const Progress: React.FC = () => {
  const navigate = useNavigate();
  const [stats, setStats] = useState<ProgressStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProgress = async () => {
      try {
        const response = await api.get(API_ENDPOINTS.PROGRESS.GET_STATS);
        if (response.data.success) {
          setStats(response.data.data);
        } else {
          setError('Failed to load progress data');
        }
      } catch (error: any) {
        console.error('Failed to fetch progress:', error);
        setError(error.response?.data?.message || 'Failed to load progress');
      } finally {
        setLoading(false);
      }
    };

    fetchProgress();
  }, []);

  const formatDate = (dateString: string) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  if (loading) {
    return (
      <div className="progress-page" style={{ padding: '2rem', textAlign: 'center' }}>
        <h1>My Progress</h1>
        <p>Loading your progress...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="progress-page" style={{ padding: '2rem' }}>
        <h1>My Progress</h1>
        <div style={{ 
          padding: '1rem', 
          backgroundColor: '#fee', 
          color: '#c33', 
          borderRadius: '4px',
          marginBottom: '1rem'
        }}>
          {error}
        </div>
        <button 
          onClick={() => navigate('/dashboard')}
          style={{
            padding: '0.5rem 1rem',
            backgroundColor: '#667eea',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Back to Dashboard
        </button>
      </div>
    );
  }

  return (
    <div className="progress-page fade-in" style={{ 
      padding: '2rem', 
      maxWidth: '1200px', 
      margin: '0 auto' 
    }}>
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        marginBottom: '2rem'
      }}>
        <h1 style={{ margin: 0 }}>📊 My Progress</h1>
        <button 
          onClick={() => navigate('/dashboard')}
          style={{
            padding: '0.5rem 1rem',
            backgroundColor: '#667eea',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: '0.9rem'
          }}
        >
          Back to Dashboard
        </button>
      </div>

      {stats && (
        <>
          {/* Overall Statistics */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '1rem',
            marginBottom: '2rem'
          }}>
            <div style={{
              backgroundColor: 'white',
              padding: '1.5rem',
              borderRadius: '8px',
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
              textAlign: 'center'
            }}>
              <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#667eea', marginBottom: '0.5rem' }}>
                {stats.totalQuizzes}
              </div>
              <div style={{ color: '#666', fontSize: '0.9rem' }}>Total Quizzes</div>
            </div>

            <div style={{
              backgroundColor: 'white',
              padding: '1.5rem',
              borderRadius: '8px',
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
              textAlign: 'center'
            }}>
              <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#48bb78', marginBottom: '0.5rem' }}>
                {stats.totalQuestions}
              </div>
              <div style={{ color: '#666', fontSize: '0.9rem' }}>Questions Answered</div>
            </div>

            <div style={{
              backgroundColor: 'white',
              padding: '1.5rem',
              borderRadius: '8px',
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
              textAlign: 'center'
            }}>
              <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#ed8936', marginBottom: '0.5rem' }}>
                {stats.totalCorrect}
              </div>
              <div style={{ color: '#666', fontSize: '0.9rem' }}>Correct Answers</div>
            </div>

            <div style={{
              backgroundColor: 'white',
              padding: '1.5rem',
              borderRadius: '8px',
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
              textAlign: 'center'
            }}>
              <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#9f7aea', marginBottom: '0.5rem' }}>
                {stats.overallAverage}%
              </div>
              <div style={{ color: '#666', fontSize: '0.9rem' }}>Average Score</div>
            </div>
          </div>

          {/* Module Progress */}
          {stats.moduleProgress && stats.moduleProgress.length > 0 ? (
            <div style={{ marginBottom: '2rem' }}>
              <h2 style={{ marginBottom: '1rem', color: '#333' }}>Progress by Module</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {stats.moduleProgress
                  .filter((progress: any) => progress.module) // Filter out progress without modules
                  .map((progress: any) => (
                  <div 
                    key={progress._id || progress.module?._id}
                    style={{
                      backgroundColor: 'white',
                      padding: '1.5rem',
                      borderRadius: '8px',
                      boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                    }}
                  >
                    <div style={{ 
                      display: 'flex', 
                      justifyContent: 'space-between', 
                      alignItems: 'center',
                      marginBottom: '0.5rem'
                    }}>
                      <div>
                        <h3 style={{ margin: 0, color: '#333' }}>
                          {progress.module?.title || 'Unknown Module'}
                        </h3>
                        <p style={{ margin: '0.25rem 0 0 0', color: '#666', fontSize: '0.9rem' }}>
                          Module {progress.module?.moduleNumber || 'N/A'} • {progress.module?.category || 'N/A'}
                        </p>
                      </div>
                      <div style={{ 
                        fontSize: '1.5rem', 
                        fontWeight: 'bold', 
                        color: (progress.averageScore || 0) >= 70 ? '#48bb78' : (progress.averageScore || 0) >= 50 ? '#ed8936' : '#f56565'
                      }}>
                        {progress.averageScore || 0}%
                      </div>
                    </div>

                    {/* Progress Bar */}
                    <div style={{
                      width: '100%',
                      height: '8px',
                      backgroundColor: '#e2e8f0',
                      borderRadius: '4px',
                      marginTop: '1rem',
                      overflow: 'hidden'
                    }}>
                      <div style={{
                        width: `${progress.averageScore || 0}%`,
                        height: '100%',
                        backgroundColor: (progress.averageScore || 0) >= 70 ? '#48bb78' : (progress.averageScore || 0) >= 50 ? '#ed8936' : '#f56565',
                        transition: 'width 0.3s ease'
                      }} />
                    </div>

                    <div style={{
                      display: 'grid',
                      gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
                      gap: '1rem',
                      marginTop: '1rem',
                      paddingTop: '1rem',
                      borderTop: '1px solid #e2e8f0'
                    }}>
                      <div>
                        <div style={{ color: '#666', fontSize: '0.85rem' }}>Attempts</div>
                        <div style={{ fontWeight: 'bold', color: '#333' }}>{progress.totalAttempts || 0}</div>
                      </div>
                      <div>
                        <div style={{ color: '#666', fontSize: '0.85rem' }}>Questions</div>
                        <div style={{ fontWeight: 'bold', color: '#333' }}>{progress.totalQuestions || 0}</div>
                      </div>
                      <div>
                        <div style={{ color: '#666', fontSize: '0.85rem' }}>Correct</div>
                        <div style={{ fontWeight: 'bold', color: '#333' }}>{progress.correctAnswers || 0}</div>
                      </div>
                      {progress.lastAttemptDate && (
                        <div>
                          <div style={{ color: '#666', fontSize: '0.85rem' }}>Last Attempt</div>
                          <div style={{ fontWeight: 'bold', color: '#333', fontSize: '0.9rem' }}>
                            {formatDate(progress.lastAttemptDate)}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div style={{
              backgroundColor: 'white',
              padding: '2rem',
              borderRadius: '8px',
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
              textAlign: 'center',
              color: '#666'
            }}>
              <p style={{ marginBottom: '1rem' }}>No progress data yet.</p>
              <button
                onClick={() => navigate('/quiz/create')}
                style={{
                  padding: '0.75rem 1.5rem',
                  backgroundColor: '#667eea',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  fontSize: '1rem'
                }}
              >
                Create Your First Quiz
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Progress;
