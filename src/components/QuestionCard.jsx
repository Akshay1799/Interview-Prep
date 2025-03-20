import { useState, useEffect } from 'react'
import { BookmarkIcon as BookmarkIconOutline } from '@heroicons/react/24/outline'
import { BookmarkIcon as BookmarkIconSolid } from '@heroicons/react/24/solid'
import { toggleBookmark, isBookmarked } from '../utils/localStorageHelper'

export default function QuestionCard({ 
  question, 
  onBookmarkToggle, 
  showAnswer: controlledShowAnswer, 
  onToggleAnswer,
  isExpanded,
  onExpand
}) {
  const [internalShowAnswer, setInternalShowAnswer] = useState(false)
  const isQuestionBookmarked = isBookmarked(question.id)
  const showAnswer = controlledShowAnswer ?? internalShowAnswer

  // Effect to handle auto-collapse when another card is expanded
  useEffect(() => {
    if (isExpanded === false && showAnswer) {
      setInternalShowAnswer(false)
    }
  }, [isExpanded])

  const handleBookmark = (e) => {
    e.stopPropagation()
    toggleBookmark(question)
    onBookmarkToggle(question.id)
  }

  const handleToggleAnswer = (e) => {
    e.stopPropagation()
    if (onToggleAnswer) {
      onToggleAnswer()
    } else {
      const newShowAnswer = !internalShowAnswer
      setInternalShowAnswer(newShowAnswer)
      // Notify parent about expansion state
      if (onExpand) {
        onExpand(newShowAnswer ? question.id : null)
      }
    }
  }

  return (
    <div 
      className="bg-white dark:bg-dark-card rounded-xl shadow-md p-6 mb-6 border border-gray-200 dark:border-dark-border hover:shadow-lg hover:border-primary-200 dark:hover:border-primary-800 transition-all duration-200"
      onClick={handleToggleAnswer}
    >
      <div className="flex justify-between items-start mb-4">
        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-primary-100 dark:bg-primary-900/30 text-primary-800 dark:text-primary-300">
          {question.category}
        </span>
        <button
          onClick={handleBookmark}
          className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-dark-hover transition-colors"
          aria-label={isQuestionBookmarked ? "Remove bookmark" : "Add bookmark"}
        >
          {isQuestionBookmarked ? (
            <BookmarkIconSolid className="h-5 w-5 text-primary-500 dark:text-primary-400" />
          ) : (
            <BookmarkIconOutline className="h-5 w-5 text-gray-400 dark:text-dark-muted" />
          )}
        </button>
      </div>

      <h3 className="text-lg font-medium text-gray-900 dark:text-dark-text mb-4">
        {question.question}
      </h3>

      <button
        onClick={handleToggleAnswer}
        className="text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 font-medium mb-4 transition-colors"
      >
        {showAnswer ? 'Hide Answer' : 'Show Answer'}
      </button>

      {showAnswer && (
        <div className="mt-4 space-y-4 animate-fade-in">
          <div className="bg-gray-50 dark:bg-dark-hover rounded-lg p-4 border border-gray-100 dark:border-dark-border">
            <p className="text-gray-700 dark:text-dark-text">{question.answer}</p>
          </div>
          {question.explanation && (
            <div className="bg-gray-50 dark:bg-dark-hover rounded-lg p-4 border border-gray-100 dark:border-dark-border">
              <h4 className="font-medium text-gray-900 dark:text-dark-text mb-2">Explanation:</h4>
              <p className="text-gray-700 dark:text-dark-text">{question.explanation}</p>
            </div>
          )}
        </div>
      )}
    </div>
  )
} 