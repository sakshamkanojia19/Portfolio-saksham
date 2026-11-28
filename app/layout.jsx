import "./globals.css";
import { Inter, JetBrains_Mono, Space_Grotesk } from "next/font/google";
import Backdrop from "../components/Backdrop";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Interactions from "../components/motion/Interactions";
import { siteUrl, jsonLd } from "../lib/site";
import { profile, summary } from "../lib/content";

// Self-hosted at build time: visitors' browsers never contact Google Fonts.
const display = Space_Grotesk({ subsets: ["latin"], variable: "--font-display" });
const sans = Inter({ subsets: ["latin"], variable: "--font-sans" });
const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: ["400", "500"],
});

export const metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Saksham Kanojia — AI Engineer | RAG, Agents & Voice AI",
    template: "%s | Saksham Kanojia",
  },
  description:
    "AI engineer building production RAG, agentic workflows, and real-time voice systems. Case studies with architecture and benchmarks, plus short posts and articles.",
  authors: [{ name: profile.name, url: siteUrl }],
  creator: profile.name,
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
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0b" },
    { media: "(prefers-color-scheme: light)", color: "#fafafa" },
  ],
};
export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${display.variable} ${sans.variable} ${mono.variable}`}
      suppressHydrationWarning
    >
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
        <Backdrop />
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
                "AI engineering case studies, short posts, and technical articles by Saksham Kanojia.",
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
              description: summary,
              jobTitle: "AI Engineer",
              image: `${siteUrl}/portrait.webp`,
              sameAs: [profile.github, profile.linkedin],
              homeLocation: {
                "@type": "Place",
                name: "Delhi, India",
              },
              worksFor: {
                "@type": "Organization",
                name: "Digital Web Solutions",
              },
              alumniOf: {
                "@type": "CollegeOrUniversity",
                name: "Maharaja Surajmal Institute of Technology",
              },
              hasCredential: {
                "@type": "EducationalOccupationalCredential",
                name: "OCI Generative AI Certified",
                recognizedBy: { "@type": "Organization", name: "Oracle" },
              },
              knowsAbout: [
                "Retrieval-Augmented Generation",
                "Voice AI",
                "AI Agents",
                "Large Language Models",
                "FastAPI",
                "Full-stack development",
              ],
            }),
          }}
        />
      </body>
    </html>
  );
}
