import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import { API_ENDPOINTS } from '../config/api';

interface Subscription {
  type: 'free' | 'premium' | 'enterprise';
  startDate: string | null;
  endDate: string | null;
  isActive: boolean;
}

const Subscription: React.FC = () => {
  const navigate = useNavigate();
  const [subscription, setSubscription] = useState<Subscription | null>(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  useEffect(() => {
    const fetchSubscription = async () => {
      try {
        const response = await api.get(API_ENDPOINTS.SUBSCRIPTION.GET);
        if (response.data.success) {
          setSubscription(response.data.data);
        } else {
          setError('Failed to load subscription data');
        }
      } catch (error: any) {
        console.error('Failed to fetch subscription:', error);
        setError(error.response?.data?.message || 'Failed to load subscription');
      } finally {
        setLoading(false);
      }
    };

    fetchSubscription();
  }, []);

  const handleUpgrade = async (planType: 'free' | 'premium' | 'enterprise') => {
    if (subscription?.type === planType) {
      setError('You are already on this plan');
      return;
    }

    setUpdating(true);
    setError(null);
    setSuccess(null);

    try {
      const now = new Date();
      let endDate: Date | null = null;

      // Set end date based on plan type
      if (planType === 'premium') {
        endDate = new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000); // 30 days
      } else if (planType === 'enterprise') {
        endDate = new Date(now.getTime() + 90 * 24 * 60 * 60 * 1000); // 90 days
      }
      // Free plan has no end date

      const response = await api.put(API_ENDPOINTS.SUBSCRIPTION.UPDATE, {
        type: planType,
        startDate: now.toISOString(),
        endDate: endDate ? endDate.toISOString() : null
      });

      if (response.data.success) {
        setSubscription(response.data.data);
        setSuccess(`Successfully ${planType === 'free' ? 'downgraded to' : 'upgraded to'} ${planType} plan!`);
        setTimeout(() => setSuccess(null), 5000);
      } else {
        setError('Failed to update subscription');
      }
    } catch (error: any) {
      console.error('Failed to update subscription:', error);
      setError(error.response?.data?.message || 'Failed to update subscription');
    } finally {
      setUpdating(false);
    }
  };

  const formatDate = (dateString: string | null) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const getDaysRemaining = (endDate: string | null) => {
    if (!endDate) return null;
    const end = new Date(endDate);
    const now = new Date();
    const diff = end.getTime() - now.getTime();
    const days = Math.ceil(diff / (1000 * 60 * 60 * 24));
    return days > 0 ? days : 0;
  };

  const plans = [
    {
      type: 'free' as const,
      name: 'Free',
      price: '$0',
      period: 'Forever',
      features: [
        'Basic quiz access',
        'Limited questions per quiz',
        'Progress tracking',
        'Community support'
      ],
      color: '#718096'
    },
    {
      type: 'premium' as const,
      name: 'Premium',
      price: '$9.99',
      period: 'per month',
      features: [
        'Unlimited quizzes',
        'All questions access',
        'Advanced progress tracking',
        'Priority support',
        'Detailed analytics',
        'Custom quiz creation'
      ],
      color: '#667eea',
      popular: true
    },
    {
      type: 'enterprise' as const,
      name: 'Enterprise',
      price: '$29.99',
      period: 'per month',
      features: [
        'Everything in Premium',
        'Team collaboration',
        'Custom branding',
        'API access',
        'Dedicated support',
        'Advanced reporting',
        'Bulk user management'
      ],
      color: '#9f7aea'
    }
  ];

  if (loading) {
    return (
      <div className="subscription-page" style={{ padding: '2rem', textAlign: 'center' }}>
        <h1>Subscription</h1>
        <p>Loading subscription information...</p>
      </div>
    );
  }

  return (
    <div className="subscription-page fade-in" style={{ 
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
        <h1 style={{ margin: 0 }}>💎 Subscription</h1>
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

      {error && (
        <div style={{ 
          padding: '1rem', 
          backgroundColor: '#fee', 
          color: '#c33', 
          borderRadius: '4px',
          marginBottom: '1rem',
          border: '1px solid #fcc'
        }}>
          {error}
        </div>
      )}

      {success && (
        <div style={{ 
          padding: '1rem', 
          backgroundColor: '#efe', 
          color: '#3c3', 
          borderRadius: '4px',
          marginBottom: '1rem',
          border: '1px solid #cfc'
        }}>
          {success}
        </div>
      )}

      {/* Current Subscription Status */}
      {subscription && (
        <div style={{
          backgroundColor: 'white',
          padding: '1.5rem',
          borderRadius: '8px',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
          marginBottom: '2rem'
        }}>
          <h2 style={{ marginTop: 0, marginBottom: '1rem', color: '#333' }}>Current Subscription</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
            <div>
              <div style={{ color: '#666', fontSize: '0.9rem', marginBottom: '0.25rem' }}>Plan</div>
              <div style={{ 
                fontSize: '1.25rem', 
                fontWeight: 'bold', 
                color: '#333',
                textTransform: 'capitalize'
              }}>
                {subscription.type}
              </div>
            </div>
            <div>
              <div style={{ color: '#666', fontSize: '0.9rem', marginBottom: '0.25rem' }}>Status</div>
              <div style={{ 
                fontSize: '1.25rem', 
                fontWeight: 'bold', 
                color: subscription.isActive ? '#48bb78' : '#f56565'
              }}>
                {subscription.isActive ? 'Active' : 'Inactive'}
              </div>
            </div>
            <div>
              <div style={{ color: '#666', fontSize: '0.9rem', marginBottom: '0.25rem' }}>Start Date</div>
              <div style={{ fontSize: '1rem', color: '#333' }}>
                {formatDate(subscription.startDate)}
              </div>
            </div>
            {subscription.endDate && (
              <div>
                <div style={{ color: '#666', fontSize: '0.9rem', marginBottom: '0.25rem' }}>End Date</div>
                <div style={{ fontSize: '1rem', color: '#333' }}>
                  {formatDate(subscription.endDate)}
                </div>
                {getDaysRemaining(subscription.endDate) !== null && (
                  <div style={{ 
                    fontSize: '0.85rem', 
                    color: getDaysRemaining(subscription.endDate)! > 7 ? '#48bb78' : '#ed8936',
                    marginTop: '0.25rem'
                  }}>
                    {getDaysRemaining(subscription.endDate)} days remaining
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Subscription Plans */}
      <div>
        <h2 style={{ marginBottom: '1.5rem', color: '#333' }}>Available Plans</h2>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '1.5rem',
          marginBottom: '2rem'
        }}>
          {plans.map((plan) => {
            const isCurrentPlan = subscription?.type === plan.type;
            const isUpgrade = subscription ? (
              (subscription.type === 'free' && plan.type !== 'free') ||
              (subscription.type === 'premium' && plan.type === 'enterprise')
            ) : false;
            const isDowngrade = subscription ? (
              (subscription.type === 'enterprise' && plan.type === 'premium') ||
              (subscription.type === 'premium' && plan.type === 'free') ||
              (subscription.type === 'enterprise' && plan.type === 'free')
            ) : false;

            return (
              <div
                key={plan.type}
                style={{
                  backgroundColor: 'white',
                  padding: '2rem',
                  borderRadius: '8px',
                  boxShadow: plan.popular ? '0 4px 12px rgba(102, 126, 234, 0.3)' : '0 2px 4px rgba(0,0,0,0.1)',
                  border: plan.popular ? `2px solid ${plan.color}` : '1px solid #e2e8f0',
                  position: 'relative',
                  display: 'flex',
                  flexDirection: 'column'
                }}
              >
                {plan.popular && (
                  <div style={{
                    position: 'absolute',
                    top: '-12px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    backgroundColor: plan.color,
                    color: 'white',
                    padding: '0.25rem 1rem',
                    borderRadius: '20px',
                    fontSize: '0.75rem',
                    fontWeight: 'bold'
                  }}>
                    MOST POPULAR
                  </div>
                )}

                <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
                  <h3 style={{ 
                    margin: '0 0 0.5rem 0', 
                    color: '#333',
                    fontSize: '1.5rem',
                    textTransform: 'capitalize'
                  }}>
                    {plan.name}
                  </h3>
                  <div style={{ marginBottom: '0.5rem' }}>
                    <span style={{ 
                      fontSize: '2rem', 
                      fontWeight: 'bold', 
                      color: plan.color 
                    }}>
                      {plan.price}
                    </span>
                    {plan.period !== 'Forever' && (
                      <span style={{ color: '#666', fontSize: '0.9rem' }}> / {plan.period}</span>
                    )}
                  </div>
                  {plan.period === 'Forever' && (
                    <div style={{ color: '#666', fontSize: '0.9rem' }}>Free Forever</div>
                  )}
                </div>

                <ul style={{
                  listStyle: 'none',
                  padding: 0,
                  margin: '0 0 1.5rem 0',
                  flex: 1
                }}>
                  {plan.features.map((feature, index) => (
                    <li key={index} style={{
                      padding: '0.5rem 0',
                      color: '#666',
                      fontSize: '0.9rem',
                      display: 'flex',
                      alignItems: 'center'
                    }}>
                      <span style={{ 
                        color: plan.color, 
                        marginRight: '0.5rem',
                        fontWeight: 'bold'
                      }}>✓</span>
                      {feature}
                    </li>
                  ))}
                </ul>

                <button
                  onClick={() => handleUpgrade(plan.type)}
                  disabled={updating || isCurrentPlan}
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    backgroundColor: isCurrentPlan ? '#cbd5e0' : plan.color,
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: isCurrentPlan || updating ? 'not-allowed' : 'pointer',
                    fontSize: '1rem',
                    fontWeight: 'bold',
                    opacity: isCurrentPlan ? 0.6 : 1,
                    transition: 'opacity 0.2s'
                  }}
                >
                  {updating ? 'Updating...' : 
                   isCurrentPlan ? 'Current Plan' :
                   isUpgrade ? 'Upgrade' :
                   isDowngrade ? 'Downgrade' :
                   'Select Plan'}
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* Note */}
      <div style={{
        backgroundColor: '#f7fafc',
        padding: '1rem',
        borderRadius: '4px',
        border: '1px solid #e2e8f0',
        fontSize: '0.9rem',
        color: '#666'
      }}>
        <strong>Note:</strong> This is a demo application. In a production environment, subscription changes would require payment processing integration (e.g., Stripe, PayPal).
      </div>
    </div>
  );
};

export default Subscription;
