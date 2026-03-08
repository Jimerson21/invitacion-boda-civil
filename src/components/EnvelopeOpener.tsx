import { motion, AnimatePresence } from "framer-motion";
import envelopeImg from "@/assets/wedding-envelope.png";

interface EnvelopeOpenerProps {
  isOpen: boolean;
  onOpen: () => void;
}

const EnvelopeOpener = ({ isOpen, onOpen }: EnvelopeOpenerProps) => {
  return (
    <AnimatePresence>
      {!isOpen && (
        <motion.div
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-olive-dark"
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2, ease: "easeInOut" }}
        >
          <motion.div
            className="flex flex-col items-center cursor-pointer"
            onClick={onOpen}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <motion.img
              src={envelopeImg}
              alt="Sobre de invitación"
              className="w-56 h-56 object-contain drop-shadow-2xl"
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.p
              className="mt-6 font-script text-3xl text-cream tracking-wide"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
            >
              Abrir invitación
            </motion.p>
            <motion.div
              className="mt-3 w-8 h-8 shimmer"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
            >
              <svg viewBox="0 0 24 24" fill="none" className="text-gold">
                <path d="M12 5v14M5 12l7 7 7-7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default EnvelopeOpener;
