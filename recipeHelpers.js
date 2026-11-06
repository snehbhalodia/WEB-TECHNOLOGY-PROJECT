/**
 * Recipe and ingredient helper utilities
 * Handles serving size scaling, unit-safe ingredient aggregation,
 * filtering/sorting, and meal planner calculations.
 */

// Scale an ingredient's quantity proportionally based on servings
export function scaleAmount(baseAmount, baseServings, targetServings) {
  if (typeof baseAmount !== 'number' || isNaN(baseAmount) || baseAmount <= 0) {
    return baseAmount;
  }
  if (!baseServings || !targetServings || baseServings <= 0) {
    return baseAmount;
  }
  const scaled = (baseAmount / baseServings) * targetServings;
  // Round to max 2 decimal places to avoid floating point issues (e.g. 1.0000000002)
  return Math.round(scaled * 100) / 100;
}

// Convert decimal quantities into readable cooking fractions (e.g. 0.5 -> 1/2)
export function formatAmount(amount) {
  if (typeof amount !== 'number' || isNaN(amount) || amount === 0) {
    return amount || '';
  }

  const whole = Math.floor(amount);
  const remainder = Math.round((amount - whole) * 100) / 100;

  let fraction = '';
  if (Math.abs(remainder - 0.25) < 0.05) fraction = '1/4';
  else if (Math.abs(remainder - 0.33) < 0.05) fraction = '1/3';
  else if (Math.abs(remainder - 0.5) < 0.05) fraction = '1/2';
  else if (Math.abs(remainder - 0.66) < 0.05) fraction = '2/3';
  else if (Math.abs(remainder - 0.75) < 0.05) fraction = '3/4';

  if (fraction) {
    return whole > 0 ? `${whole} ${fraction}` : fraction;
  }

  return amount % 1 === 0 ? amount.toString() : amount.toFixed(1).replace(/\.0$/, '');
}

/**
 * Combines ingredients across recipes for the shopping list.
 * Only merges ingredients if both the name AND unit match (e.g., 2 cups + 1 cup = 3 cups).
 * Keeps incompatible units separate (e.g., 200g flour vs 1 cup flour) to avoid corrupting measurements.
 */
export function combineIngredients(ingredientsList) {
  if (!Array.isArray(ingredientsList) || ingredientsList.length === 0) {
    return [];
  }

  const groupedMap = new Map();

  ingredientsList.forEach((item, index) => {
    if (!item || !item.name) return;

    const rawName = item.name.trim();
    const cleanName = rawName.toLowerCase();
    
    // Normalize units: plural to singular
    let rawUnit = (item.unit || '').trim().toLowerCase();
    let cleanUnit = rawUnit;
    if (cleanUnit === 'cups') cleanUnit = 'cup';
    if (cleanUnit === 'tablespoons' || cleanUnit === 'tbsps') cleanUnit = 'tbsp';
    if (cleanUnit === 'teaspoons' || cleanUnit === 'tsps') cleanUnit = 'tsp';
    if (cleanUnit === 'pieces' || cleanUnit === 'pcs') cleanUnit = 'pieces';
    if (cleanUnit === 'grams') cleanUnit = 'g';
    if (cleanUnit === 'cans') cleanUnit = 'can';
    if (cleanUnit === 'leaves') cleanUnit = 'leaves';
    if (cleanUnit === 'cloves') cleanUnit = 'cloves';

    // Compound key: guarantees matching names with different units don't corrupt each other
    const key = `${cleanName}__${cleanUnit}`;

    const numAmount = typeof item.amount === 'number' && !isNaN(item.amount) ? item.amount : 0;

    if (groupedMap.has(key)) {
      const existing = groupedMap.get(key);
      existing.amount = Math.round((existing.amount + numAmount) * 100) / 100;
      if (item.notes && !existing.notes.includes(item.notes)) {
        existing.notes = existing.notes ? `${existing.notes}, ${item.notes}` : item.notes;
      }
    } else {
      groupedMap.set(key, {
        id: `ing-${Date.now()}-${index}-${Math.random().toString(36).substr(2, 4)}`,
        name: rawName, // Keep display casing
        amount: numAmount,
        unit: cleanUnit || item.unit || '',
        notes: item.notes || '',
        completed: false
      });
    }
  });

  return Array.from(groupedMap.values());
}

/**
 * Multi-criteria search, filter, and sorting function for recipes.
 * 
 * Filters:
 * - Search query (matches title or ingredient name)
 * - Category ('Breakfast', 'Lunch', 'Dinner', 'Desserts', 'Snacks', 'Drinks')
 * - Cuisine ('Indian', 'Italian', 'Mexican', etc.)
 * - Dietary preference ('Vegetarian', 'Vegan', 'Gluten-Free', etc.)
 * - Maximum cook + prep time
 * - Mood tag ('Comfort Food', 'Spicy', 'Quick Bites', etc.)
 * 
 * Sorting:
 * - 'featured': default curated order
 * - 'time-asc': fastest total time (prep + cook)
 * - 'alpha-asc': alphabetical A to Z
 * - 'alpha-desc': alphabetical Z to A
 */
export function filterAndSortRecipes(recipes, filters = {}) {
  const {
    search = '',
    category = 'all',
    cuisine = 'all',
    dietary = 'all',
    maxTime = 0,
    mood = 'all',
    sortBy = 'featured'
  } = filters;

  const normalizedSearch = search.trim().toLowerCase();

  const filtered = recipes.filter(recipe => {
    // 1. Search text query matching recipe name or ingredients
    if (normalizedSearch) {
      const matchesName = recipe.name.toLowerCase().includes(normalizedSearch);
      const matchesDescription = recipe.description.toLowerCase().includes(normalizedSearch);
      const matchesIngredient = recipe.ingredients.some(ing => 
        ing.name.toLowerCase().includes(normalizedSearch)
      );
      if (!matchesName && !matchesDescription && !matchesIngredient) {
        return false;
      }
    }

    // 2. Category filter
    if (category && category !== 'all') {
      if (recipe.category.toLowerCase() !== category.toLowerCase()) {
        return false;
      }
    }

    // 3. Cuisine filter
    if (cuisine && cuisine !== 'all') {
      if (recipe.cuisine.toLowerCase() !== cuisine.toLowerCase()) {
        return false;
      }
    }

    // 4. Dietary filter
    if (dietary && dietary !== 'all') {
      if (!recipe.dietaryTags.some(tag => tag.toLowerCase() === dietary.toLowerCase())) {
        return false;
      }
    }

    // 5. Mood filter
    if (mood && mood !== 'all') {
      if (!recipe.moodTags.some(tag => tag.toLowerCase() === mood.toLowerCase())) {
        return false;
      }
    }

    // 6. Max time filter (prepTime + cookTime)
    if (maxTime && Number(maxTime) > 0) {
      const totalTime = (recipe.prepTime || 0) + (recipe.cookTime || 0);
      if (totalTime > Number(maxTime)) {
        return false;
      }
    }

    return true;
  });

  // Sorting logic
  return [...filtered].sort((a, b) => {
    if (sortBy === 'time-asc') {
      const totalA = (a.prepTime || 0) + (a.cookTime || 0);
      const totalB = (b.prepTime || 0) + (b.cookTime || 0);
      return totalA - totalB;
    }
    if (sortBy === 'alpha-asc') {
      return a.name.localeCompare(b.name);
    }
    if (sortBy === 'alpha-desc') {
      return b.name.localeCompare(a.name);
    }
    // Default: featured first, then original order
    if (sortBy === 'featured') {
      if (a.featured && !b.featured) return -1;
      if (!a.featured && b.featured) return 1;
      return 0;
    }
    return 0;
  });
}

/**
 * Calculates summary metrics for the Weekly Meal Planner
 */
export function calculateMealPlanStats(mealPlan, recipesById) {
  let totalMeals = 0;
  const uniqueRecipeIds = new Set();
  const cuisines = new Set();
  let totalEstMinutes = 0;

  Object.values(mealPlan).forEach(daySlots => {
    Object.values(daySlots).forEach(recipeId => {
      if (recipeId && recipesById[recipeId]) {
        totalMeals += 1;
        uniqueRecipeIds.add(recipeId);
        const recipe = recipesById[recipeId];
        cuisines.add(recipe.cuisine);
        totalEstMinutes += (recipe.prepTime || 0) + (recipe.cookTime || 0);
      }
    });
  });

  return {
    totalMeals,
    uniqueRecipesCount: uniqueRecipeIds.size,
    distinctCuisinesCount: cuisines.size,
    totalCookingHours: Math.round((totalEstMinutes / 60) * 10) / 10
  };
}
