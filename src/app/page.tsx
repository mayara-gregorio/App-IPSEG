"use client"

import "../styles/theme.css"
import "../styles/fonts.css"
import "../styles/globals.css"
import "../styles/index.css"
import "../styles/tailwind.css"

import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import {
  Menu, X, ChevronDown, Mail, Phone, MapPin, ArrowRight,
  Cloud, Brain, Users, Lightbulb, Layers, Database,
  Smartphone, Monitor, ExternalLink
} from "lucide-react";

const slides = [
  {
    id: 0,
    headline: "Banner com a frase Soluções em Segurança Inteligente",
    cta: "Acessar Minhas Câmeras",
    ctaHref: "https://cloud.ipseg.com.br",
    image: "/IPSEG - Desktop.svg",
    imageMobile: "/IPSEG - Mobile.svg",
  },
  {
    id: 1,
    headline: "Segurança e automação inteligente na palma da sua mão. Monitore e automatize sua casa você mesmo de onde estiver, com total praticidade e controle.",
    cta: "Saber Mais Sobre",
    ctaHref: "#servicos",
    image: "/IPSEG Smart - Desktop.svg",
    imageMobile: "/IPSEG Smart - Mobile.svg",
  },
];

const services = [
  {
    icon: Cloud,
    title: "IPSEG",
    desc: "Acesse suas câmeras com o menor delay do mercado de qualquer dispositivo.",
    features: ["Armazenamento em Nuvem", "Acesso pelo Aplicativo IPSEG", "Armazenamento escalável"],
  },
  {
    icon: Brain,
    title: "ISPEG Smart",
    desc: "Sistema de detecção de movimento através de câmeras  IP's com notificações direto no seu celular.",
    features: ["Detecção de movimentos", "Acesso pelo Aplicativo IPSEG Smart", "Captura de Incidentes"],
  },
  {
    icon: Users,
    title: "Automonitoramento Colaborativo",
    desc: "Compartilhe câmeras com vizinhos. Construa uma rede de segurança coletiva e eficiente.",
    features: ["Compartilhamento de Câmeras", "+ Segurança", "Rede colaborativa"],
  },
];

const features = [
  { icon: Cloud, label: "Armazenamento 100% em nuvem" },
  { icon: Layers, label: "Integração com diversas câmeras IP" },
  { icon: Database, label: "Armazenamento seguro e escalável" },
  { icon: Brain, label: "IA para detecção eficiente" },
  { icon: Lightbulb, label: "Integração com diversos dispositivos de automação" },
  { icon: Monitor, label: "Acesso de qualquer dispositivo" },
];

const partners = [
  { name: "Diney Infor", logo: "/Logo Diney Infor.png"},
  { name: "Infoplus Fiber", logo: "/Logo Infoplus.png"},
  { name: "RR Informática", logo: "/Logo RR.png"},
  { name: "SOF Telecom", logo: "/Logo SOF Telecom.png"},
  { name: "Tcnosat", logo: "/Logo Tcnosat.png"},
];

const clientProducts = [
  {
    logo: "/Logo IPSEG.svg",
    name: "IPSEG",
    desc: "Acesse suas câmeras com o menor delay do mercado de qualquer dispositivo.",
    hasWebsite: true,
    websiteUrl: "https://cloud.ipseg.com.br",
    websiteLabel: "Acessar pelo Navegador",
    appStoreUrl: "https://apps.apple.com",
    playStoreUrl: "https://play.google.com",
    youtubeLink: true,
    color: "#3dd638",
  },
  {
    logo: "/Logo IPSEG Track.svg",
    name: "IPSEG Track",
    desc: "Rastreamento e monitoramento de ativos em tempo real com total precisão.",
    hasWebsite: true,
    websiteUrl: "https://track.ipseg.com.br",
    websiteLabel: "Acessar pelo Navegador",
    appStoreUrl: "https://apps.apple.com",
    playStoreUrl: "https://play.google.com",
    youtubeLink: false,
    color: "#3dd638",
  },
  {
    logo: "/Logo IPSEG Smart.svg",
    name: "IPSEG Smart",
    desc: "Segurança e automação inteligente na palma da sua mão. Monitore e automatize de onde estiver.",
    hasWebsite: false,
    websiteUrl: "",
    websiteLabel: "",
    appStoreUrl: "https://apps.apple.com",
    playStoreUrl: "https://play.google.com",
    youtubeLink: false,
    color: "#3dd638",
  },
];

function useScrolled() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);
  return scrolled;
}

export default function App() {
  const [current, setCurrent] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [formData, setFormData] = useState({ nome: "", telefone: "", email: "", mensagem: "" });
  const [sent, setSent] = useState(false);
  const scrolled = useScrolled();
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    intervalRef.current = setInterval(() => setCurrent((c) => (c + 1) % slides.length), 5000);
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, []);

  const goTo = (i: number) => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    setCurrent(i);
    intervalRef.current = setInterval(() => setCurrent((c) => (c + 1) % slides.length), 5000);
  };

  const scrollTo = (id: string) => {
    setMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  const navLinks = [
    { label: "Início", id: "inicio" },
    { label: "Área do Cliente", id: "clientes"},
    { label: "Serviços", id: "servicos" },
    { label: "Parceiros", id: "parceiros" },
    { label: "Sobre", id: "sobre" },
    { label: "Contato", id: "contato" },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground font-sans overflow-x-hidden">
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? "bg-background/95 backdrop-blur-md border-b border-border" : "bg-transparent"}`}>
        <div className="max-w-7xl mx-auto px-6 lg:px-12 flex items-center justify-between py-4 bg-white">
          <button onClick={() => scrollTo("inicio")}>
            <Image src="/logoipseg.svg" alt="IPSEG" width={160} height={40} className="w-40 h-auto" />
          </button>

          <ul className="hidden lg:flex gap-4">
            {navLinks.map((l) => (
              <li key={l.id}>
                <button
                  onClick={() => scrollTo(l.id)}
                  className="text-sm tracking-wide text-muted-foreground hover:text-foreground transition-colors duration-200"
                >
                  {l.label}
                </button>
              </li>
            ))}
          </ul>

          <div className="hidden lg:flex items-center gap-3">
            <button
              onClick={() => window.open("https://cloud.ipseg.com.br", "_blank")}
              className="text-sm px-4 py-2 rounded-sm border transition-all duration-200 text-[var(--primary)] hover:bg-primary hover:text-primary-foreground hover:border-primary"
              style={{ borderColor: "var(--primary)"}}
            >
              Acessar Minhas Câmeras
            </button>
            <button
              onClick={() => scrollTo("contato")}
              className="text-sm px-5 py-2 rounded-sm font-500 transition-all duration-200 hover:opacity-90 flex items-center gap-2"
              style={{ background: "var(--primary)", color: "var(--primary-foreground)" }}
            >
              Ser Parceiro <ArrowRight size={14} />
            </button>
          </div>

          <button className="lg:hidden text-foreground" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {menuOpen && (
          <div className="lg:hidden bg-card border-t border-border px-6 py-6 flex flex-col gap-5">
            {navLinks.map((l) => (
              <button key={l.id} onClick={() => scrollTo(l.id)}
                className="text-left text-sm tracking-wide text-muted-foreground hover:text-foreground transition-colors">
                {l.label}
              </button>
            ))}
            <button
              onClick={() => { setMenuOpen(false); scrollTo("contato"); }}
              className="text-sm px-5 py-2 rounded-sm font-500 text-center"
              style={{ background: "var(--primary)", color: "var(--primary-foreground)" }}
            >
              Quero Ser Parceiro
            </button>
          </div>
        )}
      </nav>

      <section id="inicio" className="relative h-screen min-h-[620px] overflow-hidden"
        style={{ background: "var(--backgreen)" }}>
        {slides.map((s, i) => (
        <div key={s.id} className="absolute inset-0 transition-opacity duration-1000"
          style={{ opacity: i === current ? 1 : 0 }}>

          <Image
            src={s.image}
            alt={s.headline}
            fill
            className="hidden md:block"
            unoptimized
            priority={i === 0}
           
          />

          <Image
            src={"/Fundo.png"}
            alt={s.headline}
            fill
            className="object-cover"
            unoptimized
            priority={i === 0}
          />

          <Image
            src={s.imageMobile}
            alt={s.headline}
            fill
            className="md:hidden"
            unoptimized
            priority={i === 0}
          />
        </div>
      ))}

      <div className="relative z-10 h-full flex flex-col justify-center max-w-7xl px-6 lg:px-12">
        <div style={{ minHeight: "280px", position: "relative" }}>
          {slides.map((s, i) => {
            const isActive = i === current;
            const isSideLayout = i === 1; 

            return (
              <div
                key={s.id}
                className={`absolute top-0 left-0 w-full transition-all duration-700 ${
                  isSideLayout ? "flex flex-row items-center gap-12" : ""
                }`}
                style={{
                  opacity: isActive ? 1 : 0,
                  transform: isActive ? "translateY(0)" : "translateY(24px)",
                  pointerEvents: isActive ? "auto" : "none",
                }}
              >
              </div>
            );
          })}
        </div>
      </div>
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 flex gap-3">
          {slides.map((_, i) => (
            <button key={i} onClick={() => goTo(i)}
              className="transition-all duration-300 rounded-full"
              style={{
                width: i === current ? "2rem" : "0.5rem",
                height: "0.5rem",
                background: i === current ? "var(--primary)" : "rgba(61,214,56,0.25)",
              }} />
          ))}
        </div>

        <div className="absolute bottom-10 right-12 hidden md:flex flex-col items-center gap-2 text-muted-foreground">
          <ChevronDown size={16} className="animate-bounce" />
        </div>
      </section>

    <section id="clientes" className="py-18 bg-foreground border-y border-border">
        <div className="max-w-7xl mx-auto lg:px-12">
          <div className="text-center mb-14">
            <h2 className="font-['Playfair_Display',serif] text-4xl md:text-5xl font-700 leading-tight mb-4" style={{ color: "var(--background)" }}>
              Já é nosso cliente? Acesse também
            </h2>
            <p className="text-muted-foreground max-w-lg mx-auto text-sm leading-relaxed">
              Escolha seu produto e acesse pelo aplicativo ou pelo navegador.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-5">
            {clientProducts.map((p) => (
              <div
                key={p.name}
                className="border bg-secondary border-border rounded-sm p-8 flex flex-col gap-6 hover:border-primary transition-all duration-300 group"
              >
                {/* Header */}
                <div className="flex items-center gap-4">
                  <div>
                    <div className="font-['Playfair_Display',serif] text-xl font-700 text-foreground leading-tight">
                      <img src={p.logo} alt={p.name} className="h-16 w-auto" />
                    </div>
                  </div>
                </div>

                {/* Description */}
                <p className="text-muted-foreground text-sm leading-relaxed flex-top">{p.desc}</p>

                {/* Links */}
                <div className="flex flex-col gap-3">
                  <div className="flex flex-row gap-3 items-center justify-center">
                  {/* App Store */}
                  <a
                    href={p.appStoreUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="flex-1 flex items-center group/link"
                    style={{ borderColor: "rgba(61,214,56,0.25)" }}
                  >
                    <img src="/apple_loja_app.png" alt="App Store" className="h-11 w-full object-contain"/>
                
                  </a>

                  {/* Google Play */}
                  <a
                    href={p.playStoreUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="flex-1 flex items-center  group/link"
                    style={{ borderColor: "rgba(61,214,56,0.25)" }}
                  >
                    <img src="/google_play_pt.c5932540.png" alt="App Store" className="h-10 w-full object-contain"/>
                  </a>
                  </div>

                  {/* Website (only for IPSEG and IPSEG Track) */}
                  {p.hasWebsite && (
                    <a
                      href={p.websiteUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center gap-3 px-4 py-3 rounded-sm transition-all duration-200 group/link"
                      style={{ background: "var(--primary)", color: "var(--primary-foreground)" }}
                    >
                      <Monitor size={16} className="flex-shrink-0" />
                      <span className="text-sm font-500">{p.websiteLabel}</span>
                      <ExternalLink size={13} className="ml-auto opacity-70 group-hover/link:opacity-100" />
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>


      <section id="servicos" className="py-28 bg-secondary">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="text-center mb-16">
            <span className="text-xs font-600 tracking-[0.2em] uppercase mb-4 block"
              style={{ color: "var(--primary)" }}>
              Serviços
            </span>
            <h2 className="font-bold mb-4 text-4xl md:text-5xl font-700 leading-tight mb-6">
              Soluções que Transformam a Segurança
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-px bg-border">
            {services.map((s) => (
              <div key={s.title}
                className="bg-card p-10 group hover:bg-background transition-colors duration-300">
                <div className="w-12 h-12 rounded-sm flex items-center justify-center mb-6"
                  style={{ background: "rgba(61,214,56,0.1)" }}>
                  <s.icon size={22} style={{ color: "var(--primary)" }} />
                </div>
                <h3 className="font-['Playfair_Display',serif] text-xl font-600 mb-4">{s.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed mb-6">{s.desc}</p>
                <ul className="flex flex-col gap-2">
                  {s.features.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-xs text-muted-foreground">
                      <span className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                        style={{ background: "var(--primary)" }} />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="parceiros" className="pt-28 bg-background"
      style={{background: "var(--foreground)"}}>
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="text-center mb-16">
            <span className="text-xs font-600 tracking-[0.2em] uppercase mb-4 block"
              style={{ color: "var(--primary)" }}>
              Parceiros IPSEG
            </span>
            <h2 className="font-['Playfair_Display',serif] text-4xl md:text-5xl font-700 leading-tight mb-4"
            style={{ color: "var(--background)" }}>
              Quem Cresce com a Gente
            </h2>
            <p className="text-muted-foreground max-w-lg mx-auto text-sm leading-relaxed">
              Provedores de internet e integradores de segurança que escolheram a IPSEG para expandir seu portfólio e gerar novas receitas.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-px bg-foreground mb-16">
            {partners.map((p) => (
              <div key={p.name}
                className="bg-foreground p-10 flex flex-col items-center text-center gap-4 hover:bg-foreground transition-colors duration-300 cursor-default">
                <div className="relative w-full h-16">
                  <Image
                    src={p.logo}
                    alt={p.name}
                    fill
                    className="object-contain w-full h-full"
                    unoptimized
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
            <div className="border border-border rounded-sm p-12 md:p-16 text-center"
            style={{ borderColor: "rgba(61,214,56,0.2)", background: "var(--backgreen)" }}>
            <span className="text-xs font-600 tracking-[0.2em] uppercase mb-4 block"
              style={{ color: "var(--primary)" }}>
              Para Provedores e Integradores
            </span>
            <h3 className="font-['Playfair_Display',serif] text-3xl md:text-4xl font-700 mb-4">
              Adicione a IPSEG ao Seu Portfólio
            </h3>
            <p className="text-muted-foreground max-w-md mx-auto mb-8 text-sm leading-relaxed">
              Ofereça automonitoramento em nuvem, sistema de segurança e automações residenciais aos seus clientes. Gere novas receitas recorrentes e se diferencie no mercado com tecnologia de ponta.
            </p>
            <button
              onClick={() => scrollTo("contato")}
              className="inline-flex items-center gap-3 px-10 py-4 text-sm font-500 tracking-wide rounded-sm transition-all duration-200 hover:gap-5"
              style={{ background: "var(--primary)", color: "var(--primary-foreground)" }}>
              Quero Ser Parceiro <ArrowRight size={16} />
            </button>
          </div>
      </section>

      <section id="sobre" className="py-28 bg-foreground">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <div>
              <span className="text-xs font-600 tracking-[0.2em] uppercase mb-4 block"
                style={{ color: "var(--primary)" }}>
                Sobre Nós
              </span>
              <h2 className="font-['Playfair_Display',serif] text-4xl md:text-5xl font-700 leading-tight mb-4"
              style={{ color: "var(--background)" }}>
                Profissionalismo e Confiança
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-6">
                A IPSEG é uma empresa especializada em soluções de automonitoramento inteligente. ​​Nossa missão é oferecer soluções inovadoras de segurança, garantindo praticidade para empresas, condomínios e cidades.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-10">
                Seja um parceiro IPSEG e adicione sistemas robustos ao seu portfólio e gere novas receitas.
              </p>
              <button
                onClick={() => scrollTo("contato")}
                className="inline-flex items-center gap-3 px-8 py-3.5 text-sm font-500 rounded-sm transition-all duration-200 hover:gap-5"
                style={{ background: "var(--primary)", color: "var(--primary-foreground)" }}>
                Quero Ser Parceiro <ArrowRight size={16} />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {features.map((f) => (
                <div key={f.label}
                  className="bg-card border border-border p-6 rounded-sm flex items-start gap-4 hover:border-primary transition-colors duration-300"
                  style={{ "--tw-border-opacity": "1" } as React.CSSProperties}>
                  <div className="w-9 h-9 rounded-sm flex items-center justify-center flex-shrink-0"
                    style={{ background: "rgba(61,214,56,0.1)" }}>
                    <f.icon size={16} style={{ color: "var(--primary)" }} />
                  </div>
                  <span className="text-sm text-foreground leading-snug">{f.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

    

      <section id="contato" className="py-28 bg-secondary">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-20">
            {/* Left */}
            <div>
              <span className="text-xs font-600 tracking-[0.2em] uppercase mb-4 block"
                style={{ color: "var(--primary)" }}>
                Contato
              </span>
              <h2 className="font-bold mb-4 text-4xl md:text-5xl font-700 leading-tight mb-6">
                Fale com Nossa Equipe
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-12 max-w-sm">
                Somos especialistas em atender provedores de internet e integradores de segurança. Preencha o formulário e entraremos em contato o mais breve possível.
              </p>

              <div className="flex flex-col gap-8 mb-12">
                {[
                  { icon: Mail, label: "E-mail", value: "ipseg.sollucoes@gmail.com" },
                  { icon: Phone, label: "Telefone", value: "+55 86 3142-0314" },
                  { icon: MapPin, label: "Endereço", value: "Timon, MA — Brasil" },
                ].map((c) => (
                  <div key={c.label} className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-sm flex items-center justify-center flex-shrink-0 bg-card">
                      <c.icon size={16} style={{ color: "var(--primary)" }} />
                    </div>
                    <div>
                      <div className="text-xs text-muted-foreground uppercase tracking-wide mb-1">{c.label}</div>
                      <div className="text-sm text-foreground">{c.value}</div>
                    </div>
                  </div>
                ))}
              </div>

              <a href="https://www.instagram.com/ipseg.solucoes/" target="_blank" rel="noreferrer"
                className="inline-flex items-center gap-3 text-sm text-muted-foreground hover:text-foreground transition-colors">
                @ipseg.solucoes
              </a>
            </div>

            <div className="bg-card border border-border p-10 rounded-sm">
              {sent ? (
                <div className="h-full flex flex-col items-center justify-center text-center gap-4 py-12">
                  <div className="w-14 h-14 rounded-full flex items-center justify-center text-2xl font-700"
                    style={{ background: "var(--primary)", color: "var(--primary-foreground)" }}>
                    ✓
                  </div>
                  <h3 className="font-['Playfair_Display',serif] text-2xl font-700">Mensagem enviada!</h3>
                  <p className="text-muted-foreground text-sm max-w-xs">
                    Recebemos seu contato. Nossa equipe retornará em breve com informações sobre a parceria.
                  </p>
                  <button onClick={() => setSent(false)} className="mt-4 text-sm underline"
                    style={{ color: "var(--primary)" }}>
                    Enviar nova mensagem
                  </button>
                </div>
              ) : (
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
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      <div className="border-t border-border py-10 bg-background">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-8">
            <Image src="/logoipseg.svg" alt="IPSEG" width={120} height={32} className="h-8 w-auto object-contain" />
            <div className="flex flex-wrap justify-center gap-8">
              {navLinks.map((l) => (
                <button key={l.id} onClick={() => scrollTo(l.id)}
                  className="text-xs text-muted-foreground hover:text-foreground transition-colors tracking-wide uppercase">
                  {l.label}
                </button>
              ))}
            </div>
            <a href="https://www.instagram.com/ipseg.solucoes/" target="_blank" rel="noreferrer"
              className="text-muted-foreground hover:text-foreground transition-colors">
              @ipseg.solucoes
            </a>
          </div>
          <div className="border-t border-border pt-6 flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-muted-foreground">
            <span>© 2026 IPSEG®. Todos os direitos reservados.</span>
            <a href="https://www.ipseg.com.br/política-de-privacidade" target="_blank" rel="noreferrer"
              className="hover:text-foreground transition-colors">
              Política de Privacidade
            </a>
            <span>Por D-UP Digital</span>
          </div>
        </div>
      </div>
    </div>
  );
}