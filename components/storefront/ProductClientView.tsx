"use client";

import { useState } from "react";
import Link from "next/link";

type Variant = {
  id: string;
  size: string;
  color: string;
  stockQuantity: number;
};

type Product = {
  id: string;
  name: string;
  description: string;
  basePrice: number;
  images: string[];
  variants: Variant[];
  category?: string;
};

export default function ProductClientView({ product }: { product: Product }) {
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [mainImage, setMainImage] = useState(product.images[0]);

  const uniqueColors = Array.from(new Set(product.variants.map((v) => v.color)));
  const uniqueSizes = Array.from(new Set(product.variants.map((v) => v.size)));

  const isSizeInStock = (size: string) => {
    if (selectedColor) {
      const v = product.variants.find((x) => x.size === size && x.color === selectedColor);
      return v ? v.stockQuantity > 0 : false;
    }
    return product.variants.some((x) => x.size === size && x.stockQuantity > 0);
  };

  const isColorInStock = (color: string) => {
    if (selectedSize) {
      const v = product.variants.find((x) => x.color === color && x.size === selectedSize);
      return v ? v.stockQuantity > 0 : false;
    }
    return product.variants.some((x) => x.color === color && x.stockQuantity > 0);
  };

  const handleColorSelect = (color: string) => {
    setSelectedColor(color);
    if (selectedSize) {
      const v = product.variants.find((x) => x.size === selectedSize && x.color === color);
      if (!v || v.stockQuantity <= 0) setSelectedSize(null);
    }
  };

  const handleSizeSelect = (size: string) => {
    if (isSizeInStock(size)) setSelectedSize(size);
  };

  const handleAddToCart = () => {
    if (!selectedColor || !selectedSize) return;
    const v = product.variants.find((x) => x.size === selectedSize && x.color === selectedColor);
    if (!v || v.stockQuantity <= 0) return;
    alert(`Added to bag: ${product.name} — ${selectedSize}, ${selectedColor}`);
  };

  const isDisabled = !selectedColor || !selectedSize;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">

      {/* ── Gallery ──────────────────────────────────────────── */}
      <div className="lg:col-span-7 flex gap-4">
        {product.images.length > 1 && (
          <div className="hidden md:flex flex-col gap-3 w-16 flex-shrink-0">
            {product.images.map((img, i) => (
              <button
                key={i}
                onClick={() => setMainImage(img)}
                className={`relative aspect-[3/4] rounded-lg overflow-hidden bg-surface-subtle transition-opacity ${
                  mainImage === img ? "ring-1 ring-accent" : "opacity-50 hover:opacity-100"
                }`}
              >
                <img alt={`View ${i + 1}`} src={img} className="absolute inset-0 w-full h-full object-cover object-center" />
              </button>
            ))}
          </div>
        )}

        <div className="relative flex-1 aspect-[3/4] lg:aspect-auto lg:h-[680px] bg-surface-subtle rounded-2xl overflow-hidden">
          <img alt={product.name} src={mainImage} className="absolute inset-0 w-full h-full object-cover object-center" />
        </div>
      </div>

      {/* ── Details ──────────────────────────────────────────── */}
      <div className="lg:col-span-5 flex flex-col pt-2">
        <nav className="flex items-center gap-2 text-[12px] text-ink-tertiary mb-6">
          <Link href="/" className="hover:text-ink transition-colors">Home</Link>
          <span>/</span>
          <Link href="/products" className="hover:text-ink transition-colors">Shop</Link>
          {product.category && (
            <>
              <span>/</span>
              <span className="text-ink-secondary">{product.category}</span>
            </>
          )}
        </nav>

        <h1 className="text-[28px] font-medium text-ink leading-tight mb-2">
          {product.name}
        </h1>
        <p className="text-[18px] text-ink mb-10">
          ETB {product.basePrice.toLocaleString()}
        </p>

        {/* Color */}
        {uniqueColors.length > 0 && (
          <div className="mb-8">
            <span className="block text-[12px] font-medium uppercase tracking-[0.1em] text-ink-secondary mb-3">
              Color {selectedColor && <span className="normal-case tracking-normal text-ink">— {selectedColor}</span>}
            </span>
            <div className="flex gap-2">
              {uniqueColors.map((c) => {
                const inStock = isColorInStock(c);
                const active = selectedColor === c;
                return (
                  <button
                    key={c}
                    onClick={() => inStock && handleColorSelect(c)}
                    disabled={!inStock}
                    className={`px-5 py-2 rounded-full text-[13px] font-medium transition-all ${
                      active
                        ? "bg-ink text-surface-elevated"
                        : inStock
                        ? "bg-surface-muted text-ink hover:bg-edge"
                        : "bg-surface-muted text-ink-tertiary opacity-40 cursor-not-allowed line-through"
                    }`}
                  >
                    {c}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Size */}
        {uniqueSizes.length > 0 && (
          <div className="mb-10">
            <div className="flex justify-between items-center mb-3">
              <span className="text-[12px] font-medium uppercase tracking-[0.1em] text-ink-secondary">
                Size {selectedSize && <span className="normal-case tracking-normal text-ink">— {selectedSize}</span>}
              </span>
              <button className="text-[12px] text-accent hover:underline underline-offset-4">
                Size guide
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {uniqueSizes.map((s) => {
                const inStock = isSizeInStock(s);
                const active = selectedSize === s;
                return (
                  <button
                    key={s}
                    onClick={() => handleSizeSelect(s)}
                    disabled={!inStock}
                    className={`w-12 h-12 rounded-full flex items-center justify-center text-[13px] font-medium transition-all ${
                      active
                        ? "bg-ink text-surface-elevated"
                        : inStock
                        ? "bg-surface-muted text-ink hover:bg-edge"
                        : "bg-surface-muted text-ink-tertiary opacity-40 cursor-not-allowed"
                    }`}
                  >
                    {s}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        <button
          onClick={handleAddToCart}
          disabled={isDisabled}
          className={`w-full py-4 rounded-full text-[14px] font-medium transition-all ${
            isDisabled
              ? "bg-surface-muted text-ink-tertiary cursor-not-allowed"
              : "bg-ink text-surface-elevated hover:bg-accent active:scale-[0.98]"
          }`}
        >
          {isDisabled ? "Select options" : "Add to Bag"}
        </button>

        {product.description && (
          <div className="mt-10 pt-8 border-t border-edge">
            <h3 className="text-[12px] font-medium uppercase tracking-[0.1em] text-ink-secondary mb-3">
              Description
            </h3>
            <p className="text-[14px] text-ink-secondary leading-relaxed">
              {product.description}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
