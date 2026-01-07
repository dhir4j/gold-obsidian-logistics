# Waynex Logistics

A premium logistics and shipping website built with Next.js 16, featuring a sophisticated dark theme with gold accents. This project combines modern web technologies with elegant design to create a professional logistics platform.

## 🌟 Features

### Pages
- **Homepage** - Hero section, stats, services overview, testimonials, and CTA
- **About Us** - Company story, mission, vision, values, and milestones
- **Services** - Detailed service offerings and delivery types
- **Tracking** - Real-time shipment tracking interface
- **Contact** - Contact form, business information, and inquiry submission

### Design & Theme
- Premium dark theme with gold (#C5A059) accents
- Custom scrollbar styling
- Glass-morphism effects
- Smooth animations and transitions
- Fully responsive design (mobile-first)
- Accessibility features (reduced motion support, focus indicators)

### Technologies
- **Framework**: Next.js 16 (App Router)
- **Styling**: Tailwind CSS v4
- **TypeScript**: Full type safety
- **Fonts**: Cormorant Garamond (serif) + Montserrat (sans-serif)
- **Icons**: Lucide React
- **Animations**: Framer Motion & GSAP ready

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ and npm

### Installation

1. Navigate to the project directory:
```bash
cd waynex-logistics
```

2. Install dependencies (already installed):
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

### Building for Production

```bash
npm run build
npm start
```

## 📁 Project Structure

```
waynex-logistics/
├── app/
│   ├── about/          # About page
│   ├── contact/        # Contact page
│   ├── services/       # Services page
│   ├── tracking/       # Tracking page
│   ├── layout.tsx      # Root layout
│   ├── page.tsx        # Homepage
│   └── globals.css     # Global styles
├── components/
│   ├── home/           # Homepage sections
│   │   ├── HeroSection.tsx
│   │   ├── StatsSection.tsx
│   │   ├── ServicesSection.tsx
│   │   ├── WhyChooseSection.tsx
│   │   ├── TestimonialsSection.tsx
│   │   └── CTASection.tsx
│   ├── Navbar.tsx      # Navigation with mobile menu
│   ├── Footer.tsx      # Footer component
│   └── Loader.tsx      # Page loader
├── lib/
│   └── config.ts       # Brand configuration & content
└── public/             # Static assets
```

## 🎨 Customization

### Brand Configuration

Edit `/lib/config.ts` to customize:
- Company name, tagline, contact info
- Services and delivery types
- Statistics and testimonials
- Navigation menu items
- Social media links

```typescript
export const BRAND = {
  name: "Waynex Logistics",
  short: "WX",
  tagline: "DELIVERING EXCELLENCE, EVERY MILE.",
  // ... more config
};
```

### Color Scheme

The theme uses CSS custom properties defined in `globals.css`:
- `--bg`: #121212 (Background)
- `--fg`: #F5F5F0 (Foreground)
- `--gold`: #C5A059 (Brand Gold)

To change colors, update these values in `globals.css` and the Tailwind theme config.

### Fonts

Currently using:
- **Serif**: Cormorant Garamond (headings, logo)
- **Sans**: Montserrat (body text, UI)

Change fonts by updating the Google Fonts import in `globals.css`.

## 🌐 Pages Overview

### Homepage (/)
- Hero with call-to-action and feature cards
- Company statistics
- Services overview grid
- Why choose us section
- Client testimonials
- Contact CTA

### About (/about)
- Company story and history
- Mission and vision statements
- Core values
- Timeline of key milestones

### Services (/services)
- 6 main service offerings with features
- Industry-specific delivery types
- How it works process
- Service CTA

### Tracking (/tracking)
- Shipment tracking form
- Real-time status display
- Delivery timeline visualization
- Current location tracking

### Contact (/contact)
- Contact information (phone, email, address)
- Business hours
- Contact form with validation
- Subject categorization

## 🎯 Design Philosophy

This project adapts a premium template design with:
- **Premium aesthetics**: Elegant serif typography, sophisticated color palette
- **Logistics-focused content**: Tailored for shipping and logistics industry
- **User experience**: Clear navigation, intuitive tracking, easy contact
- **Performance**: Static generation, optimized images, minimal JavaScript
- **Accessibility**: ARIA labels, keyboard navigation, reduced motion support

## 📦 Content Structure

All content is centralized in `/lib/config.ts` for easy management:
- `BRAND` - Company branding information
- `SERVICES` - Service offerings (6 main services)
- `DELIVERY_TYPES` - Industry-specific delivery types
- `STATS` - Company statistics
- `WHY_CHOOSE_US` - Competitive advantages
- `TESTIMONIALS` - Client feedback
- `NAVIGATION` - Menu items

## 🔧 Tech Stack Details

- **Next.js 16**: Latest App Router, React Server Components
- **Tailwind CSS v4**: New @tailwindcss/postcss architecture
- **TypeScript**: Strict mode for type safety
- **Lucide React**: Modern, customizable icon library
- **GSAP & Framer Motion**: Animation libraries (installed, ready to use)

## 🚦 Development Commands

```bash
npm run dev          # Start dev server at localhost:3000
npm run build        # Production build
npm start           # Serve production build
npm run lint        # Run ESLint
```

## 📝 License

This is a custom-built project for Waynex Logistics.

---

**Waynex Logistics** - Delivering Excellence, Every Mile.
