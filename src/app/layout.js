import { Inter, Montserrat } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["500", "700", "800", "900"],
});

export const metadata = {
  title: "Dariyush Motors | Real Renewable Power",
  description: "Dariyushmotors Pvt Ltd - Real Renewable Power Without Compromise. Vertical Axis Wind Turbines, Hybrid Solar + Wind Systems for Urban Rooftops and Commercial Use.",
  keywords: "Vertical Axis Wind Turbines, Hybrid Solar + Wind Systems, Urban Rooftop Wind, Low Noise Renewable Energy, Decentralized Power Solutions India",
  openGraph: {
    title: 'Dariyushmotors Pvt Ltd | Advanced Renewable Energy',
    description: 'Decentralized Power Solutions India - Urban-ready Vertical Axis Wind Turbines, Hybrid Systems & Clean Energy Solutions.',
    url: 'https://www.Dariyushmotors.com',
    siteName: 'Dariyush Motors',
    type: 'website',
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "EnergyBusiness",
  "name": "Dariyushmotors Pvt Ltd",
  "url": "http://www.Dariyushmotors.com",
  "telephone": "+91-9685536795",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Shiv Sadan, Jail Road",
    "addressLocality": "Vidisha",
    "addressRegion": "Madhya Pradesh",
    "postalCode": "464001",
    "addressCountry": "IN"
  },
  "foundingDate": "2024-11-22"
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={`${inter.variable} ${montserrat.variable} antialiased font-body bg-light-gray text-main`}>
        {children}
      </body>
    </html>
  );
}
