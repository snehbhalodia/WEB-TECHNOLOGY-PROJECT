import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import CookingMode from './components/CookingMode';

// Pages
import Home from './pages/Home';
import Discover from './pages/Discover';
import RecipeDetail from './pages/RecipeDetail';
import MealPlanner from './pages/MealPlanner';
import ShoppingList from './pages/ShoppingList';
import Favorites from './pages/Favorites';

// Data & Helpers
import { RECIPES } from './data/recipes';
import {
  getStoredFavorites,
  saveStoredFavorites,
  getStoredMealPlan,
  saveStoredMealPlan,
  getStoredShoppingList,
  saveStoredShoppingList,
  createEmptyMealPlan
} from './utils/storage';
import { scaleAmount, combineIngredients } from './utils/recipeHelpers';

// Styles
import './styles/global.css';
import './styles/layout.css';
import './styles/components.css';
import './styles/pages.css';

// Root application component - manages views, global state, and localStorage persistence
export default function App() {
  // Navigation & View State
  const [currentView, setCurrentView] = useState('home');
  const [selectedRecipeId, setSelectedRecipeId] = useState(null);
  const [activeCookingRecipe, setActiveCookingRecipe] = useState(null);

  // Global Filters for Discover Page
  const [filters, setFilters] = useState({
    search: '',
    category: 'all',
    cuisine: 'all',
    dietary: 'all',
    maxTime: 0,
    mood: 'all',
    sortBy: 'featured'
  });

  // Persistent States
  const [favorites, setFavorites] = useState(() => getStoredFavorites());
  const [mealPlan, setMealPlan] = useState(() => getStoredMealPlan());
  const [shoppingList, setShoppingList] = useState(() => getStoredShoppingList());

  // Transient Toast Notification State
  const [toasts, setToasts] = useState([]);

  // Synchronize Favorites with localStorage
  useEffect(() => {
    saveStoredFavorites(favorites);
  }, [favorites]);

  // Synchronize Meal Plan with localStorage
  useEffect(() => {
    saveStoredMealPlan(mealPlan);
  }, [mealPlan]);

  // Synchronize Shopping List with localStorage
  useEffect(() => {
    saveStoredShoppingList(shoppingList);
  }, [shoppingList]);

  // Toast Helper
  const showToast = (message, type = 'success') => {
    const id = Date.now() + Math.random();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3200);
  };

  // ---------------- NAVIGATION HANDLERS ----------------

  const handleNavigate = (view) => {
    setCurrentView(view);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectRecipe = (recipeId) => {
    setSelectedRecipeId(recipeId);
    setCurrentView('recipe-detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // ---------------- FAVORITE TOGGLE HANDLER ----------------

  const handleToggleFavorite = (recipeId) => {
    const recipe = RECIPES.find((r) => r.id === recipeId);
    const recipeName = recipe ? recipe.name : 'Recipe';

    setFavorites((prev) => {
      const isAlreadyFav = prev.includes(recipeId);
      if (isAlreadyFav) {
        showToast(`Removed "${recipeName}" from saved favorites`, 'info');
        return prev.filter((id) => id !== recipeId);
      } else {
        showToast(`Saved "${recipeName}" to favorites! ❤️`, 'success');
        return [...prev, recipeId];
      }
    });
  };

  // ---------------- MEAL PLAN HANDLERS ----------------

  const handleAssignMeal = (day, slot, recipeId) => {
    const recipe = RECIPES.find((r) => r.id === recipeId);
    setMealPlan((prev) => ({
      ...prev,
      [day]: {
        ...prev[day],
        [slot]: recipeId
      }
    }));
    showToast(`Scheduled "${recipe ? recipe.name : 'Dish'}" for ${day} ${slot}! 📅`);
  };

  const handleRemoveMeal = (day, slot) => {
    setMealPlan((prev) => ({
      ...prev,
      [day]: {
        ...prev[day],
        [slot]: null
      }
    }));
    showToast(`Removed meal from ${day} ${slot}`, 'info');
  };

  const handleClearMealPlan = () => {
    setMealPlan(createEmptyMealPlan());
    showToast('Weekly meal plan reset successfully', 'info');
  };

  // ---------------- SHOPPING LIST HANDLERS ----------------

  /**
   * Adds all ingredients from a single recipe (scaled by serving size) to the shopping list.
   * Uses combineIngredients to safely merge compatible units without corrupting mixed dimensions.
   */
  const handleAddIngredientsToShoppingList = (recipe, targetServings) => {
    if (!recipe || !recipe.ingredients) return;

    // Scale ingredient amounts
    const scaledIngredients = recipe.ingredients.map((ing) => ({
      ...ing,
      amount: scaleAmount(ing.amount, recipe.servings, targetServings)
    }));

    // Combine with current shopping list
    setShoppingList((prevList) => {
      const merged = combineIngredients([...prevList, ...scaledIngredients]);
      return merged;
    });

    showToast(`Added ingredients for "${recipe.name}" to shopping list! 🛒`);
  };

  /**
   * Scans all meals planned in the 7-day calendar and automatically builds
   * or updates the shopping list with all required ingredients.
   */
  const handleGenerateShoppingListFromPlan = () => {
    const plannedRecipeIds = [];
    Object.values(mealPlan).forEach((daySlots) => {
      Object.values(daySlots).forEach((recipeId) => {
        if (recipeId) plannedRecipeIds.push(recipeId);
      });
    });

    if (plannedRecipeIds.length === 0) {
      showToast('No meals currently scheduled in your weekly planner', 'info');
      return;
    }

    const allPlannedIngredients = [];
    plannedRecipeIds.forEach((id) => {
      const recipe = RECIPES.find((r) => r.id === id);
      if (recipe && recipe.ingredients) {
        allPlannedIngredients.push(...recipe.ingredients);
      }
    });

    // Safely combine ingredients across recipes
    setShoppingList((prevList) => {
      return combineIngredients([...prevList, ...allPlannedIngredients]);
    });

    showToast(`Generated shopping list from ${plannedRecipeIds.length} planned meals! 🛒`);
    handleNavigate('shopping-list');
  };

  const handleToggleShoppingItem = (itemId) => {
    setShoppingList((prev) =>
      prev.map((item) =>
        item.id === itemId ? { ...item, completed: !item.completed } : item
      )
    );
  };

  const handleRemoveShoppingItem = (itemId) => {
    setShoppingList((prev) => prev.filter((item) => item.id !== itemId));
  };

  const handleAddCustomShoppingItem = ({ name, amount, unit }) => {
    const newItem = {
      id: `custom-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
      name,
      amount,
      unit,
      completed: false,
      notes: 'Custom item'
    };
    setShoppingList((prev) => [newItem, ...prev]);
    showToast(`Added "${name}" to shopping list!`);
  };

  const handleClearCompletedShopping = () => {
    setShoppingList((prev) => prev.filter((item) => !item.completed));
    showToast('Cleared completed items from list', 'info');
  };

  const handleClearAllShopping = () => {
    setShoppingList([]);
    showToast('Shopping list cleared', 'info');
  };

  // ---------------- DISCOVER FILTER SHORTCUTS ----------------

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value
    }));
  };

  const handleResetFilters = () => {
    setFilters({
      search: '',
      category: 'all',
      cuisine: 'all',
      dietary: 'all',
      maxTime: 0,
      mood: 'all',
      sortBy: 'featured'
    });
  };

  const handleSelectCategoryFromHome = (catId) => {
    setFilters((prev) => ({
      ...prev,
      category: catId
    }));
    handleNavigate('discover');
  };

  const handleSelectMoodFromHome = (moodId) => {
    setFilters((prev) => ({
      ...prev,
      mood: moodId
    }));
    handleNavigate('discover');
  };

  const handleSelectCuisineFromHome = (cuisineName) => {
    setFilters((prev) => ({
      ...prev,
      cuisine: cuisineName
    }));
    handleNavigate('discover');
  };

  // Currently viewed recipe object
  const currentSelectedRecipe = RECIPES.find((r) => r.id === selectedRecipeId) || RECIPES[0];

  return (
    <div className="app-root">
      {/* Top Sticky Header */}
      <Navbar
        currentView={currentView}
        onNavigate={handleNavigate}
        favoritesCount={favorites.length}
        shoppingListCount={shoppingList.filter((i) => !i.completed).length}
      />

      {/* Main View Router */}
      <main id="main-content">
        {currentView === 'home' && (
          <Home
            recipes={RECIPES}
            favorites={favorites}
            mealPlan={mealPlan}
            onToggleFavorite={handleToggleFavorite}
            onSelectRecipe={handleSelectRecipe}
            onNavigate={handleNavigate}
            onSelectCategory={handleSelectCategoryFromHome}
            onSelectMood={handleSelectMoodFromHome}
            onSelectCuisine={handleSelectCuisineFromHome}
          />
        )}

        {currentView === 'discover' && (
          <Discover
            recipes={RECIPES}
            favorites={favorites}
            filters={filters}
            onFilterChange={handleFilterChange}
            onResetFilters={handleResetFilters}
            onToggleFavorite={handleToggleFavorite}
            onSelectRecipe={handleSelectRecipe}
            onAddToMealPlan={(recipe) => {
              setSelectedRecipeId(recipe.id);
              setCurrentView('recipe-detail');
            }}
          />
        )}

        {currentView === 'recipe-detail' && (
          <RecipeDetail
            recipe={currentSelectedRecipe}
            isFavorite={favorites.includes(currentSelectedRecipe.id)}
            onToggleFavorite={handleToggleFavorite}
            onStartCooking={(recipe) => setActiveCookingRecipe(recipe)}
            onAddToMealPlan={handleAssignMeal}
            onAddIngredientsToShoppingList={handleAddIngredientsToShoppingList}
            onBack={() => handleNavigate('discover')}
          />
        )}

        {currentView === 'meal-planner' && (
          <MealPlanner
            mealPlan={mealPlan}
            recipes={RECIPES}
            onAssignMeal={handleAssignMeal}
            onRemoveMeal={handleRemoveMeal}
            onClearMealPlan={handleClearMealPlan}
            onSelectRecipe={handleSelectRecipe}
            onGenerateShoppingListFromPlan={handleGenerateShoppingListFromPlan}
            onNavigate={handleNavigate}
          />
        )}

        {currentView === 'shopping-list' && (
          <ShoppingList
            items={shoppingList}
            onToggleItem={handleToggleShoppingItem}
            onRemoveItem={handleRemoveShoppingItem}
            onAddCustomItem={handleAddCustomShoppingItem}
            onClearCompleted={handleClearCompletedShopping}
            onClearAll={handleClearAllShopping}
            onNavigate={handleNavigate}
          />
        )}

        {currentView === 'favorites' && (
          <Favorites
            recipes={RECIPES}
            favorites={favorites}
            onToggleFavorite={handleToggleFavorite}
            onSelectRecipe={handleSelectRecipe}
            onNavigate={handleNavigate}
          />
        )}
      </main>

      {/* Interactive Cooking Mode Overlay */}
      {activeCookingRecipe && (
        <CookingMode
          recipe={activeCookingRecipe}
          onExit={() => setActiveCookingRecipe(null)}
        />
      )}

      {/* Footer */}
      <Footer onNavigate={handleNavigate} />

      {/* Floating Toast Notifications */}
      <div className="toast-container" aria-live="polite">
        {toasts.map((toast) => (
          <div key={toast.id} className={`toast ${toast.type}`}>
            <span>{toast.type === 'success' ? '★' : 'ℹ'}</span>
            <span>{toast.message}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
