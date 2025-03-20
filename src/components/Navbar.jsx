import { Link, useLocation } from 'react-router-dom'
import { Disclosure } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import ThemeToggle from './ThemeToggle'

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

export default function Navbar() {
  return (
    <Disclosure as="nav" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {({ open }) => (
        <>
          <div className="flex justify-between h-16">
            <div className="flex">
              <div className="flex-shrink-0 flex items-center">
                <Link to="/" className="text-xl font-bold text-primary-600 dark:text-primary-400">
                  Interview Prep
                </Link>
              </div>
              <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                <NavLink to="/">Home</NavLink>
                <NavLink to="/bookmarks">Bookmarks</NavLink>
                <NavLink to="/quiz">Quiz Mode</NavLink>
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

          <Disclosure.Panel className="sm:hidden">
            <div className="pt-2 pb-3 space-y-1">
              <NavLink to="/">Home</NavLink>
              <NavLink to="/bookmarks">Bookmarks</NavLink>
              <NavLink to="/quiz">Quiz Mode</NavLink>
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  )
} 