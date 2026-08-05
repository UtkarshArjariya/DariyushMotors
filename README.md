# Dariyush Motors

Dariyush Motors is a responsive, single-page marketing website for **Dariyushmotors Pvt Ltd**, a renewable-energy company focused on Vertical Axis Wind Turbine (VAWT) technology for urban, rooftop, and low-wind environments in India.

The site presents the company’s renewable-energy solutions, explains how omnidirectional vertical-axis turbines work, and gives prospective customers a way to request a quote.

## Website Overview

The landing page is organized into the following sections:

- **Hero** – Introduces the company’s next-generation renewable-energy offering with calls to action for requesting a quote, exploring products, and downloading the product brochure.
- **About and capabilities** – Describes the company’s focus on decentralized power and highlights four core benefits:
  - Omnidirectional wind capture
  - Low-maintenance, ground-level generator access
  - Suitability for urban and turbulent wind conditions
  - Compatibility with solar-hybrid systems
- **How it works** – Explains the four-stage energy-generation process:
  1. Wind capture from any direction
  2. Vertical rotor rotation
  3. Ground-level power generation
  4. Energy storage or grid supply
- **Solutions** – Presents three solution categories:
  - 3kW / 5kW Vertical Axis Wind Turbines
  - 1–3kW Tulip Turbines
  - Hybrid systems with controllers, solar panels, and lithium-battery solutions
- **Contact and quote request** – Displays the Vidisha head-office address, phone and WhatsApp numbers, email address, and a capacity-selection inquiry form.
- **Footer** – Provides navigation links, company registration details, and social/contact placeholders.

## User Experience and Design

- Responsive layout for desktop, tablet, and mobile screens.
- Mobile navigation menu with open/close behavior.
- Sticky glass-effect navigation bar that changes appearance while scrolling.
- GSAP entrance animations and scroll-triggered fade-up animations.
- Animated turbine illustration in the hero area.
- Dark teal, green, and light-surface color palette aligned with the renewable-energy theme.
- Accessible labels for the mobile menu and social links, semantic sections, and responsive controls.
- Next.js Image optimization for the remote hero image.

## Current Implementation Notes

- The inquiry form is currently a **front-end demonstration**. On submit, it displays a temporary “Message Sent!” state and resets after a short delay; it does not yet send the form data to a backend, email provider, CRM, or API.
- The product “View Details” buttons are presentational and do not currently navigate to product-detail pages.
- LinkedIn, Twitter, privacy-policy, and terms-of-service links are placeholders and should be replaced with production URLs before launch.
- The hero image is loaded from Unsplash, and the brochure button links to the hosted Dariyush Motors PDF presentation.
- The website metadata and JSON-LD organization schema are defined in `src/app/layout.js`, including the company name, India locale, contact details, address, incorporation date, and CIN.

## Technical Stack

- **Next.js 16** with the App Router
- **React 19**
- **Tailwind CSS 4** through `@tailwindcss/postcss`
- **GSAP** and `ScrollTrigger` for motion and scroll animations
- **Lucide React** for interface icons
- **pnpm 10.33.0** for package management
- **ESLint 9** with the Next.js ESLint configuration

## Project Structure

```text
v1/
├── public/                    # Public assets
├── src/app/
│   ├── globals.css            # Tailwind theme and custom global styles
│   ├── layout.js              # Root layout, metadata, and organization schema
│   └── page.js                # Main single-page website
├── next.config.mjs            # Next.js image configuration
├── package.json               # Scripts and dependencies
├── pnpm-lock.yaml             # Locked dependency graph
└── pnpm-workspace.yaml        # pnpm package-age policy
```

## Useful Commands

Run these commands from the `v1` directory:

```bash
pnpm dev       # Start the local development server
pnpm lint      # Run ESLint
pnpm build     # Create a production build
pnpm start     # Serve the production build locally
```

## Deployment Considerations

Before deploying the production site:

1. Connect the inquiry form to a secure server-side endpoint or form service.
2. Replace placeholder social, privacy, and terms links.
3. Confirm that the brochure URL and external Unsplash image are available in production.
4. Review the company contact details and structured metadata for accuracy.
5. Run `pnpm lint` and `pnpm build` as part of the deployment pipeline.

## Getting Started

### Requirements

- Node.js 20 or newer recommended
- pnpm 10.33.0 or a compatible pnpm 10 release

The project declares its package manager in `package.json` and enforces a minimum package release age of 10 days through `pnpm-workspace.yaml`.

### Install dependencies

```bash
cd v1
pnpm install
```

### Start the development server

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Create and run a production build

```bash
pnpm build
pnpm start
```

The production server is available at [http://localhost:3000](http://localhost:3000) after the build completes.
