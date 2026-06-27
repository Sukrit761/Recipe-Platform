"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { SignInButton, SignUpButton, UserButton, useUser } from "@clerk/nextjs";
// import { useSearchParams } from "next/navigation";
import Header from "@/components/Header";
const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;1,400;1,600&family=DM+Sans:wght@300;400;500&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --cream: #faf7f2; --parch: #f3ece0; --bark: #2d1f0e;
    --umber: #4a3520; --sienna: #c8853a; --gold: #e8a55a;
    --mist: #a08060; --ink: #1a1208; --white: #ffffff;
  }

  html { scroll-behavior: smooth; }

  .lp-root {
    font-family: 'DM Sans', sans-serif;
    background: var(--cream);
    color: var(--ink);
    overflow-x: hidden;
    position: relative;
  }

  .lp-root::before {
    content: '';
    position: fixed; inset: 0;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.03'/%3E%3C/svg%3E");
    pointer-events: none; z-index: 9999; opacity: .4;
  }

  /* ── Header ── */
  .lp-header {
    position: fixed; top: 0; left: 0; right: 0; z-index: 100;
    background: rgba(250,247,242,.88);
    backdrop-filter: blur(16px);
    border-bottom: 1px solid rgba(200,133,58,.15);
  }
  .header-accent { height: 2px; background: linear-gradient(90deg,#c8853a,#e8a55a 45%,#d4955e 75%,#a07040); }
  .header-inner { max-width:1200px; margin:0 auto; padding:0 2rem; height:68px; display:flex; align-items:center; justify-content:space-between; }
  .logo { display:flex; align-items:center; gap:10px; text-decoration:none; cursor:pointer; }
  .logo-icon { width:36px;height:36px;background:var(--bark);border-radius:10px;display:flex;align-items:center;justify-content:center;font-size:18px;box-shadow:0 2px 8px rgba(45,31,14,.3); }
  .logo-name { font-family:'Cormorant Garamond',serif; font-size:1.35rem; font-weight:600; color:var(--ink); }
  .logo-tag { font-size:.6rem; letter-spacing:.12em; text-transform:uppercase; color:var(--mist); font-weight:500; }
  .lp-nav { display:flex; gap:.2rem; }
  .lp-nav a { font-size:.875rem; color:#5c4a32; text-decoration:none; padding:6px 14px; border-radius:8px; transition:background .15s,color .15s; }
  .lp-nav a:hover { background:#ede8e0; color:var(--ink); }
  .header-cta { display:flex; gap:10px; align-items:center; }
  .btn-ghost { font-family:'DM Sans',sans-serif;font-size:.875rem;color:#5c4a32;background:transparent;border:none;padding:8px 16px;border-radius:8px;cursor:pointer;transition:background .15s; }
  .btn-ghost:hover { background:#ede8e0; }
  .btn-primary { font-family:'DM Sans',sans-serif;font-size:.875rem;font-weight:500;color:var(--cream);background:var(--bark);border:none;padding:9px 22px;border-radius:8px;cursor:pointer;box-shadow:0 2px 8px rgba(45,31,14,.25);transition:background .18s,transform .12s,box-shadow .18s; }
  .btn-primary:hover { background:var(--umber);transform:translateY(-1px);box-shadow:0 6px 16px rgba(45,31,14,.3); }

  /* ── Hero ── */
  .hero { min-height:100vh;padding:130px 2rem 80px;display:flex;align-items:center;justify-content:center;position:relative;overflow:hidden; }
  .hero-bg { position:absolute;inset:0;z-index:0;background:radial-gradient(ellipse 80% 60% at 70% 40%,rgba(232,165,90,.18) 0%,transparent 70%),radial-gradient(ellipse 50% 50% at 20% 80%,rgba(200,133,58,.12) 0%,transparent 60%),var(--cream); }
  .orb { position:absolute;border-radius:50%;filter:blur(60px);pointer-events:none;z-index:0;animation:drift 8s ease-in-out infinite alternate; }
  .orb-1 { width:420px;height:420px;background:rgba(232,165,90,.14);top:-80px;right:-100px;animation-delay:0s; }
  .orb-2 { width:280px;height:280px;background:rgba(200,133,58,.1);bottom:80px;left:-60px;animation-delay:-3s; }
  .orb-3 { width:180px;height:180px;background:rgba(160,112,64,.08);top:40%;right:22%;animation-delay:-5s; }
  @keyframes drift { from{transform:translate(0,0) scale(1);}to{transform:translate(20px,30px) scale(1.05);} }

  .hero-inner { max-width:1100px;width:100%;display:grid;grid-template-columns:1fr 1fr;gap:4rem;align-items:center;position:relative;z-index:1; }
  .hero-badge { display:inline-flex;align-items:center;gap:8px;background:rgba(200,133,58,.12);border:1px solid rgba(200,133,58,.3);border-radius:100px;padding:6px 14px;font-size:.75rem;font-weight:500;color:var(--sienna);letter-spacing:.04em;margin-bottom:1.5rem;animation:fadeUp .7s ease both; }
  .badge-dot { width:6px;height:6px;border-radius:50%;background:var(--sienna);box-shadow:0 0 0 3px rgba(200,133,58,.25);animation:pulse 2s ease infinite; }
  @keyframes pulse { 0%,100%{box-shadow:0 0 0 3px rgba(200,133,58,.25);}50%{box-shadow:0 0 0 6px rgba(200,133,58,.1);} }

  .hero h1 { font-family:'Cormorant Garamond',serif;font-size:clamp(3rem,5vw,5rem);font-weight:600;line-height:1.05;color:var(--ink);letter-spacing:-.02em;animation:fadeUp .8s .1s ease both; }
  .hero h1 em { font-style:italic;color:var(--sienna); }
  .hero-sub { margin-top:1.25rem;font-size:1.05rem;font-weight:300;color:#6b5540;line-height:1.7;max-width:480px;animation:fadeUp .8s .2s ease both; }
  .hero-actions { margin-top:2rem;display:flex;gap:12px;flex-wrap:wrap;animation:fadeUp .8s .3s ease both; }
  .btn-hero { font-family:'DM Sans',sans-serif;font-size:1rem;font-weight:500;color:var(--cream);background:var(--bark);border:none;padding:14px 32px;border-radius:12px;cursor:pointer;box-shadow:0 4px 20px rgba(45,31,14,.3);transition:background .18s,transform .15s,box-shadow .18s;display:flex;align-items:center;gap:8px; }
  .btn-hero:hover { background:var(--umber);transform:translateY(-2px);box-shadow:0 8px 28px rgba(45,31,14,.35); }
  .btn-hero-outline { font-family:'DM Sans',sans-serif;font-size:1rem;color:var(--umber);background:transparent;border:1.5px solid rgba(74,53,32,.3);padding:14px 28px;border-radius:12px;cursor:pointer;transition:background .18s,border-color .18s,transform .15s;display:flex;align-items:center;gap:8px; }
  .btn-hero-outline:hover { background:rgba(74,53,32,.06);border-color:var(--umber);transform:translateY(-2px); }
  .hero-stats { margin-top:2.5rem;display:flex;gap:2rem;animation:fadeUp .8s .4s ease both; }
  .stat-item { display:flex;flex-direction:column; }
  .stat-num { font-family:'Cormorant Garamond',serif;font-size:1.8rem;font-weight:600;color:var(--ink);line-height:1; }
  .stat-label { font-size:.75rem;color:var(--mist);letter-spacing:.06em;text-transform:uppercase;margin-top:3px; }
  @keyframes fadeUp { from{opacity:0;transform:translateY(24px);}to{opacity:1;transform:translateY(0);} }

  /* ── 3D Card ── */
  .hero-visual { display:flex;justify-content:center;align-items:center;animation:fadeUp .8s .2s ease both; }
  .card-3d-wrap { perspective:1000px;width:380px;height:460px;position:relative; }
  .card-3d { width:100%;height:100%;transform-style:preserve-3d;transition:transform .1s ease-out;border-radius:24px;position:relative; }
  .card-surface { position:absolute;inset:0;background:linear-gradient(135deg,#fff8f0 0%,#fdf5ea 50%,#f8ede0 100%);border-radius:24px;border:1px solid rgba(200,133,58,.2);box-shadow:0 30px 80px rgba(45,31,14,.18),0 0 0 1px rgba(255,255,255,.8) inset,inset 0 1px 0 rgba(255,255,255,.9);overflow:hidden;padding:28px;display:flex;flex-direction:column;gap:16px; }
  .card-surface::before { content:'';position:absolute;top:-60px;right:-60px;width:200px;height:200px;background:radial-gradient(circle,rgba(232,165,90,.2) 0%,transparent 70%);border-radius:50%; }
  .recipe-card-img { width:100%;height:180px;border-radius:16px;background:linear-gradient(135deg,#f4d5a0,#e8a55a,#d4855a);display:flex;align-items:center;justify-content:center;font-size:5rem;position:relative;overflow:hidden; }
  .recipe-card-img::after { content:'';position:absolute;inset:0;background:linear-gradient(180deg,transparent 40%,rgba(45,31,14,.15)); }
  .recipe-tag { position:absolute;top:10px;left:10px;z-index:1;background:rgba(250,247,242,.9);backdrop-filter:blur(8px);border-radius:100px;padding:4px 10px;font-size:.7rem;font-weight:500;color:var(--umber);border:1px solid rgba(200,133,58,.2); }
  .recipe-card-title { font-family:'Cormorant Garamond',serif;font-size:1.4rem;font-weight:600;color:var(--ink);line-height:1.2; }
  .recipe-card-meta { display:flex;gap:16px;margin-top:8px; }
  .meta-pill { display:flex;align-items:center;gap:5px;font-size:.78rem;color:var(--mist); }
  .recipe-card-tags { display:flex;gap:6px;flex-wrap:wrap;margin-top:10px; }
  .chip { background:rgba(200,133,58,.1);border:1px solid rgba(200,133,58,.2);border-radius:100px;padding:3px 10px;font-size:.72rem;color:var(--sienna); }
  .recipe-card-footer { margin-top:auto;padding-top:14px;border-top:1px solid rgba(200,133,58,.12);display:flex;align-items:center;justify-content:space-between; }
  .ai-badge { display:flex;align-items:center;gap:6px;font-size:.75rem;color:var(--mist);font-weight:400; }
  .ai-dot { width:8px;height:8px;border-radius:50%;background:var(--sienna);animation:pulse 2s infinite; }
  .gen-btn { background:var(--bark);color:var(--cream);border:none;border-radius:8px;padding:8px 16px;font-size:.8rem;font-weight:500;cursor:pointer;font-family:'DM Sans',sans-serif;transition:background .15s,transform .12s; }
  .gen-btn:hover { background:var(--umber);transform:translateY(-1px); }
  .float-sticker { position:absolute;pointer-events:none;background:var(--white);border-radius:14px;padding:8px 12px;box-shadow:0 8px 24px rgba(45,31,14,.12);border:1px solid rgba(200,133,58,.15);font-size:.78rem;font-weight:500;color:var(--umber);display:flex;align-items:center;gap:6px;z-index:2; }
  .float-sticker.s1 { top:-18px;right:-18px;animation:floatY 3s ease-in-out infinite; }
  .float-sticker.s2 { bottom:30px;left:-30px;animation:floatY 3s ease-in-out infinite;animation-delay:-1.5s; }
  @keyframes floatY { 0%,100%{transform:translateY(0);}50%{transform:translateY(-8px);} }

  /* ── Sections ── */
  .lp-section { padding:100px 2rem; }
  .section-inner { max-width:1100px;margin:0 auto; }
  .section-eyebrow { font-size:.72rem;letter-spacing:.14em;text-transform:uppercase;color:var(--sienna);font-weight:600;margin-bottom:.75rem;display:flex;align-items:center;gap:8px; }
  .section-eyebrow::before { content:'';display:block;width:24px;height:1.5px;background:var(--sienna); }
  .section-title { font-family:'Cormorant Garamond',serif;font-size:clamp(2rem,3.5vw,3rem);font-weight:600;color:var(--ink);line-height:1.15; }
  .section-title em { font-style:italic;color:var(--sienna); }

  /* ── Steps ── */
  .steps-grid { margin-top:3.5rem;display:grid;grid-template-columns:repeat(3,1fr);gap:1.5rem; }
  .step-card { background:var(--white);border-radius:20px;padding:2rem;border:1px solid rgba(200,133,58,.14);box-shadow:0 4px 24px rgba(45,31,14,.05);position:relative;overflow:hidden;transition:transform .25s,box-shadow .25s;cursor:default; }
  .step-card:hover { transform:translateY(-6px);box-shadow:0 16px 48px rgba(45,31,14,.1); }
  .step-card::before { content:attr(data-num);position:absolute;top:-10px;right:20px;font-family:'Cormorant Garamond',serif;font-size:6rem;font-weight:600;line-height:1;color:rgba(200,133,58,.08);pointer-events:none; }
  .step-icon { width:52px;height:52px;border-radius:14px;background:linear-gradient(135deg,rgba(200,133,58,.15),rgba(232,165,90,.1));border:1px solid rgba(200,133,58,.2);display:flex;align-items:center;justify-content:center;font-size:1.5rem;margin-bottom:1.25rem; }
  .step-card h3 { font-family:'Cormorant Garamond',serif;font-size:1.3rem;font-weight:600;color:var(--ink);margin-bottom:.5rem; }
  .step-card p { font-size:.9rem;color:#6b5540;line-height:1.65;font-weight:300; }

  /* ── Bento ── */
  .bg-parch { background:var(--parch); }
  .bento-grid { margin-top:3.5rem;display:grid;grid-template-columns:repeat(12,1fr);gap:1.25rem; }
  .bento-card { background:var(--white);border-radius:20px;padding:2rem;border:1px solid rgba(200,133,58,.14);box-shadow:0 4px 24px rgba(45,31,14,.05);overflow:hidden;position:relative;transition:transform .25s,box-shadow .25s; }
  .bento-card:hover { transform:translateY(-4px);box-shadow:0 12px 40px rgba(45,31,14,.1); }
  .b1 { grid-column:span 5; }
  .b2 { grid-column:span 4; }
  .b3 { grid-column:span 3; }
  .b4 { grid-column:span 3; }
  .b5 { grid-column:span 9;background:linear-gradient(135deg,#fdf8f0,#fdf2e0);padding:2.5rem; }
  .bento-icon { font-size:2rem;margin-bottom:1rem; }
  .bento-card h3 { font-family:'Cormorant Garamond',serif;font-size:1.25rem;font-weight:600;color:var(--ink);margin-bottom:.5rem; }
  .bento-card p { font-size:.875rem;color:#6b5540;line-height:1.6;font-weight:300; }
  .ingredient-chips { display:flex;flex-wrap:wrap;gap:8px;margin-top:1rem; }
  .ingr-chip { background:var(--cream);border:1px solid rgba(200,133,58,.25);border-radius:100px;padding:6px 14px;font-size:.82rem;color:var(--umber);display:flex;align-items:center;gap:6px;animation:popIn .4s ease both; }
  @keyframes popIn { from{opacity:0;transform:scale(.8);}to{opacity:1;transform:scale(1);} }
  .ingr-chip span { cursor:pointer;color:var(--mist);font-size:.9rem; }
  .fake-input { display:flex;align-items:center;gap:10px;margin-top:12px;background:var(--white);border:1px solid rgba(200,133,58,.25);border-radius:12px;padding:10px 16px; }
  .fake-input-text { font-size:.875rem;color:var(--mist);flex:1; }
  .fake-cursor { width:2px;height:16px;background:var(--sienna);animation:blink 1s step-end infinite; }
  @keyframes blink { 50%{opacity:0;} }

  /* ── Recipe cards ── */
  .recipes-section { background:var(--parch); }
  .recipes-grid { margin-top:3rem;display:grid;grid-template-columns:repeat(3,1fr);gap:1.5rem; }
  .recipe-card-mini { background:var(--white);border-radius:20px;overflow:hidden;border:1px solid rgba(200,133,58,.12);box-shadow:0 4px 20px rgba(45,31,14,.06);transition:transform .25s,box-shadow .25s;cursor:pointer; }
  .recipe-card-mini:hover { transform:translateY(-8px) scale(1.01);box-shadow:0 20px 50px rgba(45,31,14,.13); }
  .rcm-thumb { height:160px;display:flex;align-items:center;justify-content:center;font-size:4rem;position:relative; }
  .rcm-thumb::after { content:'';position:absolute;inset:0;background:linear-gradient(180deg,transparent 40%,rgba(45,31,14,.08)); }
  .rcm-body { padding:1.25rem; }
  .rcm-cuisine { font-size:.7rem;letter-spacing:.1em;text-transform:uppercase;color:var(--sienna);font-weight:600;margin-bottom:.4rem; }
  .rcm-title { font-family:'Cormorant Garamond',serif;font-size:1.2rem;font-weight:600;color:var(--ink);line-height:1.2;margin-bottom:.5rem; }
  .rcm-meta { display:flex;gap:12px; }
  .rcm-meta-item { font-size:.78rem;color:var(--mist);display:flex;align-items:center;gap:4px; }

  /* ── Testimonials ── */
  .testi-grid { margin-top:3rem;display:grid;grid-template-columns:repeat(3,1fr);gap:1.25rem; }
  .testi-card { background:var(--white);border-radius:20px;padding:1.75rem;border:1px solid rgba(200,133,58,.12);box-shadow:0 4px 20px rgba(45,31,14,.05);transition:transform .25s; }
  .testi-card:hover { transform:translateY(-4px); }
  .testi-stars { color:var(--gold);margin-bottom:.75rem;font-size:1rem;letter-spacing:2px; }
  .testi-text { font-size:.9rem;color:#4a3520;line-height:1.7;font-weight:300;font-style:italic;margin-bottom:1rem; }
  .testi-author { display:flex;align-items:center;gap:10px; }
  .testi-avatar { width:36px;height:36px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:1.1rem;background:linear-gradient(135deg,#f4d5a0,#e8a55a); }
  .testi-name { font-weight:500;font-size:.875rem;color:var(--ink); }
  .testi-role { font-size:.75rem;color:var(--mist); }

  /* ── CTA ── */
  .cta-section { background:linear-gradient(135deg,var(--bark) 0%,var(--umber) 60%,#3a2810 100%);position:relative;overflow:hidden;padding:100px 2rem; }
  .cta-section::before { content:'';position:absolute;top:-100px;right:-100px;width:500px;height:500px;border-radius:50%;background:radial-gradient(circle,rgba(232,165,90,.12) 0%,transparent 70%);pointer-events:none; }
  .cta-section::after { content:'';position:absolute;bottom:-80px;left:-60px;width:320px;height:320px;border-radius:50%;background:radial-gradient(circle,rgba(200,133,58,.1) 0%,transparent 70%);pointer-events:none; }
  .cta-inner { max-width:700px;margin:0 auto;text-align:center;position:relative;z-index:1; }
  .cta-eyebrow { font-size:.72rem;letter-spacing:.14em;text-transform:uppercase;color:var(--gold);font-weight:600;margin-bottom:1rem;display:flex;align-items:center;justify-content:center;gap:8px; }
  .cta-eyebrow::before,.cta-eyebrow::after { content:'';display:block;width:24px;height:1px;background:var(--gold); }
  .cta-title { font-family:'Cormorant Garamond',serif;font-size:clamp(2.2rem,4vw,3.5rem);font-weight:600;color:var(--cream);line-height:1.1;margin-bottom:1rem; }
  .cta-title em { font-style:italic;color:var(--gold); }
  .cta-sub { font-size:1rem;color:rgba(250,247,242,.65);line-height:1.6;margin-bottom:2.5rem; }
  .cta-actions { display:flex;gap:12px;justify-content:center;flex-wrap:wrap; }
  .btn-cta-primary { font-family:'DM Sans',sans-serif;font-size:1rem;font-weight:500;color:var(--bark);background:var(--gold);border:none;padding:14px 36px;border-radius:12px;cursor:pointer;box-shadow:0 4px 20px rgba(232,165,90,.3);transition:background .18s,transform .15s,box-shadow .18s; }
  .btn-cta-primary:hover { background:#f0b060;transform:translateY(-2px);box-shadow:0 8px 28px rgba(232,165,90,.4); }
  .btn-cta-outline { font-family:'DM Sans',sans-serif;font-size:1rem;color:var(--cream);background:transparent;border:1.5px solid rgba(250,247,242,.3);padding:14px 28px;border-radius:12px;cursor:pointer;transition:background .18s,border-color .18s; }
  .btn-cta-outline:hover { background:rgba(250,247,242,.08);border-color:rgba(250,247,242,.5); }

  /* ── Footer ── */
  .lp-footer { background:var(--ink);color:rgba(250,247,242,.7);padding:60px 2rem 30px; }
  .footer-inner { max-width:1100px;margin:0 auto; }
  .footer-top { display:grid;grid-template-columns:2fr 1fr 1fr 1fr;gap:3rem;padding-bottom:3rem;border-bottom:1px solid rgba(250,247,242,.1); }
  .footer-brand p { font-size:.875rem;line-height:1.6;margin-top:.75rem;color:rgba(250,247,242,.5);max-width:260px; }
  .footer-col h4 { font-family:'DM Sans',sans-serif;font-size:.75rem;font-weight:500;letter-spacing:.1em;text-transform:uppercase;color:var(--gold);margin-bottom:1rem; }
  .footer-col a { display:block;font-size:.875rem;color:rgba(250,247,242,.55);text-decoration:none;margin-bottom:.6rem;transition:color .15s; }
  .footer-col a:hover { color:var(--gold); }
  .footer-bottom { display:flex;justify-content:space-between;align-items:center;padding-top:1.5rem;font-size:.8rem;color:rgba(250,247,242,.35);flex-wrap:wrap;gap:1rem; }
  .made-with { color:rgba(250,247,242,.35); }
  .made-with strong { color:rgba(250,247,242,.6); }

  /* ── Scroll reveal ── */
  .reveal { opacity:0;transform:translateY(32px);transition:opacity .7s ease,transform .7s ease; }
  .reveal.visible { opacity:1;transform:translateY(0); }

  /* ── Responsive ── */
  @media (max-width:1024px) {
    .hero-inner { grid-template-columns:1fr; }
    .hero-visual { display:none; }
    .steps-grid { grid-template-columns:1fr 1fr; }
    .b1,.b2,.b3,.b4,.b5 { grid-column:span 12; }
    .b1,.b2 { grid-column:span 6; }
    .recipes-grid { grid-template-columns:repeat(2,1fr); }
    .testi-grid { grid-template-columns:1fr 1fr; }
    .footer-top { grid-template-columns:1fr 1fr;gap:2rem; }
    .lp-nav { display:none; }
  }
  @media (max-width:640px) {
    .hero { padding:110px 1.25rem 60px; }
    .steps-grid { grid-template-columns:1fr; }
    .b1,.b2 { grid-column:span 12; }
    .recipes-grid { grid-template-columns:1fr; }
    .testi-grid { grid-template-columns:1fr; }
    .footer-top { grid-template-columns:1fr; }
    .hero-stats { gap:1.5rem; }
  }
`;

const NAV_LINKS = ["#how", "#features","#recipes", "#reviews"];
const NAV_LABELS = ["How it Works", "Features", "Recipes", "Reviews"];

const STEPS = [
  { num: "01", icon: "🥦", title: "Tell us your ingredients", desc: "Type what you have in the fridge or pantry. Our AI understands natural language — no rigid formats needed." },
  { num: "02", icon: "✦",  title: "AI crafts your recipe",   desc: "In seconds, we generate a tailored recipe with smart substitutions, nutritional info, and step-by-step guidance." },
  { num: "03", icon: "📖", title: "Save to your Cookbook",   desc: "Like what you made? Save it, tweak it, and build your own AI-curated recipe collection over time." },
];

const BENTO = [
  { cls: "b1", icon: "🌍", title: "120+ World Cuisines",    desc: "From Tokyo ramen to Oaxacan mole — our model is trained on thousands of authentic recipes across every culinary tradition." },
  { cls: "b2", icon: "🥗", title: "Dietary Intelligence",   desc: "Vegan, keto, gluten-free, or allergic to nuts? RecipeAI adapts every recipe to your exact dietary needs automatically." },
  { cls: "b3", icon: "⚡", title: "Instant Generation",     desc: "Recipes in under 3 seconds, powered by our fine-tuned culinary model." },
  { cls: "b4", icon: "📊", title: "Nutrition Tracker",      desc: "Auto-calculated macros, calories, and micronutrients for every generated recipe." },
];

const RECIPES = [
  { thumb: "🍜", bg: "linear-gradient(135deg,#fde8c0,#f4a850)", cuisine: "Japanese",      title: "Miso Ramen with Soft-Boiled Egg",  time: "40 min", serves: "2", rating: "4.9" },
  { thumb: "🥘", bg: "linear-gradient(135deg,#fcd5b0,#e87040)", cuisine: "Indian",        title: "Butter Chicken with Garlic Naan",  time: "55 min", serves: "4", rating: "4.8" },
  { thumb: "🥗", bg: "linear-gradient(135deg,#d4f0d0,#68c040)", cuisine: "Mediterranean", title: "Greek Quinoa Bowl with Tzatziki",  time: "20 min", serves: "2", rating: "4.7" },
];

const TESTIMONIALS = [
  { text: '"I opened the fridge, typed what I had, and got a restaurant-quality pasta recipe in 5 seconds. Genuinely magical."', avatar: "👩", name: "Priya Sharma",   role: "Home Cook, Mumbai" },
  { text: '"The dietary filter is incredible. I\'m lactose intolerant and every single recipe it gives me is perfectly adapted."',  avatar: "👨", name: "Luca Romano",    role: "Food Blogger, Milan" },
  { text: '"My cookbook has 80+ AI recipes now and every one has been a hit. My kids ask me to \'ask the AI\' before dinner every night."', avatar: "👩‍🍳", name: "Sarah Mitchell", role: "Parent & Amateur Chef, London" },
];

const CHIPS = ["🧅 Onions", "🧄 Garlic", "🍅 Tomatoes", "🌿 Basil", "🫒 Olive oil"];
const PHRASES = ["pasta", "chicken tikka", "vegan stir fry", "quick breakfast", "Korean BBQ"];

export default function LandingPage() {
  // 3D tilt
  const wrapRef = useRef(null);
  const cardRef = useRef(null);

  // Typewriter
  const [typeText, setTypeText] = useState("");
  const typeState = useRef({ pi: 0, ci: 0, deleting: false });

  // Scroll reveal
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  // 3D tilt handlers
  const onMouseMove = (e) => {
    const wrap = wrapRef.current;
    const inner = cardRef.current;
    if (!wrap || !inner) return;
    const r = wrap.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    inner.style.transition = "transform .1s ease-out";
    inner.style.transform = `rotateY(${x * 18}deg) rotateX(${-y * 14}deg)`;
  };
  const onMouseLeave = () => {
    const inner = cardRef.current;
    if (!inner) return;
    inner.style.transition = "transform .5s ease";
    inner.style.transform = "rotateY(0deg) rotateX(0deg)";
  };

  // Typewriter
  useEffect(() => {
    let timeout;
    const tick = () => {
      const { pi, ci, deleting } = typeState.current;
      const word = PHRASES[pi];
      if (!deleting) {
        const next = ci + 1;
        setTypeText(word.slice(0, next));
        typeState.current.ci = next;
        if (next === word.length) {
          typeState.current.deleting = true;
          timeout = setTimeout(tick, 1400);
          return;
        }
      } else {
        const next = ci - 1;
        setTypeText(word.slice(0, next));
        typeState.current.ci = next;
        if (next === 0) {
          typeState.current.deleting = false;
          typeState.current.pi = (pi + 1) % PHRASES.length;
        }
      }
      timeout = setTimeout(tick, deleting ? 60 : 100);
    };
    timeout = setTimeout(tick, 300);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <div className="lp-root">
      <style>{styles}</style>

      {/* ── Header ── */}
      <header className="lp-header">
        <div className="header-accent" />
               {/* <nav className="lp-nav">
            {NAV_LABELS.map((label, i) => (
              <a key={label} href={NAV_LINKS[i]}>{label}</a>
            ))}
          </nav> */}
           <Header/>
       
      </header>

      {/* ── Hero ── */}
      <section className="hero">
        <div className="hero-bg" />
        <div className="orb orb-1" />
        <div className="orb orb-2" />
        <div className="orb orb-3" />
        <div className="hero-inner">
          <div className="hero-text">
            <div className="hero-badge">
              <div className="badge-dot" />
              AI-Powered Recipe Generation
            </div>
            <h1>Cook anything.<br /><em>Powered</em> by<br />intelligence.</h1>
            <p className="hero-sub">
              Describe what's in your fridge, tell us your cravings, and watch our AI craft the perfect recipe — step by step, tailored to you.
            </p>
            <div className="hero-actions">
             <Link href="/generate">
               <button className="btn-hero">
                      ✦ Generate a Recipe
                </button>
              </Link>
              <button className="btn-hero-outline">▶ Watch Demo</button>
            </div>
            <div className="hero-stats">
              {[["50K+","Recipes Generated"],["120+","Cuisines Covered"],["4.9★","Avg Rating"]].map(([n,l]) => (
                <div key={l} className="stat-item">
                  <span className="stat-num">{n}</span>
                  <span className="stat-label">{l}</span>
                </div>
              ))}
            </div>
          </div>

          {/* 3D Card */}
          <div className="hero-visual">
            <div className="card-3d-wrap" ref={wrapRef} onMouseMove={onMouseMove} onMouseLeave={onMouseLeave}>
              <div className="card-3d" ref={cardRef}>
                <div className="card-surface">
                  <div className="recipe-card-img">
                    <div className="recipe-tag">AI Generated</div>
                    🍝
                  </div>
                  <div>
                    <div className="recipe-card-title">Truffle Pasta with<br />Caramelised Shallots</div>
                    <div className="recipe-card-meta">
                      <span className="meta-pill">⏱ 25 min</span>
                      <span className="meta-pill">👤 2 servings</span>
                      <span className="meta-pill">⚡ Easy</span>
                    </div>
                    <div className="recipe-card-tags">
                      {["Italian","Vegetarian","Quick"].map(t => <span key={t} className="chip">{t}</span>)}
                    </div>
                  </div>
                  <div className="recipe-card-footer">
                    <div className="ai-badge"><div className="ai-dot" /> AI crafted just now</div>
                    <button className="gen-btn">Cook This →</button>
                  </div>
                </div>
              </div>
              <div className="float-sticker s1">🧄 Garlic detected</div>
              <div className="float-sticker s2">✦ 98% match</div>
            </div>
          </div>
        </div>
      </section>

      {/* ── How it Works ── */}
      <section className="lp-section" id="how">
        <div className="section-inner">
          <div className="reveal">
            <div className="section-eyebrow">How it works</div>
            <div className="section-title">Three steps to your<br /><em>perfect</em> meal</div>
          </div>
          <div className="steps-grid">
            {STEPS.map(s => (
              <div key={s.num} className="step-card reveal" data-num={s.num}>
                <div className="step-icon">{s.icon}</div>
                <h3>{s.title}</h3>
                <p>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Features Bento ── */}
      <section className="lp-section bg-parch" id="features">
        <div className="section-inner">
          <div className="reveal">
            <div className="section-eyebrow">Features</div>
            <div className="section-title">Everything a home chef<br /><em>needs</em></div>
          </div>
          <div className="bento-grid">
            {BENTO.map(b => (
              <div key={b.cls} className={`bento-card ${b.cls} reveal`}>
                <div className="bento-icon">{b.icon}</div>
                <h3>{b.title}</h3>
                <p>{b.desc}</p>
              </div>
            ))}
            {/* Smart input bento */}
            <div className="bento-card b5 reveal">
              <div className="bento-icon">🧑‍🍳</div>
              <h3>Smart Ingredient Input</h3>
              <p>Just describe what you have — our AI figures out the rest.</p>
              <div className="ingredient-chips">
                {CHIPS.map(c => (
                  <div key={c} className="ingr-chip">{c} <span>×</span></div>
                ))}
              </div>
              <div className="fake-input">
                <div className="fake-input-text">{typeText}</div>
                <div className="fake-cursor" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Recipe Showcase ── */}
      <section className="lp-section recipes-section" id="recipes">
        <div className="section-inner">
          <div className="reveal">
            <div className="section-eyebrow">Explore Recipes</div>
            <div className="section-title">Recently <em>generated</em><br />by the community</div>
          </div>
          <div className="recipes-grid">
            {RECIPES.map(r => (
              <div key={r.title} className="recipe-card-mini reveal">
                <div className="rcm-thumb" style={{ background: r.bg }}>{r.thumb}</div>
                <div className="rcm-body">
                  <div className="rcm-cuisine">{r.cuisine}</div>
                  <div className="rcm-title">{r.title}</div>
                  <div className="rcm-meta">
                    <span className="rcm-meta-item">⏱ {r.time}</span>
                    <span className="rcm-meta-item">👤 {r.serves}</span>
                    <span className="rcm-meta-item">⭐ {r.rating}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Testimonials ── */}
      <section className="lp-section" id="reviews">
        <div className="section-inner">
          <div className="reveal">
            <div className="section-eyebrow">Reviews</div>
            <div className="section-title">Loved by home<br /><em>chefs</em> everywhere</div>
          </div>
          <div className="testi-grid">
            {TESTIMONIALS.map(t => (
              <div key={t.name} className="testi-card reveal">
                <div className="testi-stars">★★★★★</div>
                <div className="testi-text">{t.text}</div>
                <div className="testi-author">
                  <div className="testi-avatar">{t.avatar}</div>
                  <div>
                    <div className="testi-name">{t.name}</div>
                    <div className="testi-role">{t.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="cta-section">
        <div className="cta-inner reveal">
          <div className="cta-eyebrow">Start for free</div>
          <div className="cta-title">Your kitchen, <em>reimagined</em><br />with AI</div>
          <p className="cta-sub">Join 50,000+ home cooks who've transformed how they cook. No credit card required.</p>
          <div className="cta-actions">
            <button className="btn-cta-primary">✦ Start Cooking Free</button>
            <button className="btn-cta-outline">See all features →</button>
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="lp-footer">
        <div className="footer-inner">
          <div className="footer-top">
            <div className="footer-brand">
              <a href="#" className="logo">
                <div className="logo-icon">🍽️</div>
                <div>
                  <div className="logo-name" style={{ color: "var(--cream)" }}>RecipeAI</div>
                  <div className="logo-tag">Powered by AI</div>
                </div>
              </a>
              <p>Transforming everyday ingredients into extraordinary meals, one AI-generated recipe at a time.</p>
            </div>
            {[
              { heading: "Product",  links: ["Explore","Generate","My Cookbook","Pricing"] },
              { heading: "Company",  links: ["About","Blog","Careers","Press"] },
              { heading: "Legal",    links: ["Privacy","Terms","Cookies","Contact"] },
            ].map(col => (
              <div key={col.heading} className="footer-col">
                <h4>{col.heading}</h4>
                {col.links.map(l => <a key={l} href="#">{l}</a>)}
              </div>
            ))}
          </div>
          <div className="footer-bottom">
            <span>© 2026 AI-Recipe Platform. All rights reserved.</span>
            <span className="made-with">Made with ♥ by <strong>Sukrit</strong></span>
          </div>
        </div>
      </footer>
    </div>
  );
}