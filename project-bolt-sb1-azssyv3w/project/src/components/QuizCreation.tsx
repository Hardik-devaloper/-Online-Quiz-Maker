import React, { useState } from 'react';
import { Plus, Trash2, Save, ArrowLeft } from 'lucide-react';
import { User, Quiz, QuizQuestion } from '../types';

interface QuizCreationProps {
  user: User;
  onQuizCreated: () => void;
}

const QuizCreation: React.FC<QuizCreationProps> = ({ user, onQuizCreated }) => {
  const [quizData, setQuizData] = useState({
    title: '',
    description: '',
    category: ''
  });
  
  const [questions, setQuestions] = useState<QuizQuestion[]>([
    {
      id: '1',
      question: '',
      options: ['', '', '', ''],
      correctAnswer: 0
    }
  ]);

  const categories = [
    'Science', 'History', 'Technology', 'Sports', 'Art', 'Music',
    'Literature', 'Geography', 'Mathematics', 'Movies', 'General Knowledge'
  ];

  const handleQuizDataChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setQuizData({
      ...quizData,
      [e.target.name]: e.target.value
    });
  };

  const handleQuestionChange = (questionId: string, field: string, value: string) => {
    setQuestions(questions.map(q => 
      q.id === questionId ? { ...q, [field]: value } : q
    ));
  };

  const handleOptionChange = (questionId: string, optionIndex: number, value: string) => {
    setQuestions(questions.map(q => 
      q.id === questionId 
        ? { ...q, options: q.options.map((opt, idx) => idx === optionIndex ? value : opt) }
        : q
    ));
  };

  const handleCorrectAnswerChange = (questionId: string, correctAnswer: number) => {
    setQuestions(questions.map(q => 
      q.id === questionId ? { ...q, correctAnswer } : q
    ));
  };

  const addQuestion = () => {
    const newQuestion: QuizQuestion = {
      id: Date.now().toString(),
      question: '',
      options: ['', '', '', ''],
      correctAnswer: 0
    };
    setQuestions([...questions, newQuestion]);
  };

  const removeQuestion = (questionId: string) => {
    if (questions.length > 1) {
      setQuestions(questions.filter(q => q.id !== questionId));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (!quizData.title || !quizData.description || !quizData.category) {
      alert('Please fill in all quiz details');
      return;
    }

    const incompleteQuestions = questions.filter(q => 
      !q.question || q.options.some(opt => !opt)
    );

    if (incompleteQuestions.length > 0) {
      alert('Please complete all questions and options');
      return;
    }

    const quiz: Quiz = {
      id: Date.now().toString(),
      title: quizData.title,
      description: quizData.description,
      category: quizData.category,
      questions: questions,
      createdBy: user.id,
      createdAt: new Date()
    };

    // Save to localStorage
    const existingQuizzes = JSON.parse(localStorage.getItem('quizzes') || '[]');
    existingQuizzes.push(quiz);
    localStorage.setItem('quizzes', JSON.stringify(existingQuizzes));

    alert('Quiz created successfully!');
    onQuizCreated();
  };

  return (
    <div className="max-w-4xl mx-auto animate-fade-in">
      <div className="mb-8">
        <div className="flex items-center space-x-4 mb-4">
          <button
            onClick={onQuizCreated}
            className="text-gray-600 hover:text-gray-800 transition-colors"
          >
            <ArrowLeft className="h-6 w-6" />
          </button>
          <h1 className="text-3xl font-bold text-gray-900">Create New Quiz</h1>
        </div>
        <p className="text-gray-600">Build an engaging quiz for your audience</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Quiz Details */}
        <div className="card">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Quiz Details</h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="form-label">Quiz Title</label>
              <input
                type="text"
                name="title"
                value={quizData.title}
                onChange={handleQuizDataChange}
                className="input-field"
                placeholder="Enter an engaging title"
                required
              />
            </div>
            
            <div>
              <label className="form-label">Category</label>
              <select
                name="category"
                value={quizData.category}
                onChange={handleQuizDataChange}
                className="input-field"
                required
              >
                <option value="">Select a category</option>
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>
          </div>
          
          <div className="mt-6">
            <label className="form-label">Description</label>
            <textarea
              name="description"
              value={quizData.description}
              onChange={handleQuizDataChange}
              className="input-field"
              rows={3}
              placeholder="Describe what your quiz is about"
              required
            />
          </div>
        </div>

        {/* Questions */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-900">Questions</h2>
            <button
              type="button"
              onClick={addQuestion}
              className="btn-primary flex items-center space-x-2"
            >
              <Plus className="h-5 w-5" />
              <span>Add Question</span>
            </button>
          </div>

          {questions.map((question, index) => (
            <div key={question.id} className="card">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-medium text-gray-900">
                  Question {index + 1}
                </h3>
                {questions.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeQuestion(question.id)}
                    className="text-red-600 hover:text-red-700 transition-colors"
                  >
                    <Trash2 className="h-5 w-5" />
                  </button>
                )}
              </div>

              <div className="space-y-4">
                <div>
                  <label className="form-label">Question</label>
                  <input
                    type="text"
                    value={question.question}
                    onChange={(e) => handleQuestionChange(question.id, 'question', e.target.value)}
                    className="input-field"
                    placeholder="Enter your question"
                    required
                  />
                </div>

                <div>
                  <label className="form-label">Options</label>
                  <div className="grid md:grid-cols-2 gap-4">
                    {question.options.map((option, optionIndex) => (
                      <div key={optionIndex} className="flex items-center space-x-3">
                        <input
                          type="radio"
                          name={`correct-${question.id}`}
                          checked={question.correctAnswer === optionIndex}
                          onChange={() => handleCorrectAnswerChange(question.id, optionIndex)}
                          className="text-blue-600"
                        />
                        <input
                          type="text"
                          value={option}
                          onChange={(e) => handleOptionChange(question.id, optionIndex, e.target.value)}
                          className="input-field"
                          placeholder={`Option ${optionIndex + 1}`}
                          required
                        />
                      </div>
                    ))}
                  </div>
                  <p className="text-sm text-gray-600 mt-2">
                    Select the radio button next to the correct answer
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Submit Button */}
        <div className="flex justify-center">
          <button
            type="submit"
            className="btn-success flex items-center space-x-2 px-8 py-4 text-lg"
          >
            <Save className="h-5 w-5" />
            <span>Create Quiz</span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default QuizCreation;