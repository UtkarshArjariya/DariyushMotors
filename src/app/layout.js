import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

export const metadata = {
  title: 'Dariyush Motors | Advanced Vertical Axis Wind Turbines',
  description:
    'Pioneering decentralized renewable energy in India. Advanced Vertical Axis Wind Turbines built for urban, rooftop, and low-wind environments.',
  metadataBase: new URL('https://www.dariyushmotors.com'),
  openGraph: {
    title: 'Dariyush Motors | Advanced Vertical Axis Wind Turbines',
    description:
      'Advanced Vertical Axis Wind Turbines built for urban, rooftop, and low-wind environments.',
    url: 'https://www.dariyushmotors.com',
    siteName: 'Dariyush Motors',
    locale: 'en_IN',
    type: 'website',
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Corporation',
  name: 'Dariyushmotors Pvt Ltd',
  alternateName: 'Dariyush Motors',
  url: 'https://www.dariyushmotors.com',
  logo: 'https://www.dariyushmotors.com/icon.png',
  contactPoint: {
    '@type': 'ContactPoint',
    telephone: '+91 9685536795',
    contactType: 'customer service',
    areaServed: 'IN',
    availableLanguage: ['en', 'hi'],
  },
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Shiv Sadan, Jail Road',
    addressLocality: 'Vidisha',
    addressRegion: 'Madhya Pradesh',
    postalCode: '464001',
    addressCountry: 'IN',
  },
  foundingDate: '2024-11-22',
  taxID: 'U27100MP2024PTC073691',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`scroll-smooth ${inter.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="bg-surface text-secondary font-sans antialiased selection:bg-accent selection:text-primary">
        {children}
      </body>
    </html>
  );
}
