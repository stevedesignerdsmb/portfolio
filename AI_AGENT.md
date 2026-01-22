# AI Agent Instructions

This document provides guidelines for AI agents working on this portfolio project.

## Project Overview

This is a personal portfolio website built with Next.js 15, TypeScript, AlignUI design system, Cloudinary for images, and Framer Motion for animations. The portfolio is a single-page site with three main sections (Visuals, Projects, Motion) plus individual project detail pages for SEO.

## Tech Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript (strict mode)
- **Styling**: Tailwind CSS + AlignUI v1.2
- **Animations**: Framer Motion
- **Images**: Cloudinary (next-cloudinary)
- **Deployment**: Vercel with preview deployments

## Code Style & Conventions

### File Naming
- Components: PascalCase (e.g., `Hero.tsx`, `SelectedWork.tsx`)
- Utilities: camelCase (e.g., `utils.ts`, `cloudinary.ts`)
- Data files: kebab-case (e.g., `projects.json`, `experience.json`)
- Pages: Next.js App Router conventions (e.g., `page.tsx`, `layout.tsx`)

### Component Structure
- Use `'use client'` directive for client components (interactive, animations)
- Server components by default (data fetching, static content)
- Colocate components with routes when route-specific
- Shared components in `src/app/components/`

### TypeScript
- Always use TypeScript types/interfaces
- Define types in `src/types/index.ts` for shared types
- Use strict mode TypeScript configuration

### Styling
- Use Tailwind CSS utility classes
- Follow AlignUI design tokens (colors, spacing, typography)
- Use `cn()` utility from `src/lib/utils.ts` for conditional classes
- Maintain responsive design (mobile-first)

### Images
- **Always use Cloudinary** via `CldImage` component from `@/lib/cloudinary`
- Store public IDs in JSON data files (not full URLs)
- Always include `alt` text for accessibility
- Use appropriate `width` and `height` props
- Set `priority` for above-the-fold images

### Animations
- Use Framer Motion for all animations
- Prefer `motion` components over `animate` prop when possible
- Use variants for complex animations
- Keep motion components in `'use client'` components
- Lazy load heavy motion components

## Content Management

### Data Files
- Projects: `src/data/projects.json`
- Experience: `src/data/experience.json`
- Visuals: `src/data/visuals.json`

### Adding Content
1. Upload images to Cloudinary dashboard
2. Note the public ID (folder/filename)
3. Update JSON data files with public IDs
4. Commit changes

### Project Structure
```
src/
├── app/              # Next.js App Router pages
├── components/       # Shared React components
├── lib/             # Utilities and helpers
├── data/            # JSON content files
└── types/           # TypeScript type definitions
```

## SEO Guidelines

- Use Next.js `Metadata` API for page metadata
- Include proper `title` and `description` for all pages
- Use semantic HTML (`<article>`, `<section>`, etc.)
- Always include `alt` text on images
- Use proper heading hierarchy (h1 → h2 → h3)
- Generate static params for dynamic routes

## Cloudinary Usage

### Setup
1. Environment variables required:
   - `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME`
   - `CLOUDINARY_API_KEY` (optional, for uploads)
   - `CLOUDINARY_API_SECRET` (optional, for uploads)

### Image Component
```tsx
import { CldImage } from '@/lib/cloudinary';

<CldImage
  src="portfolio/image-name"
  alt="Description"
  width={800}
  height={600}
  className="rounded-lg"
  priority // for above-the-fold images
/>
```

### Image Organization
- Store images in Cloudinary folders (e.g., `portfolio/`)
- Reference by public ID in JSON files
- Use descriptive names

## Animation Guidelines

### When to Animate
- Page transitions
- Scroll-triggered section reveals
- Interactive elements (hover, click)
- Motion collection demos

### Best Practices
- Keep animations subtle and purposeful
- Use `initial`, `animate`, and `exit` props
- Prefer `whileHover` and `whileTap` for interactions
- Use `transition` for smooth animations
- Consider performance (avoid animating too many elements)

## Deployment

### Staging
- Vercel preview deployments for all branches/PRs
- Environment variables configured in Vercel dashboard
- Test on preview URLs before merging

### Production
- Deploy from `main` branch
- Ensure all environment variables are set
- Verify Cloudinary images are accessible

## Common Tasks

### Adding a New Project
1. Upload project images to Cloudinary
2. Add entry to `src/data/projects.json`
3. Include: id, slug, title, description, image, tags
4. Project page auto-generated at `/projects/[slug]`

### Adding a New Section
1. Create component in `src/app/components/`
2. Import and add to `src/app/page.tsx`
3. Add section divider if needed
4. Update types if necessary

### Modifying Styles
1. Use Tailwind classes (prefer AlignUI tokens)
2. Update `tailwind.config.ts` if adding custom tokens
3. Use `globals.css` for global styles only

## Testing Checklist

Before committing:
- [ ] TypeScript compiles without errors
- [ ] No ESLint errors
- [ ] Images load correctly from Cloudinary
- [ ] Animations work smoothly
- [ ] Responsive design works on mobile/tablet/desktop
- [ ] All links work correctly
- [ ] SEO metadata is correct
- [ ] Accessibility (alt text, semantic HTML)

## Questions?

When in doubt:
1. Follow existing patterns in the codebase
2. Check AlignUI documentation for design tokens
3. Refer to Next.js 15 App Router documentation
4. Use TypeScript types to guide implementation
