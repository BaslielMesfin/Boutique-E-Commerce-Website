import "dotenv/config";
import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import pg from 'pg';

// For seeding, we need a direct TCP connection, not the prisma+postgres:// proxy
function getDirectUrl(): string {
  const dbUrl = process.env.DATABASE_URL || '';
  if (dbUrl.startsWith('prisma+postgres://')) {
    // Extract the direct database URL from the api_key
    try {
      const url = new URL(dbUrl);
      const apiKey = url.searchParams.get('api_key') || '';
      const decoded = JSON.parse(Buffer.from(apiKey, 'base64').toString('utf-8'));
      return decoded.databaseUrl;
    } catch {
      // Fallback: try direct postgres URL on default prisma dev ports
      return 'postgres://postgres:postgres@localhost:51214/template1?sslmode=disable';
    }
  }
  return dbUrl;
}

const directUrl = getDirectUrl();
console.log('Connecting to:', directUrl.replace(/\/\/.*@/, '//***@'));
const pool = new pg.Pool({ connectionString: directUrl });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

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
      name: "Aselefech Cotton Blouse",
      description: "A beautifully crafted essential, designed for modern elegance and timeless style.",
      basePrice: 1200,
      category: "Tops",
      images: ["https://lh3.googleusercontent.com/aida-public/AB6AXuD9Vbj7DWnXquyQNszZB7dwrr-5ikOvkHDcQ4ceHjs82I4W0pi3vzBgnU1B_u_d_NTILYXD9ksjtpyHTsLSsw6s1E0PD1kFIoMk5i8oY_E0VG3cCZEgH0FqX_gI8cZ38E8PCQEwoieaS8qeHFWTxzb3ewvl67n2dRrIwA9chTxr8Ue40sN_8gXQyXhq9JfadQ8aoz1FOl7IkHyrmcrN8d_VO_w5bzAeGFqzhNd5NQCwBpSoC9VWXW7xOY79nCxNXfDc-mwD42Av44mI"],
      variants: [{ size: "M", color: "White", stockQuantity: 15 }]
    },
    {
      name: "Tailored Wide-Leg Trousers",
      description: "A beautifully crafted essential, designed for modern elegance and timeless style.",
      basePrice: 3500,
      category: "Bottoms",
      images: ["https://lh3.googleusercontent.com/aida-public/AB6AXuDWZx8h6mSUA8ZaNkZj-n6I2exFkHfN2Fcb5LkHcQttMghIgk_72e4BKCZ0jp7kpGzmpTykLgiWI-BmDVUiozsLVGG6tyFLkWoC8_xV41oHJ7L9pyYjCt5vI21HArVSV4Yu4dCKX7Dg9C75SYunr9VqFL4jTZNWNwdU4GalqF1p9kZXzPNzFhHlP7GSYv_CvjYIRw7_WdpMjoRmg86Y91WpXCrkH3CxX8h2_JSiZGKs2RVNGXIxXiMSNRBkV5ICPtM8UaQqqnIx41bn"],
      variants: [{ size: "L", color: "Beige", stockQuantity: 8 }]
    },
    {
      name: "Structured Trench Coat",
      description: "A definitive wardrobe staple reimagined through an essentialist lens.",
      basePrice: 8900,
      category: "Outerwear",
      images: ["https://lh3.googleusercontent.com/aida-public/AB6AXuCN7iqEsegLe-Fy0dFJjW2GFaPcyXrq4kBCfjwI4PiVFiE5GjfdDUfbrV-fKSgYIAozQboBsQiOVUz9T_iwqBFUOMTpho4D1KLnW696lG6ThtMxf451e6GEuXD5wp4-uIfjK9aZpFaiRtW8VBYvinMuIXcrZcdZKccQZ2iQ1E0SOTEiu-O7oDp9oxsWS7Mw5mVEJSPT0_1iXHiW3hl5e9fscvDJ_chlMa2zx-3-FGZKayUVpUxSfO2fQ1CZ11XqjhE99Bh7qoNvnN-E"],
      variants: [{ size: "S", color: "Midnight", stockQuantity: 5 }, { size: "M", color: "Stone", stockQuantity: 10 }]
    },
    {
      name: "Gold Pendant Necklace",
      description: "A beautifully crafted essential, designed for modern elegance and timeless style.",
      basePrice: 2400,
      category: "Accessories",
      images: ["https://lh3.googleusercontent.com/aida-public/AB6AXuCynCF_GrO9NXjOzVd4M4iqJzVtS8uNk537td1h_qKGWpWQmoDoJTS8QauYD8vFldXsdgZxs1QsyjM6jOdcoLXx4cRHO28cUubm2TL6HnTxSQIYViqad7otgEBssSm06Qp3PHl8T3EaO3ODoBMZpBmdIlfQxoCfM9uTayWRPqwChTLfQUskaEA5i6m9Uv9NFx6_olNaAY_1c4E41g7rZljsq2FXTLRRcxpskUyUgULqqD8q7qC8srFBd_whPjh3CB7ylrzuZCNLQ0tE"],
      variants: [{ size: "OS", color: "Gold", stockQuantity: 20 }]
    },
    {
      name: "Minimal Leather Sneakers",
      description: "A beautifully crafted essential, designed for modern elegance and timeless style.",
      basePrice: 5400,
      category: "Shoes",
      images: ["https://lh3.googleusercontent.com/aida-public/AB6AXuBKGmy0jdacITCG8ojZA4XRxLA8ThYLZ2WlMg-AMV23pDO0MPO68h_W9tQ6KbjA1AjeVe1LQobDwc_vJbwAikx_o-90zP6jbeQyzOMyW5oTpoFSIEVpNZqZNZaGbqDBlh2y2OEs6bMsVtPgoWA3tAQkO4kXZsWcAZ9VuDPWbnQPcxIQm3G7F-GIBohix2hNU0xFF9b2tS8fkqG4pGhLVVhU5-0IZazBCN1pBfNvXXkPSiZVn17K0W5ZFfDQTSlfkyS5OYB77fFVmZ8w"],
      variants: [{ size: "40", color: "White", stockQuantity: 12 }, { size: "42", color: "White", stockQuantity: 6 }]
    },
    {
      name: "Leather Pointed Heels",
      description: "A beautifully crafted essential, designed for modern elegance and timeless style.",
      basePrice: 7800,
      category: "Shoes",
      images: ["https://lh3.googleusercontent.com/aida-public/AB6AXuA3PixV5NI_Mu2SUd9d4QNqbRyVkvWmaLV9aG-qfB1ph90gzENeb-CBU6DwUQu6MN6-LNGLpmIAOgefaQz_CbjQPNk6dxcNsWRxPrj4kLuZ7IDL2vPvivPdPmjF8NNx9IUJoObXfcj4oFCofOuWnt795V4dlcWiX_gitJ9GzTnYKsWYGc9FDolJxoruJEKAiXfpD1oCSfOvZfzlT8Gw9h2WDFp9F1bH42t_0FAgn76I5EjE_n4su3q0t8Ug9AgYqpqgDjTtkqhGSU3E"],
      variants: [{ size: "38", color: "Black", stockQuantity: 4 }, { size: "39", color: "Black", stockQuantity: 5 }]
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
