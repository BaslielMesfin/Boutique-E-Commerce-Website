import Link from "next/link";

interface ProductCardProps {
  product: {
    id: string;
    name: string;
    basePrice: number;
    images: string[];
    category?: string;
  };
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <Link href={`/products/${product.id}`} className="group block">
      {/* Image */}
      <div className="relative aspect-[3/4] bg-surface-subtle rounded-xl overflow-hidden mb-3">
        <img
          alt={product.name}
          src={product.images[0] || "https://placehold.co/400x530?text=No+Image"}
          className="absolute inset-0 w-full h-full object-cover object-center group-hover:scale-[1.03] transition-transform duration-500 ease-out"
        />
      </div>

      {/* Info */}
      <h3 className="text-[13px] font-medium text-ink leading-tight mb-1 group-hover:text-accent transition-colors">
        {product.name}
      </h3>
      <p className="text-[13px] text-ink-secondary">
        ETB {product.basePrice.toLocaleString()}
      </p>
    </Link>
  );
}
