import React, { useState, useEffect } from 'react';
import { ArrowLeft, ArrowRight, CheckCircle, Clock } from 'lucide-react';
import { Quiz } from '../types';

interface QuizTakingProps {
  quiz: Quiz;
  onComplete: (results: any) => void;
}

const QuizTaking: React.FC<QuizTakingProps> = ({ quiz, onComplete }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<number[]>(new Array(quiz.questions.length).fill(-1));
  const [timeLeft, setTimeLeft] = useState(quiz.questions.length * 30); // 30 seconds per question
  const [isCompleted, setIsCompleted] = useState(false);

  useEffect(() => {
    if (timeLeft > 0 && !isCompleted) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && !isCompleted) {
      handleComplete();
    }
  }, [timeLeft, isCompleted]);

  const handleAnswerSelect = (answerIndex: number) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = answerIndex;
    setAnswers(newAnswers);
  };

  const handleNext = () => {
    if (currentQuestion < quiz.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      handleComplete();
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleComplete = () => {
    setIsCompleted(true);
    
    let score = 0;
    const results = quiz.questions.map((question, index) => {
      const isCorrect = answers[index] === question.correctAnswer;
      if (isCorrect) score++;
      
      return {
        question: question.question,
        options: question.options,
        selectedAnswer: answers[index],
        correctAnswer: question.correctAnswer,
        isCorrect
      };
    });

    const finalResults = {
      quiz: quiz,
      score: score,
      totalQuestions: quiz.questions.length,
      percentage: Math.round((score / quiz.questions.length) * 100),
      results: results,
      timeTaken: (quiz.questions.length * 30) - timeLeft
    };

    onComplete(finalResults);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const currentQ = quiz.questions[currentQuestion];
  const progress = ((currentQuestion + 1) / quiz.questions.length) * 100;

  return (
    <div className="max-w-4xl mx-auto animate-fade-in">
      {/* Header */}
      <div className="card mb-8">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{quiz.title}</h1>
            <p className="text-gray-600">
              Question {currentQuestion + 1} of {quiz.questions.length}
            </p>
          </div>
          <div className="flex items-center space-x-2 text-blue-600">
            <Clock className="h-5 w-5" />
            <span className="font-mono text-lg">{formatTime(timeLeft)}</span>
          </div>
        </div>
        
        {/* Progress Bar */}
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-blue-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Question */}
      <div className="card mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">
          {currentQ.question}
        </h2>
        
        <div className="space-y-3">
          {currentQ.options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleAnswerSelect(index)}
              className={`quiz-option ${answers[currentQuestion] === index ? 'selected' : ''}`}
            >
              <div className="flex items-center">
                <div className={`w-4 h-4 rounded-full border-2 mr-3 flex items-center justify-center ${
                  answers[currentQuestion] === index 
                    ? 'border-blue-500 bg-blue-500' 
                    : 'border-gray-300'
                }`}>
                  {answers[currentQuestion] === index && (
                    <div className="w-2 h-2 bg-white rounded-full" />
                  )}
                </div>
                <span className="text-left">{option}</span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Navigation */}
      <div className="flex justify-between items-center">
        <button
          onClick={handlePrevious}
          disabled={currentQuestion === 0}
          className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-medium transition-all ${
            currentQuestion === 0 
              ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          <ArrowLeft className="h-5 w-5" />
          <span>Previous</span>
        </button>

        <div className="flex space-x-2">
          {quiz.questions.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentQuestion(index)}
              className={`w-8 h-8 rounded-full text-sm font-medium transition-all ${
                index === currentQuestion
                  ? 'bg-blue-600 text-white'
                  : answers[index] !== -1
                  ? 'bg-green-100 text-green-600'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {index + 1}
            </button>
          ))}
        </div>

        <button
          onClick={handleNext}
          disabled={answers[currentQuestion] === -1}
          className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-medium transition-all ${
            answers[currentQuestion] === -1
              ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
              : currentQuestion === quiz.questions.length - 1
              ? 'bg-green-600 text-white hover:bg-green-700'
              : 'bg-blue-600 text-white hover:bg-blue-700'
          }`}
        >
          <span>
            {currentQuestion === quiz.questions.length - 1 ? 'Finish' : 'Next'}
          </span>
          {currentQuestion === quiz.questions.length - 1 ? (
            <CheckCircle className="h-5 w-5" />
          ) : (
            <ArrowRight className="h-5 w-5" />
          )}
        </button>
      </div>
    </div>
  );
};

export default QuizTaking;