import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom'
import { Disclosure } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import { ThemeProvider } from './context/ThemeContext'
import ThemeToggle from './components/ThemeToggle'
import Home from './pages/Home'
import Bookmarks from './pages/Bookmarks'
import QuizMode from './pages/QuizMode'
import Footer from './components/Footer'
// import './App.css'

function NavLink({ to, children }) {
  const location = useLocation()
  const isActive = location.pathname === to

  return (
    <Link
      to={to}
      className={`nav-link ${isActive ? 'nav-link-active' : 'nav-link-inactive'}`}
    >
      {children}
    </Link>
  )
}

function App() {
  return (
    <ThemeProvider>
      <Router>
        <div className="min-h-screen flex flex-col bg-white dark:bg-dark-bg text-gray-900 dark:text-dark-text">
          <div className="sticky top-0 z-50 bg-white dark:bg-dark-card shadow">
            <Disclosure as="nav">
              {({ open }) => (
                <>
                  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16">
                      <div className="flex">
                        <div className="flex-shrink-0 flex items-center">
                          <Link to="/" className="text-xl font-bold text-primary-600 dark:text-primary-400">
                            Interview Prep
                          </Link>
                        </div>
                        <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                          <Link
                            to="/"
                            className="border-transparent text-gray-500 dark:text-gray-400 hover:border-gray-300 hover:text-gray-700 dark:hover:text-gray-200 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
                          >
                            Home
                          </Link>
                          <Link
                            to="/bookmarks"
                            className="border-transparent text-gray-500 dark:text-gray-400 hover:border-gray-300 hover:text-gray-700 dark:hover:text-gray-200 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
                          >
                            Bookmarks
                          </Link>
                          <Link
                            to="/quiz"
                            className="border-transparent text-gray-500 dark:text-gray-400 hover:border-gray-300 hover:text-gray-700 dark:hover:text-gray-200 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
                          >
                            Quiz Mode
                          </Link>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <ThemeToggle />
                        <div className="-mr-2 flex items-center sm:hidden">
                          <Disclosure.Button className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 dark:hover:bg-dark-card focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-500">
                            <span className="sr-only">Open main menu</span>
                            {open ? (
                              <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                            ) : (
                              <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                            )}
                          </Disclosure.Button>
                        </div>
                      </div>
                    </div>
                  </div>

                  <Disclosure.Panel className="sm:hidden">
                    <div className="pt-2 pb-3 space-y-1">
                      <Link
                        to="/"
                        className="block pl-3 pr-4 py-2 border-l-4 text-base font-medium border-transparent text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-dark-card hover:border-gray-300 hover:text-gray-700 dark:hover:text-gray-200"
                      >
                        Home
                      </Link>
                      <Link
                        to="/bookmarks"
                        className="block pl-3 pr-4 py-2 border-l-4 text-base font-medium border-transparent text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-dark-card hover:border-gray-300 hover:text-gray-700 dark:hover:text-gray-200"
                      >
                        Bookmarks
                      </Link>
                      <Link
                        to="/quiz"
                        className="block pl-3 pr-4 py-2 border-l-4 text-base font-medium border-transparent text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-dark-card hover:border-gray-300 hover:text-gray-700 dark:hover:text-gray-200"
                      >
                        Quiz Mode
                      </Link>
                    </div>
                  </Disclosure.Panel>
                </>
              )}
            </Disclosure>
          </div>

          <main className="flex-grow max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/bookmarks" element={<Bookmarks />} />
              <Route path="/quiz" element={<QuizMode />} />
            </Routes>
          </main>

          <Footer />
        </div>
      </Router>
    </ThemeProvider>
  )
}

export default App
