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

  const getGuest = (seat: number) => GUESTS.find((g) => g.seat === seat)!;

  // Layout from notebook: left col 7-1 (top to bottom), right col 15-9, seat 8 bottom center
  const leftSeats = [7, 6, 5, 4, 3, 2, 1];
  const rightSeats = [15, 14, 12, 13, 10, 11, 9];
  const bottomSeat = 8;

  const SeatButton = ({ seatNum, direction }: { seatNum: number; direction: "left" | "right" | "bottom" }) => {
    const guest = getGuest(seatNum);
    const isSelected = selectedSeat === seatNum;
    const isCouple = seatNum === 1 || seatNum === 8;

    const isHorizontal = direction === "bottom";

    return (
      <motion.button
        onClick={() => setSelectedSeat(isSelected ? null : seatNum)}
        className={`relative flex ${isHorizontal ? "flex-col" : direction === "left" ? "flex-row-reverse" : "flex-row"} items-center gap-1 group`}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
      >
        {/* Chair back */}
        <div
          className={`flex items-center justify-center rounded-md border-2 font-display text-xs font-bold transition-all ${
            isCouple
              ? "bg-gold text-primary-foreground border-gold"
              : isSelected
              ? "bg-primary text-primary-foreground border-primary"
              : "bg-olive/20 text-foreground border-olive/50 hover:border-primary"
          } ${isHorizontal ? "w-9 h-8" : "w-8 h-9"}`}
        >
          {seatNum}
        </div>
        {/* Chair seat (cushion) */}
        <div
          className={`rounded-sm border-2 ${
            isCouple
              ? "border-gold bg-gold/30"
              : isSelected
              ? "border-primary bg-primary/20"
              : "border-olive/40 bg-olive/10"
          } ${isHorizontal ? "w-7 h-3" : "w-3 h-7"}`}
        />
        {/* Name */}
        <span
          className={`absolute text-[9px] font-body leading-tight text-center whitespace-nowrap transition-all ${
            isSelected ? "text-primary font-bold" : "text-muted-foreground"
          } ${
            direction === "left"
              ? "right-full mr-1"
              : direction === "right"
              ? "left-full ml-1"
              : "top-full mt-0.5"
          }`}
        >
          {guest.name}
        </span>
      </motion.button>
    );
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="flex items-center gap-2">
        {/* Left column of seats */}
        <div className="flex flex-col items-end gap-2">
          {leftSeats.map((s) => (
            <SeatButton key={s} seatNum={s} direction="left" />
          ))}
        </div>

        {/* Table */}
        <div className="w-28 sm:w-36 rounded-xl bg-olive/25 border-2 border-olive/50 flex items-center justify-center shadow-inner"
          style={{ height: `${leftSeats.length * 44 + (leftSeats.length - 1) * 8}px` }}
        >
          <span className="font-elegant text-sm text-olive italic [writing-mode:vertical-rl] rotate-180">
            Mesa Principal
          </span>
        </div>

        {/* Right column of seats */}
        <div className="flex flex-col items-start gap-2">
          {rightSeats.map((s) => (
            <SeatButton key={s} seatNum={s} direction="right" />
          ))}
        </div>
      </div>

      {/* Bottom seat (8) */}
      <div className="flex justify-center -mt-1">
        <SeatButton seatNum={bottomSeat} direction="bottom" />
      </div>

      {/* Selected info */}
      {selectedSeat && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-card border border-border rounded-xl px-5 py-3 text-center shadow-sm mt-2"
        >
          <p className="font-display text-sm font-semibold text-foreground">
            Asiento #{selectedSeat}
          </p>
          <p className="font-elegant text-base text-primary">
            {getGuest(selectedSeat).name}
          </p>
        </motion.div>
      )}

      {/* Legend */}
      <div className="flex gap-4 text-[11px] font-body text-muted-foreground">
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded-sm bg-gold border border-gold" />
          Novios
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded-sm bg-olive/20 border-2 border-olive/50" />
          Invitados
        </div>
      </div>
    </div>
  );
};

export default SeatingChart;
