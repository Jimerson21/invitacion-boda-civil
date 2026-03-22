import { motion, AnimatePresence } from "framer-motion";
import { MousePointerClick } from "lucide-react";
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
              className="w-72 h-72 object-contain drop-shadow-2xl"
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
            />
            {/* Animated hand pointing to the envelope */}
            <motion.div
              className="absolute top-1/2 right-8 transform -translate-y-1/2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1, duration: 0.6 }}
            >
              <motion.div
                animate={{
                  x: [0, 8, 0],
                  y: [0, -4, 0],
                }}
                transition={{
                  duration: 1.2,
                  repeat: Infinity,
                  ease: "easeInOut",
                  repeatDelay: 0.3,
                }}
              >
                <MousePointerClick className="w-16 h-16 text-cream drop-shadow-lg" />
              </motion.div>
            </motion.div>

            <motion.p
              className="mt-6 font-elegant text-3xl text-cream tracking-wide"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
            >
              Abrir invitación
            </motion.p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default EnvelopeOpener;
