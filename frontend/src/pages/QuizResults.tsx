import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../services/api';
import { API_ENDPOINTS } from '../config/api';

const QuizResults: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [quiz, setQuiz] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        const response = await api.get(API_ENDPOINTS.QUIZ.GET_BY_ID(id!));
        if (response.data.success) {
          setQuiz(response.data.data);
        }
      } catch (error) {
        console.error('Failed to fetch quiz results:', error);
      } finally {
        setLoading(false);
      }
    };
    if (id) fetchQuiz();
  }, [id]);

  const handleRetake = async () => {
    try {
      const response = await api.post(API_ENDPOINTS.QUIZ.RETAKE(id!));
      if (response.data.success) {
        navigate(`/quiz/${response.data.data._id}`);
      }
    } catch (error) {
      console.error('Failed to retake quiz:', error);
    }
  };

  if (loading || !quiz) return <div>Loading results...</div>;

  return (
    <div className="quiz-results">
      <h1>Quiz Results</h1>
      <div className="score-card">
        <h2>Your Score: {quiz.score.correct} / {quiz.score.total}</h2>
        <h3>{quiz.score.percentage}%</h3>
      </div>

      <div className="questions-review">
        {quiz.questions.map((qItem: any, index: number) => (
          <div key={index} className={`question-review ${qItem.isCorrect ? 'correct' : 'incorrect'}`}>
            <h4>Question {index + 1}</h4>
            <p>{qItem.question.question}</p>
            <div className="answers">
              <div className="your-answer">
                <strong>Your Answer:</strong> {qItem.question.options[qItem.selectedAnswer]}
                {qItem.isCorrect ? ' ✅' : ' ❌'}
              </div>
              {!qItem.isCorrect && (
                <div className="correct-answer">
                  <strong>Correct Answer:</strong> {qItem.question.options[qItem.question.correctAnswer]}
                </div>
              )}
              <div className="explanation">
                <strong>Explanation:</strong> {qItem.question.explanation}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="actions">
        <button onClick={handleRetake} className="btn-primary">Retake Quiz</button>
        <button onClick={() => navigate('/dashboard')} className="btn-secondary">Back to Dashboard</button>
      </div>
    </div>
  );
};

export default QuizResults;


