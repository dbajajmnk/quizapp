import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import { API_ENDPOINTS } from '../config/api';

const ProfileSetup: React.FC = () => {
  const [formData, setFormData] = useState({
    jobRole: '',
    experience: '',
    technologyStack: [] as string[],
    modules: [] as string[],
    topics: [] as string[],
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch current user profile
    const fetchProfile = async () => {
      try {
        const response = await api.get(API_ENDPOINTS.AUTH.ME);
        if (response.data.success && response.data.user.profile) {
          setFormData({
            jobRole: response.data.user.profile.jobRole || '',
            experience: response.data.user.profile.experience || '',
            technologyStack: response.data.user.profile.technologyStack || [],
            modules: response.data.user.profile.modules || [],
            topics: response.data.user.profile.topics || [],
          });
        }
      } catch (error) {
        console.error('Failed to fetch profile:', error);
      }
    };
    fetchProfile();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleTechStackChange = (tech: string) => {
    setFormData({
      ...formData,
      technologyStack: formData.technologyStack.includes(tech)
        ? formData.technologyStack.filter(t => t !== tech)
        : [...formData.technologyStack, tech],
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await api.put(API_ENDPOINTS.AUTH.UPDATE_PROFILE, formData);
      navigate('/dashboard');
    } catch (error) {
      console.error('Failed to update profile:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="profile-setup-container">
      <div className="profile-setup">
        <h1>Profile Setup</h1>
        <p className="profile-setup-subtitle">Complete your profile to get personalized quiz recommendations</p>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Job Role</label>
            <select name="jobRole" value={formData.jobRole} onChange={handleChange} required>
              <option value="">Select job role</option>
              <option value="Frontend Developer">Frontend Developer</option>
              <option value="Backend Developer">Backend Developer</option>
              <option value="Full Stack Developer">Full Stack Developer</option>
              <option value="React Developer">React Developer</option>
              <option value="JavaScript Developer">JavaScript Developer</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div className="form-group">
            <label>Experience</label>
            <select name="experience" value={formData.experience} onChange={handleChange} required>
              <option value="">Select experience</option>
              <option value="0-1 years">0-1 years</option>
              <option value="1-3 years">1-3 years</option>
              <option value="3-5 years">3-5 years</option>
              <option value="5-10 years">5-10 years</option>
              <option value="10+ years">10+ years</option>
            </select>
          </div>

          <div className="form-group">
            <label>Technology Stack</label>
            <p className="form-help-text">Select all technologies you work with</p>
            <div className="checkbox-group">
              {['JavaScript', 'React', 'Node.js', 'TypeScript', 'Vue', 'Angular', 'Python', 'Java'].map(tech => (
                <label 
                  key={tech} 
                  className={`checkbox-item ${formData.technologyStack.includes(tech) ? 'checked' : ''}`}
                >
                  <input
                    type="checkbox"
                    checked={formData.technologyStack.includes(tech)}
                    onChange={() => handleTechStackChange(tech)}
                  />
                  <span className="checkbox-label">{tech}</span>
                </label>
              ))}
            </div>
          </div>

          <button type="submit" disabled={loading} className="btn-primary">
            {loading ? 'Saving...' : 'Save Profile'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ProfileSetup;


