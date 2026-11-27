import "./globals.css";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Interactions from "../components/motion/Interactions";
import { siteUrl, jsonLd } from "../lib/site";
import { profile } from "../lib/content";
export const metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Saksham Kanojia — AI Engineer | RAG, Agents & Voice AI",
    template: "%s | Saksham Kanojia",
  },
  description:
    "AI engineer building production RAG, agentic workflows, and real-time voice systems. Explore Nexus, CollabDocs, and opportunities to work together.",
  alternates: { canonical: "/", types: { "application/rss+xml": "/feed.xml" } },
  openGraph: {
    type: "website",
    locale: "en_IN",
    siteName: "Saksham Kanojia",
    images: [{ url: "/opengraph-image", width: 1200, height: 630 }],
  },
  twitter: { card: "summary_large_image" },
  robots: { maxImagePreview: "large", maxSnippet: -1, maxVideoPreview: -1 },
  icons: { icon: "/SK9.png", apple: "/SK9.png" },
};
export const viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0a0b09",
};
export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `document.documentElement.classList.add('js');try{document.documentElement.dataset.theme=localStorage.getItem('portfolio-theme')||'dark'}catch(e){document.documentElement.dataset.theme='dark'}`,
          }}
        />
      </head>
      <body>
        <a className="skip-link" href="#main">
          Skip to content
        </a>
        <Interactions />
        <Header />
        <main id="main">{children}</main>
        <Footer />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: jsonLd({
              "@context": "https://schema.org",
              "@type": "WebSite",
              "@id": `${siteUrl}/#website`,
              url: siteUrl,
              name: "Saksham Kanojia",
              description:
                "AI engineering projects, short posts, and technical articles by Saksham Kanojia.",
              publisher: { "@id": `${siteUrl}/#person` },
              inLanguage: "en",
            }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: jsonLd({
              "@context": "https://schema.org",
              "@type": "Person",
              "@id": `${siteUrl}/#person`,
              name: profile.name,
              url: siteUrl,
              jobTitle: "AI Engineer",
              image: `${siteUrl}/portrait.webp`,
              sameAs: [profile.github, profile.linkedin],
              worksFor: {
                "@type": "Organization",
                name: "Digital Web Solutions",
              },
              alumniOf: {
                "@type": "CollegeOrUniversity",
                name: "Maharaja Surajmal Institute of Technology",
              },
              knowsAbout: [
                "Retrieval-Augmented Generation",
                "Voice AI",
                "AI Agents",
                "Full-stack development",
              ],
            }),
          }}
        />
      </body>
    </html>
  );
}
