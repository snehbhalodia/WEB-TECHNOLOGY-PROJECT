import React, { useState } from 'react';
import IngredientChecklist from '../components/IngredientChecklist';

/**
 * RecipeDetail Page Component
 * Immersive editorial magazine spread for a single recipe.
 * Features:
 * - High-resolution food photography
 * - Dynamic serving size calculator
 * - Interactive strike-through ingredient checklist
 * - Numbered cooking instruction steps
 * - Persistent favorite toggle
 * - Direct triggers: Start Cooking Mode, Add to Meal Plan, Add Ingredients to Shopping List
 */
export default function RecipeDetail({
  recipe,
  isFavorite = false,
  onToggleFavorite,
  onStartCooking,
  onAddToMealPlan,
  onAddIngredientsToShoppingList,
  onBack
}) {
  if (!recipe) {
    return (
      <div className="container" style={{ padding: '4rem 1rem', textAlign: 'center' }}>
        <h2>Recipe not found</h2>
        <button className="btn btn-primary" onClick={onBack} style={{ marginTop: '1rem' }}>
          ← Back to Discover
        </button>
      </div>
    );
  }

  // Local state for dynamic serving scaling
  const [servings, setServings] = useState(recipe.servings || 4);
  // Local state for checking off ingredients
  const [checkedIngredients, setCheckedIngredients] = useState({});
  // State for Add to Meal Plan modal
  const [showMealPlanModal, setShowMealPlanModal] = useState(false);
  const [selectedDay, setSelectedDay] = useState('Monday');
  const [selectedSlot, setSelectedSlot] = useState('Dinner');
  const [addedToListSuccess, setAddedToListSuccess] = useState(false);

  const totalTime = (recipe.prepTime || 0) + (recipe.cookTime || 0);

  const handleToggleCheck = (index) => {
    setCheckedIngredients((prev) => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  const handleAddShoppingList = () => {
    if (onAddIngredientsToShoppingList) {
      onAddIngredientsToShoppingList(recipe, servings);
      setAddedToListSuccess(true);
      setTimeout(() => setAddedToListSuccess(false), 3000);
    }
  };

  const handleConfirmMealPlan = () => {
    if (onAddToMealPlan) {
      onAddToMealPlan(selectedDay, selectedSlot, recipe.id);
      setShowMealPlanModal(false);
    }
  };

  return (
    <div className="recipe-detail-page container">
      {/* Top Navigation Breadcrumb */}
      <div style={{ padding: '1.5rem 0 0.5rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
        <button
          className="btn btn-outline btn-sm"
          onClick={onBack}
        >
          ← Back to Recipes
        </button>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <button
            className={`btn ${isFavorite ? 'btn-primary' : 'btn-outline'} btn-sm`}
            onClick={() => onToggleFavorite(recipe.id)}
          >
            {isFavorite ? '❤️ Saved to Favorites' : '🤍 Save to Favorites'}
          </button>

          <button
            className="btn btn-secondary btn-sm"
            onClick={() => setShowMealPlanModal(true)}
          >
            📅 Add to Meal Plan
          </button>
        </div>
      </div>

      {/* Main Two-Column Editorial Spread */}
      <div className="detail-layout">
        {/* Left Column: Photo, Badges, Metrics, Actions */}
        <div className="detail-left-col">
          <div className="detail-photo-frame">
            <div className="detail-photo-img-wrap">
              <img
                src={recipe.image}
                alt={recipe.name}
              />
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '0.75rem' }}>
              <span className="sticker-badge red">{recipe.cuisine} CUISINE</span>
              <span className="sticker-badge yellow">{recipe.category}</span>
            </div>
          </div>

          {/* Quick Metrics Bar */}
          <div className="detail-metrics-bar">
            <div className="metric-card">
              <div className="metric-label">Prep Time</div>
              <div className="metric-val">{recipe.prepTime}m</div>
            </div>
            <div className="metric-card">
              <div className="metric-label">Cook Time</div>
              <div className="metric-val">{recipe.cookTime}m</div>
            </div>
            <div className="metric-card">
              <div className="metric-label">Total Time</div>
              <div className="metric-val">{totalTime}m</div>
            </div>
          </div>

          {/* Recipe Description & Dietary Tags */}
          <div style={{ backgroundColor: 'var(--pure-white)', border: 'var(--border-medium)', padding: '1.25rem', boxShadow: 'var(--shadow-flat-sm)' }}>
            <h4 style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--ink-muted)', marginBottom: '0.35rem' }}>
              About this dish
            </h4>
            <p style={{ fontSize: '1.05rem', lineHeight: '1.6', color: 'var(--ink-black)' }}>
              {recipe.description}
            </p>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', marginTop: '1rem' }}>
              {recipe.dietaryTags.map((tag) => (
                <span key={tag} className="diet-tag">
                  {tag}
                </span>
              ))}
              {recipe.moodTags.map((mood) => (
                <span key={mood} className="diet-tag" style={{ backgroundColor: 'var(--yellow-soft)' }}>
                  ✨ {mood}
                </span>
              ))}
            </div>
          </div>

          {/* Primary Action Buttons */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <button
              className="btn btn-primary"
              onClick={() => onStartCooking(recipe)}
              style={{ padding: '1rem 1.5rem', fontSize: '1.1rem' }}
            >
              🚀 Start Interactive Cooking Mode
            </button>

            <button
              className="btn btn-secondary"
              onClick={handleAddShoppingList}
            >
              {addedToListSuccess ? '✓ Ingredients Added to Shopping List!' : '🛒 Add Ingredients to Shopping List'}
            </button>
          </div>
        </div>

        {/* Right Column: Dynamic Ingredients & Numbered Instructions */}
        <div className="detail-right-col">
          {/* Header Title Block */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
              <span className="meta-pill cuisine">{recipe.cuisine}</span>
              <span className="meta-pill">{recipe.difficulty} Difficulty</span>
            </div>
            <h1 style={{ fontSize: 'clamp(2.2rem, 4vw, 3.25rem)', lineHeight: 1.1 }}>
              {recipe.name}
            </h1>
          </div>

          {/* Interactive Scalable Ingredient Checklist */}
          <div style={{ backgroundColor: 'var(--pure-white)', border: 'var(--border-thick)', boxShadow: 'var(--shadow-flat)', padding: '1.5rem' }}>
            <IngredientChecklist
              ingredients={recipe.ingredients}
              baseServings={recipe.servings}
              currentServings={servings}
              onServingsChange={setServings}
              checkedMap={checkedIngredients}
              onToggleCheck={handleToggleCheck}
            />
          </div>

          {/* Numbered Cooking Instructions */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
              <h3 style={{ fontSize: '1.5rem' }}>Method & Steps</h3>
              <span className="sticker-badge orange">
                {recipe.instructions.length} STEP PROCESS
              </span>
            </div>

            <ol className="recipe-instruction-list">
              {recipe.instructions.map((step, idx) => (
                <li key={idx} className="instruction-step">
                  <div className="step-num-bubble">{idx + 1}</div>
                  <div className="step-text">{step}</div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>

      {/* Add to Meal Plan Modal */}
      {showMealPlanModal && (
        <div className="modal-backdrop" onClick={() => setShowMealPlanModal(false)}>
          <div className="modal-card" onClick={(e) => e.stopPropagation()}>
            <button
              className="modal-close-btn"
              onClick={() => setShowMealPlanModal(false)}
              aria-label="Close modal"
            >
              ✕
            </button>

            <span className="sticker-badge yellow" style={{ marginBottom: '0.75rem', display: 'inline-block' }}>
              SCHEDULE MEAL
            </span>

            <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>
              Add to Weekly Meal Plan
            </h3>

            <p style={{ fontSize: '0.95rem', color: 'var(--ink-soft)', marginBottom: '1.25rem' }}>
              Choose which day and meal slot you want to cook <strong>{recipe.name}</strong>.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div>
                <label style={{ display: 'block', fontFamily: 'var(--font-mono)', fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', marginBottom: '0.35rem' }}>
                  Select Day:
                </label>
                <select
                  className="filter-select"
                  style={{ width: '100%' }}
                  value={selectedDay}
                  onChange={(e) => setSelectedDay(e.target.value)}
                >
                  {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map((day) => (
                    <option key={day} value={day}>{day}</option>
                  ))}
                </select>
              </div>

              <div>
                <label style={{ display: 'block', fontFamily: 'var(--font-mono)', fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', marginBottom: '0.35rem' }}>
                  Select Meal Slot:
                </label>
                <select
                  className="filter-select"
                  style={{ width: '100%' }}
                  value={selectedSlot}
                  onChange={(e) => setSelectedSlot(e.target.value)}
                >
                  <option value="Breakfast">🥞 Breakfast</option>
                  <option value="Lunch">🥪 Lunch</option>
                  <option value="Dinner">🍲 Dinner</option>
                </select>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '1rem' }}>
                <button
                  type="button"
                  className="btn btn-outline"
                  onClick={() => setShowMealPlanModal(false)}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={handleConfirmMealPlan}
                >
                  Confirm & Schedule 📅
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
