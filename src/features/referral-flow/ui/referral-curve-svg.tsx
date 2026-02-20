import type { SVGProps } from 'react';

interface CurveSvgProps extends SVGProps<SVGSVGElement> {
  className?: string;
}

export function CurveUpwardsSvg({ className, ...props }: CurveSvgProps) {
  return (
    <svg className={className} viewBox="0 0 260 80" fill="none" {...props}>
      <title>Curve upwards connector</title>
      <path
        d="M0 60 C65 10, 195 10, 260 60"
        stroke="rgba(255,255,255,0.4)"
        strokeWidth="1"
        strokeDasharray="10 10"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function CurveDownwardsSvg({ className, ...props }: CurveSvgProps) {
  return (
    <svg className={className} viewBox="0 0 260 80" fill="none" {...props}>
      <title>Curve downwards connector</title>
      <path
        d="M0 20 C65 70, 195 70, 260 20"
        stroke="rgba(255,255,255,0.4)"
        strokeWidth="1"
        strokeDasharray="10 10"
        strokeLinecap="round"
      />
    </svg>
  );
}
