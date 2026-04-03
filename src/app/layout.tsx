import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'SHIVAM JOSHI — AI Engineer | GenAI Developer',
  description:
    'Portfolio of Shivam Joshi — AI Engineer at TCS, GenAI Developer, Multi-Agent Pipeline Architect. Building intelligent systems that think, reason, and deliver.',
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
  ],
  authors: [{ name: 'Shivam Joshi' }],
  openGraph: {
    title: 'SHIVAM JOSHI — AI Engineer',
    description: 'GenAI Developer • AI Engineer • Problem Solver',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
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
