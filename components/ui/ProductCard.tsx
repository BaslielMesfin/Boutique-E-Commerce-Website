import Link from "next/link";

interface ProductCardProps {
  product: {
    id: string;
    name: string;
    basePrice: number;
    images: string[];
    category?: string;
    variants?: { stockQuantity: number }[];
  };
}

export default function ProductCard({ product }: ProductCardProps) {
  const isAllSoldOut = product.variants
    ? product.variants.length > 0 && product.variants.every((v) => v.stockQuantity <= 0)
    : false;

  return (
    <Link href={`/products/${product.id}`} className="group block">
      {/* Image */}
      <div className="relative aspect-[3/4] bg-surface-subtle rounded-xl overflow-hidden mb-3">
        <img
          alt={product.name}
          src={product.images[0] || "https://placehold.co/400x530?text=No+Image"}
          className={`absolute inset-0 w-full h-full object-cover object-center group-hover:scale-[1.03] transition-transform duration-500 ease-out ${
            isAllSoldOut ? "opacity-60" : ""
          }`}
        />
        {isAllSoldOut && (
          <div className="absolute top-3 left-3">
            <span className="bg-white/90 backdrop-blur-sm text-ink text-[11px] font-semibold uppercase tracking-wider px-3 py-1 rounded-full">
              Sold Out
            </span>
          </div>
        )}
      </div>

      {/* Info */}
      <h3 className="text-[13px] font-medium text-ink leading-tight mb-1 group-hover:text-accent transition-colors">
        {product.name}
      </h3>
      <p className={`text-[13px] ${isAllSoldOut ? "text-ink-tertiary line-through" : "text-ink-secondary"}`}>
        ETB {product.basePrice.toLocaleString()}
      </p>
    </Link>
  );
}
