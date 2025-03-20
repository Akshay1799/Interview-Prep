import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import QuestionCard from '../components/QuestionCard'
import SearchBar from '../components/SearchBar'
import questionsData from '../data/questions.json'
import { getBookmarks } from '../utils/localStorageHelper'

export default function Home() {
  const [questions, setQuestions] = useState([])
  const [filteredQuestions, setFilteredQuestions] = useState([])
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const [expandedCardId, setExpandedCardId] = useState(null)

  useEffect(() => {
    try {
      // Ensure questionsData.questions exists and is an array
      if (questionsData && Array.isArray(questionsData.questions)) {
        setQuestions(questionsData.questions)
        setFilteredQuestions(questionsData.questions)
      } else {
        console.error('Questions data is not in the expected format')
      }
    } catch (error) {
      console.error('Error loading questions:', error)
    } finally {
      setIsLoading(false)
    }
  }, [])

  const categories = ['all', ...new Set(questions.map(q => q.category))]

  const handleSearch = (term) => {
    setSearchTerm(term)
    filterQuestions(term, selectedCategory)
  }

  const handleCategoryChange = (category) => {
    setSelectedCategory(category)
    filterQuestions(searchTerm, category)
  }

  const filterQuestions = (term, category) => {
    let filtered = [...questions]

    // Apply search filter
    if (term) {
      const searchLower = term.toLowerCase()
      filtered = filtered.filter(
        q =>
          q.question.toLowerCase().includes(searchLower) ||
          q.answer.toLowerCase().includes(searchLower) ||
          q.category.toLowerCase().includes(searchLower)
      )
    }

    // Apply category filter
    if (category !== 'all') {
      filtered = filtered.filter(q => q.category === category)
    }

    setFilteredQuestions(filtered)
  }

  const handleBookmarkToggle = (questionId) => {
    // Update the questions state to reflect the new bookmark state
    setQuestions(prevQuestions => 
      prevQuestions.map(q => 
        q.id === questionId 
          ? { ...q, isBookmarked: !q.isBookmarked }
          : q
      )
    )
    // Update filtered questions as well
    setFilteredQuestions(prevFiltered => 
      prevFiltered.map(q => 
        q.id === questionId 
          ? { ...q, isBookmarked: !q.isBookmarked }
          : q
      )
    )
  }

  const handleCardExpand = (cardId) => {
    setExpandedCardId(cardId)
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500"></div>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-dark-text mb-2">Interview Questions</h1>
          <p className="text-gray-600 dark:text-gray-400">Browse and bookmark interview questions to help you prepare.</p>
        </div>
        <Link
          to="/quiz"
          className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-lg shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-colors duration-200"
        >
          Start Quiz
        </Link>
      </div>

      <div className="bg-white dark:bg-dark-card rounded-xl shadow-sm p-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <SearchBar onSearch={handleSearch} />
          </div>
          <select
            value={selectedCategory}
            onChange={(e) => handleCategoryChange(e.target.value)}
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
        <div className="text-center py-16 bg-white dark:bg-dark-card rounded-xl shadow-sm">
          <div className="mx-auto h-12 w-12 text-gray-400 dark:text-gray-500 mb-4">
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
                d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-900 dark:text-dark-text mb-2">No questions found</h3>
          <p className="text-gray-500 dark:text-gray-400 mb-6">
            Try adjusting your search or category filter
          </p>
          <button
            onClick={() => {
              setSearchTerm('')
              setSelectedCategory('all')
              setFilteredQuestions(questions)
            }}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg text-primary-700 bg-primary-100 dark:bg-primary-900 dark:text-primary-200 hover:bg-primary-200 dark:hover:bg-primary-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-colors duration-200"
          >
            Clear filters
          </button>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredQuestions.map((question) => (
            <QuestionCard
              key={question.id}
              question={question}
              onBookmarkToggle={handleBookmarkToggle}
              isExpanded={expandedCardId === question.id}
              onExpand={handleCardExpand}
            />
          ))}
        </div>
      )}
    </div>
  )
} 