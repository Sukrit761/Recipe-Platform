"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { SignInButton, SignUpButton, UserButton, useUser } from "@clerk/nextjs";
// import { useSearchParams } from "next/navigation";

const NAV_LINKS = [
  { href: "/explore", label: "Explore" },
  { href: "#how", label: "How it Works" },
  { href: "/cookbook", label: "My Cookbook" },
  { href: "/", label: "Home" },
  { href: "#reviews", label: "Reviews" },
];
const NAV_LABELS = ["How it Works","Features","Reviews"];

const Header = () => {
  const { isSignedIn } = useUser();
  // const searchParams = useSearchParams();
  // const openSignIn = searchParams.get("signin");
  const [menuOpen, setMenuOpen] = useState(false);


   useEffect(() => {
    const onResize = () => { if (window.innerWidth >= 768) setMenuOpen(false); };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);
 
  // Prevent body scroll when drawer is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);
 return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;600&family=DM+Sans:wght@300;400;500&display=swap');
 
        .header-root { font-family: 'DM Sans', sans-serif; }
 
        /* ── Sticky shell ── */
        .header-wrap {
          position: sticky;
          top: 0;
          z-index: 50;
          background: #faf7f2;
          border-bottom: 1px solid #e8e0d4;
        }
 
        .header-accent {
          height: 2px;
          background: linear-gradient(90deg, #c8853a 0%, #e8a55a 40%, #d4955e 70%, #a07040 100%);
        }
 
        /* ── Top bar ── */
        .header-inner {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 2rem;
          height: 68px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 1.5rem;
        }
 
        /* ── Logo ── */
        .logo-link {
          display: flex;
          align-items: center;
          gap: 10px;
          text-decoration: none;
          flex-shrink: 0;
        }
        .logo-icon {
          width: 36px; height: 36px;
          background: #2d1f0e;
          border-radius: 10px;
          display: flex; align-items: center; justify-content: center;
          font-size: 18px; line-height: 1; flex-shrink: 0;
          box-shadow: 0 2px 8px rgba(45,31,14,.25);
        }
        .logo-text { display: flex; flex-direction: column; line-height: 1.1; }
        .logo-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.35rem; font-weight: 600;
          color: #1a1208; letter-spacing: -0.01em;
        }
        .logo-sub {
          font-size: 0.62rem; font-weight: 500;
          color: #a08060; letter-spacing: 0.12em; text-transform: uppercase;
        }
 
        /* ── Desktop nav ── */
        .nav-links {
          display: flex; align-items: center;
          gap: 0.25rem; flex: 1; justify-content: center;
        }
        .nav-link {
          font-size: 0.875rem; font-weight: 400;
          color: #5c4a32; text-decoration: none;
          padding: 6px 14px; border-radius: 8px;
          transition: background .15s, color .15s;
          letter-spacing: 0.01em; white-space: nowrap;
        }
        .nav-link:hover { background: #ede8e0; color: #1a1208; }
 
        /* ── Auth area ── */
        .auth-area {
          display: flex; align-items: center;
          gap: 10px; flex-shrink: 0;
        }
        .btn-signin {
          font-family: 'DM Sans', sans-serif;
          font-size: 0.875rem; font-weight: 400;
          color: #5c4a32; background: transparent; border: none;
          padding: 8px 16px; border-radius: 8px; cursor: pointer;
          transition: background .15s, color .15s; letter-spacing: 0.01em;
          white-space: nowrap;
        }
        .btn-signin:hover { background: #ede8e0; color: #1a1208; }
        .btn-signup {
          font-family: 'DM Sans', sans-serif;
          font-size: 0.875rem; font-weight: 500;
          color: #faf7f2; background: #2d1f0e; border: none;
          padding: 8px 20px; border-radius: 8px; cursor: pointer;
          transition: background .18s, transform .12s, box-shadow .18s;
          letter-spacing: 0.01em;
          box-shadow: 0 1px 4px rgba(45,31,14,.2);
          white-space: nowrap;
        }
        .btn-signup:hover {
          background: #4a3520;
          transform: translateY(-1px);
          box-shadow: 0 4px 12px rgba(45,31,14,.28);
        }
        .btn-signup:active { transform: translateY(0); }
 
        .auth-divider { width: 1px; height: 20px; background: #d8d0c4; }
 
        /* ── Hamburger button ── */
        .hamburger {
          display: none;
          flex-direction: column; justify-content: center; align-items: center;
          gap: 5px; width: 40px; height: 40px;
          background: transparent; border: none; cursor: pointer;
          border-radius: 8px; padding: 8px;
          transition: background .15s;
          flex-shrink: 0;
        }
        .hamburger:hover { background: #ede8e0; }
        .hamburger span {
          display: block; width: 20px; height: 1.5px;
          background: #2d1f0e; border-radius: 2px;
          transition: transform .25s ease, opacity .2s ease;
          transform-origin: center;
        }
        .hamburger.open span:nth-child(1) { transform: translateY(6.5px) rotate(45deg); }
        .hamburger.open span:nth-child(2) { opacity: 0; transform: scaleX(0); }
        .hamburger.open span:nth-child(3) { transform: translateY(-6.5px) rotate(-45deg); }
 
        /* ── Mobile drawer ── */
        .mobile-drawer {
          position: fixed;
          top: 70px; /* below header */
          left: 0; right: 0;
          background: #faf7f2;
          border-bottom: 1px solid #e8e0d4;
          z-index: 49;
          overflow: hidden;
          max-height: 0;
          transition: max-height .3s cubic-bezier(.4,0,.2,1), box-shadow .3s;
        }
        .mobile-drawer.open {
          max-height: 420px;
          box-shadow: 0 8px 32px rgba(45,31,14,.12);
        }
        .mobile-drawer-inner {
          padding: 1rem 1.25rem 1.5rem;
          display: flex; flex-direction: column; gap: 2px;
        }
 
        /* Mobile nav links */
        .mobile-nav-link {
          font-size: 1rem; font-weight: 400;
          color: #5c4a32; text-decoration: none;
          padding: 12px 14px; border-radius: 10px;
          transition: background .15s, color .15s;
          display: flex; align-items: center;
        }
        .mobile-nav-link:hover { background: #ede8e0; color: #1a1208; }
 
        .mobile-divider {
          height: 1px; background: #e8e0d4;
          margin: 10px 0;
        }
 
        /* Mobile auth buttons */
        .mobile-auth {
          display: flex; flex-direction: column; gap: 8px;
          padding-top: 2px;
        }
        .btn-mobile-signin {
          font-family: 'DM Sans', sans-serif;
          font-size: 0.9375rem; font-weight: 400;
          color: #5c4a32; background: #ede8e0; border: none;
          padding: 12px 16px; border-radius: 10px; cursor: pointer;
          transition: background .15s; text-align: center; width: 100%;
        }
        .btn-mobile-signin:hover { background: #e0d8cc; }
        .btn-mobile-signup {
          font-family: 'DM Sans', sans-serif;
          font-size: 0.9375rem; font-weight: 500;
          color: #faf7f2; background: #2d1f0e; border: none;
          padding: 12px 16px; border-radius: 10px; cursor: pointer;
          transition: background .18s; text-align: center; width: 100%;
          box-shadow: 0 2px 8px rgba(45,31,14,.2);
        }
        .btn-mobile-signup:hover { background: #4a3520; }
 
        /* ── Overlay ── */
        .drawer-overlay {
          display: none;
          position: fixed; inset: 0;
          background: rgba(26,18,8,.25);
          z-index: 48;
          backdrop-filter: blur(2px);
          animation: fadeIn .2s ease;
        }
        .drawer-overlay.open { display: block; }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
 
        /* ── Tablet (768px – 1024px): tighter spacing ── */
        @media (max-width: 1024px) {
          .header-inner { gap: 1rem; padding: 0 1.5rem; }
          .nav-link { padding: 6px 10px; font-size: 0.8125rem; }
          .btn-signin { padding: 8px 12px; }
          .btn-signup { padding: 8px 14px; }
          .logo-sub { display: none; }
        }
 
        /* ── Mobile (< 768px): hamburger takes over ── */
        @media (max-width: 767px) {
          .nav-links { display: none; }
          .auth-area { display: none; }
          .hamburger { display: flex; }
          .header-inner { padding: 0 1.25rem; gap: 0.75rem; }
          .logo-sub { display: none; }
        }
      `}</style>
 
      {/* Overlay */}
      <div
        className={`drawer-overlay${menuOpen ? " open" : ""}`}
        onClick={() => setMenuOpen(false)}
      />
 
      <header className="header-root header-wrap">
        <div className="header-accent" />
        <div className="header-inner">
 
          {/* Logo */}
          <Link href="/" className="logo-link" onClick={() => setMenuOpen(false)}>
            <div className="logo-icon">🍽️</div>
            <div className="logo-text">
              <span className="logo-title">RecipeAI</span>
              <span className="logo-sub">Powered by AI</span>
            </div>
          </Link>
 
          {/* Desktop nav */}
          <nav className="nav-links">
            {NAV_LINKS.map(({ href, label }) => (
              <Link key={href} href={href} className="nav-link">{label}</Link>
            ))}
          </nav>
 
          {/* Desktop auth */}

          <div className="auth-area">
                   {!isSignedIn ? (
    <>
      <SignInButton mode="modal">
        <button className="btn-signin">
          Sign In
        </button>
      </SignInButton>

      <div className="auth-divider" />

      <SignUpButton mode="modal">
        <button className="btn-signup">
          Get Started
        </button>
      </SignUpButton>
    </>
  ) : (
    <UserButton
      appearance={{
        elements: {
          avatarBox: "w-9 h-9",
        },
      }}
    />
  )}
</div>
          {/* Hamburger (mobile only) */}
          <button
            className={`hamburger${menuOpen ? " open" : ""}`}
            onClick={() => setMenuOpen((o) => !o)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
          >
            <span /><span /><span />
          </button>
 
        </div>
      </header>
 
      {/* Mobile slide-down drawer */}
   <div
  className={`mobile-drawer${menuOpen ? " open" : ""}`}
  aria-hidden={!menuOpen}
>
  <div className="mobile-drawer-inner">

    {NAV_LINKS.map(({ href, label }) => (
      <Link
        key={href}
        href={href}
        className="mobile-nav-link"
        onClick={() => setMenuOpen(false)}
      >
        {label}
      </Link>
    ))}

    {!isSignedIn && (
      <>
        <div className="mobile-divider" />

        <div className="mobile-auth">

          <SignInButton mode="modal">
            <button
              className="btn-mobile-signin"
              onClick={() => setMenuOpen(false)}
            >
              Sign In
            </button>
          </SignInButton>

          <SignUpButton mode="modal">
            <button
              className="btn-mobile-signup"
              onClick={() => setMenuOpen(false)}
            >
              Get Started
            </button>
          </SignUpButton>

        </div>
      </>
    )}

    {isSignedIn && (
      <>
        <div className="mobile-divider" />

        <div style={{ padding: "8px 14px" }}>
          <UserButton
            appearance={{
              elements: {
                avatarBox: "w-9 h-9",
              },
            }}
          />
        </div>
      </>
    )}

  </div>
</div>
    </>
  );
};

export default Header;