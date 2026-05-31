import { ReactNode, useState } from 'react';

interface ButtonProps {
  children: ReactNode;
  onClick?: () => void;
  href?: string;
  className?: string;
  variant?: 'primary' | 'secondary';
}

export const Button = ({
  children,
  onClick,
  href,
  className = '',
  variant = 'primary',
}: ButtonProps) => {
  const [pressed, setPressed] = useState(false);

  const primaryShadow = pressed
    ? '2px 2px 6px rgba(124,58,237,0.20), inset 4px 4px 10px rgba(0,0,0,0.15), inset -2px -2px 5px rgba(255,255,255,0.20)'
    : '6px 6px 14px rgba(124,58,237,0.35), -3px -3px 8px rgba(255,255,255,0.60)';

  const secondaryShadow = pressed
    ? '2px 2px 6px rgba(0,0,0,0.10), inset 4px 4px 10px rgba(0,0,0,0.08), inset -2px -2px 6px rgba(255,255,255,0.70)'
    : '8px 8px 20px rgba(0,0,0,0.10), -4px -4px 12px rgba(255,255,255,0.95), inset 2px 2px 5px rgba(255,255,255,0.85), inset -2px -2px 5px rgba(0,0,0,0.06)';

  const base = `inline-flex items-center justify-center gap-2 font-semibold rounded-2xl px-6 py-3 select-none transition-transform duration-100 ${
    pressed ? 'scale-[0.97]' : 'scale-100'
  } ${className}`;

  const styles: Record<'primary' | 'secondary', React.CSSProperties> = {
    primary: {
      background: '#7c3aed',
      color: '#ffffff',
      boxShadow: primaryShadow,
    },
    secondary: {
      background: '#ffffff',
      color: '#1e1b4b',
      boxShadow: secondaryShadow,
    },
  };

  const interactionProps = {
    onMouseDown: () => setPressed(true),
    onMouseUp: () => setPressed(false),
    onMouseLeave: () => setPressed(false),
    onTouchStart: () => setPressed(true),
    onTouchEnd: () => setPressed(false),
  };

  if (href) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={base}
        style={styles[variant]}
        {...interactionProps}
      >
        {children}
      </a>
    );
  }

  return (
    <button
      onClick={onClick}
      className={base}
      style={styles[variant]}
      {...interactionProps}
    >
      {children}
    </button>
  );
};
