// Ambient background orbs — dark cyber themed
export const FloatingShapes = () => (
  <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
    {/* Top-right sky orb */}
    <div
      className="absolute -top-48 -right-48 w-[600px] h-[600px] rounded-full animate-float-slow"
      style={{
        background: 'radial-gradient(circle, rgba(56,189,248,0.07) 0%, transparent 70%)',
        filter: 'blur(40px)',
        animationDelay: '0s',
      }}
    />
    {/* Bottom-left violet orb */}
    <div
      className="absolute -bottom-40 -left-40 w-[500px] h-[500px] rounded-full animate-float"
      style={{
        background: 'radial-gradient(circle, rgba(129,140,248,0.07) 0%, transparent 70%)',
        filter: 'blur(40px)',
        animationDelay: '2s',
      }}
    />
    {/* Center subtle orb */}
    <div
      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full"
      style={{
        background: 'radial-gradient(circle, rgba(14,165,233,0.03) 0%, transparent 60%)',
        filter: 'blur(60px)',
      }}
    />
    {/* Subtle grid overlay */}
    <div
      className="absolute inset-0"
      style={{
        backgroundImage:
          'linear-gradient(rgba(56,189,248,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(56,189,248,0.025) 1px, transparent 1px)',
        backgroundSize: '60px 60px',
      }}
    />
  </div>
);
