import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import QuestionCard from '../components/QuestionCard'
import { getBookmarks } from '../utils/localStorageHelper'

export default function Bookmarks() {
  const [bookmarkedQuestions, setBookmarkedQuestions] = useState([])
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [expandedCardId, setExpandedCardId] = useState(null)

  useEffect(() => {
    const bookmarks = getBookmarks()
    setBookmarkedQuestions(bookmarks)
  }, [])

  const categories = ['all', ...new Set(bookmarkedQuestions.map(q => q.category))]

  const filteredQuestions = selectedCategory === 'all'
    ? bookmarkedQuestions
    : bookmarkedQuestions.filter(q => q.category === selectedCategory)

  const handleBookmark = () => {
    const bookmarks = getBookmarks()
    setBookmarkedQuestions(bookmarks)
  }

  const handleCardExpand = (cardId) => {
    setExpandedCardId(cardId)
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-dark-text mb-2">Bookmarked Questions</h1>
          <p className="text-gray-600 dark:text-dark-muted">Your saved interview questions for quick reference.</p>
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

      {filteredQuestions.length === 0 ? (
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
                d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
              />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-900 dark:text-dark-text mb-2">No bookmarks yet</h3>
          <p className="text-gray-500 dark:text-dark-muted mb-6">
            Start bookmarking questions to access them quickly
          </p>
          <Link
            to="/"
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg text-primary-700 dark:text-primary-300 bg-primary-100 dark:bg-primary-900/30 hover:bg-primary-200 dark:hover:bg-primary-800/30 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-colors duration-200"
          >
            Browse Questions
          </Link>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredQuestions.map((question) => (
            <QuestionCard
              key={question.id}
              question={question}
              onBookmarkToggle={handleBookmark}
              isExpanded={expandedCardId === question.id}
              onExpand={handleCardExpand}
            />
          ))}
        </div>
      )}
    </div>
  )
} 