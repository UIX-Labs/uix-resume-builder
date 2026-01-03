import type React from 'react';

interface YoutubeIconProps {
  className?: string;
  width?: number | string;
  height?: number | string;
  color?: string;
}

export const YoutubeIcon: React.FC<YoutubeIconProps> = ({
  className = '',
  width = 16,
  height = 16,
  color = '#6F6F6F',
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 16 16"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M8 0C12.4183 0 16 3.58172 16 8C16 12.4183 12.4183 16 8 16C3.58172 16 0 12.4183 0 8C2.2549e-07 3.58172 3.58172 2.25497e-07 8 0ZM8 5.06641C7.99908 5.06641 5.33136 5.06692 4.66602 5.25C4.2989 5.35079 4.00926 5.64745 3.91113 6.02441C3.73289 6.70774 3.7334 8.13379 3.7334 8.13379C3.73342 8.16277 3.73475 9.56587 3.91113 10.2422C4.00925 10.6191 4.29891 10.9158 4.66602 11.0166C5.33136 11.1996 7.99908 11.2002 8 11.2002C8 11.2002 10.6686 11.1997 11.334 11.0166C11.7011 10.9157 11.9898 10.6191 12.0879 10.2422C12.2644 9.56594 12.2666 8.16277 12.2666 8.13379C12.2666 8.13379 12.2662 6.70769 12.0879 6.02441C11.9897 5.64752 11.701 5.35079 11.334 5.25C10.6686 5.06689 8 5.06641 8 5.06641Z"
        fill={color}
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M7.19995 9.59977V6.93311L9.33328 8.26649L7.19995 9.59977Z"
        fill={color}
      />
    </svg>
  );
};
