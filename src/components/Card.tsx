import { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
}

export const Card = ({ children, className = '' }: CardProps) => (
  <div
    className={`bg-white rounded-3xl p-6 ${className}`}
    style={{
      boxShadow:
        '8px 8px 20px rgba(0,0,0,0.10), -4px -4px 12px rgba(255,255,255,0.95), inset 2px 2px 5px rgba(255,255,255,0.85), inset -2px -2px 5px rgba(0,0,0,0.06)',
    }}
  >
    {children}
  </div>
);
