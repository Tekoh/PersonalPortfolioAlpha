import { ReactNode, useState, CSSProperties } from 'react';

interface ButtonProps {
  children: ReactNode;
  onClick?: () => void;
  href?: string;
  className?: string;
  variant?: 'primary' | 'secondary' | 'ghost';
  style?: CSSProperties;
}

const SHADOWS = {
  primary: {
    idle:    '6px 6px 18px rgba(0,0,0,0.55), 0 0 22px rgba(56,189,248,0.28), inset 1px 1px 2px rgba(255,255,255,0.22), inset -1px -1px 2px rgba(0,0,0,0.30)',
    pressed: '2px 2px 8px rgba(0,0,0,0.65), 0 0 10px rgba(56,189,248,0.15), inset 5px 5px 14px rgba(0,0,0,0.40), inset -2px -2px 5px rgba(255,255,255,0.10)',
  },
  secondary: {
    idle:    '6px 6px 18px rgba(0,0,0,0.55), -3px -3px 8px rgba(255,255,255,0.03), inset 1px 1px 2px rgba(255,255,255,0.07), inset -1px -1px 2px rgba(0,0,0,0.40)',
    pressed: '2px 2px 8px rgba(0,0,0,0.65), inset 5px 5px 12px rgba(0,0,0,0.50), inset -2px -2px 5px rgba(255,255,255,0.04)',
  },
  ghost: {
    idle:    'none',
    pressed: 'none',
  },
};

export const Button = ({
  children, onClick, href, className = '', variant = 'primary', style,
}: ButtonProps) => {
  const [pressed, setPressed] = useState(false);

  const variantStyles: Record<typeof variant, CSSProperties> = {
    primary: {
      background: 'linear-gradient(135deg, #0ea5e9, #38bdf8)',
      color: '#fff',
      boxShadow: pressed ? SHADOWS.primary.pressed : SHADOWS.primary.idle,
    },
    secondary: {
      background: '#1b2a47',
      color: '#38bdf8',
      border: '1px solid rgba(56,189,248,0.28)',
      boxShadow: pressed ? SHADOWS.secondary.pressed : SHADOWS.secondary.idle,
    },
    ghost: {
      background: 'transparent',
      color: '#94a3b8',
      border: '1px solid rgba(148,163,184,0.20)',
    },
  };

  const base = `inline-flex items-center justify-center gap-2 font-semibold rounded-xl px-6 py-3 select-none transition-transform duration-100 ${
    pressed ? 'scale-[0.96]' : 'scale-100'
  } ${className}`;

  const handlers = {
    onMouseDown:  () => setPressed(true),
    onMouseUp:    () => setPressed(false),
    onMouseLeave: () => setPressed(false),
    onTouchStart: () => setPressed(true),
    onTouchEnd:   () => setPressed(false),
  };

  const combinedStyle = { ...variantStyles[variant], ...style };

  if (href) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer"
        className={base} style={combinedStyle} {...handlers}>
        {children}
      </a>
    );
  }

  return (
    <button onClick={onClick} className={base} style={combinedStyle} {...handlers}>
      {children}
    </button>
  );
};
