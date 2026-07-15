import { useState, useCallback } from 'react';

interface SearchBarProps {
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  className?: string;
}

const SearchBar = ({ value, onChange, placeholder = 'Buscar...', className = '' }: SearchBarProps) => {
  const [internalValue, setInternalValue] = useState('');

  const isControlled = value !== undefined;
  const currentValue = isControlled ? value : internalValue;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    if (!isControlled) setInternalValue(newValue);
    onChange?.(newValue);
  };

  const handleClear = useCallback(() => {
    if (!isControlled) setInternalValue('');
    onChange?.('');
  }, [isControlled, onChange]);

  return (
    <div className={`relative ${className}`}>
      <svg
        className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="11" cy="11" r="8" />
        <path d="m21 21-4.3-4.3" />
      </svg>
      <input
        type="text"
        value={currentValue}
        onChange={handleChange}
        placeholder={placeholder}
        className="w-full bg-white/5 border border-white/10 rounded-lg pl-10 pr-8 py-2 text-sm focus:outline-none focus:border-violet-500 transition-colors placeholder-gray-500"
      />
      {currentValue && (
        <button
          onClick={handleClear}
          className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white p-1"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
      )}
    </div>
  );
};

export default SearchBar;