import React, { useMemo } from 'react';
import './BubbleBackground.css';

export default function BubbleBackground() {
  const bubbles = useMemo(() => {
    const b = [];
    for (let i = 0; i < 30; i++) {
      b.push({
        id: i,
        size: 30 + Math.random() * 120,
        x: Math.random() * 100,
        y: Math.random() * 100,
        opacity: 0.08 + Math.random() * 0.15,
        delay: Math.random() * 8,
        duration: 6 + Math.random() * 8,
      });
    }
    return b;
  }, []);

  return (
    <div className="bubble-background">
      {bubbles.map((b) => (
        <div
          key={b.id}
          className="bubble"
          style={{
            width: b.size,
            height: b.size,
            left: `${b.x}%`,
            top: `${b.y}%`,
            opacity: b.opacity,
            animationDelay: `${b.delay}s`,
            animationDuration: `${b.duration}s`,
          }}
        />
      ))}
    </div>
  );
}
