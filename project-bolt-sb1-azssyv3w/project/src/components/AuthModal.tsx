import React, { useState } from 'react';
import { X, Mail, Lock, User as UserIcon } from 'lucide-react';
import { User } from '../types';

interface AuthModalProps {
  onClose: () => void;
  onLogin: (user: User) => void;
}

const AuthModal: React.FC<AuthModalProps> = ({ onClose, onLogin }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isLogin && formData.password !== formData.confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    if (!formData.email || !formData.password) {
      alert('Please fill in all required fields');
      return;
    }

    if (!isLogin && !formData.name) {
      alert('Please enter your name');
      return;
    }

    // In a real app, you'd validate with a backend
    const users = JSON.parse(localStorage.getItem('quizUsers') || '[]');
    
    if (isLogin) {
      const user = users.find((u: any) => u.email === formData.email);
      if (user && user.password === formData.password) {
        onLogin({ id: user.id, name: user.name, email: user.email });
      } else {
        alert('Invalid credentials');
      }
    } else {
      // Register
      const existingUser = users.find((u: any) => u.email === formData.email);
      if (existingUser) {
        alert('User already exists');
        return;
      }
      
      const newUser = {
        id: Date.now().toString(),
        name: formData.name,
        email: formData.email,
        password: formData.password
      };
      
      users.push(newUser);
      localStorage.setItem('quizUsers', JSON.stringify(users));
      onLogin({ id: newUser.id, name: newUser.name, email: newUser.email });
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl p-8 max-w-md w-full animate-slide-up">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900">
            {isLogin ? 'Login' : 'Register'}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <div>
              <label className="form-label">Full Name</label>
              <div className="relative">
                <UserIcon className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="input-field pl-12"
                  placeholder="Enter your full name"
                  required={!isLogin}
                />
              </div>
            </div>
          )}

          <div>
            <label className="form-label">Email</label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="input-field pl-12"
                placeholder="Enter your email"
                required
              />
            </div>
          </div>

          <div>
            <label className="form-label">Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="input-field pl-12"
                placeholder="Enter your password"
                required
              />
            </div>
          </div>

          {!isLogin && (
            <div>
              <label className="form-label">Confirm Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="input-field pl-12"
                  placeholder="Confirm your password"
                  required={!isLogin}
                />
              </div>
            </div>
          )}

          <button type="submit" className="btn-primary w-full">
            {isLogin ? 'Login' : 'Register'}
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-gray-600">
            {isLogin ? "Don't have an account?" : "Already have an account?"}
          </p>
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="text-blue-600 hover:text-blue-700 font-medium"
          >
            {isLogin ? 'Sign up' : 'Login'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AuthModal;