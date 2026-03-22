import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Volume2, VolumeX } from "lucide-react";

interface WeddingMusicProps {
  isActive: boolean;
}

const WeddingMusic = ({ isActive }: WeddingMusicProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const audio = new Audio("/invitacion-boda-civil/music.mp3");
    audio.loop = true;
    audio.volume = 0.4;
    audioRef.current = audio;

    audio.addEventListener("canplaythrough", () => {
      setIsLoaded(true);
    });

    audio.addEventListener("error", () => {
      console.error("Error loading audio");
    });

    return () => {
      audio.pause();
      audio.src = "";
    };
  }, []);

  // Auto-play when envelope opens and music is loaded
  useEffect(() => {
    if (isActive && isLoaded && audioRef.current) {
      const playAudio = async () => {
        try {
          await audioRef.current?.play();
          setIsPlaying(true);
        } catch (error) {
          // Auto-play blocked by browser policy, user needs to click
          console.log("Auto-play blocked, waiting for user interaction");
        }
      };
      playAudio();
    }
  }, [isActive, isLoaded]);

  const toggleMusic = async () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      try {
        await audioRef.current.play();
        setIsPlaying(true);
      } catch (error) {
        console.error("Error playing audio:", error);
      }
    }
  };

  // Don't show until envelope is opened
  if (!isActive) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, scale: 0.8, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.8, y: 20 }}
        transition={{ delay: 1.5, duration: 0.5, ease: "easeOut" }}
        className="fixed top-2 right-1 z-50"
      >
        <motion.button
          onClick={toggleMusic}
          className={`
            relative size-5 rounded-full flex items-center justify-center
            transition-all duration-300 backdrop-blur-sm
            ${isPlaying
              ? "bg-olive/40 text-white/90 shadow-md"
              : "bg-white/40 text-olive-dark/70 shadow-sm"
            }
          `}
          whileHover={{ scale: 1.1, backgroundColor: isPlaying ? "rgba(107, 128, 86, 0.6)" : "rgba(255, 255, 255, 0.6)" }}
          whileTap={{ scale: 0.9 }}
          title={isPlaying ? "Pausar música" : "Reproducir música"}
        >
          {/* Subtle pulse when playing */}
          {isPlaying && (
            <span className="absolute inset-0 rounded-full bg-olive/10 animate-ping" />
          )}

          {/* Icon */}
          <span className="relative">
            {isPlaying ? (
              <Volume2 className="w-3 h-3" />
            ) : (
              <VolumeX className="w-3 h-3" />
            )}
          </span>
        </motion.button>
      </motion.div>
    </AnimatePresence>
  );
};

export default WeddingMusic;
