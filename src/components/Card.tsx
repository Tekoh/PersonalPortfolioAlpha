import { ReactNode, CSSProperties } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
  glow?: boolean;
  style?: CSSProperties;
}

const BASE_SHADOW = '6px 6px 20px rgba(0,0,0,0.55), -3px -3px 10px rgba(255,255,255,0.03), inset 1px 1px 2px rgba(255,255,255,0.07), inset -1px -1px 2px rgba(0,0,0,0.45)';
const GLOW_SHADOW = '6px 6px 20px rgba(0,0,0,0.55), 0 0 28px rgba(56,189,248,0.14), -3px -3px 10px rgba(255,255,255,0.03), inset 1px 1px 2px rgba(56,189,248,0.18), inset -1px -1px 2px rgba(0,0,0,0.40)';

export const Card = ({ children, className = '', glow = false, style }: CardProps) => (
  <div
    className={`rounded-2xl p-6 ${className}`}
    style={{
      background: '#141e33',
      border: '1px solid rgba(56,189,248,0.10)',
      boxShadow: glow ? GLOW_SHADOW : BASE_SHADOW,
      ...style,
    }}
  >
    {children}
  </div>
);
