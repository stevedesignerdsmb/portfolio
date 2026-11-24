import type { MetadataRoute } from 'next';
import { projects, site } from '@/content/site';

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const pages = ['', '/projects', '/about', '/playground', '/cv'].map((path) => ({
    url: `${site.url}${path}`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: path === '' ? 1 : 0.8,
  }));
  const cases = projects.map((p) => ({
    url: `${site.url}/work/${p.slug}`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: p.kind === 'work' ? 0.9 : 0.6,
  }));
  return [...pages, ...cases];
}
