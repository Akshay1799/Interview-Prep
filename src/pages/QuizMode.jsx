import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import QuestionCard from '../components/QuestionCard'
import questionsData from '../data/questions.json'
import { getBookmarks } from '../utils/localStorageHelper'

export default function QuizMode() {
  const [questions, setQuestions] = useState([])
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [showAnswer, setShowAnswer] = useState(false)
  const [quizSource, setQuizSource] = useState('all')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    loadQuestions()
  }, [quizSource, selectedCategory])

  const loadQuestions = () => {
    setIsLoading(true)
    let quizQuestions = []

    if (quizSource === 'all') {
      quizQuestions = [...questionsData.questions]
    } else {
      quizQuestions = getBookmarks()
    }

    if (selectedCategory !== 'all') {
      quizQuestions = quizQuestions.filter(q => q.category === selectedCategory)
    }

    // Shuffle questions
    for (let i = quizQuestions.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[quizQuestions[i], quizQuestions[j]] = [quizQuestions[j], quizQuestions[i]]
    }

    setQuestions(quizQuestions)
    setCurrentQuestionIndex(0)
    setShowAnswer(false)
    setIsLoading(false)
  }

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1)
      setShowAnswer(false)
    }
  }

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1)
      setShowAnswer(false)
    }
  }

  const categories = ['all', ...new Set(questionsData.questions.map(q => q.category))]

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 dark:border-primary-400"></div>
      </div>
    )
  }

  return (
    <div className="flex flex-col h-full">
      <div className="flex-none space-y-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-dark-text mb-2">Quiz Mode</h1>
            <p className="text-gray-600 dark:text-dark-muted">Test your knowledge with interactive quizzes.</p>
          </div>
          <Link
            to="/"
            className="inline-flex items-center px-6 py-3 border border-gray-300 dark:border-dark-border text-base font-medium rounded-lg text-gray-700 dark:text-dark-text bg-white dark:bg-dark-card hover:bg-gray-50 dark:hover:bg-dark-hover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-colors duration-200"
          >
            Browse Questions
          </Link>
        </div>

        <div className="bg-white dark:bg-dark-card rounded-xl shadow-sm p-6 border border-gray-200 dark:border-dark-border">
          <div className="flex flex-col sm:flex-row gap-4">
            <select
              value={quizSource}
              onChange={(e) => setQuizSource(e.target.value)}
              className="block w-full sm:w-48 pl-3 pr-10 py-3 text-base border border-gray-300 dark:border-dark-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 sm:text-sm transition-colors duration-200 bg-white dark:bg-dark-card text-gray-900 dark:text-dark-text"
            >
              <option value="all">All Questions</option>
              <option value="bookmarks">Bookmarked Questions</option>
            </select>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="block w-full sm:w-48 pl-3 pr-10 py-3 text-base border border-gray-300 dark:border-dark-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 sm:text-sm transition-colors duration-200 bg-white dark:bg-dark-card text-gray-900 dark:text-dark-text"
            >
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category === 'all' ? 'All Categories' : category}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="flex-grow mt-8">
        {questions.length === 0 ? (
          <div className="text-center py-16 bg-white dark:bg-dark-card rounded-xl shadow-sm border border-gray-200 dark:border-dark-border">
            <div className="mx-auto h-12 w-12 text-gray-400 dark:text-dark-muted mb-4">
              <svg
                className="h-12 w-12"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 dark:text-dark-text mb-2">No questions available</h3>
            <p className="text-gray-500 dark:text-dark-muted mb-6">
              {quizSource === 'bookmarks'
                ? 'No bookmarked questions found. Start bookmarking questions to create a quiz.'
                : 'No questions found in the selected category.'}
            </p>
            <Link
              to="/"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg text-primary-700 dark:text-primary-300 bg-primary-100 dark:bg-primary-900/30 hover:bg-primary-200 dark:hover:bg-primary-800/30 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-colors duration-200"
            >
              Browse Questions
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <div className="text-sm text-gray-500 dark:text-dark-muted">
                Question {currentQuestionIndex + 1} of {questions.length}
              </div>
              <button
                onClick={loadQuestions}
                className="inline-flex items-center px-4 py-2 border border-gray-300 dark:border-dark-border text-sm font-medium rounded-lg text-gray-700 dark:text-dark-text bg-white dark:bg-dark-card hover:bg-gray-50 dark:hover:bg-dark-hover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-colors duration-200"
              >
                Shuffle Questions
              </button>
            </div>

            <div className="bg-white dark:bg-dark-card rounded-xl shadow-sm p-6 border border-gray-200 dark:border-dark-border min-h-[400px] flex flex-col">
              <div className="space-y-6 flex-grow">
                <div>
                  <div className="flex items-center space-x-2 mb-3">
                    <span className="px-3 py-1 text-xs font-medium bg-primary-50 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 rounded-full">
                      {questions[currentQuestionIndex].category}
                    </span>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-dark-text">
                    {questions[currentQuestionIndex].question}
                  </h3>
                </div>

                {showAnswer ? (
                  <div className="space-y-4">
                    <div>
                      <h4 className="text-sm font-medium text-gray-700 dark:text-dark-text mb-2">Answer:</h4>
                      <p className="text-gray-600 dark:text-dark-muted leading-relaxed whitespace-pre-wrap">
                        {questions[currentQuestionIndex].answer}
                      </p>
                    </div>
                    {questions[currentQuestionIndex].explanation && (
                      <div>
                        <h4 className="text-sm font-medium text-gray-700 dark:text-dark-text mb-2">Explanation:</h4>
                        <p className="text-gray-600 dark:text-dark-muted leading-relaxed whitespace-pre-wrap">
                          {questions[currentQuestionIndex].explanation}
                        </p>
                      </div>
                    )}
                    <div className="flex justify-between pt-4 mt-auto">
                      <button
                        onClick={handlePrevious}
                        disabled={currentQuestionIndex === 0}
                        className="inline-flex items-center px-4 py-2 border border-gray-300 dark:border-dark-border text-sm font-medium rounded-lg text-gray-700 dark:text-dark-text bg-white dark:bg-dark-card hover:bg-gray-50 dark:hover:bg-dark-hover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        Previous
                      </button>
                      <button
                        onClick={handleNext}
                        disabled={currentQuestionIndex === questions.length - 1}
                        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg text-white bg-primary-600 dark:bg-primary-500 hover:bg-primary-700 dark:hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        Next
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="flex-grow flex items-center">
                    <button
                      onClick={() => setShowAnswer(true)}
                      className="w-full flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg text-white bg-primary-600 dark:bg-primary-500 hover:bg-primary-700 dark:hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-colors duration-200"
                    >
                      Show Answer
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
} 