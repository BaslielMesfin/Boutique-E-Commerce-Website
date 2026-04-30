"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [hasCartItems, setHasCartItems] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const checkCart = () => {
      const cart = localStorage.getItem("habesha_cart");
      if (cart) {
        try {
          const parsed = JSON.parse(cart);
          setHasCartItems(Array.isArray(parsed) && parsed.length > 0);
        } catch {
          setHasCartItems(false);
        }
      } else {
        setHasCartItems(false);
      }
    };
    checkCart();
    // Listen for custom event from ProductClientView
    window.addEventListener("cart_updated", checkCart);
    return () => window.removeEventListener("cart_updated", checkCart);
  }, []);

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
          <Link href="/products?category=new" className="text-[13px] text-ink-secondary hover:text-ink transition-colors">
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
          <Link href="/admin" aria-label="Account" className="hidden md:block text-ink-secondary hover:text-ink transition-colors">
            <span className="material-symbols-outlined text-[20px]">person_outline</span>
          </Link>
          <Link href="/checkout" aria-label="Bag" className="relative text-ink-secondary hover:text-ink transition-colors">
            <span className="material-symbols-outlined text-[20px]">shopping_bag</span>
            {hasCartItems && (
              <span className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-accent rounded-full animate-in zoom-in" />
            )}
          </Link>
        </div>

      </div>
    </header>
  );
}
