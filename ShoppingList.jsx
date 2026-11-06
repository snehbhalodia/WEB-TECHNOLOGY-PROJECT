import React, { useState } from 'react';
import ShoppingListItem from '../components/ShoppingListItem';

/**
 * ShoppingList Page Component
 * Interactive grocery checklist with real-time counters, custom item creation,
 * unit-aware ingredient combinations, and persistent localStorage sync.
 */
export default function ShoppingList({
  items = [],
  onToggleItem,
  onRemoveItem,
  onAddCustomItem,
  onClearCompleted,
  onClearAll,
  onNavigate
}) {
  const [itemName, setItemName] = useState('');
  const [itemAmount, setItemAmount] = useState('');
  const [itemUnit, setItemUnit] = useState('pieces');
  const [filterMode, setFilterMode] = useState('all'); // 'all' | 'remaining' | 'completed'
  const [showClearConfirm, setShowClearConfirm] = useState(false);

  // Counters
  const totalCount = items.length;
  const completedCount = items.filter((i) => i.completed).length;
  const remainingCount = totalCount - completedCount;

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!itemName.trim()) return;

    const parsedAmount = itemAmount ? parseFloat(itemAmount) : 1;
    onAddCustomItem({
      name: itemName.trim(),
      amount: isNaN(parsedAmount) ? 1 : parsedAmount,
      unit: itemUnit || 'pieces'
    });

    setItemName('');
    setItemAmount('');
  };

  const filteredItems = items.filter((item) => {
    if (filterMode === 'remaining') return !item.completed;
    if (filterMode === 'completed') return item.completed;
    return true;
  });

  const handleConfirmClearAll = () => {
    onClearAll();
    setShowClearConfirm(false);
  };

  return (
    <div className="shopping-list-page container" style={{ paddingBottom: '4rem' }}>
      {/* Page Header */}
      <div className="page-header-block">
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
          <span className="sticker-badge red">GROCERY RUN</span>
          <span className="sticker-badge yellow">
            {remainingCount} ITEMS LEFT • {completedCount} PURCHASED
          </span>
        </div>
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <h1 className="page-title">Shopping List</h1>
            <p className="page-subtitle">
              Generated automatically from your weekly meal plan and selected recipes. Compatible units are intelligently merged.
            </p>
          </div>

          {totalCount > 0 && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
              {completedCount > 0 && (
                <button
                  className="btn btn-outline btn-sm"
                  onClick={onClearCompleted}
                  title="Remove all checked-off items"
                >
                  ✓ Clear Completed ({completedCount})
                </button>
              )}

              <button
                className="btn btn-primary btn-sm"
                onClick={() => setShowClearConfirm(true)}
              >
                Clear All Items
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Main Two-Column Layout */}
      <div className="shopping-layout">
        {/* Left Column: Add Custom Ingredient Form */}
        <div className="add-custom-item-card">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span className="sticker-badge orange">MANUAL ENTRY</span>
            <h3 style={{ fontSize: '1.25rem' }}>Add Custom Item</h3>
          </div>
          <p style={{ fontSize: '0.85rem', color: 'var(--ink-muted)' }}>
            Need coffee beans, sparkling water, or pantry essentials not tied to a recipe? Add them directly.
          </p>

          <form onSubmit={handleFormSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <div>
              <label style={{ display: 'block', fontFamily: 'var(--font-mono)', fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', marginBottom: '0.25rem' }}>
                Item Name *
              </label>
              <input
                type="text"
                className="custom-input"
                placeholder="e.g., Sourdough bread, Oat milk..."
                value={itemName}
                onChange={(e) => setItemName(e.target.value)}
                required
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
              <div>
                <label style={{ display: 'block', fontFamily: 'var(--font-mono)', fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', marginBottom: '0.25rem' }}>
                  Quantity
                </label>
                <input
                  type="number"
                  step="0.1"
                  min="0.1"
                  className="custom-input"
                  placeholder="e.g. 2"
                  value={itemAmount}
                  onChange={(e) => setItemAmount(e.target.value)}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontFamily: 'var(--font-mono)', fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', marginBottom: '0.25rem' }}>
                  Unit
                </label>
                <select
                  className="custom-input"
                  value={itemUnit}
                  onChange={(e) => setItemUnit(e.target.value)}
                >
                  <option value="pieces">pieces / units</option>
                  <option value="g">grams (g)</option>
                  <option value="kg">kilograms (kg)</option>
                  <option value="cup">cup(s)</option>
                  <option value="tbsp">tablespoon(s)</option>
                  <option value="tsp">teaspoon(s)</option>
                  <option value="can">can(s)</option>
                  <option value="bunch">bunch</option>
                  <option value="leaves">leaves</option>
                </select>
              </div>
            </div>

            <button type="submit" className="btn btn-primary" style={{ marginTop: '0.5rem' }}>
              + Add to List
            </button>
          </form>

          {/* Quick Add Staples */}
          <div style={{ marginTop: '1rem', borderTop: '1px dashed var(--border-ink)', paddingTop: '1rem' }}>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', color: 'var(--ink-muted)', display: 'block', marginBottom: '0.5rem' }}>
              Quick Add Pantry Staples:
            </span>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem' }}>
              {[
                { name: 'Olive Oil', amount: 1, unit: 'bottle' },
                { name: 'Garlic Bulbs', amount: 3, unit: 'pieces' },
                { name: 'Flaky Sea Salt', amount: 1, unit: 'box' },
                { name: 'Lemons', amount: 4, unit: 'pieces' },
                { name: 'Fresh Butter', amount: 250, unit: 'g' }
              ].map((staple) => (
                <button
                  key={staple.name}
                  type="button"
                  className="filter-pill"
                  style={{ fontSize: '0.75rem', padding: '0.2rem 0.5rem' }}
                  onClick={() => onAddCustomItem(staple)}
                >
                  + {staple.name}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Interactive Shopping Checklist */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {/* Filter Pills */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.75rem' }}>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <button
                className={`filter-pill ${filterMode === 'all' ? 'active' : ''}`}
                onClick={() => setFilterMode('all')}
              >
                All ({totalCount})
              </button>
              <button
                className={`filter-pill ${filterMode === 'remaining' ? 'active' : ''}`}
                onClick={() => setFilterMode('remaining')}
              >
                To Buy ({remainingCount})
              </button>
              <button
                className={`filter-pill ${filterMode === 'completed' ? 'active' : ''}`}
                onClick={() => setFilterMode('completed')}
              >
                Purchased ({completedCount})
              </button>
            </div>
          </div>

          {/* List of items */}
          {filteredItems.length > 0 ? (
            <ul className="shopping-items-list" style={{ listStyle: 'none' }}>
              {filteredItems.map((item) => (
                <ShoppingListItem
                  key={item.id}
                  item={item}
                  onToggle={onToggleItem}
                  onRemove={onRemoveItem}
                />
              ))}
            </ul>
          ) : (
            <div className="empty-results-box">
              <span style={{ fontSize: '3.5rem' }}>🛒</span>
              <span className="sticker-badge yellow">YOUR BASKET IS CLEAR</span>
              <h3 style={{ fontSize: '1.5rem', margin: 0 }}>
                {filterMode === 'completed'
                  ? 'No purchased items yet'
                  : 'No ingredients on your shopping list'}
              </h3>
              <p style={{ maxWidth: '420px', color: 'var(--ink-muted)' }}>
                Add items using the form on the left, or visit the Recipe Journal and Weekly Meal Planner to add complete dish ingredients with one click.
              </p>
              <button className="btn btn-secondary" onClick={() => onNavigate('discover')}>
                Explore Recipes →
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Clear List Confirmation Modal */}
      {showClearConfirm && (
        <div className="modal-backdrop" onClick={() => setShowClearConfirm(false)}>
          <div className="modal-card" onClick={(e) => e.stopPropagation()}>
            <button
              className="modal-close-btn"
              onClick={() => setShowClearConfirm(false)}
            >
              ✕
            </button>
            <span className="sticker-badge red" style={{ marginBottom: '0.75rem', display: 'inline-block' }}>
              CLEAR WARNING
            </span>
            <h3 style={{ fontSize: '1.4rem', marginBottom: '0.5rem' }}>
              Clear entire shopping list?
            </h3>
            <p style={{ color: 'var(--ink-soft)', marginBottom: '1.25rem' }}>
              This will permanently delete all {totalCount} items from your shopping list. This cannot be undone.
            </p>
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem' }}>
              <button className="btn btn-outline" onClick={() => setShowClearConfirm(false)}>
                Cancel
              </button>
              <button className="btn btn-primary" onClick={handleConfirmClearAll}>
                Yes, Clear Everything
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
