import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import {
  Anchor,
  ArrowRight,
  Award,
  Boxes,
  CheckCircle2,
  Clock,
  Download,
  FileText,
  Globe2,
  Headphones,
  Leaf,
  Mail,
  MapPin,
  Menu,
  MessageCircle,
  Package,
  Phone,
  Quote,
  Send,
  Ship,
  ShieldCheck,
  Sparkles,
  Truck,
  X,
} from "lucide-react";

import heroPort from "@/assets/hero-port.jpg";
import imgCocoPeat from "@/assets/coco-peat.jpg";
import imgCocoFiber from "@/assets/coco-fiber.jpg";
import imgCocoBristle from "@/assets/coco-bristle.jpg";
import imgWoodPellet from "@/assets/wood-pellet.jpg";
import imgCinnamon from "@/assets/cinnamon.jpg";
import imgCharcoal from "@/assets/charcoal-briquette.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "PT Artha Prima Global — Indonesia's Trusted Coconut & Spice Exporter" },
      {
        name: "description",
        content:
          "Direct exporter from Indonesia of coco peat, coco fiber, coco bristle, wood pellet, cinnamon, and coconut charcoal briquette. Consistent quality, worldwide shipping.",
      },
      { property: "og:title", content: "PT Artha Prima Global — Trusted Export Partner" },
      {
        property: "og:description",
        content:
          "Supplying premium coconut products and Indonesian spices to buyers worldwide. Request a quotation today.",
      },
      { property: "og:type", content: "website" },
    ],
  }),
  component: Index,
});

/* ───────────── Reusable bits ───────────── */

function Logo({ className = "", dark = false }: { className?: string; dark?: boolean }) {
  const textColor = dark ? "text-navy-deep" : "text-white";
  const subColor = dark ? "text-navy-soft" : "text-white/70";
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <div className={`relative grid h-11 w-11 shrink-0 place-items-center rounded-full ${dark ? "bg-navy-deep/10 ring-navy-deep/20" : "bg-white/10 ring-white/30"} ring-1 backdrop-blur`}>
        <Globe2 className={`h-6 w-6 ${textColor}`} strokeWidth={1.5} />
        <Leaf
          className="absolute -bottom-1 -right-1 h-5 w-5 text-[var(--brand-green)] drop-shadow"
          strokeWidth={2.5}
          fill="currentColor"
        />
      </div>
      <div className="leading-tight">
        <div className={`text-[15px] font-extrabold tracking-wide ${textColor}`}>PT ARTHA</div>
        <div className="text-[15px] font-extrabold tracking-wide text-[var(--brand-green)]">
          PRIMA GLOBAL
        </div>
        <div className={`text-[10px] uppercase tracking-[0.18em] ${subColor}`}>
          Trusted Export Partner
        </div>
      </div>
    </div>
  );
}

function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
}: {
  eyebrow: string;
  title: string;
  description?: string;
  align?: "center" | "left";
}) {
  return (
    <div
      className={`max-w-2xl ${align === "center" ? "mx-auto text-center" : "text-left"}`}
    >
      <div
        className={`inline-flex items-center gap-2 rounded-full border border-[var(--brand-green)]/40 bg-[var(--brand-green)]/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--brand-green-dark)]`}
      >
        <span className="h-1.5 w-1.5 rounded-full bg-[var(--brand-green)]" />
        {eyebrow}
      </div>
      <h2 className="mt-4 text-3xl font-extrabold text-navy-deep text-balance sm:text-4xl md:text-5xl">
        {title}
      </h2>
      {description && (
        <p className="mt-4 text-base text-muted-foreground sm:text-lg">{description}</p>
      )}
    </div>
  );
}

/* ───────────── Nav ───────────── */

const NAV = [
  { href: "#products", label: "Products" },
  { href: "#why", label: "Why Us" },
  { href: "#certifications", label: "Certifications" },
  { href: "#calculator", label: "Calculator" },
  { href: "#markets", label: "Markets" },
  { href: "#blog", label: "Insights" },
  { href: "#contact", label: "Contact" },
];

function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className="absolute inset-x-0 top-0 z-30 text-shadow-sm">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-5 sm:px-8">
        <a href="#top">
          <Logo />
        </a>
        <nav className="hidden items-center gap-7 lg:flex">
          {NAV.map((n) => (
            <a
              key={n.href}
              href={n.href}
              className="text-sm font-medium text-white/85 transition hover:text-[var(--brand-green)]"
            >
              {n.label}
            </a>
          ))}
        </nav>
        <div className="hidden lg:block">
          <a
            href="#rfq"
            className="inline-flex items-center gap-2 rounded-full bg-[var(--brand-green)] px-5 py-2.5 text-sm font-semibold text-navy-deep transition hover:brightness-110"
          >
            Request Quotation <ArrowRight className="h-4 w-4" />
          </a>
        </div>
        <button
          onClick={() => setOpen(true)}
          aria-label="Open menu"
          className="grid h-10 w-10 place-items-center rounded-full bg-white/10 text-white ring-1 ring-white/30 lg:hidden"
        >
          <Menu className="h-5 w-5" />
        </button>
      </div>
      {open && (
        <div className="fixed inset-0 z-50 bg-navy-deep/95 backdrop-blur-md lg:hidden">
          <div className="flex items-center justify-between px-5 py-5">
            <Logo />
            <button
              onClick={() => setOpen(false)}
              aria-label="Close menu"
              className="grid h-10 w-10 place-items-center rounded-full bg-white/10 text-white ring-1 ring-white/20"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
          <nav className="flex flex-col gap-1 px-5 pt-4">
            {NAV.map((n) => (
              <a
                key={n.href}
                href={n.href}
                onClick={() => setOpen(false)}
                className="rounded-xl px-4 py-4 text-lg font-semibold text-white hover:bg-white/5"
              >
                {n.label}
              </a>
            ))}
            <a
              href="#rfq"
              onClick={() => setOpen(false)}
              className="mt-4 inline-flex items-center justify-center gap-2 rounded-full bg-[var(--brand-green)] px-5 py-3 text-sm font-semibold text-navy-deep"
            >
              Request Quotation <ArrowRight className="h-4 w-4" />
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}

/* ───────────── Hero ───────────── */

const HERO_BADGES = [
  { icon: ShieldCheck, title: "Premium Quality", desc: "High standard products" },
  { icon: Sparkles, title: "Competitive Price", desc: "Best value for your business" },
  { icon: Clock, title: "On-Time Delivery", desc: "Reliable & trustworthy" },
  { icon: Globe2, title: "Global Shipping", desc: "Worldwide export service" },
];

function Hero() {
  const slides = [
    { src: imgCocoPeat, alt: "Coco peat" },
    { src: imgCocoFiber, alt: "Coco fiber" },
    { src: imgCocoBristle, alt: "Coco bristle" },
    { src: imgWoodPellet, alt: "Wood pellet" },
    { src: imgCinnamon, alt: "Cinnamon" },
    { src: imgCharcoal, alt: "Charcoal briquette" },
  ];
  return (
    <section id="top" className="relative isolate overflow-hidden">
      {/* Background media: fading product slideshow */}
      <div className="absolute inset-0 -z-10 bg-navy-deep">
        {slides.map((s, i) => (
          <img
            key={s.alt}
            src={s.src}
            alt={s.alt}
            width={1920}
            height={1080}
            className="absolute inset-0 h-full w-full object-cover animate-hero-fade"
            style={{
              animationDelay: `${i * 5}s`,
              animationDuration: `${slides.length * 5}s`,
            }}
          />
        ))}
      </div>

      <Header />

      <div className="mx-auto grid min-h-[min(820px,100svh)] max-w-7xl items-end px-5 pb-16 pt-36 sm:px-8 lg:pt-44">
        <div className="max-w-3xl">
          <p className="text-sm font-medium uppercase tracking-[0.25em] text-white/80 text-shadow-sm">
            Indonesia&apos;s Trusted Exporter of
          </p>
          <h1 className="mt-3 text-4xl font-extrabold leading-[1.02] text-white text-balance text-shadow sm:text-5xl md:text-6xl lg:text-7xl">
            Coconut Products &amp;
            <br />
            <span className="bg-gradient-to-r from-white to-[var(--brand-green)] bg-clip-text text-transparent">
              Premium Spices
            </span>
          </h1>
          <div className="mt-6 flex items-center gap-3">
            <span className="h-px w-10 bg-[var(--brand-green)]" />
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-white/80 text-shadow-sm sm:text-sm">
              Supplying consistent quality to buyers worldwide
            </p>
          </div>

          <div className="mt-9 flex flex-wrap gap-3">
            <a
              href="#rfq"
              className="group inline-flex items-center gap-2 rounded-full bg-[var(--brand-green)] px-6 py-3.5 text-sm font-bold text-navy-deep shadow-elevated transition hover:brightness-110"
            >
              Request Quotation
              <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
            </a>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/5 px-6 py-3.5 text-sm font-semibold text-white backdrop-blur transition hover:bg-white/10"
            >
              <Download className="h-4 w-4" />
              Download Company Profile
            </a>
          </div>

          {/* Feature badges */}
          <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-4">
            {HERO_BADGES.map((b) => (
              <div key={b.title} className="flex items-start gap-3">
                <div className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-white/10 ring-1 ring-white/20 backdrop-blur">
                  <b.icon className="h-5 w-5 text-[var(--brand-green)]" strokeWidth={2} />
                </div>
                <div className="min-w-0 text-shadow-sm">
                  <div className="text-[11px] font-bold uppercase tracking-wider text-white">
                    {b.title}
                  </div>
                  <div className="text-[12px] leading-snug text-white/70">{b.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Stats strip */}
      <div className="relative z-10 mx-auto -mt-2 max-w-7xl px-5 pb-8 sm:px-8 text-shadow-sm">
        <div className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-white/15 bg-white/10 backdrop-blur-md md:grid-cols-4">
          {[
            { icon: Globe2, top: "Exporting to", bottom: "50+ Countries" },
            { icon: Boxes, top: "1000+", bottom: "Containers Shipped" },
            { icon: Award, top: "10+ Years", bottom: "Of Experience" },
            { icon: Headphones, top: "24/7", bottom: "Customer Support" },
          ].map((s) => (
            <div key={s.bottom} className="flex items-center gap-3 bg-white/5 px-5 py-4">
              <s.icon className="h-6 w-6 shrink-0 text-[var(--brand-green)]" strokeWidth={1.8} />
              <div className="min-w-0 leading-tight">
                <div className="text-[11px] font-medium uppercase tracking-wider text-white/70">
                  {s.top}
                </div>
                <div className="truncate text-sm font-bold uppercase tracking-wide text-white">
                  {s.bottom}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ───────────── Products ───────────── */

type Product = {
  id: string;
  icon: string;
  name: string;
  img: string;
  tag: string;
  blurb: string;
  spec: { label: string; value: string }[];
};

const PRODUCTS: Product[] = [
  {
    id: "coco-peat",
    icon: "🌴",
    name: "Coco Peat",
    img: imgCocoPeat,
    tag: "Horticulture grade",
    blurb:
      "Low-EC, high water retention coco peat blocks ideal for greenhouse, hydroponics, and nursery growers.",
    spec: [
      { label: "Packing", value: "5 kg blocks / palletized" },
      { label: "MOQ", value: "1 x 40 HQ" },
      { label: "Capacity", value: "60 FCL / month" },
      { label: "Lead time", value: "14–21 days" },
      { label: "Loading", value: "~22 MT per 40 HQ" },
    ],
  },
  {
    id: "coco-fiber",
    icon: "🌴",
    name: "Coco Fiber",
    img: imgCocoFiber,
    tag: "Long-strand coir",
    blurb:
      "Cleaned, sun-dried coconut fiber used for mattresses, ropes, geotextiles, and erosion control products.",
    spec: [
      { label: "Packing", value: "Pressed bales 110–130 kg" },
      { label: "MOQ", value: "1 x 40 HQ" },
      { label: "Capacity", value: "40 FCL / month" },
      { label: "Lead time", value: "10–18 days" },
      { label: "Loading", value: "~14 MT per 40 HQ" },
    ],
  },
  {
    id: "coco-bristle",
    icon: "🌴",
    name: "Coco Bristle",
    img: imgCocoBristle,
    tag: "Stiff brush fiber",
    blurb:
      "Premium long bristle fiber suitable for brush, broom, and brush-roller manufacturing across export markets.",
    spec: [
      { label: "Packing", value: "Bundles 25 kg" },
      { label: "MOQ", value: "10 MT" },
      { label: "Capacity", value: "80 MT / month" },
      { label: "Lead time", value: "14–25 days" },
      { label: "Loading", value: "~12 MT per 40 HQ" },
    ],
  },
  {
    id: "wood-pellet",
    icon: "🌴",
    name: "Wood Pellet",
    img: imgWoodPellet,
    tag: "Biomass fuel",
    blurb:
      "EN-Plus aligned wood pellets from sustainable plantations — high calorific value, low ash, stable supply.",
    spec: [
      { label: "Packing", value: "15 kg PE bags / jumbo" },
      { label: "MOQ", value: "1 x 40 HQ" },
      { label: "Capacity", value: "3,000 MT / month" },
      { label: "Lead time", value: "20–30 days" },
      { label: "Loading", value: "~24 MT per 40 HQ" },
    ],
  },
  {
    id: "cinnamon",
    icon: "🌿",
    name: "Cinnamon",
    img: imgCinnamon,
    tag: "Korintje / Cassia",
    blurb:
      "Indonesian Korintje cinnamon sticks and broken — graded AA, ABB, KA, and KB with full phytosanitary docs.",
    spec: [
      { label: "Packing", value: "12.5 kg cartons" },
      { label: "MOQ", value: "5 MT" },
      { label: "Capacity", value: "150 MT / month" },
      { label: "Lead time", value: "21–35 days" },
      { label: "Loading", value: "~16 MT per 40 HQ" },
    ],
  },
  {
    id: "charcoal",
    icon: "🌴",
    name: "Coconut Charcoal Briquette",
    img: imgCharcoal,
    tag: "Shisha / BBQ grade",
    blurb:
      "Pure coconut shell briquettes — long burn time, low ash, no chemicals. Customizable sizes for shisha & BBQ.",
    spec: [
      { label: "Packing", value: "Inner / master boxes" },
      { label: "MOQ", value: "1 x 40 HQ" },
      { label: "Capacity", value: "180 MT / month" },
      { label: "Lead time", value: "21–35 days" },
      { label: "Loading", value: "~18 MT per 40 HQ" },
    ],
  },
];

function ProductsSection() {
  const [active, setActive] = useState<Product>(PRODUCTS[0]);
  return (
    <section id="products" className="relative bg-secondary py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="Our Products"
          title="Coconut derivatives & Indonesian spices, export-ready."
          description="Six core lines, traceable from farm to FCL. Click a product to see full specifications."
        />

        <div className="mt-12 grid gap-10 lg:grid-cols-[1.05fr_1fr]">
          {/* Product grid */}
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
            {PRODUCTS.map((p) => {
              const isActive = p.id === active.id;
              return (
                <button
                  key={p.id}
                  onClick={() => setActive(p)}
                  className={`group relative overflow-hidden rounded-2xl border bg-card text-left shadow-soft transition hover:-translate-y-0.5 ${
                    isActive
                      ? "border-[var(--brand-green)] ring-2 ring-[var(--brand-green)]/40"
                      : "border-border"
                  }`}
                >
                  <div className="aspect-square overflow-hidden bg-navy-deep">
                    <img
                      src={p.img}
                      alt={p.name}
                      loading="lazy"
                      width={800}
                      height={800}
                      className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-3">
                    <div className="text-[11px] font-semibold uppercase tracking-wider text-[var(--brand-green-dark)]">
                      {p.tag}
                    </div>
                    <div className="mt-0.5 text-sm font-bold text-navy-deep">
                      {p.icon} {p.name}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Active product detail */}
          <div className="overflow-hidden rounded-3xl bg-navy-deep text-white shadow-elevated">
            <div className="relative aspect-[16/10] overflow-hidden">
              <img
                src={active.img}
                alt={active.name}
                loading="lazy"
                width={1200}
                height={750}
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy-deep via-navy-deep/30 to-transparent" />
              <div className="absolute bottom-4 left-5 right-5">
                <div className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-white backdrop-blur">
                  {active.tag}
                </div>
                <h3 className="mt-2 text-2xl font-extrabold sm:text-3xl">
                  {active.icon} {active.name}
                </h3>
              </div>
            </div>
            <div className="p-6 sm:p-7">
              <p className="text-sm text-white/80">{active.blurb}</p>
              <dl className="mt-6 divide-y divide-white/10 border-y border-white/10">
                {active.spec.map((s) => (
                  <div key={s.label} className="flex items-center justify-between py-2.5">
                    <dt className="text-[12px] font-semibold uppercase tracking-wider text-white/60">
                      {s.label}
                    </dt>
                    <dd className="text-sm font-medium text-white">{s.value}</dd>
                  </div>
                ))}
              </dl>
              <a
                href="#rfq"
                className="mt-6 inline-flex items-center gap-2 rounded-full bg-[var(--brand-green)] px-5 py-2.5 text-sm font-bold text-navy-deep transition hover:brightness-110"
              >
                Request {active.name} Quote <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ───────────── Why us ───────────── */

const WHY = [
  { icon: Ship, title: "Direct Exporter from Indonesia", desc: "No middlemen — direct from our facilities to your port." },
  { icon: Sparkles, title: "Competitive Pricing", desc: "Volume pricing that scales with your purchase plan." },
  { icon: ShieldCheck, title: "Consistent Quality", desc: "QC at every batch with documented inspection reports." },
  { icon: MessageCircle, title: "Fast Response", desc: "Average reply under 4 working hours, 6 days a week." },
  { icon: Globe2, title: "Worldwide Shipping", desc: "50+ destination countries across 4 continents." },
  { icon: Package, title: "Custom Packaging", desc: "Bag, carton, pallet, and labeling tailored to your spec." },
  { icon: Award, title: "OEM & Private Label", desc: "Your brand on our products — full white-label support." },
  { icon: Truck, title: "Reliable Lead Times", desc: "Production planning aligned with your shipping window." },
];

function WhyUs() {
  return (
    <section id="why" className="relative overflow-hidden bg-navy-deep py-20 text-white sm:py-28">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, white 1px, transparent 0)",
          backgroundSize: "32px 32px",
        }}
      />
      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-[var(--brand-green)]/40 bg-[var(--brand-green)]/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--brand-green)]">
            <span className="h-1.5 w-1.5 rounded-full bg-[var(--brand-green)]" /> Why Choose Us
          </div>
          <h2 className="mt-4 text-3xl font-extrabold text-balance sm:text-4xl md:text-5xl">
            A trusted partner buyers come back to.
          </h2>
          <p className="mt-4 text-white/70">
            Built around the things that actually matter when you import from Indonesia.
          </p>
        </div>

        <div className="mt-14 grid gap-px overflow-hidden rounded-3xl bg-white/10 sm:grid-cols-2 lg:grid-cols-4">
          {WHY.map((w) => (
            <div key={w.title} className="group relative bg-navy-deep p-6 transition hover:bg-navy-soft">
              <div className="grid h-11 w-11 place-items-center rounded-xl bg-[var(--brand-green)]/15 ring-1 ring-[var(--brand-green)]/30">
                <w.icon className="h-5 w-5 text-[var(--brand-green)]" strokeWidth={2} />
              </div>
              <h3 className="mt-5 text-base font-bold">{w.title}</h3>
              <p className="mt-2 text-sm text-white/65">{w.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ───────────── Certifications ───────────── */

const CERTS = [
  { code: "NIB", name: "Business Identification Number" },
  { code: "NPWP", name: "Tax Registration Number" },
  { code: "PHYTO", name: "Phytosanitary Certificate" },
  { code: "COO", name: "Certificate of Origin" },
  { code: "FUMI", name: "Fumigation Certificate" },
  { code: "MSDS", name: "Material Safety Data Sheet" },
];

function Certifications() {
  return (
    <section id="certifications" className="bg-background py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="Certifications"
          title="Documented, audited, and ready to ship."
          description="Every shipment leaves with the right paperwork. We provide standard export documents and product-specific certificates on request."
        />
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {CERTS.map((c) => (
            <div
              key={c.code}
              className="group relative flex items-center gap-4 overflow-hidden rounded-2xl border border-border bg-card p-5 shadow-soft transition hover:-translate-y-0.5 hover:border-[var(--brand-green)]"
            >
              <div className="grid h-14 w-14 shrink-0 place-items-center rounded-xl bg-navy-deep text-[10px] font-extrabold tracking-wider text-[var(--brand-green)]">
                {c.code}
              </div>
              <div className="min-w-0">
                <div className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                  Official Document
                </div>
                <div className="truncate text-base font-bold text-navy-deep">{c.name}</div>
              </div>
              <FileText className="ml-auto h-5 w-5 shrink-0 text-muted-foreground transition group-hover:text-[var(--brand-green-dark)]" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ───────────── Container Calculator ───────────── */

const PRODUCT_DENSITY: Record<string, { weight: number; volume: number; label: string }> = {
  // weight (kg per unit), volume (m3 per unit)
  "coco-peat": { weight: 5, volume: 0.008, label: "5 kg block" },
  "coco-fiber": { weight: 120, volume: 0.5, label: "bale" },
  "coco-bristle": { weight: 25, volume: 0.12, label: "bundle" },
  "wood-pellet": { weight: 15, volume: 0.022, label: "15 kg bag" },
  cinnamon: { weight: 12.5, volume: 0.06, label: "carton" },
  charcoal: { weight: 10, volume: 0.018, label: "master box" },
};

const CONTAINERS = {
  "20ft": { volume: 33, payload: 22000, label: "20 ft Standard" },
  "40ft": { volume: 67, payload: 26000, label: "40 ft High Cube" },
};

function Calculator() {
  const [product, setProduct] = useState<keyof typeof PRODUCT_DENSITY>("coco-peat");
  const [container, setContainer] = useState<keyof typeof CONTAINERS>("40ft");
  const [qty, setQty] = useState(1000);

  const result = useMemo(() => {
    const d = PRODUCT_DENSITY[product];
    const c = CONTAINERS[container];
    const totalWeight = d.weight * qty; // kg
    const totalVolume = d.volume * qty; // m3
    const containersByWeight = totalWeight / c.payload;
    const containersByVolume = totalVolume / c.volume;
    const containersNeeded = Math.max(containersByWeight, containersByVolume);
    return {
      totalWeight,
      totalVolume,
      containersNeeded,
      utilization: Math.min(1, 1 / containersNeeded) * containersNeeded > 0 ? Math.min(100, (containersNeeded - Math.floor(containersNeeded)) * 100) : 0,
      unitsPerContainer: Math.floor(Math.min(c.payload / d.weight, c.volume / d.volume)),
      density: d,
      container: c,
    };
  }, [product, container, qty]);

  return (
    <section id="calculator" className="bg-secondary py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="Container Calculator"
          title="Plan your shipment in seconds."
          description="Estimate units per container, total weight, and total volume for a 20 ft or 40 ft load."
        />

        <div className="mt-12 grid gap-6 overflow-hidden rounded-3xl bg-card shadow-elevated lg:grid-cols-[1fr_1.1fr]">
          {/* Inputs */}
          <div className="space-y-6 border-b border-border p-6 sm:p-8 lg:border-b-0 lg:border-r">
            <div>
              <label className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
                Product
              </label>
              <div className="mt-2 grid grid-cols-2 gap-2 sm:grid-cols-3">
                {Object.entries(PRODUCT_DENSITY).map(([id]) => {
                  const p = PRODUCTS.find((x) => x.id === id || (id === "charcoal" && x.id === "charcoal"));
                  return (
                    <button
                      key={id}
                      onClick={() => setProduct(id as keyof typeof PRODUCT_DENSITY)}
                      className={`rounded-xl border px-3 py-2.5 text-left text-xs font-semibold transition ${
                        product === id
                          ? "border-[var(--brand-green)] bg-[var(--brand-green)]/10 text-navy-deep"
                          : "border-border text-navy-deep hover:border-[var(--brand-green)]"
                      }`}
                    >
                      {p?.name ?? id}
                    </button>
                  );
                })}
              </div>
            </div>

            <div>
              <label className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
                Container
              </label>
              <div className="mt-2 grid grid-cols-2 gap-2">
                {Object.entries(CONTAINERS).map(([id, c]) => (
                  <button
                    key={id}
                    onClick={() => setContainer(id as keyof typeof CONTAINERS)}
                    className={`rounded-xl border px-4 py-3 text-left transition ${
                      container === id
                        ? "border-[var(--brand-green)] bg-[var(--brand-green)]/10"
                        : "border-border hover:border-[var(--brand-green)]"
                    }`}
                  >
                    <div className="text-sm font-bold text-navy-deep">{c.label}</div>
                    <div className="text-[11px] text-muted-foreground">
                      {c.volume} m³ · {c.payload.toLocaleString()} kg
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
                  Quantity ({PRODUCT_DENSITY[product].label}s)
                </label>
                <span className="text-sm font-bold text-navy-deep">{qty.toLocaleString()}</span>
              </div>
              <input
                type="range"
                min={50}
                max={5000}
                step={50}
                value={qty}
                onChange={(e) => setQty(Number(e.target.value))}
                className="mt-3 w-full accent-[var(--brand-green)]"
              />
              <div className="mt-1 flex justify-between text-[11px] text-muted-foreground">
                <span>50</span>
                <span>5,000</span>
              </div>
            </div>
          </div>

          {/* Results */}
          <div className="bg-navy-deep p-6 text-white sm:p-8">
            <div className="grid grid-cols-2 gap-4">
              <Stat
                label="Containers Needed"
                value={result.containersNeeded < 1 ? "< 1" : result.containersNeeded.toFixed(2)}
                hint={`${CONTAINERS[container].label}`}
              />
              <Stat
                label="Max Units / Container"
                value={result.unitsPerContainer.toLocaleString()}
                hint="Whichever limit hits first"
              />
              <Stat
                label="Total Weight"
                value={`${(result.totalWeight / 1000).toFixed(2)} MT`}
                hint={`${result.totalWeight.toLocaleString()} kg`}
              />
              <Stat
                label="Total Volume"
                value={`${result.totalVolume.toFixed(2)} m³`}
                hint={`Per unit ${result.density.volume} m³`}
              />
            </div>
            <p className="mt-6 text-xs text-white/60">
              Estimates are indicative based on typical packing density. Final loading depends on
              packing format and consolidation. Ask our team for an exact loading plan.
            </p>
            <a
              href="#rfq"
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-[var(--brand-green)] px-5 py-2.5 text-sm font-bold text-navy-deep"
            >
              Send these numbers to sales <Send className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

function Stat({ label, value, hint }: { label: string; value: string; hint?: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
      <div className="text-[10px] font-bold uppercase tracking-wider text-white/60">{label}</div>
      <div className="mt-1 text-2xl font-extrabold sm:text-3xl">{value}</div>
      {hint && <div className="mt-1 text-[11px] text-white/55">{hint}</div>}
    </div>
  );
}

/* ───────────── Markets / Export Map ───────────── */

const MARKETS = [
  "United States", "Canada", "Mexico", "Brazil", "United Kingdom", "Germany",
  "Netherlands", "France", "Spain", "Italy", "Poland", "Turkey",
  "UAE", "Saudi Arabia", "Egypt", "South Africa", "India", "Bangladesh",
  "China", "South Korea", "Japan", "Vietnam", "Australia", "New Zealand",
];

function Markets() {
  return (
    <section id="markets" className="relative overflow-hidden bg-navy-deep py-20 text-white sm:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:items-center">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-[var(--brand-green)]/40 bg-[var(--brand-green)]/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--brand-green)]">
              <span className="h-1.5 w-1.5 rounded-full bg-[var(--brand-green)]" /> Global Footprint
            </div>
            <h2 className="mt-4 text-3xl font-extrabold text-balance sm:text-4xl md:text-5xl">
              Shipping to 50+ countries across 4 continents.
            </h2>
            <p className="mt-4 text-white/70">
              From Tanjung Priok and Surabaya, our containers reach buyers worldwide — with documented
              chain of custody and on-time delivery.
            </p>
            <div className="mt-8 flex flex-wrap gap-2">
              {MARKETS.map((m) => (
                <span
                  key={m}
                  className="rounded-full border border-white/15 bg-white/5 px-3 py-1.5 text-[12px] font-medium text-white/85 backdrop-blur"
                >
                  {m}
                </span>
              ))}
            </div>
          </div>

          {/* Stylized world map */}
          <div className="relative aspect-[16/10] overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-navy-soft to-navy-deep p-6">
            <WorldMap />
            <div className="absolute bottom-4 right-4 rounded-full border border-white/15 bg-navy-deep/70 px-3 py-1.5 text-[11px] text-white/80 backdrop-blur">
              <span className="mr-1.5 inline-block h-2 w-2 rounded-full bg-[var(--brand-green)] align-middle" />
              Active export destinations
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function WorldMap() {
  // Simple dotted continents using SVG circles
  const dots: { cx: number; cy: number }[] = [];
  for (let y = 8; y < 92; y += 4) {
    for (let x = 4; x < 196; x += 4) {
      const lat = ((50 - y) / 50) * 90;
      const lng = ((x - 100) / 100) * 180;
      if (inLandMask(lat, lng)) dots.push({ cx: x, cy: y });
    }
  }
  const ports = [
    { name: "Jakarta", x: 142, y: 60 },
    { name: "Rotterdam", x: 96, y: 30 },
    { name: "New York", x: 50, y: 36 },
    { name: "Los Angeles", x: 28, y: 40 },
    { name: "Dubai", x: 116, y: 44 },
    { name: "Shanghai", x: 156, y: 38 },
    { name: "Sydney", x: 168, y: 76 },
    { name: "Lagos", x: 96, y: 56 },
  ];

  return (
    <svg viewBox="0 0 200 100" className="h-full w-full">
      {dots.map((d, i) => (
        <circle key={i} cx={d.cx} cy={d.cy} r={0.7} fill="white" opacity={0.18} />
      ))}
      {/* arcs from Jakarta */}
      {ports.slice(1).map((p, i) => (
        <path
          key={i}
          d={`M142 60 Q ${(142 + p.x) / 2} ${Math.min(142, 60, p.y) - 20} ${p.x} ${p.y}`}
          stroke="oklch(0.78 0.20 145)"
          strokeWidth={0.4}
          fill="none"
          strokeDasharray="1 1.5"
          opacity={0.7}
        />
      ))}
      {ports.map((p) => (
        <g key={p.name}>
          <circle cx={p.x} cy={p.y} r={1.6} fill="oklch(0.78 0.20 145)" />
          <circle cx={p.x} cy={p.y} r={3} fill="oklch(0.78 0.20 145)" opacity={0.25} />
        </g>
      ))}
    </svg>
  );
}

// Rough land mask so we don't bother with a real geo lib
function inLandMask(lat: number, lng: number) {
  // North America
  if (lat > 15 && lat < 70 && lng > -130 && lng < -55) return true;
  // South America
  if (lat > -55 && lat < 12 && lng > -82 && lng < -34) return true;
  // Europe
  if (lat > 36 && lat < 70 && lng > -10 && lng < 40) return true;
  // Africa
  if (lat > -35 && lat < 36 && lng > -18 && lng < 50) return true;
  // Asia
  if (lat > 5 && lat < 70 && lng > 40 && lng < 145) return true;
  // SE Asia / Indonesia
  if (lat > -10 && lat < 8 && lng > 95 && lng < 140) return true;
  // Australia
  if (lat > -40 && lat < -10 && lng > 112 && lng < 154) return true;
  return false;
}

/* ───────────── Gallery ───────────── */

const GALLERY = [
  { label: "Warehouse", img: imgCocoPeat },
  { label: "Production Floor", img: imgWoodPellet },
  { label: "QC Inspection", img: imgCinnamon },
  { label: "Container Loading", img: heroPort },
  { label: "Port Operations", img: imgCharcoal },
  { label: "Our Team", img: imgCocoFiber },
];

function Gallery() {
  return (
    <section id="gallery" className="bg-background py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="Inside the Operation"
          title="From farm and warehouse to the deck of the ship."
        />
        <div className="mt-12 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
          {GALLERY.map((g, i) => (
            <div
              key={g.label}
              className={`group relative overflow-hidden rounded-2xl shadow-soft ${
                i === 0 ? "col-span-2 row-span-2 aspect-square sm:aspect-auto" : "aspect-square"
              }`}
            >
              <img
                src={g.img}
                alt={g.label}
                loading="lazy"
                className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy-deep/90 via-navy-deep/20 to-transparent" />
              <div className="absolute bottom-3 left-3 right-3 text-[11px] font-bold uppercase tracking-wider text-white">
                {g.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ───────────── Testimonials ───────────── */

const TESTIMONIALS = [
  {
    quote:
      "Consistent quality across 18 months of monthly shipments. Their QC team is responsive and the documentation is always clean.",
    name: "Mehmet Y.",
    role: "Procurement Lead, Istanbul",
    company: "Anatolia Naturals",
  },
  {
    quote:
      "We switched suppliers for our coco peat line and saw immediate gains in EC consistency. Lead times have been exactly as quoted.",
    name: "Linda P.",
    role: "Operations Director",
    company: "GreenRoot NL",
  },
  {
    quote:
      "From quotation to landed FCL in 32 days. Packaging customization was painless and the private label run was on point.",
    name: "Khalid R.",
    role: "Owner",
    company: "Gulf Shisha Co.",
  },
];

function Testimonials() {
  return (
    <section className="bg-secondary py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading eyebrow="Testimonials" title="Buyers from 4 continents, repeating orders." />
        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {TESTIMONIALS.map((t) => (
            <figure
              key={t.name}
              className="flex h-full flex-col rounded-3xl border border-border bg-card p-6 shadow-soft"
            >
              <Quote className="h-7 w-7 text-[var(--brand-green-dark)]" />
              <blockquote className="mt-4 text-sm leading-relaxed text-navy-deep sm:text-base">
                "{t.quote}"
              </blockquote>
              <figcaption className="mt-6 border-t border-border pt-4">
                <div className="text-sm font-bold text-navy-deep">{t.name}</div>
                <div className="text-[12px] text-muted-foreground">
                  {t.role} · {t.company}
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ───────────── Blog ───────────── */

const POSTS = [
  {
    tag: "Spices",
    title: "Indonesian Cinnamon Export: Korintje grading explained",
    excerpt:
      "From AA to KB — what each grade means, oil content ranges, and how to spec your purchase.",
    img: imgCinnamon,
  },
  {
    tag: "Coconut",
    title: "Coco Peat for Agriculture: EC, pH, and rehydration",
    excerpt:
      "A practical primer on what professional growers should look for when sourcing coco peat at scale.",
    img: imgCocoPeat,
  },
  {
    tag: "Logistics",
    title: "Export procedure from Indonesia in 7 steps",
    excerpt:
      "Documents, fumigation, COO, and the standard timeline from PO to bill of lading.",
    img: heroPort,
  },
];

function Blog() {
  return (
    <section id="blog" className="bg-background py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="Insights"
          title="Field notes from Indonesia's export floor."
          description="Buyer-friendly explainers on products, grades, and the procedure of importing from us."
        />
        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {POSTS.map((p) => (
            <article
              key={p.title}
              className="group overflow-hidden rounded-3xl border border-border bg-card shadow-soft transition hover:-translate-y-1 hover:shadow-elevated"
            >
              <div className="aspect-[16/10] overflow-hidden">
                <img
                  src={p.img}
                  alt={p.title}
                  loading="lazy"
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                />
              </div>
              <div className="p-6">
                <div className="inline-flex items-center rounded-full bg-[var(--brand-green)]/15 px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider text-[var(--brand-green-dark)]">
                  {p.tag}
                </div>
                <h3 className="mt-3 text-lg font-bold text-navy-deep">{p.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{p.excerpt}</p>
                <div className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-navy">
                  Read article <ArrowRight className="h-4 w-4" />
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ───────────── RFQ + Contact / Footer ───────────── */

function RFQ() {
  const [submitted, setSubmitted] = useState(false);
  return (
    <section id="rfq" className="bg-navy-deep py-20 text-white sm:py-28">
      <div className="mx-auto grid max-w-7xl gap-12 px-5 sm:px-8 lg:grid-cols-[1fr_1.05fr] lg:items-start">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-[var(--brand-green)]/40 bg-[var(--brand-green)]/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--brand-green)]">
            <span className="h-1.5 w-1.5 rounded-full bg-[var(--brand-green)]" /> Request for Quotation
          </div>
          <h2 className="mt-4 text-3xl font-extrabold text-balance sm:text-4xl md:text-5xl">
            Tell us what you need. We&apos;ll quote within 24h.
          </h2>
          <p className="mt-4 max-w-lg text-white/70">
            Share product, quantity, destination port, and any special requirements. Our sales team
            will reply with pricing, lead time, and packaging options.
          </p>
          <div id="contact" className="mt-10 grid gap-4">
            <ContactLine icon={MessageCircle} title="WhatsApp" value="+62 812-3456-7890" />
            <ContactLine icon={Mail} title="Email" value="sales@arthaprimaglobal.com" />
            <ContactLine icon={Phone} title="Phone" value="+62 21 5550 1234" />
            <ContactLine
              icon={MapPin}
              title="Office"
              value="Jakarta, Indonesia · Mon–Sat · 08:00–17:00 WIB"
            />
            <ContactLine
              icon={Anchor}
              title="Loading ports"
              value="Tanjung Priok, Tanjung Perak, Belawan"
            />
          </div>
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            setSubmitted(true);
          }}
          className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur sm:p-8"
        >
          {submitted ? (
            <div className="flex h-full min-h-[420px] flex-col items-center justify-center text-center">
              <div className="grid h-14 w-14 place-items-center rounded-full bg-[var(--brand-green)]">
                <CheckCircle2 className="h-7 w-7 text-navy-deep" />
              </div>
              <h3 className="mt-5 text-2xl font-extrabold">Thank you!</h3>
              <p className="mt-2 max-w-sm text-sm text-white/70">
                Your inquiry has been received. A member of our export team will reach out within
                one business day.
              </p>
            </div>
          ) : (
            <div className="grid gap-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="Full name" name="name" placeholder="Your name" required />
                <Field label="Company" name="company" placeholder="Company name" />
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="Email" name="email" type="email" placeholder="you@company.com" required />
                <Field label="Country" name="country" placeholder="Destination country" />
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <SelectField
                  label="Product"
                  name="product"
                  options={PRODUCTS.map((p) => p.name)}
                />
                <Field label="Quantity / FCL" name="qty" placeholder="e.g. 2 x 40 HQ" />
              </div>
              <TextareaField
                label="Message"
                name="message"
                placeholder="Specifications, packing, destination port, timing…"
              />
              <button
                type="submit"
                className="mt-2 inline-flex items-center justify-center gap-2 rounded-full bg-[var(--brand-green)] px-6 py-3.5 text-sm font-bold text-navy-deep transition hover:brightness-110"
              >
                Submit RFQ <Send className="h-4 w-4" />
              </button>
              <p className="text-[11px] text-white/50">
                By submitting you agree to be contacted by our sales team about your inquiry.
              </p>
            </div>
          )}
        </form>
      </div>
    </section>
  );
}

function ContactLine({
  icon: Icon,
  title,
  value,
}: {
  icon: typeof Mail;
  title: string;
  value: string;
}) {
  return (
    <div className="flex items-start gap-4 rounded-2xl border border-white/10 bg-white/5 p-4">
      <div className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-[var(--brand-green)]/15 ring-1 ring-[var(--brand-green)]/30">
        <Icon className="h-5 w-5 text-[var(--brand-green)]" />
      </div>
      <div className="min-w-0">
        <div className="text-[11px] font-bold uppercase tracking-wider text-white/60">{title}</div>
        <div className="truncate text-sm font-semibold text-white">{value}</div>
      </div>
    </div>
  );
}

function Field({
  label,
  name,
  type = "text",
  placeholder,
  required,
}: {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
}) {
  return (
    <label className="block">
      <span className="text-[11px] font-bold uppercase tracking-wider text-white/60">{label}</span>
      <input
        name={name}
        type={type}
        placeholder={placeholder}
        required={required}
        className="mt-1.5 w-full rounded-xl border border-white/15 bg-navy-deep/40 px-4 py-3 text-sm text-white placeholder:text-white/30 focus:border-[var(--brand-green)] focus:outline-none"
      />
    </label>
  );
}

function TextareaField({
  label,
  name,
  placeholder,
}: {
  label: string;
  name: string;
  placeholder?: string;
}) {
  return (
    <label className="block">
      <span className="text-[11px] font-bold uppercase tracking-wider text-white/60">{label}</span>
      <textarea
        name={name}
        rows={4}
        placeholder={placeholder}
        className="mt-1.5 w-full rounded-xl border border-white/15 bg-navy-deep/40 px-4 py-3 text-sm text-white placeholder:text-white/30 focus:border-[var(--brand-green)] focus:outline-none"
      />
    </label>
  );
}

function SelectField({
  label,
  name,
  options,
}: {
  label: string;
  name: string;
  options: string[];
}) {
  return (
    <label className="block">
      <span className="text-[11px] font-bold uppercase tracking-wider text-white/60">{label}</span>
      <select
        name={name}
        className="mt-1.5 w-full rounded-xl border border-white/15 bg-navy-deep/40 px-4 py-3 text-sm text-white focus:border-[var(--brand-green)] focus:outline-none"
      >
        {options.map((o) => (
          <option key={o} value={o} className="bg-navy-deep">
            {o}
          </option>
        ))}
      </select>
    </label>
  );
}

function Footer() {
  return (
    <footer className="bg-navy-deep pb-10 pt-16 text-white/70">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid gap-10 border-b border-white/10 pb-10 lg:grid-cols-[1.3fr_1fr_1fr_1fr]">
          <div>
            <Logo />
            <p className="mt-5 max-w-sm text-sm text-white/60">
              PT Artha Prima Global — Indonesia&apos;s trusted exporter of coconut products and
              premium spices. Direct from origin, shipped worldwide.
            </p>
          </div>
          <FooterCol
            title="Products"
            items={PRODUCTS.map((p) => p.name)}
          />
          <FooterCol
            title="Company"
            items={["About", "Certifications", "Gallery", "Insights", "Contact"]}
          />
          <FooterCol
            title="Connect"
            items={["WhatsApp", "Email", "LinkedIn", "Google Maps", "RFQ Form"]}
          />
        </div>
        <div className="flex flex-col items-start justify-between gap-3 pt-6 text-xs text-white/50 sm:flex-row sm:items-center">
          <div>© {new Date().getFullYear()} PT Artha Prima Global. All rights reserved.</div>
          <div>Made in Indonesia · For the world.</div>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, items }: { title: string; items: string[] }) {
  return (
    <div>
      <div className="text-[11px] font-bold uppercase tracking-wider text-white">{title}</div>
      <ul className="mt-4 space-y-2.5 text-sm">
        {items.map((i) => (
          <li key={i}>
            <a href="#" className="text-white/65 transition hover:text-[var(--brand-green)]">
              {i}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

/* ───────────── Page ───────────── */

function Index() {
  return (
    <main className="bg-background">
      <Hero />
      <ProductsSection />
      <WhyUs />
      <Certifications />
      <Calculator />
      <Markets />
      <Gallery />
      <Testimonials />
      <Blog />
      <RFQ />
      <Footer />
    </main>
  );
}
