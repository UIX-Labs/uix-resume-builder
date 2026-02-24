export interface ButtonProps {
  /** Is this the principal call to action on the page? */
  primary?: boolean;
  /** What background color to use */
  backgroundColor?: string;
  /** How large should the button be? */
  size?: 'small' | 'medium' | 'large';
  /** Button contents */
  label: string;
  /** Optional click handler */
  onClick?: () => void;
}

const sizeClasses = {
  small: 'py-[10px] px-[16px] text-[12px]',
  medium: 'py-[11px] px-[20px] text-[14px]',
  large: 'py-[12px] px-[24px] text-[16px]',
};

/** Primary UI component for user interaction */
export const Button = ({ primary = false, size = 'medium', backgroundColor, label, ...props }: ButtonProps) => {
  const mode = primary
    ? 'bg-red-500 text-white'
    : 'bg-transparent text-[#333] shadow-[rgba(0,0,0,0.15)_0px_0px_0px_1px_inset]';

  return (
    <button
      type="button"
      className={`inline-block cursor-pointer border-0 rounded-[3em] font-bold leading-none font-['Nunito_Sans',_'Helvetica_Neue',_Helvetica,_Arial,_sans-serif] ${sizeClasses[size]} ${mode}`}
      style={backgroundColor ? { backgroundColor } : undefined}
      {...props}
    >
      {label}
    </button>
  );
};
