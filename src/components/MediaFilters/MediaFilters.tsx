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

  const currentOption = options[0];

  return (
    <div
      className="flex items-center gap-3 w-full justify-center md:justify-start mb-6"
      ref={selectRef}
    >
      <label className="text-sm font-bold">Trier par</label>

      <div className="relative">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="rounded-md p-2 text-sm font-bold primaire-bg shadow-sm flex items-center justify-between min-w-[140px] border border-transparent hover:border-gray-300 transition-all"
        >
          {currentOption.label}
          <span
            className={`ml-2 transform transition-transform ${isOpen ? 'rotate-180' : ''}`}
          >
            ▼
          </span>
        </button>

        {isOpen && (
          <ul className="absolute z-50 mt-2 w-full primaire-bg border border-gray-200 rounded-md shadow-lg overflow-hidden">
            {options.map((opt) => (
              <li
                key={opt.value}
                onClick={() => {
                  onSortChange(opt.value);
                  setIsOpen(false);
                }}
                className={`px-4 py-2 text-sm font-bold cursor-pointer hover:bg-opacity-80 transition-colors
                  ${sortBy === opt.value ? 'bg-opacity-50 border-l-4 border-blue-500' : 'hover:bg-gray-100'}
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
