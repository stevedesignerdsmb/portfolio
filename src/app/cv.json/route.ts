import { resume, resumePdf } from '@/content/resume';
import { site } from '@/content/site';

export const dynamic = 'force-static';

/** The résumé as JSON, for agents and for scripts/export-cv.py. */
export function GET() {
  return Response.json({ ...resume, url: `${site.url}/cv`, pdf: `${site.url}${resumePdf}` });
}
