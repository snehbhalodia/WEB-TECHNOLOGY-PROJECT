import React from 'react';
import { scaleAmount, formatAmount } from '../utils/recipeHelpers';

/**
 * IngredientChecklist Component
 * Renders serving multiplier buttons and an interactive checklist
 * where clicking toggles item completion with strike-through styling.
 */
export default function IngredientChecklist({
  ingredients = [],
  baseServings = 4,
  currentServings = 4,
  onServingsChange,
  checkedMap = {},
  onToggleCheck
}) {
  const handleDecrement = () => {
    if (currentServings > 1 && onServingsChange) {
      onServingsChange(currentServings - 1);
    }
  };

  const handleIncrement = () => {
    if (currentServings < 20 && onServingsChange) {
      onServingsChange(currentServings + 1);
    }
  };

  const checkedCount = Object.values(checkedMap).filter(Boolean).length;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      {/* Header with Serving Scaler */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.75rem' }}>
        <div>
          <h3 style={{ fontSize: '1.4rem' }}>Ingredients Required</h3>
          <span style={{ fontSize: '0.85rem', color: 'var(--ink-muted)' }}>
            {checkedCount} of {ingredients.length} checked
          </span>
        </div>

        {/* Servings Modifier */}
        <div className="servings-controller" title="Adjust serving quantity to scale ingredients">
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase' }}>
            Servings:
          </span>
          <button
            type="button"
            className="servings-btn"
            onClick={handleDecrement}
            disabled={currentServings <= 1}
            aria-label="Decrease servings"
          >
            -
          </button>
          <span className="servings-value">{currentServings}</span>
          <button
            type="button"
            className="servings-btn"
            onClick={handleIncrement}
            disabled={currentServings >= 20}
            aria-label="Increase servings"
          >
            +
          </button>
        </div>
      </div>

      {/* Checklist items */}
      <ul className="ingredient-checklist">
        {ingredients.map((ing, idx) => {
          const isChecked = !!checkedMap[idx];
          const scaled = scaleAmount(ing.amount, baseServings, currentServings);
          const formattedAmount = formatAmount(scaled);

          return (
            <li
              key={`${ing.name}-${idx}`}
              className={`ingredient-item ${isChecked ? 'checked' : ''}`}
              onClick={() => onToggleCheck(idx)}
              role="checkbox"
              aria-checked={isChecked}
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === ' ' || e.key === 'Enter') {
                  e.preventDefault();
                  onToggleCheck(idx);
                }
              }}
            >
              <div className="ingredient-checkbox">
                {isChecked ? '✓' : ''}
              </div>

              <div className="ingredient-text">
                {formattedAmount && (
                  <span className="ingredient-amount-badge">
                    {formattedAmount} {ing.unit}
                  </span>
                )}
                <span>{ing.name}</span>
                {ing.notes && (
                  <span style={{ color: 'var(--ink-muted)', fontStyle: 'italic', marginLeft: '0.35rem', fontSize: '0.85rem' }}>
                    ({ing.notes})
                  </span>
                )}
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
