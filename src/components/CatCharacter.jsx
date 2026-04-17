import React from 'react';

export default function CatCharacter() {
  return (
    <svg viewBox="0 0 260 120" width="260" height="120" className="cat-svg">
      {/* Ears */}
      {/* Left Ear */}
      <polygon points="75,60 65,15 105,35" fill="#f69c28" />
      <polygon points="77,55 71,25 98,37" fill="#ffb3ba" />
      {/* Right Ear */}
      <polygon points="185,60 195,15 155,35" fill="#f69c28" />
      <polygon points="183,55 189,25 162,37" fill="#ffb3ba" />

      {/* Main Head - Squat wide oval */}
      <ellipse cx="130" cy="70" rx="85" ry="42" fill="#ffd147" stroke="#e6a422" strokeWidth="2" />

      {/* Forehead Stripes */}
      <path d="M 130 30 L 130 55" stroke="#f69c28" strokeWidth="6" strokeLinecap="round" />
      <path d="M 115 33 L 115 52" stroke="#f69c28" strokeWidth="6" strokeLinecap="round" />
      <path d="M 145 33 L 145 52" stroke="#f69c28" strokeWidth="6" strokeLinecap="round" />

      {/* Whiskers */}
      {/* Left */}
      <path d="M 60 65 L 35 60" stroke="#d48a15" strokeWidth="2" strokeLinecap="round" />
      <path d="M 55 75 L 30 75" stroke="#d48a15" strokeWidth="2" strokeLinecap="round" />
      <path d="M 60 85 L 35 90" stroke="#d48a15" strokeWidth="2" strokeLinecap="round" />
      {/* Right */}
      <path d="M 200 65 L 225 60" stroke="#d48a15" strokeWidth="2" strokeLinecap="round" />
      <path d="M 205 75 L 230 75" stroke="#d48a15" strokeWidth="2" strokeLinecap="round" />
      <path d="M 200 85 L 225 90" stroke="#d48a15" strokeWidth="2" strokeLinecap="round" />

      {/* Cheeks */}
      <ellipse cx="85" cy="80" rx="12" ry="6" fill="#ff8a80" opacity="0.8" />
      <ellipse cx="175" cy="80" rx="12" ry="6" fill="#ff8a80" opacity="0.8" />

      {/* Eyes (Happy Closed) */}
      <path d="M 95 72 Q 105 60 115 72" stroke="#333" strokeWidth="4" strokeLinecap="round" fill="none" />
      <path d="M 145 72 Q 155 60 165 72" stroke="#333" strokeWidth="4" strokeLinecap="round" fill="none" />

      {/* Nose and Mouth */}
      <circle cx="130" cy="82" r="3" fill="#e53935" />
      <path d="M 130 85 Q 130 92 125 90" stroke="#333" strokeWidth="2" strokeLinecap="round" fill="none" />
      <path d="M 130 85 Q 130 92 135 90" stroke="#333" strokeWidth="2" strokeLinecap="round" fill="none" />

      {/* Flat-Bottomed Paws Overlapping Badges */}
      {/* Left Paw positioned High and Left */}
      <path d="M 20 95 C 20 70, 65 70, 65 95 Z" fill="#ffd147" stroke="#e6a422" strokeWidth="2" />
      <path d="M 35 80 L 35 93" stroke="#d48a15" strokeWidth="2" strokeLinecap="round" />
      <path d="M 45 78 L 45 93" stroke="#d48a15" strokeWidth="2" strokeLinecap="round" />
      <path d="M 55 80 L 55 93" stroke="#d48a15" strokeWidth="2" strokeLinecap="round" />

      {/* Right Paw positioned High and Right */}
      <path d="M 195 95 C 195 70, 240 70, 240 95 Z" fill="#ffd147" stroke="#e6a422" strokeWidth="2" />
      <path d="M 205 80 L 205 93" stroke="#d48a15" strokeWidth="2" strokeLinecap="round" />
      <path d="M 215 78 L 215 93" stroke="#d48a15" strokeWidth="2" strokeLinecap="round" />
      <path d="M 225 80 L 225 93" stroke="#d48a15" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}
