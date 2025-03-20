import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="bg-white dark:bg-dark-card border-t border-gray-200 dark:border-dark-border">
      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="text-sm text-gray-500 dark:text-dark-muted">
            © {new Date().getFullYear()} Interview Prep. All rights reserved.
          </div>
          <div className="flex space-x-6">
            <Link
              to="/"
              className="text-sm text-gray-500 dark:text-dark-muted hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
            >
              Home
            </Link>
            <Link
              to="/bookmarks"
              className="text-sm text-gray-500 dark:text-dark-muted hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
            >
              Bookmarks
            </Link>
            <Link
              to="/quiz"
              className="text-sm text-gray-500 dark:text-dark-muted hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
            >
              Quiz
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
} 