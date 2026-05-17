import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = 'Aryan Jain — Senior Backend Engineer'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          background: '#0a0a0a',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '80px',
          fontFamily: 'monospace',
          position: 'relative',
        }}
      >
        {/* Gradient blob */}
        <div
          style={{
            position: 'absolute',
            top: '-100px',
            right: '-100px',
            width: '600px',
            height: '600px',
            background: 'radial-gradient(circle, #10b98133 0%, transparent 70%)',
            borderRadius: '50%',
          }}
        />

        {/* Terminal prompt */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '32px' }}>
          <div
            style={{
              background: 'linear-gradient(135deg, #10b981, #06b6d4, #8b5cf6)',
              borderRadius: '10px',
              padding: '10px 16px',
              fontSize: '24px',
              color: '#fff',
              fontWeight: 700,
            }}
          >
            &gt;_
          </div>
          <span style={{ color: '#ffffff40', fontSize: '20px' }}>~/aryan.jain</span>
        </div>

        {/* Name */}
        <div style={{ fontSize: '72px', fontWeight: 700, color: '#fff', lineHeight: 1, marginBottom: '16px' }}>
          Aryan Jain
        </div>

        {/* Title */}
        <div
          style={{
            fontSize: '28px',
            background: 'linear-gradient(90deg, #10b981, #06b6d4)',
            backgroundClip: 'text',
            color: 'transparent',
            marginBottom: '40px',
          }}
        >
          Senior Backend Engineer
        </div>

        {/* Tags */}
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
          {['IIT Roorkee', 'Node.js · TypeScript', 'AI Backends', 'Bangalore'].map((tag) => (
            <div
              key={tag}
              style={{
                border: '1px solid #ffffff20',
                borderRadius: '100px',
                padding: '8px 20px',
                color: '#ffffff80',
                fontSize: '18px',
              }}
            >
              {tag}
            </div>
          ))}
        </div>

        {/* URL */}
        <div style={{ position: 'absolute', bottom: '48px', right: '80px', color: '#ffffff30', fontSize: '18px' }}>
          aryanjain.dev
        </div>
      </div>
    ),
    size,
  )
}
