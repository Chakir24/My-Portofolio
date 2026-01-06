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
├── app/
│   ├── layout.tsx      # Root layout with metadata
│   ├── page.tsx        # Home page
│   ├── blog/
│   │   └── page.tsx    # Blog page
│   ├── hire/
│   │   └── page.tsx    # Hire page
│   └── globals.css     # Global styles import
├── components/
│   ├── Header.tsx      # Navigation header
│   ├── Footer.tsx      # Footer component
│   └── Background.tsx # Animated background bubbles
├── hooks/
│   └── useScrollActive.ts # Scroll-based active link hook
├── public/             # Static assets (images)
└── style.css           # Main stylesheet
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

## Notes

- Images are stored in the `public/` directory
- Styles are imported globally via `app/globals.css`
- The project uses the Next.js App Router architecture
- All components are client-side by default (using 'use client' directive where needed)

## License

All Rights Reserved - Chakir BOUSSARI
