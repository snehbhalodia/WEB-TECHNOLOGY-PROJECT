// LocalStorage helpers for favorites, meal planner, and shopping list

const STORAGE_KEYS = {
  FAVORITES: 'crave_favorites_v1',
  MEAL_PLAN: 'crave_meal_plan_v1',
  SHOPPING_LIST: 'crave_shopping_list_v1'
};

export const DAYS_OF_WEEK = [
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
  'Sunday'
];

export const MEAL_SLOTS = ['Breakfast', 'Lunch', 'Dinner'];

/**
 * Creates a blank 7-day meal plan structure
 */
export function createEmptyMealPlan() {
  const plan = {};
  DAYS_OF_WEEK.forEach(day => {
    plan[day] = {
      Breakfast: null,
      Lunch: null,
      Dinner: null
    };
  });
  return plan;
}

// ---------------- FAVORITES ----------------

export function getStoredFavorites() {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.FAVORITES);
    if (!raw) return ['masala-dosa', 'margherita-pizza', 'fudgy-espresso-brownies']; // Sensible starter favorites
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch (err) {
    console.warn('CRAVE! Storage warning: Failed to parse favorites', err);
    return [];
  }
}

export function saveStoredFavorites(favoriteIds) {
  try {
    localStorage.setItem(STORAGE_KEYS.FAVORITES, JSON.stringify(favoriteIds));
  } catch (err) {
    console.warn('CRAVE! Storage warning: Failed to save favorites', err);
  }
}

// ---------------- MEAL PLAN ----------------

export function getStoredMealPlan() {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.MEAL_PLAN);
    if (!raw) {
      // Default starter sample plan to show an active, lively preview on first launch
      const defaultPlan = createEmptyMealPlan();
      defaultPlan['Monday'].Breakfast = 'masala-dosa';
      defaultPlan['Monday'].Dinner = 'butter-paneer';
      defaultPlan['Wednesday'].Lunch = 'street-crispy-tacos';
      defaultPlan['Friday'].Dinner = 'margherita-pizza';
      defaultPlan['Sunday'].Breakfast = 'ricotta-blueberry-pancakes';
      return defaultPlan;
    }
    const parsed = JSON.parse(raw);
    // Ensure all 7 days exist even if user loaded an older schema
    const fullPlan = createEmptyMealPlan();
    DAYS_OF_WEEK.forEach(day => {
      if (parsed[day]) {
        fullPlan[day] = {
          Breakfast: parsed[day].Breakfast || null,
          Lunch: parsed[day].Lunch || null,
          Dinner: parsed[day].Dinner || null
        };
      }
    });
    return fullPlan;
  } catch (err) {
    console.warn('CRAVE! Storage warning: Failed to parse meal plan', err);
    return createEmptyMealPlan();
  }
}

export function saveStoredMealPlan(plan) {
  try {
    localStorage.setItem(STORAGE_KEYS.MEAL_PLAN, JSON.stringify(plan));
  } catch (err) {
    console.warn('CRAVE! Storage warning: Failed to save meal plan', err);
  }
}

// ---------------- SHOPPING LIST ----------------

export function getStoredShoppingList() {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.SHOPPING_LIST);
    if (!raw) {
      // Sensible initial items so the shopping list page has tangible content on first view
      return [
        { id: 'init-1', name: 'Fresh Paneer', amount: 250, unit: 'g', completed: false, category: 'Dairy' },
        { id: 'init-2', name: 'San Marzano Tomatoes', amount: 1, unit: 'can', completed: true, category: 'Produce' },
        { id: 'init-3', name: 'Fresh Basil Leaves', amount: 1, unit: 'bunch', completed: false, category: 'Produce' },
        { id: 'init-4', name: 'Dark Chocolate (70%)', amount: 200, unit: 'g', completed: false, category: 'Pantry' }
      ];
    }
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch (err) {
    console.warn('CRAVE! Storage warning: Failed to parse shopping list', err);
    return [];
  }
}

export function saveStoredShoppingList(items) {
  try {
    localStorage.setItem(STORAGE_KEYS.SHOPPING_LIST, JSON.stringify(items));
  } catch (err) {
    console.warn('CRAVE! Storage warning: Failed to save shopping list', err);
  }
}
