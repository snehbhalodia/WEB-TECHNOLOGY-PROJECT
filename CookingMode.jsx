import React, { useState, useEffect } from 'react';

/**
 * CookingMode Component
 * Fullscreen focused step-by-step cooking interface.
 * Features:
 * - Large readable typography
 * - Step counter & progress meter
 * - Drawer toggle for quick ingredient reference
 * - Step navigation (Next / Prev / Finish)
 * - Celebratory completion screen
 */
export default function CookingMode({ recipe, onExit }) {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [showIngredientsDrawer, setShowIngredientsDrawer] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);

  if (!recipe || !recipe.instructions || recipe.instructions.length === 0) {
    return null;
  }

  const steps = recipe.instructions;
  const totalSteps = steps.length;
  const progressPercent = Math.round(((currentStepIndex + 1) / totalSteps) * 100);

  // Keyboard navigation support (Arrow keys)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowRight') {
        handleNext();
      } else if (e.key === 'ArrowLeft') {
        handlePrev();
      } else if (e.key === 'Escape') {
        onExit();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentStepIndex, isCompleted]);

  const handleNext = () => {
    if (currentStepIndex < totalSteps - 1) {
      setCurrentStepIndex(currentStepIndex + 1);
    } else {
      setIsCompleted(true);
    }
  };

  const handlePrev = () => {
    if (isCompleted) {
      setIsCompleted(false);
    } else if (currentStepIndex > 0) {
      setCurrentStepIndex(currentStepIndex - 1);
    }
  };

  const handleRestart = () => {
    setCurrentStepIndex(0);
    setIsCompleted(false);
  };

  return (
    <div className="cooking-mode-overlay" role="dialog" aria-modal="true" aria-label="Cooking Mode">
      {/* Top Header */}
      <header className="cooking-mode-header">
        <div>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--butter-yellow)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            🍳 Active Cooking Mode
          </span>
          <h2 style={{ fontSize: '1.25rem', color: 'var(--pure-white)', margin: 0 }}>
            {recipe.name}
          </h2>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <button
            className="btn btn-secondary btn-sm"
            onClick={() => setShowIngredientsDrawer(!showIngredientsDrawer)}
          >
            📋 {showIngredientsDrawer ? 'Hide Ingredients' : 'View Ingredients'}
          </button>
          <button
            className="btn btn-outline btn-sm"
            onClick={onExit}
            aria-label="Exit cooking mode"
          >
            ✕ Exit
          </button>
        </div>
      </header>

      {/* Progress Bar */}
      <div className="cooking-progress-container" aria-label={`Progress: ${progressPercent}%`}>
        <div
          className="cooking-progress-bar"
          style={{ width: `${isCompleted ? 100 : progressPercent}%` }}
        ></div>
      </div>

      {/* Main Cooking Stage */}
      <main className="cooking-stage">
        {!isCompleted ? (
          <div className="step-card">
            {/* Step Counter Tag */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div className="step-number-tag">
                {String(currentStepIndex + 1).padStart(2, '0')}
              </div>
              <span className="sticker-badge orange">
                STEP {currentStepIndex + 1} OF {totalSteps}
              </span>
            </div>

            {/* Step Instruction */}
            <p className="step-instruction">
              {steps[currentStepIndex]}
            </p>

            {/* Navigation Buttons */}
            <div className="cooking-nav-controls">
              <button
                type="button"
                className="btn btn-outline"
                onClick={handlePrev}
                disabled={currentStepIndex === 0}
                style={{ opacity: currentStepIndex === 0 ? 0.4 : 1 }}
              >
                ← Previous Step
              </button>

              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem', color: 'var(--ink-muted)' }}>
                Press <kbd style={{ padding: '0.2rem 0.4rem', border: '1px solid #999', borderRadius: '3px' }}>→</kbd> for next
              </div>

              <button
                type="button"
                className="btn btn-primary"
                onClick={handleNext}
              >
                {currentStepIndex === totalSteps - 1 ? 'Finish Dish 🎉' : 'Next Step →'}
              </button>
            </div>
          </div>
        ) : (
          /* Completion Celebratory Screen */
          <div className="step-card" style={{ textAlign: 'center', padding: '3.5rem 2rem' }}>
            <span style={{ fontSize: '5rem', display: 'block', marginBottom: '1rem' }}>
              👨‍🍳 🌟 🍽️
            </span>
            <span className="sticker-badge red" style={{ margin: '0 auto 1rem', transform: 'rotate(-2deg)' }}>
              100% CULINARY TRIUMPH
            </span>
            <h2 style={{ fontSize: '2.5rem', marginBottom: '0.75rem' }}>
              BON APPÉTIT!
            </h2>
            <p style={{ fontSize: '1.25rem', maxWidth: '520px', margin: '0 auto 2rem' }}>
              You've successfully brought <strong>{recipe.name}</strong> to the table. Plate it, snap a photo, and dig in!
            </p>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
              <button className="btn btn-outline" onClick={handleRestart}>
                🔄 Cook Again From Step 1
              </button>
              <button className="btn btn-primary" onClick={onExit}>
                Return to Recipe Journal →
              </button>
            </div>
          </div>
        )}

        {/* Collapsible Ingredients Reference Drawer */}
        {showIngredientsDrawer && (
          <aside
            style={{
              backgroundColor: 'var(--pure-white)',
              border: 'var(--border-thick)',
              boxShadow: 'var(--shadow-flat)',
              padding: '1.5rem',
              marginTop: '1rem'
            }}
            aria-label="Recipe Ingredients Reference"
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
              <h3 style={{ fontSize: '1.15rem' }}>Quick Ingredient Reference</h3>
              <span className="meta-pill">Serves {recipe.servings}</span>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '0.65rem' }}>
              {recipe.ingredients.map((ing, i) => (
                <div key={i} style={{ fontSize: '0.9rem', padding: '0.35rem 0.65rem', backgroundColor: 'var(--warm-ivory)', border: '1px solid var(--ink-black)' }}>
                  <strong>{ing.amount} {ing.unit}</strong> {ing.name}
                </div>
              ))}
            </div>
          </aside>
        )}
      </main>
    </div>
  );
}
