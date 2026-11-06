import React, { useState } from 'react';
import MealSlot from '../components/MealSlot';
import { DAYS_OF_WEEK, MEAL_SLOTS } from '../utils/storage';
import { calculateMealPlanStats } from '../utils/recipeHelpers';

/**
 * MealPlanner Page Component
 * Interactive 7-Day x 3-Slot Weekly Menu Planner.
 * Features:
 * - Real-time statistics summary (Total meals, unique dishes, cooking hours, cuisines)
 * - 7-Day grid with Breakfast, Lunch, Dinner slots
 * - Quick recipe selector modal to assign any recipe to a slot
 * - One-click "Generate Shopping List from Plan" button
 * - Clear all meals with confirmation dialog
 * - Persistent localStorage state
 */
export default function MealPlanner({
  mealPlan,
  recipes = [],
  onAssignMeal,
  onRemoveMeal,
  onClearMealPlan,
  onSelectRecipe,
  onGenerateShoppingListFromPlan,
  onNavigate
}) {
  // Modal state for assigning a recipe to a specific day & slot
  const [activeSlotTarget, setActiveSlotTarget] = useState(null); // { day, slot }
  const [recipeSearch, setRecipeSearch] = useState('');
  const [showClearConfirm, setShowClearConfirm] = useState(false);

  // Map recipes by id for instantaneous O(1) lookup
  const recipesById = React.useMemo(() => {
    const map = {};
    recipes.forEach((r) => {
      map[r.id] = r;
    });
    return map;
  }, [recipes]);

  // Compute live statistics
  const stats = calculateMealPlanStats(mealPlan, recipesById);

  const handleOpenAssignModal = (day, slot) => {
    setActiveSlotTarget({ day, slot });
    setRecipeSearch('');
  };

  const handleSelectRecipeForSlot = (recipeId) => {
    if (activeSlotTarget) {
      onAssignMeal(activeSlotTarget.day, activeSlotTarget.slot, recipeId);
      setActiveSlotTarget(null);
    }
  };

  const handleClearAllConfirm = () => {
    onClearMealPlan();
    setShowClearConfirm(false);
  };

  // Filter recipes for assignment modal
  const modalFilteredRecipes = recipes.filter((r) => {
    if (!recipeSearch) return true;
    const q = recipeSearch.toLowerCase();
    return r.name.toLowerCase().includes(q) || r.cuisine.toLowerCase().includes(q) || r.category.toLowerCase().includes(q);
  });

  return (
    <div className="meal-planner-page container" style={{ paddingBottom: '4rem' }}>
      {/* Page Header */}
      <div className="page-header-block">
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
          <span className="sticker-badge yellow">WEEKLY NUTRITION & FLAVOR</span>
          <span className="sticker-badge red">7 DAYS • 21 SLOTS</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <h1 className="page-title">Weekly Meal Planner</h1>
            <p className="page-subtitle">
              Plan your week, eliminate decision fatigue, and automatically turn your planned dishes into a consolidated grocery list.
            </p>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
            <button
              className="btn btn-secondary"
              onClick={onGenerateShoppingListFromPlan}
              disabled={stats.totalMeals === 0}
              title={stats.totalMeals === 0 ? 'Plan at least 1 meal first' : 'Convert all planned meals to a shopping list'}
            >
              🛒 Generate Shopping List
            </button>

            {stats.totalMeals > 0 && (
              <button
                className="btn btn-outline btn-sm"
                onClick={() => setShowClearConfirm(true)}
              >
                Clear Week
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Summary Metrics Strip */}
      <div className="planner-stats-grid">
        <div className="stat-box highlight">
          <div className="stat-box-num">{stats.totalMeals}</div>
          <div className="stat-box-lbl">Meals Scheduled</div>
        </div>
        <div className="stat-box">
          <div className="stat-box-num">{stats.uniqueRecipesCount}</div>
          <div className="stat-box-lbl">Unique Dishes</div>
        </div>
        <div className="stat-box">
          <div className="stat-box-num">{stats.distinctCuisinesCount}</div>
          <div className="stat-box-lbl">Cuisines Represented</div>
        </div>
        <div className="stat-box">
          <div className="stat-box-num">{stats.totalCookingHours}h</div>
          <div className="stat-box-lbl">Est. Kitchen Time</div>
        </div>
      </div>

      {/* 7-Day Weekly Grid */}
      <div className="planner-grid">
        {DAYS_OF_WEEK.map((day) => {
          const dayPlan = mealPlan[day] || {};

          return (
            <div key={day} className="planner-day-col">
              <div className="planner-day-header">
                {day}
              </div>

              <div className="planner-day-slots">
                {MEAL_SLOTS.map((slot) => {
                  const recipeId = dayPlan[slot];
                  const recipe = recipeId ? recipesById[recipeId] : null;

                  return (
                    <MealSlot
                      key={`${day}-${slot}`}
                      day={day}
                      slot={slot}
                      recipe={recipe}
                      onAssignClick={handleOpenAssignModal}
                      onRemove={onRemoveMeal}
                      onSelectRecipe={onSelectRecipe}
                    />
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      {/* Empty State Banner if 0 meals are planned */}
      {stats.totalMeals === 0 && (
        <div className="empty-results-box" style={{ marginTop: '2.5rem' }}>
          <span style={{ fontSize: '3.5rem' }}>📅</span>
          <span className="sticker-badge orange">BLANK CANVAS</span>
          <h3>Your weekly menu is completely open</h3>
          <p style={{ maxWidth: '460px', color: 'var(--ink-muted)' }}>
            Start assigning delicious breakfasts, lunches, and dinners to your week. Click any slot above or browse all recipes.
          </p>
          <button className="btn btn-primary" onClick={() => onNavigate('discover')}>
            Explore Recipes to Plan →
          </button>
        </div>
      )}

      {/* Assign Recipe Modal */}
      {activeSlotTarget && (
        <div className="modal-backdrop" onClick={() => setActiveSlotTarget(null)}>
          <div className="modal-card" style={{ maxWidth: '640px' }} onClick={(e) => e.stopPropagation()}>
            <button
              className="modal-close-btn"
              onClick={() => setActiveSlotTarget(null)}
              aria-label="Close modal"
            >
              ✕
            </button>

            <span className="sticker-badge red" style={{ marginBottom: '0.75rem', display: 'inline-block' }}>
              CHOOSE DISH FOR {activeSlotTarget.day.toUpperCase()} {activeSlotTarget.slot.toUpperCase()}
            </span>

            <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>
              Select a Recipe to Assign
            </h3>

            {/* Modal search bar */}
            <input
              type="text"
              className="search-input"
              style={{ marginBottom: '1rem' }}
              placeholder="Search recipes by name or cuisine..."
              value={recipeSearch}
              onChange={(e) => setRecipeSearch(e.target.value)}
              autoFocus
            />

            {/* Scrollable list of recipes */}
            <div style={{ maxHeight: '380px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '0.5rem', paddingRight: '0.25rem' }}>
              {modalFilteredRecipes.map((r) => (
                <div
                  key={r.id}
                  onClick={() => handleSelectRecipeForSlot(r.id)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '0.75rem 1rem',
                    backgroundColor: 'var(--pure-white)',
                    border: 'var(--border-medium)',
                    boxShadow: 'var(--shadow-flat-sm)',
                    cursor: 'pointer',
                    transition: 'transform 0.15s ease'
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'var(--yellow-soft)')}
                  onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'var(--pure-white)')}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <img
                      src={r.image}
                      alt=""
                      style={{ width: '42px', height: '42px', objectFit: 'cover', borderRadius: '4px', border: '1.5px solid var(--ink-black)' }}
                    />
                    <div>
                      <div style={{ fontWeight: 800, fontFamily: 'var(--font-display)', fontSize: '0.95rem' }}>
                        {r.name}
                      </div>
                      <div style={{ fontSize: '0.75rem', fontFamily: 'var(--font-mono)', color: 'var(--ink-muted)' }}>
                        {r.cuisine} • {r.category} • ⏱️ {r.prepTime + r.cookTime}m
                      </div>
                    </div>
                  </div>

                  <button className="btn btn-primary btn-sm">
                    Assign +
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Clear Confirmation Modal */}
      {showClearConfirm && (
        <div className="modal-backdrop" onClick={() => setShowClearConfirm(false)}>
          <div className="modal-card" onClick={(e) => e.stopPropagation()}>
            <button
              className="modal-close-btn"
              onClick={() => setShowClearConfirm(false)}
            >
              ✕
            </button>
            <span className="sticker-badge orange" style={{ marginBottom: '0.75rem', display: 'inline-block' }}>
              CONFIRMATION
            </span>
            <h3 style={{ fontSize: '1.4rem', marginBottom: '0.5rem' }}>
              Clear all planned meals?
            </h3>
            <p style={{ color: 'var(--ink-soft)', marginBottom: '1.25rem' }}>
              Are you sure you want to clear your entire weekly schedule? This action will reset all 7 days.
            </p>
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem' }}>
              <button className="btn btn-outline" onClick={() => setShowClearConfirm(false)}>
                Cancel
              </button>
              <button className="btn btn-primary" onClick={handleClearAllConfirm}>
                Yes, Clear Week
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
