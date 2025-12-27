import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../services/api';
import { API_ENDPOINTS } from '../config/api';

const QuizTake: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [quiz, setQuiz] = useState<any>(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [timeLeft, setTimeLeft] = useState(1800); // 30 minutes in seconds
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        const response = await api.get(API_ENDPOINTS.QUIZ.GET_BY_ID(id!));
        if (response.data.success) {
          setQuiz(response.data.data);
          setAnswers(new Array(response.data.data.questions.length).fill(null));
        }
      } catch (error) {
        console.error('Failed to fetch quiz:', error);
      } finally {
        setLoading(false);
      }
    };
    if (id) fetchQuiz();
  }, [id]);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          handleSubmit();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleAnswer = (answerIndex: number) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = answerIndex;
    setAnswers(newAnswers);
  };

  const handleSubmit = async () => {
    try {
      const response = await api.post(API_ENDPOINTS.QUIZ.SUBMIT(id!), {
        answers,
        timeSpent: 1800 - timeLeft,
      });
      if (response.data.success) {
        navigate(`/quiz/${id}/results`);
      }
    } catch (error) {
      console.error('Failed to submit quiz:', error);
    }
  };

  if (loading || !quiz) return <div className="loading">⏳ Loading quiz...</div>;

  const question = quiz.questions[currentQuestion]?.question;

  return (
    <div className="quiz-take fade-in">
      <div className="quiz-header">
        <h2>📝 Question {currentQuestion + 1} of {quiz.questions.length}</h2>
        <div className="timer">⏱️ {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}</div>
      </div>

      <div className="question-card">
        <h3>{question?.question}</h3>
        <div className="options">
          {question?.options.map((option: string, index: number) => (
            <button
              key={index}
              className={`option ${answers[currentQuestion] === index ? 'selected' : ''}`}
              onClick={() => handleAnswer(index)}
            >
              {option}
            </button>
          ))}
        </div>
      </div>

      <div className="quiz-navigation">
        <button
          onClick={() => setCurrentQuestion(Math.min(quiz.questions.length - 1, currentQuestion + 1))}
          disabled={currentQuestion === quiz.questions.length - 1}
        >
          Next
        </button>
        {currentQuestion === quiz.questions.length - 1 && (
          <button onClick={handleSubmit} className="btn-primary">
            Submit Quiz
          </button>
        )}
      </div>
    </div>
  );
};

export default QuizTake;


