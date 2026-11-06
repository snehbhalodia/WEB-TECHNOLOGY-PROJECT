import React from 'react';
import { CATEGORIES, CUISINES, DIETARY_OPTIONS, MOODS } from '../data/recipes';

/**
 * FilterBar Component
 * Multi-criteria filter controls: Category pills, Cuisine dropdown,
 * Dietary preference pills, Max time selector, and Sorting options.
 */
export default function FilterBar({
  filters,
  onFilterChange,
  onResetFilters,
  totalResults = 0
}) {
  const {
    category = 'all',
    cuisine = 'all',
    dietary = 'all',
    maxTime = 0,
    mood = 'all',
    sortBy = 'featured'
  } = filters;

  const hasActiveFilters =
    category !== 'all' ||
    cuisine !== 'all' ||
    dietary !== 'all' ||
    maxTime > 0 ||
    mood !== 'all' ||
    sortBy !== 'featured';

  return (
    <div className="filter-bar">
      {/* Category Pills Row */}
      <div className="filter-row">
        <span className="filter-label">Category:</span>
        <div className="filter-pills">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              className={`filter-pill ${category === cat.id ? 'active' : ''}`}
              onClick={() => onFilterChange('category', cat.id)}
            >
              {cat.emoji} {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Cuisine & Mood Selectors Row */}
      <div className="filter-row" style={{ justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
          <span className="filter-label">Cuisine:</span>
          <select
            className="filter-select"
            value={cuisine}
            onChange={(e) => onFilterChange('cuisine', e.target.value)}
            aria-label="Filter by Cuisine"
          >
            {CUISINES.map((c) => (
              <option key={c} value={c === 'All' ? 'all' : c}>
                {c === 'All' ? '🌎 All Cuisines' : c}
              </option>
            ))}
          </select>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
          <span className="filter-label">Food Mood:</span>
          <select
            className="filter-select"
            value={mood}
            onChange={(e) => onFilterChange('mood', e.target.value)}
            aria-label="Filter by Mood"
          >
            <option value="all">✨ Any Mood</option>
            {MOODS.map((m) => (
              <option key={m.id} value={m.id}>
                {m.icon} {m.label}
              </option>
            ))}
          </select>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
          <span className="filter-label">Max Time:</span>
          <select
            className="filter-select"
            value={maxTime}
            onChange={(e) => onFilterChange('maxTime', Number(e.target.value))}
            aria-label="Filter by Maximum Time"
          >
            <option value={0}>⏱️ Any Prep Time</option>
            <option value={20}>⚡ Under 20 mins</option>
            <option value={30}>🕒 Under 30 mins</option>
            <option value={45}>⌛ Under 45 mins</option>
          </select>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
          <span className="filter-label">Sort By:</span>
          <select
            className="filter-select"
            value={sortBy}
            onChange={(e) => onFilterChange('sortBy', e.target.value)}
            aria-label="Sort recipes"
          >
            <option value="featured">★ Curated & Featured</option>
            <option value="time-asc">⏱️ Fastest Prep Time</option>
            <option value="alpha-asc">🔤 Alphabetical (A to Z)</option>
            <option value="alpha-desc">🔤 Alphabetical (Z to A)</option>
          </select>
        </div>
      </div>

      {/* Dietary Pills & Reset Row */}
      <div className="filter-row" style={{ justifyContent: 'space-between', borderTop: '1px dashed var(--border-ink)', paddingTop: '0.75rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
          <span className="filter-label">Dietary:</span>
          <button
            className={`filter-pill ${dietary === 'all' ? 'active' : ''}`}
            onClick={() => onFilterChange('dietary', 'all')}
          >
            All Diets
          </button>
          {DIETARY_OPTIONS.map((diet) => (
            <button
              key={diet}
              className={`filter-pill ${dietary === diet ? 'active' : ''}`}
              onClick={() => onFilterChange('dietary', diet)}
            >
              🌿 {diet}
            </button>
          ))}
        </div>

        {hasActiveFilters && (
          <button
            className="btn btn-outline btn-sm"
            onClick={onResetFilters}
            title="Reset all active filters"
          >
            🔄 Reset Filters
          </button>
        )}
      </div>
    </div>
  );
}
