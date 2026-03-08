import { useState } from "react";
import { motion } from "framer-motion";

const GUESTS = [
  { seat: 1, name: "Jimerson" },
  { seat: 2, name: "Katerine" },
  { seat: 3, name: "Mamá Rosa" },
  { seat: 4, name: "Papá Carlos" },
  { seat: 5, name: "Tía María" },
  { seat: 6, name: "Tío Juan" },
  { seat: 7, name: "Andrea" },
  { seat: 8, name: "Luis" },
  { seat: 9, name: "Sofía" },
  { seat: 10, name: "Pedro" },
  { seat: 11, name: "Carmen" },
  { seat: 12, name: "Miguel" },
  { seat: 13, name: "Valentina" },
  { seat: 14, name: "Gabriel" },
  { seat: 15, name: "Isabella" },
];

const SeatingChart = () => {
  const [selectedSeat, setSelectedSeat] = useState<number | null>(null);

  // Distribution matching the reference image:
  // Top: 4 seats, Bottom: 5 seats, Left: 3 seats, Right: 3 seats
  const topSeats = GUESTS.slice(0, 4);      // seats 1-4
  const rightSeats = GUESTS.slice(4, 7);     // seats 5-7
  const bottomSeats = GUESTS.slice(7, 12);   // seats 8-12
  const leftSeats = GUESTS.slice(12, 15);    // seats 13-15

  const Chair = ({ guest }: { guest: typeof GUESTS[0] }) => {
    const isSelected = selectedSeat === guest.seat;
    const isCouple = guest.seat === 1 || guest.seat === 2;

    return (
      <motion.button
        onClick={() => setSelectedSeat(isSelected ? null : guest.seat)}
        className="flex flex-col items-center gap-1"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        {/* Chair shape - rounded square with inner seat */}
        <div
          className={`w-10 h-10 rounded-lg border-[2.5px] flex items-center justify-center transition-all ${
            isSelected
              ? "bg-olive border-olive text-cream shadow-md"
              : isCouple
              ? "bg-gold/30 border-gold text-gold"
              : "bg-olive/15 border-olive/50 text-olive"
          }`}
        >
          {/* Inner seat cushion */}
          <div
            className={`w-5 h-5 rounded-[4px] border-[1.5px] flex items-center justify-center text-[9px] font-bold font-display ${
              isSelected
                ? "bg-cream/30 border-cream/50 text-cream"
                : isCouple
                ? "bg-gold/20 border-gold/40 text-gold"
                : "bg-olive/10 border-olive/30 text-olive"
            }`}
          >
            {guest.seat}
          </div>
        </div>
        <span
          className={`text-[9px] font-body leading-tight text-center max-w-[52px] truncate ${
            isSelected ? "text-olive font-bold" : "text-muted-foreground"
          }`}
        >
          {guest.name}
        </span>
      </motion.button>
    );
  };

  return (
    <div className="flex flex-col items-center gap-4">
      {/* Top row */}
      <div className="flex justify-center gap-4">
        {topSeats.map((g) => (
          <Chair key={g.seat} guest={g} />
        ))}
      </div>

      {/* Middle: left seats + table + right seats */}
      <div className="flex items-center gap-4">
        {/* Left seats */}
        <div className="flex flex-col gap-3">
          {leftSeats.map((g) => (
            <Chair key={g.seat} guest={g} />
          ))}
        </div>

        {/* Table */}
        <div className="w-52 h-28 rounded-2xl bg-olive/40 border-[3px] border-olive/60 flex items-center justify-center shadow-inner">
          <span className="font-elegant text-sm text-olive italic">Mesa Principal</span>
        </div>

        {/* Right seats */}
        <div className="flex flex-col gap-3">
          {rightSeats.map((g) => (
            <Chair key={g.seat} guest={g} />
          ))}
        </div>
      </div>

      {/* Bottom row */}
      <div className="flex justify-center gap-4">
        {bottomSeats.map((g) => (
          <Chair key={g.seat} guest={g} />
        ))}
      </div>

      {/* Selected info */}
      {selectedSeat && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-card border border-olive/30 rounded-xl px-5 py-3 text-center shadow-sm"
        >
          <p className="font-display text-sm font-semibold text-foreground">
            Asiento #{selectedSeat}
          </p>
          <p className="font-elegant text-base text-olive">
            {GUESTS.find((g) => g.seat === selectedSeat)?.name}
          </p>
        </motion.div>
      )}

      {/* Legend */}
      <div className="flex gap-4 text-[11px] font-body text-muted-foreground">
        <div className="flex items-center gap-1.5">
          <div className="w-3.5 h-3.5 rounded bg-gold/30 border-2 border-gold" />
          Novios
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-3.5 h-3.5 rounded bg-olive/15 border-2 border-olive/50" />
          Invitados
        </div>
      </div>
    </div>
  );
};

export default SeatingChart;
