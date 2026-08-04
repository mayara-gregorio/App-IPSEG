"use client";

import { ArrowRight } from "lucide-react";
import { useState } from "react";

type Status = "idle" | "loading" | "success" | "error";

interface ContactFormProps {
  onSuccess?: () => void;
}

export default function ContactForm({ onSuccess }: ContactFormProps) {
  const [formData, setFormData] = useState({ nome: "", telefone: "", email: "", mensagem: "" });
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    setMessage(null);

    try {
      const res = await fetch("/api/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const payload = await res.json().catch(() => null);

      if (!res.ok) {
        throw new Error(payload?.error || "Falha no envio");
      }

      setStatus("success");
      setFormData({ nome: "", telefone: "", email: "", mensagem: "" });
      setMessage("Mensagem enviada com sucesso!");
      onSuccess?.();
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Falha no envio";
      console.error(errorMessage);
      setStatus("error");
      setMessage(errorMessage);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        <h3 className="font-['Playfair_Display',serif] text-2xl font-700 mb-1">
        Envie sua mensagem
        </h3>

        {[
        { id: "nome", label: "Nome", type: "text", placeholder: "Seu nome completo" },
        { id: "telefone", label: "Telefone", type: "tel", placeholder: "(11) 9 9999-9999" },
        { id: "email", label: "E-mail", type: "email", placeholder: "seu@email.com.br" },
        ].map((f) => (
        <div key={f.id} className="flex flex-col gap-1.5">
            <label htmlFor={f.id}
            className="text-xs uppercase tracking-wide text-muted-foreground">
            {f.label}
            </label>
            <input
            id={f.id} type={f.type} required placeholder={f.placeholder}
            value={formData[f.id as keyof typeof formData]}
            onChange={(e) => setFormData({ ...formData, [f.id]: e.target.value })}
            className="bg-secondary border border-border rounded-sm px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors"
            />
        </div>
        ))}

        <div className="flex flex-col gap-1.5">
        <label htmlFor="mensagem"
            className="text-xs uppercase tracking-wide text-muted-foreground">
            Mensagem
        </label>
        <textarea
            id="mensagem" required rows={4}
            placeholder="Conte sobre seu negócio e como podemos ajudar..."
            value={formData.mensagem}
            onChange={(e) => setFormData({ ...formData, mensagem: e.target.value })}
            className="bg-secondary border border-border rounded-sm px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors resize-none"
        />
        </div>

        <button type="submit"
        className="mt-2 inline-flex items-center justify-center gap-3 px-8 py-3.5 text-sm font-500 rounded-sm transition-all duration-200 hover:gap-5"
        style={{ background: "var(--primary)", color: "var(--primary-foreground)" }}>
        Enviar <ArrowRight size={16} />
        </button>

        {message ? (
          <p
            aria-live="polite"
            className={`text-sm ${status === "success" ? "text-green-600" : "text-red-600"}`}
          >
            {message}
          </p>
        ) : null}
    </form>
  );
}