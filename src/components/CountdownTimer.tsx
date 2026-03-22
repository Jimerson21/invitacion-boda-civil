import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const WEDDING_DATE = new Date("2026-04-23T13:30:00").getTime();

const CountdownTimer = () => {
  const [timeLeft, setTimeLeft] = useState(getTimeLeft());

  function getTimeLeft() {
    const now = Date.now();
    const diff = Math.max(0, WEDDING_DATE - now);
    return {
      days: Math.floor(diff / (1000 * 60 * 60 * 24)),
      hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((diff / (1000 * 60)) % 60),
      seconds: Math.floor((diff / 1000) % 60),
    };
  }

  useEffect(() => {
    const timer = setInterval(() => setTimeLeft(getTimeLeft()), 1000);
    return () => clearInterval(timer);
  }, []);

  const units = [
    { label: "Días", value: timeLeft.days },
    { label: "Horas", value: timeLeft.hours },
    { label: "Min", value: timeLeft.minutes },
    { label: "Seg", value: timeLeft.seconds },
  ];

  return (
    <div className="flex justify-center gap-4">
      {units.map((unit) => (
        <motion.div
          key={unit.label}
          className="flex flex-col items-center"
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          transition={{ type: "spring", stiffness: 200 }}
        >
          <div className="w-16 h-16 rounded-lg bg-olive flex items-center justify-center shadow-lg">
            <span className="font-display text-2xl font-bold text-cream">
              {String(unit.value).padStart(2, "0")}
            </span>
          </div>
          <span className="mt-1 text-xs font-body text-muted-foreground uppercase tracking-widest">
            {unit.label}
          </span>
        </motion.div>
      ))}
    </div>
  );
};

export default CountdownTimer;
