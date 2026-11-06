import React, { useState } from 'react';

/**
 * Navbar Component
 * Features the CRAVE! wordmark logo, live navigation with active highlighting,
 * badge counters for favorites and shopping list, and an accessible mobile drawer.
 */
export default function Navbar({ currentView, onNavigate, favoritesCount = 0, shoppingListCount = 0 }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLinkClick = (view, e) => {
    e.preventDefault();
    onNavigate(view);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="app-header">
      {/* Editorial Announcement Strip */}
      <div className="header-topbar">
        <div className="topbar-ticker">
          <span>★ GOOD FOOD. ZERO BORING.</span>
          <span>•</span>
          <span>AUTUMN RECIPE JOURNAL ISSUE NO. 42</span>
          <span>•</span>
          <span>100% FLAVOR GUARANTEED</span>
        </div>
        <div style={{ display: 'none', gap: '1rem' }} className="topbar-actions">
          <span>RECIPE DISCOVERY & MEAL PLANNER</span>
        </div>
      </div>

      <nav className="navbar" aria-label="Main Navigation">
        {/* CRAVE! Brand Logo */}
        <button
          className="brand-logo"
          onClick={(e) => handleLinkClick('home', e)}
          aria-label="CRAVE! Home"
        >
          <span className="brand-text">
            CRAVE<span className="brand-exclamation">!</span>
          </span>
          <span className="brand-badge">EST. 2026</span>
        </button>

        {/* Desktop Navigation Links */}
        <ul className="nav-links">
          <li className="nav-item">
            <button
              className={`nav-link ${currentView === 'home' ? 'active' : ''}`}
              onClick={(e) => handleLinkClick('home', e)}
            >
              Home
            </button>
          </li>
          <li className="nav-item">
            <button
              className={`nav-link ${currentView === 'discover' ? 'active' : ''}`}
              onClick={(e) => handleLinkClick('discover', e)}
            >
              Discover Recipes
            </button>
          </li>
          <li className="nav-item">
            <button
              className={`nav-link ${currentView === 'meal-planner' ? 'active' : ''}`}
              onClick={(e) => handleLinkClick('meal-planner', e)}
            >
              Weekly Planner
            </button>
          </li>
          <li className="nav-item">
            <button
              className={`nav-link ${currentView === 'shopping-list' ? 'active' : ''}`}
              onClick={(e) => handleLinkClick('shopping-list', e)}
            >
              Shopping List
              {shoppingListCount > 0 && (
                <span className="nav-count-badge" title={`${shoppingListCount} items`}>
                  {shoppingListCount}
                </span>
              )}
            </button>
          </li>
          <li className="nav-item">
            <button
              className={`nav-link ${currentView === 'favorites' ? 'active' : ''}`}
              onClick={(e) => handleLinkClick('favorites', e)}
            >
              Saved Recipes
              {favoritesCount > 0 && (
                <span className="nav-count-badge" title={`${favoritesCount} saved recipes`}>
                  {favoritesCount}
                </span>
              )}
            </button>
          </li>
        </ul>

        {/* Header Right Action CTA */}
        <div className="nav-actions">
          <button
            className="btn btn-primary btn-sm btn-pill"
            onClick={(e) => handleLinkClick('discover', e)}
          >
            Explore Food ↗
          </button>

          {/* Mobile Menu Hamburger Toggle */}
          <button
            className={`menu-toggle-btn ${mobileMenuOpen ? 'open' : ''}`}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle Navigation Menu"
            aria-expanded={mobileMenuOpen}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </nav>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="mobile-nav-drawer" role="menu">
          <button
            className={`mobile-nav-link ${currentView === 'home' ? 'active' : ''}`}
            onClick={(e) => handleLinkClick('home', e)}
          >
            <span>🏠 Home</span>
            <span>→</span>
          </button>
          <button
            className={`mobile-nav-link ${currentView === 'discover' ? 'active' : ''}`}
            onClick={(e) => handleLinkClick('discover', e)}
          >
            <span>🍳 Discover Recipes</span>
            <span>→</span>
          </button>
          <button
            className={`mobile-nav-link ${currentView === 'meal-planner' ? 'active' : ''}`}
            onClick={(e) => handleLinkClick('meal-planner', e)}
          >
            <span>📅 Weekly Planner</span>
            <span>→</span>
          </button>
          <button
            className={`mobile-nav-link ${currentView === 'shopping-list' ? 'active' : ''}`}
            onClick={(e) => handleLinkClick('shopping-list', e)}
          >
            <span>🛒 Shopping List</span>
            {shoppingListCount > 0 && (
              <span className="nav-count-badge">{shoppingListCount}</span>
            )}
          </button>
          <button
            className={`mobile-nav-link ${currentView === 'favorites' ? 'active' : ''}`}
            onClick={(e) => handleLinkClick('favorites', e)}
          >
            <span>❤️ Saved Recipes</span>
            {favoritesCount > 0 && (
              <span className="nav-count-badge">{favoritesCount}</span>
            )}
          </button>
        </div>
      )}
    </header>
  );
}
