import React from 'react';
import Navbar from '../components/layout/Navbar';
import './ProjectDetails.css';

export default function ProjectDetailsSkeleton() {
  const bar = (w, h = 14) => ({
    width: w,
    height: h,
    background: 'rgba(7, 20, 37, 0.8)',
    borderRadius: h > 20 ? 10 : 6,
  });

  return (
    <div className="pd-page">
      <Navbar />
      <div className="pd-depth-panel-left" />
      <div className="pd-depth-panel-right" />
      <div className="pd-glow-top-left" />
      <div className="pd-glow-bottom-right" />

      <main className="pd-content">
        <div className="pd-back" style={{ pointerEvents: 'none' }}>
          <div style={bar(110, 13)} />
        </div>

        <div className="pd-layout">
          {/* Left */}
          <div className="pd-left">
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              <div style={bar('75%', 42)} />
              <div style={bar('45%', 42)} />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              <div style={bar('100%')} />
              <div style={bar('100%')} />
              <div style={bar('88%')} />
              <div style={bar('72%')} />
            </div>
            <div style={{ display: 'flex', gap: 12 }}>
              <div style={bar(120, 44)} />
              <div style={bar(120, 44)} />
            </div>
            <div>
              <div style={{ ...bar(80, 11), marginBottom: 12 }} />
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                {[72, 60, 84, 66, 50].map((w, i) => (
                  <div key={i} style={bar(w, 30)} />
                ))}
              </div>
            </div>
          </div>

          {/* Right */}
          <div className="pd-right">
            <div className="pd-screenshot-frame">
              <div style={{ width: '100%', aspectRatio: '16/9', background: '#050B14', borderRadius: 12 }} />
            </div>
            <div>
              <div style={{ ...bar(80, 11), marginBottom: 12 }} />
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {[1, 2, 3, 4].map(i => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <div style={{ width: 5, height: 5, borderRadius: '50%', background: 'rgba(7,20,37,0.8)', flexShrink: 0 }} />
                    <div style={bar(`${60 + i * 6}%`)} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
