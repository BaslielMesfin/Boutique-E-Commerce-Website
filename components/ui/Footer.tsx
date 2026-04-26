import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-edge mt-auto">
      <div className="max-w-[1200px] mx-auto px-6 py-16">

        {/* Top row */}
        <div className="flex flex-col md:flex-row justify-between gap-12 mb-16">
          {/* Brand */}
          <div className="max-w-xs">
            <span className="text-[14px] font-semibold tracking-[0.12em] uppercase text-ink block mb-4">
              Habesha
            </span>
            <p className="text-[13px] text-ink-secondary leading-relaxed">
              Curated women&apos;s fashion and shoes. Ethiopian elegance, modern sensibility.
            </p>
          </div>

          {/* Links */}
          <div className="flex gap-16">
            <div>
              <h4 className="text-[11px] font-semibold uppercase tracking-[0.15em] text-ink-tertiary mb-5">
                Shop
              </h4>
              <ul className="space-y-3">
                <li><Link href="/products" className="text-[13px] text-ink-secondary hover:text-ink transition-colors">All</Link></li>
                <li><Link href="/products?category=dresses" className="text-[13px] text-ink-secondary hover:text-ink transition-colors">Dresses</Link></li>
                <li><Link href="/products?category=shoes" className="text-[13px] text-ink-secondary hover:text-ink transition-colors">Shoes</Link></li>
                <li><Link href="/products?category=new" className="text-[13px] text-ink-secondary hover:text-ink transition-colors">New Arrivals</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-[11px] font-semibold uppercase tracking-[0.15em] text-ink-tertiary mb-5">
                Help
              </h4>
              <ul className="space-y-3">
                <li><Link href="#" className="text-[13px] text-ink-secondary hover:text-ink transition-colors">Shipping</Link></li>
                <li><Link href="#" className="text-[13px] text-ink-secondary hover:text-ink transition-colors">Returns</Link></li>
                <li><Link href="#" className="text-[13px] text-ink-secondary hover:text-ink transition-colors">Contact</Link></li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom row */}
        <div className="pt-8 border-t border-edge flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-[11px] text-ink-tertiary">
            © {new Date().getFullYear()} Habesha Store. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link href="#" className="text-[11px] text-ink-tertiary hover:text-ink-secondary transition-colors">
              Privacy
            </Link>
            <Link href="#" className="text-[11px] text-ink-tertiary hover:text-ink-secondary transition-colors">
              Terms
            </Link>
          </div>
        </div>

      </div>
    </footer>
  );
}
