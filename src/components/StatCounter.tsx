import { useEffect, useRef, useState } from 'react';

interface StatCounterProps {
  to: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
}

export const StatCounter = ({ to, prefix = '', suffix = '', duration = 1400 }: StatCounterProps) => {
  const [value, setValue] = useState(0);
  const spanRef   = useRef<HTMLSpanElement>(null);
  const triggered = useRef(false);

  useEffect(() => {
    const el = spanRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !triggered.current) {
          triggered.current = true;
          const start = performance.now();

          const tick = (now: number) => {
            const elapsed  = now - start;
            const progress = Math.min(elapsed / duration, 1);
            const eased    = 1 - Math.pow(1 - progress, 3);
            setValue(Math.round(eased * to));
            if (progress < 1) requestAnimationFrame(tick);
          };

          requestAnimationFrame(tick);
          observer.disconnect();
        }
      },
      { threshold: 0.6 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [to, duration]);

  return (
    <span ref={spanRef}>
      {prefix}{value}{suffix}
    </span>
  );
};
