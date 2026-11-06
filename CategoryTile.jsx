import React from 'react';

/**
 * CategoryTile Component
 * Expressive category block for Breakfast, Lunch, Dinner, Desserts, Snacks, Drinks.
 */
export default function CategoryTile({ category, isActive = false, onClick }) {
  if (!category) return null;

  return (
    <button
      className={`category-tile ${isActive ? 'active' : ''}`}
      onClick={() => onClick(category.id)}
      style={{
        backgroundColor: isActive ? 'var(--butter-yellow)' : category.bg || 'var(--pure-white)'
      }}
      aria-label={`Filter by ${category.label}`}
    >
      <span className="category-emoji" role="img" aria-label={category.label}>
        {category.emoji}
      </span>
      <span className="category-label">{category.label}</span>
    </button>
  );
}
