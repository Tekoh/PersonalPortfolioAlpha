import { useEffect, useRef, useState } from 'react';

const isTouchDevice = () =>
  typeof window !== 'undefined' &&
  ('ontouchstart' in window || navigator.maxTouchPoints > 0);

export const CustomCursor = () => {
  const ringRef = useRef<HTMLDivElement>(null);
  const dotRef  = useRef<HTMLDivElement>(null);
  const [hovering, setHovering] = useState(false);
  const [isTouch]  = useState(() => isTouchDevice());

  useEffect(() => {
    if (isTouch) return;
    const ring = ringRef.current;
    const dot  = dotRef.current;
    if (!ring || !dot) return;

    let mx = 0, my = 0, rx = 0, ry = 0;
    let rafId: number;

    const onMove = (e: MouseEvent) => {
      mx = e.clientX; my = e.clientY;
      dot.style.left = `${mx}px`;
      dot.style.top  = `${my}px`;
    };

    const onOver = (e: MouseEvent) => {
      setHovering(!!(e.target as HTMLElement).closest('a, button, [data-hover]'));
    };

    const loop = () => {
      rx += (mx - rx) * 0.13;
      ry += (my - ry) * 0.13;
      ring.style.left = `${rx}px`;
      ring.style.top  = `${ry}px`;
      rafId = requestAnimationFrame(loop);
    };

    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseover', onOver);
    rafId = requestAnimationFrame(loop);
    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseover', onOver);
      cancelAnimationFrame(rafId);
    };
  }, [isTouch]);

  if (isTouch) return null;

  return (
    <>
      <div
        ref={ringRef}
        className="fixed pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          width:           hovering ? '44px' : '28px',
          height:          hovering ? '44px' : '28px',
          border:          hovering ? '2px solid #38bdf8' : '1.5px solid rgba(56,189,248,0.60)',
          backgroundColor: hovering ? 'rgba(56,189,248,0.10)' : 'transparent',
          boxShadow:       hovering ? '0 0 14px rgba(56,189,248,0.35)' : 'none',
          transition: 'width 0.18s ease, height 0.18s ease, background-color 0.18s ease, box-shadow 0.18s ease, border-color 0.18s ease',
        }}
      />
      <div
        ref={dotRef}
        className="fixed pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          width:  hovering ? '5px' : '4px',
          height: hovering ? '5px' : '4px',
          background: '#38bdf8',
          boxShadow: '0 0 6px rgba(56,189,248,0.8)',
          transition: 'width 0.15s ease, height 0.15s ease',
        }}
      />
    </>
  );
};
