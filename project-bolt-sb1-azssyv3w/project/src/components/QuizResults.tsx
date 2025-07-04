import React from 'react';
import { Trophy, RotateCcw, Home, Share2, Award, Target } from 'lucide-react';

interface QuizResultsProps {
  results: any;
  onReturnHome: () => void;
  onBrowseQuizzes: () => void;
}

const QuizResults: React.FC<QuizResultsProps> = ({ results, onReturnHome, onBrowseQuizzes }) => {
  const getScoreColor = (percentage: number) => {
    if (percentage >= 80) return 'text-green-600';
    if (percentage >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreMessage = (percentage: number) => {
    if (percentage >= 90) return 'Outstanding! 🎉';
    if (percentage >= 80) return 'Great job! 👏';
    if (percentage >= 70) return 'Good work! 👍';
    if (percentage >= 60) return 'Not bad! 🙂';
    return 'Keep practicing! 💪';
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="max-w-4xl mx-auto animate-fade-in">
      {/* Results Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-20 h-20 bg-blue-100 rounded-full mb-4">
          <Trophy className="h-10 w-10 text-blue-600" />
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Quiz Complete!</h1>
        <p className="text-gray-600">Here's how you performed on "{results.quiz.title}"</p>
      </div>

      {/* Score Summary */}
      <div className="card mb-8">
        <div className="text-center mb-6">
          <div className={`text-6xl font-bold mb-2 ${getScoreColor(results.percentage)}`}>
            {results.percentage}%
          </div>
          <div className="text-xl text-gray-600 mb-2">
            {results.score} out of {results.totalQuestions} correct
          </div>
          <div className="text-lg font-medium text-gray-900">
            {getScoreMessage(results.percentage)}
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center p-4 bg-blue-50 rounded-lg">
            <Target className="h-6 w-6 text-blue-600 mx-auto mb-2" />
            <div className="text-sm text-gray-600">Score</div>
            <div className="text-xl font-bold text-blue-600">{results.score}/{results.totalQuestions}</div>
          </div>
          
          <div className="text-center p-4 bg-green-50 rounded-lg">
            <Award className="h-6 w-6 text-green-600 mx-auto mb-2" />
            <div className="text-sm text-gray-600">Percentage</div>
            <div className="text-xl font-bold text-green-600">{results.percentage}%</div>
          </div>
          
          <div className="text-center p-4 bg-purple-50 rounded-lg">
            <RotateCcw className="h-6 w-6 text-purple-600 mx-auto mb-2" />
            <div className="text-sm text-gray-600">Time Taken</div>
            <div className="text-xl font-bold text-purple-600">{formatTime(results.timeTaken)}</div>
          </div>
          
          <div className="text-center p-4 bg-orange-50 rounded-lg">
            <Share2 className="h-6 w-6 text-orange-600 mx-auto mb-2" />
            <div className="text-sm text-gray-600">Questions</div>
            <div className="text-xl font-bold text-orange-600">{results.totalQuestions}</div>
          </div>
        </div>
      </div>

      {/* Detailed Results */}
      <div className="card mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">Detailed Results</h2>
        
        <div className="space-y-6">
          {results.results.map((result: any, index: number) => (
            <div key={index} className="border-b border-gray-200 pb-6 last:border-b-0">
              <div className="flex items-start justify-between mb-3">
                <h3 className="text-lg font-medium text-gray-900 flex-1 mr-4">
                  {index + 1}. {result.question}
                </h3>
                <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                  result.isCorrect 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-red-100 text-red-800'
                }`}>
                  {result.isCorrect ? 'Correct' : 'Incorrect'}
                </div>
              </div>
              
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-gray-700 mb-2">Your Answer:</p>
                  <div className={`p-3 rounded-lg ${
                    result.isCorrect ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'
                  }`}>
                    {result.selectedAnswer !== -1 ? result.options[result.selectedAnswer] : 'No answer selected'}
                  </div>
                </div>
                
                <div>
                  <p className="text-sm font-medium text-gray-700 mb-2">Correct Answer:</p>
                  <div className="p-3 rounded-lg bg-green-50 border border-green-200">
                    {result.options[result.correctAnswer]}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <button
          onClick={onBrowseQuizzes}
          className="btn-primary flex items-center space-x-2"
        >
          <RotateCcw className="h-5 w-5" />
          <span>Take Another Quiz</span>
        </button>
        
        <button
          onClick={onReturnHome}
          className="btn-secondary flex items-center space-x-2"
        >
          <Home className="h-5 w-5" />
          <span>Return Home</span>
        </button>
      </div>
    </div>
  );
};

export default QuizResults;