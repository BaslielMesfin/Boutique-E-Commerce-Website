import Link from "next/link";
import prisma from "@/lib/prisma";
import ProductCard from "@/components/ui/ProductCard";

/* ── Demo fallback products ────────────────────────────────────── */
const demoProducts = [
  {
    id: "classic-cotton-tee",
    name: "Aselefech Cotton Blouse",
    basePrice: 1200,
    category: "Tops",
    images: ["https://lh3.googleusercontent.com/aida-public/AB6AXuD9Vbj7DWnXquyQNszZB7dwrr-5ikOvkHDcQ4ceHjs82I4W0pi3vzBgnU1B_u_d_NTILYXD9ksjtpyHTsLSsw6s1E0PD1kFIoMk5i8oY_E0VG3cCZEgH0FqX_gI8cZ38E8PCQEwoieaS8qeHFWTxzb3ewvl67n2dRrIwA9chTxr8Ue40sN_8gXQyXhq9JfadQ8aoz1FOl7IkHyrmcrN8d_VO_w5bzAeGFqzhNd5NQCwBpSoC9VWXW7xOY79nCxNXfDc-mwD42Av44mI"],
  },
  {
    id: "tailored-trousers",
    name: "Tailored Wide-Leg Trousers",
    basePrice: 3500,
    category: "Bottoms",
    images: ["https://lh3.googleusercontent.com/aida-public/AB6AXuDWZx8h6mSUA8ZaNkZj-n6I2exFkHfN2Fcb5LkHcQttMghIgk_72e4BKCZ0jp7kpGzmpTykLgiWI-BmDVUiozsLVGG6tyFLkWoC8_xV41oHJ7L9pyYjCt5vI21HArVSV4Yu4dCKX7Dg9C75SYunr9VqFL4jTZNWNwdU4GalqF1p9kZXzPNzFhHlP7GSYv_CvjYIRw7_WdpMjoRmg86Y91WpXCrkH3CxX8h2_JSiZGKs2RVNGXIxXiMSNRBkV5ICPtM8UaQqqnIx41bn"],
  },
  {
    id: "structured-trench",
    name: "Structured Trench Coat",
    basePrice: 8900,
    category: "Outerwear",
    images: ["https://lh3.googleusercontent.com/aida-public/AB6AXuCN7iqEsegLe-Fy0dFJjW2GFaPcyXrq4kBCfjwI4PiVFiE5GjfdDUfbrV-fKSgYIAozQboBsQiOVUz9T_iwqBFUOMTpho4D1KLnW696lG6ThtMxf451e6GEuXD5wp4-uIfjK9aZpFaiRtW8VBYvinMuIXcrZcdZKccQZ2iQ1E0SOTEiu-O7oDp9oxsWS7Mw5mVEJSPT0_1iXHiW3hl5e9fscvDJ_chlMa2zx-3-FGZKayUVpUxSfO2fQ1CZ11XqjhE99Bh7qoNvnN-E"],
  },
  {
    id: "geometric-pendant",
    name: "Gold Pendant Necklace",
    basePrice: 2400,
    category: "Accessories",
    images: ["https://lh3.googleusercontent.com/aida-public/AB6AXuCynCF_GrO9NXjOzVd4M4iqJzVtS8uNk537td1h_qKGWpWQmoDoJTS8QauYD8vFldXsdgZxs1QsyjM6jOdcoLXx4cRHO28cUubm2TL6HnTxSQIYViqad7otgEBssSm06Qp3PHl8T3EaO3ODoBMZpBmdIlfQxoCfM9uTayWRPqwChTLfQUskaEA5i6m9Uv9NFx6_olNaAY_1c4E41g7rZljsq2FXTLRRcxpskUyUgULqqD8q7qC8srFBd_whPjh3CB7ylrzuZCNLQ0tE"],
  },
  {
    id: "ribbed-knit-sweater",
    name: "Cashmere Knit Sweater",
    basePrice: 4200,
    category: "Tops",
    images: ["https://lh3.googleusercontent.com/aida-public/AB6AXuCqSSrLizd5ecfSLn0djHYcrQHaMl3DNEdo7uPCL3XNOI8_3FkAgof1rfF-kKixl8zrnh4fJWKE95N4LH_zHY5a8BydaPDmh59TehBs3pGiVfVmKCYyvDJkLrywVdUVUARcCNdrkEWgjI-kJ7bm1duOnXqfmZM8tRON7xB4GeUO5SOZ16x7b8SlbccIsOayabUkja_CvWZwevZidmfgA52VJnBLq_MoiNBIkAxrSeE3Mvlp06lWaLcoeGsChCQ_sv0aSYAb7T3KimZy"],
  },
  {
    id: "essential-tote",
    name: "Structured Leather Tote",
    basePrice: 6500,
    category: "Accessories",
    images: ["https://lh3.googleusercontent.com/aida-public/AB6AXuDxlh3tu0V13fmueooRgM75MgndHJyBjiO3Eqt8b8AVSIH-ILJH1qjcN_6mH-Ut-eqaEUx9Rpj3dwXZcJp3vlxMCvpnp9_KmNdCM-ACvWgxiWTev08OdjrYbfmGZZu5fsHXiHmkA9mEguVeAQA2W-29-30yLaCAz6JdRiyNb03D4c8711IaSvXCqfxi-XVSxRaPL4DGpkFInrk5CjY1hjrg4u_-JFsoaIgvdjBPG9BIQ0Nr5q1McpnxNqcZQKLAQpjUnqdK1BWXuWAZ"],
  },
  {
    id: "minimalist-sneaker",
    name: "Minimal Leather Sneakers",
    basePrice: 5400,
    category: "Shoes",
    images: ["https://lh3.googleusercontent.com/aida-public/AB6AXuBKGmy0jdacITCG8ojZA4XRxLA8ThYLZ2WlMg-AMV23pDO0MPO68h_W9tQ6KbjA1AjeVe1LQobDwc_vJbwAikx_o-90zP6jbeQyzOMyW5oTpoFSIEVpNZqZNZaGbqDBlh2y2OEs6bMsVtPgoWA3tAQkO4kXZsWcAZ9VuDPWbnQPcxIQm3G7F-GIBohix2hNU0xFF9b2tS8fkqG4pGhLVVhU5-0IZazBCN1pBfNvXXkPSiZVn17K0W5ZFfDQTSlfkyS5OYB77fFVmZ8w"],
  },
  {
    id: "leather-derby",
    name: "Leather Pointed Heels",
    basePrice: 7800,
    category: "Shoes",
    images: ["https://lh3.googleusercontent.com/aida-public/AB6AXuA3PixV5NI_Mu2SUd9d4QNqbRyVkvWmaLV9aG-qfB1ph90gzENeb-CBU6DwUQu6MN6-LNGLpmIAOgefaQz_CbjQPNk6dxcNsWRxPrj4kLuZ7IDL2vPvivPdPmjF8NNx9IUJoObXfcj4oFCofOuWnt795V4dlcWiX_gitJ9GzTnYKsWYGc9FDolJxoruJEKAiXfpD1oCSfOvZfzlT8Gw9h2WDFp9F1bH42t_0FAgn76I5EjE_n4su3q0t8Ug9AgYqpqgDjTtkqhGSU3E"],
  },
];

/* ── Page ──────────────────────────────────────────────────────── */

export default async function HomePage() {
  let products: typeof demoProducts = [];
  try {
    const db = await prisma.product.findMany({
      orderBy: { createdAt: "desc" },
      take: 8,
    });
    if (db.length > 0) products = db;
  } catch { /* ignore */ }

  if (products.length === 0) products = demoProducts;

  const featured = products[0];
  const gridProducts = products.slice(1);

  return (
    <>
      {/* ── Hero ──────────────────────────────────────────────── */}
      <section className="max-w-[1200px] mx-auto px-6 pt-12 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center min-h-[480px]">

          {/* Left — copy */}
          <div className="flex flex-col justify-center order-2 lg:order-1">
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-accent mb-5">
              New Season
            </p>
            <h1 className="text-[clamp(1.8rem,4vw,2.8rem)] font-medium leading-[1.15] tracking-tight text-ink mb-5">
              Elegance is not about being noticed,{" "}
              <span className="text-ink-tertiary">
                it&apos;s about being remembered.
              </span>
            </h1>
            <p className="text-[14px] text-ink-secondary leading-relaxed max-w-sm mb-7">
              Curated women&apos;s fashion and shoes — designed for the modern Ethiopian woman.
            </p>
            <div className="flex items-center gap-3">
              <Link
                href="/products"
                className="inline-flex items-center gap-2 bg-ink text-surface-elevated text-[13px] font-medium px-6 py-2.5 rounded-full hover:bg-accent transition-colors"
              >
                Shop Collection
                <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
              </Link>
              <Link
                href="/products?category=shoes"
                className="inline-flex items-center gap-2 text-[13px] font-medium text-ink-secondary border border-edge px-6 py-2.5 rounded-full hover:border-ink hover:text-ink transition-colors"
              >
                Shop Shoes
              </Link>
            </div>
          </div>

          {/* Right — featured image */}
          <div className="relative order-1 lg:order-2 h-[400px] lg:h-[520px] bg-surface-subtle rounded-2xl overflow-hidden">
            <img
              alt={featured.name}
              src={featured.images[0]}
              className="absolute inset-0 w-full h-full object-cover object-center"
            />
          </div>

        </div>
      </section>

      {/* ── Categories row ────────────────────────────────────── */}
      <section className="max-w-[1200px] mx-auto px-6 pb-20">
        <div className="flex items-center gap-3 overflow-x-auto no-scrollbar pb-1">
          {["All", "Tops", "Dresses", "Shoes", "Accessories", "Outerwear"].map(
            (cat, i) => (
              <Link
                key={cat}
                href={cat === "All" ? "/products" : `/products?category=${cat.toLowerCase()}`}
                className={`px-5 py-2 rounded-full text-[13px] font-medium whitespace-nowrap transition-colors ${
                  i === 0
                    ? "bg-ink text-surface-elevated"
                    : "bg-surface-muted text-ink-secondary hover:bg-edge hover:text-ink"
                }`}
              >
                {cat}
              </Link>
            )
          )}
        </div>
      </section>

      {/* ── Product grid ──────────────────────────────────────── */}
      <section className="max-w-[1200px] mx-auto px-6 pb-28">
        <div className="flex items-baseline justify-between mb-10">
          <h2 className="text-[22px] font-medium text-ink">Just Arrived</h2>
          <Link
            href="/products"
            className="text-[13px] text-ink-secondary hover:text-accent transition-colors flex items-center gap-1"
          >
            View all
            <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-5 gap-y-10">
          {gridProducts.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>

      {/* ── Brand story strip ─────────────────────────────────── */}
      <section className="border-t border-edge">
        <div className="max-w-[1200px] mx-auto px-6 py-24 text-center">
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-accent mb-4">
            About Us
          </p>
          <h2 className="text-[clamp(1.4rem,3vw,2rem)] font-medium text-ink leading-snug max-w-2xl mx-auto mb-5">
            We believe fashion should celebrate who you are — not define you.
          </h2>
          <p className="text-[15px] text-ink-secondary leading-relaxed max-w-lg mx-auto">
            Habesha Store is a home for curated women&apos;s fashion that brings together Ethiopian heritage and contemporary design.
          </p>
        </div>
      </section>
    </>
  );
}
