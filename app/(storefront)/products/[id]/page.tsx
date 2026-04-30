import prisma from "@/lib/prisma";
import ProductClientView from "@/components/storefront/ProductClientView";
import { notFound } from "next/navigation";

export default async function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  let product = null;

  // Try DB first (UUIDs are 36 chars)
  if (id.length === 36) {
    product = await prisma.product.findUnique({
      where: { id },
      include: { variants: true },
    });
  }

  // Demo fallback
  if (!product) {
    const demoImages: Record<string, string[]> = {
      "classic-cotton-tee": ["https://lh3.googleusercontent.com/aida-public/AB6AXuD9Vbj7DWnXquyQNszZB7dwrr-5ikOvkHDcQ4ceHjs82I4W0pi3vzBgnU1B_u_d_NTILYXD9ksjtpyHTsLSsw6s1E0PD1kFIoMk5i8oY_E0VG3cCZEgH0FqX_gI8cZ38E8PCQEwoieaS8qeHFWTxzb3ewvl67n2dRrIwA9chTxr8Ue40sN_8gXQyXhq9JfadQ8aoz1FOl7IkHyrmcrN8d_VO_w5bzAeGFqzhNd5NQCwBpSoC9VWXW7xOY79nCxNXfDc-mwD42Av44mI"],
      "tailored-trousers": ["https://lh3.googleusercontent.com/aida-public/AB6AXuDWZx8h6mSUA8ZaNkZj-n6I2exFkHfN2Fcb5LkHcQttMghIgk_72e4BKCZ0jp7kpGzmpTykLgiWI-BmDVUiozsLVGG6tyFLkWoC8_xV41oHJ7L9pyYjCt5vI21HArVSV4Yu4dCKX7Dg9C75SYunr9VqFL4jTZNWNwdU4GalqF1p9kZXzPNzFhHlP7GSYv_CvjYIRw7_WdpMjoRmg86Y91WpXCrkH3CxX8h2_JSiZGKs2RVNGXIxXiMSNRBkV5ICPtM8UaQqqnIx41bn"],
      "structured-trench": ["https://lh3.googleusercontent.com/aida-public/AB6AXuCN7iqEsegLe-Fy0dFJjW2GFaPcyXrq4kBCfjwI4PiVFiE5GjfdDUfbrV-fKSgYIAozQboBsQiOVUz9T_iwqBFUOMTpho4D1KLnW696lG6ThtMxf451e6GEuXD5wp4-uIfjK9aZpFaiRtW8VBYvinMuIXcrZcdZKccQZ2iQ1E0SOTEiu-O7oDp9oxsWS7Mw5mVEJSPT0_1iXHiW3hl5e9fscvDJ_chlMa2zx-3-FGZKayUVpUxSfO2fQ1CZ11XqjhE99Bh7qoNvnN-E"],
      "geometric-pendant": ["https://lh3.googleusercontent.com/aida-public/AB6AXuCynCF_GrO9NXjOzVd4M4iqJzVtS8uNk537td1h_qKGWpWQmoDoJTS8QauYD8vFldXsdgZxs1QsyjM6jOdcoLXx4cRHO28cUubm2TL6HnTxSQIYViqad7otgEBssSm06Qp3PHl8T3EaO3ODoBMZpBmdIlfQxoCfM9uTayWRPqwChTLfQUskaEA5i6m9Uv9NFx6_olNaAY_1c4E41g7rZljsq2FXTLRRcxpskUyUgULqqD8q7qC8srFBd_whPjh3CB7ylrzuZCNLQ0tE"],
      "ribbed-knit-sweater": ["https://lh3.googleusercontent.com/aida-public/AB6AXuCqSSrLizd5ecfSLn0djHYcrQHaMl3DNEdo7uPCL3XNOI8_3FkAgof1rfF-kKixl8zrnh4fJWKE95N4LH_zHY5a8BydaPDmh59TehBs3pGiVfVmKCYyvDJkLrywVdUVUARcCNdrkEWgjI-kJ7bm1duOnXqfmZM8tRON7xB4GeUO5SOZ16x7b8SlbccIsOayabUkja_CvWZwevZidmfgA52VJnBLq_MoiNBIkAxrSeE3Mvlp06lWaLcoeGsChCQ_sv0aSYAb7T3KimZy"],
      "essential-tote": ["https://lh3.googleusercontent.com/aida-public/AB6AXuDxlh3tu0V13fmueooRgM75MgndHJyBjiO3Eqt8b8AVSIH-ILJH1qjcN_6mH-Ut-eqaEUx9Rpj3dwXZcJp3vlxMCvpnp9_KmNdCM-ACvWgxiWTev08OdjrYbfmGZZu5fsHXiHmkA9mEguVeAQA2W-29-30yLaCAz6JdRiyNb03D4c8711IaSvXCqfxi-XVSxRaPL4DGpkFInrk5CjY1hjrg4u_-JFsoaIgvdjBPG9BIQ0Nr5q1McpnxNqcZQKLAQpjUnqdK1BWXuWAZ"],
      "minimalist-sneaker": ["https://lh3.googleusercontent.com/aida-public/AB6AXuBKGmy0jdacITCG8ojZA4XRxLA8ThYLZ2WlMg-AMV23pDO0MPO68h_W9tQ6KbjA1AjeVe1LQobDwc_vJbwAikx_o-90zP6jbeQyzOMyW5oTpoFSIEVpNZqZNZaGbqDBlh2y2OEs6bMsVtPgoWA3tAQkO4kXZsWcAZ9VuDPWbnQPcxIQm3G7F-GIBohix2hNU0xFF9b2tS8fkqG4pGhLVVhU5-0IZazBCN1pBfNvXXkPSiZVn17K0W5ZFfDQTSlfkyS5OYB77fFVmZ8w"],
      "leather-derby": ["https://lh3.googleusercontent.com/aida-public/AB6AXuA3PixV5NI_Mu2SUd9d4QNqbRyVkvWmaLV9aG-qfB1ph90gzENeb-CBU6DwUQu6MN6-LNGLpmIAOgefaQz_CbjQPNk6dxcNsWRxPrj4kLuZ7IDL2vPvivPdPmjF8NNx9IUJoObXfcj4oFCofOuWnt795V4dlcWiX_gitJ9GzTnYKsWYGc9FDolJxoruJEKAiXfpD1oCSfOvZfzlT8Gw9h2WDFp9F1bH42t_0FAgn76I5EjE_n4su3q0t8Ug9AgYqpqgDjTtkqhGSU3E"],
    };

    const isDemoId = Object.keys(demoImages).includes(id) || id === "essential-trench";

    if (isDemoId) {
      const nameFormat = id.split("-").map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");
      product = {
        id,
        name: nameFormat,
        description: "A beautifully crafted essential, designed for modern elegance and timeless style.",
        basePrice: 5000,
        images: demoImages[id] || demoImages["structured-trench"],
        category: "Clothing",
        createdAt: new Date(),
        updatedAt: new Date(),
        variants: [
          { id: "v1", productId: id, size: "S", color: "Midnight", stockQuantity: 5 },
          { id: "v2", productId: id, size: "M", color: "Midnight", stockQuantity: 0 },
          { id: "v3", productId: id, size: "L", color: "Midnight", stockQuantity: 2 },
        ],
      } as any;
    } else {
      return notFound();
    }
  }

  return (
    <div className="max-w-[1200px] mx-auto px-6 py-16">
      <ProductClientView product={product} />
    </div>
  );
}
