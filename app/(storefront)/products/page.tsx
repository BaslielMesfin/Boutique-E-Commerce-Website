import Link from "next/link";
import prisma from "@/lib/prisma";

// Demo products fallback when DB is empty
const demoProducts = [
  {
    id: "essential-trench",
    name: "Essential Trench Coat",
    basePrice: 14500,
    category: "Outerwear",
    images: [
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBYQROsaOz5lIZ5Hx8tZAUnOdCASKmdo6-QuBtby4IBiXrn3SC_tfNbjtDvDYf9kFlhKy00vVtwhjttSEFF7WpRbX1LQOALP7qKhA1ExFc7p32EccVgXn7qU3Nre9NC0T9sFeeChsPOT2grBLoPXsmHX7KEisGXlF0UngjcZAdw55B0r_FCbRcCuz-C7lHZOBrfL--iib9Qtv7E6K12wP1g6LqXcgCJpKv83DyuhCnD8aWSBtLZ1S28fATHeIfjnVY0i5DxOrIzbA5i",
    ],
  },
  {
    id: "poplin-shirt",
    name: "Poplin Standard Shirt",
    basePrice: 6200,
    category: "Tops",
    images: [
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDCttIhkRlgiTmG4wXtEv-Jiyh7FVvpqlmvCcYOqzcz_tLkQoQy7cAdkh0Y3SUoOupR6zoWYnchTk3HUJUt5ZRHZQCol_t3L39vy7Lis6wiNsk5h0AcRvFRXPN-zx1zor8CtevtXIaoJu437pWjbgdmG9Wf-dq5KhFPsfe0NiZ6SKOKofmvJs3Wpz9SU5x_0weum5OQSDXXgCmWghEJAb-y153c5DgfPPViWqdPkflpiJJUWGiWaeC1qXJuLZkA7tDaq3iwMKmXlPu2",
    ],
  },
  {
    id: "leather-derby",
    name: "Leather Derby",
    basePrice: 18900,
    category: "Footwear",
    images: [
      "https://lh3.googleusercontent.com/aida-public/AB6AXuA3PixV5NI_Mu2SUd9d4QNqbRyVkvWmaLV9aG-qfB1ph90gzENeb-CBU6DwUQu6MN6-LNGLpmIAOgefaQz_CbjQPNk6dxcNsWRxPrj4kLuZ7IDL2vPvivPdPmjF8NNx9IUJoObXfcj4oFCofOuWnt795V4dlcWiX_gitJ9GzTnYKsWYGc9FDolJxoruJEKAiXfpD1oCSfOvZfzlT8Gw9h2WDFp9F1bH42t_0FAgn76I5EjE_n4su3q0t8Ug9AgYqpqgDjTtkqhGSU3E",
    ],
  },
];

export default async function ProductsPage() {
  let products: typeof demoProducts = [];

  try {
    const dbProducts = await prisma.product.findMany({
      orderBy: { createdAt: "desc" },
    });
    if (dbProducts.length > 0) {
      products = dbProducts;
    } else {
      products = demoProducts;
    }
  } catch {
    products = demoProducts;
  }

  return (
    <main className="max-w-[1440px] mx-auto px-8 md:px-[48px] py-[120px]">
      <div className="flex items-end justify-between mb-16 border-b border-outline-variant pb-8">
        <h1 className="font-headline-lg text-headline-lg text-primary uppercase">
          All Collections
        </h1>
        <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-widest">
          {products.length} items
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-[24px] gap-y-16">
        {products.map((product) => (
          <Link
            key={product.id}
            href={`/products/${product.id}`}
            className="group cursor-pointer block"
          >
            <div className="w-full aspect-[3/4] bg-surface-container overflow-hidden mb-6 relative">
              <img
                alt={product.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                src={product.images[0]}
              />
              <div className="absolute inset-0 border border-outline-variant opacity-20"></div>
            </div>
            <div className="flex flex-col gap-2">
              <h3 className="font-body-md text-body-md text-primary uppercase tracking-wide">
                {product.name}
              </h3>
              <p className="font-label-sm text-label-sm text-on-surface-variant">
                ETB {product.basePrice.toLocaleString()}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}
