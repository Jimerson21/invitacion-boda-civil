import { useState } from "react";
import { motion } from "framer-motion";
import { MapPin, Clock, Calendar, Shirt, Heart, ExternalLink, Martini, Calendar1 } from "lucide-react";
import couplePhoto from "@/assets/couple-photo.jpg";
import botanicalFrame from "@/assets/botanical-frame.png";
import EnvelopeOpener from "./EnvelopeOpener";
import CountdownTimer from "./CountdownTimer";
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
              className="font-display text-lg tracking-widest text-muted-foreground mt-6"
              {...fadeUp}
              transition={{ delay: 1.1, duration: 0.8 }}
            >
              23 · 04 · 2026
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
            className="font-elegant text-xl italic text-foreground leading-relaxed"
            {...fadeUp}
          >
            "Con la bendición de Dios en nuestros corazones, 
            <br />
            celebramos la unión de nuestras almas"
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
            <p className="font-elegant text-lg text-muted-foreground mb-6">Jueves, 23 de Abril de 2026</p>

            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-3">
              <MapPin className="w-5 h-5 text-olive" />
            </div>
            <h2 className="font-display text-lg font-semibold text-foreground mb-1">Registro Civil Catedral</h2>
            <p className="font-elegant text-sm text-muted-foreground mb-1">(Casa de Eustoquio Gómez)</p>
            <p className="font-elegant text-base text-muted-foreground mb-3">
              Carrera 17 entre Calles 25 y 26
              <br />
              Barquisimeto, Lara
            </p>
            <motion.a
              href="https://maps.app.goo.gl/AMDVQxThgBXjaXr59"
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

        {/* Dress code */}
        <Section className="text-center">
          <div className="bg-card rounded-2xl p-6 shadow-sm border border-border">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-3">
              <Shirt className="w-5 h-5 text-olive" />
            </div>
            <h2 className="font-display text-xl font-semibold text-foreground mb-2">Código de vestimenta</h2>
            <p className="font-script text-3xl text-olive">Semi-formal</p>
            <p className="font-elegant text-muted-foreground mt-2">
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
            <p className="font-elegant text-sm text-muted-foreground mt-2 text-center">
              Por favor, confirma tu asistencia antes del <span className="text-bold text-lg text-olive"> 10 de abril </span>
              para que podamos organizar todo perfectamente.
            </p>
            <p className="font-elegant font-bold text-sm text-olive mt-4 text-center">
              Esperamos contar con tu presencia
            </p>
          </div>
        </Section>

        <Divider />

        {/* Countdown */}
        <Section className="text-center">
          <h2 className="font-display text-xl font-semibold text-foreground mb-2">Faltan</h2>
          <CountdownTimer />
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
    </>
  );
};

export default WeddingInvitation;
