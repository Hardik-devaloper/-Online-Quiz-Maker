import React, { useState, useEffect } from 'react';
import { Search, Filter, PlayCircle, User, Calendar, BookOpen, Star } from 'lucide-react';
import { Quiz, User as UserType } from '../types';

interface QuizListingProps {
  onStartQuiz: (quiz: Quiz) => void;
  user: UserType | null;
  onShowAuth: () => void;
}

const QuizListing: React.FC<QuizListingProps> = ({ onStartQuiz, user, onShowAuth }) => {
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [sortBy, setSortBy] = useState('newest');

  const categories = [
    'Science', 'History', 'Technology', 'Sports', 'Art', 'Music',
    'Literature', 'Geography', 'Mathematics', 'Movies', 'General Knowledge'
  ];

  useEffect(() => {
    const savedQuizzes = JSON.parse(localStorage.getItem('quizzes') || '[]');
    setQuizzes(savedQuizzes);
  }, []);

  const filteredQuizzes = quizzes
    .filter(quiz => 
      quiz.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      quiz.description.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter(quiz => 
      selectedCategory === '' || quiz.category === selectedCategory
    )
    .sort((a, b) => {
      switch (sortBy) {
        case 'newest':
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        case 'oldest':
          return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
        case 'title':
          return a.title.localeCompare(b.title);
        default:
          return 0;
      }
    });

  const handleStartQuiz = (quiz: Quiz) => {
    if (!user) {
      onShowAuth();
      return;
    }
    onStartQuiz(quiz);
  };

  const getCreatorName = (creatorId: string) => {
    const users = JSON.parse(localStorage.getItem('quizUsers') || '[]');
    const creator = users.find((u: any) => u.id === creatorId);
    return creator ? creator.name : 'Unknown';
  };

  return (
    <div className="animate-fade-in">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Browse Quizzes</h1>
        <p className="text-gray-600">Discover and take amazing quizzes created by our community</p>
      </div>

      {/* Search and Filters */}
      <div className="card mb-8">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="input-field pl-12"
              placeholder="Search quizzes..."
            />
          </div>
          
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="input-field"
          >
            <option value="">All Categories</option>
            {categories.map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
          
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="input-field"
          >
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
            <option value="title">Title A-Z</option>
          </select>
        </div>
      </div>

      {/* Quiz Grid */}
      {filteredQuizzes.length === 0 ? (
        <div className="text-center py-12">
          <BookOpen className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-900 mb-2">No quizzes found</h3>
          <p className="text-gray-600">
            {searchTerm || selectedCategory 
              ? 'Try adjusting your search or filters'
              : 'Be the first to create a quiz!'
            }
          </p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredQuizzes.map((quiz) => (
            <div key={quiz.id} className="card hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
              <div className="mb-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="inline-block px-3 py-1 bg-blue-100 text-blue-800 text-sm font-medium rounded-full">
                    {quiz.category}
                  </span>
                  <div className="flex items-center space-x-1 text-yellow-500">
                    <Star className="h-4 w-4 fill-current" />
                    <span className="text-sm text-gray-600">4.5</span>
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{quiz.title}</h3>
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">{quiz.description}</p>
              </div>
              
              <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
                <div className="flex items-center space-x-1">
                  <User className="h-4 w-4" />
                  <span>{getCreatorName(quiz.createdBy)}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Calendar className="h-4 w-4" />
                  <span>{new Date(quiz.createdAt).toLocaleDateString()}</span>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="text-sm text-gray-600">
                  <span className="font-medium">{quiz.questions.length}</span> questions
                </div>
                <button
                  onClick={() => handleStartQuiz(quiz)}
                  className="btn-primary flex items-center space-x-2"
                >
                  <PlayCircle className="h-4 w-4" />
                  <span>Start Quiz</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default QuizListing;