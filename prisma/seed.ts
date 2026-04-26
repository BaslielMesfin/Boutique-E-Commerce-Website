import { PrismaClient } from '@prisma/client';
import { v4 as uuidv4 } from 'uuid';

const prisma = new PrismaClient();

async function main() {
  console.log('Starting seed...');

  // Clean the database
  await prisma.orderItem.deleteMany();
  await prisma.order.deleteMany();
  await prisma.variant.deleteMany();
  await prisma.product.deleteMany();

  console.log('Database cleaned.');

  // Create products
  const products = [
    {
      name: 'Essential Trench Coat',
      description: 'A definitive wardrobe staple reimagined through an essentialist lens. Crafted from a dense, water-repellent cotton gabardine, this trench features clean lines, hidden closures, and an exaggerated back storm flap.',
      basePrice: 14500,
      category: 'Outerwear',
      images: [
        'https://lh3.googleusercontent.com/aida-public/AB6AXuAjqQlGEf89_lonKn-e2B6DcFSFZFA6JVUNNjZPuGrTq8DQ_N0vPciv08LQogT0pleJWqWbZRvnoLN2WfYpr3qoGXdorG-zlH5rgDAqQVht0K6EKcN1z54AFXSHAqJte8JJORaTOssw_lPQvjHT6RtRGDXLJnxJ8C3cOPX1vuQJem2ko5qFnrrEpC7ZmluW-a2igDRrmftqWLPT8Sk7pChkZmBmWhlh8Zag-7YJaEDFOSVOsil5pfGlCJRf8SXVSEpmW66nZS5t1ybj',
        'https://lh3.googleusercontent.com/aida-public/AB6AXuAOTEz8jfZ2l5hNuu-jSSqXJQCVs7BWHnn2KDSQIeC2A_c3SZXGXGl6QRsXWLe2h1ff8yIP2y1txIh8WX0RVkt_gPs4Q4DAeBixECXNqn2UAv1H5wYDSyuH1GAQLVVSot66rJOSNu_M64MIz0PQrTh0Xi8SsTYfBhIs7WbwGX0DcND_aJZ_z29z2-wJKL1Yom7oqub95Bk195VzJ-Yv44ebXnixUUa9vXv7oUFEl2WtU9gMxic-63RaI1fjXyLPgR4qgZ64tumD_1J6'
      ],
      variants: [
        { size: 'S', color: 'Midnight', stockQuantity: 5 },
        { size: 'M', color: 'Midnight', stockQuantity: 0 },
        { size: 'L', color: 'Midnight', stockQuantity: 2 },
        { size: 'S', color: 'Stone', stockQuantity: 3 },
        { size: 'M', color: 'Stone', stockQuantity: 10 },
        { size: 'L', color: 'Stone', stockQuantity: 0 }
      ]
    },
    {
      name: 'Poplin Standard Shirt',
      description: 'A crisp, breathable cotton poplin shirt with a relaxed silhouette. Perfect for layering or wearing on its own.',
      basePrice: 6200,
      category: 'Tops',
      images: [
        'https://lh3.googleusercontent.com/aida-public/AB6AXuDCttIhkRlgiTmG4wXtEv-Jiyh7FVvpqlmvCcYOqzcz_tLkQoQy7cAdkh0Y3SUoOupR6zoWYnchTk3HUJUt5ZRHZQCol_t3L39vy7Lis6wiNsk5h0AcRvFRXPN-zx1zor8CtevtXIaoJu437pWjbgdmG9Wf-dq5KhFPsfe0NiZ6SKOKofmvJs3Wpz9SU5x_0weum5OQSDXXgCmWghEJAb-y153c5DgfPPViWqdPkflpiJJUWGiWaeC1qXJuLZkA7tDaq3iwMKmXlPu2'
      ],
      variants: [
        { size: 'S', color: 'White', stockQuantity: 12 },
        { size: 'M', color: 'White', stockQuantity: 15 },
        { size: 'L', color: 'White', stockQuantity: 8 }
      ]
    },
    {
      name: 'Leather Derby',
      description: 'Handcrafted leather derby shoes with a durable sole and comfortable fit. A versatile addition to any wardrobe.',
      basePrice: 18900,
      category: 'Footwear',
      images: [
        'https://lh3.googleusercontent.com/aida-public/AB6AXuA3PixV5NI_Mu2SUd9d4QNqbRyVkvWmaLV9aG-qfB1ph90gzENeb-CBU6DwUQu6MN6-LNGLpmIAOgefaQz_CbjQPNk6dxcNsWRxPrj4kLuZ7IDL2vPvivPdPmjF8NNx9IUJoObXfcj4oFCofOuWnt795V4dlcWiX_gitJ9GzTnYKsWYGc9FDolJxoruJEKAiXfpD1oCSfOvZfzlT8Gw9h2WDFp9F1bH42t_0FAgn76I5EjE_n4su3q0t8Ug9AgYqpqgDjTtkqhGSU3E'
      ],
      variants: [
        { size: '40', color: 'Black', stockQuantity: 4 },
        { size: '41', color: 'Black', stockQuantity: 6 },
        { size: '42', color: 'Black', stockQuantity: 3 }
      ]
    }
  ];

  for (const productData of products) {
    const { variants, ...rest } = productData;
    const product = await prisma.product.create({
      data: {
        ...rest,
        variants: {
          create: variants
        }
      }
    });
    console.log(`Created product: ${product.name}`);
  }

  console.log('Seed completed successfully.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
