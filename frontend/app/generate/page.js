"use client";
import { useState, useRef} from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";
const theme = {
  cream: "#F5EFE6",
  creamDark: "#EDE3D5",
  brown: "#3B2A1A",
  brownLight: "#6B4C2A",
  gold: "#C8862A",
  goldLight: "#E6A94D",
  white: "#FFFFFF",
  offWhite: "#FAF7F2",
  border: "#E0D5C5",
  tag: "#F0E8D8",
  shadow: "rgba(59,42,26,0.10)",
};


const style = {
  "@import": "https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=DM+Sans:wght@300;400;500&display=swap",
};

const globalCSS = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=DM+Sans:wght@300;400;500&display=swap');
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  body { background: #F5EFE6; font-family: 'DM Sans', sans-serif; color: #3B2A1A; }

  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(18px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes pulse {
    0%, 100% { opacity: 1; } 50% { opacity: 0.5; }
  }
  @keyframes spin {
    to { transform: rotate(360deg); }
  }
  @keyframes shimmer {
    0%   { background-position: -400px 0; }
    100% { background-position: 400px 0; }
  }
  @keyframes tagPop {
    0%   { transform: scale(0.8); opacity: 0; }
    70%  { transform: scale(1.08); }
    100% { transform: scale(1); opacity: 1; }
  }
  @keyframes slideIn {
    from { opacity: 0; transform: translateX(-12px); }
    to   { opacity: 1; transform: translateX(0); }
  }
`;



/* ── Navbar ── */
function Navbar() {
  return (
    <nav>
     
      
    </nav>
  );
}

/* ── Ingredient Tag ── */
function IngredientTag({ label, onRemove, index }) {
  return (
    <span style={{
      display: "inline-flex", alignItems: "center", gap: 6,
      background: "#F0E8D8", border: "1px solid #DDD0BA",
      borderRadius: 20, padding: "5px 12px 5px 14px",
      fontSize: 13, color: "#3B2A1A", fontWeight: 500,
      animation: `tagPop 0.25s ease ${index * 0.04}s both`,
    }}>
      {label}
      <span onClick={() => onRemove(label)} style={{
        cursor: "pointer", color: "#9A7A5A", fontSize: 16, lineHeight: 1,
        display: "flex", alignItems: "center",
      }}>×</span>
    </span>
  );
}

/* ── Skeleton loader ── */
function Skeleton({ width = "100%", height = 18, radius = 6 }) {
  return (
    <div style={{
      width, height, borderRadius: radius,
      background: "linear-gradient(90deg, #EDE3D5 25%, #F5EFE6 50%, #EDE3D5 75%)",
      backgroundSize: "400px 100%",
      animation: "shimmer 1.4s infinite linear",
    }} />
  );
}

/* ── Recipe Card ── */
function RecipeCard({ recipe }) {
  const { user } = useUser();
  const [activeStep, setActiveStep] = useState(null);
  if (!recipe) return null;
  
const handleSaveRecipe = async () => {
  try {
   const res = await fetch(
  `${process.env.NEXT_PUBLIC_API_URL}/api/cookbook/save`,
  {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...recipe,
        clerkUserId: user.id,
      }),
    });

    const data = await res.json();

    console.log("Status:", res.status);
    console.log("Response:", data);

    if (!res.ok) {
      throw new Error(data.message || "Failed to save recipe");
    }

    alert("Recipe saved successfully!");
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};

  return (
    
    <div style={{
      background: "#FFFFFF", borderRadius: 20, overflow: "hidden",
      boxShadow: "0 8px 48px rgba(59,42,26,0.13)",
      animation: "fadeUp 0.5s ease both",
    }}>
      {/* Header */}
      <div style={{
        background: "linear-gradient(135deg, #C8862A 0%, #E6A94D 100%)",
        padding: "32px 36px 28px",
        position: "relative", overflow: "hidden",
      }}>
        <div style={{
          position: "absolute", top: -30, right: -30,
          width: 160, height: 160, borderRadius: "50%",
          background: "rgba(255,255,255,0.1)",
        }} />
        <div style={{ fontSize: 11, letterSpacing: 2, textTransform: "uppercase", color: "rgba(255,255,255,0.75)", marginBottom: 8 }}>
          ✦ AI Generated Recipe
        </div>
        <h2 style={{
          fontFamily: "'Playfair Display', serif", fontSize: 28, fontWeight: 700,
          color: "#FFFFFF", lineHeight: 1.2, marginBottom: 16,
        }}>{recipe.title}</h2>
        <p style={{ color: "rgba(255,255,255,0.88)", fontSize: 14, lineHeight: 1.6, maxWidth: 480 }}>
          {recipe.description}
        </p>
        <div style={{ display: "flex", gap: 20, marginTop: 20 }}>
          {[
  { icon: "⏱", label: recipe.cookingTime },
  { icon: "👤", label: recipe.diet },
  { icon: "⚡", label: recipe.difficulty },
].map((m, i) => (
  <div
    key={i}
    style={{
      display: "flex",
      alignItems: "center",
      gap: 6,
      color: "rgba(255,255,255,0.9)",
      fontSize: 13,
    }}
  >
    <span>{m.icon}</span>
    <span>{m.label}</span>
  </div>
))}
        </div>
        <div style={{ display: "flex", gap: 8, marginTop: 14, flexWrap: "wrap" }}>
          {recipe.tags?.map(t => (
            <span key={t} style={{
              background: "rgba(255,255,255,0.2)", color: "#fff", borderRadius: 20,
              padding: "4px 12px", fontSize: 12,
            }}>{t}</span>
          ))}
        </div>
        
      </div>

     <div>
  <div
    style={{
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: 0,
    }}
  >
    {/* Ingredients */}
    <div style={{ padding: "28px 32px", borderRight: "1px solid #F0E8D8" }}>
      <h3
        style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: 18,
          marginBottom: 16,
          color: "#3B2A1A",
        }}
      >
        Ingredients
      </h3>

      <ul style={{ listStyle: "none" }}>
        {recipe.ingredients?.map((ing, i) => (
          <li
            key={i}
            style={{
              display: "flex",
              gap: 10,
              alignItems: "flex-start",
              padding: "7px 0",
              borderBottom: "1px solid #F5EFE6",
              fontSize: 14,
              color: "#4A3520",
              animation: `slideIn 0.3s ease ${i * 0.05}s both`,
            }}
          >
            <span style={{ color: "#C8862A", marginTop: 2 }}>◆</span>
            <span>{ing}</span>
          </li>
        ))}
      </ul>
    </div>

    {/* Steps */}
    <div style={{ padding: "28px 32px" }}>
      <h3
        style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: 18,
          marginBottom: 16,
          color: "#3B2A1A",
        }}
      >
        Instructions
      </h3>

      <ol style={{ listStyle: "none" }}>
        {recipe.steps?.map((step, i) => (
          <li
            key={i}
            onClick={() => setActiveStep(activeStep === i ? null : i)}
            style={{
              padding: "10px 12px",
              borderRadius: 10,
              marginBottom: 6,
              background: activeStep === i ? "#FDF6EC" : "transparent",
              border:
                activeStep === i
                  ? "1px solid #E6A94D"
                  : "1px solid transparent",
              cursor: "pointer",
              transition: "all 0.2s",
              animation: `slideIn 0.3s ease ${i * 0.06}s both`,
            }}
          >
            <div
              style={{
                display: "flex",
                gap: 10,
                alignItems: "flex-start",
              }}
            >
              <span
                style={{
                  minWidth: 24,
                  height: 24,
                  borderRadius: "50%",
                  background: activeStep === i ? "#C8862A" : "#F0E8D8",
                  color: activeStep === i ? "#fff" : "#9A7A5A",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 11,
                  fontWeight: 700,
                  flexShrink: 0,
                }}
              >
                {i + 1}
              </span>

              <span
                style={{
                  fontSize: 13,
                  color: "#4A3520",
                  lineHeight: 1.55,
                }}
              >
                {step}
              </span>
            </div>
          </li>
        ))}
      </ol>
    </div>
  </div>

  {/* Save Button */}
  <div
    style={{
      padding: "24px",
      borderTop: "1px solid #F0E8D8",
      display: "flex",
      justifyContent: "center",
      background: "#FFFDF9",
    }}
  >
    <button
      onClick={handleSaveRecipe} // Replace with your save function
      style={{
        padding: "12px 36px",
        background: "linear-gradient(135deg, #C8862A, #A96C1F)",
        color: "#fff",
        border: "none",
        borderRadius: "12px",
        fontSize: "15px",
        fontWeight: 600,
        cursor: "pointer",
        boxShadow: "0 4px 12px rgba(200,134,42,0.25)",
        transition: "all 0.2s ease",
      }}
      onMouseEnter={(e) => {
        e.target.style.transform = "translateY(-2px)";
        e.target.style.boxShadow = "0 8px 18px rgba(200,134,42,0.35)";
      }}
      onMouseLeave={(e) => {
        e.target.style.transform = "translateY(0)";
        e.target.style.boxShadow = "0 4px 12px rgba(200,134,42,0.25)";
      }}
    >
      💾 Save Recipe
    </button>
  </div>
</div>
      {/* Tips */}
      {recipe.tip && (
        <div style={{
          margin: "0 32px 28px", padding: "16px 20px",
          background: "#FDF6EC", borderRadius: 12,
          borderLeft: "3px solid #C8862A",
          fontSize: 13, color: "#6B4C2A", lineHeight: 1.6,
        }}>
          <strong style={{ color: "#C8862A" }}>Chef's Tip: </strong>{recipe.tip}
        </div>
      )}
    </div>
  );
}

/* ── Loading skeleton for recipe ── */
function RecipeSkeleton() {
  return (
    <div style={{ background: "#fff", borderRadius: 20, overflow: "hidden", boxShadow: "0 8px 48px rgba(59,42,26,0.13)" }}>
      <div style={{ background: "linear-gradient(135deg, #C8862A 0%, #E6A94D 100%)", padding: "32px 36px 28px" }}>
        <Skeleton width={100} height={12} radius={4} />
        <div style={{ marginTop: 12 }}><Skeleton width="70%" height={28} radius={6} /></div>
        <div style={{ marginTop: 10 }}><Skeleton height={14} radius={4} /></div>
        <div style={{ marginTop: 6 }}><Skeleton width="80%" height={14} radius={4} /></div>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", padding: 32, gap: 24 }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {[...Array(6)].map((_, i) => <Skeleton key={i} height={14} radius={4} />)}
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {[...Array(5)].map((_, i) => <Skeleton key={i} height={14} radius={4} />)}
        </div>
      </div>
    </div>
  );
}

/* ── MAIN PAGE ── */
export default function GeneratePage() {
  const [input, setInput] = useState("");
  const [ingredients, setIngredients] = useState([]);
  const [preferences, setPreferences] = useState({ diet: "", cuisine: "", time: "" });
  const [loading, setLoading] = useState(false);
  const [recipe, setRecipe] = useState(null);
  const [error, setError] = useState("");
  const inputRef = useRef();

  /* Add ingredient on Enter or comma */
  const handleKeyDown = (e) => {
    if ((e.key === "Enter" || e.key === ",") && input.trim()) {
      e.preventDefault();
      const val = input.trim().replace(/,$/, "");
      if (val && !ingredients.includes(val)) setIngredients(prev => [...prev, val]);
      setInput("");
    }
    if (e.key === "Backspace" && !input && ingredients.length) {
      setIngredients(prev => prev.slice(0, -1));
    }
  };

  const removeIngredient = (label) => setIngredients(prev => prev.filter(i => i !== label));

  const parseRecipeJSON = (text) => {
    try {
      const clean = text.replace(/```json|```/g, "").trim();
      return JSON.parse(clean);
    } catch {
      return null;
    }
  };

 const generateRecipe = async () => {
  if (ingredients.length === 0) {
    setError("Please add at least one ingredient.");
    return;
  }

  setError("");
  setLoading(true);
  setRecipe(null);

  try {
   const res = await fetch(
  `${process.env.NEXT_PUBLIC_API_URL}/api/generate`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ingredients,
          cuisine: preferences.cuisine,
          diet: preferences.diet,
          maxTime: preferences.time,
        }),
      }
    );

    const data = await res.json();

    console.log("AI Response:", data);

    setRecipe(data);

  } catch (err) {
    console.error(err);
    setError("Something went wrong. Please try again.");
  } finally {
    setLoading(false);
  }
};
  /* Suggestion chips */
  const suggestions = ["Pasta","Chicken","Garlic","Tomatoes","Eggs","Spinach","Onion","Cheese"];

  return (
    <>
      <style>{globalCSS}</style>
      <div style={{ minHeight: "100vh", background: "#F5EFE6" }}>
        <Navbar />

        {/* Hero strip */}
        <div style={{
          background: "linear-gradient(to right, #3B2A1A 0%, #5C3D1E 100%)",
          padding: "52px 40px 48px",
          textAlign: "center",
          position: "relative", overflow: "hidden",
        }}>
          {/* decorative circles */}
          {[[-80,-80,200],[700,60,120],[300,-40,80]].map(([x,y,s],i) => (
            <div key={i} style={{
              position: "absolute", left: x, top: y,
              width: s, height: s, borderRadius: "50%",
              background: "rgba(200,134,42,0.12)", pointerEvents: "none",
            }} />
          ))}
          <div style={{
            display: "inline-flex", alignItems: "center", gap: 6,
            background: "rgba(200,134,42,0.2)", border: "1px solid rgba(200,134,42,0.4)",
            borderRadius: 20, padding: "5px 14px", fontSize: 12,
            color: "#E6A94D", letterSpacing: 1, textTransform: "uppercase", marginBottom: 20,
            animation: "fadeUp 0.5s ease both",
          }}>
            <span>●</span> AI-Powered Recipe Generation
          </div>
          <h1 style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "clamp(32px, 5vw, 54px)",
            color: "#F5EFE6", lineHeight: 1.15, fontWeight: 700,
            animation: "fadeUp 0.5s ease 0.1s both",
          }}>
            Cook anything.<br />
            <em style={{ color: "#C8862A", fontStyle: "italic" }}>Powered</em> by intelligence.
          </h1>
          <p style={{
            color: "rgba(245,239,230,0.65)", fontSize: 16, marginTop: 16, lineHeight: 1.7,
            animation: "fadeUp 0.5s ease 0.2s both",
          }}>
            Describe what's in your fridge and watch our AI craft the perfect recipe — step by step, tailored to you.
          </p>
        </div>

        {/* Main content */}
        <div style={{ maxWidth: 820, margin: "0 auto", padding: "48px 24px 80px" }}>

          {/* Input card */}
          <div style={{
            background: "#FFFFFF", borderRadius: 20,
            boxShadow: "0 4px 32px rgba(59,42,26,0.10)",
            padding: "36px 36px 32px",
            marginBottom: 32,
            animation: "fadeUp 0.5s ease 0.3s both",
          }}>
            <label style={{ display: "block", fontFamily: "'Playfair Display', serif", fontSize: 20, marginBottom: 6, color: "#3B2A1A" }}>
              What's in your kitchen?
            </label>
            <p style={{ fontSize: 13, color: "#9A7A5A", marginBottom: 16 }}>
              Type an ingredient and press <kbd style={{ background: "#F0E8D8", padding: "1px 6px", borderRadius: 4, fontSize: 12 }}>Enter</kbd> or <kbd style={{ background: "#F0E8D8", padding: "1px 6px", borderRadius: 4, fontSize: 12 }}>,</kbd> to add
            </p>

            {/* Tag input */}
            <div
              onClick={() => inputRef.current?.focus()}
              style={{
                minHeight: 52, border: "1.5px solid #E0D5C5", borderRadius: 12,
                padding: "10px 14px", display: "flex", flexWrap: "wrap", gap: 8,
                alignItems: "center", cursor: "text", background: "#FAF7F2",
                transition: "border-color 0.2s",
              }}
              onFocus={() => {}}
            >
              {ingredients.map((ing, i) => (
                <IngredientTag key={ing} label={ing} onRemove={removeIngredient} index={i} />
              ))}
              <input
                ref={inputRef}
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder={ingredients.length === 0 ? "e.g. garlic, pasta, tomatoes…" : "Add more…"}
                style={{
                  border: "none", outline: "none", background: "transparent",
                  fontSize: 14, color: "#3B2A1A", flex: 1, minWidth: 140,
                  fontFamily: "'DM Sans', sans-serif",
                }}
              />
            </div>

            {/* Suggestion chips */}
            <div style={{ marginTop: 12, display: "flex", flexWrap: "wrap", gap: 8 }}>
              <span style={{ fontSize: 12, color: "#9A7A5A", alignSelf: "center" }}>Quick add:</span>
              {suggestions.map(s => (
                <button
                  key={s}
                  onClick={() => { if (!ingredients.includes(s)) setIngredients(prev => [...prev, s]); }}
                  style={{
                    background: ingredients.includes(s) ? "#3B2A1A" : "#F0E8D8",
                    color: ingredients.includes(s) ? "#F5EFE6" : "#6B4C2A",
                    border: "1px solid " + (ingredients.includes(s) ? "#3B2A1A" : "#DDD0BA"),
                    borderRadius: 20, padding: "4px 12px", fontSize: 12,
                    cursor: "pointer", transition: "all 0.2s",
                  }}
                >{s}</button>
              ))}
            </div>

            {/* Preferences row */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12, marginTop: 24 }}>
              {[
                { key: "diet", label: "Diet", options: ["", "Vegetarian","Vegan","Gluten-Free","Keto","Paleo"] },
                { key: "cuisine", label: "Cuisine", options: ["", "Italian","Mexican","Indian","Japanese","Mediterranean","French"] },
                { key: "time", label: "Max Time", options: ["", "15 min","30 min","45 min","1 hour","No limit"] },
              ].map(({ key, label, options }) => (
                <div key={key}>
                  <label style={{ display: "block", fontSize: 11, color: "#9A7A5A", marginBottom: 6, letterSpacing: 0.5, textTransform: "uppercase" }}>{label}</label>
                  <select
                    value={preferences[key]}
                    onChange={e => setPreferences(p => ({ ...p, [key]: e.target.value }))}
                    style={{
                      width: "100%", padding: "9px 12px", borderRadius: 10,
                      border: "1.5px solid #E0D5C5", background: "#FAF7F2",
                      fontSize: 13, color: "#3B2A1A", fontFamily: "'DM Sans', sans-serif",
                      cursor: "pointer", outline: "none",
                    }}
                  >
                    {options.map(o => <option key={o} value={o}>{o || `Any ${label}`}</option>)}
                  </select>
                </div>
              ))}
            </div>

            {/* Error */}
            {error && (
              <div style={{
                marginTop: 14, padding: "10px 14px", borderRadius: 8,
                background: "#FFF3F0", border: "1px solid #FFCDC4",
                color: "#C0392B", fontSize: 13,
              }}>{error}</div>
            )}

            {/* Generate button */}
            <button
              onClick={generateRecipe}
              disabled={loading}
              style={{
                marginTop: 24, width: "100%", padding: "15px",
                background: loading ? "#9A7A5A" : "#3B2A1A",
                color: "#F5EFE6", border: "none", borderRadius: 12,
                fontSize: 15, fontWeight: 600, cursor: loading ? "not-allowed" : "pointer",
                display: "flex", alignItems: "center", justifyContent: "center", gap: 10,
                transition: "background 0.2s, transform 0.1s",
                fontFamily: "'DM Sans', sans-serif",
              }}
              onMouseEnter={e => { if (!loading) e.target.style.background = "#5C3D1E"; }}
              onMouseLeave={e => { if (!loading) e.target.style.background = "#3B2A1A"; }}
            >
              {loading ? (
                <>
                  <span style={{
                    display: "inline-block", width: 18, height: 18,
                    border: "2px solid rgba(245,239,230,0.3)",
                    borderTop: "2px solid #F5EFE6", borderRadius: "50%",
                    animation: "spin 0.8s linear infinite",
                  }} />
                  Crafting your recipe…
                </>
              ) : (
                <> ✦ Generate a Recipe </>
              )}
            </button>
          </div>

          {/* Recipe output */}
          {loading && <RecipeSkeleton />}
          {/* {recipe && (
  <pre>
    {JSON.stringify(recipe, null, 2)}
  </pre>
)} */}
          {recipe && !loading && <RecipeCard recipe={recipe} />}

          {/* Empty state */}
          {!loading && !recipe && (
            <div style={{
              textAlign: "center", padding: "48px 0", color: "#B8A090",
              animation: "fadeUp 0.5s ease 0.4s both",
            }}>
              <div style={{ fontSize: 52, marginBottom: 16 }}>🍳</div>
              <p style={{ fontSize: 16, fontFamily: "'Playfair Display', serif", color: "#9A7A5A" }}>Your AI-crafted recipe will appear here</p>
              <p style={{ fontSize: 13, marginTop: 8, color: "#B8A090" }}>Add your ingredients above and let the magic happen</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}