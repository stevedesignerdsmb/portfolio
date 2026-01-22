# Portfolio

Personal portfolio website showcasing design and development work.

## Tech Stack

- **Next.js 15** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first CSS
- **AlignUI** - Design system components
- **Framer Motion** - Animation library
- **Cloudinary** - Image hosting and optimization
- **Vercel** - Deployment platform

## Getting Started

### Prerequisites

- Node.js 18+ and npm/yarn/pnpm
- Cloudinary account (for image hosting)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/stevedesignerdsmb/portfolio.git
cd portfolio
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.local.example .env.local
```

Edit `.env.local` and add your Cloudinary credentials:
```env
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

4. Run the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
portfolio/
├── src/
│   ├── app/              # Next.js App Router pages
│   │   ├── components/   # React components
│   │   └── projects/     # Dynamic project pages
│   ├── lib/              # Utilities and helpers
│   ├── data/             # JSON content files
│   └── types/            # TypeScript definitions
├── public/               # Static assets
└── ...config files
```

## Content Management

### Adding Projects

1. Upload project images to Cloudinary
2. Edit `src/data/projects.json`:
```json
{
  "id": "unique-id",
  "slug": "project-slug",
  "title": "Project Title",
  "description": "Short description",
  "longDescription": "Full description",
  "image": "portfolio/image-name",
  "images": ["portfolio/image-1", "portfolio/image-2"],
  "tags": ["Tag1", "Tag2"],
  "featured": true
}
```

### Adding Work Experience

Edit `src/data/experience.json` with your work history.

### Adding Visuals

Edit `src/data/visuals.json` with visual gallery items.

## AlignUI Setup

This project uses AlignUI for design tokens. To configure:

1. Run the AlignUI CLI:
```bash
npx @alignui/cli tailwind
```

2. Follow the prompts to configure colors, spacing, etc.

3. The CLI will update `tailwind.config.ts` and `globals.css`.

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import project in Vercel
3. Add environment variables in Vercel dashboard
4. Deploy

### Preview Deployments

Vercel automatically creates preview deployments for:
- Pull requests
- Feature branches

Each preview gets its own URL for testing.

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME` | Cloudinary cloud name | Yes |
| `CLOUDINARY_API_KEY` | Cloudinary API key | Optional |
| `CLOUDINARY_API_SECRET` | Cloudinary API secret | Optional |

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## Image Management

All images are hosted on Cloudinary:

1. Upload images via Cloudinary dashboard
2. Organize in folders (e.g., `portfolio/`)
3. Reference by public ID in JSON files
4. Use `CldImage` component for display

Example:
```tsx
import { CldImage } from '@/lib/cloudinary';

<CldImage
  src="portfolio/image-name"
  alt="Description"
  width={800}
  height={600}
/>
```

## Development Guidelines

- Use TypeScript for all new files
- Follow existing component patterns
- Use Tailwind CSS utility classes
- Add animations with Framer Motion
- Keep components modular and reusable
- See `AI_AGENT.md` for detailed guidelines

## License

All rights reserved. © 2026
