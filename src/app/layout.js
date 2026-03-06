import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

export const metadata = {
  title: 'Dariyush Motors | Advanced Vertical Axis Wind Turbines',
  description: 'Pioneering decentralized renewable energy in India. Advanced Vertical Axis Wind Turbines built for urban, rooftop, and low-wind environments.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`scroll-smooth ${inter.variable}`}>
      <head>
        <script type="application/ld+json" src="/schema.json" async></script>
      </head>
      <body className="bg-surface text-secondary font-sans antialiased selection:bg-accent selection:text-primary">
        {children}
      </body>
    </html>
  );
}
