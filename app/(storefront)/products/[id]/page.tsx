import prisma from "@/lib/prisma";
import ProductClientView from "@/components/storefront/ProductClientView";
import { notFound } from "next/navigation";

export default async function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  let product = null;
  
  if (resolvedParams.id.length === 36) { 
     product = await prisma.product.findUnique({
      where: { id: resolvedParams.id },
      include: { variants: true }
    });
  }

  // Fallback for demo using the template data
  if (!product) {
    if (resolvedParams.id === 'essential-trench') {
      product = {
        id: 'essential-trench',
        name: 'Essential Trench Coat',
        description: 'A definitive wardrobe staple reimagined through an essentialist lens. Crafted from a dense, water-repellent cotton gabardine, this trench features clean lines, hidden closures, and an exaggerated back storm flap. Designed to drape elegantly, free from unnecessary embellishment.',
        basePrice: 14500,
        images: [
          'https://lh3.googleusercontent.com/aida-public/AB6AXuAjqQlGEf89_lonKn-e2B6DcFSFZFA6JVUNNjZPuGrTq8DQ_N0vPciv08LQogT0pleJWqWbZRvnoLN2WfYpr3qoGXdorG-zlH5rgDAqQVht0K6EKcN1z54AFXSHAqJte8JJORaTOssw_lPQvjHT6RtRGDXLJnxJ8C3cOPX1vuQJem2ko5qFnrrEpC7ZmluW-a2igDRrmftqWLPT8Sk7pChkZmBmWhlh8Zag-7YJaEDFOSVOsil5pfGlCJRf8SXVSEpmW66nZS5t1ybj',
          'https://lh3.googleusercontent.com/aida-public/AB6AXuAOTEz8jfZ2l5hNuu-jSSqXJQCVs7BWHnn2KDSQIeC2A_c3SZXGXGl6QRsXWLe2h1ff8yIP2y1txIh8WX0RVkt_gPs4Q4DAeBixECXNqn2UAv1H5wYDSyuH1GAQLVVSot66rJOSNu_M64MIz0PQrTh0Xi8SsTYfBhIs7WbwGX0DcND_aJZ_z29z2-wJKL1Yom7oqub95Bk195VzJ-Yv44ebXnixUUa9vXv7oUFEl2WtU9gMxic-63RaI1fjXyLPgR4qgZ64tumD_1J6',
          'https://lh3.googleusercontent.com/aida-public/AB6AXuDgNt11dbbpkoBNr4R9tTiyAM6hY7zPd3AWef_ZI7rgZrQndaGw93oDGsDFLFS4_lAwOHDMOMGQDaRjtdqdgJEKrgQYAjnWic0uBv9cLhhlYL7lk-JLyfG8Jpj-RKzFBA8GUUkbGfUmfEGXqyT9ThYk7wY5GDXhDHVwJXKM7BLmIAA7a95Z6L_I7gAZpz5mUoQLK638KRtAvI1vx0UlmDtR1F0UfrtA6ZE_E1W0CMpsTHVpUqJr8rzhlFYQtH8N0vppMmMkKMDQJuE6',
          'https://lh3.googleusercontent.com/aida-public/AB6AXuBdIEObspyl0qgq3r0IIlbeomjsAYeORU4PAgop1NlzTsjY4UMDMUNiS482sd_WmxcEsHNsGzapL35uDJQRxPdhf35KoRPgOD6xQwMIbX7DVCfGYA5O9HlVys_TmqPXxzjawh7Hgi-jSknhZ1sWukegsymUOUFR5J_vVff6sAHeQ2OFxwD-H6om5K5OUlmfHbA-NU4jXLIYIPalif1D_HhU2JkgK70XS1Pkrkj9H5k_6mOutjjv_Z3twc5z7gisg8T0kZErR5vCMfy4'
        ],
        category: 'Outerwear',
        createdAt: new Date(),
        updatedAt: new Date(),
        variants: [
          { id: 'v1', productId: 'essential-trench', size: 'S', color: 'Midnight', stockQuantity: 5 },
          { id: 'v2', productId: 'essential-trench', size: 'M', color: 'Midnight', stockQuantity: 0 }, 
          { id: 'v3', productId: 'essential-trench', size: 'L', color: 'Midnight', stockQuantity: 2 },
          { id: 'v4', productId: 'essential-trench', size: 'S', color: 'Stone', stockQuantity: 3 },
          { id: 'v5', productId: 'essential-trench', size: 'M', color: 'Stone', stockQuantity: 10 },
          { id: 'v6', productId: 'essential-trench', size: 'L', color: 'Stone', stockQuantity: 0 }
        ]
      } as any;
    } else {
      return notFound();
    }
  }

  return (
    <main className="flex-grow w-full max-w-container-max mx-auto px-8 py-section-gap">
      <div className="mb-12">
        <span className="font-label-sm text-label-sm text-outline uppercase tracking-widest">Home / {product.category} / {product.name}</span>
      </div>
      <ProductClientView product={product} />
    </main>
  );
}
