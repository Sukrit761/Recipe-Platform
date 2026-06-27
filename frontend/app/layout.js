import {Inter} from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import Header from "@/components/Header";
// import { dark, neobrutalism } from "@clerk/themes";
import { dark, neobrutalism } from '@clerk/ui/themes'


const inter=Inter({subsets:['latin']})

export const metadata = {
  title: "AI-Recipe Platform",
  description: "AI-powered recipe platform that generates personalized recipes based on user preferences and dietary restrictions.",
};

export default function RootLayout({ children }) {
  return (

  <ClerkProvider
   appearance={{
  
    signIn: { theme: neobrutalism },
    signUp: { theme: neobrutalism },
  }}
>

  
    <html
      lang="en"
    >
      <body className={`${inter.className} h-full antialiased`}>
        <Header />
        <main className="min-h-screen">
          {children}

        </main>
    {/* <footer className="lp-footer">
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
      </footer> */}
      </body>
    </html>

  </ClerkProvider>
  );
}
