import { useEffect, useRef } from 'react';

export const FloatingShapes = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const onMouseMove = (e: MouseEvent) => {
      const xFactor = (e.clientX / window.innerWidth - 0.5) * 24;
      const yFactor = (e.clientY / window.innerHeight - 0.5) * 24;

      container.querySelectorAll<HTMLElement>('[data-speed]').forEach(shape => {
        const speed = parseFloat(shape.dataset.speed ?? '1');
        shape.style.transform = `translate(${xFactor * speed}px, ${yFactor * speed}px)`;
      });
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', onMouseMove);
  }, []);

  return (
    <div ref={containerRef} className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {/* Large violet circle — top right */}
      <div
        data-speed="0.25"
        className="absolute -top-40 -right-40 w-[500px] h-[500px] rounded-full animate-float-slow"
        style={{
          background: 'radial-gradient(circle, rgba(167,139,250,0.35) 0%, rgba(196,181,253,0.10) 70%)',
          transition: 'transform 0.6s ease-out',
        }}
      />

      {/* Medium indigo blob — left center */}
      <div
        data-speed="0.45"
        className="absolute top-1/3 -left-28 w-72 h-72 rounded-full animate-float"
        style={{
          background: 'radial-gradient(circle, rgba(129,140,248,0.25) 0%, rgba(165,180,252,0.08) 70%)',
          transition: 'transform 0.6s ease-out',
          animationDelay: '1s',
        }}
      />

      {/* Small pink pill — lower right */}
      <div
        data-speed="0.65"
        className="absolute bottom-1/4 right-1/4 w-36 h-20 rounded-full animate-float-slow"
        style={{
          background: 'rgba(240,171,252,0.40)',
          boxShadow: 'inset 2px 2px 8px rgba(255,255,255,0.70), inset -2px -2px 6px rgba(0,0,0,0.06)',
          transition: 'transform 0.5s ease-out',
          animationDelay: '0.5s',
        }}
      />

      {/* Tiny violet circle — upper left */}
      <div
        data-speed="0.90"
        className="absolute top-48 left-1/4 w-14 h-14 rounded-full animate-float"
        style={{
          background: 'rgba(124,58,237,0.18)',
          boxShadow: 'inset 1px 1px 4px rgba(255,255,255,0.60), inset -1px -1px 4px rgba(0,0,0,0.08)',
          transition: 'transform 0.4s ease-out',
          animationDelay: '2s',
        }}
      />

      {/* Large soft sky circle — bottom left */}
      <div
        data-speed="0.30"
        className="absolute -bottom-32 -left-20 w-80 h-80 rounded-full animate-float-slow"
        style={{
          background: 'radial-gradient(circle, rgba(186,230,253,0.40) 0%, rgba(224,242,254,0.10) 70%)',
          transition: 'transform 0.7s ease-out',
          animationDelay: '1.5s',
        }}
      />

      {/* Medium warm circle — top center */}
      <div
        data-speed="0.55"
        className="absolute top-20 left-1/2 w-24 h-24 rounded-full animate-float"
        style={{
          background: 'rgba(253,186,116,0.20)',
          boxShadow: 'inset 2px 2px 6px rgba(255,255,255,0.60)',
          transition: 'transform 0.5s ease-out',
          animationDelay: '3s',
        }}
      />
    </div>
  );
};
