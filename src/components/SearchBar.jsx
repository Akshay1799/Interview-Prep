import { useState, useEffect } from 'react'
import { MagnifyingGlassIcon, XMarkIcon } from '@heroicons/react/24/outline'
import debounce from 'lodash/debounce'

export default function SearchBar({ onSearch }) {
  const [searchTerm, setSearchTerm] = useState('')
  const [isFocused, setIsFocused] = useState(false)

  const debouncedSearch = debounce((term) => {
    onSearch(term)
  }, 300)

  useEffect(() => {
    debouncedSearch(searchTerm)
    return () => {
      debouncedSearch.cancel()
    }
  }, [searchTerm])

  const handleClear = () => {
    setSearchTerm('')
  }

  return (
    <div className="relative">
      <div className={`relative rounded-xl shadow-sm transition-all duration-200 ${
        isFocused ? 'shadow-lg ring-2 ring-primary-500 dark:ring-primary-400' : 'shadow-md'
      }`}>
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
          <MagnifyingGlassIcon className="h-5 w-5 text-gray-400 dark:text-dark-muted" aria-hidden="true" />
        </div>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className="block w-full rounded-xl border-0 py-3 pl-12 pr-12 text-gray-900 dark:text-dark-text bg-white dark:bg-dark-card placeholder:text-gray-400 dark:placeholder:text-dark-muted focus:outline-none sm:text-sm sm:leading-6"
          placeholder="Search questions..."
        />
        {searchTerm && (
          <button
            type="button"
            onClick={handleClear}
            className="absolute inset-y-0 right-0 flex items-center pr-4 text-gray-400 dark:text-dark-muted hover:text-gray-500 dark:hover:text-dark-text transition-colors"
          >
            <XMarkIcon className="h-5 w-5" aria-hidden="true" />
          </button>
        )}
      </div>
    </div>
  )
} 