# CRAVE! — Good Food. Zero Boring.

A modern, maximalist food discovery, interactive recipe journal, and weekly meal planning web application. Built with **React 18**, **Vite**, and **custom CSS3**.

![React](https://img.shields.io/badge/React-18.3.1-61DAFB?logo=react&logoColor=black)
![Vite](https://img.shields.io/badge/Vite-5.4.2-646CFF?logo=vite&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS-Custom_Properties-1572B6?logo=css3&logoColor=white)
![License](https://img.shields.io/badge/license-MIT-green)

---

## Overview

**CRAVE!** bridges the gap between editorial food culture magazines (bold layouts, expressive typography, appetizing visuals) and practical home-cooking utility. It lets home cooks discover dishes across diverse cuisines, dynamically scale ingredient quantities, follow an interactive full-screen cooking mode, plan weekly meals on a 7-day board, and auto-generate consolidated grocery shopping lists.

---

## Key Features

- **Editorial Food Journal Home**:
  - Asymmetric hero collage with dynamic cover dish and category quick-filters.
  - Curated trending dishes, cuisine spotlights, and mood-based discovery (*Comfort Food, Quick Bites, Spicy, Sweet Tooth, Healthy-ish, Weekend Treats*).
  - Live preview of the active weekly meal schedule directly on the home page.

- **Multi-Criteria Recipe Discovery**:
  - Full-text search across recipe titles and ingredients (e.g., searching *"paneer"* or *"basil"* surfaces dishes containing them).
  - Filter combinations: Category, Cuisine, Dietary preferences (*Vegetarian, Vegan, Gluten-Free, High-Protein*), Prep Time limits, and Food Moods.
  - Sorting options: Curated/Featured, Quickest Prep Time, and Alphabetical (A–Z / Z–A).

- **Dynamic Recipe Details & Scaler**:
  - Proportional serving size multiplier: scales ingredient quantities automatically with culinary fraction formatting (e.g., `1/2 cup`, `1 1/4 tsp`).
  - Interactive strike-through checklist to track prepared ingredients.
  - Step-by-step cooking directions with prep and cook time breakdowns.

- **Distraction-Free Cooking Mode**:
  - Fullscreen stage designed for following along while cooking in the kitchen.
  - Prominent step counters, large readable typography, and visual progress bar.
  - Keyboard navigation (`←` / `→` arrow keys) and quick-access ingredient drawer.
  - Celebratory completion view.

- **7-Day Weekly Meal Planner**:
  - 21 distinct slots (Breakfast, Lunch, Dinner across Monday to Sunday).
  - Quick-search modal to assign dishes directly to any day and slot.
  - Live weekly analytics: total scheduled meals, unique recipes, represented cuisines, and estimated kitchen hours.
  - One-click shopping list generation from planned meals.

- **Unit-Aware Smart Shopping List**:
  - Intelligently merges compatible ingredients across recipes (e.g., `2 cups` + `1 cup` = `3 cups`).
  - Preserves separate entries for incompatible measurement units (e.g., `200g` vs `1 cup`) to maintain culinary accuracy.
  - Manual item adder for custom groceries and quick pantry staples (*Olive Oil, Garlic, Sea Salt, Lemons, Butter*).
  - Check-off tracking with remaining/completed counters and batch cleanup.

- **Persistent Browser Storage**:
  - All favorites, weekly meal plans, and grocery items persist across browser sessions using `localStorage`.

---

## Tech Stack & Architecture

- **Frontend**: [React 18](https://react.dev/) (Functional components, Hooks: `useState`, `useEffect`, `useMemo`)
- **Styling**: Pure **CSS3** with CSS Custom Properties (`:root`), CSS Grid, Flexbox, and keyframe animations — zero external CSS libraries or frameworks.
- **Build Tool**: [Vite](https://vitejs.dev/)
- **Data & Storage**: Local JavaScript data models with resilient browser `localStorage` synchronization.

### Directory Structure

```text
crave-app/
├── index.html               # Semantic HTML5 entry point & web font links
├── package.json             # Project dependencies and npm scripts
├── vite.config.js           # Vite server configuration
├── src/
│   ├── main.jsx             # DOM mounting entry
│   ├── App.jsx              # Root component: view router, state coordinator & toasts
│   ├── data/
│   │   └── recipes.js       # Curated recipe database with structured ingredients
│   ├── utils/
│   │   ├── storage.js       # LocalStorage helpers with defensive fallback handling
│   │   └── recipeHelpers.js # Serving scaler, unit-safe ingredient merger, and filter engine
│   ├── components/
│   │   ├── Navbar.jsx       # Header with live active navigation and counter badges
│   │   ├── Footer.jsx       # Editorial footer with quick links and back-to-top
│   │   ├── RecipeCard.jsx   # Recipe card with badges, time indicators, and favorite toggle
│   │   ├── CategoryTile.jsx # Expressive category tile
│   │   ├── SearchBar.jsx    # Real-time search input with clear trigger
│   │   ├── FilterBar.jsx    # Filter bar for category, cuisine, diet, time, and sorting
│   │   ├── IngredientChecklist.jsx # Scalable servings and checkable ingredient list
│   │   ├── CookingMode.jsx  # Fullscreen step-by-step cooking overlay
│   │   ├── MealSlot.jsx     # Daily slot card for the 7-day planner
│   │   └── ShoppingListItem.jsx # Interactive grocery item with unit pills
│   ├── pages/
│   │   ├── Home.jsx         # Hero collage, trending cards, moods, newsletter
│   │   ├── Discover.jsx     # Recipe search engine and filterable grid
│   │   ├── RecipeDetail.jsx # Comprehensive recipe spread with scaling & checklist
│   │   ├── MealPlanner.jsx  # Weekly schedule board and summary analytics
│   │   ├── ShoppingList.jsx # Grocery checklist with custom item support
│   │   └── Favorites.jsx    # Saved recipe collection with in-vault search
│   └── styles/
│       ├── global.css       # Design tokens, typography, resets, and button styles
│       ├── layout.css       # Navigation, drawer, footer, and toast notification styles
│       ├── components.css   # Cards, checklist, modals, and cooking mode styles
│       └── pages.css        # Hero composition, planner grid, and detail layouts
```

---

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18.0.0 or higher recommended)
- `npm` (comes bundled with Node.js)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/crave.git
   cd crave
   ```

2. Install dependencies:
   ```bash
   npm install --legacy-peer-deps
   ```

3. Start the local development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## Scripts

| Command | Action |
| :--- | :--- |
| `npm run dev` | Starts the Vite local development server with hot-module replacement |
| `npm run build` | Compiles and optimizes assets into the `dist/` directory for production |
| `npm run preview` | Locally serves the production build from `dist/` |

---

## License

This project is licensed under the [MIT License](LICENSE).
