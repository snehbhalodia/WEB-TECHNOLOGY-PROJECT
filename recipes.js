/**
 * CRAVE! Recipe Database
 * 
 * Each recipe contains:
 * - id: unique string identifier
 * - name: appetizing recipe name
 * - image: high-resolution photography URL with fallback support
 * - cuisine: cultural origin (Indian, Italian, Mexican, Japanese, Thai, Mediterranean, American, Korean)
 * - category: meal category (Breakfast, Lunch, Dinner, Desserts, Snacks, Drinks)
 * - description: editorial magazine-style flavor synopsis
 * - prepTime: preparation duration in minutes
 * - cookTime: active cooking duration in minutes
 * - servings: baseline serving count for scalable calculations
 * - difficulty: 'Easy' | 'Medium' | 'Hard'
 * - dietaryTags: array of dietary labels
 * - moodTags: array of experiential mood labels
 * - ingredients: array of { name, amount, unit, notes } (structured for mathematical scaling & shopping list aggregation)
 * - instructions: numbered step-by-step cooking directions
 * - featured: whether highlighted in magazine trending spreads
 */

export const RECIPES = [
  {
    id: 'masala-dosa',
    name: 'Crispy Golden Masala Dosa',
    image: 'https://images.unsplash.com/photo-1668236543090-82eba5ee5976?auto=format&fit=crop&w=1000&q=80',
    cuisine: 'Indian',
    category: 'Breakfast',
    description: 'Paper-thin, fermented rice-and-lentil crepe with a burnished golden crunch, wrapped around spiced mustard-seed turmeric mashed potatoes. Served with fresh coconut chutney and tangy sambar.',
    prepTime: 25,
    cookTime: 20,
    servings: 4,
    difficulty: 'Medium',
    dietaryTags: ['Vegetarian', 'Vegan', 'Gluten-Free', 'Dairy-Free'],
    moodTags: ['Comfort Food', 'Weekend Treats', 'Spicy'],
    featured: true,
    ingredients: [
      { name: 'Fermented Dosa Batter', amount: 4, unit: 'cups', notes: 'room temperature' },
      { name: 'Yukon Gold Potatoes', amount: 4, unit: 'pieces', notes: 'boiled & roughly mashed' },
      { name: 'Yellow Onion', amount: 1, unit: 'pieces', notes: 'thinly sliced' },
      { name: 'Green Chilies', amount: 2, unit: 'pieces', notes: 'finely chopped' },
      { name: 'Mustard Seeds', amount: 1, unit: 'tsp', notes: 'black' },
      { name: 'Curry Leaves', amount: 10, unit: 'leaves', notes: 'fresh' },
      { name: 'Turmeric Powder', amount: 0.5, unit: 'tsp', notes: 'ground' },
      { name: 'Ginger', amount: 1, unit: 'tbsp', notes: 'grated' },
      { name: 'Ghee or Sesame Oil', amount: 3, unit: 'tbsp', notes: 'for crisping' },
      { name: 'Fresh Coriander', amount: 0.25, unit: 'cup', notes: 'chopped' },
      { name: 'Salt', amount: 1.5, unit: 'tsp', notes: 'to taste' }
    ],
    instructions: [
      'Boil the potatoes until fork tender, peel them, and roughly mash into chunky pieces with a fork.',
      'Heat oil in a heavy skillet. Splutter the black mustard seeds, then add curry leaves, green chilies, grated ginger, and sliced onions. Sauté until translucent.',
      'Add ground turmeric and salt. Fold in the mashed potatoes with 3 tablespoons of warm water. Simmer on low heat for 4 minutes until luscious and well blended. Garnish with fresh coriander.',
      'Heat a seasoned cast-iron tava or non-stick crepe pan over medium-high heat. Splash droplets of water to test temperature; it should sizzle immediately. Wipe dry with a kitchen towel.',
      'Pour a generous ladle of dosa batter into the exact center of the pan. Using the bottom of the ladle, spiral outward in quick circular motions to spread a thin, even disc.',
      'Drizzle half a tablespoon of ghee or oil along the perimeter and over the center. Cook on medium heat until the edges curl naturally and the underside turns deep golden brown.',
      'Spoon a generous strip of the warm potato masala across the center. Fold one edge over and roll into a crisp cylinder. Transfer onto a plate and serve steaming hot with coconut chutney.'
    ]
  },
  {
    id: 'paneer-tikka-wraps',
    name: 'Charred Paneer Tikka Kathi Rolls',
    image: 'https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&w=1000&q=80',
    cuisine: 'Indian',
    category: 'Lunch',
    description: 'Smoky tandoori-spiced paneer cubes charred to perfection, tucked into flaky layered parathas with zesty pickled red onions, fresh mint chutney, and chaat masala.',
    prepTime: 20,
    cookTime: 15,
    servings: 2,
    difficulty: 'Easy',
    dietaryTags: ['Vegetarian', 'High-Protein'],
    moodTags: ['Quick Bites', 'Comfort Food', 'Spicy'],
    featured: true,
    ingredients: [
      { name: 'Fresh Paneer', amount: 250, unit: 'g', notes: 'cut into 1-inch cubes' },
      { name: 'Greek Yogurt or Hung Curd', amount: 0.5, unit: 'cup', notes: 'thick' },
      { name: 'Flaky Parathas or Roti', amount: 2, unit: 'pieces', notes: 'warm' },
      { name: 'Bell Peppers', amount: 1, unit: 'pieces', notes: 'cubed' },
      { name: 'Red Onion', amount: 1, unit: 'pieces', notes: 'sliced into rings' },
      { name: 'Kashmiri Red Chili Powder', amount: 1, unit: 'tbsp', notes: 'for color & warmth' },
      { name: 'Garam Masala', amount: 1, unit: 'tsp', notes: 'aromatic blend' },
      { name: 'Kasuri Methi', amount: 1, unit: 'tsp', notes: 'crushed dried fenugreek' },
      { name: 'Lemon Juice', amount: 2, unit: 'tbsp', notes: 'freshly squeezed' },
      { name: 'Mint Coriander Chutney', amount: 4, unit: 'tbsp', notes: 'spicy & herby' },
      { name: 'Chaat Masala', amount: 1, unit: 'tsp', notes: 'finishing sprinkle' }
    ],
    instructions: [
      'In a bowl, whisk thick yogurt with Kashmiri chili powder, garam masala, crushed kasuri methi, lemon juice, grated ginger-garlic paste, and salt.',
      'Toss the paneer cubes and bell pepper chunks gently into the spiced marinade until thoroughly coated. Let rest for 15 minutes.',
      'Heat a ridged grill pan with 1 tablespoon of oil on high heat. Sear the paneer and peppers in a single layer for 3-4 minutes per side until deeply charred.',
      'Warm the flaky parathas on a skillet until blistered and crisp on both sides.',
      'Spread a thick layer of fresh green mint chutney down the center of each warm paratha.',
      'Arrange the charred paneer and peppers along the center, top with pickled lemon onion rings, and dust generously with chaat masala.',
      'Tightly roll the paratha up, wrap the lower half in parchment paper, and serve immediately.'
    ]
  },
  {
    id: 'butter-paneer',
    name: 'Velvety Shahi Butter Paneer',
    image: 'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?auto=format&fit=crop&w=1000&q=80',
    cuisine: 'Indian',
    category: 'Dinner',
    description: 'Pillowy cottage cheese simmered in a silky, slow-cooked makhani gravy enriched with ripe vine tomatoes, cashew butter, honey, and aromatic roasted fenugreek leaves.',
    prepTime: 20,
    cookTime: 25,
    servings: 4,
    difficulty: 'Medium',
    dietaryTags: ['Vegetarian', 'Gluten-Free'],
    moodTags: ['Comfort Food', 'Weekend Treats'],
    featured: true,
    ingredients: [
      { name: 'Fresh Paneer', amount: 350, unit: 'g', notes: 'cubed' },
      { name: 'Ripe Vine Tomatoes', amount: 5, unit: 'pieces', notes: 'roughly chopped' },
      { name: 'Raw Cashews', amount: 25, unit: 'g', notes: 'soaked in warm water' },
      { name: 'Butter', amount: 3, unit: 'tbsp', notes: 'unsalted' },
      { name: 'Heavy Cream', amount: 0.25, unit: 'cup', notes: 'fresh' },
      { name: 'Ginger-Garlic Paste', amount: 1.5, unit: 'tbsp', notes: 'freshly pounded' },
      { name: 'Kashmiri Chili Powder', amount: 1.5, unit: 'tbsp', notes: 'vibrant red' },
      { name: 'Garam Masala', amount: 1, unit: 'tsp', notes: 'fragrant spices' },
      { name: 'Kasuri Methi', amount: 1.5, unit: 'tsp', notes: 'toasted & crushed' },
      { name: 'Honey', amount: 1, unit: 'tsp', notes: 'to balance acidity' },
      { name: 'Salt', amount: 1, unit: 'tsp', notes: 'to taste' }
    ],
    instructions: [
      'In a saucepan, combine chopped tomatoes, soaked cashews, ginger-garlic paste, half the butter, cardamom pods, Kashmiri chili, and a half cup of water. Simmer covered for 15 minutes until soft.',
      'Allow the tomato mixture to cool slightly, then blend in a high-speed blender into an ultra-smooth silk purée. Strain through a fine sieve for signature restaurant velvet texture.',
      'Melt the remaining butter in a heavy kadai or saucepan over medium heat. Pour in the strained satin gravy and bring to a gentle bubble.',
      'Season with garam masala, salt, and honey. Stir in heavy cream and gently slide in the paneer cubes.',
      'Simmer on gentle heat for 5 minutes, allowing the paneer to absorb the rich gravy without becoming rubbery.',
      'Finish by crushing toasted kasuri methi between your palms directly over the curry. Swirl with extra cream and serve with hot garlic naan.'
    ]
  },
  {
    id: 'vegetable-biryani',
    name: 'Dum Pukht Royal Vegetable Biryani',
    image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=1000&q=80',
    cuisine: 'Indian',
    category: 'Dinner',
    description: 'Long-grain aged basmati rice cooked with whole spices, layered with tender saffron-infused garden vegetables, caramelized birista onions, fresh mint, and rose water under slow steam.',
    prepTime: 30,
    cookTime: 40,
    servings: 4,
    difficulty: 'Hard',
    dietaryTags: ['Vegetarian', 'Gluten-Free'],
    moodTags: ['Comfort Food', 'Weekend Treats'],
    featured: false,
    ingredients: [
      { name: 'Aged Basmati Rice', amount: 2, unit: 'cups', notes: 'soaked 30 mins' },
      { name: 'Mixed Vegetables (Carrot, Beans, Peas)', amount: 2.5, unit: 'cups', notes: 'cut into batons' },
      { name: 'Greek Yogurt', amount: 0.75, unit: 'cup', notes: 'whisked' },
      { name: 'Birista Fried Onions', amount: 1, unit: 'cup', notes: 'golden brown & crisp' },
      { name: 'Ghee', amount: 3, unit: 'tbsp', notes: 'pure clarified butter' },
      { name: 'Saffron Strands', amount: 1, unit: 'pinch', notes: 'steeped in 3 tbsp warm milk' },
      { name: 'Whole Spices (Cardamom, Cloves, Cinnamon)', amount: 1, unit: 'tbsp', notes: 'mixed' },
      { name: 'Biryani Masala', amount: 1.5, unit: 'tbsp', notes: 'freshly ground' },
      { name: 'Fresh Mint & Coriander', amount: 0.5, unit: 'cup', notes: 'roughly chopped' },
      { name: 'Kewra or Rose Water', amount: 1, unit: 'tsp', notes: 'fragrant drop' }
    ],
    instructions: [
      'Bring 8 cups of water to a rolling boil with whole cloves, star anise, cardamom, bay leaf, and 2 tablespoons of sea salt. Add soaked rice and boil until 70% cooked (about 6 minutes). Drain completely.',
      'In a wide Dutch oven, warm ghee. Sauté ginger-garlic paste and diced vegetables for 4 minutes. Turn off heat, add yogurt, biryani masala, turmeric, half the fried onions, mint, and salt. Mix thoroughly.',
      'Level the spiced vegetable layer at the bottom of the pot. Scatter half of the parboiled rice over the top.',
      'Sprinkle a layer of chopped mint, coriander, fried onions, and half the saffron milk.',
      'Add the remaining rice as the top crown layer. Drizzle with the remaining saffron milk, ghee, and rose water.',
      'Seal the pot tightly with an aluminum foil lid or dough, then cover with a heavy lid. Cook on high heat for 3 minutes, then drop to lowest flame over a cast-iron diffuser for 25 minutes.',
      'Rest for 10 minutes before opening. Gently fluff from the sides with a flat spatula to reveal the fragrant layers.'
    ]
  },
  {
    id: 'margherita-pizza',
    name: 'Artisan Woodfired Margherita Pizza',
    image: 'https://images.unsplash.com/photo-1604382355076-af4b0eb60143?auto=format&fit=crop&w=1000&q=80',
    cuisine: 'Italian',
    category: 'Dinner',
    description: '72-hour cold-fermented dough topped with crushed sweet San Marzano tomatoes, fresh creamy fior di latte mozzarella, peppery basil leaves, and a drizzle of peppery extra virgin olive oil.',
    prepTime: 20,
    cookTime: 12,
    servings: 2,
    difficulty: 'Medium',
    dietaryTags: ['Vegetarian'],
    moodTags: ['Weekend Treats', 'Comfort Food'],
    featured: true,
    ingredients: [
      { name: 'Pizza Dough Ball', amount: 1, unit: 'pieces', notes: 'room temperature' },
      { name: 'San Marzano Canned Tomatoes', amount: 0.75, unit: 'cup', notes: 'hand crushed with salt' },
      { name: 'Fresh Mozzarella / Fior di Latte', amount: 180, unit: 'g', notes: 'torn & drained' },
      { name: 'Fresh Basil Leaves', amount: 10, unit: 'leaves', notes: 'picked fresh' },
      { name: 'Extra Virgin Olive Oil', amount: 2, unit: 'tbsp', notes: 'fruity & cold-pressed' },
      { name: 'Parmigiano-Reggiano', amount: 2, unit: 'tbsp', notes: 'freshly grated' },
      { name: 'Semolina Flour', amount: 2, unit: 'tbsp', notes: 'for dusting' }
    ],
    instructions: [
      'Preheat your home oven with a pizza stone or heavy cast-iron baking steel at its maximum temperature (260°C / 500°F) for at least 45 minutes.',
      'Dust a clean counter generously with semolina flour. Place dough ball down and use your fingertips to push air bubbles from the center outward toward the crust (cornicione).',
      'Gently drape the stretched dough over your knuckles, rotating smoothly until an even 12-inch disc forms with an airy rim.',
      'Transfer stretched dough onto a lightly floured pizza peel or parchment sheet.',
      'Ladle the hand-crushed San Marzano tomatoes onto the center and swirl outward in a spiral, leaving a 1-inch border.',
      'Scatter torn mozzarella pieces across the sauce and finish with a dusting of aged Parmigiano.',
      'Slide onto the scorching stone and bake for 8 to 10 minutes until the crust is blistered with leopard spots and the cheese is bubbling golden.',
      'Remove immediately, scatter fresh torn basil leaves, drizzle with fruity olive oil, slice, and savor.'
    ]
  },
  {
    id: 'creamy-mushroom-pasta',
    name: 'Wild Truffle & Cremini Tagliatelle',
    image: 'https://images.unsplash.com/photo-1621996346565-e3d5d6281294?auto=format&fit=crop&w=1000&q=80',
    cuisine: 'Italian',
    category: 'Dinner',
    description: 'Silky bronze-cut tagliatelle ribbons tossed in a velvety reduction of browned butter, caramelized wild mushrooms, roasted garlic, white wine, thyme, and aged pecorino.',
    prepTime: 15,
    cookTime: 15,
    servings: 2,
    difficulty: 'Easy',
    dietaryTags: ['Vegetarian'],
    moodTags: ['Comfort Food', 'Weekend Treats', 'Quick Bites'],
    featured: false,
    ingredients: [
      { name: 'Tagliatelle or Fettuccine Pasta', amount: 250, unit: 'g', notes: 'bronze-cut' },
      { name: 'Mixed Wild Mushrooms (Cremini, Shiitake)', amount: 300, unit: 'g', notes: 'sliced thick' },
      { name: 'Garlic', amount: 3, unit: 'cloves', notes: 'finely minced' },
      { name: 'Butter', amount: 3, unit: 'tbsp', notes: 'divided' },
      { name: 'Heavy Cream', amount: 0.5, unit: 'cup', notes: 'room temp' },
      { name: 'Dry White Wine', amount: 0.25, unit: 'cup', notes: 'or vegetable broth' },
      { name: 'Fresh Thyme', amount: 1, unit: 'tbsp', notes: 'leaves only' },
      { name: 'Parmesan / Pecorino', amount: 0.5, unit: 'cup', notes: 'finely grated' },
      { name: 'Black Truffle Oil', amount: 1, unit: 'tsp', notes: 'optional finishing touch' },
      { name: 'Pasta Cooking Water', amount: 0.5, unit: 'cup', notes: 'reserved starchy water' }
    ],
    instructions: [
      'Bring a large pot of salted water to a rolling boil. Cook the tagliatelle until 1 minute shy of al dente. Reserve half a cup of starchy pasta water before draining.',
      'While pasta cooks, melt 1 tablespoon of butter in a wide stainless steel pan over high heat. Add sliced mushrooms in a single layer and let sear undisturbed for 3 minutes until deep golden.',
      'Toss mushrooms, season with sea salt and cracked black pepper, and add minced garlic and fresh thyme. Cook for 2 minutes until aromatic.',
      'Deglaze the skillet with white wine, scraping up all the savory browned fond from the bottom of the pan.',
      'Pour in the cream and remaining butter. Allow to bubble and reduce slightly for 2 minutes.',
      'Add the drained pasta and half the reserved pasta water into the skillet. Toss vigorously over medium heat so the starch emulsifies the sauce into a glossy glaze.',
      'Remove from heat, fold in the grated parmesan cheese until melted, and finish with a delicate drizzle of truffle oil. Serve immediately.'
    ]
  },
  {
    id: 'street-crispy-tacos',
    name: 'Baja Smoky Charred Street Tacos',
    image: 'https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?auto=format&fit=crop&w=1000&q=80',
    cuisine: 'Mexican',
    category: 'Lunch',
    description: 'Crisp griddled white corn tortillas stuffed with smoky chipotle-seasoned black beans, charred sweet corn, avocado crema, pickled habanero onions, and fresh cilantro.',
    prepTime: 15,
    cookTime: 12,
    servings: 3,
    difficulty: 'Easy',
    dietaryTags: ['Vegetarian', 'Vegan', 'Gluten-Free', 'High-Protein'],
    moodTags: ['Quick Bites', 'Spicy', 'Healthy-ish'],
    featured: true,
    ingredients: [
      { name: 'White Corn Tortillas', amount: 6, unit: 'pieces', notes: 'small street taco size' },
      { name: 'Black Beans', amount: 1.5, unit: 'cups', notes: 'cooked or canned, drained' },
      { name: 'Sweet Corn Kernels', amount: 1, unit: 'cup', notes: 'fresh or charred' },
      { name: 'Ripe Avocado', amount: 1, unit: 'pieces', notes: 'mashed with lime & salt' },
      { name: 'Pickled Red Onions', amount: 0.5, unit: 'cup', notes: 'tangy' },
      { name: 'Chipotle in Adobo', amount: 1, unit: 'tbsp', notes: 'finely minced' },
      { name: 'Ground Cumin', amount: 1, unit: 'tsp', notes: 'toasted' },
      { name: 'Smoked Paprika', amount: 1, unit: 'tsp', notes: 'sweet & smoky' },
      { name: 'Limes', amount: 2, unit: 'pieces', notes: 'cut into wedges' },
      { name: 'Fresh Cilantro', amount: 0.5, unit: 'cup', notes: 'coarsely chopped' },
      { name: 'Cotija or Crumbled Feta', amount: 0.25, unit: 'cup', notes: 'optional' }
    ],
    instructions: [
      'Heat 1 tablespoon of olive oil in a skillet. Add drained black beans, minced chipotle, cumin, smoked paprika, and a splash of water. Simmer and lightly crush with the back of a spoon for 5 minutes.',
      'In a dry hot cast-iron skillet, char the corn kernels until speckled with brown embers. Season with a squeeze of lime and pinch of salt.',
      'Brush corn tortillas lightly with oil and toast in the hot skillet for 45 seconds per side until puffed, blistered, and pliable.',
      'Assemble tacos: spoon a generous foundation of warm chipotle black beans into each tortilla.',
      'Top with charred corn, dollops of seasoned avocado crema, pickled red onions, and crumbled cheese.',
      'Garnish generously with fresh cilantro leaves and serve immediately with fresh lime wedges for squeezing.'
    ]
  },
  {
    id: 'vegetable-ramen',
    name: 'Spicy Garlic Sesame Vegetable Ramen',
    image: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=1000&q=80',
    cuisine: 'Japanese',
    category: 'Dinner',
    description: 'Deep savory miso and toasted sesame broth poured over springy handmade ramen noodles, garnished with baby bok choy, crispy glazed tofu, nori sheets, and fiery chili oil.',
    prepTime: 20,
    cookTime: 20,
    servings: 2,
    difficulty: 'Medium',
    dietaryTags: ['Vegetarian', 'Vegan', 'Dairy-Free'],
    moodTags: ['Comfort Food', 'Spicy', 'Weekend Treats'],
    featured: true,
    ingredients: [
      { name: 'Fresh Ramen Noodles', amount: 2, unit: 'portions', notes: 'alkaline wheat noodles' },
      { name: 'Firm Tofu', amount: 200, unit: 'g', notes: 'pressed and cubed' },
      { name: 'Red or White Miso Paste', amount: 2.5, unit: 'tbsp', notes: 'umami-rich' },
      { name: 'Toasted Sesame Paste / Tahini', amount: 2, unit: 'tbsp', notes: 'creamy base' },
      { name: 'Vegetable Dashi or Stock', amount: 4, unit: 'cups', notes: 'unsalted' },
      { name: 'Toasted Sesame Oil', amount: 1.5, unit: 'tbsp', notes: 'pure' },
      { name: 'Garlic', amount: 4, unit: 'cloves', notes: 'grated' },
      { name: 'Baby Bok Choy', amount: 2, unit: 'pieces', notes: 'halved lengthwise' },
      { name: 'Chili Crisp / Rayu', amount: 1, unit: 'tbsp', notes: 'for heat' },
      { name: 'Scallions', amount: 2, unit: 'stalks', notes: 'thinly sliced' },
      { name: 'Roasted Nori Sheets', amount: 2, unit: 'pieces', notes: 'squares' }
    ],
    instructions: [
      'In a soup pot, heat 1 tablespoon of sesame oil over medium heat. Sauté grated garlic and ginger for 1 minute until fragrant.',
      'Whisk in miso paste and sesame tahini, then gradually pour in warm vegetable broth while whisking continuously to form an emulsified creamy broth. Simmer gently on low heat for 10 minutes.',
      'In a separate pan, crisp cubed tofu in 1 tablespoon of oil until golden on all sides. Toss with 1 teaspoon of soy sauce.',
      'Quickly blanch baby bok choy halves directly in the simmering ramen broth for 90 seconds until tender-crisp. Remove with tongs and set aside.',
      'Boil ramen noodles in a separate pot of rapid boiling water for precisely 2 minutes. Drain thoroughly.',
      'Divide the noodles between two deep, wide ramen bowls. Ladle the piping hot sesame miso broth over the noodles.',
      'Arrange the crispy tofu, halved bok choy, sliced scallions, and nori sheets neatly around the rim. Drizzle generously with red chili crisp.'
    ]
  },
  {
    id: 'thai-green-curry',
    name: 'Aromatic Lemongrass Thai Green Curry',
    image: 'https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd?auto=format&fit=crop&w=1000&q=80',
    cuisine: 'Thai',
    category: 'Dinner',
    description: 'Fragrant green curry paste bloomed in coconut cream, simmered with crisp Thai eggplants, baby corn, bamboo shoots, kaffir lime leaves, and sweet Thai basil.',
    prepTime: 15,
    cookTime: 15,
    servings: 3,
    difficulty: 'Easy',
    dietaryTags: ['Vegetarian', 'Vegan', 'Gluten-Free', 'Dairy-Free'],
    moodTags: ['Spicy', 'Comfort Food', 'Healthy-ish'],
    featured: false,
    ingredients: [
      { name: 'Thai Green Curry Paste', amount: 3, unit: 'tbsp', notes: 'authentic blend' },
      { name: 'Full-Fat Coconut Milk', amount: 1.5, unit: 'cans', notes: '400ml each' },
      { name: 'Thai Eggplants or Zucchini', amount: 1.5, unit: 'cups', notes: 'quartered' },
      { name: 'Baby Corn', amount: 0.75, unit: 'cup', notes: 'sliced diagonally' },
      { name: 'Bamboo Shoots', amount: 0.5, unit: 'cup', notes: 'drained' },
      { name: 'Kaffir Lime Leaves', amount: 4, unit: 'leaves', notes: 'torn & bruised' },
      { name: 'Soy Sauce or Tamari', amount: 1.5, unit: 'tbsp', notes: 'for seasoning' },
      { name: 'Palm Sugar or Brown Sugar', amount: 1, unit: 'tbsp', notes: 'to balance' },
      { name: 'Fresh Thai Basil Leaves', amount: 1, unit: 'cup', notes: 'fragrant' },
      { name: 'Red Bird\'s Eye Chili', amount: 1, unit: 'pieces', notes: 'sliced for garnish' }
    ],
    instructions: [
      'Open the can of coconut milk without shaking. Spoon 3 tablespoons of the thick coconut cream layer into a wok over medium-high heat.',
      'Cook the coconut cream until it reduces and starts separating into glistening oil droplets.',
      'Add the green curry paste and fry vigorously in the coconut oil for 2-3 minutes until intensely fragrant and bright green.',
      'Pour in the remainder of the coconut milk and bring to a gentle boil.',
      'Add Thai eggplants, baby corn, bamboo shoots, and bruised kaffir lime leaves. Simmer uncovered for 8 minutes until vegetables are tender.',
      'Season with soy sauce and palm sugar. Taste and adjust balance of savory, sweet, and spicy.',
      'Turn off heat completely, then fold in fresh Thai basil leaves until just wilted. Serve hot with steamed jasmine rice.'
    ]
  },
  {
    id: 'santorini-greek-salad',
    name: 'Santorini Sun-Drenched Greek Salad',
    image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=1000&q=80',
    cuisine: 'Mediterranean',
    category: 'Lunch',
    description: 'A vibrant Aegean celebration of sweet sun-ripened tomatoes, Persian cucumbers, briny Kalamata olives, thinly sliced red onion, and a thick slab of creamy sheep\'s milk feta with wild oregano.',
    prepTime: 10,
    cookTime: 0,
    servings: 2,
    difficulty: 'Easy',
    dietaryTags: ['Vegetarian', 'Gluten-Free'],
    moodTags: ['Healthy-ish', 'Quick Bites'],
    featured: false,
    ingredients: [
      { name: 'Heirloom Vine Tomatoes', amount: 4, unit: 'pieces', notes: 'cut into uneven wedges' },
      { name: 'Persian Cucumbers', amount: 2, unit: 'pieces', notes: 'sliced into chunky rounds' },
      { name: 'Kalamata Olives', amount: 0.5, unit: 'cup', notes: 'pitted' },
      { name: 'Red Onion', amount: 0.5, unit: 'pieces', notes: 'sliced into thin rings' },
      { name: 'Block Feta Cheese', amount: 150, unit: 'g', notes: 'authentic Greek slab' },
      { name: 'Extra Virgin Olive Oil', amount: 3, unit: 'tbsp', notes: 'cold-pressed Greek' },
      { name: 'Red Wine Vinegar', amount: 1, unit: 'tbsp', notes: 'aged' },
      { name: 'Wild Dried Oregano', amount: 1, unit: 'tsp', notes: 'crushed between fingers' },
      { name: 'Flaky Sea Salt', amount: 0.5, unit: 'tsp', notes: 'Maldon or sea salt' },
      { name: 'Capers', amount: 1, unit: 'tbsp', notes: 'rinsed' }
    ],
    instructions: [
      'In a wide, shallow ceramic salad bowl, combine the tomato wedges, sliced cucumber, and capers.',
      'Toss in the Kalamata olives and the thinly sliced red onion rings.',
      'Drizzle with the red wine vinegar, cold-pressed olive oil, and a sprinkle of flaky sea salt. Gently toss together with your hands so the juices begin to marry.',
      'Place the entire slab of creamy Greek feta cheese directly on top of the salad mound.',
      'Generously drizzle the feta slab with another tablespoon of olive oil and rub the wild oregano between your fingertips directly over the cheese.',
      'Serve at room temperature alongside warm crusty sourdough bread for dipping into the tomato juices.'
    ]
  },
  {
    id: 'fudgy-espresso-brownies',
    name: 'Crackly Crust Dark Espresso Brownies',
    image: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=1000&q=80',
    cuisine: 'American',
    category: 'Desserts',
    description: 'Decadent, intensely fudgy brownies made with 70% dark chocolate and espresso, boasting a mirror-shine tissue-thin crinkle crust and flaky Maldon sea salt tops.',
    prepTime: 15,
    cookTime: 25,
    servings: 9,
    difficulty: 'Easy',
    dietaryTags: ['Vegetarian'],
    moodTags: ['Sweet Tooth', 'Weekend Treats', 'Comfort Food'],
    featured: true,
    ingredients: [
      { name: '70% Dark Chocolate', amount: 200, unit: 'g', notes: 'chopped coarsely' },
      { name: 'Unsalted Butter', amount: 120, unit: 'g', notes: 'cubed' },
      { name: 'Granulated Sugar', amount: 1, unit: 'cup', notes: 'whisked into eggs' },
      { name: 'Large Eggs', amount: 2, unit: 'pieces', notes: 'room temperature' },
      { name: 'Espresso Powder', amount: 1.5, unit: 'tsp', notes: 'enhances chocolate' },
      { name: 'All-Purpose Flour', amount: 0.5, unit: 'cup', notes: 'sifted' },
      { name: 'Dutch-Process Cocoa Powder', amount: 0.25, unit: 'cup', notes: 'high fat' },
      { name: 'Pure Vanilla Extract', amount: 1, unit: 'tsp', notes: 'Madagascar' },
      { name: 'Flaky Sea Salt', amount: 1, unit: 'tsp', notes: 'for finishing' }
    ],
    instructions: [
      'Preheat oven to 175°C (350°F). Line an 8x8-inch square metal baking pan with parchment paper, leaving an overhang on the sides for easy lifting.',
      'Melt chopped dark chocolate and butter together in a heatproof bowl set over a pot of barely simmering water (bain-marie). Stir until silky, then set aside to cool slightly.',
      'In a large mixing bowl, beat eggs, sugar, espresso powder, and vanilla extract with an electric mixer or vigorous hand whisk for 4-5 minutes until pale, ribbony, and tripled in volume (the secret to the crinkle top!).',
      'Gently fold the melted chocolate mixture into the whipped egg mixture with a spatula.',
      'Sift the flour, cocoa powder, and half a teaspoon of fine salt over the bowl. Fold gently just until no dry flour streaks remain—do not overmix!',
      'Pour batter into the prepared pan and smooth the top evenly with an offset spatula.',
      'Bake for 22 to 25 minutes. A toothpick inserted 2 inches from the edge should come out with moist crumbs, not wet batter.',
      'Sprinkle flaky sea salt immediately over the hot brownies. Allow to cool completely in the pan before lifting out and slicing into clean squares.'
    ]
  },
  {
    id: 'ricotta-blueberry-pancakes',
    name: 'Cloud-Fluffy Ricotta Blueberry Pancakes',
    image: 'https://images.unsplash.com/photo-1528207776546-365bb710ee93?auto=format&fit=crop&w=1000&q=80',
    cuisine: 'American',
    category: 'Breakfast',
    description: 'Impossibly light, golden souffle-style pancakes folded with creamy whole milk ricotta and bursting wild blueberries, crowned with salted butter and pure Grade A maple syrup.',
    prepTime: 15,
    cookTime: 12,
    servings: 3,
    difficulty: 'Easy',
    dietaryTags: ['Vegetarian'],
    moodTags: ['Sweet Tooth', 'Weekend Treats', 'Comfort Food'],
    featured: false,
    ingredients: [
      { name: 'All-Purpose Flour', amount: 1.5, unit: 'cups', notes: 'fluffed & leveled' },
      { name: 'Whole Milk Ricotta Cheese', amount: 1, unit: 'cup', notes: 'drained' },
      { name: 'Fresh Blueberries', amount: 1, unit: 'cup', notes: 'wild or organic' },
      { name: 'Large Eggs', amount: 2, unit: 'pieces', notes: 'separated whites & yolks' },
      { name: 'Whole Milk', amount: 0.75, unit: 'cup', notes: 'room temperature' },
      { name: 'Baking Powder', amount: 2, unit: 'tsp', notes: 'fresh' },
      { name: 'Pure Vanilla Extract', amount: 1, unit: 'tsp', notes: 'extract' },
      { name: 'Sugar', amount: 3, unit: 'tbsp', notes: 'fine cane sugar' },
      { name: 'Pure Maple Syrup', amount: 0.5, unit: 'cup', notes: 'for drizzling' },
      { name: 'Butter', amount: 2, unit: 'tbsp', notes: 'for griddling' }
    ],
    instructions: [
      'In a large bowl, whisk together the flour, baking powder, sugar, and half a teaspoon of salt.',
      'In a separate bowl, whisk egg yolks, ricotta, milk, and vanilla extract until creamy and smooth.',
      'In a clean glass bowl, whip egg whites with a hand whisk until stiff peaks form.',
      'Pour the ricotta mixture into the dry flour ingredients, stirring gently with a spatula until just combined (small lumps are good).',
      'Fold one-third of the whipped egg whites into the batter to lighten it, then delicately fold in the remaining whites and fresh blueberries without deflating.',
      'Heat a skillet or griddle over medium-low heat and melt a pat of butter. Ladle 1/3 cup of batter per pancake.',
      'Cook for 3 to 4 minutes until bubbles appear on the surface and the underside is glowing golden brown. Flip carefully and cook 2 minutes more.',
      'Stack high on a warm plate, top with a generous square of cold butter, and cascade with warm maple syrup.'
    ]
  },
  {
    id: 'alphonso-mango-smoothie',
    name: 'Alphonso Mango Saffron Velvet Smoothie',
    image: 'https://images.unsplash.com/photo-1546173159-315724a31696?auto=format&fit=crop&w=1000&q=80',
    cuisine: 'Indian',
    category: 'Drinks',
    description: 'Golden sun-ripened Alphonso mango blended with probiotic Greek yogurt, oat milk, crushed green cardamom seeds, floral saffron, and roasted pistachio slivers.',
    prepTime: 5,
    cookTime: 0,
    servings: 2,
    difficulty: 'Easy',
    dietaryTags: ['Vegetarian', 'Gluten-Free'],
    moodTags: ['Quick Bites', 'Healthy-ish', 'Sweet Tooth'],
    featured: true,
    ingredients: [
      { name: 'Ripe Alphonso Mango Pulp', amount: 2, unit: 'cups', notes: 'fresh or chilled puree' },
      { name: 'Greek Yogurt', amount: 1, unit: 'cup', notes: 'creamy plain' },
      { name: 'Chilled Milk or Oat Milk', amount: 0.75, unit: 'cup', notes: 'creamy' },
      { name: 'Green Cardamom', amount: 4, unit: 'pods', notes: 'freshly crushed seeds' },
      { name: 'Honey or Maple Syrup', amount: 1.5, unit: 'tbsp', notes: 'to taste' },
      { name: 'Ice Cubes', amount: 4, unit: 'cubes', notes: 'for frosty texture' },
      { name: 'Saffron Strands', amount: 1, unit: 'pinch', notes: 'bloomed in 1 tbsp warm milk' },
      { name: 'Shelled Pistachios', amount: 1, unit: 'tbsp', notes: 'finely slivered for topping' }
    ],
    instructions: [
      'In a high-powered blender, add the chilled mango pulp, Greek yogurt, milk, and ice cubes.',
      'Crack open the green cardamom pods, crush the seeds finely in a mortar, and add to the blender alongside the honey and bloomed saffron.',
      'Blend on high speed for 60 to 90 seconds until thick, frothy, and completely silky.',
      'Taste and adjust sweetness with extra honey if desired.',
      'Pour into chilled tall vintage glasses, top with slivered emerald pistachios and a strand of saffron, and serve immediately with a glass straw.'
    ]
  },
  {
    id: 'loaded-truffle-fries',
    name: 'Loaded Truffle Parmesan Garlic Fries',
    image: 'https://images.unsplash.com/photo-1585109649139-366815a0d713?auto=format&fit=crop&w=1000&q=80',
    cuisine: 'American',
    category: 'Snacks',
    description: 'Crispy double-cooked hand-cut Russet fries tossed with fragrant white truffle oil, finely grated aged Parmesan, roasted garlic butter, fresh rosemary, and smoked paprika.',
    prepTime: 15,
    cookTime: 20,
    servings: 3,
    difficulty: 'Easy',
    dietaryTags: ['Vegetarian', 'Gluten-Free'],
    moodTags: ['Comfort Food', 'Weekend Treats', 'Quick Bites'],
    featured: false,
    ingredients: [
      { name: 'Russet Potatoes', amount: 4, unit: 'large', notes: 'cut into 1/4-inch matchsticks' },
      { name: 'White Truffle Oil', amount: 2, unit: 'tbsp', notes: 'high quality' },
      { name: 'Aged Parmesan Cheese', amount: 0.75, unit: 'cup', notes: 'microplaned into fluffy snow' },
      { name: 'Garlic Butter', amount: 2, unit: 'tbsp', notes: 'melted' },
      { name: 'Fresh Rosemary', amount: 1.5, unit: 'tbsp', notes: 'very finely minced' },
      { name: 'Flaky Sea Salt', amount: 1.5, unit: 'tsp', notes: 'to taste' },
      { name: 'Fresh Flat-Leaf Parsley', amount: 2, unit: 'tbsp', notes: 'chopped' },
      { name: 'Neutral Frying Oil', amount: 4, unit: 'cups', notes: 'for deep or air frying' }
    ],
    instructions: [
      'Submerge potato matchsticks in a bowl of cold ice water for 30 minutes to wash away excess surface starch. Drain thoroughly and pat completely dry with clean kitchen towels.',
      'Heat oil to 160°C (325°F) for the first fry. Fry potatoes in batches for 5 minutes until soft but pale. Drain on paper towels and rest for 10 minutes.',
      'Increase oil heat to 190°C (375°F). Fry the rested potatoes a second time for 3-4 minutes until intensely crisp and deep golden amber.',
      'Transfer the piping-hot fries immediately into a large metal mixing bowl.',
      'While blazing hot, drizzle with melted garlic butter and white truffle oil.',
      'Scatter the minced rosemary, chopped parsley, sea salt, and a snow shower of microplaned Parmesan cheese.',
      'Toss the bowl vigorously so every fry is evenly coated in the aromatic truffle cheese crust. Pile high and serve with garlic aioli.'
    ]
  },
  {
    id: 'rainbow-buddha-bowl',
    name: 'Rainbow Glow Green Goddess Buddha Bowl',
    image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=1000&q=80',
    cuisine: 'Mediterranean',
    category: 'Lunch',
    description: 'A vibrant kaleidoscope bowl of warm lemon herb quinoa, spiced roasted chickpeas, massaged curly kale, sweet roasted sweet potatoes, sliced Hass avocado, and zesty tahini goddess dressing.',
    prepTime: 20,
    cookTime: 25,
    servings: 2,
    difficulty: 'Easy',
    dietaryTags: ['Vegetarian', 'Vegan', 'Gluten-Free', 'High-Protein', 'Dairy-Free'],
    moodTags: ['Healthy-ish', 'Comfort Food'],
    featured: true,
    ingredients: [
      { name: 'Cooked Quinoa', amount: 1.5, unit: 'cups', notes: 'warm & fluffy' },
      { name: 'Chickpeas', amount: 1, unit: 'can', notes: 'rinsed, drained & spiced' },
      { name: 'Sweet Potato', amount: 1, unit: 'pieces', notes: 'cubed & roasted' },
      { name: 'Curly Kale', amount: 3, unit: 'cups', notes: 'stems removed, chopped' },
      { name: 'Ripe Hass Avocado', amount: 1, unit: 'pieces', notes: 'sliced into fans' },
      { name: 'Sesame Tahini', amount: 3, unit: 'tbsp', notes: 'smooth & creamy' },
      { name: 'Lemon Juice', amount: 2, unit: 'tbsp', notes: 'fresh' },
      { name: 'Maple Syrup', amount: 1, unit: 'tsp', notes: 'pure' },
      { name: 'Warm Water', amount: 2, unit: 'tbsp', notes: 'to thin dressing' },
      { name: 'Toasted Pumpkin Seeds', amount: 2, unit: 'tbsp', notes: 'pepitas for crunch' }
    ],
    instructions: [
      'Toss cubed sweet potatoes and chickpeas with 1 tablespoon olive oil, smoked paprika, garlic powder, and sea salt. Roast on a sheet pan at 200°C (400°F) for 22 minutes until crispy.',
      'Place chopped kale in a bowl with half a teaspoon of olive oil and a pinch of salt. Massage with your hands for 2 minutes until dark green and tender.',
      'Make the Green Goddess Tahini Dressing: Whisk tahini, lemon juice, maple syrup, minced garlic, a pinch of salt, and warm water until pale and drizzly.',
      'Assemble bowls: divide fluffy quinoa between two wide artisan bowls.',
      'Arrange sections of massaged kale, roasted sweet potato cubes, spiced chickpeas, and avocado fans on top.',
      'Drizzle liberally with creamy tahini dressing, shower with toasted pumpkin seeds, and enjoy immediately.'
    ]
  },
  {
    id: 'korean-spicy-cauliflower',
    name: 'Sticky Gochujang Crispy Cauliflower',
    image: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=1000&q=80',
    cuisine: 'Korean',
    category: 'Snacks',
    description: 'Crisp tempura-battered cauliflower florets tossed in a glossy, sticky sweet-heat glaze of Korean gochujang, toasted sesame oil, ginger, garlic, and scallions.',
    prepTime: 15,
    cookTime: 15,
    servings: 3,
    difficulty: 'Medium',
    dietaryTags: ['Vegetarian', 'Vegan', 'Dairy-Free'],
    moodTags: ['Spicy', 'Weekend Treats', 'Comfort Food'],
    featured: false,
    ingredients: [
      { name: 'Cauliflower', amount: 1, unit: 'head', notes: 'cut into bite-sized florets' },
      { name: 'Cornstarch', amount: 0.5, unit: 'cup', notes: 'for extreme crunch' },
      { name: 'All-Purpose Flour', amount: 0.5, unit: 'cup', notes: 'batter base' },
      { name: 'Cold Sparkling Water', amount: 0.75, unit: 'cup', notes: 'ice cold' },
      { name: 'Korean Gochujang Chili Paste', amount: 2.5, unit: 'tbsp', notes: 'fermented spicy sweet' },
      { name: 'Soy Sauce', amount: 1.5, unit: 'tbsp', notes: 'savory umami' },
      { name: 'Rice Vinegar', amount: 1, unit: 'tbsp', notes: 'crisp acidity' },
      { name: 'Brown Sugar or Agave', amount: 2, unit: 'tbsp', notes: 'for caramel glaze' },
      { name: 'Toasted Sesame Seeds', amount: 1, unit: 'tbsp', notes: 'for garnish' },
      { name: 'Green Scallions', amount: 2, unit: 'stalks', notes: 'chopped' }
    ],
    instructions: [
      'In a medium bowl, whisk together cornstarch, all-purpose flour, a pinch of salt, and ice-cold sparkling water to form a pancake-batter consistency.',
      'Dip cauliflower florets into the batter, allowing excess to drip off.',
      'Fry florets in hot oil (180°C / 360°F) or bake in a high-heat air fryer for 10-12 minutes until light golden and audibly crunchy.',
      'In a wide skillet, combine gochujang paste, soy sauce, rice vinegar, brown sugar, grated garlic, and sesame oil. Bring to a rapid simmer for 2 minutes until glossy and bubbling.',
      'Toss the crispy fried cauliflower florets directly into the bubbling glaze, coating every crevice within 30 seconds.',
      'Transfer onto a serving platter, garnish generously with toasted sesame seeds and sliced scallions, and serve immediately while sizzling.'
    ]
  }
];

export const CATEGORIES = [
  { id: 'all', label: 'All Recipes', emoji: '🍽️', color: '#191714', bg: '#FFF6E8' },
  { id: 'Breakfast', label: 'Breakfast', emoji: '🥞', color: '#F04438', bg: '#FFEBEA' },
  { id: 'Lunch', label: 'Lunch', emoji: '🥪', color: '#FF8126', bg: '#FFF2E8' },
  { id: 'Dinner', label: 'Dinner', emoji: '🍲', color: '#747A42', bg: '#F2F5E6' },
  { id: 'Desserts', label: 'Desserts', emoji: '🍰', color: '#F04438', bg: '#FFF0F5' },
  { id: 'Snacks', label: 'Snacks', emoji: '🍟', color: '#FFD84D', bg: '#FFFBD4' },
  { id: 'Drinks', label: 'Drinks', emoji: '🥤', color: '#FF8126', bg: '#FFEFE6' }
];

export const CUISINES = [
  'All',
  'Indian',
  'Italian',
  'Mexican',
  'Japanese',
  'Thai',
  'Mediterranean',
  'American',
  'Korean'
];

export const MOODS = [
  { id: 'Comfort Food', label: 'Comfort Food', tag: 'SOUL-WARMING', icon: '🫕' },
  { id: 'Quick Bites', label: 'Quick Bites', tag: 'UNDER 20 MINS', icon: '⚡' },
  { id: 'Spicy', label: 'Spicy', tag: 'EXTRA KICK', icon: '🌶️' },
  { id: 'Sweet Tooth', label: 'Sweet Tooth', tag: 'PURE INDULGENCE', icon: '🍫' },
  { id: 'Healthy-ish', label: 'Healthy-ish', tag: 'GLOW & NOURISH', icon: '🥗' },
  { id: 'Weekend Treats', label: 'Weekend Treats', tag: 'CHEF LEVEL', icon: '✨' }
];

export const DIETARY_OPTIONS = [
  'Vegetarian',
  'Vegan',
  'Gluten-Free',
  'Dairy-Free',
  'High-Protein'
];
