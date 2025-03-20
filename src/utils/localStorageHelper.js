export const getBookmarks = () => {
  const bookmarks = localStorage.getItem('bookmarks')
  return bookmarks ? JSON.parse(bookmarks) : []
}

export const isBookmarked = (questionId) => {
  const bookmarks = getBookmarks()
  return bookmarks.some(q => q.id === questionId)
}

export const toggleBookmark = (question) => {
  const bookmarks = getBookmarks()
  const isCurrentlyBookmarked = isBookmarked(question.id)

  if (isCurrentlyBookmarked) {
    // Remove from bookmarks
    const updatedBookmarks = bookmarks.filter(q => q.id !== question.id)
    localStorage.setItem('bookmarks', JSON.stringify(updatedBookmarks))
  } else {
    // Add to bookmarks
    localStorage.setItem('bookmarks', JSON.stringify([...bookmarks, question]))
  }
}

export const removeBookmark = (question) => {
  const bookmarks = getBookmarks()
  const updatedBookmarks = bookmarks.filter(q => q.id !== question.id)
  localStorage.setItem('bookmarks', JSON.stringify(updatedBookmarks))
} 