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
  progress?: {
    totalAttempts: number;
    averageScore: number;
    lastAttemptDate: string | null;
    hasAttempted: boolean;
  };
}

const QuizCreate: React.FC = () => {
  const [selectedTechnologies, setSelectedTechnologies] = useState<string[]>([]);
  const [availableModules, setAvailableModules] = useState<Module[]>([]);
  const [selectedModule, setSelectedModule] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [fetchingModules, setFetchingModules] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  // Fetch modules when technologies are selected
  useEffect(() => {
    const fetchModules = async () => {
      if (selectedTechnologies.length === 0) {
        setAvailableModules([]);
        setSelectedModule('');
        return;
      }

      setFetchingModules(true);
      try {
        // Build query string for multiple technologies
        const techQuery = selectedTechnologies.join(',');
        const response = await api.get(`${API_ENDPOINTS.MODULES.GET_ALL}?technology=${techQuery}`);
        
        if (response.data.success) {
          const modules = response.data.data;
          setAvailableModules(modules);
          
          // Auto-select module based on attempt status
          const modulesWithQuestions = modules.filter((m: Module) => m.totalQuestions > 0);
          
          if (modulesWithQuestions.length > 0) {
            // Find first attempted module
            const attemptedModule = modulesWithQuestions.find((m: Module) => m.progress?.hasAttempted);
            
            if (attemptedModule) {
              // Select first attempted module
              setSelectedModule(attemptedModule._id);
            } else {
              // Select first non-attempted module
              setSelectedModule(modulesWithQuestions[0]._id);
            }
          }
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

  const handleModuleSelect = (moduleId: string) => {
    setSelectedModule(moduleId);
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

    if (!selectedModule) {
      setError('Please select a module');
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

      const selectedModuleData = availableModules.find(m => m._id === selectedModule);
      const settings = {
        timeLimit: { min: 10, max: 60, total: 30 },
        technology: technology,
        modules: [selectedModule],
        numberOfQuestions: selectedModuleData?.totalQuestions || 0
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

  const selectedModuleData = availableModules.find(m => m._id === selectedModule);
  const totalQuestions = selectedModuleData?.totalQuestions || 0;

  return (
    <div className="quiz-create fade-in" style={{ padding: '2rem 1rem', minHeight: '100vh', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', position: 'relative', zIndex: 1 }}>
      <div style={{ maxWidth: '900px', margin: '0 auto', position: 'relative', zIndex: 2 }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <h1 style={{ color: '#ffffff', fontSize: '2.5rem', marginBottom: '0.5rem', fontWeight: '700', textShadow: '2px 2px 6px rgba(0,0,0,0.4)' }} className="quiz-create-title">
            🎯 Create Quiz
          </h1>
          <p style={{ color: '#ffffff', fontSize: '1.1rem', textShadow: '1px 1px 3px rgba(0,0,0,0.4)' }} className="quiz-create-subtitle">
            Select a technology and module to start your quiz
          </p>
        </div>

        {error && (
          <div className="error-message" style={{
            background: '#fee',
            color: '#c33',
            padding: '1rem',
            borderRadius: '0.5rem',
            marginBottom: '1.5rem',
            border: '1px solid #fcc'
          }}>
            {error}
          </div>
        )}

        <div style={{
          background: 'white',
          padding: '2.5rem',
          borderRadius: '1.5rem',
          boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
        }} className="quiz-create-card">
          <form onSubmit={handleSubmit}>
            {/* Technology Selection */}
            <div className="form-group" style={{ marginBottom: '2rem' }}>
              <label style={{ fontSize: '1.1rem', fontWeight: '600', marginBottom: '1rem', display: 'block', color: '#374151' }}>
                Select Technology <span style={{ color: '#ef4444' }}>*</span>
              </label>
              <div className="checkbox-group" style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                {['JavaScript', 'React'].map(tech => (
                  <label key={tech} style={{
                    display: 'flex',
                    alignItems: 'center',
                    padding: '0.75rem 1.25rem',
                    background: selectedTechnologies.includes(tech) ? '#667eea' : '#f3f4f6',
                    color: selectedTechnologies.includes(tech) ? '#ffffff' : '#374151',
                    borderRadius: '0.5rem',
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                    fontWeight: '600',
                    border: selectedTechnologies.includes(tech) ? '2px solid #667eea' : '2px solid transparent',
                    boxShadow: selectedTechnologies.includes(tech) ? '0 4px 6px rgba(0,0,0,0.2)' : 'none'
                  }}>
                    <input
                      type="checkbox"
                      checked={selectedTechnologies.includes(tech)}
                      onChange={() => handleTechnologyChange(tech)}
                      style={{ 
                        marginRight: '0.5rem', 
                        cursor: 'pointer', 
                        width: '18px', 
                        height: '18px',
                        accentColor: selectedTechnologies.includes(tech) ? '#ffffff' : '#667eea'
                      }}
                    />
                    <span style={{ 
                      color: selectedTechnologies.includes(tech) ? '#ffffff' : '#374151',
                      fontWeight: selectedTechnologies.includes(tech) ? '600' : '500'
                    }}>{tech}</span>
                  </label>
                ))}
              </div>
              {selectedTechnologies.length === 0 && (
                <small style={{ color: '#6b7280', display: 'block', marginTop: '0.75rem', fontSize: '0.875rem' }}>
                  Please select at least one technology to see available modules
                </small>
              )}
            </div>

            {/* Available Modules */}
            {selectedTechnologies.length > 0 && (
              <div className="form-group">
                <label style={{ fontSize: '1.1rem', fontWeight: '600', marginBottom: '1rem', display: 'block', color: '#374151' }}>
                  Select Module <span style={{ color: '#ef4444' }}>*</span>
                </label>

                {fetchingModules ? (
                  <div style={{ textAlign: 'center', padding: '3rem', color: '#6b7280' }}>
                    <div style={{ fontSize: '1.1rem' }}>Loading modules...</div>
                  </div>
                ) : availableModules.length === 0 ? (
                  <div style={{ 
                    padding: '2rem', 
                    background: '#f9fafb', 
                    borderRadius: '0.75rem',
                    color: '#6b7280',
                    textAlign: 'center',
                    border: '1px solid #e5e7eb'
                  }}>
                    No modules found for selected technologies
                  </div>
                ) : (
                  <div style={{
                    maxHeight: '500px',
                    overflowY: 'auto',
                    border: '1px solid #e5e7eb',
                    borderRadius: '0.75rem',
                    padding: '1rem',
                    background: '#fafafa'
                  }}>
                    {availableModules.map(module => {
                      const hasQuestions = module.totalQuestions > 0;
                      const isSelected = selectedModule === module._id;
                      const hasAttempted = module.progress?.hasAttempted || false;
                      const attemptCount = module.progress?.totalAttempts || 0;
                      const avgScore = module.progress?.averageScore || 0;

                      return (
                        <div
                          key={module._id}
                          style={{
                            display: 'flex',
                            alignItems: 'flex-start',
                            padding: '1.25rem',
                            marginBottom: '0.75rem',
                            background: isSelected ? '#e0e7ff' : 'white',
                            borderRadius: '0.75rem',
                            cursor: hasQuestions ? 'pointer' : 'not-allowed',
                            border: isSelected ? '2px solid #667eea' : '2px solid #e5e7eb',
                            transition: 'all 0.2s',
                            opacity: hasQuestions ? 1 : 0.6,
                            boxShadow: isSelected ? '0 4px 6px -1px rgba(0, 0, 0, 0.1)' : 'none'
                          }}
                          onClick={() => hasQuestions && handleModuleSelect(module._id)}
                        >
                          <input
                            type="radio"
                            name="module"
                            checked={isSelected}
                            onChange={() => hasQuestions && handleModuleSelect(module._id)}
                            disabled={!hasQuestions}
                            style={{ 
                              marginRight: '1rem', 
                              marginTop: '0.25rem',
                              cursor: hasQuestions ? 'pointer' : 'not-allowed',
                              width: '20px',
                              height: '20px',
                              accentColor: '#667eea'
                            }}
                          />
                          <div style={{ flex: 1 }}>
                            <div style={{ 
                              display: 'flex', 
                              alignItems: 'center', 
                              justifyContent: 'space-between',
                              marginBottom: '0.5rem' 
                            }}>
                              <div style={{ fontWeight: '600', fontSize: '1.1rem', color: '#111827' }}>
                                {module.title}
                                {hasAttempted && (
                                  <span style={{ 
                                    marginLeft: '0.75rem', 
                                    fontSize: '0.75rem', 
                                    padding: '0.25rem 0.5rem',
                                    background: '#dbeafe',
                                    color: '#1e40af',
                                    borderRadius: '0.25rem',
                                    fontWeight: '500'
                                  }}>
                                    Attempted {attemptCount}x
                                  </span>
                                )}
                              </div>
                              <div style={{ 
                                fontSize: '0.875rem', 
                                color: hasQuestions ? '#667eea' : '#9ca3af', 
                                fontWeight: '600',
                                padding: '0.25rem 0.75rem',
                                background: hasQuestions ? '#e0e7ff' : '#f3f4f6',
                                borderRadius: '0.5rem'
                              }}>
                                {module.totalQuestions} {module.totalQuestions === 1 ? 'Question' : 'Questions'}
                              </div>
                            </div>
                            {module.description && (
                              <div style={{ 
                                fontSize: '0.9rem', 
                                color: '#6b7280', 
                                marginBottom: '0.5rem',
                                lineHeight: '1.5'
                              }}>
                                {module.description}
                              </div>
                            )}
                            {hasAttempted && (
                              <div style={{
                                fontSize: '0.875rem',
                                color: '#059669',
                                fontWeight: '500',
                                marginTop: '0.5rem'
                              }}>
                                Average Score: {avgScore}%
                              </div>
                            )}
                            {!hasQuestions && (
                              <div style={{ 
                                fontSize: '0.875rem', 
                                color: '#ef4444', 
                                marginTop: '0.5rem',
                                fontWeight: '500'
                              }}>
                                No questions available yet
                              </div>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}

                {selectedModule && selectedModuleData && (
                  <div style={{
                    marginTop: '1.5rem',
                    padding: '1.25rem',
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    borderRadius: '0.75rem',
                    border: 'none',
                    color: 'white'
                  }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div>
                        <div style={{ fontSize: '0.875rem', opacity: 0.9, marginBottom: '0.25rem' }}>
                          Selected Module
                        </div>
                        <div style={{ fontSize: '1.25rem', fontWeight: '700' }}>
                          {selectedModuleData.title}
                        </div>
                      </div>
                      <div style={{ textAlign: 'right' }}>
                        <div style={{ fontSize: '0.875rem', opacity: 0.9, marginBottom: '0.25rem' }}>
                          Total Questions
                        </div>
                        <div style={{ fontSize: '1.5rem', fontWeight: '700' }}>
                          {totalQuestions}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            <button 
              type="submit" 
              disabled={loading || selectedTechnologies.length === 0 || !selectedModule} 
              className="btn-primary"
              style={{
                width: '100%',
                marginTop: '2rem',
                padding: '1rem',
                fontSize: '1.1rem',
                fontWeight: '600',
                background: (selectedTechnologies.length === 0 || !selectedModule) 
                  ? '#d1d5db' 
                  : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                color: 'white',
                border: 'none',
                borderRadius: '0.75rem',
                cursor: (selectedTechnologies.length === 0 || !selectedModule) ? 'not-allowed' : 'pointer',
                transition: 'all 0.2s',
                boxShadow: (selectedTechnologies.length === 0 || !selectedModule) 
                  ? 'none' 
                  : '0 10px 15px -3px rgba(0, 0, 0, 0.1)'
              }}
            >
              {loading ? 'Creating Quiz...' : '🚀 Start Quiz'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default QuizCreate;
