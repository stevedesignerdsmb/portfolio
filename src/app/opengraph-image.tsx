import { ImageResponse } from 'next/og';
import { site } from '@/content/site';

export const alt = `${site.name}, ${site.role}`;
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OG() {
  return new ImageResponse(
    (
      <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: 80, background: '#ffffff', color: '#131316', fontFamily: 'sans-serif' }}>
        <div style={{ fontSize: 28, color: '#5e5f6e' }}>stevedesignerd.com</div>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ fontSize: 88, fontWeight: 600, letterSpacing: -3 }}>{site.name}</div>
          <div style={{ fontSize: 88, fontWeight: 600, letterSpacing: -3, color: '#9394a1' }}>{site.role}</div>
        </div>
        <div style={{ fontSize: 28, color: '#5e5f6e' }}>Kiiex · SMB.co · Mercado Libre</div>
      </div>
    ),
    size,
  );
}
