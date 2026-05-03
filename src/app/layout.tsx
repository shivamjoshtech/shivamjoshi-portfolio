import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: {
  default: '⚡ SHIVAM JOSHI — AI Engineer',
  template: '%s | Shivam Joshi',
},
  description:
    'Portfolio of Shivam Joshi — AI Engineer at TCS, GenAI Developer, Multi-Agent Pipeline Architect. Building intelligent systems that think, reason, and deliver. Expertise in Python, LangChain, LLMs, Geospatial AI.',
  keywords: [
    'Shivam Joshi',
    'AI Engineer',
    'GenAI Developer',
    'LLM',
    'Multi-Agent',
    'TCS',
    'Portfolio',
    'Python',
    'Machine Learning',
    'LangChain',
    'Geospatial AI',
    'RAG',
    'Agentic AI',
  ],
  authors: [{ name: 'Shivam Joshi', url: 'https://github.com/shivamjoshtech' }],
  creator: 'Shivam Joshi',
  openGraph: {
    title: 'SHIVAM JOSHI — AI Engineer | GenAI Developer',
    description: 'Building intelligent systems that think, reason, and deliver. AI Engineer @ TCS with expertise in LLMs, Multi-Agent Pipelines, and Geospatial AI.',
    type: 'website',
    locale: 'en_US',
    siteName: 'Shivam Joshi Portfolio',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SHIVAM JOSHI — AI Engineer',
    description: 'GenAI Developer • Multi-Agent Pipeline Architect • Problem Solver',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
icons: {
  icon: [
    { url: '/favicon.ico' },
    { url: '/icon.png', type: 'image/png' },
  ],
  shortcut: '/favicon.ico',
},
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <meta name="theme-color" content="#0d1117" />
      </head>
      <body className="bg-base-900 text-base-300 font-body antialiased">
        {/* Scan line overlay */}
        <div className="scan-overlay" />
        {/* Noise texture */}
        <div className="noise-overlay" />
        {/* Vignette */}
        <div className="vignette" />
        {/* Tactical grid background */}
        <div className="fixed inset-0 bg-tactical-grid bg-grid-md pointer-events-none z-0" />

        {/* Main content */}
        <main className="relative z-10">{children}</main>
      </body>
    </html>
  );
}