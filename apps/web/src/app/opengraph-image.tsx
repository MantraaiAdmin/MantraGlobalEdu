import { ImageResponse } from 'next/og';

export const alt = 'Mantra Global Education — study abroad counselling and application support';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

/** Default branded social share image, used by every page that does not set its own. */
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '72px 80px',
          background: 'linear-gradient(135deg, #00234E 0%, #0B2F5E 60%, #1a4a7a 100%)',
          color: '#ffffff',
          fontFamily: 'serif',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
          <div
            style={{
              width: 72,
              height: 72,
              borderRadius: 36,
              border: '3px solid #C89116',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 40,
              color: '#C89116',
              fontWeight: 700,
            }}
          >
            M
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <div style={{ fontSize: 34, fontWeight: 700 }}>Mantra Global Education</div>
            <div style={{ fontSize: 20, color: '#C89116', letterSpacing: 4 }}>EDUCATION VERTICAL OF MANTRA.AI</div>
          </div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
          <div style={{ fontSize: 64, fontWeight: 700, lineHeight: 1.1 }}>
            Study abroad with expert guidance and a career-ready profile
          </div>
          <div style={{ fontSize: 28, color: 'rgba(255,255,255,0.8)' }}>
            Counselling · Applications · Scholarships · Visa documentation
          </div>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 24, color: 'rgba(255,255,255,0.75)' }}>
          <span>Coimbatore &amp; online</span>
          <span>mantraglobaledu.com</span>
        </div>
      </div>
    ),
    size
  );
}
