# My Portfolio - Next.js Version

This is a modern portfolio website built with Next.js, React, and TypeScript. It has been converted from a static HTML/CSS/JavaScript website to a Next.js application.

## Features

- 🚀 Built with Next.js 14 (App Router)
- ⚛️ React 18 with TypeScript
- 🎨 Responsive design with custom CSS
- 🌓 Dark/Light theme toggle
- 📱 Mobile-friendly navigation
- 📄 Multiple pages: Home, Blog, Hire
- 🎯 Smooth scrolling and animations

## Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
npm run build
npm start
```

## Project Structure

```
├── app/                    # Next.js App Router
│   ├── admin/             # Admin dashboard pages
│   ├── api/               # API routes
│   ├── blog/              # Blog page
│   ├── hire/              # Hire page
│   ├── styles/            # Stylesheets
│   │   └── style.css      # Main stylesheet
│   ├── globals.css        # Global styles import
│   ├── layout.tsx         # Root layout with metadata
│   ├── page.tsx           # Home page
│   └── providers.tsx      # Context providers
├── components/            # React components
│   ├── Header.tsx         # Navigation header
│   ├── Footer.tsx         # Footer component
│   └── Background.tsx     # Animated background bubbles
├── contexts/              # React contexts
│   └── LanguageContext.tsx
├── hooks/                 # Custom React hooks
│   └── useScrollActive.ts
├── lib/                   # Utility libraries
│   ├── auth.ts            # NextAuth configuration
│   └── prisma.ts          # Prisma client
├── locales/               # Internationalization
│   ├── en.json
│   └── fr.json
├── prisma/                # Database schema and migrations
│   ├── migrations/
│   └── schema.prisma
├── public/                # Static assets (images)
├── scripts/               # Build and setup scripts
├── docs/                  # Documentation
└── archive/               # Archived files (old HTML version)
```

## Key Features

### Theme Toggle
The theme toggle persists user preference in localStorage and switches between dark and light modes.

### Navigation
- Smooth scrolling to sections
- Active link highlighting based on scroll position
- Mobile-responsive hamburger menu

### Pages
- **Home**: Main portfolio page with sections for education, skills, and contact
- **Blog**: Technical blog posts about web development
- **Hire**: Project submission form and process information

## Technologies Used

- Next.js 14
- React 18
- TypeScript
- CSS3 (Custom styles)
- Boxicons (Icon library)
- Google Fonts (Matemasie)

## Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint

## Documentation

Additional documentation is available in the `docs/` directory:
- `docs/QUICK_START_POSTGRES.md` - Quick start guide for PostgreSQL setup
- `docs/POSTGRES_SETUP.md` - Complete PostgreSQL setup guide
- `docs/VERCEL_DEPLOY.md` - Vercel deployment guide
- `docs/ADMIN.md` - Admin panel documentation

## Documentation

Additional documentation is available in the `docs/` directory:
- `docs/QUICK_START_POSTGRES.md` - Quick start guide for PostgreSQL setup
- `docs/POSTGRES_SETUP.md` - Complete PostgreSQL setup guide
- `docs/VERCEL_DEPLOY.md` - Vercel deployment guide
- `docs/ADMIN.md` - Admin panel documentation

## Notes

- Images are stored in the `public/` directory
- Styles are imported globally via `app/globals.css`
- The project uses the Next.js App Router architecture
- All components are client-side by default (using 'use client' directive where needed)
- Old HTML files are archived in the `archive/` directory
- Old HTML files are archived in the `archive/` directory

## License

All Rights Reserved - Chakir BOUSSARI
