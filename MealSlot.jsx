import React from 'react';

/**
 * MealSlot Component
 * Renders an individual slot within the 7-day meal planner.
 * If filled: displays thumbnail, name, view trigger, and remove button.
 * If empty: provides an intuitive "+ Add Dish" trigger.
 */
export default function MealSlot({
  day,
  slot,
  recipe = null,
  onAssignClick,
  onRemove,
  onSelectRecipe
}) {
  const slotEmojis = {
    Breakfast: '🥞',
    Lunch: '🥪',
    Dinner: '🍲'
  };

  return (
    <div className={`meal-slot ${recipe ? 'has-recipe' : ''}`}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.25rem' }}>
        <span className="slot-tag">
          {slotEmojis[slot] || '🍽️'} {slot}
        </span>
        {recipe && (
          <button
            type="button"
            className="slot-clear-btn"
            onClick={(e) => {
              e.stopPropagation();
              onRemove(day, slot);
            }}
            aria-label={`Remove ${recipe.name} from ${day} ${slot}`}
            title="Remove meal"
          >
            ✕ Remove
          </button>
        )}
      </div>

      {recipe ? (
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: 'auto' }}>
          {recipe.image && (
            <img
              src={recipe.image}
              alt=""
              style={{
                width: '36px',
                height: '36px',
                objectFit: 'cover',
                borderRadius: '4px',
                border: '1.5px solid var(--ink-black)',
                flexShrink: 0
              }}
            />
          )}
          <div style={{ overflow: 'hidden' }}>
            <h4
              className="slot-recipe-title"
              onClick={() => onSelectRecipe(recipe.id)}
              title={`View ${recipe.name}`}
            >
              {recipe.name}
            </h4>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: 'var(--ink-muted)' }}>
              ⏱️ {(recipe.prepTime || 0) + (recipe.cookTime || 0)}m
            </span>
          </div>
        </div>
      ) : (
        <button
          type="button"
          className="slot-empty-action"
          onClick={() => onAssignClick(day, slot)}
          aria-label={`Assign meal for ${day} ${slot}`}
        >
          <span>+ Add Dish</span>
        </button>
      )}
    </div>
  );
}
