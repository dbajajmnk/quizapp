import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import { API_ENDPOINTS } from '../config/api';

interface Module {
  _id: string;
  title: string;
  moduleNumber: number;
  category: string;
  totalQuestions: number;
  description?: string;
}

const QuizCreate: React.FC = () => {
  const [selectedTechnologies, setSelectedTechnologies] = useState<string[]>([]);
  const [availableModules, setAvailableModules] = useState<Module[]>([]);
  const [selectedModules, setSelectedModules] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [fetchingModules, setFetchingModules] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  // Fetch modules when technologies are selected
  useEffect(() => {
    const fetchModules = async () => {
      if (selectedTechnologies.length === 0) {
        setAvailableModules([]);
        setSelectedModules([]);
        return;
      }

      setFetchingModules(true);
      try {
        // Build query string for multiple technologies
        const techQuery = selectedTechnologies.join(',');
        const response = await api.get(`${API_ENDPOINTS.MODULES.GET_ALL}?technology=${techQuery}`);
        
        if (response.data.success) {
          setAvailableModules(response.data.data);
          // Auto-select all modules when they're loaded
          setSelectedModules(response.data.data.map((m: Module) => m._id));
        }
      } catch (error: any) {
        console.error('Failed to fetch modules:', error);
        setError('Failed to load modules. Please try again.');
      } finally {
        setFetchingModules(false);
      }
    };

    fetchModules();
  }, [selectedTechnologies]);

  const handleTechnologyChange = (tech: string) => {
    setSelectedTechnologies(prev => {
      if (prev.includes(tech)) {
        return prev.filter(t => t !== tech);
      } else {
        return [...prev, tech];
      }
    });
  };

  const handleModuleToggle = (moduleId: string) => {
    setSelectedModules(prev => {
      if (prev.includes(moduleId)) {
        return prev.filter(id => id !== moduleId);
      } else {
        return [...prev, moduleId];
      }
    });
  };

  const handleSelectAllModules = () => {
    // Only select modules that have questions
    const modulesWithQuestions = availableModules.filter(m => m.totalQuestions > 0);
    if (selectedModules.length === modulesWithQuestions.length) {
      setSelectedModules([]);
    } else {
      setSelectedModules(modulesWithQuestions.map(m => m._id));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    if (selectedTechnologies.length === 0) {
      setError('Please select at least one technology');
      setLoading(false);
      return;
    }

    if (selectedModules.length === 0) {
      setError('Please select at least one module');
      setLoading(false);
      return;
    }

    try {
      // Determine technology value for backend
      let technology = 'All';
      if (selectedTechnologies.length === 1) {
        technology = selectedTechnologies[0];
      } else if (selectedTechnologies.length === 2) {
        technology = 'Both';
      }

      const settings = {
        timeLimit: { min: 10, max: 60, total: 30 },
        technology: technology,
        modules: selectedModules,
        numberOfQuestions: availableModules
          .filter(m => selectedModules.includes(m._id))
          .reduce((sum, m) => sum + m.totalQuestions, 0)
      };

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

  const totalQuestions = availableModules
    .filter(m => selectedModules.includes(m._id))
    .reduce((sum, m) => sum + m.totalQuestions, 0);

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
        maxWidth: '800px',
        margin: '0 auto'
      }}>
        <form onSubmit={handleSubmit}>
          {/* Technology Selection */}
          <div className="form-group">
            <label>Select Technology <span style={{ color: 'red' }}>*</span></label>
            <div className="checkbox-group">
              {['JavaScript', 'React'].map(tech => (
                <label key={tech}>
                  <input
                    type="checkbox"
                    checked={selectedTechnologies.includes(tech)}
                    onChange={() => handleTechnologyChange(tech)}
                  />
                  <span>{tech}</span>
                </label>
              ))}
            </div>
            {selectedTechnologies.length === 0 && (
              <small style={{ color: '#666', display: 'block', marginTop: '0.5rem' }}>
                Please select at least one technology to see available modules
              </small>
            )}
          </div>

          {/* Available Modules */}
          {selectedTechnologies.length > 0 && (
            <div className="form-group">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                <label>Available Modules <span style={{ color: 'red' }}>*</span></label>
                {availableModules.filter(m => m.totalQuestions > 0).length > 0 && (
                  <button
                    type="button"
                    onClick={handleSelectAllModules}
                    style={{
                      padding: '0.25rem 0.75rem',
                      fontSize: '0.875rem',
                      background: '#667eea',
                      color: 'white',
                      border: 'none',
                      borderRadius: '0.25rem',
                      cursor: 'pointer'
                    }}
                  >
                    {selectedModules.length === availableModules.filter(m => m.totalQuestions > 0).length ? 'Deselect All' : 'Select All'}
                  </button>
                )}
              </div>

              {fetchingModules ? (
                <div style={{ textAlign: 'center', padding: '2rem', color: '#666' }}>
                  Loading modules...
                </div>
              ) : availableModules.length === 0 ? (
                <div style={{ 
                  padding: '1rem', 
                  background: '#f3f4f6', 
                  borderRadius: '0.5rem',
                  color: '#666',
                  textAlign: 'center'
                }}>
                  No modules found for selected technologies
                </div>
              ) : (
                <div style={{
                  maxHeight: '400px',
                  overflowY: 'auto',
                  border: '1px solid #e5e7eb',
                  borderRadius: '0.5rem',
                  padding: '1rem'
                }}>
                  {availableModules.map(module => {
                    const hasQuestions = module.totalQuestions > 0;
                    const isSelected = selectedModules.includes(module._id);
                    return (
                      <div
                        key={module._id}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          padding: '0.75rem',
                          marginBottom: '0.5rem',
                          background: isSelected ? '#e0e7ff' : '#f9fafb',
                          borderRadius: '0.5rem',
                          cursor: hasQuestions ? 'pointer' : 'not-allowed',
                          border: isSelected ? '2px solid #667eea' : '2px solid transparent',
                          transition: 'all 0.2s',
                          opacity: hasQuestions ? 1 : 0.6
                        }}
                        onClick={() => hasQuestions && handleModuleToggle(module._id)}
                      >
                        <input
                          type="checkbox"
                          checked={isSelected}
                          onChange={() => hasQuestions && handleModuleToggle(module._id)}
                          disabled={!hasQuestions}
                          style={{ marginRight: '1rem', cursor: hasQuestions ? 'pointer' : 'not-allowed' }}
                        />
                        <div style={{ flex: 1 }}>
                          <div style={{ fontWeight: '600', marginBottom: '0.25rem' }}>
                            {module.title}
                            {!hasQuestions && (
                              <span style={{ marginLeft: '0.5rem', fontSize: '0.75rem', color: '#ef4444' }}>
                                (No questions yet)
                              </span>
                            )}
                          </div>
                          {module.description && (
                            <div style={{ fontSize: '0.875rem', color: '#666', marginBottom: '0.25rem' }}>
                              {module.description}
                            </div>
                          )}
                          <div style={{ 
                            fontSize: '0.875rem', 
                            color: hasQuestions ? '#667eea' : '#999', 
                            fontWeight: '500' 
                          }}>
                            {module.totalQuestions} {module.totalQuestions === 1 ? 'Question' : 'Questions'}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}

              {selectedModules.length > 0 && (
                <div style={{
                  marginTop: '1rem',
                  padding: '1rem',
                  background: '#f0f9ff',
                  borderRadius: '0.5rem',
                  border: '1px solid #bae6fd'
                }}>
                  <strong>Total Questions Selected: {totalQuestions}</strong>
                </div>
              )}
            </div>
          )}

          <button 
            type="submit" 
            disabled={loading || selectedTechnologies.length === 0 || selectedModules.length === 0} 
            className="btn-primary"
            style={{
              width: '100%',
              marginTop: '1.5rem',
              opacity: (selectedTechnologies.length === 0 || selectedModules.length === 0) ? 0.5 : 1,
              cursor: (selectedTechnologies.length === 0 || selectedModules.length === 0) ? 'not-allowed' : 'pointer'
            }}
          >
            {loading ? 'Creating Quiz...' : '🚀 Start Quiz'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default QuizCreate;
