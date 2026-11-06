import React from 'react';

/**
 * SearchBar Component
 * Bold search input with instant filtering and clear action.
 */
export default function SearchBar({
  value = '',
  onChange,
  onClear,
  placeholder = 'Search by dish name, spice, or ingredient (e.g. paneer, basil, ramen)...'
}) {
  return (
    <div className="search-bar-wrap">
      <span className="search-icon" aria-hidden="true">
        🔍
      </span>
      <input
        type="text"
        className="search-input"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        aria-label="Search recipes"
      />
      {value && (
        <button
          type="button"
          className="search-clear-btn"
          onClick={onClear}
          aria-label="Clear search query"
          title="Clear search"
        >
          ✕
        </button>
      )}
    </div>
  );
}
