import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Clock, Calendar, Shirt, Heart, ExternalLink, Martini, Calendar1, ChevronDown, X, Play } from "lucide-react";
import couplePhoto from "@/assets/couple-photo.jpg";
import botanicalFrame from "@/assets/botanical-frame.png";
import EnvelopeOpener from "./EnvelopeOpener";
import CountdownTimer from "./CountdownTimer";
import PetalOverlay from "./PetalOverlay";
import SeatingChart from "./SeatingChart";
import WeddingMusic from "./WeddingMusic";

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-50px" },
  transition: { duration: 0.8, ease: "easeOut" as const },
};

const Section = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <motion.section {...fadeUp} className={`px-6 py-12 ${className}`}>
    {children}
  </motion.section>
);

const Divider = () => (
  <div className="flex items-center justify-center gap-3 px-6">
    <div className="h-px flex-1 bg-border" />
    <Heart className="w-4 h-4 text-olive-light" fill="hsl(82, 25%, 50%)" />
    <div className="h-px flex-1 bg-border" />
  </div>
);

const WeddingInvitation = () => {
  const [envelopeOpen, setEnvelopeOpen] = useState(false);
  const [showVideo, setShowVideo] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleOpenVideo = () => {
    setShowVideo(true);
  };

  const handleVideoReady = () => {
    // Try to autoplay when video is ready (muted autoplay works on mobile)
    const playPromise = videoRef.current?.play();
    if (playPromise) {
      playPromise.catch(() => {
        // Autoplay was prevented, user will need to tap play button
      });
    }
  };

  const handleCloseVideo = () => {
    videoRef.current?.pause();
    setShowVideo(false);
  };

  return (
    <>
      <EnvelopeOpener isOpen={envelopeOpen} onOpen={() => setEnvelopeOpen(true)} />
      <WeddingMusic isActive={envelopeOpen} />
      {envelopeOpen && <PetalOverlay />}

      <div className="min-h-screen bg-cream max-w-md mx-auto relative overflow-hidden">
        {/* Hero */}
        <Section className="relative text-center pt-16 pb-14">
          <motion.img
            src={botanicalFrame}
            alt=""
            className="absolute top-1 left-1 inset-0 w-full h-full object-contain opacity-15 pointer-events-none"
            initial={{ opacity: 0, scale: 1.1 }}
            whileInView={{ opacity: 0.15, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5 }}
          />
          <div className="relative z-10">
            <motion.div {...fadeUp} transition={{ delay: 0.2, duration: 0.8 }} className="pb-12">
              <p className="font-medium text-[12px] uppercase tracking-[0.3em]">
                Nuestra Boda Civil
              </p>
            </motion.div>
            <motion.h1
              className="font-script text-4xl text-olive-dark leading-tight"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 1, ease: "easeOut" }}
            >
              Jimerson
            </motion.h1>
            <motion.p
              className="font-script text-3xl text-olive-light"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6, duration: 0.8 }}
            >
              &
            </motion.p>
            <motion.h1
              className="font-script text-4xl text-olive-dark leading-tight"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.8, duration: 1, ease: "easeOut" }}
            >
              Katerine
            </motion.h1>
            <motion.p
              className="font-display text-lg tracking-widest text-foreground mt-6"
              {...fadeUp}
              transition={{ delay: 1.1, duration: 0.8 }}
            >
              23 · 04 · 2026
            </motion.p>
          </div>
        </Section>

        {/* Hero photo */}
        <motion.div
          className="mx-6 rounded-2xl overflow-hidden shadow-xl relative group cursor-pointer"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          onClick={handleOpenVideo}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <img src={couplePhoto} alt="Jimerson & Katerine" className="w-full h-72 object-cover" />
          {/* Play button overlay - always visible on mobile, hover on desktop */}
          <motion.div
            className="absolute inset-0 bg-black/30 flex items-center justify-center transition-opacity duration-300 opacity-100 md:opacity-0 md:group-hover:opacity-100"
            initial={false}
          >
            <div className="w-10 h-10 rounded-full bg-white/90 flex items-center justify-center shadow-lg">
              <Play className="w-5 h-5 text-olive-dark ml-0.5" fill="currentColor" />
            </div>
          </motion.div>
          {/* Hint text - always visible on mobile */}
          <div className="absolute bottom-3 left-0 right-0 text-center opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-300">
            <span className="text-white text-xs font-medium bg-black/60 px-4 py-1.5 rounded-full">
              Toca para ver el video
            </span>
          </div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          className="flex justify-center mt-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.8 }}
        >
          <motion.div
            className="w-8 h-8 rounded-full bg-olive/20 flex items-center justify-center"
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
          >
            <ChevronDown className="w-5 h-5 text-olive" />
          </motion.div>
        </motion.div>

        {/* Quote */}
        <Section className="text-center py-6">
          <motion.p
            className="font-elegant text-xl italic text-foreground leading-relaxed"
            {...fadeUp}
          >
            Mas que un compromiso,
            <br />
            la promesa de permanecer una vida juntos
          </motion.p>
          <motion.p
            className="font-elegant text-sm italic text-foreground leading-relaxed mt-4"
            {...fadeUp}
          >
            Con la bendición de Dios en nuestros corazones, 
            <br />
            celebramos la unión de nuestras almas
          </motion.p>
        </Section>

        <Divider />

        {/* Ceremony details */}
        <Section className="text-center">
          <div className="bg-card rounded-2xl p-6 shadow-sm border border-border">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-3">
              <Calendar className="w-5 h-5 text-olive" />
            </div>
            <h2 className="font-display text-xl font-semibold text-foreground mb-1">Ceremonia Civil</h2>
            <p className="font-elegant text-lg text-foreground mb-6">Jueves, 23 de Abril de 2026</p>

            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-3">
              <MapPin className="w-5 h-5 text-olive" />
            </div>
            <h2 className="font-display text-lg font-semibold text-foreground mb-1">Registro Civil Catedral</h2>
            <p className="font-elegant text-sm text-foreground mb-1">(Casa de Eustoquio Gómez)</p>
            <p className="font-elegant text-base text-foreground mb-3">
              Carrera 17 entre Calles 25 y 26
              <br />
              Barquisimeto, Lara
            </p>
            <motion.a
              href="https://maps.app.goo.gl/8CfqfKZbrEDK4hdd9"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-primary text-primary font-body text-sm font-semibold hover:bg-primary hover:text-primary-foreground transition-all mb-6"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              <MapPin className="w-4 h-4" />
              Ver ubicación
              <ExternalLink className="w-3 h-3" />
            </motion.a>

            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-3">
              <Clock className="w-5 h-5 text-olive" />
            </div>
            <h2 className="font-display text-lg font-semibold text-foreground mb-1">1:30 pm</h2>
          </div>
        </Section>

        <Divider />

        {/* Countdown */}
        <Section className="text-center">
          <h2 className="font-display text-xl font-semibold text-foreground mb-2">Faltan</h2>
          <CountdownTimer />
        </Section>

        <Divider />

        {/* Dress code */}
        <Section className="text-center">
          <div className="bg-card rounded-2xl p-6 shadow-sm border border-border">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-3">
              <Shirt className="w-5 h-5 text-olive" />
            </div>
            <h2 className="font-display text-xl font-semibold text-foreground mb-2">Código de vestimenta</h2>
            <p className="font-script text-3xl text-olive">Semi-formal</p>
            <p className="font-elegant text-foreground mt-2">
              Sugerimos tonos neutros y elegantes. Evitar el color blanco y beige, reservados para los novios
            </p>
          </div>
        </Section>

        <Divider />

        {/* Seating Chart */}
        <Section className="text-center">
          <div className="bg-card rounded-2xl p-6 shadow-sm border border-border">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-3">
              <Martini className="w-5 h-5 text-olive" />
            </div>
            <h2 className="font-display text-xl font-semibold text-foreground mb-6">Almuerzo de Celebración</h2>
            <h2 className="font-display font-semibold text-foreground mb-1">Eco Boutique Plaza Hotel</h2>
            <p className="font-elegant text-base text-foreground mb-3">
              Carrera 17 entre calles 22 y 23
              <br />
              Barquisimeto, Lara
            </p>
            <motion.a
              href="https://maps.app.goo.gl/uM52PbZkd569kDcr9"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-primary text-primary font-body text-sm font-semibold hover:bg-primary hover:text-primary-foreground transition-all"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              <MapPin className="w-4 h-4" />
              Ver ubicación
              <ExternalLink className="w-3 h-3" />
            </motion.a>

            <div className="mt-8">
              <SeatingChart />
            </div>
          </div>
        </Section>

        <Divider />

        {/* RSVP */}
        <Section className="">
          <div className="bg-card rounded-2xl p-6 shadow-sm border border-border">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-3">
              <Calendar1 className="w-5 h-5 text-olive" />
            </div>
            <h2 className="font-display text-xl font-semibold text-foreground text-center mb-2">Confirma tu asistencia</h2>
            <p className="font-elegant text-foreground mt-2 text-center">
              Por favor, confirma tu asistencia antes del <span className="font-bold text-olive">10 de abril</span> para que podamos organizar todo perfectamente.
            </p>
            <p className="font-elegant font-bold text-sm text-olive mt-4 text-center">
              Esperamos contar con tu presencia
            </p>
          </div>
        </Section>

        {/* Footer */}
        <motion.footer
          className="text-center py-10 px-6 bg-olive-dark"
          {...fadeUp}
        >
          <p className="font-script text-4xl text-cream mb-2">Jimerson & Katerine</p>
          <p className="font-elegant text-sm text-cream/70">23 de Abril de 2026 · Barquisimeto</p>
          <div className="mt-4 flex justify-center">
            <Heart className="w-5 h-5 text-white" fill="hsl(0, 0.00%, 100.00%)" />
          </div>
        </motion.footer>
      </div>

      {/* Video Modal */}
      <AnimatePresence>
        {showVideo && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={handleCloseVideo}
          >
            <motion.div
              className="relative w-full max-w-lg"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close button */}
              <button
                onClick={handleCloseVideo}
                className="absolute -top-12 right-0 w-10 h-10 rounded-full bg-white/20 flex items-center justify-center text-white hover:bg-white/30 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
              
                {/* Video */}
              <div className="rounded-xl overflow-hidden bg-black shadow-2xl">
                <video
                  ref={videoRef}
                  src="./video.mp4"
                  className="w-full h-auto max-h-[70vh]"
                  controls
                  playsInline
                  preload="metadata"
                  muted
                  onCanPlay={handleVideoReady}
                />
              </div>
              
              <p className="text-white/70 text-center mt-4 text-sm font-elegant">
                Click fuera del video para cerrar
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default WeddingInvitation;
