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
  Languages,
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
import arthaPrimaLogo from "@/assets/artha-global-prima-wide-transparent.png";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "PT Artha Global Prima — Trusted Indonesian Natural Products Exporter" },
      {
        name: "description",
        content:
          "PT Artha Global Prima exports premium Indonesian coconut products, palm sugar, biomass, and spices with strict quality control, flexible packaging, professional documentation, and reliable worldwide shipping.",
      },
      {
        name: "keywords",
        content:
          "Indonesian exporter, coconut products exporter, coco peat supplier, coconut charcoal briquettes, palm sugar exporter, wood pellets Indonesia, Indonesian spices exporter, cinnamon cloves nutmeg pepper turmeric ginger",
      },
      { property: "og:title", content: "PT Artha Global Prima — Trusted Export Partner from Indonesia" },
      {
        property: "og:description",
        content:
          "Reliable sourcing for premium Indonesian natural products: coconut products, palm sugar, biomass, and selected spices for global importers, wholesalers, manufacturers, and retailers.",
      },
      { property: "og:type", content: "website" },
    ],
  }),
  component: Index,
});

/* ───────────── Reusable bits ───────────── */

function Logo({ className = "", dark = false }: { className?: string; dark?: boolean }) {
  return (
    <div
      className={`flex items-center ${
        dark
          ? "h-[58px] w-[178px] sm:h-[64px] sm:w-[198px]"
          : "h-16 w-[206px] rounded-2xl bg-white/95 px-3 py-2 shadow-soft ring-1 ring-white/20"
      } ${className}`}
    >
      <img
        src={arthaPrimaLogo}
        alt="PT Artha Global Prima"
        width={1500}
        height={423}
        className="h-full w-full object-contain drop-shadow-[0_10px_16px_rgba(31,66,100,0.28)]"
      />
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

const NAV_ITEMS = [
  { href: "#about", key: "about" },
  { href: "#products", key: "products" },
  { href: "#why", key: "why" },
  { href: "#certifications", key: "certifications" },
  { href: "#calculator", key: "calculator" },
  { href: "#markets", key: "markets" },
  { href: "#blog", key: "insights" },
  { href: "#contact", key: "contact" },
] as const;

type Lang = "en" | "id" | "zh" | "ar";

const LANGUAGES: { code: Lang; label: string; short: string }[] = [
  { code: "en", label: "English", short: "EN" },
  { code: "id", label: "Indonesia", short: "ID" },
  { code: "zh", label: "中文", short: "中文" },
  { code: "ar", label: "العربية", short: "AR" },
];

const COPY = {
  en: {
    nav: {
      about: "About",
      products: "Products",
      why: "Why Us",
      certifications: "Certifications",
      calculator: "Calculator",
      markets: "Markets",
      insights: "Insights",
      contact: "Contact",
    },
    cta: "Request Quotation",
    hero: {
      kicker: "Indonesia's Trusted Exporter of",
      titleTop: "Coconut Products &",
      titleAccent: "Premium Spices",
      tagline: "Supplying consistent quality to buyers worldwide",
      profile: "Download Company Profile",
    },
    about: {
      eyebrow: "About Us",
      title: "A dependable Indonesian export partner for premium natural products.",
      lead:
        "PT Artha Global Prima connects the richness of Indonesia's natural resources with global buyers through carefully selected coconut products, palm sugar, biomass, and selected spices.",
      body:
        "We work through trusted supplier networks and experienced export professionals to support importers, wholesalers, distributors, manufacturers, and retailers with reliable sourcing, strict quality control, professional documentation, and timely delivery.",
      quote: "We don't just export products. We build lasting partnerships.",
      quoteBody:
        "Our goal is to help businesses worldwide access Indonesia's finest natural products while creating sustainable value for customers, suppliers, and local communities.",
      stats: ["Premium export quality", "Professional documentation", "Flexible packaging", "Long-term partnership"],
    },
    products: {
      eyebrow: "Our Products",
      title: "Export-ready natural products from Indonesia.",
      desc: "Core commercial lines for agriculture, food industries, biomass energy, manufacturing, and retail distribution.",
    },
    vision: {
      eyebrow: "Our Vision",
      title: "To become a globally trusted Indonesian export company.",
      desc: "We deliver premium natural products with exceptional quality, sustainable practices, and reliable partnerships that create long-term value for customers worldwide.",
      mission: "Our Mission",
      values: "Core Values",
    },
  },
  id: {
    nav: {
      about: "Tentang",
      products: "Produk",
      why: "Keunggulan",
      certifications: "Dokumen",
      calculator: "Kalkulator",
      markets: "Pasar",
      insights: "Insight",
      contact: "Kontak",
    },
    cta: "Minta Penawaran",
    hero: {
      kicker: "Eksportir Terpercaya Indonesia untuk",
      titleTop: "Produk Kelapa &",
      titleAccent: "Rempah Premium",
      tagline: "Menyuplai kualitas konsisten untuk pembeli di seluruh dunia",
      profile: "Unduh Company Profile",
    },
    about: {
      eyebrow: "Tentang Kami",
      title: "Mitra ekspor Indonesia yang andal untuk produk alami premium.",
      lead:
        "PT Artha Global Prima menghubungkan kekayaan sumber daya alam Indonesia dengan pembeli global melalui produk kelapa, gula aren, biomassa, dan rempah pilihan.",
      body:
        "Kami bekerja dengan jaringan pemasok terpercaya dan profesional ekspor berpengalaman untuk mendukung importir, grosir, distributor, manufaktur, dan retail melalui sourcing yang andal, kontrol kualitas ketat, dokumentasi profesional, dan pengiriman tepat waktu.",
      quote: "Kami tidak hanya mengekspor produk. Kami membangun kemitraan jangka panjang.",
      quoteBody:
        "Tujuan kami adalah membantu bisnis dunia mengakses produk alami terbaik Indonesia sambil menciptakan nilai berkelanjutan bagi pelanggan, pemasok, dan komunitas lokal.",
      stats: ["Kualitas ekspor premium", "Dokumentasi profesional", "Kemasan fleksibel", "Kemitraan jangka panjang"],
    },
    products: {
      eyebrow: "Produk Kami",
      title: "Produk alami Indonesia yang siap ekspor.",
      desc: "Lini komersial utama untuk pertanian, industri makanan, energi biomassa, manufaktur, dan distribusi retail.",
    },
    vision: {
      eyebrow: "Visi Kami",
      title: "Menjadi perusahaan eksportir Indonesia yang dipercaya secara global.",
      desc: "Kami menghadirkan produk alami premium dengan kualitas tinggi, praktik berkelanjutan, dan kemitraan andal yang menciptakan nilai jangka panjang bagi pelanggan dunia.",
      mission: "Misi Kami",
      values: "Nilai Utama",
    },
  },
  zh: {
    nav: {
      about: "关于",
      products: "产品",
      why: "优势",
      certifications: "文件",
      calculator: "计算器",
      markets: "市场",
      insights: "资讯",
      contact: "联系",
    },
    cta: "获取报价",
    hero: {
      kicker: "印度尼西亚可信赖出口商",
      titleTop: "椰子产品与",
      titleAccent: "优质香料",
      tagline: "为全球买家稳定供应一致品质",
      profile: "下载公司简介",
    },
    about: {
      eyebrow: "关于我们",
      title: "值得信赖的印尼天然产品出口伙伴。",
      lead:
        "PT Artha Global Prima 通过精选椰子产品、棕榈糖、生物质和印尼香料，将印度尼西亚丰富的天然资源连接到全球买家。",
      body:
        "我们依托可信赖的供应商网络和经验丰富的出口团队，为进口商、批发商、分销商、制造商和零售商提供稳定采购、严格质检、专业出口文件和准时交付。",
      quote: "我们不只是出口产品。我们建立长期合作伙伴关系。",
      quoteBody:
        "我们的目标是帮助全球企业获得印尼优质天然产品，并为客户、供应商和当地社区创造可持续价值。",
      stats: ["优质出口品质", "专业出口文件", "灵活包装方案", "长期业务伙伴"],
    },
    products: {
      eyebrow: "我们的产品",
      title: "来自印度尼西亚的出口级天然产品。",
      desc: "适用于农业、食品工业、生物质能源、制造业和零售分销的核心产品线。",
    },
    vision: {
      eyebrow: "我们的愿景",
      title: "成为全球可信赖的印度尼西亚出口公司。",
      desc: "我们以卓越品质、可持续实践和可靠合作关系，向全球客户提供优质天然产品并创造长期价值。",
      mission: "我们的使命",
      values: "核心价值",
    },
  },
  ar: {
    nav: {
      about: "من نحن",
      products: "المنتجات",
      why: "لماذا نحن",
      certifications: "المستندات",
      calculator: "الحاسبة",
      markets: "الأسواق",
      insights: "رؤى",
      contact: "اتصال",
    },
    cta: "طلب عرض سعر",
    hero: {
      kicker: "المصدر الإندونيسي الموثوق",
      titleTop: "لمنتجات جوز الهند و",
      titleAccent: "التوابل الفاخرة",
      tagline: "توريد جودة ثابتة للمشترين حول العالم",
      profile: "تحميل الملف التعريفي",
    },
    about: {
      eyebrow: "من نحن",
      title: "شريك تصدير إندونيسي موثوق للمنتجات الطبيعية الفاخرة.",
      lead:
        "تربط PT Artha Global Prima ثراء الموارد الطبيعية الإندونيسية بالمشترين حول العالم من خلال منتجات جوز الهند وسكر النخيل والكتلة الحيوية والتوابل المختارة.",
      body:
        "نعمل عبر شبكة موردين موثوقة وفريق تصدير محترف لدعم المستوردين وتجار الجملة والموزعين والمصنعين وتجار التجزئة بحلول توريد موثوقة ورقابة جودة صارمة ووثائق تصدير احترافية وتسليم في الوقت المحدد.",
      quote: "نحن لا نصدر المنتجات فقط. نحن نبني شراكات مستدامة.",
      quoteBody:
        "هدفنا هو مساعدة الشركات حول العالم على الوصول إلى أفضل المنتجات الطبيعية الإندونيسية مع خلق قيمة مستدامة للعملاء والموردين والمجتمعات المحلية.",
      stats: ["جودة تصدير فاخرة", "وثائق احترافية", "تغليف مرن", "شراكة طويلة الأمد"],
    },
    products: {
      eyebrow: "منتجاتنا",
      title: "منتجات طبيعية إندونيسية جاهزة للتصدير.",
      desc: "خطوط تجارية رئيسية للزراعة والصناعات الغذائية وطاقة الكتلة الحيوية والتصنيع والتوزيع.",
    },
    vision: {
      eyebrow: "رؤيتنا",
      title: "أن نصبح شركة تصدير إندونيسية موثوقة عالميا.",
      desc: "نقدم منتجات طبيعية فاخرة بجودة استثنائية وممارسات مستدامة وشراكات موثوقة تخلق قيمة طويلة الأمد للعملاء حول العالم.",
      mission: "مهمتنا",
      values: "قيمنا",
    },
  },
} satisfies Record<Lang, {
  nav: Record<(typeof NAV_ITEMS)[number]["key"], string>;
  cta: string;
  hero: Record<"kicker" | "titleTop" | "titleAccent" | "tagline" | "profile", string>;
  about: {
    eyebrow: string;
    title: string;
    lead: string;
    body: string;
    quote: string;
    quoteBody: string;
    stats: string[];
  };
  products: { eyebrow: string; title: string; desc: string };
  vision: { eyebrow: string; title: string; desc: string; mission: string; values: string };
}>;

function Header({
  lang,
  setLang,
}: {
  lang: Lang;
  setLang: (lang: Lang) => void;
}) {
  const [open, setOpen] = useState(false);
  const t = COPY[lang];
  return (
    <header className="absolute inset-x-0 top-0 z-30 border-b border-white/70 bg-[linear-gradient(135deg,rgba(255,255,255,0.97)_0%,rgba(246,250,246,0.94)_48%,rgba(229,240,231,0.9)_100%)] shadow-[0_12px_34px_-24px_rgba(8,23,46,0.5)] backdrop-blur">
      <div className="mx-auto flex max-w-[1440px] items-center justify-between px-5 py-2 sm:px-8">
        <div className="hidden items-center gap-7 lg:flex">
          <a href="#top" className="shrink-0 transition-transform duration-300 hover:-translate-y-0.5">
            <Logo dark />
          </a>
          <nav className="flex items-center gap-2">
            {NAV_ITEMS.map((n) => (
              <a
                key={n.href}
                href={n.href}
                className="rounded-full px-4 py-2 text-sm font-semibold text-navy-deep transition-all duration-200 hover:-translate-y-0.5 hover:bg-navy-deep hover:text-white hover:shadow-[0_14px_28px_-18px_rgba(8,23,46,0.8)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy-soft"
              >
                {t.nav[n.key]}
              </a>
            ))}
          </nav>
        </div>
        <div className="hidden items-center gap-3 lg:flex">
          <label className="relative inline-flex items-center gap-2 rounded-full border border-navy-deep/10 bg-white/70 px-3 py-2 text-sm font-bold text-navy-deep shadow-soft backdrop-blur">
            <Languages className="h-4 w-4" />
            <select
              value={lang}
              onChange={(e) => setLang(e.target.value as Lang)}
              className="appearance-none bg-transparent pr-5 text-sm font-bold outline-none"
              aria-label="Select language"
            >
              {LANGUAGES.map((item) => (
                <option key={item.code} value={item.code}>
                  {item.short}
                </option>
              ))}
            </select>
          </label>
          <a
            href="#rfq"
            className="inline-flex items-center gap-2 rounded-full bg-navy-deep px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-navy-soft"
          >
            {t.cta} <ArrowRight className="h-4 w-4" />
          </a>
        </div>
        <button
          onClick={() => setOpen(true)}
          aria-label="Open menu"
          className="grid h-10 w-10 place-items-center rounded-full bg-navy-deep/10 text-navy-deep ring-1 ring-navy-deep/20 lg:hidden"
        >
          <Menu className="h-5 w-5" />
        </button>
      </div>
      {open && (
        <div className="fixed inset-0 z-50 bg-white/98 backdrop-blur-md lg:hidden">
          <div className="flex items-center justify-between border-b border-navy-deep/10 px-5 py-4">
            <Logo dark />
            <button
              onClick={() => setOpen(false)}
              aria-label="Close menu"
              className="grid h-10 w-10 place-items-center rounded-full bg-navy-deep/10 text-navy-deep ring-1 ring-navy-deep/20"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
          <nav className="flex flex-col gap-1 px-5 pt-4">
            {NAV_ITEMS.map((n) => (
              <a
                key={n.href}
                href={n.href}
                onClick={() => setOpen(false)}
                className="rounded-2xl px-4 py-4 text-lg font-semibold text-navy-deep transition hover:bg-navy-deep hover:text-white"
              >
                {t.nav[n.key]}
              </a>
            ))}
            <div className="mt-4 grid grid-cols-4 gap-2">
              {LANGUAGES.map((item) => (
                <button
                  key={item.code}
                  onClick={() => setLang(item.code)}
                  className={`rounded-full border px-3 py-2 text-sm font-bold ${
                    lang === item.code
                      ? "border-navy-deep bg-navy-deep text-white"
                      : "border-navy-deep/10 text-navy-deep"
                  }`}
                >
                  {item.short}
                </button>
              ))}
            </div>
            <a
              href="#rfq"
              onClick={() => setOpen(false)}
              className="mt-4 inline-flex items-center justify-center gap-2 rounded-full bg-navy-deep px-5 py-3 text-sm font-semibold text-white"
            >
              {t.cta} <ArrowRight className="h-4 w-4" />
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}

/* ───────────── Hero ───────────── */

type HeroBadgeIconType = "quality" | "price" | "delivery" | "shipping";

const HERO_BADGES: { icon: HeroBadgeIconType; title: string; desc: string }[] = [
  { icon: "quality", title: "Premium Quality", desc: "High standard products" },
  { icon: "price", title: "Competitive Price", desc: "Best value for your business" },
  { icon: "delivery", title: "On-Time Delivery", desc: "Reliable & trustworthy" },
  { icon: "shipping", title: "Global Shipping", desc: "Worldwide export service" },
];

function HeroBadgeIcon({ type }: { type: HeroBadgeIconType }) {
  const common = "h-7 w-7";
  if (type === "quality") {
    return (
      <svg viewBox="0 0 32 32" className={common} fill="none" aria-hidden="true">
        <path d="M16 3.5 25 7v7.1c0 5.6-3.7 10.8-9 13.9-5.3-3.1-9-8.3-9-13.9V7l9-3.5Z" stroke="currentColor" strokeWidth="2.1" strokeLinejoin="round" />
        <path d="m11.5 15.8 3.1 3.1 6.5-7" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M20.8 22.2c-2.5 1.7-4.8 2.6-4.8 2.6s-2.3-.9-4.8-2.6" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" opacity=".65" />
      </svg>
    );
  }
  if (type === "price") {
    return (
      <svg viewBox="0 0 32 32" className={common} fill="none" aria-hidden="true">
        <path d="M5.5 17.2 17.2 5.5h7.3v7.3L12.8 24.5a3 3 0 0 1-4.2 0l-3.1-3.1a3 3 0 0 1 0-4.2Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
        <path d="M21.7 10.2h.02" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
        <path d="M17.2 17.2c-1.8-.7-4.4-.3-4.7 1.3-.5 2.6 5.8 1.3 5.2 4-.4 1.7-3.4 1.8-5.4.8M15.2 15.8l-.6 8.6" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
      </svg>
    );
  }
  if (type === "delivery") {
    return (
      <svg viewBox="0 0 32 32" className={common} fill="none" aria-hidden="true">
        <path d="M16 27a10 10 0 1 0 0-20 10 10 0 0 0 0 20Z" stroke="currentColor" strokeWidth="2.1" />
        <path d="M16 11v6l4 2.5" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M11.8 4.5h8.4M9 7 6.8 4.8M23 7l2.2-2.2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        <path d="M5.5 17h-3M7 22H4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" opacity=".65" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 32 32" className={common} fill="none" aria-hidden="true">
      <path d="M16 27a11 11 0 1 0 0-22 11 11 0 0 0 0 22Z" stroke="currentColor" strokeWidth="2" />
      <path d="M5.5 16h21M16 5c3.1 3 4.7 6.7 4.7 11S19.1 24 16 27c-3.1-3-4.7-6.7-4.7-11S12.9 8 16 5Z" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M8.2 23.7h15.6M8.2 8.3h15.6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity=".65" />
      <path d="m22.4 21.6 3.4-1.4 1.6 2.8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function Hero({ lang, setLang }: { lang: Lang; setLang: (lang: Lang) => void }) {
  const t = COPY[lang];
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
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(31,66,100,0.92)_0%,rgba(40,79,118,0.82)_26%,rgba(40,79,118,0.50)_42%,rgba(40,79,118,0.22)_56%,rgba(40,79,118,0)_70%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(31,66,100,0.08)_0%,rgba(31,66,100,0.04)_38%,rgba(31,66,100,0)_55%,rgba(0,0,0,0.24)_100%)]" />
        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/55 to-transparent" />
      </div>

      <Header lang={lang} setLang={setLang} />

      <div className="absolute left-[max(1.25rem,calc((100vw-80rem)/2+2rem))] top-[7rem] z-20 hidden lg:block">
        <div className="font-display text-4xl font-extrabold uppercase leading-none tracking-[-0.045em] text-white text-shadow-hero xl:text-5xl">
          ARTHA GLOBAL PRIMA
        </div>
        <div className="mt-4 h-px w-72 bg-gradient-to-r from-[#d2a53a] via-white/65 to-transparent" />
      </div>

      <div className="mx-auto grid min-h-[min(820px,100svh)] max-w-7xl items-end px-5 pb-16 pt-36 sm:px-8 lg:pt-44">
        <div className="max-w-3xl rounded-[2rem] bg-black/10 p-5 backdrop-blur-[1px] sm:p-7 lg:bg-transparent lg:p-0 lg:backdrop-blur-0">
          <p className="text-sm font-bold uppercase tracking-[0.25em] text-white text-shadow-lg">
            {t.hero.kicker}
          </p>
          <h1 className="mt-3 text-4xl font-extrabold leading-[1.02] text-white text-balance text-shadow-hero sm:text-5xl md:text-6xl lg:text-7xl">
            {t.hero.titleTop}
            <br />
            <span className="text-white">
              {t.hero.titleAccent}
            </span>
          </h1>
          <div className="mt-6 flex items-center gap-3">
            <span className="h-px w-10 bg-white" />
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-white text-shadow-lg sm:text-sm">
              {t.hero.tagline}
            </p>
          </div>

          <div className="mt-9 flex flex-wrap gap-3">
            <a
              href="#rfq"
              className="group inline-flex items-center gap-2 rounded-full bg-navy-deep px-6 py-3.5 text-sm font-bold text-white shadow-elevated transition hover:-translate-y-0.5 hover:bg-navy-soft"
            >
              {t.cta}
              <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
            </a>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/5 px-6 py-3.5 text-sm font-semibold text-white backdrop-blur transition hover:bg-white/10"
            >
              <Download className="h-4 w-4" />
              {t.hero.profile}
            </a>
          </div>

          {/* Feature badges */}
          <div className="mt-10 grid w-[min(860px,calc(100vw-4rem))] grid-cols-2 gap-4 sm:grid-cols-4">
            {HERO_BADGES.map((b) => (
              <div
                key={b.title}
                className="lift-panel flex min-h-[92px] items-center gap-4 rounded-2xl border border-white/15 bg-white/10 px-4 py-4 shadow-[0_18px_40px_-30px_rgba(0,0,0,0.85)] ring-1 ring-white/5 backdrop-blur-md hover:lift-panel-hover"
              >
                <div className="grid h-13 w-13 shrink-0 place-items-center rounded-2xl bg-[var(--brand-green)]/12 text-[var(--brand-green)] ring-1 ring-[var(--brand-green)]/35">
                  <HeroBadgeIcon type={b.icon} />
                </div>
                <div className="min-w-0 text-shadow-sm">
                  <div className="text-[12px] font-extrabold uppercase tracking-[0.08em] text-white">
                    {b.title}
                  </div>
                  <div className="mt-1 text-[13px] leading-snug text-white/76">{b.desc}</div>
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

/* ───────────── About / Corporate Profile ───────────── */

const PORTFOLIO_GROUPS = [
  {
    title: "Coconut Products",
    items: [
      "Coco Peat",
      "Coco Bristle",
      "Coconut Stick Broom",
      "Coconut Charcoal",
      "Coconut Charcoal Briquettes",
    ],
  },
  {
    title: "Palm Sugar Products",
    items: ["Palm Sugar Powder", "Palm Sugar Block", "Organic Palm Sugar"],
  },
  {
    title: "Biomass Products",
    items: ["Wood Pellets"],
  },
  {
    title: "Indonesian Spices",
    items: ["Cinnamon", "Cloves", "Nutmeg", "Black Pepper", "White Pepper", "Turmeric", "Ginger"],
  },
];

const MISSIONS = [
  {
    title: "Deliver Premium Quality Products",
    desc: "Supply high-quality coconut products, palm sugar, biomass, and Indonesian spices that consistently meet international standards.",
  },
  {
    title: "Build Long-Term Partnerships",
    desc: "Establish lasting relationships with customers through trust, integrity, transparency, and professional service.",
  },
  {
    title: "Ensure Consistent Quality",
    desc: "Implement strict quality control from raw material selection, production, packaging, to export shipment.",
  },
  {
    title: "Provide Reliable Export Solutions",
    desc: "Offer competitive pricing, flexible packaging, complete export documentation, and on-time worldwide delivery.",
  },
  {
    title: "Promote Sustainable Business",
    desc: "Support environmentally responsible sourcing while empowering local farmers, producers, and communities across Indonesia.",
  },
  {
    title: "Drive Customer Success",
    desc: "Understand customer needs and provide tailored solutions that help their businesses grow successfully.",
  },
];

const CORE_VALUES = ["Integrity", "Quality", "Commitment", "Innovation", "Sustainability", "Customer Focus"];

const RFQ_PRODUCT_OPTIONS = PORTFOLIO_GROUPS.flatMap((group) => group.items);

function AboutSection({ lang }: { lang: Lang }) {
  const t = COPY[lang];
  return (
    <section id="about" className="relative overflow-hidden bg-background py-20 sm:py-28">
      <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-navy-deep/5 to-transparent" />
      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <div className="mx-auto max-w-5xl">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-[var(--brand-green)]/40 bg-[var(--brand-green)]/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--brand-green-dark)]">
              <span className="h-1.5 w-1.5 rounded-full bg-[var(--brand-green)]" /> {t.about.eyebrow}
            </div>
            <h2 className="mx-auto mt-5 max-w-4xl text-3xl font-extrabold text-navy-deep text-balance sm:text-4xl md:text-6xl">
              {t.about.title}
            </h2>
            <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-muted-foreground">
              {t.about.lead}
            </p>
            <p className="mx-auto mt-4 max-w-3xl leading-7 text-muted-foreground">
              {t.about.body}
            </p>
          </div>

          <div className="mt-12 grid gap-px overflow-hidden rounded-3xl border border-border bg-border shadow-soft sm:grid-cols-2 lg:grid-cols-4">
            {t.about.stats.map((item) => (
              <div key={item} className="lift-panel hover:lift-panel-hover bg-card px-5 py-6 text-center">
                <CheckCircle2 className="mx-auto h-5 w-5 text-[var(--brand-green-dark)]" />
                <div className="mt-3 text-sm font-extrabold uppercase tracking-[0.12em] text-navy-deep">
                  {item}
                </div>
              </div>
            ))}
          </div>

          <div className="lift-panel hover:lift-panel-hover mx-auto mt-10 max-w-3xl rounded-3xl bg-navy-deep p-7 text-center text-white shadow-elevated sm:p-9">
            <p className="text-2xl font-extrabold text-balance">
              {t.about.quote}
            </p>
            <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-white/70">
              {t.about.quoteBody}
            </p>
          </div>
        </div>

        <div className="lift-panel hover:lift-panel-hover mt-16 grid overflow-hidden rounded-3xl bg-navy-deep text-white shadow-elevated lg:grid-cols-[0.9fr_1.1fr]">
          <div className="border-b border-white/10 p-7 sm:p-9 lg:border-b-0 lg:border-r">
            <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-[var(--brand-green)] text-navy-deep">
              <Award className="h-6 w-6" />
            </div>
            <div className="mt-6 text-[11px] font-bold uppercase tracking-[0.2em] text-[var(--brand-green)]">
              {t.vision.eyebrow}
            </div>
            <h3 className="mt-3 text-2xl font-extrabold text-balance sm:text-3xl">
              {t.vision.title}
            </h3>
            <p className="mt-4 text-sm leading-7 text-white/70">
              {t.vision.desc}
            </p>
          </div>
          <div className="p-7 sm:p-9">
            <div className="text-[11px] font-bold uppercase tracking-[0.2em] text-[var(--brand-green)]">
              {t.vision.mission}
            </div>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {MISSIONS.map((mission) => (
                <div key={mission.title} className="lift-panel hover:lift-panel-hover rounded-2xl border border-white/10 bg-white/5 p-4">
                  <CheckCircle2 className="h-5 w-5 text-[var(--brand-green)]" />
                  <h4 className="mt-3 text-sm font-bold">{mission.title}</h4>
                  <p className="mt-2 text-[13px] leading-6 text-white/65">{mission.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
          <span className="w-full text-center text-[11px] font-bold uppercase tracking-[0.2em] text-[var(--brand-green-dark)]">
            {t.vision.values}
          </span>
          {CORE_VALUES.map((value) => (
            <span
              key={value}
              className="rounded-full border border-[var(--brand-green)]/30 bg-[var(--brand-green)]/10 px-4 py-2 text-sm font-bold text-navy-deep"
            >
              {value}
            </span>
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

function ProductsSection({ lang }: { lang: Lang }) {
  const [active, setActive] = useState<Product>(PRODUCTS[0]);
  const t = COPY[lang];
  return (
    <section id="products" className="relative bg-secondary py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          eyebrow={t.products.eyebrow}
          title={t.products.title}
          description={t.products.desc}
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
                  className={`lift-panel hover:lift-panel-hover group relative overflow-hidden rounded-2xl border bg-card text-left shadow-soft ${
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
          <div className="lift-panel hover:lift-panel-hover overflow-hidden rounded-3xl bg-navy-deep text-white shadow-elevated">
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
  { icon: Award, title: "Premium Export Quality", desc: "Selected products prepared to meet international buyer expectations." },
  { icon: Sparkles, title: "Competitive Factory Pricing", desc: "Commercial pricing for importers, wholesalers, distributors, and manufacturers." },
  { icon: ShieldCheck, title: "Strict Quality Control", desc: "QC from raw material selection, processing, packaging, to export shipment." },
  { icon: Globe2, title: "Reliable Worldwide Shipping", desc: "Coordinated shipment planning from Indonesia to global destination ports." },
  { icon: FileText, title: "Professional Documentation", desc: "Export paperwork prepared carefully for smoother international trade." },
  { icon: Package, title: "Flexible Packaging & OEM", desc: "Bulk, retail, private label, and custom packaging options by request." },
  { icon: MessageCircle, title: "Fast Customer Support", desc: "Responsive communication for quotations, specifications, and shipment updates." },
  { icon: Truck, title: "Sustainable Sourcing", desc: "Responsible supplier networks that support local producers and communities." },
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
            Built for buyers who need certainty, not just supply.
          </h2>
          <p className="mt-4 text-white/70">
            Trust, quality, integrity, and long-term partnership guide every shipment we prepare.
          </p>
        </div>

        <div className="mt-14 grid gap-px overflow-hidden rounded-3xl bg-white/10 sm:grid-cols-2 lg:grid-cols-4">
          {WHY.map((w) => (
            <div key={w.title} className="lift-panel hover:lift-panel-hover group relative bg-navy-deep p-6 hover:bg-navy-soft">
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
              className="lift-panel hover:lift-panel-hover group relative flex items-center gap-4 overflow-hidden rounded-2xl border border-border bg-card p-5 shadow-soft hover:border-navy-soft"
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
              <FileText className="ml-auto h-5 w-5 shrink-0 text-muted-foreground transition group-hover:text-navy-soft" />
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

        <div className="lift-panel hover:lift-panel-hover mt-12 grid gap-6 overflow-hidden rounded-3xl bg-card shadow-elevated lg:grid-cols-[1fr_1.1fr]">
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
                          : "border-border text-navy-deep hover:border-navy-soft"
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
                        : "border-border hover:border-navy-soft"
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
          <div className="lift-panel hover:lift-panel-hover relative aspect-[16/10] overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-navy-soft to-navy-deep p-6">
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
              className={`lift-panel hover:lift-panel-hover group relative overflow-hidden rounded-2xl shadow-soft ${
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
              className="lift-panel hover:lift-panel-hover flex h-full flex-col rounded-3xl border border-border bg-card p-6 shadow-soft"
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
              className="lift-panel hover:lift-panel-hover group overflow-hidden rounded-3xl border border-border bg-card shadow-soft"
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
          className="lift-panel hover:lift-panel-hover rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur sm:p-8"
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
                  options={RFQ_PRODUCT_OPTIONS}
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
              PT Artha Global Prima is a trusted Indonesian export company for coconut products,
              palm sugar, biomass, and selected Indonesian spices.
            </p>
          </div>
          <FooterCol
            title="Products"
            items={PRODUCTS.map((p) => p.name)}
          />
          <FooterCol
            title="Company"
            items={["About", "Vision & Mission", "Certifications", "Gallery", "Insights", "Contact"]}
          />
          <FooterCol
            title="Connect"
            items={["WhatsApp", "Email", "LinkedIn", "Google Maps", "RFQ Form"]}
          />
        </div>
        <div className="flex flex-col items-start justify-between gap-3 pt-6 text-xs text-white/50 sm:flex-row sm:items-center">
          <div>© {new Date().getFullYear()} PT Artha Global Prima. All rights reserved.</div>
          <div>Delivering Indonesia&apos;s Finest Natural Products to the World.</div>
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
            <a href="#" className="text-white/65 transition hover:text-white">
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
  const [lang, setLang] = useState<Lang>("en");
  return (
    <main className="bg-background" dir={lang === "ar" ? "rtl" : "ltr"} lang={lang}>
      <Hero lang={lang} setLang={setLang} />
      <AboutSection lang={lang} />
      <ProductsSection lang={lang} />
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
