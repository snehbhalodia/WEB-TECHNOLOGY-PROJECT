import React, { useState } from 'react';
import RecipeCard from '../components/RecipeCard';
import SearchBar from '../components/SearchBar';
import { CATEGORIES } from '../data/recipes';

/**
 * Favorites Page Component
 * Dedicated archive for user-saved dishes.
 * Features:
 * - Search filter within saved items
 * - Category filter pills
 * - Direct remove-from-favorites toggle
 * - Empty state with direct link to Discover
 * - Synchronized with localStorage
 */
export default function Favorites({
  recipes = [],
  favorites = [],
  onToggleFavorite,
  onSelectRecipe,
  onNavigate
}) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Filter full recipe database to only favorites
  const favoriteRecipes = recipes.filter((r) => favorites.includes(r.id));

  // Secondary filters (search within favorites & category)
  const filteredFavorites = favoriteRecipes.filter((r) => {
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      const matchesName = r.name.toLowerCase().includes(q);
      const matchesIng = r.ingredients.some((i) => i.name.toLowerCase().includes(q));
      if (!matchesName && !matchesIng) return false;
    }

    if (selectedCategory !== 'all') {
      if (r.category.toLowerCase() !== selectedCategory.toLowerCase()) {
        return false;
      }
    }

    return true;
  });

  return (
    <div className="favorites-page container" style={{ paddingBottom: '4rem' }}>
      {/* Page Header */}
      <div className="page-header-block">
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
          <span className="sticker-badge red">PERSONAL VAULT</span>
          <span className="sticker-badge yellow">{favoriteRecipes.length} SAVED DISHES</span>
        </div>
        <h1 className="page-title">Saved Recipes</h1>
        <p className="page-subtitle">
          Your personal hand-picked culinary journal. Ready to cook anytime without having to search again.
        </p>
      </div>

      {favoriteRecipes.length > 0 ? (
        <>
          {/* Controls: Search and Category Pills within Favorites */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '2rem' }}>
            <SearchBar
              value={searchQuery}
              onChange={setSearchQuery}
              onClear={() => setSearchQuery('')}
              placeholder="Search through your saved recipes..."
            />

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
              <span className="filter-label">Filter Category:</span>
              <button
                className={`filter-pill ${selectedCategory === 'all' ? 'active' : ''}`}
                onClick={() => setSelectedCategory('all')}
              >
                All ({favoriteRecipes.length})
              </button>
              {CATEGORIES.filter((c) => c.id !== 'all').map((cat) => {
                const count = favoriteRecipes.filter((r) => r.category === cat.id).length;
                if (count === 0) return null;
                return (
                  <button
                    key={cat.id}
                    className={`filter-pill ${selectedCategory === cat.id ? 'active' : ''}`}
                    onClick={() => setSelectedCategory(cat.id)}
                  >
                    {cat.emoji} {cat.label} ({count})
                  </button>
                );
              })}
            </div>
          </div>

          {/* Cards Grid */}
          {filteredFavorites.length > 0 ? (
            <div className="trending-grid">
              {filteredFavorites.map((recipe) => (
                <RecipeCard
                  key={recipe.id}
                  recipe={recipe}
                  isFavorite={true}
                  onToggleFavorite={onToggleFavorite}
                  onSelectRecipe={onSelectRecipe}
                />
              ))}
            </div>
          ) : (
            <div className="empty-results-box">
              <span style={{ fontSize: '3rem' }}>🔍</span>
              <h3>No saved dishes match "{searchQuery}"</h3>
              <p style={{ color: 'var(--ink-muted)' }}>
                Try clearing your search query or switching to all categories.
              </p>
              <button
                className="btn btn-outline"
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('all');
                }}
              >
                Clear Search
              </button>
            </div>
          )}
        </>
      ) : (
        /* Empty State */
        <div className="empty-results-box" style={{ marginTop: '2rem' }}>
          <span style={{ fontSize: '4rem' }}>💔</span>
          <span className="sticker-badge orange">EMPTY VAULT</span>
          <h3 style={{ fontSize: '1.75rem', margin: 0 }}>No saved recipes yet</h3>
          <p style={{ maxWidth: '460px', color: 'var(--ink-muted)' }}>
            Whenever you spot a dish you love on CRAVE!, tap the heart icon to tuck it away into your personal cookbook.
          </p>
          <button className="btn btn-primary" onClick={() => onNavigate('discover')}>
            Discover Recipes Now →
          </button>
        </div>
      )}
    </div>
  );
}
