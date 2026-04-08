'use client';
import { useEffect, useState, useRef } from 'react';

interface MediaFiltersProps {
  sortBy: string;
  onSortChange: (value: string) => void;
}

export default function MediaFilters({
  sortBy,
  onSortChange,
}: MediaFiltersProps) {
  const [isOpen, setIsOpen] = useState(false);
  const selectRef = useRef<HTMLDivElement>(null);

  const options = [
    { value: 'popularity', label: 'Popularité' },
    { value: 'date', label: 'Date' },
    { value: 'title', label: 'Titre' },
  ];

  const currentOption =
    options.find((opt) => opt.value === sortBy) || options[0];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        selectRef.current &&
        !selectRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  return (
    <div className="flex items-center gap-3 justify-center md:justify-start mb-6">
      <label className="text-sm font-bold">Trier par</label>
      <div className="relative" ref={selectRef}>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="z-[200] rounded-sm p-3 text-sm font-bold primaire-bg shadow-sm flex items-center justify-between min-w-[140px] transition-all"
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
          <ul className="absolute z-150 top-[-1px] left-[-1px] text-left w-full primaire-bg rounded-sm shadow-lg overflow-hidden border border-white/10">
            {options.map((opt, index) => (
              <li
                key={opt.value}
                onClick={() => {
                  onSortChange(opt.value);
                  setIsOpen(false);
                }}
                className={`px-3 py-3 text-sm font-bold cursor-pointer transition-colors
                  ${sortBy === opt.value ? 'bg-white/10' : 'hover:bg-white/5'}
                  ${index !== options.length - 1 ? 'border-b-1 border-white' : ''} 
                `}
              >
                {opt.label}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
