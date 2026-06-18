const particles = Array.from({ length: 80 }, (_, i) => {
  const seed = Math.sin((i + 1) * 999) * 10000;
  const random = (offset: number) => {
    const value = Math.sin(seed + offset) * 10000;
    return value - Math.floor(value);
  };

  return {
    id: i,
    left: random(1) * 100,
    delay: random(2) * 3,
    duration: 1.5 + random(3) * 2,
    size: 1 + random(4) * 2,
    opacity: 0.1 + random(5) * 0.3,
  };
});

export function ParticleEffect() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-1">
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute rounded-full"
          style={{
            left: `${p.left}%`,
            width: p.size,
            height: p.size * 8,
            background: 'var(--accent)',
            opacity: p.opacity,
            animation: `rainfall ${p.duration}s linear ${p.delay}s infinite`,
          }}
        />
      ))}

      <style>{`
        @keyframes rainfall {
          0% {
            transform: translateY(-10vh);
            opacity: 0;
          }
          10% {
            opacity: 0.3;
          }
          90% {
            opacity: 0.3;
          }
          100% {
            transform: translateY(110vh);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
}
