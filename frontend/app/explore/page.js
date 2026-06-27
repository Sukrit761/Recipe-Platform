"use client";

import { useState, useEffect, useMemo, use } from "react";
import {
  Search, X, Heart, Clock, Users, Zap, Flame, Dumbbell, Wheat, Droplet,
  ChefHat, Printer, Sparkles, LayoutGrid, List, Leaf, RefreshCw,
} from "lucide-react";

/* ----------------------------- Dummy data ----------------------------- */

const RECIPES = [
  {
    id: 1,
    title: "Truffle Pasta with Caramelised Shallots",
    cuisine: "Italian",
    emoji: "🧄",
    description: "A luxurious, silky pasta with earthy truffle notes and sweet caramelised shallots.",
    cookTime: "25 min",
    servings: 2,
    difficulty: "Easy",
    calories: "620",
    protein: "18g",
    carbs: "72g",
    fat: "28g",
    diet: "Vegetarian",
    tags: ["Vegetarian", "Quick", "Italian"],
    ingredients: ["200g tagliatelle", "2 tbsp truffle oil", "3 shallots, thinly sliced", "50g parmesan, grated", "2 garlic cloves, minced", "Salt & black pepper", "Fresh parsley, chopped"],
    steps: [
      "Boil pasta in salted water until al dente.",
      "Slowly caramelise shallots in butter over low heat for 12 minutes.",
      "Add garlic and cook for 1 minute more.",
      "Toss the drained pasta with truffle oil, shallots and parmesan.",
      "Season generously and finish with fresh parsley.",
    ],
    tips: ["Use room-temperature parmesan for a creamier finish.", "A splash of the pasta water loosens the sauce perfectly."],
    color: "linear-gradient(135deg,#f6d9a8,#e8a85a,#cf7a3e)",
    rating: 4.8,
    cooked: "2.3k",
    fav: true,
  },
  {
    id: 2,
    title: "Miso Ramen with Soft-Boiled Egg",
    cuisine: "Japanese",
    emoji: "🍜",
    description: "A deeply umami broth with silky noodles and a perfectly jammy six-minute egg.",
    cookTime: "40 min",
    servings: 2,
    difficulty: "Medium",
    calories: "520",
    protein: "26g",
    carbs: "58g",
    fat: "18g",
    diet: "Pescatarian",
    tags: ["Comfort", "Umami", "Noodles"],
    ingredients: ["2 portions ramen noodles", "3 tbsp white miso paste", "4 cups chicken stock", "2 large eggs", "100g sweetcorn", "2 spring onions, sliced", "1 tsp sesame oil", "Nori sheets"],
    steps: [
      "Soft-boil eggs for exactly 6 minutes, cool in ice water, then peel.",
      "Whisk miso into warm stock over medium heat. Do not let it boil.",
      "Cook noodles per packet instructions, then drain.",
      "Divide noodles into bowls and pour the broth over.",
      "Top with halved eggs, sweetcorn, spring onions and a drizzle of sesame oil.",
    ],
    tips: ["Marinate peeled eggs in soy sauce for an hour for deeper flavour."],
    color: "linear-gradient(135deg,#f3dcb0,#e0a060,#b97a4a)",
    rating: 4.9,
    cooked: "5.1k",
    fav: false,
  },
  {
    id: 3,
    title: "Butter Chicken with Garlic Naan",
    cuisine: "Indian",
    emoji: "🍛",
    description: "Tender chicken in a velvety, spiced tomato-cream sauce served with pillowy naan.",
    cookTime: "55 min",
    servings: 4,
    difficulty: "Medium",
    calories: "680",
    protein: "38g",
    carbs: "45g",
    fat: "32g",
    diet: "Non-Veg",
    tags: ["Spicy", "Comfort", "Classic"],
    ingredients: ["600g chicken thighs", "400ml tomato passata", "200ml heavy cream", "3 tsp garam masala", "2 tsp ground cumin", "1 tbsp ginger-garlic paste", "4 tbsp butter", "Naan, to serve"],
    steps: [
      "Marinate chicken in yoghurt and spices for at least 30 minutes.",
      "Sear chicken in a hot pan until golden, then set aside.",
      "Make the sauce: fry onions, add ginger-garlic paste, tomato and spices, cook 15 minutes.",
      "Blend the sauce smooth, return to the pan with cream and butter.",
      "Add the chicken back in, simmer 20 minutes, and serve with warm naan.",
    ],
    tips: ["Blooming the spices in butter before adding tomato doubles the flavour depth."],
    color: "linear-gradient(135deg,#f7cfa0,#e98a48,#c1602c)",
    rating: 4.7,
    cooked: "8.6k",
    fav: true,
  },
  {
    id: 4,
    title: "Greek Quinoa Power Bowl",
    cuisine: "Mediterranean",
    emoji: "🥗",
    description: "A vibrant, protein-rich bowl with roasted chickpeas, feta and herby tzatziki.",
    cookTime: "35 min",
    servings: 2,
    difficulty: "Easy",
    calories: "420",
    protein: "22g",
    carbs: "38g",
    fat: "20g",
    diet: "Vegetarian",
    tags: ["Vegan-friendly", "Light", "Healthy"],
    ingredients: ["150g quinoa", "1 can chickpeas, drained", "100g cherry tomatoes", "½ cucumber, diced", "80g feta", "Kalamata olives", "3 tbsp tzatziki", "Lemon & olive oil"],
    steps: [
      "Rinse and cook quinoa per packet instructions.",
      "Roast chickpeas at 200°C with olive oil, cumin and paprika for 20 minutes.",
      "Dice the cucumber and halve the tomatoes.",
      "Assemble the bowl: quinoa base, vegetables, chickpeas.",
      "Top with feta, olives and a generous dollop of tzatziki.",
    ],
    tips: ["Toast the quinoa dry in the pan before adding water for a nuttier flavour."],
    color: "linear-gradient(135deg,#e7dba6,#c7b86a,#94824a)",
    rating: 4.6,
    cooked: "1.8k",
    fav: false,
  },
  {
    id: 5,
    title: "Korean BBQ Beef Bowls",
    cuisine: "Korean",
    emoji: "🥩",
    description: "Sticky, umami-glazed bulgogi beef on steamed rice with pickled cucumber and sesame.",
    cookTime: "35 min",
    servings: 2,
    difficulty: "Easy",
    calories: "580",
    protein: "34g",
    carbs: "55g",
    fat: "22g",
    diet: "Non-Veg",
    tags: ["BBQ", "Quick", "Bold"],
    ingredients: ["300g beef sirloin, thin sliced", "3 tbsp soy sauce", "1 tbsp sesame oil", "1 tbsp brown sugar", "2 garlic cloves, grated", "1 tsp grated ginger", "Steamed rice", "Pickled cucumber"],
    steps: [
      "Combine soy sauce, sesame oil, sugar, garlic and ginger. Marinate the beef for 15 minutes.",
      "Cook the beef in a very hot pan or grill, 2–3 minutes per side until caramelised.",
      "Serve over steamed rice with pickled cucumber and sesame seeds.",
    ],
    tips: ["Freeze the beef for 20 minutes before slicing for ultra-thin cuts."],
    color: "linear-gradient(135deg,#f5cdb0,#e2855a,#b85a3a)",
    rating: 4.8,
    cooked: "3.4k",
    fav: false,
  },
  {
    id: 6,
    title: "Creamy Mushroom Risotto",
    cuisine: "Italian",
    emoji: "🍄",
    description: "A deeply earthy, restaurant-style risotto with porcini and a cloud of parmesan.",
    cookTime: "35 min",
    servings: 2,
    difficulty: "Medium",
    calories: "540",
    protein: "16g",
    carbs: "68g",
    fat: "22g",
    diet: "Vegetarian",
    tags: ["Vegetarian", "Comfort", "Italian"],
    ingredients: ["300g arborio rice", "20g dried porcini", "2 shallots, diced", "150ml white wine", "1L warm vegetable stock", "80g parmesan, grated", "40g butter", "Fresh thyme"],
    steps: [
      "Soak porcini in hot water for 10 minutes. Reserve the soaking liquid.",
      "Sauté shallots in butter, add rice, and toast for 2 minutes.",
      "Add wine, stir until absorbed, then add stock one ladle at a time.",
      "Stir in the porcini, their liquid, parmesan and butter.",
      "Rest for 2 minutes, season, and serve immediately.",
    ],
    tips: ["Never stop stirring — constant agitation releases the starch for a creamy texture."],
    color: "linear-gradient(135deg,#e8d5b0,#a07830)",
    rating: 4.9,
    cooked: "4.2k",
    fav: true,
  },
  {
    id: 7,
    title: "Street-Style Tacos al Pastor",
    cuisine: "Mexican",
    emoji: "🌮",
    description: "Smoky, citrus-marinated pork with charred pineapple, piled onto warm corn tortillas.",
    cookTime: "45 min",
    servings: 3,
    difficulty: "Medium",
    calories: "490",
    protein: "29g",
    carbs: "34g",
    fat: "24g",
    diet: "Non-Veg",
    tags: ["Spicy", "Street Food", "Bold"],
    ingredients: ["500g pork shoulder, thin sliced", "3 dried guajillo chillies", "2 tbsp achiote paste", "Juice of 2 oranges", "½ pineapple, diced", "Corn tortillas", "White onion & coriander", "Lime wedges"],
    steps: [
      "Blend chillies, achiote and orange juice into a smooth marinade.",
      "Coat the pork and marinate for at least 2 hours, ideally overnight.",
      "Sear the pork over high heat until charred at the edges.",
      "Char the pineapple in the same pan for 2 minutes.",
      "Pile onto warm tortillas with onion, coriander and a squeeze of lime.",
    ],
    tips: ["A cast-iron pan gets you closer to trompo-style char than a non-stick one."],
    color: "linear-gradient(135deg,#f6c79a,#e8793f,#b8442a)",
    rating: 4.9,
    cooked: "6.7k",
    fav: false,
  },
  {
    id: 8,
    title: "Green Curry with Thai Basil",
    cuisine: "Thai",
    emoji: "🍲",
    description: "A fragrant, coconut-rich curry balancing heat, herbs and a touch of sweetness.",
    cookTime: "30 min",
    servings: 3,
    difficulty: "Easy",
    calories: "460",
    protein: "24g",
    carbs: "20g",
    fat: "32g",
    diet: "Non-Veg",
    tags: ["Spicy", "Quick", "Comfort"],
    ingredients: ["400ml coconut milk", "3 tbsp green curry paste", "400g chicken thigh, sliced", "1 aubergine, cubed", "100g green beans", "2 tbsp fish sauce", "1 tsp palm sugar", "Thai basil leaves"],
    steps: [
      "Fry the curry paste in a little coconut cream until fragrant.",
      "Add the chicken and cook until just sealed.",
      "Pour in the remaining coconut milk, then add aubergine and beans.",
      "Simmer for 12 minutes, then season with fish sauce and palm sugar.",
      "Finish with a generous handful of Thai basil.",
    ],
    tips: ["Frying the paste in cream (not water) is what makes the curry split beautifully and taste richer."],
    color: "linear-gradient(135deg,#e7dca0,#c8b35a,#8f8a3c)",
    rating: 4.7,
    cooked: "2.9k",
    fav: false,
  },
  {
    id: 9,
    title: "Classic French Onion Soup",
    cuisine: "French",
    emoji: "🥣",
    description: "Slow-caramelised onions in a rich beef broth, capped with bubbling gruyère.",
    cookTime: "1 hr 15 min",
    servings: 4,
    difficulty: "Medium",
    calories: "390",
    protein: "15g",
    carbs: "32g",
    fat: "18g",
    diet: "Vegetarian-option",
    tags: ["Comfort", "Classic", "Slow-cooked"],
    ingredients: ["6 large onions, sliced", "50g butter", "1L beef stock", "150ml dry white wine", "2 bay leaves", "Baguette slices", "150g gruyère, grated"],
    steps: [
      "Cook onions low and slow in butter for 40 minutes until deeply golden.",
      "Deglaze with white wine and let it reduce.",
      "Add stock and bay leaves, simmer for 20 minutes.",
      "Ladle into oven-safe bowls, top with baguette and gruyère.",
      "Broil until the cheese is bubbling and golden.",
    ],
    tips: ["Resist the urge to rush the onions — the colour is the flavour."],
    color: "linear-gradient(135deg,#f2ddc0,#dcb070,#b8854a)",
    rating: 4.8,
    cooked: "3.1k",
    fav: false,
  },
  {
    id: 10,
    title: "Moroccan Lamb Tagine",
    cuisine: "Moroccan",
    emoji: "🍖",
    description: "Fall-apart lamb braised with apricots, warming spice and toasted almonds.",
    cookTime: "2 hr",
    servings: 4,
    difficulty: "Hard",
    calories: "610",
    protein: "36g",
    carbs: "28g",
    fat: "30g",
    diet: "Non-Veg",
    tags: ["Slow-cooked", "Bold", "Comfort"],
    ingredients: ["800g lamb shoulder, cubed", "2 tsp ras el hanout", "1 tsp cinnamon", "100g dried apricots", "1 onion, sliced", "400ml lamb or chicken stock", "Toasted almonds", "Fresh coriander"],
    steps: [
      "Brown the lamb in batches, then set aside.",
      "Soften the onion, add spices and toast for a minute.",
      "Return the lamb, add stock and apricots, bring to a simmer.",
      "Cover and braise low for 1.5 hours until the lamb is fall-apart tender.",
      "Scatter with toasted almonds and coriander before serving.",
    ],
    tips: ["A real clay tagine helps, but a heavy lidded pot gets you 95% of the way there."],
    color: "linear-gradient(135deg,#f4c98e,#dd8c3e,#a8531f)",
    rating: 4.9,
    cooked: "1.4k",
    fav: true,
  },
  {
    id: 11,
    title: "Vietnamese Beef Pho",
    cuisine: "Vietnamese",
    emoji: "🍜",
    description: "A clear, deeply aromatic broth simmered for hours, finished with fresh herbs and lime.",
    cookTime: "3 hr",
    servings: 4,
    difficulty: "Hard",
    calories: "470",
    protein: "28g",
    carbs: "52g",
    fat: "12g",
    diet: "Non-Veg",
    tags: ["Slow-cooked", "Comfort", "Noodles"],
    ingredients: ["1.5kg beef bones", "300g beef brisket", "1 onion, charred", "1 thumb ginger, charred", "3 star anise", "1 cinnamon stick", "Rice noodles", "Beansprouts, herbs & lime"],
    steps: [
      "Char the onion and ginger directly over a flame until blackened in spots.",
      "Simmer bones, brisket, onion and ginger for at least 3 hours, skimming often.",
      "Toast star anise and cinnamon, then add to the broth for the final 30 minutes.",
      "Strain the broth and season to taste.",
      "Pour over soaked rice noodles and sliced beef, finish with herbs and lime.",
    ],
    tips: ["Charring the onion and ginger is what gives the broth its signature smoky depth."],
    color: "linear-gradient(135deg,#eed8a8,#cfa860,#9c7840)",
    rating: 4.9,
    cooked: "2.6k",
    fav: false,
  },
  {
    id: 12,
    title: "Kung Pao Chicken",
    cuisine: "Chinese",
    emoji: "🥡",
    description: "Wok-charred chicken in a sweet, salty, numbingly spicy sauce with roasted peanuts.",
    cookTime: "25 min",
    servings: 3,
    difficulty: "Medium",
    calories: "510",
    protein: "32g",
    carbs: "26g",
    fat: "26g",
    diet: "Non-Veg",
    tags: ["Spicy", "Quick", "Bold"],
    ingredients: ["450g chicken thigh, diced", "8 dried chillies", "1 tsp Sichuan peppercorns", "2 tbsp soy sauce", "1 tbsp black vinegar", "1 tsp sugar", "60g roasted peanuts", "2 spring onions, chopped"],
    steps: [
      "Marinate the chicken in soy sauce and a little cornstarch for 10 minutes.",
      "Toast dried chillies and Sichuan peppercorns in a dry wok until fragrant.",
      "Stir-fry the chicken over high heat until charred at the edges.",
      "Add the sauce ingredients and toss to coat.",
      "Finish with peanuts and spring onions, served immediately over the high heat.",
    ],
    tips: ["Toasting the chillies dry first — before any oil hits the wok — is the difference-maker."],
    color: "linear-gradient(135deg,#f6c79e,#e2723a,#b8441f)",
    rating: 4.7,
    cooked: "3.9k",
    fav: false,
  },
];

const HERO_BADGES = ["🧄 Garlic detected", "🫚 Ginger detected", "🌶️ Chilli detected", "🍅 Tomato detected"];

/* ------------------------------ Component ------------------------------ */

export default function ExploreRecipesPage() {
  const [recipes, setRecipes] = useState(RECIPES);
  const [search, setSearch] = useState("");
  const [activeFilter, setActiveFilter] = useState("All");
  const [sort, setSort] = useState("rating");
  const [viewMode, setViewMode] = useState("grid");
  const [selected, setSelected] = useState(null);
  const [heroIndex, setHeroIndex] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setHeroIndex((i) => (i + 1) % 3), 4000);
    return () => clearInterval(t);
  }, []);

  const cuisines = useMemo(() => {
    const set = new Set(recipes.map((r) => r.cuisine));
    return ["All", ...Array.from(set).sort()];
  }, [recipes]);

  const toggleFav = (id, e) => {
    e?.stopPropagation();
    setRecipes((prev) => prev.map((r) => (r.id === id ? { ...r, fav: !r.fav } : r)));
    setSelected((prev) => (prev && prev.id === id ? { ...prev, fav: !prev.fav } : prev));
  };

  const filtered = useMemo(() => {
    let list = recipes.filter((r) => {
      const q = search.toLowerCase().trim();
      const matchesSearch =
        !q ||
        r.title.toLowerCase().includes(q) ||
        r.cuisine.toLowerCase().includes(q) ||
        r.tags.some((t) => t.toLowerCase().includes(q));
      const matchesCuisine = activeFilter === "All" || r.cuisine === activeFilter;
      return matchesSearch && matchesCuisine;
    });

    switch (sort) {
      case "az":
        list = [...list].sort((a, b) => a.title.localeCompare(b.title));
        break;
      case "rating":
        list = [...list].sort((a, b) => b.rating - a.rating);
        break;
      case "quick":
        list = [...list].sort((a, b) => parseInt(a.cookTime) - parseInt(b.cookTime));
        break;
      case "fav":
        list = [...list].sort((a, b) => (b.fav ? 1 : 0) - (a.fav ? 1 : 0));
        break;
      default:
        break;
    }
    return list;
  }, [recipes, search, activeFilter, sort]);

  const favCount = recipes.filter((r) => r.fav).length;
  const cuisineCount = new Set(recipes.map((r) => r.cuisine)).size;
  const heroRecipe = recipes[heroIndex];

  const clearFilters = () => {
    setSearch("");
    setActiveFilter("All");
  };

  return (
    <div className="cb-root">
      <style>{styles}</style>

      {/* ---------------- Hero ---------------- */}
      <div className="cb-hero">
        <div className="cb-hero-inner">
          <div className="cb-hero-left">
            <div className="cb-eyebrow">
              <Sparkles size={12} strokeWidth={2.5} />
              AI-Powered Recipe Generation
            </div>
            <h1 className="cb-title">
              Explore recipes from
              <br />
              <em>every</em> corner of the world.
            </h1>
            <p className="cb-sub">
              Twelve cuisines, one collection — browse AI-crafted recipes with full nutrition,
              step-by-step method and a chef's tip on every card.
            </p>
            {/* <div className="cb-hero-stats">
              <div className="cb-stat">
                <span className="cb-stat-num">{recipes.length}</span>
                <span className="cb-stat-label">Recipes</span>
              </div>
              <div className="cb-stat">
                <span className="cb-stat-num">{cuisineCount}</span>
                <span className="cb-stat-label">Cuisines</span>
              </div>
              <div className="cb-stat">
                <span className="cb-stat-num">{favCount}</span>
                <span className="cb-stat-label">Favourites</span>
              </div>
            </div> */}
          </div>

          <div className="cb-hero-right">
            <div className="hero-preview-wrap">
              <div className="hero-preview-badge" key={heroIndex}>
                {HERO_BADGES[heroIndex % HERO_BADGES.length]}
              </div>
              <div className="rc-card hero-card" onClick={() => setSelected(heroRecipe)}>
                <div className="rc-thumb" style={{ background: heroRecipe.color }}>
                  <div className="rc-ai-tag">AI Generated</div>
                  <span className="rc-thumb-emoji">{heroRecipe.emoji}</span>
                </div>
                <div className="rc-body">
                  <div className="rc-cuisine">{heroRecipe.cuisine}</div>
                  <div className="rc-title">{heroRecipe.title}</div>
                  <div className="rc-meta">
                    <span className="rc-meta-item"><Clock size={13} /> {heroRecipe.cookTime}</span>
                    <span className="rc-meta-item"><Users size={13} /> {heroRecipe.servings} servings</span>
                    <span className="rc-meta-item"><Zap size={13} /> {heroRecipe.difficulty}</span>
                  </div>
                  <div className="rc-tags">
                    {heroRecipe.tags.slice(0, 3).map((t) => (
                      <span key={t} className="rc-chip">{t}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ---------------- Toolbar ---------------- */}
      <div className="cb-toolbar">
        {/* <div className="cb-search-wrap">
          <Search size={16} className="cb-search-icon" />
          <input
            className="cb-search"
            placeholder="Search recipes, cuisines, tags…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          {search && (
            <X size={15} className="cb-search-clear" onClick={() => setSearch("")} />
          )}
        </div> */}
        {/* <select className="cb-sort-select" value={sort} onChange={(e) => setSort(e.target.value)}>
          <option value="rating">Top rated</option>
          <option value="quick">Quickest first</option>
          <option value="az">A → Z</option>
          <option value="fav">Favourites first</option>
        </select> */}
        {/* <div className="cb-view-toggle">
          <button className={`cb-view-btn${viewMode === "grid" ? " active" : ""}`} onClick={() => setViewMode("grid")} title="Grid view">
            <LayoutGrid size={15} />
          </button>
          <button className={`cb-view-btn${viewMode === "list" ? " active" : ""}`} onClick={() => setViewMode("list")} title="List view">
            <List size={15} />
          </button>
        </div> */}
      </div>

      {/* ---------------- Filter strip ---------------- */}
      <div className="cb-filter-strip">
        {cuisines.map((c) => (
          <button
            key={c}
            className={`filter-chip${activeFilter === c ? " on" : ""}`}
            onClick={() => setActiveFilter(c)}
          >
            {c}
          </button>
        ))}
      </div>

      {/* ---------------- Content ---------------- */}
      <div className="cb-content">
        {filtered.length > 0 && (
          <div className="cb-section-label">
            {filtered.length} recipe{filtered.length !== 1 ? "s" : ""}
            {activeFilter !== "All" ? ` · ${activeFilter}` : ""}
            {search ? ` · "${search}"` : ""}
          </div>
        )}

        <div className={`cb-grid${viewMode === "list" ? " list-view" : ""}`}>
          {filtered.length === 0 ? (
            <div className="cb-empty">
              <div className="cb-empty-icon">🔍</div>
              <h3>No recipes found</h3>
              <p>Nothing matches your search or filter. Try clearing them and browsing again.</p>
              <button className="btn-generate-link" onClick={clearFilters}>
                <RefreshCw size={14} /> Clear filters
              </button>
            </div>
          ) : (
            filtered.map((r, idx) => (
              <div
                key={r.id}
                className={`rc-card${viewMode === "list" ? " list-view" : ""}`}
                style={{ animationDelay: `${idx * 0.05}s` }}
                onClick={() => setSelected(r)}
              >
                <div className="rc-thumb" style={{ background: r.color }}>
                  <div className="rc-ai-tag">AI Generated</div>
                  <span className="rc-thumb-emoji">{r.emoji}</span>
                  <button
                    className={`rc-fav-btn${r.fav ? " fav" : ""}`}
                    onClick={(e) => toggleFav(r.id, e)}
                    title={r.fav ? "Remove from favourites" : "Add to favourites"}
                  >
                    <Heart size={14} fill={r.fav ? "currentColor" : "none"} />
                  </button>
                </div>
                <div className="rc-body">
                  <div className="rc-cuisine">{r.cuisine}</div>
                  <div className="rc-title">{r.title}</div>
                  <div className="rc-meta">
                    <span className="rc-meta-item"><Clock size={13} /> {r.cookTime}</span>
                    <span className="rc-meta-item"><Users size={13} /> {r.servings}</span>
                    <span className="rc-meta-item"><Zap size={13} /> {r.difficulty}</span>
                    <span className="rc-meta-item"><Flame size={13} /> {r.ingredients.length} ingr.</span>
                  </div>
                  <div className="rc-tags">
                    {r.tags.slice(0, 3).map((t) => (
                      <span key={t} className="rc-chip">{t}</span>
                    ))}
                  </div>
                  <div className="rc-footer">
                    <span className="rc-date">⭐ {r.rating} · {r.cooked} cooked</span>
                    <button className="rc-view-btn" onClick={(e) => { e.stopPropagation(); setSelected(r); }}>
                      View →
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* ---------------- Detail modal ---------------- */}
      {selected && (
        <div className="modal-overlay" onClick={() => setSelected(null)}>
          <div className="modal-box" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setSelected(null)}><X size={18} /></button>

            <div className="modal-thumb" style={{ background: selected.color }}>
              <span style={{ position: "relative", zIndex: 1, fontSize: "5.5rem" }}>
                {selected.emoji}
              </span>
            </div>

            <div className="modal-body">
              <div className="modal-cuisine">{selected.cuisine}</div>
              <div className="modal-title">{selected.title}</div>

              <div className="modal-meta">
                <span className="modal-pill"><Clock size={13} /> {selected.cookTime}</span>
                <span className="modal-pill"><Users size={13} /> {selected.servings} servings</span>
                <span className="modal-pill"><Leaf size={13} /> {selected.diet}</span>
                <span className="modal-pill"><Zap size={13} /> {selected.difficulty}</span>
              </div>

              <div className="modal-desc">{selected.description}</div>

              <div className="modal-nutr">
                {[
                  [Flame, selected.calories, "Calories"],
                  [Dumbbell, selected.protein, "Protein"],
                  [Wheat, selected.carbs, "Carbs"],
                  [Droplet, selected.fat, "Fat"],
                ].map(([Icon, v, l]) => (
                  <div key={l} className="modal-nutr-item">
                    <Icon size={16} strokeWidth={1.8} />
                    <span className="modal-nutr-val">{v}</span>
                    <span className="modal-nutr-label">{l}</span>
                  </div>
                ))}
              </div>

              <div className="modal-section-title">Ingredients</div>
              <div className="modal-ingr-grid">
                {selected.ingredients.map((ing, i) => (
                  <div key={i} className="modal-ingr-item">
                    <div className="modal-ingr-dot" />{ing}
                  </div>
                ))}
              </div>

              <div className="modal-section-title">Instructions</div>
              <div className="modal-steps">
                {selected.steps.map((step, i) => (
                  <div key={i} className="modal-step">
                    <div className="modal-step-num">{i + 1}</div>
                    <div className="modal-step-text">{step}</div>
                  </div>
                ))}
              </div>

              {selected.tips?.length > 0 && (
                <div className="modal-tip">
                  <strong><ChefHat size={15} /> Chef's tips</strong>
                  <ul>
                    {selected.tips.map((tip, i) => (
                      <li key={i}>{tip}</li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="modal-actions">
                <button className="btn-modal-action" onClick={() => toggleFav(selected.id)}>
                  <Heart size={15} fill={selected.fav ? "currentColor" : "none"} />
                  {selected.fav ? "Saved to cookbook" : "Save to cookbook"}
                </button>
                <button className="btn-modal-action" onClick={() => window.print()}>
                  <Printer size={15} /> Print
                </button>
                <button className="btn-modal-action accent">
                  <RefreshCw size={15} /> Find similar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* -------------------------------- Styles -------------------------------- */

const styles = `
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,500;0,600;0,700;1,500;1,600&family=Inter:wght@400;500;600;700&display=swap');

.cb-root {
  --cream: #FBF2E8;
  --cream-deep: #F3E6D4;
  --card: #FFFFFF;
  --ink: #241E19;
  --ink-soft: #58493C;
  --muted: #968878;
  --line: #ECDFCB;
  --terracotta: #C2703D;
  --terracotta-deep: #9C5429;
  --pill-bg: #FBE6D1;
  --pill-text: #AD632F;
  --shadow: rgba(60, 40, 16, 0.10);
  --shadow-soft: rgba(60, 40, 16, 0.06);

  background: var(--cream);
  color: var(--ink);
  font-family: 'Inter', sans-serif;
  min-height: 100vh;
  padding-bottom: 4rem;
}

.cb-root em { font-style: italic; color: var(--terracotta); }

/* ---------- Hero ---------- */
.cb-hero { padding: 3.5rem 2.5rem 2.5rem; }
.cb-hero-inner {
  max-width: 1280px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1.05fr 0.95fr;
  gap: 2rem;
  align-items: center;
}
.cb-hero-left { max-width: 540px; }
.cb-eyebrow {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  background: #fff;
  border: 1px solid var(--line);
  color: var(--terracotta-deep);
  font-size: 0.78rem;
  font-weight: 600;
  padding: 0.45rem 0.9rem;
  border-radius: 99px;
  margin-bottom: 1.5rem;
}
.cb-title {
  font-family: 'Playfair Display', serif;
  font-weight: 600;
  font-size: 3.1rem;
  line-height: 1.12;
  letter-spacing: -0.01em;
  margin: 0 0 1.1rem;
  color: var(--ink);
}
.cb-sub {
  font-size: 1.02rem;
  line-height: 1.6;
  color: var(--ink-soft);
  margin: 0 0 2rem;
  max-width: 460px;
}
.cb-hero-stats { display: flex; gap: 2.2rem; }
.cb-stat { display: flex; flex-direction: column; }
.cb-stat-num { font-family: 'Playfair Display', serif; font-size: 1.7rem; font-weight: 600; color: var(--ink); }
.cb-stat-label { font-size: 0.78rem; color: var(--muted); margin-top: 0.15rem; }

.cb-hero-right { display: flex; justify-content: center; }
.hero-preview-wrap { position: relative; width: 100%; max-width: 350px; }
.hero-preview-badge {
  position: absolute;
  top: -16px;
  right: 6px;
  z-index: 5;
  background: #fff;
  border-radius: 99px;
  padding: 0.5rem 1rem;
  font-size: 0.8rem;
  font-weight: 600;
  color: var(--ink-soft);
  box-shadow: 0 8px 22px var(--shadow);
  animation: badgeIn 0.5s ease;
}
.hero-card { animation: floatY 5s ease-in-out infinite; cursor: pointer; }
@keyframes floatY { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-8px); } }
@keyframes badgeIn { from { opacity: 0; transform: translateY(-6px) scale(0.96); } to { opacity: 1; transform: translateY(0) scale(1); } }

/* ---------- Toolbar ---------- */
.cb-toolbar {
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 2.5rem;
  display: flex;
  gap: 0.8rem;
  align-items: center;
  margin-bottom: 1.2rem;
}
.cb-search-wrap {
  flex: 1;
  position: relative;
  display: flex;
  align-items: center;
  background: #fff;
  border: 1px solid var(--line);
  border-radius: 12px;
  padding: 0 0.9rem;
  height: 46px;
}
.cb-search-icon { color: var(--muted); flex-shrink: 0; }
.cb-search {
  flex: 1;
  border: none;
  outline: none;
  background: transparent;
  padding: 0 0.7rem;
  font-size: 0.92rem;
  font-family: inherit;
  color: var(--ink);
}
.cb-search::placeholder { color: var(--muted); }
.cb-search-clear { color: var(--muted); cursor: pointer; flex-shrink: 0; }
.cb-sort-select {
  height: 46px;
  border: 1px solid var(--line);
  border-radius: 12px;
  background: #fff;
  padding: 0 0.9rem;
  font-size: 0.88rem;
  font-family: inherit;
  color: var(--ink-soft);
  cursor: pointer;
}
.cb-view-toggle { display: flex; gap: 0.3rem; background: #fff; border: 1px solid var(--line); border-radius: 12px; padding: 0.3rem; }
.cb-view-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 38px;
  height: 38px;
  border: none;
  background: transparent;
  border-radius: 9px;
  color: var(--muted);
  cursor: pointer;
  transition: 0.15s;
}
.cb-view-btn.active { background: var(--cream-deep); color: var(--terracotta-deep); }

/* ---------- Filter strip ---------- */
.cb-filter-strip {
  max-width: 1280px;
  margin: 0 auto 1.8rem;
  padding: 0 2.5rem;
  display: flex;
  gap: 0.6rem;
  overflow-x: auto;
  scrollbar-width: none;
}
.cb-filter-strip::-webkit-scrollbar { display: none; }
.filter-chip {
  flex-shrink: 0;
  border: 1px solid var(--line);
  background: #fff;
  color: var(--ink-soft);
  font-size: 0.84rem;
  font-weight: 500;
  padding: 0.5rem 1.05rem;
  border-radius: 99px;
  cursor: pointer;
  transition: 0.15s;
}
.filter-chip:hover { border-color: var(--terracotta); color: var(--terracotta-deep); }
.filter-chip.on { background: var(--ink); color: #fff; border-color: var(--ink); }

/* ---------- Content / Grid ---------- */
.cb-content { max-width: 1280px; margin: 0 auto; padding: 0 2.5rem; }
.cb-section-label { font-size: 0.85rem; color: var(--muted); margin-bottom: 1.1rem; }

.cb-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1.4rem;
}
.cb-grid.list-view { grid-template-columns: 1fr; gap: 1rem; }

.rc-card {
  background: var(--card);
  border: 1px solid var(--line);
  border-radius: 18px;
  overflow: hidden;
  cursor: pointer;
  box-shadow: 0 4px 14px var(--shadow-soft);
  transition: transform 0.18s ease, box-shadow 0.18s ease;
  animation: cardIn 0.45s ease both;
}
.rc-card:hover { transform: translateY(-4px); box-shadow: 0 14px 28px var(--shadow); }
@keyframes cardIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }

.rc-card.list-view { display: flex; }
.rc-card.list-view .rc-thumb { width: 200px; flex-shrink: 0; height: auto; }
.rc-card.list-view .rc-body { flex: 1; }

.rc-thumb { position: relative; height: 168px; display: flex; align-items: center; justify-content: center; }
.rc-ai-tag {
  position: absolute;
  top: 0.7rem;
  left: 0.7rem;
  background: rgba(255,255,255,0.92);
  color: var(--ink-soft);
  font-size: 0.66rem;
  font-weight: 600;
  letter-spacing: 0.02em;
  padding: 0.3rem 0.65rem;
  border-radius: 99px;
}
.rc-thumb-emoji { font-size: 3.4rem; filter: drop-shadow(0 6px 10px rgba(0,0,0,0.15)); }
.rc-fav-btn {
  position: absolute;
  top: 0.7rem;
  right: 0.7rem;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  border: none;
  background: rgba(255,255,255,0.92);
  color: var(--ink-soft);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}
.rc-fav-btn.fav { color: #C23D3D; }

.rc-body { padding: 1.1rem 1.2rem 1.2rem; }
.rc-cuisine { font-size: 0.72rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.04em; color: var(--terracotta); margin-bottom: 0.35rem; }
.rc-title { font-family: 'Playfair Display', serif; font-size: 1.18rem; font-weight: 600; line-height: 1.3; margin-bottom: 0.7rem; color: var(--ink); }
.rc-meta { display: flex; flex-wrap: wrap; gap: 0.8rem; margin-bottom: 0.8rem; }
.rc-meta-item { display: flex; align-items: center; gap: 0.3rem; font-size: 0.78rem; color: var(--ink-soft); }
.rc-tags { display: flex; flex-wrap: wrap; gap: 0.4rem; margin-bottom: 0.9rem; }
.rc-chip { background: var(--pill-bg); color: var(--pill-text); font-size: 0.72rem; font-weight: 600; padding: 0.28rem 0.65rem; border-radius: 99px; }
.rc-footer { display: flex; align-items: center; justify-content: space-between; border-top: 1px solid var(--line); padding-top: 0.8rem; }
.rc-date { font-size: 0.76rem; color: var(--muted); }
.rc-view-btn { border: none; background: transparent; color: var(--terracotta-deep); font-size: 0.82rem; font-weight: 600; cursor: pointer; }
.rc-view-btn:hover { text-decoration: underline; }

/* ---------- Empty state ---------- */
.cb-empty { grid-column: 1 / -1; text-align: center; padding: 4rem 1rem; }
.cb-empty-icon { font-size: 2.6rem; margin-bottom: 1rem; }
.cb-empty h3 { font-family: 'Playfair Display', serif; font-size: 1.4rem; margin: 0 0 0.5rem; }
.cb-empty p { color: var(--muted); font-size: 0.92rem; margin: 0 0 1.4rem; }
.btn-generate-link {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background: var(--ink);
  color: #fff;
  border: none;
  padding: 0.7rem 1.4rem;
  border-radius: 99px;
  font-size: 0.86rem;
  font-weight: 600;
  cursor: pointer;
}

/* ---------- Modal ---------- */
.modal-overlay {
  position: fixed; inset: 0;
  background: rgba(36, 30, 25, 0.55);
  display: flex; align-items: center; justify-content: center;
  padding: 1.5rem;
  z-index: 100;
  animation: fadeIn 0.2s ease;
}
@keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
.modal-box {
  background: var(--cream);
  width: 100%;
  max-width: 640px;
  max-height: 88vh;
  overflow-y: auto;
  border-radius: 20px;
  position: relative;
  box-shadow: 0 30px 60px rgba(0,0,0,0.25);
}
.modal-close {
  position: absolute; top: 1rem; right: 1rem;
  width: 36px; height: 36px;
  border-radius: 50%;
  border: none;
  background: rgba(255,255,255,0.92);
  color: var(--ink-soft);
  display: flex; align-items: center; justify-content: center;
  cursor: pointer;
  z-index: 5;
}
.modal-thumb { height: 220px; display: flex; align-items: center; justify-content: center; border-radius: 20px 20px 0 0; }
.modal-body { padding: 1.6rem 2rem 2.2rem; }
.modal-cuisine { font-size: 0.74rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.04em; color: var(--terracotta); margin-bottom: 0.4rem; }
.modal-title { font-family: 'Playfair Display', serif; font-size: 1.6rem; font-weight: 600; line-height: 1.25; margin-bottom: 0.9rem; }
.modal-meta { display: flex; flex-wrap: wrap; gap: 0.5rem; margin-bottom: 1.1rem; }
.modal-pill { display: flex; align-items: center; gap: 0.35rem; background: var(--pill-bg); color: var(--pill-text); font-size: 0.78rem; font-weight: 600; padding: 0.4rem 0.8rem; border-radius: 99px; }
.modal-desc { font-size: 0.95rem; line-height: 1.6; color: var(--ink-soft); margin-bottom: 1.4rem; }

.modal-nutr { display: grid; grid-template-columns: repeat(4, 1fr); gap: 0.7rem; margin-bottom: 1.8rem; }
.modal-nutr-item {
  display: flex; flex-direction: column; align-items: center; gap: 0.25rem;
  background: #fff; border: 1px solid var(--line); border-radius: 14px; padding: 0.9rem 0.4rem;
  color: var(--terracotta-deep);
}
.modal-nutr-val { font-family: 'Playfair Display', serif; font-size: 1.05rem; font-weight: 600; color: var(--ink); }
.modal-nutr-label { font-size: 0.7rem; color: var(--muted); }

.modal-section-title { font-family: 'Playfair Display', serif; font-size: 1.1rem; font-weight: 600; margin: 1.6rem 0 0.9rem; }
.modal-ingr-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 0.6rem 1rem; }
.modal-ingr-item { display: flex; align-items: center; gap: 0.55rem; font-size: 0.88rem; color: var(--ink-soft); }
.modal-ingr-dot { width: 6px; height: 6px; border-radius: 50%; background: var(--terracotta); flex-shrink: 0; }

.modal-steps { display: flex; flex-direction: column; gap: 0.9rem; }
.modal-step { display: flex; gap: 0.8rem; }
.modal-step-num {
  width: 26px; height: 26px; border-radius: 50%; background: var(--ink); color: #fff;
  font-size: 0.78rem; font-weight: 700; flex-shrink: 0; display: flex; align-items: center; justify-content: center;
}
.modal-step-text { font-size: 0.9rem; line-height: 1.55; color: var(--ink-soft); padding-top: 0.1rem; }

.modal-tip {
  margin-top: 1.6rem;
  background: var(--pill-bg);
  border-radius: 14px;
  padding: 1rem 1.2rem;
  font-size: 0.86rem;
  color: var(--terracotta-deep);
}
.modal-tip strong { display: flex; align-items: center; gap: 0.4rem; margin-bottom: 0.4rem; }
.modal-tip ul { margin: 0; padding-left: 1.1rem; }
.modal-tip li { margin-bottom: 0.2rem; }

.modal-actions { display: flex; gap: 0.7rem; margin-top: 1.8rem; flex-wrap: wrap; }
.btn-modal-action {
  display: flex; align-items: center; gap: 0.45rem;
  border: 1px solid var(--line);
  background: #fff;
  color: var(--ink-soft);
  font-size: 0.84rem;
  font-weight: 600;
  padding: 0.65rem 1.1rem;
  border-radius: 12px;
  cursor: pointer;
}
.btn-modal-action.accent { background: var(--ink); color: #fff; border-color: var(--ink); }
.btn-modal-action:hover { border-color: var(--terracotta); }

/* ---------- Responsive ---------- */
@media (max-width: 880px) {
  .cb-hero-inner { grid-template-columns: 1fr; }
  .cb-hero-right { order: -1; }
  .cb-title { font-size: 2.3rem; }
  .cb-toolbar { flex-wrap: wrap; }
  .modal-ingr-grid { grid-template-columns: 1fr; }
  .modal-nutr { grid-template-columns: repeat(2, 1fr); }
}
@media (max-width: 560px) {
  .cb-hero, .cb-toolbar, .cb-filter-strip, .cb-content { padding-left: 1.2rem; padding-right: 1.2rem; }
  .rc-card.list-view { flex-direction: column; }
  .rc-card.list-view .rc-thumb { width: 100%; height: 150px; }
}
`;