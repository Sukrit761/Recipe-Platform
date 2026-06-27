"use client";

import { useState, useEffect } from "react";
import Header from "@/components/Header";
import { useUser } from "@clerk/nextjs";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;1,400;1,600&family=DM+Sans:wght@300;400;500&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --cream: #faf7f2; --parch: #f3ece0; --bark: #2d1f0e;
    --umber: #4a3520; --sienna: #c8853a; --gold: #e8a55a;
    --mist: #a08060; --ink: #1a1208; --white: #ffffff;
    --border: rgba(200,133,58,.18);
  }

  .cb-root {
    font-family: 'DM Sans', sans-serif;
    background: var(--cream);
    color: var(--ink);
    min-height: 100vh;
    overflow-x: hidden;
  }

  .cb-root::before {
    content:''; position:fixed; inset:0;
    background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.03'/%3E%3C/svg%3E");
    pointer-events:none; z-index:9999; opacity:.4;
  }

  /* ── Header ── */
  .cb-header {
    position:fixed; top:0; left:0; right:0; z-index:100;
    background:rgba(250,247,242,.9); backdrop-filter:blur(16px);
    border-bottom:1px solid var(--border);
  }
  .cb-accent { height:2px; background:linear-gradient(90deg,#c8853a,#e8a55a 45%,#d4955e 75%,#a07040); }
  .cb-header-inner {
    max-width:1200px; margin:0 auto; padding:0 2rem; height:68px;
    display:flex; align-items:center; justify-content:space-between;
  }
  .cb-logo { display:flex; align-items:center; gap:10px; text-decoration:none; }
  .cb-logo-icon { width:36px;height:36px;background:var(--bark);border-radius:10px;display:flex;align-items:center;justify-content:center;font-size:18px;box-shadow:0 2px 8px rgba(45,31,14,.3); }
  .cb-logo-name { font-family:'Cormorant Garamond',serif;font-size:1.35rem;font-weight:600;color:var(--ink); }
  .cb-logo-tag { font-size:.6rem;letter-spacing:.12em;text-transform:uppercase;color:var(--mist);font-weight:500; }
  .cb-nav { display:flex;gap:.2rem; }
  .cb-nav a { font-size:.875rem;color:#5c4a32;text-decoration:none;padding:6px 14px;border-radius:8px;transition:background .15s,color .15s; }
  .cb-nav a:hover { background:#ede8e0;color:var(--ink); }
  .cb-nav a.active { background:#ede8e0;color:var(--ink);font-weight:500; }
  .cb-hcta { display:flex;gap:10px;align-items:center; }
  .btn-ghost { font-family:'DM Sans',sans-serif;font-size:.875rem;color:#5c4a32;background:transparent;border:none;padding:8px 16px;border-radius:8px;cursor:pointer;transition:background .15s; }
  .btn-ghost:hover { background:#ede8e0; }
  .btn-primary { font-family:'DM Sans',sans-serif;font-size:.875rem;font-weight:500;color:var(--cream);background:var(--bark);border:none;padding:9px 22px;border-radius:8px;cursor:pointer;box-shadow:0 2px 8px rgba(45,31,14,.25);transition:background .18s,transform .12s; }
  .btn-primary:hover { background:var(--umber);transform:translateY(-1px); }

  /* ── Hero band ── */
  .cb-hero {
    margin-top: 70px;
    background:linear-gradient(135deg,var(--parch) 0%,var(--cream) 100%);
    border-bottom:1px solid var(--border);
    padding:52px 2rem 44px;
    position:relative; overflow:hidden;
  }
  .cb-hero::before {
    content:''; position:absolute;top:-80px;right:-60px;
    width:380px;height:380px;border-radius:50%;
    background:radial-gradient(circle,rgba(232,165,90,.13) 0%,transparent 70%);
    pointer-events:none;
  }
  .cb-hero::after {
    content:''; position:absolute;bottom:-60px;left:5%;
    width:220px;height:220px;border-radius:50%;
    background:radial-gradient(circle,rgba(200,133,58,.09) 0%,transparent 70%);
    pointer-events:none;
  }
  .cb-hero-inner { max-width:1200px;margin:0 auto;position:relative;z-index:1; display:flex;justify-content:space-between;align-items:flex-end;flex-wrap:wrap;gap:1.5rem; }
  .cb-hero-left {}
  .cb-eyebrow { display:inline-flex;align-items:center;gap:8px;background:rgba(200,133,58,.1);border:1px solid rgba(200,133,58,.25);border-radius:100px;padding:5px 14px;font-size:.72rem;font-weight:500;color:var(--sienna);letter-spacing:.06em;text-transform:uppercase;margin-bottom:1rem; }
  .cb-badge-dot { width:6px;height:6px;border-radius:50%;background:var(--sienna);box-shadow:0 0 0 3px rgba(200,133,58,.25);animation:pulse 2s ease infinite; }
  @keyframes pulse { 0%,100%{box-shadow:0 0 0 3px rgba(200,133,58,.25);}50%{box-shadow:0 0 0 6px rgba(200,133,58,.1);} }
  .cb-title { font-family:'Cormorant Garamond',serif;font-size:clamp(2rem,4vw,3rem);font-weight:600;line-height:1.1;color:var(--ink); }
  .cb-title em { font-style:italic;color:var(--sienna); }
  .cb-sub { margin-top:.5rem;font-size:.95rem;font-weight:300;color:#6b5540;line-height:1.6; }

  /* Stats row */
  .cb-hero-stats { display:flex;gap:1.75rem; }
  .cb-stat { display:flex;flex-direction:column;align-items:center;gap:2px; }
  .cb-stat-num { font-family:'Cormorant Garamond',serif;font-size:2rem;font-weight:600;color:var(--ink);line-height:1; }
  .cb-stat-label { font-size:.68rem;color:var(--mist);text-transform:uppercase;letter-spacing:.08em; }

  /* ── Toolbar ── */
  .cb-toolbar {
    max-width:1200px; margin:0 auto;
    padding:1.5rem 2rem;
    display:flex;align-items:center;gap:12px;flex-wrap:wrap;
  }
  .cb-search-wrap {
    flex:1;min-width:220px;
    display:flex;align-items:center;gap:10px;
    background:var(--white);border:1.5px solid var(--border);border-radius:12px;
    padding:10px 14px;
    transition:border-color .2s,box-shadow .2s;
  }
  .cb-search-wrap:focus-within { border-color:var(--sienna);box-shadow:0 0 0 3px rgba(200,133,58,.1); }
  .cb-search-icon { font-size:1rem;flex-shrink:0;color:var(--mist); }
  .cb-search { border:none;outline:none;background:transparent;font-family:'DM Sans',sans-serif;font-size:.875rem;color:var(--ink);width:100%; }
  .cb-search::placeholder { color:rgba(160,128,96,.55); }

  .cb-filter-btn {
    display:flex;align-items:center;gap:7px;
    padding:10px 16px;border-radius:12px;
    border:1.5px solid var(--border);background:var(--white);
    font-family:'DM Sans',sans-serif;font-size:.825rem;color:var(--umber);cursor:pointer;
    transition:background .15s,border-color .15s;white-space:nowrap;
  }
  .cb-filter-btn:hover { background:var(--parch);border-color:rgba(200,133,58,.3); }
  .cb-filter-btn.active { border-color:var(--sienna);background:rgba(200,133,58,.08);color:var(--sienna); }

  .cb-sort-select {
    padding:10px 36px 10px 14px;border-radius:12px;
    border:1.5px solid var(--border);background:var(--white);
    font-family:'DM Sans',sans-serif;font-size:.825rem;color:var(--umber);cursor:pointer;
    outline:none;appearance:none;
    background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath d='M1 1l5 5 5-5' stroke='%23a08060' stroke-width='1.5' fill='none' stroke-linecap='round'/%3E%3C/svg%3E");
    background-repeat:no-repeat;background-position:right 12px center;
    transition:border-color .2s;
  }
  .cb-sort-select:focus { border-color:var(--sienna); }

  .cb-view-toggle { display:flex;background:var(--white);border:1.5px solid var(--border);border-radius:12px;overflow:hidden; }
  .cb-view-btn { padding:10px 14px;border:none;background:transparent;cursor:pointer;font-size:1rem;color:var(--mist);transition:background .15s,color .15s; }
  .cb-view-btn.active { background:var(--parch);color:var(--ink); }

  /* ── Filter chips strip ── */
  .cb-filter-strip {
    max-width:1200px;margin:0 auto;
    padding:0 2rem 1.25rem;
    display:flex;gap:8px;flex-wrap:wrap;
  }
  .filter-chip {
    display:flex;align-items:center;gap:5px;
    padding:6px 14px;border-radius:100px;
    border:1.5px solid var(--border);background:var(--white);
    font-size:.8rem;color:var(--umber);cursor:pointer;
    transition:background .15s,border-color .15s,color .15s;
    white-space:nowrap;
  }
  .filter-chip:hover { background:var(--parch);border-color:rgba(200,133,58,.3); }
  .filter-chip.on { background:var(--bark);color:var(--cream);border-color:var(--bark); }

  /* ── Grid ── */
  .cb-content { max-width:1200px;margin:0 auto;padding:0 2rem 5rem; }

  .cb-section-label {
    font-family:'Cormorant Garamond',serif;
    font-size:1.05rem;font-weight:600;color:var(--mist);
    margin-bottom:1.25rem;letter-spacing:.01em;
    display:flex;align-items:center;gap:10px;
  }
  .cb-section-label::after { content:'';flex:1;height:1px;background:rgba(200,133,58,.15); }

  .cb-grid {
    display:grid;
    grid-template-columns:repeat(auto-fill,minmax(300px,1fr));
    gap:1.5rem;
  }
  .cb-grid.list-view { grid-template-columns:1fr; }

  /* ── Recipe Card (grid) ── */
  .rc-card {
    background:var(--white);border-radius:20px;overflow:hidden;
    border:1px solid var(--border);
    box-shadow:0 4px 20px rgba(45,31,14,.06);
    transition:transform .25s,box-shadow .25s;
    cursor:pointer;position:relative;
    animation:cardIn .4s ease both;
  }
  @keyframes cardIn { from{opacity:0;transform:translateY(16px);}to{opacity:1;transform:translateY(0);} }
  .rc-card:hover { transform:translateY(-6px);box-shadow:0 16px 44px rgba(45,31,14,.12); }

  .rc-thumb {
    height:170px;display:flex;align-items:center;justify-content:center;
    font-size:4rem;position:relative;overflow:hidden;
    background:linear-gradient(135deg,#f4d5a0,#e8a55a,#d4855a);
  }
  .rc-thumb::after { content:'';position:absolute;inset:0;background:linear-gradient(180deg,transparent 40%,rgba(45,31,14,.12)); }
  .rc-thumb-emoji { position:relative;z-index:1; }

  .rc-fav-btn {
    position:absolute;top:10px;right:10px;z-index:2;
    width:32px;height:32px;border-radius:50%;
    background:rgba(250,247,242,.9);backdrop-filter:blur(6px);
    border:1px solid rgba(200,133,58,.2);
    display:flex;align-items:center;justify-content:center;
    font-size:.9rem;cursor:pointer;
    transition:background .15s,transform .15s;
  }
  .rc-fav-btn:hover { transform:scale(1.15); }
  .rc-fav-btn.fav { background:rgba(200,58,58,.1);border-color:rgba(200,58,58,.25); }

  .rc-ai-tag {
    position:absolute;top:10px;left:10px;z-index:2;
    background:rgba(250,247,242,.9);backdrop-filter:blur(6px);
    border-radius:100px;padding:3px 9px;
    font-size:.68rem;font-weight:500;color:var(--umber);
    border:1px solid rgba(200,133,58,.2);
  }

  .rc-body { padding:1.25rem; }
  .rc-cuisine { font-size:.68rem;letter-spacing:.1em;text-transform:uppercase;color:var(--sienna);font-weight:600;margin-bottom:.35rem; }
  .rc-title { font-family:'Cormorant Garamond',serif;font-size:1.2rem;font-weight:600;color:var(--ink);line-height:1.2;margin-bottom:.6rem; }
  .rc-meta { display:flex;gap:10px;flex-wrap:wrap;margin-bottom:.85rem; }
  .rc-meta-item { font-size:.75rem;color:var(--mist);display:flex;align-items:center;gap:4px; }
  .rc-tags { display:flex;gap:5px;flex-wrap:wrap;margin-bottom:.85rem; }
  .rc-chip { background:rgba(200,133,58,.08);border:1px solid rgba(200,133,58,.18);border-radius:100px;padding:2px 9px;font-size:.7rem;color:var(--sienna); }
  .rc-footer {
    display:flex;align-items:center;justify-content:space-between;
    padding-top:.85rem;border-top:1px solid rgba(200,133,58,.1);
  }
  .rc-date { font-size:.72rem;color:var(--mist); }
  .rc-view-btn {
    font-family:'DM Sans',sans-serif;font-size:.78rem;font-weight:500;
    background:var(--bark);color:var(--cream);border:none;
    padding:7px 14px;border-radius:8px;cursor:pointer;
    transition:background .15s,transform .12s;
  }
  .rc-view-btn:hover { background:var(--umber);transform:translateY(-1px); }

  /* ── Recipe Card (list) ── */
  .rc-card.list-view {
    display:grid;grid-template-columns:140px 1fr;
  }
  .rc-card.list-view .rc-thumb { height:100%;border-radius:0;min-height:120px;font-size:3rem; }
  .rc-card.list-view .rc-ai-tag { display:none; }
  .rc-card.list-view .rc-body { display:flex;flex-direction:column;justify-content:center; }

  /* ── Empty state ── */
  .cb-empty {
    grid-column:1/-1;
    display:flex;flex-direction:column;align-items:center;
    padding:5rem 2rem;text-align:center;gap:1rem;
  }
  .cb-empty-icon { font-size:3.5rem;filter:grayscale(.2); }
  .cb-empty h3 { font-family:'Cormorant Garamond',serif;font-size:1.5rem;font-weight:600;color:var(--ink); }
  .cb-empty p { font-size:.9rem;color:var(--mist);max-width:280px;line-height:1.6;font-weight:300; }
  .btn-generate-link {
    font-family:'DM Sans',sans-serif;font-size:.9rem;font-weight:500;
    color:var(--cream);background:var(--bark);border:none;
    padding:12px 24px;border-radius:12px;cursor:pointer;
    box-shadow:0 4px 16px rgba(45,31,14,.22);
    transition:background .18s,transform .15s;
    display:flex;align-items:center;gap:7px;margin-top:.5rem;
  }
  .btn-generate-link:hover { background:var(--umber);transform:translateY(-2px); }

  /* ── Detail modal ── */
  .modal-overlay {
    position:fixed;inset:0;z-index:200;
    background:rgba(26,18,8,.55);backdrop-filter:blur(4px);
    display:flex;align-items:center;justify-content:center;
    padding:1.5rem;
    animation:fadeOverlay .2s ease both;
  }
  @keyframes fadeOverlay { from{opacity:0;}to{opacity:1;} }
  .modal-box {
    background:var(--white);border-radius:24px;
    width:100%;max-width:660px;max-height:88vh;overflow-y:auto;
    box-shadow:0 32px 80px rgba(45,31,14,.22);
    animation:slideModal .3s cubic-bezier(.22,1,.36,1) both;
    position:relative;
  }
  @keyframes slideModal { from{opacity:0;transform:translateY(32px) scale(.97);}to{opacity:1;transform:none;} }
  .modal-close {
    position:absolute;top:14px;right:14px;z-index:2;
    width:34px;height:34px;border-radius:50%;
    background:rgba(250,247,242,.9);border:1px solid var(--border);
    display:flex;align-items:center;justify-content:center;
    font-size:1rem;cursor:pointer;
    transition:background .15s,transform .15s;
  }
  .modal-close:hover { background:var(--parch);transform:scale(1.1); }
  .modal-thumb {
    height:220px;display:flex;align-items:center;justify-content:center;
    font-size:5.5rem;border-radius:24px 24px 0 0;overflow:hidden;position:relative;
  }
  .modal-thumb::after { content:'';position:absolute;inset:0;background:linear-gradient(180deg,transparent 40%,rgba(45,31,14,.15)); }
  .modal-body { padding:1.75rem; }
  .modal-cuisine { font-size:.7rem;letter-spacing:.1em;text-transform:uppercase;color:var(--sienna);font-weight:600;margin-bottom:.35rem; }
  .modal-title { font-family:'Cormorant Garamond',serif;font-size:1.9rem;font-weight:600;color:var(--ink);line-height:1.15;margin-bottom:.75rem; }
  .modal-meta { display:flex;flex-wrap:wrap;gap:10px;margin-bottom:1.25rem; }
  .modal-pill { display:flex;align-items:center;gap:6px;background:var(--parch);border:1px solid var(--border);border-radius:100px;padding:5px 12px;font-size:.8rem;color:var(--umber); }
  .modal-desc { font-size:.92rem;color:#5c4a32;line-height:1.75;font-weight:300;font-style:italic;border-left:2px solid var(--gold);padding-left:1rem;margin-bottom:1.5rem; }
  .modal-section-title { font-family:'Cormorant Garamond',serif;font-size:1.2rem;font-weight:600;color:var(--ink);margin-bottom:.75rem;display:flex;align-items:center;gap:8px; }
  .modal-section-title::after { content:'';flex:1;height:1px;background:rgba(200,133,58,.15); }
  .modal-ingr-grid { display:grid;grid-template-columns:1fr 1fr;gap:6px;margin-bottom:1.5rem; }
  .modal-ingr-item { display:flex;align-items:center;gap:8px;padding:8px 12px;border-radius:10px;background:var(--cream);border:1px solid rgba(200,133,58,.12);font-size:.82rem;color:var(--umber); }
  .modal-ingr-dot { width:6px;height:6px;border-radius:50%;background:var(--sienna);flex-shrink:0; }
  .modal-steps { display:flex;flex-direction:column;gap:9px;margin-bottom:1.5rem; }
  .modal-step { display:flex;gap:12px;align-items:flex-start;padding:12px 14px;border-radius:12px;background:var(--cream);border:1px solid rgba(200,133,58,.1); }
  .modal-step-num { width:26px;height:26px;border-radius:50%;background:var(--bark);color:var(--cream);display:flex;align-items:center;justify-content:center;font-size:.72rem;font-weight:600;flex-shrink:0;margin-top:1px; }
  .modal-step-text { font-size:.86rem;color:#4a3520;line-height:1.65;font-weight:300; }
  .modal-tip { padding:1rem 1.25rem;background:rgba(200,133,58,.06);border-radius:12px;border:1px solid rgba(200,133,58,.15);font-size:.875rem;color:var(--umber);line-height:1.6;margin-bottom:1.5rem; }
  .modal-nutr { display:grid;grid-template-columns:repeat(4,1fr);gap:8px;margin-bottom:1.5rem; }
  .modal-nutr-item { display:flex;flex-direction:column;align-items:center;gap:2px;padding:10px;background:linear-gradient(135deg,#fdf8f0,#fdf2e0);border-radius:12px;border:1px solid rgba(200,133,58,.12); }
  .modal-nutr-val { font-family:'Cormorant Garamond',serif;font-size:1.3rem;font-weight:600;color:var(--ink); }
  .modal-nutr-label { font-size:.65rem;color:var(--mist);text-transform:uppercase;letter-spacing:.08em; }
  .modal-actions { display:flex;gap:8px;flex-wrap:wrap;padding-top:1.25rem;border-top:1px solid rgba(200,133,58,.1); }
  .btn-modal-action { font-family:'DM Sans',sans-serif;font-size:.83rem;font-weight:500;padding:9px 16px;border-radius:10px;cursor:pointer;border:1.5px solid rgba(200,133,58,.25);background:transparent;color:var(--umber);transition:background .15s,transform .12s;display:flex;align-items:center;gap:6px; }
  .btn-modal-action:hover { background:rgba(200,133,58,.08);transform:translateY(-1px); }
  .btn-modal-action.danger { border-color:rgba(192,57,43,.25);color:#c0392b; }
  .btn-modal-action.danger:hover { background:rgba(192,57,43,.06); }

  /* Responsive */
  @media (max-width:768px) {
    .cb-hero-inner { flex-direction:column;align-items:flex-start; }
    .cb-hero-stats { gap:1.25rem; }
    .cb-grid { grid-template-columns:1fr; }
    .cb-nav { display:none; }
    .cb-grid.list-view .rc-card { grid-template-columns:100px 1fr; }
    .modal-ingr-grid { grid-template-columns:1fr; }
    .modal-nutr { grid-template-columns:repeat(2,1fr); }
  }
`;

/* ── Mock saved recipes seed data ── */
const SEED_RECIPES = [
//   { id:1, title:"Truffle Pasta with Caramelised Shallots", cuisine:"Italian", emoji:"🍝", description:"A luxurious, silky pasta with earthy truffle notes and sweet caramelised shallots.", prepTime:"10 min", cookTime:"25 min", servings:2, difficulty:"Easy", calories:"620", protein:"18g", carbs:"72g", fat:"28g", tags:["Vegetarian","Quick","Italian"], ingredients:["200g tagliatelle","2 tbsp truffle oil","3 shallots, thinly sliced","50g parmesan","2 garlic cloves","Salt & pepper","Fresh parsley"], steps:["Boil pasta in salted water until al dente.","Slowly caramelise shallots in butter over low heat for 12 min.","Add garlic and cook 1 min more.","Toss drained pasta with truffle oil, shallots and parmesan.","Season generously and garnish with parsley."], tips:"Use room-temperature parmesan for a creamier finish.", savedAt:"2 hours ago", color:"linear-gradient(135deg,#f4d5a0,#e8a55a,#d4855a)", fav:true },
//   { id:2, title:"Miso Ramen with Soft-Boiled Egg", cuisine:"Japanese", emoji:"🍜", description:"A deeply umami broth with silky noodles and a perfectly jammy six-minute egg.", prepTime:"15 min", cookTime:"40 min", servings:2, difficulty:"Medium", calories:"520", protein:"26g", carbs:"58g", fat:"18g", tags:["Comfort","Umami","Noodles"], ingredients:["2 portions ramen noodles","3 tbsp white miso","4 cups chicken stock","2 eggs","100g corn","2 spring onions","1 tsp sesame oil","Nori sheets"], steps:["Soft-boil eggs for exactly 6 minutes, cool in ice water then peel.","Whisk miso into warm stock over medium heat. Do not boil.","Cook noodles per packet, drain.","Divide noodles into bowls, pour broth over.","Top with halved eggs, corn, spring onions and a drizzle of sesame oil."], tips:"Marinate peeled eggs in soy sauce for an hour for deeper flavour.", savedAt:"Yesterday", color:"linear-gradient(135deg,#fde8c0,#f4a850)", fav:false },
//   { id:3, title:"Butter Chicken with Garlic Naan", cuisine:"Indian", emoji:"🥘", description:"Tender chicken in a velvety, spiced tomato-cream sauce served with pillowy naan.", prepTime:"20 min", cookTime:"55 min", servings:4, difficulty:"Medium", calories:"680", protein:"38g", carbs:"45g", fat:"32g", tags:["Spicy","Comfort","Classic"], ingredients:["600g chicken thighs","400ml tomato passata","200ml heavy cream","3 tsp garam masala","2 tsp cumin","1 tbsp ginger-garlic paste","4 tbsp butter","Naan to serve"], steps:["Marinate chicken in yoghurt and spices for at least 30 min.","Sear chicken in a hot pan until golden, set aside.","Make sauce: fry onions, add ginger-garlic paste, tomato, spices, cook 15 min.","Blend sauce until smooth, return to pan with cream and butter.","Add chicken, simmer 20 min. Serve with warm naan."], tips:"Blooming the spices in butter before adding tomato doubles the flavour depth.", savedAt:"3 days ago", color:"linear-gradient(135deg,#fcd5b0,#e87040)", fav:true },
//   { id:4, title:"Greek Quinoa Power Bowl", cuisine:"Mediterranean", emoji:"🥗", description:"A vibrant, protein-rich bowl with roasted chickpeas, feta and herby tzatziki.", prepTime:"15 min", cookTime:"20 min", servings:2, difficulty:"Easy", calories:"420", protein:"22g", carbs:"38g", fat:"20g", tags:["Vegan","Light","Healthy"], ingredients:["150g quinoa","1 can chickpeas","100g cherry tomatoes","Half a cucumber","80g feta","Kalamata olives","Tzatziki","Lemon & olive oil"], steps:["Rinse and cook quinoa per packet instructions.","Roast chickpeas at 200°C with olive oil, cumin and paprika for 20 min.","Dice cucumber and halve tomatoes.","Assemble bowl: quinoa base, vegetables, chickpeas.","Top with feta, olives and a generous dollop of tzatziki."], tips:"Toast the quinoa dry in the pan before adding water for a nuttier flavour.", savedAt:"5 days ago", color:"linear-gradient(135deg,#d4f0d0,#68c040)", fav:false },
//   { id:5, title:"Korean BBQ Beef Bowls", cuisine:"Korean", emoji:"🥩", description:"Sticky, umami-glazed bulgogi beef on steamed rice with pickled cucumber and sesame.", prepTime:"20 min", cookTime:"15 min", servings:2, difficulty:"Easy", calories:"580", protein:"34g", carbs:"55g", fat:"22g", tags:["BBQ","Quick","Bold"], ingredients:["300g beef sirloin, thin sliced","3 tbsp soy sauce","1 tbsp sesame oil","1 tbsp brown sugar","2 garlic cloves","1 tsp grated ginger","Steamed rice","Pickled cucumber"], steps:["Combine soy, sesame oil, sugar, garlic, ginger. Marinate beef 15 min.","Cook beef in a very hot pan or grill 2–3 min per side until caramelised.","Serve over steamed rice with pickled cucumber and sesame seeds."], tips:"Freeze beef for 20 minutes before slicing for ultra-thin cuts.", savedAt:"1 week ago", color:"linear-gradient(135deg,#f5d0b0,#d06030)", fav:false },
//   { id:6, title:"Creamy Mushroom Risotto", cuisine:"Italian", emoji:"🍄", description:"A deeply earthy, restaurant-style risotto with porcini and a cloud of parmesan.", prepTime:"10 min", cookTime:"35 min", servings:2, difficulty:"Medium", calories:"540", protein:"16g", carbs:"68g", fat:"22g", tags:["Vegetarian","Comfort","Italian"], ingredients:["300g arborio rice","20g dried porcini","2 shallots","150ml white wine","1L warm vegetable stock","80g parmesan","40g butter","Fresh thyme"], steps:["Soak porcini in hot water 10 min. Reserve the liquid.","Sauté shallots in butter, add rice, toast 2 min.","Add wine, stir until absorbed. Add stock ladle by ladle.","Stir in porcini, their liquid, parmesan and butter.","Rest 2 min, season and serve immediately."], tips:"Never stop stirring — constant agitation releases the starch for a creamy texture.", savedAt:"1 week ago", color:"linear-gradient(135deg,#e8d5b0,#a07830)", fav:true },
];

const FILTER_TAGS = ["All","Vegetarian","Vegan","Quick","Comfort","Spicy","Healthy","Italian","Indian","Japanese"];
const EMPTY_EMOJIS = ["📖", "🍽️", "🧑‍🍳", "🥘", "📝"];

export default function CookbookPage() {
  const [recipes, setRecipes] = useState(SEED_RECIPES);
  const [search, setSearch] = useState("");
  const [activeFilter, setActiveFilter] = useState("All");
  const [sort, setSort] = useState("newest");
  const [viewMode, setViewMode] = useState("grid");
  const [selected, setSelected] = useState(null);
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const [emojiIdx, setEmojiIdx] = useState(0); 


  
 const CUISINE_EMOJI = {
  Indian: "🍛",
  Italian: "🍝",
  Japanese: "🍜",
  Korean: "🥩",
  Mediterranean: "🥗",
  Mexican: "🌮",
  Chinese: "🥡",
  Thai: "🍲",
  French: "🥐",
  American: "🍔",
};

const getEmoji = (recipe) =>
  recipe.emoji || CUISINE_EMOJI[recipe.cuisine] || "🍽️";

  // ✅ Fix — separate the logic
const toggleFavById = (id) => {
  setRecipes(prev => prev.map(r => (r._id || r.id) === id ? { ...r, fav: !r.fav } : r));
};

const toggleFav = (id, e) => {
  e.stopPropagation();
  toggleFavById(id);
};
  const deleteRecipe = async (id) => {
  try {
    const res = await fetch(`http://localhost:5000/api/cookbook/${id}`, {
      method: "DELETE",
    });

    if (!res.ok) throw new Error("Failed to delete");

    // Only update UI if DB delete succeeded
    setRecipes(prev => prev.filter(r => (r._id || r.id) !== id));
    setSelected(null);
    setDeleteConfirm(null);

  } catch (err) {
    console.error("Delete failed:", err);
    alert("Failed to remove recipe. Please try again.");
  }
};
  const filtered = recipes.filter(recipe => {

  const matchesSearch =
    recipe.title
      .toLowerCase()
      .includes(search.toLowerCase());

  const matchesCuisine =
    activeFilter === "All" ||
    recipe.cuisine === activeFilter;

  return matchesSearch && matchesCuisine;

});

  const favCount = recipes.filter(r => r.fav).length;
  const cuisineCount = new Set(recipes.map(r => r.cuisine)).size;


  const { user, isLoaded } = useUser();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
  if (!isLoaded || !user) return;

  const fetchRecipes = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/generate`
      );

      const data = await res.json();

      console.log(data);

      setRecipes(data);

    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  fetchRecipes();
}, [user, isLoaded]);

  return (
    <div className="cb-root">
      <style>{styles}</style>

      {/* Header */}
      {/* <header >
        <Header />
      </header> */}

      {/* Hero band */}
      <div className="cb-hero">
        <div className="cb-hero-inner">
          <div className="cb-hero-left">
            <div className="cb-eyebrow"><div className="cb-badge-dot" /> Personal Cookbook</div>
            <h1 className="cb-title">Your <em>saved</em> recipes,<br />all in one place</h1>
            <p className="cb-sub">Every AI-generated recipe you've loved — organised, searchable, always ready to cook.</p>
          </div>
          <div className="cb-hero-stats">
            <div className="cb-stat">
              <span className="cb-stat-num">{recipes.length}</span>
              <span className="cb-stat-label">Recipes</span>
            </div>
            <div className="cb-stat">
              <span className="cb-stat-num">{favCount}</span>
              <span className="cb-stat-label">Favourites</span>
            </div>
            <div className="cb-stat">
              <span className="cb-stat-num">{cuisineCount}</span>
              <span className="cb-stat-label">Cuisines</span>
            </div>
          </div>
        </div>
      </div>

      {/* Toolbar */}
      <div className="cb-toolbar">
        <div className="cb-search-wrap">
          <span className="cb-search-icon">🔍</span>
          <input
            className="cb-search"
            placeholder="Search recipes, cuisines, tags…"
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
          {search && (
            <span style={{cursor:"pointer",color:"var(--mist)",fontSize:"1rem"}} onClick={() => setSearch("")}>×</span>
          )}
        </div>
        <select className="cb-sort-select" value={sort} onChange={e => setSort(e.target.value)}>
          <option value="newest">Newest first</option>
          <option value="oldest">Oldest first</option>
          <option value="az">A → Z</option>
          <option value="fav">Favourites first</option>
        </select>
        <div className="cb-view-toggle">
          <button className={`cb-view-btn${viewMode==="grid"?" active":""}`} onClick={() => setViewMode("grid")} title="Grid view">⊞</button>
          <button className={`cb-view-btn${viewMode==="list"?" active":""}`} onClick={() => setViewMode("list")} title="List view">☰</button>
        </div>
      </div>

      {/* Filter strip */}
      <div className="cb-filter-strip">
        {FILTER_TAGS.map(tag => (
          <button
            key={tag}
            className={`filter-chip${activeFilter===tag?" on":""}`}
            onClick={() => setActiveFilter(tag)}
          >
            {tag}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="cb-content">
        {filtered.length > 0 && (
          <div className="cb-section-label">
            {filtered.length} recipe{filtered.length !== 1 ? "s" : ""}
            {activeFilter !== "All" ? ` · ${activeFilter}` : ""}
            {search ? ` · "${search}"` : ""}
          </div>
        )}

        <div className={`cb-grid${viewMode==="list"?" list-view":""}`}>
          {filtered.length === 0 ? (
           <div className="cb-empty">
  <div className="cb-empty-icon" style={{ transition: "transform 0.3s ease", transform: "scale(1)" }}>
    {search ? "🔍" : EMPTY_EMOJIS[emojiIdx]}
  </div>
  <h3>{search ? "No recipes found" : "Your cookbook is empty"}</h3>
  <p>{search ? `No recipes match "${search}". Try a different search.` : "Generate your first AI recipe and save it here to build your collection."}</p>
  {!search && (
    <button className="btn-generate-link" onClick={() => window.location.href="/generate"}>
      ✦ Generate a Recipe
    </button>
  )}
</div>
          ) : filtered.map((r, idx) => (
            <div
              key={r._id || r.id}
              className={`rc-card${viewMode==="list"?" list-view":""}`}
              style={{ animationDelay: `${idx * 0.06}s` }}
              onClick={() => setSelected(r)}
            >
              <div className="rc-thumb" style={{ background: r.color }}>
                <div className="rc-ai-tag">AI Generated</div>
                <span className="rc-thumb-emoji">{getEmoji(r)}</span>
                <button
                  className={`rc-fav-btn${r.fav?" fav":""}`}
                  onClick={e => toggleFav(r.id || r._id, e)}
                  title={r.fav ? "Remove from favourites" : "Add to favourites"}
                >
                  {r.fav ? "❤️" : "🤍"}
                </button>
              </div>
              <div className="rc-body">
                <div className="rc-cuisine">{r.cuisine}</div>
                <div className="rc-title">{r.title}</div>
                <div className="rc-meta">
                  <span className="rc-meta-item">⏱ {r.cookingTime}</span>
                  <span className="rc-meta-item">👤 {r.diet}</span>
                  <span className="rc-meta-item">⚡ {r.difficulty}</span>
                  <span className="rc-meta-item">🔥 {r.ingredients.length} ingredients</span>
                </div>
               <div className="rc-tags">

  {r.ingredients
    .slice(0,3)
    .map((item,index)=>(
      <span
        key={index}
        className="rc-chip"
      >
        {item}
      </span>
  ))}

</div>
                <div className="rc-footer">
                  <span className="rc-date">Saved {new Date(r.createdAt).toLocaleDateString()}</span>
                  <button className="rc-view-btn" onClick={e => { e.stopPropagation(); setSelected(r); }}>
                    View →
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Detail Modal ── */}
      {selected && (
        <div className="modal-overlay" onClick={() => setSelected(null)}>
          <div className="modal-box" onClick={e => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setSelected(null)}>×</button>

           <div className="modal-thumb" style={{ background: selected.color || "linear-gradient(135deg,#f4d5a0,#e8a55a,#d4855a)" }}>
  <span style={{ position: "relative", zIndex: 1, fontSize: "5.5rem" }}>
    {getEmoji(selected)}
  </span>
</div>

            <div className="modal-body">
              <div className="modal-cuisine">{selected.cuisine}</div>
              <div className="modal-title">{selected.title}</div>

             <div className="modal-meta">
  <span className="modal-pill">
    ⏱ {selected.cookingTime}
  </span>

  <span className="modal-pill">
    🌍 {selected.cuisine}
  </span>

  <span className="modal-pill">
    🥗 {selected.diet}
  </span>

  <span className="modal-pill">
    ⚡ {selected.difficulty}
  </span>
</div>

              <div className="modal-desc">{selected.description}</div>

              {/* Nutrition */}
              <div className="modal-nutr">
                {[["🔥",selected.calories,"Calories"],["💪",selected.protein,"Protein"],["🌾",selected.carbs,"Carbs"],["🥑",selected.fat,"Fat"]].map(([e,v,l]) => (
                  <div key={l} className="modal-nutr-item">
                    <span style={{fontSize:"1.1rem"}}>{e}</span>
                    <span className="modal-nutr-val">{v}</span>
                    <span className="modal-nutr-label">{l}</span>
                  </div>
                ))}
              </div>

              {/* Ingredients */}
              <div className="modal-section-title">Ingredients</div>
              <div className="modal-ingr-grid">
                {selected.ingredients?.map((ing, i) => (
                  <div key={i} className="modal-ingr-item">
                    <div className="modal-ingr-dot" />{ing}
                  </div>
                ))}
              </div>

              {/* Steps */}
              <div className="modal-section-title">Instructions</div>
              <div className="modal-steps">
                {selected.steps?.map((step, i) => (
                  <div key={i} className="modal-step">
                    <div className="modal-step-num">{i + 1}</div>
                    <div className="modal-step-text">{step}</div>
                  </div>
                ))}
              </div>

              {/* Tips */}
              {selected.tips?.length > 0 && (
  <div className="modal-tip">
    <strong>👨‍🍳 Chef's Tips:</strong>

    <ul>
      {selected.tips.map((tip, index) => (
        <li key={index}>{tip}</li>
      ))}
    </ul>
  </div>
)}

              {/* Actions */}
              <div className="modal-actions">
                <button className="btn-modal-action" onClick={() => { toggleFav(selected._id, { stopPropagation: () => {} }); 
                setSelected(prev => ({...prev, fav: !prev.fav})); }}>
                  {selected.fav ? "💔 Unfavourite" : "❤️ Favourite"}
                </button>
                <button className="btn-modal-action" onClick={() => window.print()}>🖨️ Print</button>
                <button
                  className="btn-modal-action danger"
                  onClick={() => { deleteRecipe(selected._id); }}
                >
                  🗑️ Remove
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}