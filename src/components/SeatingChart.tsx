import { useState } from "react";
import { motion } from "framer-motion";
import { Gem } from "lucide-react";

const GUESTS = [
  { seat: 1, name: "Katerine" },
  { seat: 2, name: "Daily" },
  { seat: 3, name: "Margarita" },
  { seat: 4, name: "Violeta" },
  { seat: 5, name: "Armando" },
  { seat: 6, name: "Agustin" },
  { seat: 7, name: "Mibzar" },
  { seat: 8, name: "Jimerson" },
  { seat: 9, name: "Jendrick" },
  { seat: 10, name: "Hilda" },
  { seat: 11, name: "Nena" },
  { seat: 12, name: "Nataly" },
  { seat: 13, name: "Diosangel" },
  { seat: 14, name: "Jickson" },
  { seat: 15, name: "Lisbeth" },
  { seat: 16, name: "Jimmy" },
];

const SeatingChart = () => {
  const [selectedSeat, setSelectedSeat] = useState<number | null>(null);

  const getGuest = (seat: number) => GUESTS.find((g) => g.seat === seat)!;

  // Layout from notebook: left col 7-1 (top to bottom), right col 15-9, seat 8 bottom center, seat 16 top center
  const leftSeats = [7, 6, 5, 4, 3, 2, 1];
  const rightSeats = [15, 14, 13, 12, 11, 10, 9];
  const bottomSeat = 8;
  const topSeat = 16;

  const SeatButton = ({ seatNum, direction }: { seatNum: number; direction: "left" | "right" | "top" | "bottom" }) => {
    const guest = getGuest(seatNum);
    const isSelected = selectedSeat === seatNum;
    const isCouple = seatNum === 1 || seatNum === 8;

    const isHorizontal = direction === "top" || direction === "bottom";

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
      {/* Top seat (16) */}
      <div className="flex justify-center">
        <SeatButton seatNum={topSeat} direction="top" />
      </div>

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
          <span className="font-elegant text-2xl text-olive italic [writing-mode:vertical-rl]">
            <Gem />
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
