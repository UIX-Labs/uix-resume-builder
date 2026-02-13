import { cn } from '@shared/lib/utils';
import type { ReactNode } from 'react';

interface CircularProgressProps {
  progress: number; // 0-100
  size?: number;
  strokeWidth?: number;
  backgroundColor?: string;
  progressColor?: string;
  className?: string;
  children?: ReactNode;
  variant?: 'default' | 'green';
}

export function CircularProgress({
  progress,
  size = 216,
  strokeWidth = 70,
  backgroundColor = 'rgba(19, 93, 56, 0.69)',
  progressColor = '#A3F7CB',
  className,
  children,
  variant = 'default',
}: CircularProgressProps) {
  const center = size / 2;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDasharray = `${circumference} ${circumference}`;
  const strokeDashoffset = circumference * (1 - progress / 100);

  // Green variant (JD upload style)
  if (variant === 'green') {
    return (
      <div className={cn('relative flex items-center justify-center', className)} style={{ width: size, height: size }}>
        <svg className="absolute inset-0 w-full h-full rotate-90" viewBox={`0 0 ${size} ${size}`}>
          <title>Circular progress indicator</title>
          <circle cx={center} cy={center} r={center} fill={backgroundColor} />

          <circle
            cx={center}
            cy={center}
            r={radius}
            fill="none"
            stroke={progressColor}
            strokeWidth={strokeWidth}
            strokeDasharray={strokeDasharray}
            strokeDashoffset={strokeDashoffset}
            className="transition-all duration-300 ease-out"
            transform="scale(-1, 1)"
            style={{ transformOrigin: 'center' }}
          />
        </svg>

        {children}
      </div>
    );
  }

  const indicatorRadius = 12.5;
  const angle = (progress / 100) * 2 * Math.PI - Math.PI / 2;
  const indicatorX = center + radius * Math.cos(angle);
  const indicatorY = center + radius * Math.sin(angle);

  // Calculate outer and inner radius for the ring
  const outerRadius = center;
  const innerRadius = center - strokeWidth;

  return (
    <div className={cn('relative flex items-center justify-center', className)} style={{ width: size, height: size }}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} fill="none" aria-hidden="true">
        <g filter="url(#filter0_i_progress)">
          <circle cx={center} cy={center} r={outerRadius} fill="#F0F7FF" />
          <circle cx={center} cy={center} r={innerRadius} fill="white" />
        </g>

        <circle
          cx={center}
          cy={center}
          r={radius}
          fill="none"
          stroke="url(#paint0_linear_progress)"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={strokeDasharray}
          strokeDashoffset={strokeDashoffset}
          transform={`rotate(-90 ${center} ${center})`}
          className="transition-all duration-300 ease-out"
        />

        <g filter="url(#filter0_d_progress)">
          <circle
            cx={indicatorX}
            cy={indicatorY}
            r={indicatorRadius}
            fill="white"
            stroke="white"
            strokeWidth="3"
            shapeRendering="crispEdges"
            className="transition-all duration-300 ease-out"
          />

          <circle
            cx={indicatorX}
            cy={indicatorY}
            r={indicatorRadius}
            stroke="white"
            strokeWidth="3"
            fill="url(#paint0_linear_progress)"
            shapeRendering="crispEdges"
            className="transition-all duration-300 ease-out"
          />
        </g>

        <defs>
          <linearGradient
            id="paint0_linear_progress"
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
            id="filter0_d_progress"
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
            <feMorphology radius="0.581395" operator="dilate" in="SourceAlpha" result="effect1_dropShadow_progress" />
            <feOffset dy="1.16279" />
            <feGaussianBlur stdDeviation="2.32558" />
            <feComposite in2="hardAlpha" operator="out" />
            <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.12 0" />
            <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_progress" />
            <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_progress" result="shape" />
          </filter>

          <filter
            id="filter0_i_progress"
            x="0"
            y="0"
            width={size}
            height={size + 1.163}
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
            <feBlend mode="normal" in2="shape" result="effect1_innerShadow_progress" />
          </filter>
        </defs>
      </svg>

      {children}
    </div>
  );
}
