import { useState } from 'react'
import QuestionCard from './QuestionCard'
import { getBookmarkedQuestions } from '../utils/localStorageHelper'
import questionsData from '../data/questions.json'

export default function BookmarkList({ onBookmarkToggle }) {
  const [bookmarkedIds] = useState(getBookmarkedQuestions())
  const bookmarkedQuestions = questionsData.questions.filter(q => bookmarkedIds.includes(q.id))

  if (bookmarkedQuestions.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 dark:text-dark-muted">No bookmarked questions yet.</p>
        <p className="text-sm text-gray-400 dark:text-dark-muted mt-2">
          Click the bookmark icon on any question to save it for later.
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {bookmarkedQuestions.map(question => (
        <QuestionCard
          key={question.id}
          question={question}
          onBookmarkToggle={onBookmarkToggle}
        />
      ))}
    </div>
  )
} 