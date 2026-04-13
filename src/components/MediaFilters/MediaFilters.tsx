'use client';
import { useEffect, useState, useRef } from 'react';

interface MediaFiltersProps {
  sortBy: string;
  onSortChange: (value: string) => void;
}
const options = [
  { value: 'popularity', label: 'Popularité' },
  { value: 'date', label: 'Date' },
  { value: 'title', label: 'Titre' },
];

export default function MediaFilters({ sortBy, onSortChange }: MediaFiltersProps) {
  const [isOpen, setIsOpen] = useState(false);
  const selectRef = useRef<HTMLDivElement>(null);

  const currentOption = options.find((opt) => opt.value === sortBy) || options[0];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  return (
    <div
      className="flex items-center gap-3 justify-center md:justify-start mb-6"
      aria-live="polite"
    >
      <div id="sort-label" className="text-sm font-bold">
        Trier par
      </div>
      <div className="relative" ref={selectRef}>
        <button
          id="sort-button"
          aria-haspopup="listbox"
          aria-expanded={isOpen}
          aria-labelledby="sort-label"
          aria-activedescendant={`option-${sortBy}`}
          aria-label={`Trier par ${currentOption.label}`}
          onClick={() => setIsOpen(!isOpen)}
          className={`
                z-[200] p-3 text-sm font-bold primaire-bg shadow-sm flex items-center justify-between min-w-[140px] cursor-pointer
                ${isOpen ? 'rounded-t-sm rounded-b-none' : 'rounded-sm'}`}
        >
          {currentOption.label}
          <span
            className={`ml-2 transform transition-transform ${isOpen ? 'rotate-180' : ''}`}
          >
            <svg width="12" height="8" viewBox="0 0 14 8" fill="none">
              <path
                d="M0.5 0.5L7 6.5L13.5 0.5"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </span>
        </button>

        {isOpen && (
          <ul
            role="listbox"
            aria-label="Options de tri"
            className={`
            absolute z-[150] top-[46px] left-0 w-full shadow-xl overflow-hidden 
             border-t border-white/10
            ${!isOpen ? '' : 'rounded-b-sm'}
            `}
          >
            {options
              .filter((opt) => opt.value !== sortBy)
              .map((opt, index, filteredOptions) => {
                const isLast = index === filteredOptions.length - 1;
                return (
                  <li
                    id={`option-${opt.value}`}
                    key={opt.value}
                    role="option"
                    aria-selected={opt.value === sortBy}
                    onClick={() => {
                      onSortChange(opt.value);
                      setIsOpen(false);
                    }}
                    className={`px-3 py-3 text-sm text-left primaire-bg font-bold cursor-pointer transition-colors
                    ${!isLast ? 'border-b border-white' : ''} `}
                  >
                    {opt.label}
                  </li>
                );
              })}
          </ul>
        )}
      </div>
    </div>
  );
}
