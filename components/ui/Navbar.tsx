import Link from "next/link";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 bg-surface/80 backdrop-blur-xl border-b border-edge-subtle">
      <div className="max-w-[1200px] mx-auto px-6 h-14 flex items-center">

        {/* Logo */}
        <Link href="/" className="flex-shrink-0 mr-12">
          <span className="text-[15px] font-semibold tracking-[0.12em] uppercase text-ink">
            Habesha
          </span>
        </Link>

        {/* Nav links */}
        <nav className="hidden md:flex items-center gap-8">
          <Link href="/products" className="text-[13px] text-ink-secondary hover:text-ink transition-colors">
            Shop
          </Link>
          <Link href="/products?category=shoes" className="text-[13px] text-ink-secondary hover:text-ink transition-colors">
            Shoes
          </Link>
          <Link href="/products?category=new" className="text-[13px] text-ink-secondary hover:text-ink transition-colors">
            New In
          </Link>
        </nav>

        {/* Spacer */}
        <div className="flex-1" />

        {/* Actions */}
        <div className="flex items-center gap-5">
          <button aria-label="Search" className="text-ink-secondary hover:text-ink transition-colors">
            <span className="material-symbols-outlined text-[20px]">search</span>
          </button>
          <button aria-label="Account" className="hidden md:block text-ink-secondary hover:text-ink transition-colors">
            <span className="material-symbols-outlined text-[20px]">person_outline</span>
          </button>
          <Link href="/checkout" aria-label="Bag" className="text-ink-secondary hover:text-ink transition-colors">
            <span className="material-symbols-outlined text-[20px]">shopping_bag</span>
          </Link>
        </div>

      </div>
    </header>
  );
}
