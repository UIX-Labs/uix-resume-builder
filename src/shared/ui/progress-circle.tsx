interface ProgressCircleProps {
  progress: number; // 0-100
  currentStep: number;
  totalSteps: number;
}

export function ProgressCircle({ currentStep, totalSteps, progress }: ProgressCircleProps) {
  const radius = 82.5;
  const circumference = 2 * Math.PI * radius;
  const strokeDasharray = `${(progress / 100) * circumference} ${circumference}`;
  const strokeDashoffset = 0; // Start from top (90 degrees offset)

  // Calculate the position of the indicator circle at the end of the progress arc
  const angle = (progress / 100) * 2 * Math.PI - Math.PI / 2; // -90 degrees to start from top
  const indicatorX = 94 + radius * Math.cos(angle);
  const indicatorY = 94 + radius * Math.sin(angle);

  return (
    <div className="relative w-[188px] h-[188px] flex items-center justify-center">
      {/* Background circle */}
      <svg width="188" height="188" viewBox="0 0 188 188" fill="none" aria-hidden="true">
        <g filter="url(#filter0_i_1090_113)">
          <path
            d="M188 94.0002C188 145.915 145.915 188 94.0002 188C42.0853 188 0 145.915 0 94.0002C0 42.0853 42.0853 0 94.0002 0C145.915 0 188 42.0853 188 94.0002ZM22.5601 94.0002C22.5601 133.456 54.5449 165.44 94.0002 165.44C133.456 165.44 165.44 133.456 165.44 94.0002C165.44 54.5449 133.456 22.5601 94.0002 22.5601C54.5449 22.5601 22.5601 54.5449 22.5601 94.0002Z"
            fill="#F0F7FF"
          />
        </g>

        <circle
          cx="94"
          cy="94"
          r={radius}
          fill="none"
          stroke="url(#paint0_linear_1091_23)"
          strokeWidth="20"
          strokeLinecap="round"
          strokeDasharray={strokeDasharray}
          strokeDashoffset={strokeDashoffset}
          transform="rotate(-90 94 94)"
          className="transition-all duration-300 ease-out"
        />

        {progress > 0 && (
          <g filter="url(#filter0_d_2733_2246)">
            <circle
              cx={indicatorX}
              cy={indicatorY}
              r="12.5"
              fill="white"
              stroke="white"
              strokeWidth="3"
              shapeRendering="crispEdges"
              className="transition-all duration-300 ease-out"
            />

            <circle
              cx={indicatorX}
              cy={indicatorY}
              r="12.5"
              stroke="white"
              strokeWidth="3"
              fill="url(#paint0_linear_1091_23)"
              shapeRendering="crispEdges"
              className="transition-all duration-300 ease-out"
            />
          </g>
        )}

        <defs>
          <linearGradient
            id="paint0_linear_1091_23"
            x1="73.4707"
            y1="-18.004"
            x2="-149.545"
            y2="166.424"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0.131506" stopColor="#FF2727" />
            <stop offset="0.247414" stopColor="#FF187C" />
            <stop offset="0.505769" stopColor="#BB32FF" />
            <stop offset="0.721154" stopColor="#6DC1E8" />
            <stop offset="0.942308" stopColor="#1DF9D0" />
          </linearGradient>

          <filter
            id="filter0_d_2733_2246"
            x="0"
            y="0"
            width="200"
            height="200"
            filterUnits="userSpaceOnUse"
            colorInterpolationFilters="sRGB"
          >
            <feFlood floodOpacity="0" result="BackgroundImageFix" />
            <feColorMatrix
              in="SourceAlpha"
              type="matrix"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
              result="hardAlpha"
            />
            <feMorphology radius="0.581395" operator="dilate" in="SourceAlpha" result="effect1_dropShadow_2733_2246" />
            <feOffset dy="1.16279" />
            <feGaussianBlur stdDeviation="2.32558" />
            <feComposite in2="hardAlpha" operator="out" />
            <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.12 0" />
            <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_2733_2246" />
            <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_2733_2246" result="shape" />
          </filter>

          <filter
            id="filter0_i_1090_113"
            x="0"
            y="0"
            width="188"
            height="189.163"
            filterUnits="userSpaceOnUse"
            colorInterpolationFilters="sRGB"
          >
            <feFlood floodOpacity="0" result="BackgroundImageFix" />
            <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
            <feColorMatrix
              in="SourceAlpha"
              type="matrix"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
              result="hardAlpha"
            />
            <feOffset dy="1.16279" />
            <feGaussianBlur stdDeviation="1.16279" />
            <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
            <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.12 0" />
            <feBlend mode="normal" in2="shape" result="effect1_innerShadow_1090_113" />
          </filter>
        </defs>
      </svg>

      {/* Center content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <p className="text-[#002359] text-[13px] font-regular bg-[#E9F4FF] border-[0.7px] border-[#DFF0FF] px-1 rounded-[10px]">
          Your Progress
        </p>
        <p className="text-gray-1000 text-[48px] font-[900] leading-[120%]">{progress}%</p>
        {/* <p className="text-[#666] text-[13px] font-regular">
          {String(currentStep).padStart(2, '0')}/{String(totalSteps).padStart(2, '0')}
        </p> */}
      </div>
    </div>
  );
}
