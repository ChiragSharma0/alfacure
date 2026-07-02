import React from 'react';

export default function Logo({ width = '100%', height = 'auto', className = '' }) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 420 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={{ display: 'inline-block', verticalAlign: 'middle' }}
    >
      <defs>
        {/* Oceans Gradient */}
        <linearGradient id="oceanGrad" x1="20" y1="31" x2="64" y2="75" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#567A9A" />
          <stop offset="100%" stopColor="#1F3D5A" />
        </linearGradient>
        
        {/* Hexagon Outline Gradient */}
        <linearGradient id="hexGrad" x1="15" y1="10" x2="85" y2="90" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#567A9A" />
          <stop offset="50%" stopColor="#1F3D5A" />
          <stop offset="100%" stopColor="#567A9A" />
        </linearGradient>

        <clipPath id="globeClip">
          <circle cx="40" cy="50" r="21" />
        </clipPath>
      </defs>

      {/* Outer Hexagon Border */}
      <polygon
        points="50,8 87,29 87,71 50,92 13,71 13,29"
        stroke="url(#hexGrad)"
        strokeWidth="3"
        fill="none"
        strokeLinejoin="round"
      />
      {/* Inner Hexagon Border */}
      <polygon
        points="50,14 81,32 81,68 50,86 19,68 19,32"
        stroke="#7FA18A"
        strokeWidth="1.2"
        fill="none"
        strokeLinejoin="round"
        opacity="0.75"
      />

      {/* Globe Container */}
      <g>
        {/* Ocean base */}
        <circle cx="40" cy="50" r="21" fill="url(#oceanGrad)" />
        
        {/* Landmasses (clipped) */}
        <g clipPath="url(#globeClip)">
          {/* North/South Americas */}
          <path
            d="M23,38 Q28,34 32,40 T31,52 T25,60 T22,68 T26,71 Z"
            fill="#7FA18A"
            opacity="0.85"
          />
          {/* Europe & Africa */}
          <path
            d="M38,34 Q45,36 44,44 T36,54 T41,63 T39,70 T35,66 Z"
            fill="#4D6F5A"
            opacity="0.9"
          />
          {/* Asia & Australia */}
          <path
            d="M52,36 Q58,35 56,42 T48,50 T54,60 T58,58 Z"
            fill="#7FA18A"
            opacity="0.8"
          />
        </g>
        
        {/* Globe Grid lines (translucent) */}
        <circle cx="40" cy="50" r="21" stroke="#ffffff" strokeWidth="0.8" fill="none" opacity="0.15" />
        <ellipse cx="40" cy="50" rx="14" ry="21" stroke="#ffffff" strokeWidth="0.8" fill="none" opacity="0.15" />
        <ellipse cx="40" cy="50" rx="6" ry="21" stroke="#ffffff" strokeWidth="0.8" fill="none" opacity="0.1" />
        <line x1="19" y1="50" x2="61" y2="50" stroke="#ffffff" strokeWidth="0.8" opacity="0.15" />
      </g>

      {/* DNA Helix (slanted overlapping the globe) */}
      <g opacity="0.95">
        {/* Rungs (connecting bars) */}
        <line x1="41" y1="26" x2="55" y2="26" stroke="#4D6F5A" strokeWidth="1.8" />
        <line x1="39" y1="36" x2="57" y2="36" stroke="#7FA18A" strokeWidth="1.8" />
        <line x1="38" y1="46" x2="58" y2="46" stroke="#1F3D5A" strokeWidth="1.8" />
        <line x1="38" y1="56" x2="58" y2="56" stroke="#4D6F5A" strokeWidth="1.8" />
        <line x1="39" y1="66" x2="57" y2="66" stroke="#7FA18A" strokeWidth="1.8" />
        <line x1="41" y1="76" x2="55" y2="76" stroke="#1F3D5A" strokeWidth="1.8" />

        {/* Strand 1 (Blue) */}
        <path
          d="M 48,16 C 65,28 31,44 48,56 C 65,68 31,84 48,96"
          stroke="#1F3D5A"
          strokeWidth="3.5"
          strokeLinecap="round"
          fill="none"
        />
        {/* Strand 2 (Green) */}
        <path
          d="M 48,16 C 31,28 65,44 48,56 C 31,68 65,84 48,96"
          stroke="#4D6F5A"
          strokeWidth="3.5"
          strokeLinecap="round"
          fill="none"
        />
        
        {/* Node dots */}
        <circle cx="48" cy="16" r="2.5" fill="#1F3D5A" />
        <circle cx="48" cy="56" r="2.5" fill="#1F3D5A" />
        <circle cx="48" cy="96" r="2.5" fill="#1F3D5A" />
      </g>

      {/* Typography */}
      <g style={{ fontFamily: "var(--font-heading), 'Plus Jakarta Sans', sans-serif" }}>
        {/* ALFACURE */}
        <text
          x="105"
          y="36"
          fill="#1F3D5A"
          fontSize="23"
          fontWeight="800"
          letterSpacing="0.04em"
        >
          ALFACURE
        </text>
        {/* LIFESCIENCE */}
        <text
          x="105"
          y="62"
          fill="#1F3D5A"
          fontSize="23"
          fontWeight="800"
          letterSpacing="0.04em"
        >
          LIFESCIENCE
        </text>
        {/* PRIVATE LIMITED */}
        <text
          x="106"
          y="80"
          fill="#4D6F5A"
          fontSize="10.5"
          fontWeight="700"
          letterSpacing="0.14em"
        >
          PRIVATE LIMITED
        </text>
      </g>
    </svg>
  );
}
