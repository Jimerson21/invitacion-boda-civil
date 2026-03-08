import { useState } from "react";
import { motion } from "framer-motion";
import { MapPin, Clock, Calendar, Shirt, Heart, ExternalLink, Users } from "lucide-react";
import couplePhoto from "@/assets/couple-photo.jpg";
import coupleImg from "@/assets/wedding-couple.png";
import botanicalFrame from "@/assets/botanical-frame.png";
import EnvelopeOpener from "./EnvelopeOpener";
import CountdownTimer from "./CountdownTimer";
import RSVPForm from "./RSVPForm";
import PetalOverlay from "./PetalOverlay";
import SeatingChart from "./SeatingChart";

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

  return (
    <>
      <EnvelopeOpener isOpen={envelopeOpen} onOpen={() => setEnvelopeOpen(true)} />
      {envelopeOpen && <PetalOverlay />}

      <div className="min-h-screen bg-cream max-w-md mx-auto relative overflow-hidden">
        {/* Hero */}
        <Section className="relative text-center pt-16 pb-8">
          <motion.img
            src={botanicalFrame}
            alt=""
            className="absolute inset-0 w-full h-full object-contain opacity-15 pointer-events-none"
            initial={{ opacity: 0, scale: 1.1 }}
            whileInView={{ opacity: 0.15, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5 }}
          />
          <div className="relative z-10">
            <motion.p
              className="font-elegant text-sm uppercase tracking-[0.3em] text-muted-foreground mb-6"
              {...fadeUp}
              transition={{ delay: 0.2, duration: 0.8 }}
            >
              Nuestra Boda Civil
            </motion.p>
            <motion.h1
              className="font-script text-6xl text-olive-dark leading-tight"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 1, ease: "easeOut" }}
            >
              Jimerson
            </motion.h1>
            <motion.p
              className="font-script text-3xl text-olive-light my-2"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6, duration: 0.8 }}
            >
              &
            </motion.p>
            <motion.h1
              className="font-script text-6xl text-olive-dark leading-tight"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.8, duration: 1, ease: "easeOut" }}
            >
              Katerine
            </motion.h1>
            <motion.p
              className="font-display text-lg tracking-widest text-muted-foreground mt-6"
              {...fadeUp}
              transition={{ delay: 1.1, duration: 0.8 }}
            >
              24 · 04 · 2026
            </motion.p>
          </div>
        </Section>

        {/* Hero photo */}
        <motion.div
          className="mx-6 rounded-2xl overflow-hidden shadow-xl"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <img src={couplePhoto} alt="Jimerson & Katerine" className="w-full h-72 object-cover" />
        </motion.div>

        {/* Quote */}
        <Section className="text-center">
          <motion.p
            className="font-elegant text-lg italic text-foreground leading-relaxed"
            {...fadeUp}
          >
            "Juntos ante la ley y el amor,
            <br />
            celebramos nuestra unión"
          </motion.p>
          <motion.p
            className="font-elegant text-sm text-muted-foreground mt-4 italic"
            {...fadeUp}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            Lo que la ley une, el amor lo eterniza
          </motion.p>
        </Section>

        <Divider />

        {/* Countdown */}
        <Section className="text-center">
          <h2 className="font-display text-xl font-semibold text-foreground mb-2">Faltan</h2>
          <CountdownTimer />
        </Section>

        <Divider />

        {/* Ceremony details */}
        <Section className="text-center space-y-8">
          <div>
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-3">
              <Calendar className="w-5 h-5 text-olive" />
            </div>
            <h2 className="font-display text-xl font-semibold text-foreground mb-1">Ceremonia Civil</h2>
            <p className="font-elegant text-lg text-muted-foreground">Viernes, 24 de Abril de 2026</p>
          </div>

          <div>
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-3">
              <Clock className="w-5 h-5 text-olive" />
            </div>
            <h2 className="font-display text-lg font-semibold text-foreground mb-1">10:00 AM</h2>
          </div>

          <div>
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-3">
              <MapPin className="w-5 h-5 text-olive" />
            </div>
            <h2 className="font-display text-lg font-semibold text-foreground mb-1">Eco Boutique Plaza Hotel</h2>
            <p className="font-elegant text-base text-muted-foreground mb-3">
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
          </div>
        </Section>

        <Divider />

        {/* Couple illustration */}
        <Section className="text-center">
          <motion.img
            src={coupleImg}
            alt="Ilustración de pareja"
            className="w-40 h-40 mx-auto object-contain"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          />
        </Section>

        {/* Dress code */}
        <Section className="text-center">
          <div className="bg-card rounded-2xl p-6 shadow-sm border border-border">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-3">
              <Shirt className="w-5 h-5 text-olive" />
            </div>
            <h2 className="font-display text-xl font-semibold text-foreground mb-2">Código de vestimenta</h2>
            <p className="font-script text-3xl text-olive">Semi-formal</p>
            <p className="font-elegant text-sm text-muted-foreground mt-2">
              Sugerimos tonos neutros y elegantes
            </p>
          </div>
        </Section>

        <Divider />

        {/* Seating Chart */}
        <Section className="text-center">
          <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-3">
            <Users className="w-5 h-5 text-olive" />
          </div>
          <h2 className="font-display text-2xl font-semibold text-foreground mb-2">Distribución de la Mesa</h2>
          <p className="font-elegant text-sm text-muted-foreground mb-6">
            Toca un asiento para ver quién se sienta ahí
          </p>
          <SeatingChart />
        </Section>

        <Divider />

        {/* RSVP */}
        <Section className="">
          <div className="bg-olive-dark rounded-2xl p-6 shadow-lg">
            <h2 className="font-display text-2xl font-semibold text-cream text-center mb-2">Confirmación</h2>
            <p className="font-elegant text-sm text-cream/80 text-center mb-6">
              Agradecemos confirmar tu asistencia antes del 10 de abril
            </p>
            <div className="bg-cream rounded-xl p-5">
              <RSVPForm />
            </div>
          </div>
        </Section>

        {/* Footer */}
        <motion.footer
          className="text-center py-10 px-6 bg-olive-dark"
          {...fadeUp}
        >
          <p className="font-script text-4xl text-cream mb-2">Jimerson & Katerine</p>
          <p className="font-elegant text-sm text-cream/70">24 de Abril de 2026 · Barquisimeto</p>
          <div className="mt-4 flex justify-center">
            <Heart className="w-5 h-5 text-gold" fill="hsl(38, 60%, 55%)" />
          </div>
          <p className="font-elegant text-xs text-cream/50 mt-4">
            ¡Esperamos contar con tu presencia!
          </p>
        </motion.footer>
      </div>
    </>
  );
};

export default WeddingInvitation;
