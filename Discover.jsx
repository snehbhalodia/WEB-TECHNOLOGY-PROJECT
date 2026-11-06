import React from 'react';
import SearchBar from '../components/SearchBar';
import FilterBar from '../components/FilterBar';
import RecipeCard from '../components/RecipeCard';
import { filterAndSortRecipes } from '../utils/recipeHelpers';

/**
 * Discover Page Component
 * Full-scale recipe explorer featuring combined text search (dish name + ingredients),
 * multi-criteria filters (category, cuisine, diet, max time, mood),
 * dynamic sorting, results counter, and responsive editorial grid.
 */
export default function Discover({
  recipes = [],
  favorites = [],
  filters = {},
  onFilterChange,
  onResetFilters,
  onToggleFavorite,
  onSelectRecipe,
  onAddToMealPlan
}) {
  // Compute filtered and sorted recipes in real-time
  const filteredRecipes = filterAndSortRecipes(recipes, filters);

  const handleSearchChange = (val) => {
    onFilterChange('search', val);
  };

  const handleSearchClear = () => {
    onFilterChange('search', '');
  };

  return (
    <div className="discover-page container" style={{ paddingBottom: '4rem' }}>
      {/* Editorial Page Header */}
      <div className="page-header-block">
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
          <span className="sticker-badge red">CULINARY ARCHIVE</span>
          <span className="sticker-badge yellow">{filteredRecipes.length} MATCHING DISHES</span>
        </div>
        <h1 className="page-title">Discover Your Obsession</h1>
        <p className="page-subtitle">
          Explore authentic recipes from around the globe. Filter by time for quick weeknight cooking, pick by mood, or search by your favorite ingredients.
        </p>
      </div>

      {/* Real-time Search Input */}
      <div style={{ marginBottom: '1.5rem' }}>
        <SearchBar
          value={filters.search || ''}
          onChange={handleSearchChange}
          onClear={handleSearchClear}
        />
      </div>

      {/* Multi-Criteria Filter Controls */}
      <FilterBar
        filters={filters}
        onFilterChange={onFilterChange}
        onResetFilters={onResetFilters}
        totalResults={filteredRecipes.length}
      />

      {/* Results Header */}
      <div className="recipes-results-header">
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <h2 style={{ fontSize: '1.5rem' }}>
            {filters.category && filters.category !== 'all' ? `${filters.category} Dishes` : 'All Available Recipes'}
          </h2>
          <span className="results-count-badge">
            {filteredRecipes.length} of {recipes.length} recipes
          </span>
        </div>

        {filters.search && (
          <span style={{ fontSize: '0.9rem', color: 'var(--ink-soft)' }}>
            Showing results for <strong>"{filters.search}"</strong>
          </span>
        )}
      </div>

      {/* Responsive Recipe Cards Grid */}
      {filteredRecipes.length > 0 ? (
        <div className="trending-grid">
          {filteredRecipes.map((recipe, index) => (
            <RecipeCard
              key={recipe.id}
              recipe={recipe}
              variant={index === 0 && !filters.search && filters.category === 'all' ? 'featured' : 'standard'}
              isFavorite={favorites.includes(recipe.id)}
              onToggleFavorite={onToggleFavorite}
              onSelectRecipe={onSelectRecipe}
              onAddToMealPlan={onAddToMealPlan}
            />
          ))}
        </div>
      ) : (
        /* Empty State */
        <div className="empty-results-box">
          <span className="emoji" role="img" aria-label="Empty pot">
            🍲
          </span>
          <span className="sticker-badge orange">NO MATCHES FOUND</span>
          <h3 style={{ fontSize: '1.75rem', margin: 0 }}>Nothing on the stove for that combo</h3>
          <p style={{ maxWidth: '480px', color: 'var(--ink-muted)' }}>
            We couldn't find any recipes matching your current combination of filters and search keywords. Try clearing some filters or searching for ingredients like "garlic", "paneer", or "chocolate".
          </p>
          <button className="btn btn-primary" onClick={onResetFilters}>
            🔄 Reset All Filters
          </button>
        </div>
      )}
    </div>
  );
}
