import { useState } from 'react'

function FlashcardMode({ questions }) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [showAnswer, setShowAnswer] = useState(false)
  const currentQuestion = questions[currentIndex]

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % questions.length)
    setShowAnswer(false)
  }

  const handlePrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + questions.length) % questions.length)
    setShowAnswer(false)
  }

  const toggleAnswer = () => {
    setShowAnswer(!showAnswer)
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex justify-between text-sm text-gray-500 mb-4">
          <span>Question {currentIndex + 1} of {questions.length}</span>
          <span>{Math.round(((currentIndex + 1) / questions.length) * 100)}% Complete</span>
        </div>
        
        <h3 className="text-xl font-semibold text-gray-800 mb-4">{currentQuestion.title}</h3>
        <p className="text-gray-600 mb-6">{currentQuestion.question}</p>
        
        {!showAnswer ? (
          <button
            onClick={toggleAnswer}
            className="w-full py-3 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            Show Answer
          </button>
        ) : (
          <div className="bg-gray-50 p-4 rounded-md mb-6">
            <h4 className="font-medium text-gray-700 mb-2">Answer:</h4>
            <p className="text-gray-600">{currentQuestion.answer}</p>
          </div>
        )}

        <div className="flex justify-between mt-6">
          <button
            onClick={handlePrevious}
            className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
          >
            Previous
          </button>
          <button
            onClick={handleNext}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  )
}

export default FlashcardMode 