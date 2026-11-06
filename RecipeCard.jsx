import React, { useState } from 'react';

/**
 * RecipeCard Component
 * Reusable maximalist card displaying photography, badges, time metrics,
 * persistent favorite button, and direct view recipe trigger.
 */
export default function RecipeCard({
  recipe,
  isFavorite = false,
  onToggleFavorite,
  onSelectRecipe,
  onAddToMealPlan,
  variant = 'standard' // 'standard' | 'featured'
}) {
  const [imageError, setImageError] = useState(false);

  if (!recipe) return null;

  const totalTime = (recipe.prepTime || 0) + (recipe.cookTime || 0);

  const handleFavoriteClick = (e) => {
    e.stopPropagation();
    if (onToggleFavorite) {
      onToggleFavorite(recipe.id);
    }
  };

  const handleCardClick = () => {
    if (onSelectRecipe) {
      onSelectRecipe(recipe.id);
    }
  };

  // Sticker text generator based on recipe traits
  const getSticker = () => {
    if (recipe.featured) return { text: "CHEF'S PICK ★", cls: 'red' };
    if (totalTime <= 20) return { text: "SPEEDY ⚡", cls: 'orange' };
    if (recipe.difficulty === 'Easy') return { text: "NO SWEAT ✌", cls: 'yellow' };
    return { text: "FLAVOR BOMB 🔥", cls: 'olive' };
  };

  const sticker = getSticker();

  return (
    <article
      className={`recipe-card ${variant === 'featured' ? 'featured-spread' : ''}`}
      onClick={handleCardClick}
      style={{ cursor: 'pointer' }}
    >
      {/* Media & Photography Frame */}
      <div className="recipe-card-media">
        {/* Floating Corner Sticker */}
        <div className="card-sticker">
          <span className={`sticker-badge ${sticker.cls}`}>{sticker.text}</span>
        </div>

        {/* Favorite Heart Button */}
        <button
          className={`fav-btn ${isFavorite ? 'active' : ''}`}
          onClick={handleFavoriteClick}
          aria-label={isFavorite ? `Remove ${recipe.name} from favorites` : `Save ${recipe.name} to favorites`}
          title={isFavorite ? 'Remove from favorites' : 'Save to favorites'}
        >
          {isFavorite ? '❤️' : '🤍'}
        </button>

        {/* Image or Fallback */}
        {!imageError ? (
          <img
            src={recipe.image}
            alt={recipe.name}
            className="recipe-card-img"
            loading="lazy"
            onError={() => setImageError(true)}
          />
        ) : (
          <div className="recipe-img-fallback">
            <span style={{ fontSize: '2.5rem' }}>🍲</span>
            <span>{recipe.name}</span>
            <span style={{ fontSize: '0.75rem', color: 'var(--ink-muted)' }}>CRAVE! KITCHEN</span>
          </div>
        )}
      </div>

      {/* Card Content Details */}
      <div className="recipe-card-content">
        <div className="recipe-card-meta">
          <span className="meta-pill cuisine">{recipe.cuisine}</span>
          <span className="meta-pill">{recipe.category}</span>
          <span className="meta-time">⏱️ {totalTime}m</span>
        </div>

        <h3 className="recipe-card-title">{recipe.name}</h3>

        <p className="recipe-card-desc">{recipe.description}</p>

        {/* Dietary tags */}
        <div className="recipe-card-tags">
          {recipe.dietaryTags.slice(0, 2).map((tag) => (
            <span key={tag} className="diet-tag">
              {tag}
            </span>
          ))}
          {recipe.dietaryTags.length > 2 && (
            <span className="diet-tag">+{recipe.dietaryTags.length - 2}</span>
          )}
        </div>

        {/* Card Footer Actions */}
        <div className="recipe-card-footer">
          <button
            className="btn btn-outline btn-sm"
            onClick={(e) => {
              e.stopPropagation();
              onSelectRecipe(recipe.id);
            }}
          >
            View Recipe →
          </button>

          {onAddToMealPlan && (
            <button
              className="btn btn-secondary btn-sm"
              onClick={(e) => {
                e.stopPropagation();
                onAddToMealPlan(recipe);
              }}
              title="Add to weekly meal plan"
            >
              + Plan
            </button>
          )}
        </div>
      </div>
    </article>
  );
}
