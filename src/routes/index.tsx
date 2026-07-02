import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useRef, useState, type CSSProperties } from "react";
import { createPortal } from "react-dom";
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
  Quote,
  Send,
  Ship,
  ShieldCheck,
  Sparkles,
  Truck,
  X,
} from "lucide-react";

import heroPort from "@/assets/hero-port.jpg";
import imgCocoPeat from "@/assets/product-coco-peat.jpeg";
import imgCocoFiber from "@/assets/product-coco-fiber.jpeg";
import imgCocoBristle from "@/assets/product-coco-bristle.jpeg";
import imgWoodPellet from "@/assets/product-wood-pellets.jpeg";
import imgCinnamon from "@/assets/cinnamon.jpg";
import imgCharcoal from "@/assets/product-charcoal.jpeg";
import imgCharcoalBriquette from "@/assets/product-bricket.jpeg";
import imgCoconutStickBroom from "@/assets/product-coconut-stick-broom.jpeg";
import imgHardwoodCharcoal from "@/assets/product-hardwood-charcoal.jpeg";
import imgGinger from "@/assets/product-ginger.jpeg";
import imgTurmeric from "@/assets/product-turmeric.jpeg";
import imgLemongrass from "@/assets/product-lemongrass.jpeg";
import arthaPrimaLogo from "@/assets/artha-global-prima-wide-transparent.png";
import trustDocumentation from "@/assets/trust-documentation.png";
import trustPackaging from "@/assets/trust-packaging.png";
import trustPartnership from "@/assets/trust-partnership.png";
import trustPremiumQuality from "@/assets/trust-premium-quality.png";
import visionMissionBg from "@/assets/vision-mission-export-bg.png";
import operationWarehouse from "@/assets/operation-warehouse.png";
import operationProductionFloor from "@/assets/operation-production-floor.png";
import operationQcInspection from "@/assets/operation-qc-inspection.png";
import operationContainerLoading from "@/assets/operation-container-loading.png";
import operationPortOperations from "@/assets/operation-port-operations.png";
import operationExportTeam from "@/assets/operation-export-team.png";
import globalFootprintMap from "@/assets/global-footprint-map.png";

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
          ? "h-[46px] w-[146px] sm:h-[58px] sm:w-[178px] lg:h-[64px] lg:w-[198px]"
          : "h-14 w-[180px] rounded-2xl bg-white/95 px-3 py-2 shadow-soft ring-1 ring-white/20 sm:h-16 sm:w-[206px]"
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
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "center" | "left";
}) {
  return (
    <div
      className={`max-w-2xl ${align === "center" ? "mx-auto text-center" : "text-left"}`}
    >
      {eyebrow && (
        <div
          className={`inline-flex items-center gap-2 rounded-full border border-[var(--brand-green)]/40 bg-[var(--brand-green)]/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--brand-green-dark)]`}
        >
          <span className="h-1.5 w-1.5 rounded-full bg-[var(--brand-green)]" />
          {eyebrow}
        </div>
      )}
      <h2 className={`${eyebrow ? "mt-4" : ""} text-3xl font-extrabold text-navy-deep text-balance sm:text-4xl md:text-5xl`}>
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

const WHATSAPP_NUMBER = "6281196984949";
const SALES_EMAIL = "sales.arthaglobalprima@gmail.com";

function createWhatsAppUrl(message = "Hello PT Artha Global Prima, I would like to request a quotation.") {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

function WhatsAppIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" aria-hidden="true" className={className} fill="currentColor">
      <path d="M16 3C8.83 3 3 8.83 3 16c0 2.32.61 4.58 1.77 6.57L3.18 28.82l6.4-1.53A12.9 12.9 0 0 0 16 29c7.17 0 13-5.83 13-13S23.17 3 16 3Zm0 23.55c-2 0-3.94-.56-5.62-1.63l-.4-.25-3.64.87.91-3.56-.27-.42A10.39 10.39 0 0 1 5.45 16C5.45 10.18 10.18 5.45 16 5.45S26.55 10.18 26.55 16 21.82 26.55 16 26.55Zm5.81-7.78c-.32-.16-1.88-.93-2.17-1.03-.29-.11-.5-.16-.71.16-.21.32-.82 1.03-1.01 1.24-.18.21-.37.24-.69.08-.32-.16-1.34-.49-2.55-1.57-.94-.84-1.58-1.88-1.77-2.2-.18-.32-.02-.49.14-.65.14-.14.32-.37.48-.55.16-.19.21-.32.32-.53.11-.21.05-.4-.03-.56-.08-.16-.71-1.72-.98-2.35-.26-.62-.52-.54-.71-.55h-.61c-.21 0-.56.08-.85.4-.29.32-1.11 1.08-1.11 2.64 0 1.56 1.14 3.07 1.3 3.28.16.21 2.24 3.41 5.42 4.79.76.33 1.35.52 1.81.67.76.24 1.45.21 2 .13.61-.09 1.88-.77 2.14-1.51.27-.74.27-1.37.19-1.51-.08-.13-.29-.21-.61-.37Z" />
    </svg>
  );
}

function FloatingWhatsAppButton() {
  return (
    <a
      href={createWhatsAppUrl(
        "Hello PT Artha Global Prima, I would like to discuss Indonesian natural products export sourcing.",
      )}
      target="_blank"
      rel="noreferrer"
      aria-label="Chat with PT Artha Global Prima on WhatsApp"
      className="fixed bottom-5 right-5 z-[80] inline-flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_18px_45px_rgba(15,35,55,0.35)] ring-4 ring-white/70 transition hover:-translate-y-1 hover:brightness-105 sm:bottom-7 sm:right-7 sm:h-auto sm:w-auto sm:gap-2 sm:px-5 sm:py-3"
    >
      <WhatsAppIcon className="h-7 w-7" />
      <span className="hidden text-sm font-extrabold sm:inline">WhatsApp</span>
    </a>
  );
}

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
      title: "Welcome to PT Artha Global Prima",
      lead:
        "PT Artha Global Prima is an Indonesian export company for coconut products, biomass, and premium spices, serving importers, distributors, wholesalers, manufacturers, and industrial buyers worldwide.",
      body:
        "We deliver reliable sourcing, strict quality control, professional export documentation, competitive pricing, and on-time shipment so global buyers can access Indonesia's natural products with confidence.",
      welcome: {
        label: "Company Profile",
        title: "Indonesian Export Company for Coconut Products, Biomass, and Premium Spices",
        paragraphs: [
          "PT Artha Global Prima specializes in premium coconut products, biomass, and selected Indonesian spices for international trade. Our company helps global buyers source export-ready natural products from Indonesia with consistent quality and dependable service.",
          "With selected supplier networks, disciplined quality assurance, and export handling aligned with international standards, we support importers, distributors, wholesalers, retailers, and manufacturers across multiple markets.",
          "We believe strong business partnerships are built through trust, product consistency, transparent communication, and long-term commitment.",
        ],
      },
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
      title: "Selamat Datang di PT Artha Global Prima",
      lead:
        "PT Artha Global Prima adalah perusahaan ekspor Indonesia untuk produk kelapa, biomassa, dan rempah premium, melayani importir, distributor, wholesaler, manufaktur, dan kebutuhan industri di pasar global.",
      body:
        "Kami menghadirkan sourcing yang andal, kontrol kualitas yang ketat, dokumentasi ekspor profesional, harga kompetitif, dan pengiriman tepat waktu agar buyer internasional dapat memperoleh produk alami Indonesia dengan lebih percaya diri.",
      welcome: {
        label: "Profil Perusahaan",
        title: "Perusahaan Ekspor Indonesia untuk Produk Kelapa, Biomassa, dan Rempah Premium",
        paragraphs: [
          "PT Artha Global Prima berfokus pada ekspor produk kelapa, biomassa, dan rempah pilihan Indonesia untuk kebutuhan perdagangan internasional. Kami membantu buyer global mendapatkan produk alami Indonesia yang siap ekspor dengan kualitas yang konsisten dan layanan yang profesional.",
          "Didukung jaringan pemasok terpilih, sistem quality control yang disiplin, serta penanganan ekspor yang sesuai standar internasional, kami siap melayani importir, distributor, wholesaler, retailer, dan manufaktur di berbagai negara.",
          "Kami percaya kemitraan bisnis yang kuat dibangun melalui kepercayaan, konsistensi produk, komunikasi yang transparan, dan komitmen jangka panjang.",
        ],
      },
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
      title: "欢迎来到 PT Artha Global Prima",
      lead:
        "PT Artha Global Prima 是一家专注于椰子产品、生物质和优质香料的印度尼西亚出口公司，为全球进口商、分销商、批发商、制造商和工业买家提供服务。",
      body:
        "我们提供可靠采购、严格质量控制、专业出口文件、有竞争力的价格以及准时发运，让全球买家能够更安心地采购印尼天然产品。",
      welcome: {
        label: "公司简介",
        title: "印度尼西亚椰子产品、生物质与优质香料出口公司",
        paragraphs: [
          "PT Artha Global Prima 专注于椰子产品、生物质以及精选印尼香料的国际出口业务。我们帮助全球买家采购来自印度尼西亚、适合出口的天然产品，并提供稳定品质与专业服务。",
          "凭借精选供应网络、严格质量管理以及符合国际标准的出口流程，我们服务于进口商、分销商、批发商、零售商和制造企业。",
          "我们相信，稳固的商业合作建立在信任、产品一致性、透明沟通和长期承诺之上。",
        ],
      },
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
      title: "مرحبا بكم في PT Artha Global Prima",
      lead:
        "PT Artha Global Prima هي شركة تصدير إندونيسية لمنتجات جوز الهند والكتلة الحيوية والتوابل الفاخرة، وتخدم المستوردين والموزعين وتجار الجملة والمصنعين والعملاء الصناعيين حول العالم.",
      body:
        "نقدم حلولا موثوقة للتوريد ورقابة جودة صارمة ووثائق تصدير احترافية وأسعارا تنافسية وشحنا في الوقت المحدد حتى يتمكن المشترون العالميون من الحصول على المنتجات الطبيعية الإندونيسية بثقة أكبر.",
      welcome: {
        label: "الملف التعريفي للشركة",
        title: "شركة تصدير إندونيسية لمنتجات جوز الهند والكتلة الحيوية والتوابل الفاخرة",
        paragraphs: [
          "تركز PT Artha Global Prima على تصدير منتجات جوز الهند والكتلة الحيوية والتوابل الإندونيسية المختارة للأسواق الدولية. نحن نساعد المشترين العالميين على الحصول على منتجات طبيعية إندونيسية جاهزة للتصدير بجودة مستقرة وخدمة احترافية.",
          "وبفضل شبكة الموردين المختارة وإجراءات الجودة المنضبطة والتعامل التصديري المتوافق مع المعايير الدولية، نخدم المستوردين والموزعين وتجار الجملة وتجار التجزئة والمصنعين في أسواق متعددة.",
          "نؤمن أن الشراكات التجارية القوية تبنى على الثقة وثبات جودة المنتج والتواصل الواضح والالتزام طويل الأمد.",
        ],
      },
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
    welcome: { label: string; title: string; paragraphs: string[] };
    quote: string;
    quoteBody: string;
    stats: string[];
  };
  products: { eyebrow: string; title: string; desc: string };
  vision: { eyebrow: string; title: string; desc: string; mission: string; values: string };
}>;

const UI_COPY = {
  en: {
    missions: [
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
    ],
    why: {
      eyebrow: "Why Choose Us",
      title: "Built for buyers who need certainty, not just supply.",
      desc: "Trust, quality, integrity, and long-term partnership guide every shipment we prepare.",
      items: [
        ["Premium Export Quality", "Selected products prepared to meet international buyer expectations."],
        ["Competitive Factory Pricing", "Commercial pricing for importers, wholesalers, distributors, and manufacturers."],
        ["Strict Quality Control", "QC from raw material selection, processing, packaging, to export shipment."],
        ["Reliable Worldwide Shipping", "Coordinated shipment planning from Indonesia to global destination ports."],
        ["Professional Documentation", "Export paperwork prepared carefully for smoother international trade."],
        ["Flexible Packaging & OEM", "Bulk, retail, private label, and custom packaging options by request."],
        ["Fast Customer Support", "Responsive communication for quotations, specifications, and shipment updates."],
        ["Sustainable Sourcing", "Responsible supplier networks that support local producers and communities."],
      ],
    },
    certs: {
      eyebrow: "Certifications",
      title: "Documented, audited, and ready to ship.",
      desc: "Every shipment leaves with the right paperwork. We provide standard export documents and product-specific certificates on request.",
      label: "Official Document",
    },
    calculator: {
      eyebrow: "Container Calculator",
      title: "Plan your shipment in seconds.",
      desc: "Estimate units per container, total weight, and total volume for a 20 ft or 40 ft load.",
      product: "Product",
      container: "Container",
      quantity: "Quantity",
      containersNeeded: "Containers Needed",
      maxUnits: "Max Units / Container",
      totalWeight: "Total Weight",
      totalVolume: "Total Volume",
      maxHint: "Whichever limit hits first",
      volumeHint: "Per unit",
      note: "Estimates are indicative based on typical packing density. Final loading depends on packing format and consolidation. Ask our team for an exact loading plan.",
      cta: "Send these numbers to sales",
    },
    markets: {
      eyebrow: "Global Footprint",
      title: "Shipping to 50+ countries across 4 continents.",
      desc: "From Tanjung Priok and Surabaya, our containers reach buyers worldwide with documented chain of custody and on-time delivery.",
      active: "Active export destinations",
    },
    gallery: {
      eyebrow: "Inside the Operation",
      title: "From farm and warehouse to the deck of the ship.",
      labels: ["Warehouse", "Production Floor", "QC Inspection", "Container Loading", "Port Operations", "Our Team"],
    },
    testimonials: {
      eyebrow: "Testimonials",
      title: "Buyers from 4 continents, repeating orders.",
    },
    blog: {
      eyebrow: "Insights",
      title: "Field notes from Indonesia's export floor.",
      desc: "Buyer-friendly explainers on products, grades, and the procedure of importing from us.",
      read: "Read article",
      posts: [
        ["Product Guide", "How to evaluate coco peat blocks before importing", "A practical primer on EC, moisture, expansion ratio, and loading notes for professional growers."],
        ["Quality Control", "What buyers should ask before ordering briquettes", "Ash content, fixed carbon, burn time, packaging, and documentation checkpoints."],
        ["Logistics", "Export procedure from Indonesia in 7 steps", "Documents, fumigation, COO, and the standard timeline from PO to bill of lading."],
      ],
    },
    rfq: {
      eyebrow: "Request for Quotation",
      title: "Tell us what you need. We'll quote within 24h.",
      desc: "Share product, quantity, destination port, and any special requirements. Our sales team will reply with pricing, lead time, and packaging options.",
      headOffice: "Head Office",
      office: "Office",
      loadingPorts: "Loading ports",
      commitment: {
        eyebrow: "Our Commitment",
        title: "Every shipment carries our reputation.",
        body: "PT Artha Global Prima is committed to delivering reliable quality, professional service, competitive pricing, and on-time delivery to build strong and sustainable business partnerships.",
        growthTitle: "Let's Grow Together",
        growthBody: "We invite importers, distributors, wholesalers, and industrial buyers worldwide to build long-term cooperation with PT Artha Global Prima.",
        closing: "With us, you get more than a supplier - you gain a trusted Indonesian export partner.",
      },
      thanksTitle: "Thank you!",
      thanksDesc: "Your inquiry has been received. A member of our export team will reach out within one business day.",
      fullName: "Full name",
      namePlaceholder: "Your name",
      company: "Company",
      companyPlaceholder: "Company name",
      email: "Email",
      emailPlaceholder: "you@company.com",
      country: "Country",
      countryPlaceholder: "Destination country",
      product: "Product",
      quantity: "Quantity / FCL",
      qtyPlaceholder: "e.g. 2 x 40 HQ",
      message: "Message",
      messagePlaceholder: "Specifications, packing, destination port, timing...",
      submit: "Submit RFQ",
      privacy: "By submitting you agree to be contacted by our sales team about your inquiry.",
    },
    footer: {
      desc: "PT Artha Global Prima is a trusted Indonesian export company for coconut products, palm sugar, biomass, and selected Indonesian spices.",
      products: "Products",
      company: "Company",
      connect: "Connect",
      companyItems: ["About", "Vision & Mission", "Certifications", "Gallery", "Insights", "Contact"],
      copyright: "All rights reserved.",
      tagline: "Delivering Indonesia's Finest Natural Products to the World.",
    },
  },
  id: {
    missions: [
      {
        title: "Menghadirkan Produk Berkualitas Premium",
        desc: "Menyuplai produk kelapa, gula aren, biomassa, dan rempah Indonesia berkualitas tinggi yang konsisten memenuhi standar internasional.",
      },
      {
        title: "Membangun Kemitraan Jangka Panjang",
        desc: "Membangun hubungan yang kuat dengan pelanggan melalui kepercayaan, integritas, transparansi, dan layanan profesional.",
      },
      {
        title: "Menjaga Kualitas yang Konsisten",
        desc: "Menerapkan kontrol kualitas ketat dari pemilihan bahan baku, produksi, pengemasan, hingga pengiriman ekspor.",
      },
      {
        title: "Menyediakan Solusi Ekspor Andal",
        desc: "Menawarkan harga kompetitif, kemasan fleksibel, dokumen ekspor lengkap, dan pengiriman tepat waktu ke berbagai negara.",
      },
      {
        title: "Mendorong Bisnis Berkelanjutan",
        desc: "Mendukung sumber pasok yang bertanggung jawab terhadap lingkungan sekaligus memberdayakan petani, produsen, dan komunitas lokal Indonesia.",
      },
      {
        title: "Mendukung Kesuksesan Pelanggan",
        desc: "Memahami kebutuhan pelanggan dan memberikan solusi yang disesuaikan agar bisnis mereka tumbuh dengan baik.",
      },
    ],
    why: {
      eyebrow: "Mengapa Memilih Kami",
      title: "Dibangun untuk buyer yang membutuhkan kepastian, bukan sekadar suplai.",
      desc: "Kepercayaan, kualitas, integritas, dan kemitraan jangka panjang menjadi dasar setiap pengiriman yang kami siapkan.",
      items: [
        ["Kualitas Ekspor Premium", "Produk terpilih yang disiapkan untuk memenuhi ekspektasi buyer internasional."],
        ["Harga Pabrik Kompetitif", "Harga komersial untuk importir, grosir, distributor, dan manufaktur."],
        ["Kontrol Kualitas Ketat", "QC dari pemilihan bahan baku, proses, pengemasan, hingga pengiriman ekspor."],
        ["Pengiriman Global Andal", "Perencanaan pengiriman dari Indonesia ke pelabuhan tujuan dunia."],
        ["Dokumentasi Profesional", "Dokumen ekspor disiapkan dengan rapi untuk perdagangan internasional yang lebih lancar."],
        ["Kemasan Fleksibel & OEM", "Pilihan kemasan bulk, retail, private label, dan custom sesuai permintaan."],
        ["Respons Cepat", "Komunikasi responsif untuk penawaran, spesifikasi, dan update pengiriman."],
        ["Sumber Pasok Berkelanjutan", "Jaringan pemasok bertanggung jawab yang mendukung produsen dan komunitas lokal."],
      ],
    },
    certs: {
      eyebrow: "Dokumen",
      title: "Terdokumentasi, terverifikasi, dan siap kirim.",
      desc: "Setiap pengiriman dilengkapi dokumen yang tepat. Kami menyediakan dokumen ekspor standar dan sertifikat khusus produk sesuai permintaan.",
      label: "Dokumen Resmi",
    },
    calculator: {
      eyebrow: "Kalkulator Kontainer",
      title: "Rencanakan pengiriman dalam hitungan detik.",
      desc: "Estimasi unit per kontainer, total berat, dan total volume untuk muatan 20 ft atau 40 ft.",
      product: "Produk",
      container: "Kontainer",
      quantity: "Jumlah",
      containersNeeded: "Kontainer Dibutuhkan",
      maxUnits: "Maks. Unit / Kontainer",
      totalWeight: "Total Berat",
      totalVolume: "Total Volume",
      maxHint: "Batas berat atau volume yang tercapai lebih dulu",
      volumeHint: "Per unit",
      note: "Estimasi bersifat indikatif berdasarkan densitas kemasan umum. Loading final bergantung pada format kemasan dan konsolidasi. Hubungi tim kami untuk rencana loading yang tepat.",
      cta: "Kirim angka ini ke sales",
    },
    markets: {
      eyebrow: "Jangkauan Global",
      title: "Pengiriman ke 50+ negara di 4 benua.",
      desc: "Dari Tanjung Priok dan Surabaya, kontainer kami menjangkau buyer global dengan dokumentasi rantai pengiriman dan ketepatan waktu.",
      active: "Tujuan ekspor aktif",
    },
    gallery: {
      eyebrow: "Operasional Kami",
      title: "Dari kebun dan gudang hingga dek kapal.",
      labels: ["Gudang", "Lantai Produksi", "Inspeksi QC", "Loading Kontainer", "Operasi Pelabuhan", "Tim Kami"],
    },
    testimonials: {
      eyebrow: "Testimoni",
      title: "Buyer dari 4 benua, dengan repeat order.",
    },
    blog: {
      eyebrow: "Insight",
      title: "Catatan lapangan dari aktivitas ekspor Indonesia.",
      desc: "Penjelasan ramah buyer tentang produk, grade, dan prosedur impor dari kami.",
      read: "Baca artikel",
      posts: [
        ["Panduan Produk", "Cara mengevaluasi coco peat block sebelum impor", "Panduan praktis tentang EC, kelembapan, rasio ekspansi, dan catatan loading untuk grower profesional."],
        ["Kontrol Kualitas", "Hal yang perlu ditanyakan sebelum memesan briquette", "Ash content, fixed carbon, burn time, kemasan, dan checklist dokumen."],
        ["Logistik", "Prosedur ekspor dari Indonesia dalam 7 langkah", "Dokumen, fumigasi, COO, dan timeline standar dari PO hingga bill of lading."],
      ],
    },
    rfq: {
      eyebrow: "Permintaan Penawaran",
      title: "Ceritakan kebutuhan Anda. Kami kirim penawaran dalam 24 jam.",
      desc: "Bagikan produk, jumlah, pelabuhan tujuan, dan kebutuhan khusus. Tim sales kami akan membalas dengan harga, lead time, dan opsi kemasan.",
      headOffice: "Head Office",
      office: "Kantor",
      loadingPorts: "Pelabuhan loading",
      commitment: {
        eyebrow: "Komitmen Kami",
        title: "Setiap produk yang kami kirim mencerminkan reputasi perusahaan.",
        body: "Oleh karena itu, PT Artha Global Prima berkomitmen untuk menghadirkan kualitas terbaik, pelayanan profesional, harga yang kompetitif, dan pengiriman yang tepat waktu guna membangun kemitraan bisnis yang kuat dan berkelanjutan.",
        growthTitle: "Mari Bertumbuh Bersama",
        growthBody: "Kami mengundang importir, distributor, wholesaler, dan pelaku industri dari seluruh dunia untuk membangun kerja sama jangka panjang bersama PT Artha Global Prima.",
        closing: "Bersama kami, Anda mendapatkan lebih dari sekadar pemasok - Anda mendapatkan mitra ekspor terpercaya dari Indonesia.",
      },
      thanksTitle: "Terima kasih!",
      thanksDesc: "Inquiry Anda sudah kami terima. Tim ekspor kami akan menghubungi Anda dalam satu hari kerja.",
      fullName: "Nama lengkap",
      namePlaceholder: "Nama Anda",
      company: "Perusahaan",
      companyPlaceholder: "Nama perusahaan",
      email: "Email",
      emailPlaceholder: "anda@perusahaan.com",
      country: "Negara",
      countryPlaceholder: "Negara tujuan",
      product: "Produk",
      quantity: "Jumlah / FCL",
      qtyPlaceholder: "contoh: 2 x 40 HQ",
      message: "Pesan",
      messagePlaceholder: "Spesifikasi, kemasan, pelabuhan tujuan, waktu...",
      submit: "Kirim RFQ",
      privacy: "Dengan mengirim form ini, Anda setuju dihubungi oleh tim sales kami terkait inquiry Anda.",
    },
    footer: {
      desc: "PT Artha Global Prima adalah perusahaan ekspor Indonesia terpercaya untuk produk kelapa, gula aren, biomassa, dan rempah pilihan.",
      products: "Produk",
      company: "Perusahaan",
      connect: "Kontak",
      companyItems: ["Tentang", "Visi & Misi", "Dokumen", "Galeri", "Insight", "Kontak"],
      copyright: "Seluruh hak cipta dilindungi.",
      tagline: "Menghadirkan produk alami terbaik Indonesia ke dunia.",
    },
  },
  zh: {
    missions: [
      { title: "提供优质产品", desc: "供应高品质椰子产品、棕榈糖、生物质和印尼香料，稳定符合国际标准。" },
      { title: "建立长期伙伴关系", desc: "通过信任、诚信、透明和专业服务，与客户建立持久合作。" },
      { title: "确保稳定质量", desc: "从原料选择、生产、包装到出口运输，执行严格质量控制。" },
      { title: "提供可靠出口方案", desc: "提供有竞争力的价格、灵活包装、完整出口文件和准时全球交付。" },
      { title: "推动可持续业务", desc: "支持环保负责任采购，同时赋能印尼当地农民、生产商和社区。" },
      { title: "助力客户成功", desc: "理解客户需求并提供定制方案，帮助客户业务成功增长。" },
    ],
    why: {
      eyebrow: "选择我们的理由",
      title: "为需要确定性的买家而建，而不只是供应。",
      desc: "信任、品质、诚信和长期合作指导我们准备每一次出货。",
      items: [
        ["优质出口品质", "精选产品，满足国际买家期望。"],
        ["有竞争力的工厂价格", "面向进口商、批发商、分销商和制造商的商业价格。"],
        ["严格质量控制", "从原料、加工、包装到出口运输全流程 QC。"],
        ["可靠全球运输", "协调从印尼到全球目的港的运输计划。"],
        ["专业出口文件", "认真准备出口文件，促进国际贸易顺畅。"],
        ["灵活包装与 OEM", "可按需提供散装、零售、自有品牌和定制包装。"],
        ["快速客户支持", "对报价、规格和运输更新保持快速响应。"],
        ["可持续采购", "负责任的供应网络支持当地生产商和社区。"],
      ],
    },
    certs: { eyebrow: "文件", title: "文件齐全、可审查、可发货。", desc: "每批货物均配备相应文件。我们可按需提供标准出口文件和产品专属证书。", label: "官方文件" },
    calculator: { eyebrow: "集装箱计算器", title: "几秒内规划您的出货。", desc: "估算 20 尺或 40 尺装载的每箱单位、总重量和总体积。", product: "产品", container: "集装箱", quantity: "数量", containersNeeded: "所需集装箱", maxUnits: "每箱最大单位", totalWeight: "总重量", totalVolume: "总体积", maxHint: "以先达到的限制为准", volumeHint: "每单位", note: "估算基于常见包装密度，仅供参考。最终装载取决于包装形式和拼箱情况。请联系团队获取准确装载方案。", cta: "将这些数据发送给销售" },
    markets: { eyebrow: "全球覆盖", title: "发往 4 大洲 50 多个国家。", desc: "我们的集装箱从丹戎不碌和泗水港出发，凭借完整文件和准时交付服务全球买家。", active: "活跃出口目的地" },
    gallery: { eyebrow: "运营现场", title: "从农场和仓库到船舶甲板。", labels: ["仓库", "生产车间", "质检", "集装箱装载", "港口作业", "我们的团队"] },
    testimonials: { eyebrow: "客户评价", title: "来自 4 大洲的买家持续复购。" },
    blog: { eyebrow: "资讯", title: "来自印尼出口一线的记录。", desc: "面向买家的产品、等级和进口流程说明。", read: "阅读文章", posts: [["产品指南", "进口前如何评估 coco peat block", "关于 EC、湿度、膨胀率和装载要点的实用指南。"], ["质量控制", "订购炭块前买家应询问什么", "灰分、固定碳、燃烧时间、包装和文件检查点。"], ["物流", "印尼出口流程 7 步", "文件、熏蒸、COO，以及从 PO 到提单的标准时间线。"]] },
    rfq: { eyebrow: "获取报价", title: "告诉我们您的需求。我们将在 24 小时内报价。", desc: "请提供产品、数量、目的港和特殊要求。销售团队将回复价格、交期和包装选项。", headOffice: "总部办公室", office: "办公室", loadingPorts: "装货港", commitment: { eyebrow: "我们的承诺", title: "每一次出货都代表公司的信誉。", body: "PT Artha Global Prima 致力于提供稳定品质、专业服务、具有竞争力的价格和准时交付，帮助客户建立强大且可持续的商业合作。", growthTitle: "携手共同成长", growthBody: "我们诚邀全球进口商、经销商、批发商和工业客户与 PT Artha Global Prima 建立长期合作。", closing: "与我们合作，您得到的不只是供应商，而是来自印尼值得信赖的出口伙伴。" }, thanksTitle: "谢谢！", thanksDesc: "您的询盘已收到。我们的出口团队将在一个工作日内联系您。", fullName: "姓名", namePlaceholder: "您的姓名", company: "公司", companyPlaceholder: "公司名称", email: "邮箱", emailPlaceholder: "you@company.com", country: "国家", countryPlaceholder: "目的国家", product: "产品", quantity: "数量 / FCL", qtyPlaceholder: "例如：2 x 40 HQ", message: "留言", messagePlaceholder: "规格、包装、目的港、时间...", submit: "提交询盘", privacy: "提交即表示您同意我们的销售团队就询盘联系您。" },
    footer: { desc: "PT Artha Global Prima 是可信赖的印尼出口公司，供应椰子产品、棕榈糖、生物质和精选印尼香料。", products: "产品", company: "公司", connect: "联系", companyItems: ["关于", "愿景与使命", "文件", "图库", "资讯", "联系"], copyright: "版权所有。", tagline: "将印尼优质天然产品带向世界。" },
  },
  ar: {
    missions: [
      { title: "تقديم منتجات عالية الجودة", desc: "توريد منتجات جوز الهند وسكر النخيل والكتلة الحيوية والتوابل الإندونيسية بجودة تلبي المعايير الدولية باستمرار." },
      { title: "بناء شراكات طويلة الأمد", desc: "إقامة علاقات قوية مع العملاء عبر الثقة والنزاهة والشفافية والخدمة المهنية." },
      { title: "ضمان جودة ثابتة", desc: "تطبيق رقابة جودة صارمة من اختيار المواد الخام والإنتاج والتعبئة حتى الشحن التصديري." },
      { title: "توفير حلول تصدير موثوقة", desc: "تقديم أسعار تنافسية وتغليف مرن ووثائق تصدير كاملة وتسليم عالمي في الوقت المحدد." },
      { title: "تعزيز الأعمال المستدامة", desc: "دعم التوريد المسؤول بيئيا مع تمكين المزارعين والمنتجين والمجتمعات المحلية في إندونيسيا." },
      { title: "دعم نجاح العملاء", desc: "فهم احتياجات العملاء وتقديم حلول مخصصة تساعد أعمالهم على النمو بنجاح." },
    ],
    why: {
      eyebrow: "لماذا تختارنا",
      title: "مصممون للمشترين الذين يحتاجون إلى اليقين، لا مجرد التوريد.",
      desc: "الثقة والجودة والنزاهة والشراكة طويلة الأمد تقود كل شحنة نعدها.",
      items: [
        ["جودة تصدير ممتازة", "منتجات مختارة لتلبية توقعات المشترين الدوليين."],
        ["أسعار مصنع تنافسية", "أسعار تجارية للمستوردين وتجار الجملة والموزعين والمصنعين."],
        ["رقابة جودة صارمة", "فحص جودة من المواد الخام والمعالجة والتعبئة حتى الشحن."],
        ["شحن عالمي موثوق", "تنسيق خطط الشحن من إندونيسيا إلى الموانئ العالمية."],
        ["وثائق احترافية", "إعداد أوراق التصدير بعناية لتسهيل التجارة الدولية."],
        ["تغليف مرن و OEM", "خيارات تغليف بالجملة والتجزئة والعلامة الخاصة حسب الطلب."],
        ["دعم سريع للعملاء", "استجابة سريعة لعروض الأسعار والمواصفات وتحديثات الشحن."],
        ["توريد مستدام", "شبكات موردين مسؤولة تدعم المنتجين والمجتمعات المحلية."],
      ],
    },
    certs: { eyebrow: "المستندات", title: "موثق ومراجع وجاهز للشحن.", desc: "تخرج كل شحنة مع الوثائق المناسبة. نوفر مستندات التصدير القياسية وشهادات خاصة بالمنتج عند الطلب.", label: "مستند رسمي" },
    calculator: { eyebrow: "حاسبة الحاويات", title: "خطط شحنتك خلال ثوان.", desc: "قدّر عدد الوحدات لكل حاوية والوزن والحجم الإجمالي لشحنة 20 قدم أو 40 قدم.", product: "المنتج", container: "الحاوية", quantity: "الكمية", containersNeeded: "الحاويات المطلوبة", maxUnits: "أقصى وحدات / حاوية", totalWeight: "الوزن الإجمالي", totalVolume: "الحجم الإجمالي", maxHint: "حسب الحد الذي يتم بلوغه أولا", volumeHint: "لكل وحدة", note: "التقديرات إرشادية بناء على كثافة التعبئة المعتادة. يعتمد التحميل النهائي على شكل التعبئة والتجميع. اطلب من فريقنا خطة تحميل دقيقة.", cta: "إرسال هذه الأرقام إلى المبيعات" },
    markets: { eyebrow: "الحضور العالمي", title: "الشحن إلى أكثر من 50 دولة عبر 4 قارات.", desc: "من تانجونغ بريوك وسورابايا، تصل حاوياتنا إلى المشترين حول العالم مع توثيق واضح وتسليم في الوقت المحدد.", active: "وجهات تصدير نشطة" },
    gallery: { eyebrow: "داخل العمليات", title: "من المزرعة والمستودع إلى سطح السفينة.", labels: ["المستودع", "خط الإنتاج", "فحص الجودة", "تحميل الحاوية", "عمليات الميناء", "فريقنا"] },
    testimonials: { eyebrow: "آراء العملاء", title: "مشترون من 4 قارات يكررون الطلب." },
    blog: { eyebrow: "رؤى", title: "ملاحظات ميدانية من أرض التصدير الإندونيسية.", desc: "شروحات مناسبة للمشترين حول المنتجات والدرجات وإجراءات الاستيراد منا.", read: "اقرأ المقال", posts: [["دليل المنتج", "كيفية تقييم كتل coco peat قبل الاستيراد", "دليل عملي حول EC والرطوبة ونسبة التمدد وملاحظات التحميل."], ["رقابة الجودة", "ما الذي يجب سؤاله قبل طلب briquettes", "نقاط فحص الرماد والكربون الثابت ومدة الاحتراق والتعبئة والوثائق."], ["اللوجستيات", "إجراءات التصدير من إندونيسيا في 7 خطوات", "المستندات والتبخير وشهادة المنشأ والجدول الزمني من أمر الشراء إلى بوليصة الشحن."]] },
    rfq: { eyebrow: "طلب عرض سعر", title: "أخبرنا بما تحتاجه. سنرسل عرضا خلال 24 ساعة.", desc: "شارك المنتج والكمية وميناء الوجهة وأي متطلبات خاصة. سيرد فريق المبيعات بالسعر ومدة التوريد وخيارات التعبئة.", headOffice: "المكتب الرئيسي", office: "المكتب", loadingPorts: "موانئ التحميل", commitment: { eyebrow: "التزامنا", title: "كل شحنة تعكس سمعة شركتنا.", body: "تلتزم PT Artha Global Prima بتقديم جودة موثوقة وخدمة احترافية وأسعار تنافسية وتسليم في الوقت المحدد لبناء شراكات تجارية قوية ومستدامة.", growthTitle: "لننمو معا", growthBody: "ندعو المستوردين والموزعين وتجار الجملة والجهات الصناعية حول العالم لبناء تعاون طويل الأمد مع PT Artha Global Prima.", closing: "معنا تحصلون على أكثر من مورد - تحصلون على شريك تصدير موثوق من إندونيسيا." }, thanksTitle: "شكرا لك!", thanksDesc: "تم استلام طلبك. سيتواصل معك أحد أعضاء فريق التصدير خلال يوم عمل واحد.", fullName: "الاسم الكامل", namePlaceholder: "اسمك", company: "الشركة", companyPlaceholder: "اسم الشركة", email: "البريد الإلكتروني", emailPlaceholder: "you@company.com", country: "الدولة", countryPlaceholder: "دولة الوجهة", product: "المنتج", quantity: "الكمية / FCL", qtyPlaceholder: "مثال: 2 x 40 HQ", message: "الرسالة", messagePlaceholder: "المواصفات، التعبئة، ميناء الوجهة، التوقيت...", submit: "إرسال RFQ", privacy: "بإرسالك النموذج فإنك توافق على تواصل فريق المبيعات معك بخصوص طلبك." },
    footer: { desc: "PT Artha Global Prima شركة تصدير إندونيسية موثوقة لمنتجات جوز الهند وسكر النخيل والكتلة الحيوية والتوابل المختارة.", products: "المنتجات", company: "الشركة", connect: "تواصل", companyItems: ["من نحن", "الرؤية والمهمة", "المستندات", "المعرض", "رؤى", "اتصال"], copyright: "جميع الحقوق محفوظة.", tagline: "نقدم أفضل المنتجات الطبيعية الإندونيسية إلى العالم." },
  },
} as const;

function Header({
  lang,
  setLang,
}: {
  lang: Lang;
  setLang: (lang: Lang) => void;
}) {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const t = COPY[lang];

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mounted, open]);

  const mobileMenu =
    mounted && open
      ? createPortal(
          <div
            className="fixed inset-0 z-[999] bg-navy-deep/45 p-3 backdrop-blur-sm lg:hidden"
            onClick={() => setOpen(false)}
          >
            <div
              className="mx-auto flex h-full max-w-md flex-col overflow-hidden rounded-[1.75rem] border border-white/55 bg-[linear-gradient(145deg,rgba(255,255,255,0.98),rgba(235,244,237,0.96))] shadow-[0_28px_80px_-28px_rgba(8,23,46,0.75)]"
              onClick={(event) => event.stopPropagation()}
            >
              <div className="flex items-center justify-between border-b border-navy-deep/10 px-4 py-3">
                <Logo dark className="h-[50px] w-[160px]" />
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  aria-label="Close menu"
                  className="grid h-11 w-11 place-items-center rounded-full bg-navy-deep text-white shadow-soft"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              <nav className="flex-1 overflow-y-auto px-4 py-4">
                <div className="grid gap-2">
                  {NAV_ITEMS.map((n) => (
                    <a
                      key={n.href}
                      href={n.href}
                      onClick={() => setOpen(false)}
                      className="group flex items-center justify-between rounded-2xl border border-navy-deep/8 bg-white/72 px-4 py-3.5 text-[15px] font-bold text-navy-deep shadow-[0_12px_30px_-26px_rgba(8,23,46,0.85)] transition active:scale-[0.99]"
                    >
                      {t.nav[n.key]}
                      <ArrowRight className="h-4 w-4 opacity-45 transition group-hover:translate-x-0.5 group-hover:opacity-100" />
                    </a>
                  ))}
                </div>
                <div className="mt-5 rounded-3xl border border-navy-deep/10 bg-white/70 p-3">
                  <div className="mb-3 flex items-center gap-2 text-[11px] font-black uppercase tracking-[0.18em] text-navy-deep/60">
                    <Languages className="h-4 w-4" />
                    Language
                  </div>
                  <div className="grid grid-cols-4 gap-2">
                    {LANGUAGES.map((item) => (
                      <button
                        type="button"
                        key={item.code}
                        onClick={() => setLang(item.code)}
                        className={`rounded-full border px-2 py-2 text-sm font-black transition ${
                          lang === item.code
                            ? "border-navy-deep bg-navy-deep text-white shadow-soft"
                            : "border-navy-deep/10 bg-white text-navy-deep"
                        }`}
                      >
                        {item.short}
                      </button>
                    ))}
                  </div>
                </div>
              </nav>
              <div className="border-t border-navy-deep/10 p-4">
                <a
                  href={createWhatsAppUrl()}
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => setOpen(false)}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-navy-deep px-5 py-4 text-sm font-black text-white shadow-elevated"
                >
                  {t.cta} <ArrowRight className="h-4 w-4" />
                </a>
              </div>
            </div>
          </div>,
          document.body,
        )
      : null;

  return (
    <header className="absolute inset-x-0 top-0 z-30 border-b border-white/70 bg-[linear-gradient(135deg,rgba(255,255,255,0.97)_0%,rgba(246,250,246,0.94)_48%,rgba(229,240,231,0.9)_100%)] shadow-[0_12px_34px_-24px_rgba(8,23,46,0.5)] backdrop-blur">
      <div className="mx-auto flex max-w-[1440px] items-center justify-between px-4 py-2 sm:px-8">
        <a href="#top" className="shrink-0 transition-transform duration-300 hover:-translate-y-0.5 lg:hidden">
          <Logo dark />
        </a>
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
        </div>
        <button
          type="button"
          onClick={() => setOpen(true)}
          aria-expanded={open}
          aria-label="Open menu"
          className="grid h-12 w-12 place-items-center rounded-full bg-navy-deep/10 text-navy-deep shadow-[0_12px_28px_-18px_rgba(8,23,46,0.85)] ring-1 ring-navy-deep/14 transition active:scale-95 lg:hidden"
        >
          <Menu className="h-6 w-6" />
        </button>
      </div>
      {mobileMenu}
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
  const heroRef = useRef<HTMLElement | null>(null);
  const heroWasVisibleRef = useRef(false);
  const [heroRevealKey, setHeroRevealKey] = useState(0);
  const slides = [
    { src: imgCocoPeat, alt: "Coco peat" },
    { src: imgCocoFiber, alt: "Coco fiber" },
    { src: imgCocoBristle, alt: "Coco bristle" },
    { src: imgCoconutStickBroom, alt: "Coconut stick broom" },
    { src: imgWoodPellet, alt: "Wood pellets" },
    { src: imgCharcoal, alt: "Coconut charcoal" },
    { src: imgCharcoalBriquette, alt: "Coconut charcoal briquette" },
  ];

  useEffect(() => {
    const node = heroRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !heroWasVisibleRef.current) {
          heroWasVisibleRef.current = true;
          setHeroRevealKey((key) => key + 1);
        } else if (!entry.isIntersecting) {
          heroWasVisibleRef.current = false;
        }
      },
      { threshold: 0.38 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={heroRef} id="top" className="relative isolate overflow-hidden">
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

      <div
        key={`hero-brand-${heroRevealKey}`}
        className="hero-brand-lockup absolute left-[max(1.25rem,calc((100vw-80rem)/2+2rem))] top-[12.6rem] z-20 hidden lg:block"
      >
        <div className="hero-gradient-text font-display bg-[linear-gradient(90deg,#ffffff_0%,#ffffff_80%,#b9f35d_100%)] bg-clip-text text-5xl font-extrabold uppercase leading-none tracking-[-0.055em] text-transparent drop-shadow-[0_5px_16px_rgba(0,0,0,0.62)] xl:text-6xl">
          ARTHA GLOBAL PRIMA
        </div>
        <div className="hero-brand-rule mt-3 h-px w-80 bg-gradient-to-r from-[#d2a53a] via-[#b9f35d]/75 to-transparent" />
      </div>

      <div className="mx-auto grid min-h-[760px] max-w-7xl items-end px-5 pb-12 pt-32 sm:min-h-[min(820px,100svh)] sm:px-8 sm:pb-16 lg:pt-44">
        <div
          key={`hero-copy-${heroRevealKey}`}
          className="max-w-3xl rounded-[1.5rem] bg-black/18 p-5 backdrop-blur-[2px] sm:rounded-[2rem] sm:bg-black/10 sm:p-7 sm:backdrop-blur-[1px] lg:bg-transparent lg:p-0 lg:backdrop-blur-0"
        >
          <p className="hero-text-reveal hero-delay-1 text-xs font-bold uppercase tracking-[0.18em] text-white text-shadow-lg sm:text-sm sm:tracking-[0.25em]">
            {t.hero.kicker}
          </p>
          <h1 className="hero-text-reveal hero-delay-2 hero-gradient-text mt-3 bg-[linear-gradient(90deg,#ffffff_0%,#ffffff_70%,#b9f35d_100%)] bg-clip-text text-4xl font-extrabold leading-[1.02] text-transparent text-balance drop-shadow-[0_5px_18px_rgba(0,0,0,0.72)] sm:text-5xl md:text-6xl lg:text-7xl">
            {t.hero.titleTop}
            <br />
            <span>{t.hero.titleAccent}</span>
          </h1>
          <div className="hero-text-reveal hero-delay-3 mt-6 flex items-center gap-3">
            <span className="hero-tagline-rule h-px w-10 bg-white" />
            <p className="text-xs font-bold uppercase tracking-[0.12em] text-white text-shadow-lg sm:text-sm sm:tracking-[0.22em]">
              {t.hero.tagline}
            </p>
          </div>

          <div className="mt-9 flex flex-wrap gap-3">
            <a
              href={createWhatsAppUrl()}
              target="_blank"
              rel="noreferrer"
              className="group inline-flex w-full items-center justify-center gap-2 rounded-full bg-navy-deep px-6 py-3.5 text-sm font-bold text-white shadow-elevated transition hover:-translate-y-0.5 hover:bg-navy-soft sm:w-auto"
            >
              {t.cta}
              <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
            </a>
            <a
              href="#contact"
              className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-white/30 bg-white/5 px-6 py-3.5 text-sm font-semibold text-white backdrop-blur transition hover:bg-white/10 sm:w-auto"
            >
              <Download className="h-4 w-4" />
              {t.hero.profile}
            </a>
          </div>

          {/* Feature badges */}
          <div className="mt-8 grid w-full grid-cols-2 gap-2.5 sm:mt-10 sm:w-[min(860px,calc(100vw-4rem))] sm:gap-4 md:grid-cols-4">
            {HERO_BADGES.map((b) => (
              <div
                key={b.title}
                className="lift-panel flex min-h-[96px] flex-col items-start gap-2 rounded-2xl border border-white/15 bg-white/10 px-3 py-3 shadow-[0_18px_40px_-30px_rgba(0,0,0,0.85)] ring-1 ring-white/5 backdrop-blur-md hover:lift-panel-hover sm:min-h-[92px] sm:flex-row sm:items-center sm:gap-4 sm:px-4 sm:py-4"
              >
                <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-[var(--brand-green)]/12 text-[var(--brand-green)] ring-1 ring-[var(--brand-green)]/35 sm:h-13 sm:w-13 sm:rounded-2xl">
                  <HeroBadgeIcon type={b.icon} />
                </div>
                <div className="min-w-0 text-shadow-sm">
                  <div className="text-[10px] font-extrabold uppercase tracking-[0.08em] text-white sm:text-[12px]">
                    {b.title}
                  </div>
                  <div className="mt-1 text-[11px] leading-snug text-white/76 sm:text-[13px]">{b.desc}</div>
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
      "Coconut Shell Charcoal",
      "Coconut Charcoal Briquette",
      "Coco Peat",
      "Coco Fiber",
      "Coco Bristle",
      "Coconut Stick Broom",
    ],
  },
  {
    title: "Biomass Products",
    items: ["Hardwood Charcoal", "Wood Pellet"],
  },
  {
    title: "Indonesian Spices",
    items: ["Cinnamon", "Ginger", "Turmeric", "Lemongrass"],
  },
];

const MISSION_ICONS = ["quality", "partnership", "control", "export", "sustainability", "success"] as const;
type MissionIconType = (typeof MISSION_ICONS)[number];

function MissionIcon({ type }: { type: MissionIconType }) {
  const common = "h-6 w-6";
  if (type === "quality") {
    return (
      <svg viewBox="0 0 32 32" className={common} fill="none" aria-hidden="true">
        <path d="M16 4.2 24.2 7.5v6.4c0 5.2-3.3 9.9-8.2 12.8-4.9-2.9-8.2-7.6-8.2-12.8V7.5L16 4.2Z" stroke="currentColor" strokeWidth="2.1" strokeLinejoin="round" />
        <path d="m11.7 15.9 3 3 6-6.5" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }
  if (type === "partnership") {
    return (
      <svg viewBox="0 0 32 32" className={common} fill="none" aria-hidden="true">
        <path d="M11.7 17.3 8.9 20a3 3 0 0 1-4.3 0 3.1 3.1 0 0 1 0-4.4l4.1-4.1a5.2 5.2 0 0 1 6.2-.8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="m20.3 14.7 2.8-2.7a3 3 0 0 1 4.3 0 3.1 3.1 0 0 1 0 4.4l-4.1 4.1a5.2 5.2 0 0 1-6.2.8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="m12.2 20 7.6-8" stroke="currentColor" strokeWidth="2.3" strokeLinecap="round" />
      </svg>
    );
  }
  if (type === "control") {
    return (
      <svg viewBox="0 0 32 32" className={common} fill="none" aria-hidden="true">
        <path d="M8 8.5h16M8 16h16M8 23.5h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" opacity=".45" />
        <path d="M11.5 8.5a2.8 2.8 0 1 0 5.6 0 2.8 2.8 0 0 0-5.6 0ZM17.6 16a2.8 2.8 0 1 0 5.6 0 2.8 2.8 0 0 0-5.6 0ZM8.8 23.5a2.8 2.8 0 1 0 5.6 0 2.8 2.8 0 0 0-5.6 0Z" fill="currentColor" />
      </svg>
    );
  }
  if (type === "export") {
    return (
      <svg viewBox="0 0 32 32" className={common} fill="none" aria-hidden="true">
        <path d="M7 23.8V8.2A2.2 2.2 0 0 1 9.2 6h9.6L25 12.2v11.6a2.2 2.2 0 0 1-2.2 2.2H9.2A2.2 2.2 0 0 1 7 23.8Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
        <path d="M18.5 6v6.5H25M11.5 17h9M11.5 21h6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M23.8 21.5h3.4l-1.8-2.1M27.2 21.5l-1.8 2.1" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }
  if (type === "sustainability") {
    return (
      <svg viewBox="0 0 32 32" className={common} fill="none" aria-hidden="true">
        <path d="M8.2 20.5C8 13.6 13.4 8.1 24.5 7.2 24 18.2 18.2 24.3 11.6 23.8" stroke="currentColor" strokeWidth="2.1" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M21.8 10.3C17 13 12.8 17 9.3 24.8M7.5 17.8c-2.2 1.8-3.1 4.1-2.7 7.1 2.7.3 5-.5 6.8-2.4" stroke="currentColor" strokeWidth="2.1" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 32 32" className={common} fill="none" aria-hidden="true">
      <path d="M8.5 17v-1a7.5 7.5 0 0 1 15 0v1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M8.5 17H7a2.5 2.5 0 0 0-2.5 2.5V22A2.5 2.5 0 0 0 7 24.5h1.5V17ZM23.5 17H25a2.5 2.5 0 0 1 2.5 2.5V22a2.5 2.5 0 0 1-2.5 2.5h-1.5V17Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
      <path d="M23.5 24.5c-.8 2.3-2.8 3.5-6 3.5H16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M13 13.7c1.6-1.4 4.4-1.4 6 0" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" opacity=".7" />
    </svg>
  );
}

const ABOUT_STAT_MEDIA = [
  { img: trustPremiumQuality, alt: "Quality inspection for Indonesian export products" },
  { img: trustDocumentation, alt: "Professional export documentation desk" },
  { img: trustPackaging, alt: "Flexible packaging for export products" },
  { img: trustPartnership, alt: "Long-term global export partnership" },
];

const RFQ_PRODUCT_OPTIONS = PORTFOLIO_GROUPS.flatMap((group) => group.items);

function AboutSection({ lang }: { lang: Lang }) {
  const t = COPY[lang];
  const aboutIntroRef = useRef<HTMLDivElement | null>(null);
  const [aboutIntroEntered, setAboutIntroEntered] = useState(false);
  const welcomeRef = useRef<HTMLDivElement | null>(null);
  const [welcomeEntered, setWelcomeEntered] = useState(false);

  useEffect(() => {
    const node = aboutIntroRef.current;
    if (!node || !("IntersectionObserver" in window)) {
      setAboutIntroEntered(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => setAboutIntroEntered(Boolean(entry?.isIntersecting && entry.intersectionRatio >= 0.14)),
      { threshold: [0, 0.14, 0.3], rootMargin: "-8% 0px -14% 0px" },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const node = welcomeRef.current;
    if (!node || !("IntersectionObserver" in window)) {
      setWelcomeEntered(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => setWelcomeEntered(Boolean(entry?.isIntersecting && entry.intersectionRatio >= 0.18)),
      { threshold: [0, 0.18, 0.34], rootMargin: "-8% 0px -18% 0px" },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="about" className="relative overflow-hidden bg-background py-16 sm:py-28">
      <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-navy-deep/5 to-transparent" />
      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <div className="mx-auto max-w-5xl">
          <div ref={aboutIntroRef} data-entered={aboutIntroEntered} className="text-center">
            <h2 className="about-intro-title mx-auto max-w-4xl bg-[linear-gradient(90deg,var(--navy-950)_0%,var(--navy-950)_74%,var(--brand-green-dark)_100%)] bg-clip-text text-3xl font-extrabold leading-[1.04] text-transparent text-balance sm:text-5xl md:text-6xl">
              {t.about.title}
            </h2>
            <p className="about-intro-copy mx-auto mt-5 max-w-3xl text-base leading-7 text-muted-foreground sm:mt-6 sm:text-lg sm:leading-8">
              {t.about.lead}
            </p>
            <p className="about-intro-copy about-intro-copy-delay mx-auto mt-4 max-w-3xl leading-7 text-muted-foreground">
              {t.about.body}
            </p>
          </div>

          <div
            ref={welcomeRef}
            data-entered={welcomeEntered}
            className="about-welcome-panel mt-10 overflow-hidden rounded-[2rem] border border-border bg-[linear-gradient(135deg,#ffffff_0%,#f7fbff_56%,rgba(185,243,93,0.12)_100%)] p-6 text-start shadow-soft sm:mt-12 sm:p-8 lg:grid lg:grid-cols-[0.8fr_1.2fr] lg:gap-10 lg:p-10"
          >
            <div className="about-welcome-left">
              <h3 className="bg-[linear-gradient(90deg,var(--navy-950)_0%,var(--navy-950)_72%,var(--brand-green-dark)_100%)] bg-clip-text text-2xl font-extrabold leading-tight text-transparent text-balance sm:text-4xl">
                {t.about.welcome.title}
              </h3>
              <div className="mt-5 h-px w-40 bg-gradient-to-r from-[#d2a53a] via-[var(--brand-green)] to-transparent" />
            </div>
            <div className="about-welcome-right mt-6 space-y-4 text-sm leading-7 text-muted-foreground sm:text-base sm:leading-8 lg:mt-0">
              {t.about.welcome.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </div>

          <div className="mt-10 overflow-hidden rounded-[1.5rem] border border-border bg-white shadow-soft sm:mt-12 sm:rounded-[2rem]">
            <div className="group relative">
              <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-12 bg-gradient-to-r from-white to-transparent sm:w-24" />
              <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-12 bg-gradient-to-l from-white to-transparent sm:w-24" />
              <div className="flex w-max animate-trust-carousel gap-3 px-3 py-3 group-hover:[animation-play-state:paused] sm:gap-4 sm:px-4 sm:py-4">
                {[...t.about.stats, ...t.about.stats].map((item, index) => {
                  const media = ABOUT_STAT_MEDIA[index % ABOUT_STAT_MEDIA.length];
                  return (
                    <article
                      key={`${item}-${index}`}
                      className="lift-panel hover:lift-panel-hover relative h-48 w-[260px] overflow-hidden rounded-[1.25rem] bg-navy-deep text-white shadow-[0_20px_50px_-30px_rgba(8,23,46,0.75)] sm:h-56 sm:w-[360px] sm:rounded-[1.5rem]"
                    >
                      <img
                        src={media.img}
                        alt={media.alt}
                        className="absolute inset-0 h-full w-full object-cover"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(31,66,100,0.92)_0%,rgba(31,66,100,0.66)_52%,rgba(31,66,100,0.18)_100%)]" />
                      <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-black/65 to-transparent" />
                      <div className="relative flex h-full flex-col justify-end p-5 sm:p-6">
                        <div className="mb-4 h-px w-16 bg-gradient-to-r from-[var(--brand-green)] to-transparent" />
                        <h3 className="max-w-[14rem] text-lg font-extrabold uppercase leading-tight tracking-[0.08em] text-white text-shadow sm:max-w-[15rem] sm:text-xl">
                          {item}
                        </h3>
                      </div>
                    </article>
                  );
                })}
              </div>
            </div>
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

        <div className="relative left-1/2 mt-14 w-screen -translate-x-1/2 overflow-hidden bg-navy-deep py-16 text-white shadow-[0_36px_90px_-46px_rgba(8,23,46,0.78)] sm:mt-20 sm:py-24">
          <img
            src={visionMissionBg}
            alt="Indonesian natural products prepared for global export"
            className="absolute inset-0 h-full w-full object-cover"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(31,66,100,0.98)_0%,rgba(31,66,100,0.90)_34%,rgba(31,66,100,0.60)_62%,rgba(31,66,100,0.16)_100%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_16%_18%,rgba(185,243,93,0.18),transparent_28%),linear-gradient(180deg,rgba(0,0,0,0.10),rgba(0,0,0,0.48))]" />
          <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-white/18 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-black/34 to-transparent" />
          <div className="relative mx-auto grid max-w-7xl gap-10 px-5 sm:px-8 lg:grid-cols-[0.78fr_1.22fr] lg:items-center">
            <div className="flex flex-col justify-center">
              <div className="max-w-xl">
                <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-[var(--brand-green)] text-navy-deep shadow-[0_18px_40px_-22px_rgba(74,222,128,0.75)]">
                  <Award className="h-7 w-7" />
                </div>
                <div className="mt-8 text-[11px] font-bold uppercase tracking-[0.24em] text-[var(--brand-green)]">
                  {t.vision.eyebrow}
                </div>
                <h3 className="mt-4 max-w-xl bg-[linear-gradient(90deg,#ffffff_0%,#ffffff_78%,#b9f35d_100%)] bg-clip-text text-2xl font-extrabold leading-tight text-transparent text-balance drop-shadow-[0_4px_14px_rgba(0,0,0,0.55)] sm:text-4xl">
                  {t.vision.title}
                </h3>
                <p className="mt-5 max-w-lg text-sm leading-7 text-white/76 sm:mt-6 sm:text-base sm:leading-8">
                  {t.vision.desc}
                </p>
              </div>
              <div className="mt-8 grid max-w-xl grid-cols-1 gap-3 text-xs font-bold uppercase tracking-[0.13em] text-white/80 sm:mt-10 sm:grid-cols-2">
                <div className="rounded-2xl border border-white/12 bg-white/10 p-4 shadow-[0_16px_40px_-30px_rgba(0,0,0,0.85)] backdrop-blur">
                  <span className="block text-[var(--brand-green)]">Global</span>
                  Trusted Export
                </div>
                <div className="rounded-2xl border border-white/12 bg-white/10 p-4 shadow-[0_16px_40px_-30px_rgba(0,0,0,0.85)] backdrop-blur">
                  <span className="block text-[var(--brand-green)]">Sustainable</span>
                  Local Sourcing
                </div>
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between gap-4">
                <div className="text-[11px] font-bold uppercase tracking-[0.24em] text-[var(--brand-green)]">
                  {t.vision.mission}
                </div>
                <div className="h-px flex-1 bg-gradient-to-r from-[var(--brand-green)]/55 to-transparent" />
              </div>
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                {ui.missions.map((mission, index) => (
                  <div
                    key={mission.title}
                    className="lift-panel hover:lift-panel-hover group rounded-2xl border border-white/14 bg-white/10 p-4 shadow-[0_18px_45px_-35px_rgba(0,0,0,0.8)] backdrop-blur-md transition hover:border-[var(--brand-green)]/55 hover:bg-white/15 sm:rounded-3xl sm:p-5"
                  >
                    <div className="flex items-center gap-3">
                      <div className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-[var(--brand-green)] text-navy-deep shadow-[0_14px_34px_-20px_rgba(74,222,128,0.9)]">
                        <MissionIcon type={MISSION_ICONS[index] ?? "quality"} />
                      </div>
                      <h4 className="text-sm font-extrabold leading-tight text-white">{mission.title}</h4>
                    </div>
                    <p className="mt-4 text-[13px] leading-6 text-white/68">{mission.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}

/* ───────────── Products ───────────── */

type Product = {
  id: string;
  category: "coconut" | "biomass" | "spice";
  icon: string;
  name: string;
  img: string;
  tag: string;
  blurb: string;
  details?: { label: string; items: string[] }[];
  spec: { label: string; value: string }[];
};

const PRODUCT_CATEGORIES = [
  { id: "coconut", title: "Coconut Products" },
  { id: "biomass", title: "Biomass Products" },
  { id: "spice", title: "Indonesian Spices" },
] as const;

const PRODUCTS: Product[] = [
  {
    id: "coconut-charcoal",
    category: "coconut",
    icon: "🌴",
    name: "Coconut Shell Charcoal",
    img: imgCharcoal,
    tag: "Activated carbon / energy grade",
    blurb:
      "Premium coconut shell charcoal with high fixed carbon for activated carbon, briquette production, and energy applications.",
    details: [
      { label: "Ideal for", items: ["Activated carbon industry", "Briquette production", "Energy and industrial fuel"] },
    ],
    spec: [
      { label: "Packing", value: "PP woven bag" },
      { label: "Weight", value: "25 kg / bag" },
      { label: "Dimension", value: "75 × 45 × 20 cm" },
      { label: "Volume", value: "0.068 m³ / bag" },
      { label: "20 FT", value: "880 bags (22 ton)" },
      { label: "40 HC", value: "1,040 bags (26 ton)" },
    ],
  },
  {
    id: "charcoal",
    category: "coconut",
    icon: "🌴",
    name: "Coconut Charcoal Briquette",
    img: imgCharcoalBriquette,
    tag: "Shisha / BBQ grade",
    blurb:
      "Premium coconut shell charcoal briquettes for BBQ, shisha, restaurants, hotels, and retail distribution.",
    details: [
      { label: "Suitable for", items: ["BBQ", "Shisha", "Restaurants", "Hotels", "Retail"] },
      { label: "Advantages", items: ["Long burning time", "Low ash", "Odorless", "Eco friendly", "Stable heat"] },
    ],
    spec: [
      { label: "Packing", value: "Master carton" },
      { label: "Weight", value: "10 kg / carton" },
      { label: "Dimension", value: "40 × 30 × 25 cm" },
      { label: "Volume", value: "0.030 m³ / carton" },
      { label: "20 FT", value: "2,200 cartons" },
      { label: "40 HC", value: "2,600 cartons" },
    ],
  },
  {
    id: "coco-peat",
    category: "coconut",
    icon: "🌴",
    name: "Coco Peat",
    img: imgCocoPeat,
    tag: "Horticulture grade",
    blurb:
      "High-quality organic growing media for greenhouse, horticulture, hydroponics, nursery, and modern agriculture.",
    details: [
      { label: "Suitable for", items: ["Greenhouse", "Horticulture", "Hydroponics", "Nursery", "Modern agriculture"] },
      { label: "Available", items: ["5 kg block", "Grow bag", "Loose cocopeat"] },
    ],
    spec: [
      { label: "Packing", value: "PE wrapped block" },
      { label: "Weight", value: "5 kg / block" },
      { label: "Dimension", value: "30 × 30 × 12 cm" },
      { label: "Volume", value: "0.011 m³ / block" },
      { label: "20 FT", value: "4,400 blocks" },
      { label: "40 HC", value: "5,200 blocks" },
    ],
  },
  {
    id: "coco-fiber",
    category: "coconut",
    icon: "🌴",
    name: "Coco Fiber",
    img: imgCocoFiber,
    tag: "Long-strand coir",
    blurb:
      "Premium coconut fiber for mattress industry, geotextile, rope, erosion control, and automotive applications.",
    details: [
      { label: "Used for", items: ["Mattress industry", "Geotextile", "Rope", "Erosion control", "Automotive industry"] },
    ],
    spec: [
      { label: "Packing", value: "Compressed bale" },
      { label: "Weight", value: "100 kg / bale" },
      { label: "Dimension", value: "100 × 80 × 50 cm" },
      { label: "Volume", value: "0.400 m³ / bale" },
      { label: "20 FT", value: "220 bales (22 ton)" },
      { label: "40 HC", value: "260 bales (26 ton)" },
    ],
  },
  {
    id: "coco-bristle",
    category: "coconut",
    icon: "🌴",
    name: "Coco Bristle",
    img: imgCocoBristle,
    tag: "Stiff brush fiber",
    blurb:
      "Selected coconut bristle fiber for brush industry, broom, cleaning equipment, and industrial applications.",
    details: [
      { label: "Used for", items: ["Brush industry", "Broom", "Cleaning equipment", "Industrial applications"] },
    ],
    spec: [
      { label: "Packing", value: "Compressed bale" },
      { label: "Weight", value: "100 kg / bale" },
      { label: "Dimension", value: "100 × 80 × 45 cm" },
      { label: "Volume", value: "0.360 m³ / bale" },
      { label: "20 FT", value: "220 bales" },
      { label: "40 HC", value: "260 bales" },
    ],
  },
  {
    id: "coconut-stick-broom",
    category: "coconut",
    icon: "🌴",
    name: "Coconut Stick Broom",
    img: imgCoconutStickBroom,
    tag: "Natural household goods",
    blurb:
      "Export-quality coconut stick broom that is strong, lightweight, durable, and suitable for household or commercial cleaning.",
    spec: [
      { label: "Packing", value: "Bundle" },
      { label: "Weight", value: "25 pcs / bundle" },
      { label: "Dimension", value: "120 × 35 × 35 cm" },
      { label: "Volume", value: "0.147 m³ / bundle" },
      { label: "20 FT", value: "±220 bundles" },
      { label: "40 HC", value: "±450 bundles" },
    ],
  },
  {
    id: "hardwood-charcoal",
    category: "biomass",
    icon: "🌿",
    name: "Hardwood Charcoal",
    img: imgHardwoodCharcoal,
    tag: "High calorific fuel",
    blurb:
      "Premium hardwood charcoal with high heating value for BBQ, restaurants, industrial fuel, and metallurgical needs.",
    details: [
      { label: "Ideal for", items: ["BBQ", "Restaurant", "Industrial fuel", "Metallurgical industry"] },
      { label: "Advantages", items: ["High heating value", "Long burning time", "Low smoke", "Low moisture"] },
    ],
    spec: [
      { label: "Packing", value: "PP woven bag" },
      { label: "Weight", value: "25 kg / bag" },
      { label: "Dimension", value: "75 × 45 × 20 cm" },
      { label: "Volume", value: "0.068 m³ / bag" },
      { label: "20 FT", value: "880 bags (22 ton)" },
      { label: "40 HC", value: "1,040 bags (26 ton)" },
    ],
  },
  {
    id: "wood-pellet",
    category: "biomass",
    icon: "🌿",
    name: "Wood Pellet",
    img: imgWoodPellet,
    tag: "Biomass fuel",
    blurb:
      "Eco-friendly biomass fuel for biomass power plants, industrial boilers, heating systems, and renewable energy.",
    details: [
      { label: "Used for", items: ["Biomass power plant", "Industrial boiler", "Heating system", "Renewable energy"] },
      { label: "Advantages", items: ["High calorific value", "Low ash", "Low moisture", "Eco friendly"] },
    ],
    spec: [
      { label: "Packing", value: "PP bag" },
      { label: "Weight", value: "25 kg / bag" },
      { label: "Dimension", value: "70 × 45 × 15 cm" },
      { label: "Volume", value: "0.047 m³ / bag" },
      { label: "20 FT", value: "880 bags (22 ton)" },
      { label: "40 HC", value: "1,040 bags (26 ton)" },
    ],
  },
  {
    id: "cinnamon",
    category: "spice",
    icon: "🌿",
    name: "Cinnamon",
    img: imgCinnamon,
    tag: "Korintje / Cassia",
    blurb:
      "Authentic Indonesian cinnamon with distinctive aroma and export quality, available as stick, broken, and powder.",
    details: [
      { label: "Available", items: ["Cinnamon stick", "Broken cinnamon", "Cinnamon powder"] },
    ],
    spec: [
      { label: "Packing", value: "PP bag" },
      { label: "Weight", value: "25 kg / bag" },
      { label: "Dimension", value: "60 × 40 × 20 cm" },
      { label: "Volume", value: "0.048 m³ / bag" },
      { label: "20 FT", value: "880 bags" },
      { label: "40 HC", value: "1,040 bags" },
    ],
  },
  {
    id: "ginger",
    category: "spice",
    icon: "🌿",
    name: "Ginger",
    img: imgGinger,
    tag: "Fresh / dry / powder",
    blurb:
      "Hygienically processed Indonesian ginger for food, beverage, herbal, and industrial applications.",
    details: [
      { label: "Available", items: ["Fresh ginger", "Dry ginger", "Ginger powder"] },
    ],
    spec: [
      { label: "Packing", value: "Plastic crate / PP bag / kraft paper bag" },
      { label: "Weight", value: "20 kg crate or 25 kg bag" },
      { label: "Dimension", value: "60 × 40 × 25 cm / 60 × 40 × 20 cm" },
      { label: "Volume", value: "0.060 m³ crate / 0.048 m³ bag" },
      { label: "20 FT", value: "1,100 crates or 880 bags" },
      { label: "40 HC", value: "1,300 crates or 1,040 bags" },
    ],
  },
  {
    id: "turmeric",
    category: "spice",
    icon: "🌿",
    name: "Turmeric",
    img: imgTurmeric,
    tag: "Fresh / dry / powder",
    blurb:
      "Curcumin-rich Indonesian turmeric suitable for food, herbal, natural colorant, and industrial needs.",
    details: [
      { label: "Available", items: ["Fresh turmeric", "Dry turmeric", "Turmeric powder"] },
    ],
    spec: [
      { label: "Packing", value: "Plastic crate / PP bag" },
      { label: "Weight", value: "20 kg crate or 25 kg bag" },
      { label: "Dimension", value: "60 × 40 × 25 cm / 60 × 40 × 20 cm" },
      { label: "Volume", value: "0.060 m³ crate / 0.048 m³ bag" },
      { label: "20 FT", value: "1,100 crates or 880 bags" },
      { label: "40 HC", value: "1,300 crates or 1,040 bags" },
    ],
  },
  {
    id: "lemongrass",
    category: "spice",
    icon: "🌿",
    name: "Lemongrass",
    img: imgLemongrass,
    tag: "Fresh / dried / powder",
    blurb:
      "Fresh aromatic Indonesian lemongrass widely used for food, beverage, seasoning, and essential oil industries.",
    details: [
      { label: "Available", items: ["Fresh lemongrass", "Dried lemongrass", "Lemongrass powder"] },
    ],
    spec: [
      { label: "Packing", value: "Plastic crate / kraft paper bag" },
      { label: "Weight", value: "20 kg crate or 25 kg bag" },
      { label: "Dimension", value: "60 × 40 × 25 cm / 60 × 40 × 20 cm" },
      { label: "Volume", value: "0.060 m³ crate / 0.048 m³ bag" },
      { label: "20 FT", value: "1,100 crates or 880 bags" },
      { label: "40 HC", value: "1,300 crates or 1,040 bags" },
    ],
  },
];

const PRODUCT_SPEC_LABELS: Record<Lang, Record<string, string>> = {
  en: { Packing: "Packing", Weight: "Weight", Dimension: "Dimension", Volume: "Volume", "20 FT": "20 FT", "40 HC": "40 HC", MOQ: "MOQ", Capacity: "Capacity", "Lead time": "Lead time", Loading: "Loading" },
  id: { Packing: "Kemasan", Weight: "Berat", Dimension: "Dimensi", Volume: "Volume", "20 FT": "20 FT", "40 HC": "40 HC", MOQ: "MOQ", Capacity: "Kapasitas", "Lead time": "Waktu produksi", Loading: "Loading" },
  zh: { Packing: "包装", Weight: "重量", Dimension: "尺寸", Volume: "体积", "20 FT": "20 尺柜", "40 HC": "40 高柜", MOQ: "起订量", Capacity: "产能", "Lead time": "交期", Loading: "装载" },
  ar: { Packing: "التعبئة", Weight: "الوزن", Dimension: "الأبعاد", Volume: "الحجم", "20 FT": "20 قدم", "40 HC": "40 HC", MOQ: "الحد الأدنى", Capacity: "الطاقة", "Lead time": "مدة التجهيز", Loading: "التحميل" },
};

const PRODUCT_TEXT: Partial<Record<Lang, Record<string, { tag: string; blurb: string }>>> = {
  id: {
    "coco-peat": {
      tag: "Grade hortikultura",
      blurb: "Coco peat block rendah EC dengan retensi air tinggi untuk greenhouse, hidroponik, dan nursery growers.",
    },
    "coco-fiber": {
      tag: "Serat coir panjang",
      blurb: "Serat kelapa bersih dan kering matahari untuk matras, tali, geotekstil, dan produk pengendali erosi.",
    },
    "coco-bristle": {
      tag: "Serat sikat kaku",
      blurb: "Serat bristle premium untuk kebutuhan manufaktur brush, sapu, dan brush roller di pasar ekspor.",
    },
    "coconut-stick-broom": {
      tag: "Produk rumah tangga alami",
      blurb: "Sapu lidi kelapa tahan lama dari tulang daun kelapa pilihan untuk kebutuhan rumah tangga, taman, dan komersial.",
    },
    "wood-pellet": {
      tag: "Bahan bakar biomassa",
      blurb: "Wood pellet berkualitas dari sumber berkelanjutan dengan nilai kalori tinggi, abu rendah, dan suplai stabil.",
    },
    cinnamon: {
      tag: "Korintje / Cassia",
      blurb: "Kayu manis Indonesia grade ekspor dalam bentuk stick dan broken dengan dokumen phytosanitary lengkap.",
    },
    "coconut-charcoal": {
      tag: "Arang batok kelapa",
      blurb: "Arang batok kelapa natural untuk kebutuhan industri, filtrasi, dan proses lanjutan dengan kandungan karbon stabil.",
    },
    charcoal: {
      tag: "Grade shisha / BBQ",
      blurb: "Briquette batok kelapa murni dengan durasi bakar panjang, abu rendah, tanpa bahan kimia, dan ukuran custom.",
    },
  },
  zh: {
    "coco-peat": { tag: "园艺级", blurb: "低 EC、高保水 coco peat block，适用于温室、水培和育苗。" },
    "coco-fiber": { tag: "长纤维椰壳丝", blurb: "清洁日晒椰纤维，适用于床垫、绳索、土工布和防蚀产品。" },
    "coco-bristle": { tag: "硬刷纤维", blurb: "优质长 bristle 纤维，适用于刷子、扫帚和刷辊制造。" },
    "coconut-stick-broom": { tag: "天然家居用品", blurb: "精选椰叶筋制成的耐用椰子扫帚，适用于家庭、园艺和商业清洁。" },
    "wood-pellet": { tag: "生物质燃料", blurb: "来自可持续来源的 wood pellets，热值高、灰分低、供应稳定。" },
    cinnamon: { tag: "Korintje / Cassia", blurb: "印尼 Korintje 肉桂棒和碎片，可按等级供应并提供植物检疫文件。" },
    "coconut-charcoal": { tag: "椰壳炭", blurb: "天然椰壳炭，适用于工业、过滤和进一步加工，碳含量稳定。" },
    charcoal: { tag: "水烟 / BBQ 级", blurb: "纯椰壳炭块，燃烧时间长、灰分低、无化学添加，可定制尺寸。" },
  },
  ar: {
    "coco-peat": { tag: "درجة زراعية", blurb: "كتل coco peat منخفضة EC وعالية الاحتفاظ بالماء للبيوت المحمية والزراعة المائية والمشاتل." },
    "coco-fiber": { tag: "ألياف كوير طويلة", blurb: "ألياف جوز هند نظيفة ومجففة بالشمس للمراتب والحبال والمنسوجات الجغرافية ومنتجات مكافحة التعرية." },
    "coco-bristle": { tag: "ألياف فرش صلبة", blurb: "ألياف bristle ممتازة لصناعة الفرش والمكانس وبكرات التنظيف في أسواق التصدير." },
    "coconut-stick-broom": { tag: "منتجات منزلية طبيعية", blurb: "مكنسة عيدان جوز هند متينة من عروق أوراق مختارة للاستخدام المنزلي والحدائق والتنظيف التجاري." },
    "wood-pellet": { tag: "وقود كتلة حيوية", blurb: "حبيبات خشب من مصادر مستدامة بقيمة حرارية عالية ورماد منخفض وإمداد مستقر." },
    cinnamon: { tag: "Korintje / Cassia", blurb: "قرفة إندونيسية sticks و broken بدرجات تصدير مع وثائق صحية نباتية كاملة." },
    "coconut-charcoal": { tag: "فحم قشرة جوز الهند", blurb: "فحم طبيعي من قشرة جوز الهند للاستخدام الصناعي والترشيح والمعالجة اللاحقة بمحتوى كربون مستقر." },
    charcoal: { tag: "درجة شيشة / BBQ", blurb: "قوالب فحم جوز هند نقية بمدة احتراق طويلة ورماد منخفض وبدون مواد كيميائية وبأحجام قابلة للتخصيص." },
  },
};

function getProductText(product: Product, lang: Lang) {
  return PRODUCT_TEXT[lang]?.[product.id] ?? { tag: product.tag, blurb: product.blurb };
}

const PRODUCT_ENTRY_VECTORS = [
  { x: "-34vw", y: "-18vh", rotate: "-10deg" },
  { x: "0vw", y: "-28vh", rotate: "7deg" },
  { x: "34vw", y: "-16vh", rotate: "11deg" },
  { x: "-30vw", y: "20vh", rotate: "8deg" },
  { x: "0vw", y: "30vh", rotate: "-6deg" },
  { x: "30vw", y: "18vh", rotate: "-10deg" },
  { x: "-22vw", y: "34vh", rotate: "-7deg" },
  { x: "22vw", y: "34vh", rotate: "8deg" },
] as const;

function ProductsSection({ lang }: { lang: Lang }) {
  const [active, setActive] = useState<Product | null>(null);
  const [productGridEntered, setProductGridEntered] = useState(false);
  const productSectionRef = useRef<HTMLElement | null>(null);
  const t = COPY[lang];
  const quoteLabel = (name: string) => {
    if (lang === "id") return `Minta Penawaran ${name}`;
    if (lang === "zh") return `获取 ${name} 报价`;
    if (lang === "ar") return `طلب عرض سعر لـ ${name}`;
    return `Request ${name} Quote`;
  };

  useEffect(() => {
    const node = productSectionRef.current;
    if (!node) return;

    if (!("IntersectionObserver" in window)) {
      setProductGridEntered(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        const isReadingProductSection = Boolean(entry?.isIntersecting && entry.intersectionRatio >= 0.14);
        setProductGridEntered(isReadingProductSection);
      },
      { threshold: [0, 0.14, 0.28], rootMargin: "-6% 0px -24% 0px" },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="products" ref={productSectionRef} className="relative bg-secondary py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          title={t.products.title}
          description={t.products.desc}
        />

        <div className={`mt-12 grid gap-10 transition-all duration-500 ${active ? "lg:grid-cols-[0.92fr_1.08fr]" : ""}`}>
          {/* Product grid */}
          <div className={`space-y-9 transition-all duration-500 ${active ? "" : "mx-auto w-full max-w-6xl"}`}>
            {PRODUCT_CATEGORIES.map((category) => {
              const categoryProducts = PRODUCTS.filter((product) => product.category === category.id);
              const categoryStartIndex = PRODUCTS.findIndex((product) => product.category === category.id);
              return (
                <div key={category.id}>
                  <div className="mb-4 flex items-center gap-4">
                    <div className="text-[11px] font-extrabold uppercase tracking-[0.22em] text-[var(--brand-green-dark)]">
                      {category.title}
                    </div>
                    <div className="h-px flex-1 bg-gradient-to-r from-[var(--brand-green)]/45 to-transparent" />
                  </div>
                  <div className={`grid gap-4 ${active ? "sm:grid-cols-2" : "sm:grid-cols-2 lg:grid-cols-6"}`}>
                    {categoryProducts.map((p, index) => {
                      const absoluteIndex = categoryStartIndex + index;
                      const isActive = p.id === active?.id;
                      const productText = getProductText(p, lang);
                      const entryVector = PRODUCT_ENTRY_VECTORS[absoluteIndex % PRODUCT_ENTRY_VECTORS.length];
                      const shouldCenterLastRow =
                        !active && categoryProducts.length % 3 === 2 && index === categoryProducts.length - 2;
                      return (
                        <button
                          key={p.id}
                          onClick={() => setActive(p)}
                          data-entered={productGridEntered}
                          style={{
                            "--fly-x": entryVector.x,
                            "--fly-y": entryVector.y,
                            "--fly-rotate": entryVector.rotate,
                            "--reveal-delay": `${absoluteIndex * 320}ms`,
                          } as CSSProperties}
                          className={`product-card-reveal group relative overflow-hidden rounded-2xl border bg-card text-left shadow-soft ${
                            !active ? "lg:col-span-2" : ""
                          } ${shouldCenterLastRow ? "lg:col-start-2" : ""} ${
                            isActive
                              ? "border-[var(--brand-green)] ring-2 ring-[var(--brand-green)]/40"
                              : "border-border hover:border-navy-soft/35"
                          }`}
                        >
                          <div className="aspect-[16/9] overflow-hidden bg-navy-deep">
                            <img
                              src={p.img}
                              alt={p.name}
                              loading="lazy"
                              width={800}
                              height={450}
                              className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                            />
                          </div>
                          <div className="flex min-h-[96px] flex-col justify-center p-4">
                            <div className="text-[11px] font-semibold uppercase tracking-wider text-[var(--brand-green-dark)]">
                              {productText.tag}
                            </div>
                            <div className="mt-1 text-base font-bold text-navy-deep">
                              {p.icon} {p.name}
                            </div>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Active product detail */}
          {active && (() => {
            const activeText = getProductText(active, lang);
            return (
            <div className="lift-panel hover:lift-panel-hover animate-in fade-in slide-in-from-right-5 duration-500 overflow-hidden rounded-3xl bg-navy-deep text-white shadow-elevated">
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
                <button
                  type="button"
                  onClick={() => setActive(null)}
                  aria-label="Close product detail"
                  className="absolute right-4 top-4 grid h-10 w-10 place-items-center rounded-full border border-white/25 bg-white/10 text-white backdrop-blur transition hover:bg-white/20"
                >
                  <X className="h-4 w-4" />
                </button>
                <div className="absolute bottom-4 left-5 right-5">
                  <div className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-white backdrop-blur">
                    {activeText.tag}
                  </div>
                  <h3 className="mt-2 text-2xl font-extrabold sm:text-3xl">
                    {active.icon} {active.name}
                  </h3>
                </div>
              </div>
              <div className="p-6 sm:p-7">
                <p className="text-sm text-white/80">{activeText.blurb}</p>
                {active.details && (
                  <div className="mt-5 grid gap-3 sm:grid-cols-2">
                    {active.details.map((section) => (
                      <div key={section.label} className="rounded-2xl border border-white/10 bg-white/5 p-4">
                        <div className="text-[11px] font-bold uppercase tracking-wider text-[var(--brand-green)]">
                          {section.label}
                        </div>
                        <div className="mt-3 flex flex-wrap gap-2">
                          {section.items.map((item) => (
                            <span
                              key={item}
                              className="rounded-full border border-white/10 bg-white/7 px-3 py-1 text-[12px] font-semibold text-white/80"
                            >
                              {item}
                            </span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
                <dl className="mt-6 divide-y divide-white/10 border-y border-white/10">
                  {active.spec.map((s) => (
                    <div key={s.label} className="flex items-center justify-between gap-4 py-2.5">
                      <dt className="text-[12px] font-semibold uppercase tracking-wider text-white/60">
                        {PRODUCT_SPEC_LABELS[lang][s.label] ?? s.label}
                      </dt>
                      <dd className="text-right text-sm font-medium text-white">{s.value}</dd>
                    </div>
                  ))}
                </dl>
                <a
                  href={createWhatsAppUrl(`Hello PT Artha Global Prima, I would like to request a quotation for ${active.name}.`)}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-6 inline-flex items-center gap-2 rounded-full bg-[var(--brand-green)] px-5 py-2.5 text-sm font-bold text-navy-deep transition hover:brightness-110"
                >
                  {quoteLabel(active.name)} <ArrowRight className="h-4 w-4" />
                </a>
              </div>
            </div>
            );
          })()}
        </div>
      </div>
    </section>
  );
}

/* ───────────── Why us ───────────── */

const WHY_ICONS = [Award, Sparkles, ShieldCheck, Globe2, FileText, Package, MessageCircle, Truck] as const;

function WhyUs({ lang }: { lang: Lang }) {
  const copy = UI_COPY[lang].why;
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
            <span className="h-1.5 w-1.5 rounded-full bg-[var(--brand-green)]" /> {copy.eyebrow}
          </div>
          <h2 className="mt-4 text-3xl font-extrabold text-balance sm:text-4xl md:text-5xl">
            {copy.title}
          </h2>
          <p className="mt-4 text-white/70">
            {copy.desc}
          </p>
        </div>

        <div className="mt-14 grid gap-px overflow-hidden rounded-3xl bg-white/10 sm:grid-cols-2 lg:grid-cols-4">
          {copy.items.map(([title, desc], index) => {
            const Icon = WHY_ICONS[index] ?? Award;
            return (
            <div key={title} className="lift-panel hover:lift-panel-hover group relative bg-navy-deep p-6 hover:bg-navy-soft">
              <div className="grid h-11 w-11 place-items-center rounded-xl bg-[var(--brand-green)]/15 ring-1 ring-[var(--brand-green)]/30">
                <Icon className="h-5 w-5 text-[var(--brand-green)]" strokeWidth={2} />
              </div>
              <h3 className="mt-5 text-base font-bold">{title}</h3>
              <p className="mt-2 text-sm text-white/65">{desc}</p>
            </div>
            );
          })}
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

function Certifications({ lang }: { lang: Lang }) {
  const copy = UI_COPY[lang].certs;
  return (
    <section id="certifications" className="bg-background py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          eyebrow={copy.eyebrow}
          title={copy.title}
          description={copy.desc}
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
                  {copy.label}
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

type CalculatorProduct = {
  id: string;
  category: (typeof PRODUCT_CATEGORIES)[number]["id"];
  name: string;
  packageType: string;
  packageUnit: string;
  packageWeightLabel: string;
  unitWeightKg: number;
  dimension: string;
  volumeM3: number;
  loading20: string;
  loading40: string;
};

const CALCULATOR_PRODUCTS: CalculatorProduct[] = [
  {
    id: "coconut-charcoal",
    category: "coconut",
    name: "Coconut Shell Charcoal",
    packageType: "PP Woven Bag",
    packageUnit: "bags",
    packageWeightLabel: "25 kg",
    unitWeightKg: 25,
    dimension: "75 x 45 x 20 cm",
    volumeM3: 0.068,
    loading20: "880 bags (22 ton)",
    loading40: "1,040 bags (26 ton)",
  },
  {
    id: "charcoal",
    category: "coconut",
    name: "Coconut Charcoal Briquette",
    packageType: "Master Carton",
    packageUnit: "cartons",
    packageWeightLabel: "10 kg",
    unitWeightKg: 10,
    dimension: "40 x 30 x 25 cm",
    volumeM3: 0.03,
    loading20: "2,200 cartons",
    loading40: "2,600 cartons",
  },
  {
    id: "coco-peat",
    category: "coconut",
    name: "Cocopeat Block",
    packageType: "PE Wrapped Block",
    packageUnit: "blocks",
    packageWeightLabel: "5 kg",
    unitWeightKg: 5,
    dimension: "30 x 30 x 12 cm",
    volumeM3: 0.011,
    loading20: "4,400 blocks",
    loading40: "5,200 blocks",
  },
  {
    id: "coco-fiber",
    category: "coconut",
    name: "Coco Fiber",
    packageType: "Compressed Bale",
    packageUnit: "bales",
    packageWeightLabel: "100 kg",
    unitWeightKg: 100,
    dimension: "100 x 80 x 50 cm",
    volumeM3: 0.4,
    loading20: "220 bales (22 ton)",
    loading40: "260 bales (26 ton)",
  },
  {
    id: "coco-bristle",
    category: "coconut",
    name: "Coco Bristle",
    packageType: "Compressed Bale",
    packageUnit: "bales",
    packageWeightLabel: "100 kg",
    unitWeightKg: 100,
    dimension: "100 x 80 x 45 cm",
    volumeM3: 0.36,
    loading20: "220 bales",
    loading40: "260 bales",
  },
  {
    id: "coconut-stick-broom",
    category: "coconut",
    name: "Coconut Stick Broom",
    packageType: "Bundle",
    packageUnit: "bundles",
    packageWeightLabel: "25 pcs",
    unitWeightKg: 25,
    dimension: "120 x 35 x 35 cm",
    volumeM3: 0.147,
    loading20: "±220 bundles",
    loading40: "±450 bundles",
  },
  {
    id: "hardwood-charcoal",
    category: "biomass",
    name: "Hardwood Charcoal",
    packageType: "PP Woven Bag",
    packageUnit: "bags",
    packageWeightLabel: "25 kg",
    unitWeightKg: 25,
    dimension: "75 x 45 x 20 cm",
    volumeM3: 0.068,
    loading20: "880 bags (22 ton)",
    loading40: "1,040 bags (26 ton)",
  },
  {
    id: "wood-pellet",
    category: "biomass",
    name: "Wood Pellet",
    packageType: "PP Bag",
    packageUnit: "bags",
    packageWeightLabel: "25 kg",
    unitWeightKg: 25,
    dimension: "70 x 45 x 15 cm",
    volumeM3: 0.047,
    loading20: "880 bags (22 ton)",
    loading40: "1,040 bags (26 ton)",
  },
  {
    id: "cinnamon",
    category: "spice",
    name: "Cinnamon",
    packageType: "PP Bag",
    packageUnit: "bags",
    packageWeightLabel: "25 kg",
    unitWeightKg: 25,
    dimension: "60 x 40 x 20 cm",
    volumeM3: 0.048,
    loading20: "880 bags",
    loading40: "1,040 bags",
  },
  {
    id: "fresh-ginger",
    category: "spice",
    name: "Fresh Ginger",
    packageType: "Plastic Crate",
    packageUnit: "crates",
    packageWeightLabel: "20 kg",
    unitWeightKg: 20,
    dimension: "60 x 40 x 25 cm",
    volumeM3: 0.06,
    loading20: "1,100 crates",
    loading40: "1,300 crates",
  },
  {
    id: "dry-ginger",
    category: "spice",
    name: "Dry Ginger",
    packageType: "PP Bag",
    packageUnit: "bags",
    packageWeightLabel: "25 kg",
    unitWeightKg: 25,
    dimension: "60 x 40 x 20 cm",
    volumeM3: 0.048,
    loading20: "880 bags",
    loading40: "1,040 bags",
  },
  {
    id: "ginger-powder",
    category: "spice",
    name: "Ginger Powder",
    packageType: "Kraft Paper Bag",
    packageUnit: "bags",
    packageWeightLabel: "25 kg",
    unitWeightKg: 25,
    dimension: "60 x 40 x 20 cm",
    volumeM3: 0.048,
    loading20: "880 bags",
    loading40: "1,040 bags",
  },
  {
    id: "fresh-turmeric",
    category: "spice",
    name: "Fresh Turmeric",
    packageType: "Plastic Crate",
    packageUnit: "crates",
    packageWeightLabel: "20 kg",
    unitWeightKg: 20,
    dimension: "60 x 40 x 25 cm",
    volumeM3: 0.06,
    loading20: "1,100 crates",
    loading40: "1,300 crates",
  },
  {
    id: "dry-turmeric",
    category: "spice",
    name: "Dry Turmeric",
    packageType: "PP Bag",
    packageUnit: "bags",
    packageWeightLabel: "25 kg",
    unitWeightKg: 25,
    dimension: "60 x 40 x 20 cm",
    volumeM3: 0.048,
    loading20: "880 bags",
    loading40: "1,040 bags",
  },
  {
    id: "fresh-lemongrass",
    category: "spice",
    name: "Fresh Lemongrass",
    packageType: "Plastic Crate",
    packageUnit: "crates",
    packageWeightLabel: "20 kg",
    unitWeightKg: 20,
    dimension: "60 x 40 x 25 cm",
    volumeM3: 0.06,
    loading20: "1,100 crates",
    loading40: "1,300 crates",
  },
  {
    id: "lemongrass-powder",
    category: "spice",
    name: "Lemongrass Powder",
    packageType: "Kraft Paper Bag",
    packageUnit: "bags",
    packageWeightLabel: "25 kg",
    unitWeightKg: 25,
    dimension: "60 x 40 x 20 cm",
    volumeM3: 0.048,
    loading20: "880 bags",
    loading40: "1,040 bags",
  },
];

const CONTAINERS = {
  "20ft": { volume: 33, payload: 22000, label: "20 ft Standard" },
  "40ft": { volume: 67, payload: 26000, label: "40 ft High Cube" },
};

type WeightUnit = "kg" | "ton";

const CALCULATOR_LABELS: Record<Lang, Record<string, string>> = {
  en: {
    targetWeight: "Desired weight",
    unit: "Unit",
    productSpec: "Package specification",
    packageType: "Package type",
    packageWeight: "Weight / package",
    dimension: "Dimension",
    volumePerPackage: "Volume / package",
    referenceLoading: "Reference loading",
    packageCount: "Packages",
    totalWeight: "Total weight",
    totalVolume: "Estimated volume",
    usedCapacity: "Container usage",
    remainingCapacity: "Remaining capacity",
    containersNeeded: "Containers needed",
    inputHint: "Enter the buyer's target shipment weight.",
  },
  id: {
    targetWeight: "Berat yang diinginkan",
    unit: "Satuan",
    productSpec: "Spesifikasi kemasan",
    packageType: "Jenis kemasan",
    packageWeight: "Berat / kemasan",
    dimension: "Dimensi",
    volumePerPackage: "Volume / kemasan",
    referenceLoading: "Referensi muatan",
    packageCount: "Jumlah kemasan",
    totalWeight: "Total berat",
    totalVolume: "Estimasi volume",
    usedCapacity: "Kapasitas terpakai",
    remainingCapacity: "Sisa kapasitas",
    containersNeeded: "Estimasi kontainer",
    inputHint: "Masukkan target berat pengiriman buyer.",
  },
  zh: {
    targetWeight: "目标重量",
    unit: "单位",
    productSpec: "包装规格",
    packageType: "包装类型",
    packageWeight: "每件重量",
    dimension: "尺寸",
    volumePerPackage: "每件体积",
    referenceLoading: "参考装载量",
    packageCount: "包装数量",
    totalWeight: "总重量",
    totalVolume: "预计体积",
    usedCapacity: "集装箱使用率",
    remainingCapacity: "剩余容量",
    containersNeeded: "所需集装箱",
    inputHint: "请输入买方计划装运重量。",
  },
  ar: {
    targetWeight: "الوزن المطلوب",
    unit: "الوحدة",
    productSpec: "مواصفات التعبئة",
    packageType: "نوع التعبئة",
    packageWeight: "الوزن / عبوة",
    dimension: "الأبعاد",
    volumePerPackage: "الحجم / عبوة",
    referenceLoading: "مرجع التحميل",
    packageCount: "عدد العبوات",
    totalWeight: "إجمالي الوزن",
    totalVolume: "الحجم التقديري",
    usedCapacity: "استخدام الحاوية",
    remainingCapacity: "السعة المتبقية",
    containersNeeded: "الحاويات المطلوبة",
    inputHint: "أدخل وزن الشحنة المطلوب للمشتري.",
  },
};

function Calculator({ lang }: { lang: Lang }) {
  const copy = UI_COPY[lang].calculator;
  const labels = CALCULATOR_LABELS[lang];
  const numberFormat = useMemo(() => {
    const locale = lang === "id" ? "id-ID" : lang === "zh" ? "zh-CN" : lang === "ar" ? "ar-EG" : "en-US";
    return new Intl.NumberFormat(locale);
  }, [lang]);
  const [product, setProduct] = useState(CALCULATOR_PRODUCTS[2].id);
  const [container, setContainer] = useState<keyof typeof CONTAINERS>("40ft");
  const [targetWeight, setTargetWeight] = useState(26000);
  const [weightUnit, setWeightUnit] = useState<WeightUnit>("kg");

  const selectedProduct =
    CALCULATOR_PRODUCTS.find((item) => item.id === product) ?? CALCULATOR_PRODUCTS[2];

  const result = useMemo(() => {
    const c = CONTAINERS[container];
    const requestedWeightKg = Math.max(0, weightUnit === "ton" ? targetWeight * 1000 : targetWeight);
    const packageCount = requestedWeightKg > 0 ? Math.ceil(requestedWeightKg / selectedProduct.unitWeightKg) : 0;
    const totalWeight = packageCount * selectedProduct.unitWeightKg;
    const totalVolume = packageCount * selectedProduct.volumeM3;
    const weightUse = c.payload > 0 ? (totalWeight / c.payload) * 100 : 0;
    const volumeUse = c.volume > 0 ? (totalVolume / c.volume) * 100 : 0;
    const limitingUse = Math.max(weightUse, volumeUse);
    const containersNeeded = packageCount > 0 ? Math.max(1, Math.ceil(limitingUse / 100)) : 0;

    return {
      packageCount,
      requestedWeightKg,
      totalWeight,
      totalVolume,
      weightUse,
      volumeUse,
      limitingUse,
      remainingWeight: Math.max(0, c.payload - totalWeight),
      remainingVolume: Math.max(0, c.volume - totalVolume),
      containersNeeded,
      container: c,
      referenceLoading: container === "20ft" ? selectedProduct.loading20 : selectedProduct.loading40,
    };
  }, [container, selectedProduct, targetWeight, weightUnit]);

  const formatKg = (value: number) => `${numberFormat.format(Math.round(value))} kg`;
  const formatWeight = (value: number) =>
    value >= 1000 ? `${(value / 1000).toFixed(2)} MT` : formatKg(value);

  const calculatorWhatsAppMessage = [
    "Hello PT Artha Global Prima, I would like to send this container calculation to your sales team.",
    "",
    `Product: ${selectedProduct.name}`,
    `Package type: ${selectedProduct.packageType}`,
    `Weight per package: ${selectedProduct.packageWeightLabel}`,
    `Dimension: ${selectedProduct.dimension}`,
    `Volume per package: ${selectedProduct.volumeM3.toFixed(3)} m³`,
    `Target weight: ${formatWeight(result.requestedWeightKg)} (${formatKg(result.requestedWeightKg)})`,
    `Container type: ${result.container.label}`,
    `Estimated packages: ${numberFormat.format(result.packageCount)} ${selectedProduct.packageUnit}`,
    `Total calculated weight: ${formatWeight(result.totalWeight)} (${formatKg(result.totalWeight)})`,
    `Estimated used volume: ${result.totalVolume.toFixed(2)} m³`,
    `Container utilization: ${result.limitingUse.toFixed(1)}%`,
    `Remaining capacity: ${formatKg(result.remainingWeight)} / ${result.remainingVolume.toFixed(2)} m³`,
    `Estimated containers needed: ${numberFormat.format(result.containersNeeded)}`,
    `Reference max loading: ${result.referenceLoading}`,
    "",
    "Please help me confirm loading plan, pricing, and lead time.",
  ].join("\n");

  return (
    <section id="calculator" className="bg-secondary py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          eyebrow={copy.eyebrow}
          title={copy.title}
          description={copy.desc}
        />

        <div className="lift-panel hover:lift-panel-hover mt-12 grid gap-6 overflow-hidden rounded-3xl bg-card shadow-elevated lg:grid-cols-[0.92fr_1.08fr]">
          <div className="space-y-6 border-b border-border p-6 sm:p-8 lg:border-b-0 lg:border-r">
            <div>
              <label className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
                {copy.product}
              </label>
              <select
                value={product}
                onChange={(event) => setProduct(event.target.value)}
                className="mt-2 w-full rounded-2xl border border-border bg-white px-4 py-3 text-sm font-bold text-navy-deep outline-none transition focus:border-[var(--brand-green)] focus:ring-4 focus:ring-[var(--brand-green)]/15"
              >
                {PRODUCT_CATEGORIES.map((category) => (
                  <optgroup key={category.id} label={category.title}>
                    {CALCULATOR_PRODUCTS.filter((item) => item.category === category.id).map((item) => (
                      <option key={item.id} value={item.id}>
                        {item.name} - {item.packageType}
                      </option>
                    ))}
                  </optgroup>
                ))}
              </select>
            </div>

            <div>
              <label className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
                {copy.container}
              </label>
              <div className="mt-2 grid grid-cols-2 gap-2">
                {Object.entries(CONTAINERS).map(([id, c]) => (
                  <button
                    key={id}
                    type="button"
                    onClick={() => setContainer(id as keyof typeof CONTAINERS)}
                    className={`rounded-xl border px-4 py-3 text-left transition ${
                      container === id
                        ? "border-[var(--brand-green)] bg-[var(--brand-green)]/10"
                        : "border-border hover:border-navy-soft"
                    }`}
                  >
                    <div className="text-sm font-bold text-navy-deep">{c.label}</div>
                    <div className="text-[11px] text-muted-foreground">
                      {c.volume} m³ · {numberFormat.format(c.payload)} kg
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <div className="flex items-end justify-between gap-3">
                <div>
                  <label className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
                    {labels.targetWeight}
                  </label>
                  <p className="mt-1 text-xs text-muted-foreground">{labels.inputHint}</p>
                </div>
                <div className="flex rounded-full border border-border bg-secondary p-1">
                  {(["kg", "ton"] as WeightUnit[]).map((unit) => (
                    <button
                      key={unit}
                      type="button"
                      onClick={() => setWeightUnit(unit)}
                      className={`rounded-full px-3 py-1 text-xs font-bold transition ${
                        weightUnit === unit
                          ? "bg-navy-deep text-white"
                          : "text-navy-deep hover:bg-white"
                      }`}
                    >
                      {unit}
                    </button>
                  ))}
                </div>
              </div>
              <input
                type="number"
                min={0}
                step={weightUnit === "ton" ? 0.5 : 100}
                value={targetWeight}
                onChange={(event) => setTargetWeight(Number(event.target.value))}
                className="mt-3 w-full rounded-2xl border border-border bg-white px-4 py-3 text-2xl font-extrabold text-navy-deep outline-none transition focus:border-[var(--brand-green)] focus:ring-4 focus:ring-[var(--brand-green)]/15"
              />
            </div>

            <div className="rounded-2xl border border-border bg-secondary/70 p-4">
              <div className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
                {labels.productSpec}
              </div>
              <dl className="mt-3 grid gap-3 text-sm sm:grid-cols-2">
                <div>
                  <dt className="text-muted-foreground">{labels.packageType}</dt>
                  <dd className="font-bold text-navy-deep">{selectedProduct.packageType}</dd>
                </div>
                <div>
                  <dt className="text-muted-foreground">{labels.packageWeight}</dt>
                  <dd className="font-bold text-navy-deep">{selectedProduct.packageWeightLabel}</dd>
                </div>
                <div>
                  <dt className="text-muted-foreground">{labels.dimension}</dt>
                  <dd className="font-bold text-navy-deep">{selectedProduct.dimension}</dd>
                </div>
                <div>
                  <dt className="text-muted-foreground">{labels.volumePerPackage}</dt>
                  <dd className="font-bold text-navy-deep">{selectedProduct.volumeM3.toFixed(3)} m³</dd>
                </div>
              </dl>
            </div>
          </div>

          <div className="bg-navy-deep p-6 text-white sm:p-8">
            <div className="grid gap-4 sm:grid-cols-2">
              <Stat
                label={labels.packageCount}
                value={`${numberFormat.format(result.packageCount)} ${selectedProduct.packageUnit}`}
                hint={selectedProduct.packageType}
              />
              <Stat
                label={labels.containersNeeded}
                value={numberFormat.format(result.containersNeeded)}
                hint={result.container.label}
              />
              <Stat
                label={labels.totalWeight}
                value={formatWeight(result.totalWeight)}
                hint={formatKg(result.totalWeight)}
              />
              <Stat
                label={labels.totalVolume}
                value={`${result.totalVolume.toFixed(2)} m³`}
                hint={`${selectedProduct.volumeM3.toFixed(3)} m³ / ${selectedProduct.packageUnit}`}
              />
              <Stat
                label={labels.usedCapacity}
                value={`${result.limitingUse.toFixed(1)}%`}
                hint={`Weight ${result.weightUse.toFixed(1)}% · Volume ${result.volumeUse.toFixed(1)}%`}
              />
              <Stat
                label={labels.remainingCapacity}
                value={formatKg(result.remainingWeight)}
                hint={`${result.remainingVolume.toFixed(2)} m³`}
              />
            </div>
            <div className="mt-5 rounded-2xl border border-white/10 bg-white/5 p-4">
              <div className="text-[10px] font-bold uppercase tracking-wider text-white/60">
                {labels.referenceLoading}
              </div>
              <div className="mt-1 text-lg font-extrabold">{result.referenceLoading}</div>
              <p className="mt-2 text-xs text-white/55">{copy.note}</p>
            </div>
            <a
              href={createWhatsAppUrl(calculatorWhatsAppMessage)}
              target="_blank"
              rel="noreferrer"
              className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-[var(--brand-green)] px-5 py-3 text-sm font-bold text-navy-deep transition hover:brightness-110 sm:w-auto"
            >
              {copy.cta} <Send className="h-4 w-4" />
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

function Markets({ lang }: { lang: Lang }) {
  const copy = UI_COPY[lang].markets;
  return (
    <section id="markets" className="relative overflow-hidden bg-navy-deep py-20 text-white sm:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:items-center">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-[var(--brand-green)]/40 bg-[var(--brand-green)]/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--brand-green)]">
              <span className="h-1.5 w-1.5 rounded-full bg-[var(--brand-green)]" /> {copy.eyebrow}
            </div>
            <h2 className="mt-4 text-3xl font-extrabold text-balance sm:text-4xl md:text-5xl">
              {copy.title}
            </h2>
            <p className="mt-4 text-white/70">
              {copy.desc}
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
          <div className="lift-panel hover:lift-panel-hover relative aspect-[16/10] overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-navy-soft to-navy-deep">
            <WorldMap />
            <div className="absolute bottom-4 right-4 rounded-full border border-white/15 bg-navy-deep/70 px-3 py-1.5 text-[11px] text-white/80 backdrop-blur">
              <span className="mr-1.5 inline-block h-2 w-2 rounded-full bg-[var(--brand-green)] align-middle" />
              {copy.active}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function WorldMap() {
  const ports = [
    { name: "Indonesia", x: 918, y: 538, home: true },
    { name: "Los Angeles", x: 190, y: 344 },
    { name: "New York", x: 330, y: 315 },
    { name: "Rotterdam", x: 622, y: 270 },
    { name: "Dubai", x: 748, y: 413 },
    { name: "Shanghai", x: 940, y: 355 },
    { name: "Sydney", x: 1012, y: 640 },
    { name: "Cape Town", x: 670, y: 660 },
  ];
  const routes = [
    { id: "route-us-west", d: "M918 538 C760 402 480 332 190 344", delay: "0s" },
    { id: "route-us-east", d: "M918 538 C760 350 520 285 330 315", delay: "0.7s" },
    { id: "route-europe", d: "M918 538 C835 340 700 250 622 270", delay: "1.4s" },
    { id: "route-middle-east", d: "M918 538 C848 498 790 440 748 413", delay: "2.1s" },
    { id: "route-china", d: "M918 538 C930 470 942 410 940 355", delay: "2.8s" },
    { id: "route-australia", d: "M918 538 C960 575 990 615 1012 640", delay: "3.5s" },
    { id: "route-africa", d: "M918 538 C820 635 735 700 670 660", delay: "4.2s" },
  ];

  return (
    <div className="relative h-full w-full">
      <img
        src={globalFootprintMap}
        alt="World map showing PT Artha Global Prima export destinations"
        loading="lazy"
        className="h-full w-full object-cover"
      />
      <svg
        viewBox="0 0 1264 877"
        className="pointer-events-none absolute inset-0 h-full w-full"
        role="img"
        aria-label="Animated export routes from Indonesia to global markets"
      >
        <g className="world-routes">
          {routes.map((route) => (
            <path key={route.id} id={route.id} d={route.d} />
          ))}
        </g>
        <g>
          {routes.map((route) => (
            <circle key={`${route.id}-pulse`} r="7" className="route-pulse">
              <animateMotion dur="6s" begin={route.delay} repeatCount="indefinite">
                <mpath href={`#${route.id}`} />
              </animateMotion>
            </circle>
          ))}
        </g>
        {ports.map((p) => (
          <g key={p.name}>
            <circle cx={p.x} cy={p.y} r={p.home ? 16 : 11} fill="#4ade80" opacity={p.home ? 0.3 : 0.2} />
            <circle cx={p.x} cy={p.y} r={p.home ? 6 : 4.5} fill="#4ade80" />
            {p.home && <circle cx={p.x} cy={p.y} r="25" fill="none" stroke="#4ade80" strokeWidth="2.5" opacity="0.3" />}
          </g>
        ))}
      </svg>
    </div>
  );
}

/* ───────────── Gallery ───────────── */

const GALLERY = [
  { label: "Warehouse", img: operationWarehouse },
  { label: "Production Floor", img: operationProductionFloor },
  { label: "QC Inspection", img: operationQcInspection },
  { label: "Container Loading", img: operationContainerLoading },
  { label: "Port Operations", img: operationPortOperations },
  { label: "Our Team", img: operationExportTeam },
];

function Gallery({ lang }: { lang: Lang }) {
  const copy = UI_COPY[lang].gallery;
  const slides = [...GALLERY, ...GALLERY];
  return (
    <section id="gallery" className="overflow-hidden bg-background py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          eyebrow={copy.eyebrow}
          title={copy.title}
        />
      </div>
      <div className="operation-carousel mt-12 overflow-hidden">
        <div className="operation-track flex w-max gap-4 px-5 sm:px-8">
          {slides.map((g, i) => {
            const originalIndex = i % GALLERY.length;
            const label = copy.labels[originalIndex] ?? g.label;
            return (
              <div
                key={`${g.label}-${i}`}
                className="operation-card lift-panel hover:lift-panel-hover group relative h-[220px] w-[320px] shrink-0 overflow-hidden rounded-[1.35rem] shadow-soft sm:h-[250px] sm:w-[390px] lg:h-[270px] lg:w-[430px]"
                aria-hidden={i >= GALLERY.length ? true : undefined}
              >
                <img
                  src={g.img}
                  alt={label}
                  loading="lazy"
                  className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-deep/88 via-navy-deep/16 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="inline-flex rounded-full border border-white/15 bg-white/10 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-white shadow-[0_16px_40px_-28px_rgba(0,0,0,0.9)]">
                    {label}
                  </div>
                </div>
              </div>
            );
          })}
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

function Testimonials({ lang }: { lang: Lang }) {
  const copy = UI_COPY[lang].testimonials;
  return (
    <section className="bg-secondary py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading eyebrow={copy.eyebrow} title={copy.title} />
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
  { img: imgCocoPeat },
  { img: imgCharcoalBriquette },
  { img: heroPort },
];

type BlogArticle = {
  category: string;
  title: string;
  intro: string;
  sections: { heading: string; body: string }[];
  checklist: string[];
  cta: string;
};

const BLOG_ARTICLES: Record<Lang, BlogArticle[]> = {
  en: [
    {
      category: "Product Guide",
      title: "How to evaluate coco peat blocks before importing",
      intro:
        "A good coco peat shipment is not judged by appearance alone. Serious buyers look at washing, EC, moisture, expansion, particle structure, packing strength, and loading discipline before confirming repeat orders.",
      sections: [
        {
          heading: "Start with application fit",
          body:
            "For greenhouse, nursery, hydroponic, and potting-mix applications, buyers should ask whether the material is washed, buffered when required, and screened to the particle size they need. Low and consistent EC is important because excess soluble salts can disturb sensitive crops.",
        },
        {
          heading: "Ask for measurable loading data",
          body:
            "Before confirming an FCL, request block weight, bale size, moisture range, expansion expectation, and palletizing plan. These details help estimate landed cost and reduce surprises when the container is unpacked.",
        },
        {
          heading: "Use documentation as a trust signal",
          body:
            "Consistent photos, packing lists, QC notes, and loading records show that the supplier controls the shipment rather than simply trading a commodity. This is where PT Artha Global Prima focuses: product selection, packing clarity, and export-ready documentation.",
        },
      ],
      checklist: ["EC and pH target range", "Moisture and expansion ratio", "Block size and net weight", "Packing and palletizing plan", "Loading photos and export documents"],
      cta: "Need a coco peat loading plan? Send your target block size and destination port to our export team.",
    },
    {
      category: "Quality Control",
      title: "What buyers should ask before ordering briquettes",
      intro:
        "Coconut charcoal briquettes are bought for performance. The right pre-order questions help buyers avoid weak burning, excess ash, broken cartons, and inconsistent repeat shipments.",
      sections: [
        {
          heading: "Clarify the use case first",
          body:
            "Shisha, BBQ, restaurant, and retail buyers often need different shapes, burn times, ash behavior, odor profile, and packaging. A supplier should understand the channel before recommending cube, hexagonal, or pillow formats.",
        },
        {
          heading: "Discuss core quality indicators",
          body:
            "Ask about moisture, ash, volatile matter, fixed carbon, hardness, drop-test behavior, and burn-time expectations. These indicators are commonly used to compare charcoal and briquette consistency across lots.",
        },
        {
          heading: "Do not separate quality from packaging",
          body:
            "Even strong briquettes can disappoint if inner plastic, master carton, palletization, and container stuffing are weak. A reliable exporter prepares QC, packaging, and documentation together so buyers receive sellable goods.",
        },
      ],
      checklist: ["Shape and size tolerance", "Ash and fixed-carbon expectations", "Moisture and burn-time target", "Carton strength and private label needs", "Sample approval before FCL"],
      cta: "Share your briquette shape, packing format, and target market so we can recommend the right specification.",
    },
    {
      category: "Logistics",
      title: "Export procedure from Indonesia in 7 steps",
      intro:
        "A professional export shipment is a controlled sequence: quotation, specification confirmation, packing, documentation, customs, loading, and post-shipment document release.",
      sections: [
        {
          heading: "From PO to production readiness",
          body:
            "The process begins with a confirmed product specification, quantity, destination, Incoterms, packaging, and payment terms. Once approved, production and packing are scheduled around the target vessel window.",
        },
        {
          heading: "Documents must match the shipment",
          body:
            "Common export documents include commercial invoice, packing list, bill of lading, certificate of origin when requested, and product-specific certificates such as fumigation or phytosanitary documents where applicable.",
        },
        {
          heading: "The best exporters communicate before problems happen",
          body:
            "Buyers need proactive updates: packing status, container booking, stuffing photos, vessel details, and draft documents for checking. This reduces amendment delays and gives importers confidence before the cargo arrives.",
        },
      ],
      checklist: ["Confirmed specification and PO", "Packing list and invoice", "Container booking and stuffing photos", "Fumigation or product certificate when needed", "Draft B/L check before release"],
      cta: "Tell us your destination port and required documents; we will map the export steps before quotation.",
    },
  ],
  id: [
    {
      category: "Panduan Produk",
      title: "Cara mengevaluasi coco peat block sebelum impor",
      intro:
        "Coco peat yang baik tidak cukup dinilai dari tampilan. Buyer profesional melihat proses washing, EC, kadar air, rasio ekspansi, struktur partikel, kekuatan packing, dan disiplin loading sebelum repeat order.",
      sections: [
        {
          heading: "Mulai dari kebutuhan aplikasi",
          body:
            "Untuk greenhouse, nursery, hidroponik, dan potting mix, buyer perlu memastikan material sudah washed, buffered bila dibutuhkan, dan disaring sesuai ukuran partikel. EC yang rendah dan konsisten penting agar tanaman sensitif tidak terganggu oleh garam terlarut.",
        },
        {
          heading: "Minta data loading yang terukur",
          body:
            "Sebelum konfirmasi FCL, minta berat block, ukuran bale, rentang moisture, estimasi ekspansi, dan rencana palletizing. Detail ini membantu menghitung landed cost dan mengurangi kejutan saat container dibongkar.",
        },
        {
          heading: "Dokumentasi adalah sinyal kepercayaan",
          body:
            "Foto barang, packing list, catatan QC, dan dokumentasi loading menunjukkan supplier benar-benar mengendalikan shipment. Di sinilah PT Artha Global Prima fokus: seleksi produk, kejelasan packing, dan dokumen ekspor yang siap.",
        },
      ],
      checklist: ["Target EC dan pH", "Moisture dan rasio ekspansi", "Ukuran block dan net weight", "Rencana packing dan palletizing", "Foto loading dan dokumen ekspor"],
      cta: "Butuh rencana loading coco peat? Kirim target ukuran block dan port tujuan ke tim ekspor kami.",
    },
    {
      category: "Quality Control",
      title: "Yang perlu ditanyakan buyer sebelum order briquettes",
      intro:
        "Coconut charcoal briquettes dibeli karena performa. Pertanyaan yang tepat sebelum order membantu buyer menghindari burn time lemah, ash berlebih, carton rusak, dan kualitas repeat shipment yang tidak konsisten.",
      sections: [
        {
          heading: "Pastikan penggunaan akhirnya",
          body:
            "Buyer shisha, BBQ, restoran, dan retail sering membutuhkan bentuk, burn time, karakter ash, aroma, dan packing yang berbeda. Supplier yang baik memahami channel penjualan sebelum merekomendasikan cube, hexagonal, atau pillow.",
        },
        {
          heading: "Bahas indikator kualitas utama",
          body:
            "Tanyakan moisture, ash, volatile matter, fixed carbon, hardness, drop-test, dan target burn time. Parameter ini umum dipakai untuk membandingkan konsistensi charcoal dan briquette antar lot.",
        },
        {
          heading: "Kualitas dan packaging harus satu paket",
          body:
            "Briquette yang kuat tetap bisa mengecewakan jika inner plastic, master carton, palletizing, dan stuffing container lemah. Exporter yang rapi menyiapkan QC, packaging, dan dokumentasi sebagai satu alur.",
        },
      ],
      checklist: ["Toleransi bentuk dan ukuran", "Target ash dan fixed carbon", "Moisture dan burn time", "Kekuatan carton dan private label", "Approval sample sebelum FCL"],
      cta: "Kirim bentuk briquette, format packing, dan target market Anda agar kami rekomendasikan spesifikasi yang tepat.",
    },
    {
      category: "Logistik",
      title: "Prosedur ekspor dari Indonesia dalam 7 langkah",
      intro:
        "Shipment ekspor profesional adalah alur yang terkontrol: quotation, konfirmasi spesifikasi, packing, dokumentasi, customs, loading, hingga release dokumen post-shipment.",
      sections: [
        {
          heading: "Dari PO ke kesiapan produksi",
          body:
            "Proses dimulai dari spesifikasi produk, quantity, destination, Incoterms, packaging, dan payment terms yang sudah jelas. Setelah approved, produksi dan packing dijadwalkan mengikuti target vessel.",
        },
        {
          heading: "Dokumen harus sesuai shipment",
          body:
            "Dokumen ekspor umum meliputi commercial invoice, packing list, bill of lading, certificate of origin jika diminta, serta sertifikat khusus seperti fumigation atau phytosanitary bila dibutuhkan.",
        },
        {
          heading: "Exporter terbaik memberi update sebelum ada masalah",
          body:
            "Buyer membutuhkan update proaktif: status packing, booking container, foto stuffing, detail vessel, dan draft dokumen untuk dicek. Ini mengurangi delay amendment dan memberi importer rasa aman sebelum cargo tiba.",
        },
      ],
      checklist: ["Spesifikasi dan PO final", "Packing list dan invoice", "Booking container dan foto stuffing", "Fumigation atau sertifikat produk jika perlu", "Draft B/L dicek sebelum release"],
      cta: "Beri tahu destination port dan dokumen yang diperlukan; kami akan susun alur ekspor sebelum quotation.",
    },
  ],
  zh: [
    {
      category: "产品指南",
      title: "进口前如何评估 coco peat block",
      intro: "优质 coco peat 不能只看外观。专业买家会确认清洗、EC、含水率、膨胀率、粒径结构、包装强度和装柜记录。",
      sections: [
        { heading: "先确认用途", body: "温室、育苗、无土栽培和基质混配对 EC、pH、粒径和是否 buffered 有不同要求。稳定的低 EC 能降低作物风险。" },
        { heading: "索取可量化装柜数据", body: "确认 block 重量、尺寸、含水率范围、膨胀预期和托盘方案，有助于计算到岸成本并减少卸柜风险。" },
        { heading: "用文件判断供应商能力", body: "稳定的照片、packing list、QC 记录和装柜记录说明供应商在管理货物，而不只是转手贸易。" },
      ],
      checklist: ["EC 与 pH 目标", "含水率与膨胀率", "block 尺寸和净重", "包装与托盘方案", "装柜照片和出口文件"],
      cta: "请发送目标 block 尺寸和目的港，我们将协助制定装柜方案。",
    },
    {
      category: "质量控制",
      title: "订购炭块前买家应询问什么",
      intro: "椰壳炭块的核心是燃烧表现。正确的问题能帮助买家避免灰分高、燃烧不稳、纸箱破损和批次不一致。",
      sections: [
        { heading: "先明确使用场景", body: "水烟、烧烤、餐饮和零售渠道需要不同形状、燃烧时间、灰分表现、气味和包装。" },
        { heading: "确认质量指标", body: "建议询问含水率、灰分、挥发物、固定碳、硬度、跌落测试和燃烧时间预期。" },
        { heading: "包装也是质量的一部分", body: "即使炭块质量好，内袋、外箱、托盘和装柜不当也会影响到货销售状态。" },
      ],
      checklist: ["形状和尺寸公差", "灰分与固定碳目标", "含水率与燃烧时间", "纸箱强度和私标要求", "整柜前样品确认"],
      cta: "请提供炭块形状、包装形式和目标市场，我们会建议合适规格。",
    },
    {
      category: "物流",
      title: "印尼出口流程 7 步",
      intro: "专业出口是一套可控流程：报价、规格确认、包装、文件、报关、装柜和出运后文件释放。",
      sections: [
        { heading: "从 PO 到生产准备", body: "确认产品规格、数量、目的港、贸易条款、包装和付款条件后，生产与包装会按船期安排。" },
        { heading: "文件必须与货物一致", body: "常见文件包括商业发票、装箱单、提单、原产地证，以及按产品或目的国要求的熏蒸/植物检疫文件。" },
        { heading: "提前沟通减少风险", body: "包装进度、订舱、装柜照片、船名航次和草稿文件确认，都能帮助买家减少后续改单延迟。" },
      ],
      checklist: ["规格与 PO 确认", "发票和装箱单", "订舱和装柜照片", "必要证书", "提单草稿确认"],
      cta: "告诉我们目的港和所需文件，我们会先说明完整出口流程。",
    },
  ],
  ar: [
    {
      category: "دليل المنتج",
      title: "كيفية تقييم كتل coco peat قبل الاستيراد",
      intro: "لا يكفي تقييم coco peat من الشكل فقط. المشتري المحترف يراجع الغسل، EC، الرطوبة، التمدد، بنية الجزيئات، قوة التعبئة، وسجل التحميل.",
      sections: [
        { heading: "ابدأ من الاستخدام", body: "تختلف احتياجات البيوت المحمية والمشاتل والزراعة المائية من حيث EC و pH وحجم الجزيئات والمعالجة المطلوبة." },
        { heading: "اطلب بيانات تحميل واضحة", body: "وزن الكتلة، الحجم، الرطوبة، نسبة التمدد، وخطة التحميل تساعد في حساب التكلفة وتجنب المفاجآت عند التفريغ." },
        { heading: "الوثائق علامة ثقة", body: "الصور، قائمة التعبئة، ملاحظات QC، وسجل التحميل تظهر أن المورد يدير الشحنة باحترافية." },
      ],
      checklist: ["نطاق EC و pH", "الرطوبة ونسبة التمدد", "حجم ووزن الكتلة", "خطة التعبئة والتحميل", "صور التحميل والوثائق"],
      cta: "أرسل حجم الكتلة وميناء الوصول لنقترح خطة تحميل مناسبة.",
    },
    {
      category: "رقابة الجودة",
      title: "ما الذي يجب سؤاله قبل طلب briquettes",
      intro: "أداء قوالب فحم جوز الهند هو أساس الشراء. الأسئلة الصحيحة تقلل مخاطر الرماد العالي، الكسر، وعدم ثبات الجودة.",
      sections: [
        { heading: "حدد الاستخدام النهائي", body: "الشيشة، الشواء، المطاعم، والبيع بالتجزئة تحتاج أشكالا وزمن احتراق وتعبئة مختلفة." },
        { heading: "ناقش مؤشرات الجودة", body: "اسأل عن الرطوبة، الرماد، المواد المتطايرة، الكربون الثابت، الصلابة، واختبار السقوط وزمن الاحتراق." },
        { heading: "التعبئة جزء من الجودة", body: "حتى المنتج الجيد قد يتضرر إذا كانت الأكياس الداخلية أو الكراتين أو التحميل ضعيفة." },
      ],
      checklist: ["الشكل والحجم", "الرماد والكربون الثابت", "الرطوبة وزمن الاحتراق", "قوة الكرتون والملصق الخاص", "اعتماد العينة قبل الحاوية"],
      cta: "شاركنا شكل القوالب والتعبئة والسوق المستهدف لنقترح المواصفة الأنسب.",
    },
    {
      category: "اللوجستيات",
      title: "إجراءات التصدير من إندونيسيا في 7 خطوات",
      intro: "الشحنة الاحترافية تسير بتسلسل واضح: عرض سعر، تأكيد المواصفة، التعبئة، الوثائق، الجمارك، التحميل، ثم إصدار الوثائق.",
      sections: [
        { heading: "من أمر الشراء إلى الإنتاج", body: "بعد تأكيد المواصفة والكمية والميناء وشروط التجارة والتعبئة والدفع، يتم جدولة الإنتاج والتعبئة حسب موعد السفينة." },
        { heading: "الوثائق يجب أن تطابق الشحنة", body: "تشمل الوثائق الشائعة الفاتورة التجارية، قائمة التعبئة، بوليصة الشحن، شهادة المنشأ، وشهادات التبخير أو الصحة النباتية عند الحاجة." },
        { heading: "التواصل المبكر يقلل المخاطر", body: "تحديثات التعبئة والحجز وصور التحميل ومسودة الوثائق تساعد المستورد على تجنب التأخير." },
      ],
      checklist: ["تأكيد المواصفة و PO", "الفاتورة وقائمة التعبئة", "حجز الحاوية وصور التحميل", "الشهادات المطلوبة", "مراجعة مسودة B/L"],
      cta: "أخبرنا بميناء الوصول والوثائق المطلوبة لنوضح خطوات التصدير قبل عرض السعر.",
    },
  ],
};

const ARTICLE_UI: Record<Lang, { checklist: string; close: string }> = {
  en: { checklist: "Buyer checklist", close: "Close" },
  id: { checklist: "Checklist buyer", close: "Tutup" },
  zh: { checklist: "买家检查清单", close: "关闭" },
  ar: { checklist: "قائمة فحص المشتري", close: "إغلاق" },
};

function Blog({ lang }: { lang: Lang }) {
  const copy = UI_COPY[lang].blog;
  const articles = BLOG_ARTICLES[lang];
  const articleUi = ARTICLE_UI[lang];
  const [selectedPost, setSelectedPost] = useState<number | null>(null);
  const selectedArticle = selectedPost === null ? null : articles[selectedPost];
  return (
    <section id="blog" className="bg-background py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          eyebrow={copy.eyebrow}
          title={copy.title}
          description={copy.desc}
        />
        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {POSTS.map((p, index) => {
            const [tag, title, excerpt] = copy.posts[index] ?? copy.posts[0];
            return (
            <article
              key={title}
              className="lift-panel hover:lift-panel-hover group overflow-hidden rounded-3xl border border-border bg-card shadow-soft"
            >
              <div className="aspect-[16/10] overflow-hidden">
                <img
                  src={p.img}
                  alt={title}
                  loading="lazy"
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                />
              </div>
              <div className="p-6">
                <div className="inline-flex items-center rounded-full bg-[var(--brand-green)]/15 px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider text-[var(--brand-green-dark)]">
                  {tag}
                </div>
                <h3 className="mt-3 text-lg font-bold text-navy-deep">{title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{excerpt}</p>
                <button
                  type="button"
                  onClick={() => setSelectedPost(selectedPost === index ? null : index)}
                  className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-navy transition hover:text-[var(--brand-green-dark)]"
                >
                  {copy.read} <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </article>
            );
          })}
        </div>
        {selectedArticle && (
          <ArticleLanding
            article={selectedArticle}
            labels={articleUi}
            onClose={() => setSelectedPost(null)}
          />
        )}
      </div>
    </section>
  );
}

function ArticleLanding({
  article,
  labels,
  onClose,
}: {
  article: BlogArticle;
  labels: { checklist: string; close: string };
  onClose: () => void;
}) {
  return (
    <article className="mt-10 overflow-hidden rounded-[2rem] border border-border bg-secondary shadow-elevated">
      <div className="grid gap-0 lg:grid-cols-[0.92fr_1.08fr]">
        <div className="hero-gradient p-6 text-white sm:p-8 lg:p-10">
          <div className="inline-flex items-center rounded-full bg-[var(--brand-green)]/15 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.18em] text-[var(--brand-green)]">
            {article.category}
          </div>
          <h3 className="mt-5 text-3xl font-extrabold text-balance sm:text-4xl">
            {article.title}
          </h3>
          <p className="mt-4 text-sm leading-7 text-white/76 sm:text-base">
            {article.intro}
          </p>
          <div className="mt-8 rounded-3xl border border-white/12 bg-white/[0.08] p-5">
            <div className="text-[11px] font-bold uppercase tracking-[0.18em] text-[var(--brand-green)]">
              {labels.checklist}
            </div>
            <ul className="mt-4 grid gap-3 text-sm text-white/82">
              {article.checklist.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[var(--brand-green)]" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="p-6 sm:p-8 lg:p-10">
          <div className="flex justify-end">
            <button
              type="button"
              onClick={onClose}
              className="rounded-full border border-border bg-card px-4 py-2 text-xs font-bold uppercase tracking-wider text-navy transition hover:border-[var(--brand-green)] hover:text-[var(--brand-green-dark)]"
            >
              {labels.close}
            </button>
          </div>
          <div className="mt-3 grid gap-6">
            {article.sections.map((section) => (
              <section key={section.heading}>
                <h4 className="text-lg font-extrabold text-navy-deep">
                  {section.heading}
                </h4>
                <p className="mt-2 text-sm leading-7 text-muted-foreground">
                  {section.body}
                </p>
              </section>
            ))}
          </div>
          <div className="mt-8 rounded-3xl border border-[var(--brand-green)]/25 bg-[var(--brand-green)]/10 p-5 text-sm font-semibold leading-7 text-navy-deep">
            {article.cta}
          </div>
        </div>
      </div>
    </article>
  );
}

/* ───────────── RFQ + Contact / Footer ───────────── */

function RFQ({ lang }: { lang: Lang }) {
  const copy = UI_COPY[lang].rfq;
  const [submitted, setSubmitted] = useState(false);
  const commitmentRef = useRef<HTMLDivElement>(null);
  const [commitmentEntered, setCommitmentEntered] = useState(false);

  useEffect(() => {
    const node = commitmentRef.current;
    if (!node || !("IntersectionObserver" in window)) {
      setCommitmentEntered(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => setCommitmentEntered(Boolean(entry?.isIntersecting && entry.intersectionRatio >= 0.18)),
      { threshold: [0, 0.18, 0.35], rootMargin: "-6% 0px -16% 0px" },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="rfq" className="rfq-section bg-navy-deep py-20 text-white sm:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div
          ref={commitmentRef}
          data-entered={commitmentEntered}
          className="rfq-commitment-panel relative mb-12 overflow-hidden rounded-[2rem] border p-6 shadow-elevated sm:p-8 lg:p-10"
        >
          <div className="pointer-events-none absolute -right-20 -top-24 h-64 w-64 rounded-full bg-[var(--brand-green)]/20 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-24 left-12 h-56 w-56 rounded-full bg-white/10 blur-3xl" />
          <div className="relative grid gap-8 lg:grid-cols-[0.86fr_1.14fr] lg:items-center">
            <div className="rfq-commitment-left">
              <div className="inline-flex items-center gap-2 rounded-full border border-[var(--brand-green)]/40 bg-[var(--brand-green)]/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--brand-green)]">
                <span className="h-1.5 w-1.5 rounded-full bg-[var(--brand-green)]" /> {copy.commitment.eyebrow}
              </div>
              <h2 className="mt-4 text-3xl font-extrabold leading-tight text-balance sm:text-4xl">
                {copy.commitment.title}
              </h2>
              <p className="mt-4 max-w-xl text-sm leading-7 text-white/72 sm:text-base sm:leading-8">
                {copy.commitment.body}
              </p>
            </div>
            <div className="rfq-commitment-right rounded-3xl border border-white/12 bg-white/8 p-5 backdrop-blur sm:p-6">
              <div className="grid h-12 w-12 place-items-center rounded-2xl bg-[var(--brand-green)] text-navy-deep shadow-[0_18px_50px_-20px_rgba(74,222,128,0.8)]">
                <Sparkles className="h-5 w-5" />
              </div>
              <h3 className="mt-5 text-2xl font-extrabold">{copy.commitment.growthTitle}</h3>
              <p className="mt-3 text-sm leading-7 text-white/72 sm:text-base sm:leading-8">
                {copy.commitment.growthBody}
              </p>
              <div className="mt-5 rounded-2xl border border-[var(--brand-green)]/25 bg-[var(--brand-green)]/10 p-4 text-sm font-semibold leading-7 text-white">
                {copy.commitment.closing}
              </div>
            </div>
          </div>
        </div>

        <div className="grid gap-12 lg:grid-cols-[1fr_1.05fr] lg:items-start">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-[var(--brand-green)]/40 bg-[var(--brand-green)]/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--brand-green)]">
            <span className="h-1.5 w-1.5 rounded-full bg-[var(--brand-green)]" /> {copy.eyebrow}
          </div>
          <h2 className="mt-4 text-3xl font-extrabold text-balance sm:text-4xl md:text-5xl">
            {copy.title}
          </h2>
          <p className="mt-4 max-w-lg text-white/70">
            {copy.desc}
          </p>
          <div id="contact" className="mt-10 grid gap-4">
            <ContactLine
              icon={Mail}
              title="Email"
              value={SALES_EMAIL}
              href={`mailto:${SALES_EMAIL}`}
            />
            <ContactLine
              icon={MapPin}
              title={copy.headOffice}
              value={"Gamersi Residence Blok C14\nGondangrejo, Solo\nJawa Tengah - Indonesia"}
            />
            <ContactLine
              icon={Anchor}
              title={copy.loadingPorts}
              value="Tanjung Priok, Tanjung Perak, Belawan"
            />
          </div>
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            const formData = new FormData(e.currentTarget);
            const name = String(formData.get("name") ?? "");
            const company = String(formData.get("company") ?? "");
            const email = String(formData.get("email") ?? "");
            const country = String(formData.get("country") ?? "");
            const product = String(formData.get("product") ?? "");
            const quantity = String(formData.get("qty") ?? "");
            const message = String(formData.get("message") ?? "");
            const whatsappMessage = [
              "Hello PT Artha Global Prima, I would like to request a quotation.",
              "",
              `Name: ${name || "-"}`,
              `Company: ${company || "-"}`,
              `Email: ${email || "-"}`,
              `Destination country: ${country || "-"}`,
              `Product: ${product || "-"}`,
              `Quantity / FCL: ${quantity || "-"}`,
              `Message: ${message || "-"}`,
            ].join("\n");
            setSubmitted(true);
            window.location.href = createWhatsAppUrl(whatsappMessage);
          }}
          className="rfq-panel lift-panel hover:lift-panel-hover rounded-3xl border p-6 sm:p-8"
        >
          {submitted ? (
            <div className="flex h-full min-h-[420px] flex-col items-center justify-center text-center">
              <div className="grid h-14 w-14 place-items-center rounded-full bg-[var(--brand-green)]">
                <CheckCircle2 className="h-7 w-7 text-navy-deep" />
              </div>
              <h3 className="mt-5 text-2xl font-extrabold">{copy.thanksTitle}</h3>
              <p className="mt-2 max-w-sm text-sm text-white/70">
                {copy.thanksDesc}
              </p>
            </div>
          ) : (
            <div className="grid gap-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <Field label={copy.fullName} name="name" placeholder={copy.namePlaceholder} required />
                <Field label={copy.company} name="company" placeholder={copy.companyPlaceholder} />
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <Field label={copy.email} name="email" type="email" placeholder={copy.emailPlaceholder} required />
                <Field label={copy.country} name="country" placeholder={copy.countryPlaceholder} />
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <SelectField
                  label={copy.product}
                  name="product"
                  options={RFQ_PRODUCT_OPTIONS}
                />
                <Field label={copy.quantity} name="qty" placeholder={copy.qtyPlaceholder} />
              </div>
              <TextareaField
                label={copy.message}
                name="message"
                placeholder={copy.messagePlaceholder}
              />
              <button
                type="submit"
                className="mt-2 inline-flex items-center justify-center gap-2 rounded-full bg-[var(--brand-green)] px-6 py-3.5 text-sm font-bold text-navy-deep transition hover:brightness-110"
              >
                {copy.submit} <Send className="h-4 w-4" />
              </button>
              <p className="text-[11px] text-white/50">
                {copy.privacy}
              </p>
            </div>
          )}
        </form>
        </div>
      </div>
    </section>
  );
}

function ContactLine({
  icon: Icon,
  title,
  value,
  href,
}: {
  icon: typeof Mail;
  title: string;
  value: string;
  href?: string;
}) {
  const content = (
    <>
      <div className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-[var(--brand-green)]/15 ring-1 ring-[var(--brand-green)]/30">
        <Icon className="h-5 w-5 text-[var(--brand-green)]" />
      </div>
      <div className="min-w-0">
        <div className="text-[11px] font-bold uppercase tracking-wider text-white/60">{title}</div>
        <div className="whitespace-pre-line text-sm font-semibold leading-6 text-white">{value}</div>
      </div>
    </>
  );

  if (href) {
    return (
      <a
        href={href}
        target={href.startsWith("http") ? "_blank" : undefined}
        rel={href.startsWith("http") ? "noreferrer" : undefined}
        className="rfq-contact-line flex items-start gap-4 rounded-2xl border p-4 transition hover:border-[var(--brand-green)]/40 hover:brightness-110"
      >
        {content}
      </a>
    );
  }

  return (
    <div className="rfq-contact-line flex items-start gap-4 rounded-2xl border p-4">
      {content}
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
        className="rfq-input mt-1.5 w-full rounded-xl border px-4 py-3 text-sm text-white placeholder:text-white/30 focus:border-[var(--brand-green)] focus:outline-none"
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
        className="rfq-input mt-1.5 w-full rounded-xl border px-4 py-3 text-sm text-white placeholder:text-white/30 focus:border-[var(--brand-green)] focus:outline-none"
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
        className="rfq-input mt-1.5 w-full rounded-xl border px-4 py-3 text-sm text-white focus:border-[var(--brand-green)] focus:outline-none"
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

function Footer({ lang }: { lang: Lang }) {
  const copy = UI_COPY[lang].footer;
  return (
    <footer className="bg-navy-deep pb-10 pt-16 text-white/70">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid gap-10 border-b border-white/10 pb-10 lg:grid-cols-[1.3fr_1fr_1fr_1fr]">
          <div>
            <Logo />
            <p className="mt-5 max-w-sm text-sm text-white/60">
              {copy.desc}
            </p>
          </div>
          <FooterCol
            title={copy.products}
            items={PRODUCTS.map((p) => p.name)}
          />
          <FooterCol
            title={copy.company}
            items={[...copy.companyItems]}
          />
          <FooterCol
            title={copy.connect}
            items={["WhatsApp", "Email", "LinkedIn", "Google Maps", "RFQ Form"]}
          />
        </div>
        <div className="flex flex-col items-start justify-between gap-3 pt-6 text-xs text-white/50 sm:flex-row sm:items-center">
          <div>© {new Date().getFullYear()} PT Artha Global Prima. {copy.copyright}</div>
          <div>{copy.tagline}</div>
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
      <WhyUs lang={lang} />
      <Certifications lang={lang} />
      <Calculator lang={lang} />
      <Markets lang={lang} />
      <Gallery lang={lang} />
      <Testimonials lang={lang} />
      <Blog lang={lang} />
      <RFQ lang={lang} />
      <Footer lang={lang} />
      <FloatingWhatsAppButton />
    </main>
  );
}
