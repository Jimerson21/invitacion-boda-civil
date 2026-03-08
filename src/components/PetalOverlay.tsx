import { useEffect, useState } from "react";

interface Petal {
  id: number;
  left: number;
  size: number;
  delay: number;
  duration: number;
  reverse: boolean;
  opacity: number;
}

const PetalOverlay = () => {
  const [petals, setPetals] = useState<Petal[]>([]);

  useEffect(() => {
    const generated: Petal[] = Array.from({ length: 15 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      size: 8 + Math.random() * 14,
      delay: Math.random() * 8,
      duration: 8 + Math.random() * 7,
      reverse: Math.random() > 0.5,
      opacity: 0.3 + Math.random() * 0.5,
    }));
    setPetals(generated);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {petals.map((p) => (
        <div
          key={p.id}
          className={p.reverse ? "petal-reverse" : "petal"}
          style={{
            left: `${p.left}%`,
            width: p.size,
            height: p.size,
            animationDelay: `${p.delay}s`,
            animationDuration: `${p.duration}s`,
            opacity: p.opacity,
          }}
        >
          <svg viewBox="0 0 24 24" fill="none">
            <path
              d="M12 2C6.5 2 2 6.5 2 12s10 10 10 10 10-4.5 10-10S17.5 2 12 2z"
              fill="hsl(82, 25%, 50%)"
              fillOpacity={0.6}
            />
          </svg>
        </div>
      ))}
    </div>
  );
};

export default PetalOverlay;
