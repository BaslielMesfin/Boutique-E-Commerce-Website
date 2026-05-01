"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/products?search=${encodeURIComponent(searchQuery)}`);
      setShowSearch(false);
      setSearchQuery("");
    }
  };

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
          <Link href="/products?category=new-in" className="text-[13px] text-ink-secondary hover:text-ink transition-colors">
            New In
          </Link>
        </nav>

        {/* Spacer */}
        <div className="flex-1 flex justify-end px-4">
          {showSearch && (
            <form onSubmit={handleSearchSubmit} className="hidden md:flex items-center animate-in fade-in slide-in-from-right-4 w-64">
              <input
                autoFocus
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onBlur={() => !searchQuery && setShowSearch(false)}
                className="w-full bg-surface-subtle text-[13px] text-ink px-4 py-1.5 rounded-full outline-none focus:ring-1 focus:ring-accent transition-all"
              />
            </form>
          )}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-5">
          <button 
            onClick={() => setShowSearch(!showSearch)}
            aria-label="Search" 
            className="text-ink-secondary hover:text-ink transition-colors"
          >
            <span className="material-symbols-outlined text-[20px]">search</span>
          </button>
        </div>

      </div>
    </header>
  );
}

