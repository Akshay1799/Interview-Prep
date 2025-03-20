import { useState, useEffect } from 'react'
import QuestionCard from './QuestionCard'
import questionsData from '../data/questions.json'

export default function QuizMode({ onBookmarkToggle }) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [showAnswer, setShowAnswer] = useState(false)
  const [score, setScore] = useState(0)
  const [quizComplete, setQuizComplete] = useState(false)
  const [questions, setQuestions] = useState([])

  useEffect(() => {
    // Shuffle questions
    const shuffledQuestions = [...questionsData.questions]
      .sort(() => Math.random() - 0.5)
      .slice(0, 10)
    setQuestions(shuffledQuestions)
  }, [])

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1)
      setShowAnswer(false)
    } else {
      setQuizComplete(true)
    }
  }

  const handleRestart = () => {
    setCurrentQuestionIndex(0)
    setShowAnswer(false)
    setScore(0)
    setQuizComplete(false)
    // Reshuffle questions
    const shuffledQuestions = [...questionsData.questions]
      .sort(() => Math.random() - 0.5)
      .slice(0, 10)
    setQuestions(shuffledQuestions)
  }

  if (questions.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 dark:text-dark-muted">Loading quiz...</p>
      </div>
    )
  }

  if (quizComplete) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-dark-text mb-4">
          Quiz Complete!
        </h2>
        <p className="text-lg text-gray-700 dark:text-dark-text mb-6">
          Your score: {score} out of {questions.length}
        </p>
        <button
          onClick={handleRestart}
          className="bg-primary-600 text-white px-6 py-2 rounded-lg hover:bg-primary-700 dark:bg-primary-500 dark:hover:bg-primary-600 transition-colors"
        >
          Try Again
        </button>
      </div>
    )
  }

  const currentQuestion = questions[currentQuestionIndex]

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-6">
        <span className="text-sm text-gray-500 dark:text-dark-muted">
          Question {currentQuestionIndex + 1} of {questions.length}
        </span>
        <span className="text-sm font-medium text-gray-900 dark:text-dark-text">
          Score: {score}
        </span>
      </div>

      <QuestionCard
        question={currentQuestion}
        onBookmarkToggle={onBookmarkToggle}
        showAnswer={showAnswer}
        onToggleAnswer={() => setShowAnswer(!showAnswer)}
      />

      <div className="flex justify-end mt-6">
        <button
          onClick={handleNext}
          className="bg-primary-600 text-white px-6 py-2 rounded-lg hover:bg-primary-700 dark:bg-primary-500 dark:hover:bg-primary-600 transition-colors"
        >
          {currentQuestionIndex === questions.length - 1 ? 'Finish Quiz' : 'Next Question'}
        </button>
      </div>
    </div>
  )
} 