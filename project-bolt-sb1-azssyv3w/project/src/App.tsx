import React, { useState, useEffect } from 'react';
import { BrainCircuit, User, LogOut } from 'lucide-react';
import HomePage from './components/HomePage';
import QuizCreation from './components/QuizCreation';
import QuizListing from './components/QuizListing';
import QuizTaking from './components/QuizTaking';
import QuizResults from './components/QuizResults';
import AuthModal from './components/AuthModal';
import { Quiz, User as UserType } from './types';

function App() {
  const [currentView, setCurrentView] = useState('home');
  const [user, setUser] = useState<UserType | null>(null);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [selectedQuiz, setSelectedQuiz] = useState<Quiz | null>(null);
  const [quizResults, setQuizResults] = useState<any>(null);

  useEffect(() => {
    const savedUser = localStorage.getItem('quizUser');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const handleLogin = (userData: UserType) => {
    setUser(userData);
    localStorage.setItem('quizUser', JSON.stringify(userData));
    setShowAuthModal(false);
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('quizUser');
    setCurrentView('home');
  };

  const handleStartQuiz = (quiz: Quiz) => {
    setSelectedQuiz(quiz);
    setCurrentView('taking');
  };

  const handleQuizComplete = (results: any) => {
    setQuizResults(results);
    setCurrentView('results');
  };

  const handleViewChange = (view: string) => {
    setCurrentView(view);
    setSelectedQuiz(null);
    setQuizResults(null);
  };

  return (
    <div className="min-h-screen gradient-bg">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div 
              className="flex items-center space-x-2 cursor-pointer"
              onClick={() => handleViewChange('home')}
            >
              <BrainCircuit className="h-8 w-8 text-blue-600" />
              <span className="text-xl font-bold text-gray-900">QuizMaster</span>
            </div>
            
            <nav className="hidden md:flex space-x-8">
              <button 
                onClick={() => handleViewChange('home')}
                className={`text-gray-700 hover:text-blue-600 transition-colors ${currentView === 'home' ? 'text-blue-600 font-medium' : ''}`}
              >
                Home
              </button>
              <button 
                onClick={() => handleViewChange('listing')}
                className={`text-gray-700 hover:text-blue-600 transition-colors ${currentView === 'listing' ? 'text-blue-600 font-medium' : ''}`}
              >
                Browse Quizzes
              </button>
              {user && (
                <button 
                  onClick={() => handleViewChange('create')}
                  className={`text-gray-700 hover:text-blue-600 transition-colors ${currentView === 'create' ? 'text-blue-600 font-medium' : ''}`}
                >
                  Create Quiz
                </button>
              )}
            </nav>
            
            <div className="flex items-center space-x-4">
              {user ? (
                <div className="flex items-center space-x-3">
                  <div className="flex items-center space-x-2">
                    <User className="h-5 w-5 text-gray-600" />
                    <span className="text-sm font-medium text-gray-700">{user.name}</span>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="text-gray-600 hover:text-red-600 transition-colors"
                    title="Logout"
                  >
                    <LogOut className="h-5 w-5" />
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setShowAuthModal(true)}
                  className="btn-primary"
                >
                  Login / Register
                </button>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {currentView === 'home' && (
          <HomePage 
            onNavigate={handleViewChange} 
            user={user}
            onShowAuth={() => setShowAuthModal(true)}
          />
        )}
        
        {currentView === 'create' && user && (
          <QuizCreation 
            user={user}
            onQuizCreated={() => handleViewChange('listing')}
          />
        )}
        
        {currentView === 'listing' && (
          <QuizListing 
            onStartQuiz={handleStartQuiz}
            user={user}
            onShowAuth={() => setShowAuthModal(true)}
          />
        )}
        
        {currentView === 'taking' && selectedQuiz && (
          <QuizTaking 
            quiz={selectedQuiz}
            onComplete={handleQuizComplete}
          />
        )}
        
        {currentView === 'results' && quizResults && (
          <QuizResults 
            results={quizResults}
            onReturnHome={() => handleViewChange('home')}
            onBrowseQuizzes={() => handleViewChange('listing')}
          />
        )}
      </main>

      {/* Auth Modal */}
      {showAuthModal && (
        <AuthModal 
          onClose={() => setShowAuthModal(false)}
          onLogin={handleLogin}
        />
      )}
    </div>
  );
}

export default App;