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

  // 15 seats: 5 on each long side, 2 on left short end, 3 on right short end (head)
  const topSeats = GUESTS.slice(2, 7);    // seats 3-7
  const bottomSeats = GUESTS.slice(7, 12); // seats 8-12
  const leftSeats = GUESTS.slice(12, 14);  // seats 13-14
  const rightSeats = [GUESTS[0], GUESTS[1], GUESTS[14]]; // seats 1,2,15

  const SeatButton = ({ guest }: { guest: typeof GUESTS[0] }) => {
    const isSelected = selectedSeat === guest.seat;
    const isCouple = guest.seat === 1 || guest.seat === 2;

    return (
      <motion.button
        onClick={() => setSelectedSeat(isSelected ? null : guest.seat)}
        className={`relative flex flex-col items-center gap-0.5 group`}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        {/* Chair */}
        <div
          className={`w-9 h-9 rounded-full border-2 flex items-center justify-center text-xs font-display font-bold transition-all shadow-sm ${
            isSelected
              ? "bg-primary text-primary-foreground border-primary scale-110"
              : isCouple
              ? "bg-gold text-primary-foreground border-gold"
              : "bg-card text-foreground border-border hover:border-primary"
          }`}
        >
          {guest.seat}
        </div>
        {/* Name tooltip */}
        <span
          className={`text-[10px] font-body leading-tight text-center max-w-[56px] truncate transition-all ${
            isSelected ? "text-primary font-bold" : "text-muted-foreground"
          }`}
        >
          {guest.name}
        </span>
      </motion.button>
    );
  };

  return (
    <div className="flex flex-col items-center gap-6">
      {/* Top row */}
      <div className="flex justify-center gap-3">
        {topSeats.map((g) => (
          <SeatButton key={g.seat} guest={g} />
        ))}
      </div>

      {/* Table */}
      <div className="flex items-center gap-3">
        {/* Left end seats */}
        <div className="flex flex-col gap-3">
          {leftSeats.map((g) => (
            <SeatButton key={g.seat} guest={g} />
          ))}
        </div>

        {/* Table surface */}
        <div className="w-48 h-24 rounded-xl bg-olive/20 border-2 border-olive/40 flex items-center justify-center shadow-inner">
          <span className="font-elegant text-sm text-olive italic">Mesa Principal</span>
        </div>

        {/* Right end seats (head of table - couple) */}
        <div className="flex flex-col gap-2">
          {rightSeats.map((g) => (
            <SeatButton key={g.seat} guest={g} />
          ))}
        </div>
      </div>

      {/* Bottom row */}
      <div className="flex justify-center gap-3">
        {bottomSeats.map((g) => (
          <SeatButton key={g.seat} guest={g} />
        ))}
      </div>

      {/* Selected info */}
      {selectedSeat && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-card border border-border rounded-xl px-5 py-3 text-center shadow-sm"
        >
          <p className="font-display text-sm font-semibold text-foreground">
            Asiento #{selectedSeat}
          </p>
          <p className="font-elegant text-base text-primary">
            {GUESTS.find((g) => g.seat === selectedSeat)?.name}
          </p>
        </motion.div>
      )}

      {/* Legend */}
      <div className="flex gap-4 text-[11px] font-body text-muted-foreground">
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded-full bg-gold border border-gold" />
          Novios
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded-full bg-card border-2 border-border" />
          Invitados
        </div>
      </div>
    </div>
  );
};

export default SeatingChart;
