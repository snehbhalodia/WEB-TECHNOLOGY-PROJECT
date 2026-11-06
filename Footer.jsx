import React from 'react';

/**
 * Footer Component
 * Maximalist ink black editorial footer with brand statement, navigation links,
 * quick cuisine filters, and back-to-top button.
 */
export default function Footer({ onNavigate }) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNav = (view, e) => {
    e.preventDefault();
    onNavigate(view);
    scrollToTop();
  };

  return (
    <footer className="app-footer">
      <div className="footer-top-accent"></div>

      <div className="container">
        <div className="footer-grid">
          {/* Brand Column */}
          <div className="footer-brand-col">
            <div className="footer-logo">
              CRAVE<span>!</span>
            </div>
            <p className="footer-tagline">"GOOD FOOD. ZERO BORING."</p>
            <p className="footer-desc">
              Find your next obsession, learn to make it, and bring something delicious to the table. An independent digital cookbook built for appetite-driven home cooks.
            </p>
            <div style={{ marginTop: '0.5rem' }}>
              <span className="sticker-badge orange">ISSUE NO. 42 • ALL FLAVOR</span>
            </div>
          </div>

          {/* Navigation Links Column */}
          <div>
            <h4 className="footer-heading">CRAVE! Sections</h4>
            <ul className="footer-links">
              <li>
                <button onClick={(e) => handleNav('home', e)}>Home Journal</button>
              </li>
              <li>
                <button onClick={(e) => handleNav('discover', e)}>Discover All Recipes</button>
              </li>
              <li>
                <button onClick={(e) => handleNav('meal-planner', e)}>Weekly Meal Planner</button>
              </li>
              <li>
                <button onClick={(e) => handleNav('shopping-list', e)}>Interactive Shopping List</button>
              </li>
              <li>
                <button onClick={(e) => handleNav('favorites', e)}>Saved Favorites</button>
              </li>
            </ul>
          </div>

          {/* Cuisines & Moods Column */}
          <div>
            <h4 className="footer-heading">Quick Curations</h4>
            <ul className="footer-links">
              <li>
                <button onClick={(e) => { handleNav('discover', e); }}>⚡ Quick Bites (&lt; 25m)</button>
              </li>
              <li>
                <button onClick={(e) => { handleNav('discover', e); }}>🫕 Comfort Food Classics</button>
              </li>
              <li>
                <button onClick={(e) => { handleNav('discover', e); }}>🌶️ Spicy Global Plates</button>
              </li>
              <li>
                <button onClick={(e) => { handleNav('discover', e); }}>🥗 Plant-Powered Bowls</button>
              </li>
              <li>
                <button onClick={(e) => { handleNav('discover', e); }}>🍫 Sweet Tooth Obsessions</button>
              </li>
            </ul>
          </div>
        </div>

        {/* Footer Bottom Bar */}
        <div className="footer-bottom">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
            <span>© 2026 CRAVE! All rights reserved.</span>
            <span className="tech-badge">Built with React & Plain CSS</span>
          </div>

          <button
            className="back-to-top-btn"
            onClick={scrollToTop}
            aria-label="Back to top"
          >
            ↑ Back to Top
          </button>
        </div>
      </div>
    </footer>
  );
}
