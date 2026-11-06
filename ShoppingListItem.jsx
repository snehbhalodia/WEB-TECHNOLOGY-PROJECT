import React from 'react';
import { formatAmount } from '../utils/recipeHelpers';

/**
 * ShoppingListItem Component
 * Individual interactive row in the shopping list with custom styled checkbox,
 * formatted quantity pill, ingredient name, and delete button.
 */
export default function ShoppingListItem({ item, onToggle, onRemove }) {
  if (!item) return null;

  const formattedAmount = formatAmount(item.amount);

  return (
    <li className={`shopping-item-card ${item.completed ? 'completed' : ''}`}>
      <div className="shopping-item-content">
        <input
          type="checkbox"
          id={`shop-${item.id}`}
          checked={!!item.completed}
          onChange={() => onToggle(item.id)}
          style={{ width: '1.25rem', height: '1.25rem', accentColor: 'var(--tomato-red)', cursor: 'pointer' }}
          aria-label={`Mark ${item.name} as purchased`}
        />

        {formattedAmount && (
          <span className="shopping-qty-pill">
            {formattedAmount} {item.unit}
          </span>
        )}

        <label
          htmlFor={`shop-${item.id}`}
          className="shopping-item-name"
          style={{ cursor: 'pointer', margin: 0 }}
        >
          {item.name}
          {item.notes && (
            <span style={{ fontSize: '0.8rem', color: 'var(--ink-muted)', fontStyle: 'italic', marginLeft: '0.35rem' }}>
              ({item.notes})
            </span>
          )}
        </label>
      </div>

      <button
        type="button"
        className="shopping-delete-btn"
        onClick={() => onRemove(item.id)}
        aria-label={`Delete ${item.name} from list`}
        title="Delete item"
      >
        🗑️
      </button>
    </li>
  );
}
