import React, { useState } from 'react';
import { CATEGORIES, MOODS, CUISINES } from '../data/recipes';
import RecipeCard from '../components/RecipeCard';
import CategoryTile from '../components/CategoryTile';

/**
 * Home Page Component
 * The visual centerpiece of CRAVE!
 * Features:
 * - Asymmetrical maximalist collage hero with overlapping shapes & stickers
 * - Category tiles ("What are you craving?")
 * - Trending editorial recipes
 * - Interactive food mood picker
 * - Around the world in six cuisines
 * - Weekly meal plan live preview
 * - Join the CRAVE! club newsletter with live frontend validation
 */
export default function Home({
  recipes,
  favorites,
  mealPlan,
  onToggleFavorite,
  onSelectRecipe,
  onNavigate,
  onSelectCategory,
  onSelectMood,
  onSelectCuisine
}) {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSubmitted, setNewsletterSubmitted] = useState(false);
  const [newsletterError, setNewsletterError] = useState('');

  // Curated hero featured dish: Crispy Golden Masala Dosa
  const heroRecipe = recipes.find((r) => r.id === 'masala-dosa') || recipes[0];

  // Featured trending recipes for Section B
  const trendingRecipes = recipes.filter((r) => r.featured).slice(0, 5);

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    if (!newsletterEmail || !newsletterEmail.includes('@') || !newsletterEmail.includes('.')) {
      setNewsletterError('Please enter a valid email address (e.g., foodie@crave.com)');
      return;
    }
    setNewsletterError('');
    setNewsletterSubmitted(true);
  };

  // Check if user has planned any meals for Section E
  const hasPlannedMeals = Object.values(mealPlan).some((day) =>
    Object.values(day).some(Boolean)
  );

  return (
    <div className="home-page">
      {/* ==================================================================
          1. HERO SECTION (ASYMMETRICAL MAXIMALIST COLLAGE)
          ================================================================== */}
      <section className="hero-section">
        <div className="container">
          <div className="hero-grid">
            {/* Left Column: Bold Headline & Editorial Voice */}
            <div className="hero-content">
              <div className="hero-top-sticker-wrap">
                <span className="sticker-badge red">★ FRESH AUTUMN DROP</span>
                <span className="sticker-badge yellow">ISSUE #42</span>
              </div>

              <h1 className="hero-headline">
                GOOD FOOD. <br />
                <span className="hero-headline-accent">ZERO BORING.</span>
              </h1>

              <p className="hero-description">
                Find your next obsession, learn to make it, and bring something delicious to the table. Modern recipes, weekly meal planning, and interactive smart shopping lists—crafted for passionate home cooks.
              </p>

              {/* CTAs */}
              <div className="hero-cta-group">
                <button
                  className="btn btn-primary btn-pill"
                  onClick={() => onNavigate('discover')}
                >
                  Explore 16+ Recipes ↗
                </button>
                <button
                  className="btn btn-secondary btn-pill"
                  onClick={() => onNavigate('meal-planner')}
                >
                  Plan My Meals 📅
                </button>
              </div>

              {/* Hand-drawn editorial pointer */}
              <div className="hero-arrow-container">
                <svg width="48" height="32" viewBox="0 0 60 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M5 20 C20 10, 35 30, 50 18 M40 10 L52 18 L42 28"
                    stroke="#FF8126"
                    strokeWidth="3.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <span>Today's Cover Dish: {heroRecipe.name}</span>
              </div>
            </div>

            {/* Right Column: Dramatic Overlapping Food Collage */}
            <div className="hero-visual-frame">
              {/* Asymmetrical colored backdrop blocks */}
              <div className="hero-color-block-1" aria-hidden="true"></div>
              <div className="hero-color-block-2" aria-hidden="true"></div>

              {/* Rotated Warning Sticker */}
              <div className="hero-rotated-sticker">
                <span className="sticker-badge yellow" style={{ fontSize: '0.85rem', transform: 'rotate(6deg)' }}>
                  ⚠️ WARNING: MAY CAUSE HUNGER
                </span>
              </div>

              {/* Main Photo Card */}
              <div
                className="hero-main-photo-card"
                onClick={() => onSelectRecipe(heroRecipe.id)}
                style={{ cursor: 'pointer' }}
                title={`Open recipe for ${heroRecipe.name}`}
              >
                <div className="hero-main-photo-wrap">
                  <img
                    src={heroRecipe.image}
                    alt={heroRecipe.name}
                  />
                </div>
                <div className="hero-photo-caption">
                  <div>
                    <h3 className="hero-photo-dish-title">{heroRecipe.name}</h3>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--ink-muted)' }}>
                      ⏱️ {heroRecipe.prepTime + heroRecipe.cookTime} mins • {heroRecipe.cuisine}
                    </span>
                  </div>
                  <span className="hero-photo-dish-badge">COVER STORY</span>
                </div>
              </div>

              {/* Floating Bottom Stamp */}
              <div className="hero-floating-badge">
                <span className="sticker-badge red" style={{ transform: 'rotate(-4deg)' }}>
                  CHEF'S SIGNATURE 100% FLAVOR
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==================================================================
          A. WHAT ARE YOU CRAVING? (CATEGORY TILES)
          ================================================================== */}
      <section className="home-section" style={{ backgroundColor: 'var(--pure-white)', borderTop: 'var(--border-thick)', borderBottom: 'var(--border-thick)' }}>
        <div className="container">
          <div className="home-section-header">
            <div>
              <span className="section-eyebrow">INDEX BY MEAL</span>
              <h2 className="section-title">What are you craving?</h2>
            </div>
            <button
              className="btn btn-outline btn-sm"
              onClick={() => onNavigate('discover')}
            >
              Browse All Categories →
            </button>
          </div>

          <div className="categories-grid">
            {CATEGORIES.filter((c) => c.id !== 'all').map((cat) => (
              <CategoryTile
                key={cat.id}
                category={cat}
                onClick={(catId) => onSelectCategory(catId)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ==================================================================
          B. TRENDING ON THE TABLE (EDITORIAL RECIPE SPREAD)
          ================================================================== */}
      <section className="home-section">
        <div className="container">
          <div className="home-section-header">
            <div>
              <span className="section-eyebrow">FRESH OFF THE STOVE</span>
              <h2 className="section-title">Trending on the table</h2>
            </div>
            <span className="sticker-badge olive">CURATED BY EDITORS</span>
          </div>

          <div className="trending-grid">
            {trendingRecipes.map((recipe, index) => (
              <RecipeCard
                key={recipe.id}
                recipe={recipe}
                variant={index === 0 ? 'featured' : 'standard'}
                isFavorite={favorites.includes(recipe.id)}
                onToggleFavorite={onToggleFavorite}
                onSelectRecipe={onSelectRecipe}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ==================================================================
          C. PICK YOUR MOOD (INTERACTIVE MOOD FILTERS)
          ================================================================== */}
      <section className="home-section" style={{ backgroundColor: 'var(--yellow-soft)', borderTop: 'var(--border-thick)', borderBottom: 'var(--border-thick)' }}>
        <div className="container">
          <div className="home-section-header">
            <div>
              <span className="section-eyebrow">FEELINGS & FLAVORS</span>
              <h2 className="section-title">Pick your mood</h2>
            </div>
            <p style={{ maxWidth: '400px', fontSize: '0.95rem' }}>
              Whether you need deeply comforting soul food or a lightning 15-minute weeknight bite, we've got you covered.
            </p>
          </div>

          <div className="mood-grid">
            {MOODS.map((m) => (
              <div
                key={m.id}
                className="mood-card"
                onClick={() => onSelectMood(m.id)}
                role="button"
                tabIndex={0}
                aria-label={`Filter recipes by ${m.label}`}
              >
                <span className="mood-icon">{m.icon}</span>
                <span className="mood-label">{m.label}</span>
                <span className="mood-tag">{m.tag}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================================================================
          D. AROUND THE WORLD IN SIX DISHES
          ================================================================== */}
      <section className="home-section">
        <div className="container">
          <div className="home-section-header">
            <div>
              <span className="section-eyebrow">GLOBAL PASSPORT</span>
              <h2 className="section-title">Around the world in dishes</h2>
            </div>
            <button
              className="btn btn-outline btn-sm"
              onClick={() => onNavigate('discover')}
            >
              All Cuisines →
            </button>
          </div>

          <div className="cuisines-grid">
            {['Indian', 'Italian', 'Mexican', 'Japanese', 'Thai', 'Mediterranean'].map((cuisineName) => {
              const count = recipes.filter((r) => r.cuisine === cuisineName).length;
              const flagIcons = {
                Indian: '🇮🇳',
                Italian: '🇮🇹',
                Mexican: '🇲🇽',
                Japanese: '🇯🇵',
                Thai: '🇹🇭',
                Mediterranean: '🇬🇷'
              };

              return (
                <div
                  key={cuisineName}
                  className="cuisine-box"
                  onClick={() => onSelectCuisine(cuisineName)}
                >
                  <span style={{ fontSize: '2.5rem', display: 'block', marginBottom: '0.5rem' }}>
                    {flagIcons[cuisineName] || '🍽️'}
                  </span>
                  <h3 className="cuisine-box-name">{cuisineName}</h3>
                  <div className="cuisine-box-count">{count} Recipes Available</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ==================================================================
          E. THE WEEKLY MENU (PREVIEW WITH SAVED STATE)
          ================================================================== */}
      <section className="home-section" style={{ backgroundColor: 'var(--pure-white)', borderTop: 'var(--border-thick)', borderBottom: 'var(--border-thick)' }}>
        <div className="container">
          <div className="menu-preview-card">
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
              <div>
                <span className="sticker-badge red">YOUR WEEKLY MEAL BOARD</span>
                <h2 style={{ fontSize: '2.2rem', marginTop: '0.5rem' }}>The Weekly Menu</h2>
                <p>
                  {hasPlannedMeals
                    ? 'Here is a live look at your active saved meal plan for the week.'
                    : 'Start organizing your weekly lunches, dinners, and breakfast rituals.'}
                </p>
              </div>

              <button
                className="btn btn-primary"
                onClick={() => onNavigate('meal-planner')}
              >
                Open Full Weekly Planner 📅
              </button>
            </div>

            {/* 7 Days Preview Row */}
            <div className="menu-preview-days-row">
              {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map((day) => {
                const dayPlan = mealPlan[day] || {};
                const firstMealId = dayPlan.Breakfast || dayPlan.Lunch || dayPlan.Dinner;
                const recipe = firstMealId ? recipes.find((r) => r.id === firstMealId) : null;

                return (
                  <div key={day} className="preview-day-item">
                    <span className="preview-day-name">{day}</span>
                    {recipe ? (
                      <span className="preview-dish-name">
                        🍽️ {recipe.name}
                      </span>
                    ) : (
                      <span style={{ fontSize: '0.8rem', color: 'var(--ink-muted)', fontStyle: 'italic' }}>
                        No meals planned yet
                      </span>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ==================================================================
          F. JOIN THE CRAVE! CLUB (NEWSLETTER DEMO)
          ================================================================== */}
      <section className="home-section">
        <div className="container">
          <div className="club-callout">
            <span className="sticker-badge yellow" style={{ marginBottom: '1rem', display: 'inline-block' }}>
              JOIN 25,000+ HUNGRY READERS
            </span>
            <h2>Get the secret kitchen drop every Sunday morning.</h2>
            <p style={{ maxWidth: '580px', color: '#FFF2E8', fontSize: '1.1rem', marginTop: '0.5rem' }}>
              No spam. No generic corporate salads. Just unapologetically bold recipes, flavor hacks, and printable weekly guides delivered straight to your inbox.
            </p>

            {!newsletterSubmitted ? (
              <form className="club-form" onSubmit={handleNewsletterSubmit}>
                <input
                  type="email"
                  className="club-input"
                  placeholder="Enter your email address..."
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  aria-label="Email address for CRAVE! newsletter"
                />
                <button type="submit" className="btn btn-secondary">
                  Join Free 📬
                </button>
              </form>
            ) : (
              <div className="club-success-msg">
                🎉 Welcome to the CRAVE! Club! Issue #42 has been dispatched to {newsletterEmail}.
              </div>
            )}

            {newsletterError && (
              <p style={{ color: 'var(--butter-yellow)', fontWeight: 700, marginTop: '0.5rem' }}>
                ⚠️ {newsletterError}
              </p>
            )}

            <div style={{ marginTop: '1.25rem', fontSize: '0.75rem', opacity: 0.85, fontFamily: 'var(--font-mono)' }}>
              * Frontend demonstration only. Your email stays safely in your local browser session.
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
