import React from 'react';
import { PlusCircle, PlayCircle, Trophy, Users, BookOpen, Star } from 'lucide-react';
import { User } from '../types';

interface HomePageProps {
  onNavigate: (view: string) => void;
  user: User | null;
  onShowAuth: () => void;
}

const HomePage: React.FC<HomePageProps> = ({ onNavigate, user, onShowAuth }) => {
  const handleCreateQuiz = () => {
    if (user) {
      onNavigate('create');
    } else {
      onShowAuth();
    }
  };

  return (
    <div className="animate-fade-in">
      {/* Hero Section */}
      <div className="text-center py-12 mb-12">
        <h1 className="text-5xl font-bold text-gray-900 mb-4 text-shadow">
          Welcome to <span className="text-blue-600">QuizMaster</span>
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
          Create engaging quizzes, test your knowledge, and compete with others. 
          The ultimate platform for learning and fun!
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={handleCreateQuiz}
            className="btn-primary flex items-center space-x-2"
          >
            <PlusCircle className="h-5 w-5" />
            <span>Create Quiz</span>
          </button>
          
          <button
            onClick={() => onNavigate('listing')}
            className="btn-secondary flex items-center space-x-2"
          >
            <PlayCircle className="h-5 w-5" />
            <span>Take Quiz</span>
          </button>
        </div>
      </div>

      {/* Features Section */}
      <div className="grid md:grid-cols-3 gap-8 mb-12">
        <div className="card text-center animate-slide-up">
          <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <BookOpen className="h-6 w-6 text-blue-600" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">Create Quizzes</h3>
          <p className="text-gray-600">
            Build comprehensive quizzes with multiple choice questions, 
            custom categories, and detailed explanations.
          </p>
        </div>
        
        <div className="card text-center animate-slide-up" style={{ animationDelay: '0.1s' }}>
          <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Trophy className="h-6 w-6 text-green-600" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">Test Knowledge</h3>
          <p className="text-gray-600">
            Challenge yourself with quizzes across various topics. 
            Get instant feedback and track your progress.
          </p>
        </div>
        
        <div className="card text-center animate-slide-up" style={{ animationDelay: '0.2s' }}>
          <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Users className="h-6 w-6 text-purple-600" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">Share & Compete</h3>
          <p className="text-gray-600">
            Share your quizzes with friends and compete for the highest scores. 
            Build a community of learners.
          </p>
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-white rounded-2xl shadow-lg p-8 mb-12">
        <h2 className="text-2xl font-bold text-gray-900 text-center mb-8">Platform Statistics</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-600 mb-2">500+</div>
            <div className="text-sm text-gray-600">Quizzes Created</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-green-600 mb-2">10K+</div>
            <div className="text-sm text-gray-600">Questions Answered</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-purple-600 mb-2">1K+</div>
            <div className="text-sm text-gray-600">Active Users</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-orange-600 mb-2">50+</div>
            <div className="text-sm text-gray-600">Categories</div>
          </div>
        </div>
      </div>

      {/* Popular Categories */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 text-center mb-8">Popular Categories</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {[
            { name: 'Science', icon: '🧪', color: 'bg-blue-100 text-blue-800' },
            { name: 'History', icon: '📚', color: 'bg-amber-100 text-amber-800' },
            { name: 'Technology', icon: '💻', color: 'bg-green-100 text-green-800' },
            { name: 'Sports', icon: '⚽', color: 'bg-red-100 text-red-800' },
            { name: 'Art', icon: '🎨', color: 'bg-purple-100 text-purple-800' },
            { name: 'Music', icon: '🎵', color: 'bg-pink-100 text-pink-800' },
          ].map((category) => (
            <div
              key={category.name}
              className={`${category.color} rounded-lg p-4 text-center cursor-pointer hover:shadow-md transition-shadow`}
              onClick={() => onNavigate('listing')}
            >
              <div className="text-2xl mb-2">{category.icon}</div>
              <div className="font-medium">{category.name}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Call to Action */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-center text-white">
        <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
        <p className="text-xl mb-6 opacity-90">
          Join thousands of learners and quiz creators in our community
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={handleCreateQuiz}
            className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
          >
            Create Your First Quiz
          </button>
          <button
            onClick={() => onNavigate('listing')}
            className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors"
          >
            Browse Quizzes
          </button>
        </div>
      </div>
    </div>
  );
};

export default HomePage;