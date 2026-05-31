import { useState, useEffect } from 'react';

interface TypewriterTextProps {
  phrases: string[];
  className?: string;
  typingSpeed?: number;
  deletingSpeed?: number;
  pauseMs?: number;
}

export const TypewriterText = ({
  phrases,
  className = '',
  typingSpeed = 75,
  deletingSpeed = 38,
  pauseMs = 2200,
}: TypewriterTextProps) => {
  const [displayed, setDisplayed]   = useState('');
  const [phraseIdx, setPhraseIdx]   = useState(0);
  const [charIdx, setCharIdx]       = useState(0);
  const [deleting, setDeleting]     = useState(false);
  const [pausing, setPausing]       = useState(false);

  useEffect(() => {
    if (pausing) return;
    const current = phrases[phraseIdx];

    if (!deleting && charIdx === current.length) {
      const t = setTimeout(() => { setPausing(true); setDeleting(true); setPausing(false); }, pauseMs);
      return () => clearTimeout(t);
    }

    if (deleting && charIdx === 0) {
      setDeleting(false);
      setPhraseIdx(i => (i + 1) % phrases.length);
      return;
    }

    const delay = deleting ? deletingSpeed : typingSpeed;
    const t = setTimeout(() => {
      setCharIdx(c => c + (deleting ? -1 : 1));
      setDisplayed(current.substring(0, charIdx + (deleting ? -1 : 1)));
    }, delay);

    return () => clearTimeout(t);
  }, [charIdx, deleting, pausing, phraseIdx, phrases, typingSpeed, deletingSpeed, pauseMs]);

  return (
    <span className={className}>
      {displayed}
      <span
        className="inline-block w-0.5 h-[1em] ml-0.5 align-middle animate-pulse"
        style={{ background: 'currentColor', verticalAlign: 'middle' }}
      />
    </span>
  );
};
