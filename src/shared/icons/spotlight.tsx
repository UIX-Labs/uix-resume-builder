interface SpotlightProps {
  className?: string;
}

function Spotlight({ className }: SpotlightProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1440"
      height="1024"
      viewBox="0 0 1440 1024"
      fill="none"
      aria-label="Spotlight"
      aria-hidden="true"
      className={className}
    >
      <g filter="url(#filter0_f_518_3744)">
        <path d="M1000 0H427.5L1 1024H1441L1000 0Z" fill="url(#paint0_linear_518_3744)" />
      </g>
      <defs>
        <filter
          id="filter0_f_518_3744"
          x="-99"
          y="-100"
          width="1640"
          height="1224"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
          <feGaussianBlur stdDeviation="50" result="effect1_foregroundBlur_518_3744" />
        </filter>
        <linearGradient id="paint0_linear_518_3744" x1="721" y1="1024" x2="721" y2="0" gradientUnits="userSpaceOnUse">
          <stop stopColor="#E1FFBE" stopOpacity="0" />
          <stop offset="1" stopColor="#02A44F" stopOpacity="0.5" />
        </linearGradient>
      </defs>
    </svg>
  );
}

export default Spotlight;
