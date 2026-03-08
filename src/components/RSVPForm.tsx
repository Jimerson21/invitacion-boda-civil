import { useState } from "react";
import { motion } from "framer-motion";
import { z } from "zod";

const rsvpSchema = z.object({
  name: z.string().trim().min(1, "Por favor ingresa tu nombre").max(100),
  guests: z.string().min(1, "Selecciona número de acompañantes"),
  attendance: z.enum(["yes", "no"], { required_error: "Confirma tu asistencia" }),
  message: z.string().max(500).optional(),
});

const RSVPForm = () => {
  const [form, setForm] = useState({ name: "", guests: "1", attendance: "", message: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const result = rsvpSchema.safeParse(form);
    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.errors.forEach((err) => {
        if (err.path[0]) fieldErrors[String(err.path[0])] = err.message;
      });
      setErrors(fieldErrors);
      return;
    }
    setErrors({});
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center py-8"
      >
        <div className="text-5xl mb-4">💚</div>
        <h3 className="font-display text-2xl text-foreground mb-2">¡Gracias por confirmar!</h3>
        <p className="font-elegant text-lg text-muted-foreground">
          {form.attendance === "yes"
            ? "Nos emociona contar con tu presencia"
            : "Lamentamos que no puedas asistir. ¡Te llevaremos en el corazón!"}
        </p>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5 max-w-sm mx-auto">
      <div>
        <label className="block font-elegant text-sm font-semibold text-foreground mb-1">
          Nombre completo
        </label>
        <input
          type="text"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          className="w-full px-4 py-2.5 rounded-lg border border-border bg-background font-body text-sm focus:outline-none focus:ring-2 focus:ring-ring transition"
          placeholder="Tu nombre"
        />
        {errors.name && <p className="text-destructive text-xs mt-1">{errors.name}</p>}
      </div>

      <div>
        <label className="block font-elegant text-sm font-semibold text-foreground mb-1">
          ¿Asistirás?
        </label>
        <div className="flex gap-3">
          {[
            { value: "yes", label: "Sí, asistiré" },
            { value: "no", label: "No podré asistir" },
          ].map((opt) => (
            <button
              key={opt.value}
              type="button"
              onClick={() => setForm({ ...form, attendance: opt.value })}
              className={`flex-1 py-2.5 rounded-lg border text-sm font-body transition-all ${
                form.attendance === opt.value
                  ? "bg-primary text-primary-foreground border-primary"
                  : "bg-background text-foreground border-border hover:border-primary"
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
        {errors.attendance && <p className="text-destructive text-xs mt-1">{errors.attendance}</p>}
      </div>

      <div>
        <label className="block font-elegant text-sm font-semibold text-foreground mb-1">
          Número de acompañantes
        </label>
        <select
          value={form.guests}
          onChange={(e) => setForm({ ...form, guests: e.target.value })}
          className="w-full px-4 py-2.5 rounded-lg border border-border bg-background font-body text-sm focus:outline-none focus:ring-2 focus:ring-ring"
        >
          {[1, 2, 3, 4, 5].map((n) => (
            <option key={n} value={String(n)}>{n} {n === 1 ? "persona" : "personas"}</option>
          ))}
        </select>
      </div>

      <div>
        <label className="block font-elegant text-sm font-semibold text-foreground mb-1">
          Mensaje para los novios (opcional)
        </label>
        <textarea
          value={form.message}
          onChange={(e) => setForm({ ...form, message: e.target.value })}
          rows={3}
          className="w-full px-4 py-2.5 rounded-lg border border-border bg-background font-body text-sm focus:outline-none focus:ring-2 focus:ring-ring resize-none"
          placeholder="Escribe un mensaje..."
        />
      </div>

      <motion.button
        type="submit"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="w-full py-3 rounded-lg bg-primary text-primary-foreground font-display text-base font-semibold tracking-wide shadow-lg hover:opacity-90 transition"
      >
        Confirmar asistencia
      </motion.button>
    </form>
  );
};

export default RSVPForm;
