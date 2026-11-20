import type { MetadataRoute } from 'next';
import { site } from '@/content/site';

// Open to search engines and AI assistants alike: being found and cited is the point.
const aiAgents = ['GPTBot', 'OAI-SearchBot', 'ChatGPT-User', 'ClaudeBot', 'Claude-User', 'Claude-SearchBot', 'PerplexityBot', 'Perplexity-User', 'Google-Extended', 'Applebot-Extended', 'CCBot'];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: '*', allow: '/' }, ...aiAgents.map((userAgent) => ({ userAgent, allow: '/' }))],
    sitemap: `${site.url}/sitemap.xml`,
    host: site.url,
  };
}
