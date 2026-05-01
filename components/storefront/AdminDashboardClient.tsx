"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

type Variant = {
  id: string;
  size: string;
  color: string;
  stockQuantity: number;
  product?: Product;
};

type Product = {
  id: string;
  name: string;
  category: string;
  basePrice: number;
  images: string[];
  variants: Variant[];
};

type OrderItem = {
  id: string;
  quantity: number;
  priceAtPurchase: number;
  variant: Variant & { product: Product };
};

type Order = {
  id: string;
  customerName: string;
  customerPhone: string;
  deliverySubCity: string;
  deliveryWoreda: string;
  deliveryLandmark: string;
  totalAmount: number;
  chapaReference: string;
  paymentStatus: "PENDING" | "PAID" | "FAILED";
  fulfillmentStatus: "UNFULFILLED" | "DELIVERED";
  createdAt: string;
  orderItems: OrderItem[];
};

export default function AdminDashboardClient() {
  const searchParams = useSearchParams();
  const tab = searchParams.get("tab") || "overview";

  const [orders, setOrders] = useState<Order[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        const [ordersRes, productsRes] = await Promise.all([
          fetch("/api/admin/orders"),
          fetch("/api/admin/products"),
        ]);

        if (ordersRes.ok) setOrders(await ordersRes.json());
        if (productsRes.ok) setProducts(await productsRes.json());
      } catch (err) {
        console.error("Failed to fetch admin data:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  const handleStockUpdate = async (variantId: string, newStock: number) => {
    try {
      const res = await fetch("/api/admin/products", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ variantId, stockQuantity: newStock }),
      });

      if (res.ok) {
        setProducts((prev) =>
          prev.map((p) => ({
            ...p,
            variants: p.variants.map((v) =>
              v.id === variantId ? { ...v, stockQuantity: newStock } : v
            ),
          }))
        );
      }
    } catch (err) {
      console.error("Failed to update stock:", err);
    }
  };

  const handleDeleteProduct = async (id: string) => {
    if (!confirm("Are you sure you want to delete this product?")) return;
    try {
      const res = await fetch(`/api/admin/products?id=${id}`, { method: "DELETE" });
      if (res.ok) setProducts(prev => prev.filter(p => p.id !== id));
    } catch (err) {
      console.error("Failed to delete product:", err);
    }
  };

  const handleAddProduct = async (newProduct: Partial<Product>) => {
    try {
      const res = await fetch("/api/admin/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newProduct),
      });
      if (res.ok) {
        const added = await res.json();
        setProducts(prev => [added, ...prev]);
        return true;
      }
    } catch (err) {
      console.error("Failed to add product:", err);
    }
    return false;
  };

  const [isAdding, setIsAdding] = useState(false);

  const paidOrders = orders.filter((o) => o.paymentStatus === "PAID");
  const totalRevenue = paidOrders.reduce((acc, o) => acc + o.totalAmount, 0);
  const totalStock = products.reduce(
    (acc, p) => acc + p.variants.reduce((vAcc, v) => vAcc + v.stockQuantity, 0),
    0
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-widest animate-pulse">
          Loading...
        </p>
      </div>
    );
  }

  return (
    <>
      {/* Overview Tab */}
      {(tab === "overview" || (!tab)) && (
        <>
          <div className="flex justify-between items-end border-b border-surface-variant pb-8 mb-12">
            <div>
              <h2 className="font-headline-lg text-headline-lg text-on-background">
                Dashboard
              </h2>
              <p className="font-body-md text-body-md text-on-surface-variant mt-2">
                Overview of your boutique's performance.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="bg-surface-container-low p-8 rounded-lg border border-surface-variant">
              <p className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-widest mb-2">
                Total Orders
              </p>
              <p className="font-headline-lg text-headline-lg text-on-background">
                {orders.length}
              </p>
            </div>
            <div className="bg-surface-container-low p-8 rounded-lg border border-surface-variant">
              <p className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-widest mb-2">
                Revenue (Paid)
              </p>
              <p className="font-headline-lg text-headline-lg text-on-background">
                ETB {totalRevenue.toLocaleString()}
              </p>
            </div>
            <div className="bg-surface-container-low p-8 rounded-lg border border-surface-variant">
              <p className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-widest mb-2">
                Total Stock Units
              </p>
              <p className="font-headline-lg text-headline-lg text-on-background">
                {totalStock}
              </p>
            </div>
          </div>

          {/* Recent Orders */}
          <div className="border-b border-surface-variant pb-4 mb-8">
            <h3 className="font-headline-md text-headline-md text-on-background">
              Recent Orders
            </h3>
          </div>
          <OrdersTable orders={orders.slice(0, 5)} />
        </>
      )}

      {/* Products Tab */}
      {tab === "products" && (
        <>
          <div className="flex justify-between items-end border-b border-surface-variant pb-8 mb-12">
            <div>
              <h2 className="font-headline-lg text-headline-lg text-on-background">
                Products
              </h2>
              <p className="font-body-md text-body-md text-on-surface-variant mt-2">
                Manage your inventory and catalog offerings.
              </p>
            </div>
            <button
              onClick={() => setIsAdding(true)}
              className="bg-ink text-surface-elevated px-6 py-2.5 rounded-full font-medium text-[13px] hover:bg-accent transition-colors"
            >
              Add Product
            </button>
          </div>
          {isAdding && (
            <AddProductModal onClose={() => setIsAdding(false)} onAdd={handleAddProduct} />
          )}
          <ProductsTable products={products} onStockUpdate={handleStockUpdate} onDelete={handleDeleteProduct} />
        </>
      )}

      {/* Orders Tab */}
      {tab === "orders" && (
        <>
          <div className="flex justify-between items-end border-b border-surface-variant pb-8 mb-12">
            <div>
              <h2 className="font-headline-lg text-headline-lg text-on-background">
                Orders
              </h2>
              <p className="font-body-md text-body-md text-on-surface-variant mt-2">
                View and manage all customer orders.
              </p>
            </div>
          </div>
          <OrdersTable orders={orders} />
        </>
      )}
    </>
  );
}

/* ─────────────── Sub-components ─────────────── */

function OrdersTable({ orders }: { orders: Order[] }) {
  if (orders.length === 0) {
    return (
      <div className="text-center py-16">
        <p className="font-body-md text-body-md text-on-surface-variant">
          No orders yet.
        </p>
      </div>
    );
  }

  return (
    <div className="w-full overflow-x-auto">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr>
            <th className="font-label-sm text-label-sm text-on-surface-variant uppercase pb-4 border-b border-surface-variant font-semibold">
              Order ID
            </th>
            <th className="font-label-sm text-label-sm text-on-surface-variant uppercase pb-4 border-b border-surface-variant font-semibold">
              Customer
            </th>
            <th className="font-label-sm text-label-sm text-on-surface-variant uppercase pb-4 border-b border-surface-variant font-semibold">
              Items
            </th>
            <th className="font-label-sm text-label-sm text-on-surface-variant uppercase pb-4 border-b border-surface-variant font-semibold">
              Total
            </th>
            <th className="font-label-sm text-label-sm text-on-surface-variant uppercase pb-4 border-b border-surface-variant font-semibold">
              Payment
            </th>
            <th className="font-label-sm text-label-sm text-on-surface-variant uppercase pb-4 border-b border-surface-variant font-semibold">
              Fulfillment
            </th>
            <th className="font-label-sm text-label-sm text-on-surface-variant uppercase pb-4 border-b border-surface-variant font-semibold text-right">
              Date
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-surface-variant">
          {orders.map((order) => (
            <tr key={order.id} className="group hover:bg-surface-container-low transition-colors">
              <td className="py-4 font-body-md text-body-md text-on-background font-mono text-xs">
                {order.id.slice(0, 8)}...
              </td>
              <td className="py-4">
                <span className="font-body-md text-body-md text-on-background block">
                  {order.customerName}
                </span>
                <span className="font-label-sm text-label-sm text-on-surface-variant block mt-1">
                  {order.customerPhone}
                </span>
              </td>
              <td className="py-4 font-body-md text-body-md text-on-background">
                {order.orderItems.length} item(s)
              </td>
              <td className="py-4 font-body-md text-body-md text-on-background">
                ETB {order.totalAmount.toLocaleString()}
              </td>
              <td className="py-4">
                <span
                  className={`inline-block px-3 py-1 font-label-sm text-label-sm rounded-full uppercase ${
                    order.paymentStatus === "PAID"
                      ? "bg-green-100 text-green-800"
                      : order.paymentStatus === "FAILED"
                      ? "bg-red-100 text-red-800"
                      : "bg-yellow-100 text-yellow-800"
                  }`}
                >
                  {order.paymentStatus}
                </span>
              </td>
              <td className="py-4">
                <span
                  className={`inline-block px-3 py-1 font-label-sm text-label-sm rounded-full uppercase ${
                    order.fulfillmentStatus === "DELIVERED"
                      ? "bg-green-100 text-green-800"
                      : "bg-surface-container text-on-surface"
                  }`}
                >
                  {order.fulfillmentStatus}
                </span>
              </td>
              <td className="py-4 font-body-md text-body-md text-on-surface-variant text-right">
                {new Date(order.createdAt).toLocaleDateString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function ProductsTable({
  products,
  onStockUpdate,
  onDelete,
}: {
  products: Product[];
  onStockUpdate: (variantId: string, stock: number) => void;
  onDelete: (id: string) => void;
}) {
  const [expandedProduct, setExpandedProduct] = useState<string | null>(null);

  if (products.length === 0) {
    return (
      <div className="text-center py-16">
        <p className="font-body-md text-body-md text-on-surface-variant">
          No products in the catalog. Add products via the database.
        </p>
      </div>
    );
  }

  return (
    <div className="w-full">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr>
            <th className="font-label-sm text-label-sm text-on-surface-variant uppercase pb-4 border-b border-surface-variant font-semibold w-24">
              Image
            </th>
            <th className="font-label-sm text-label-sm text-on-surface-variant uppercase pb-4 border-b border-surface-variant font-semibold pl-4">
              Name
            </th>
            <th className="font-label-sm text-label-sm text-on-surface-variant uppercase pb-4 border-b border-surface-variant font-semibold w-32">
              Total Stock
            </th>
            <th className="font-label-sm text-label-sm text-on-surface-variant uppercase pb-4 border-b border-surface-variant font-semibold w-32">
              Price
            </th>
            <th className="font-label-sm text-label-sm text-on-surface-variant uppercase pb-4 border-b border-surface-variant font-semibold w-40 text-right">
              Status
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-surface-variant">
          {products.map((product) => {
            const totalStock = product.variants.reduce(
              (acc, v) => acc + v.stockQuantity,
              0
            );
            const isExpanded = expandedProduct === product.id;

            return (
              <tr key={product.id} className="group">
                <td colSpan={5} className="p-0">
                  <div
                    className="flex items-center hover:bg-surface-container-low transition-colors cursor-pointer py-6"
                    onClick={() =>
                      setExpandedProduct(isExpanded ? null : product.id)
                    }
                  >
                    <div className="w-24 pr-4">
                      <div className="w-16 h-20 bg-surface-container border border-surface-variant flex items-center justify-center overflow-hidden">
                        {product.images[0] ? (
                          <img
                            alt={product.name}
                            className="w-full h-full object-cover object-center"
                            src={product.images[0]}
                          />
                        ) : (
                          <span className="material-symbols-outlined text-on-surface-variant">
                            image
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="flex-1 pl-4">
                      <span className="font-body-md text-body-md text-on-background font-medium block">
                        {product.name}
                      </span>
                      <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-widest mt-1 block">
                        {product.category}
                      </span>
                    </div>
                    <div className="w-32 font-body-md text-body-md text-on-background">
                      {totalStock}
                    </div>
                    <div className="w-32 font-body-md text-body-md text-on-background">
                      ETB {product.basePrice.toLocaleString()}
                    </div>
                    <div className="w-40 text-right">
                      <span
                        className={`inline-block px-3 py-1 font-label-sm text-label-sm rounded-full uppercase ${
                          totalStock > 0
                            ? "bg-surface-container text-on-surface"
                            : "bg-surface-variant text-on-surface-variant"
                        }`}
                      >
                        {totalStock > 0 ? "In Stock" : "Out of Stock"}
                      </span>
                    </div>
                  </div>

                  {/* Expanded Variant Editor */}
                  {isExpanded && (
                    <div className="bg-surface-container-low px-8 py-6 border-t border-surface-variant">
                      <h4 className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-widest mb-4">
                        Variant Inventory
                      </h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {product.variants.map((v) => (
                          <div
                            key={v.id}
                            className="flex items-center justify-between bg-surface-container-lowest p-4 rounded border border-surface-variant"
                          >
                            <div>
                              <span className="font-body-md text-body-md text-on-background block">
                                {v.size} / {v.color}
                              </span>
                            </div>
                            <div className="flex items-center gap-2">
                              <button
                                className="w-8 h-8 flex items-center justify-center border border-outline-variant rounded hover:bg-surface-container transition-colors"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  if (v.stockQuantity > 0)
                                    onStockUpdate(v.id, v.stockQuantity - 1);
                                }}
                              >
                                −
                              </button>
                              <span className="w-8 text-center font-body-md text-body-md text-on-background">
                                {v.stockQuantity}
                              </span>
                              <button
                                className="w-8 h-8 flex items-center justify-center border border-outline-variant rounded hover:bg-surface-container transition-colors"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  onStockUpdate(v.id, v.stockQuantity + 1);
                                }}
                              >
                                +
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                      <div className="mt-6 flex justify-end">
                        <button
                          onClick={() => onDelete(product.id)}
                          className="text-red-500 hover:text-red-700 text-sm font-medium transition-colors"
                        >
                          Delete Product
                        </button>
                      </div>
                    </div>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

const ADMIN_CATEGORIES = ["Tops", "Bottoms", "Shoes", "Accessories", "Outerwear"];
const CLOTHING_SIZES = ["XS", "S", "M", "L", "XL", "XXL"];
const SHOE_SIZES = ["36", "37", "38", "39", "40", "41", "42", "43", "44"];
const COLOR_PRESETS = ["Black", "White", "Beige", "Brown", "Gold", "Red", "Blue", "Navy", "Green", "Pink"];

type VariantRow = { size: string; color: string; stock: string };

function AddProductModal({ onClose, onAdd }: { onClose: () => void, onAdd: (p: any) => Promise<boolean> }) {
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [category, setCategory] = useState("Tops");
  const [basePrice, setBasePrice] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [variants, setVariants] = useState<VariantRow[]>([{ size: "M", color: "Black", stock: "10" }]);

  const sizeOptions = category === "Shoes" ? SHOE_SIZES : category === "Accessories" ? ["OS"] : CLOTHING_SIZES;

  // Update variant sizes when category changes
  const handleCategoryChange = (cat: string) => {
    setCategory(cat);
    const defaultSize = cat === "Shoes" ? "38" : cat === "Accessories" ? "OS" : "M";
    setVariants(prev => prev.map(v => ({ ...v, size: defaultSize })));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const addVariant = () => {
    const defaultSize = category === "Shoes" ? "38" : category === "Accessories" ? "OS" : "M";
    setVariants([...variants, { size: defaultSize, color: "Black", stock: "10" }]);
  };

  const removeVariant = (idx: number) => {
    if (variants.length <= 1) return;
    setVariants(variants.filter((_, i) => i !== idx));
  };

  const updateVariant = (idx: number, field: keyof VariantRow, value: string) => {
    setVariants(prev => prev.map((v, i) => i === idx ? { ...v, [field]: value } : v));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    let imageUrl = "";
    // Upload image first
    if (imageFile) {
      const fd = new FormData();
      fd.append("file", imageFile);
      try {
        const uploadRes = await fetch("/api/admin/upload", { method: "POST", body: fd });
        const uploadData = await uploadRes.json();
        if (uploadData.url) imageUrl = uploadData.url;
      } catch { /* ignore */ }
    }

    const success = await onAdd({
      name,
      category,
      basePrice: Number(basePrice),
      images: imageUrl ? [imageUrl] : [],
      variants: variants.map(v => ({
        size: v.size,
        color: v.color,
        stockQuantity: Number(v.stock)
      }))
    });
    setLoading(false);
    if (success) onClose();
  };

  const inputClass = "w-full border-b border-edge py-2.5 outline-none text-ink text-sm bg-transparent focus:border-accent transition-colors";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="bg-surface-elevated p-8 rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
        <h3 className="text-xl font-medium mb-6 text-ink">Add New Product</h3>
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          {/* Name */}
          <input required type="text" placeholder="Product Name" className={inputClass} value={name} onChange={e => setName(e.target.value)} />

          {/* Category Dropdown */}
          <div>
            <label className="text-[11px] font-medium uppercase tracking-wider text-ink-tertiary block mb-1">Category</label>
            <select value={category} onChange={e => handleCategoryChange(e.target.value)} className={inputClass}>
              {ADMIN_CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>

          {/* Price */}
          <input required type="number" placeholder="Base Price (ETB)" className={inputClass} value={basePrice} onChange={e => setBasePrice(e.target.value)} />

          {/* Image Upload */}
          <div>
            <label className="text-[11px] font-medium uppercase tracking-wider text-ink-tertiary block mb-2">Product Image</label>
            <div className="flex items-center gap-4">
              {imagePreview && (
                <div className="w-16 h-20 rounded-lg overflow-hidden bg-surface-muted flex-shrink-0">
                  <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                </div>
              )}
              <label className="flex-1 border-2 border-dashed border-edge rounded-xl px-4 py-6 text-center cursor-pointer hover:border-accent transition-colors">
                <span className="material-symbols-outlined text-ink-tertiary text-[24px] block mb-1">cloud_upload</span>
                <span className="text-[12px] text-ink-secondary">{imageFile ? imageFile.name : "Choose a file"}</span>
                <input type="file" accept="image/*" className="hidden" onChange={handleFileChange} />
              </label>
            </div>
          </div>

          {/* Variants */}
          <div>
            <div className="flex justify-between items-center mb-3">
              <label className="text-[11px] font-medium uppercase tracking-wider text-ink-tertiary">Variants</label>
              <button type="button" onClick={addVariant} className="text-[12px] text-accent hover:underline">+ Add Variant</button>
            </div>
            <div className="flex flex-col gap-3">
              {variants.map((v, idx) => (
                <div key={idx} className="flex items-end gap-2 bg-surface-subtle rounded-xl p-3">
                  {/* Size */}
                  <div className="flex-1">
                    <label className="text-[10px] text-ink-tertiary block mb-1">{category === "Shoes" ? "Shoe Size" : "Size"}</label>
                    <select value={v.size} onChange={e => updateVariant(idx, "size", e.target.value)} className="w-full bg-transparent border-b border-edge py-1.5 text-sm text-ink outline-none">
                      {sizeOptions.map(s => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </div>
                  {/* Color */}
                  <div className="flex-1">
                    <label className="text-[10px] text-ink-tertiary block mb-1">Color</label>
                    <input type="text" value={v.color} onChange={e => updateVariant(idx, "color", e.target.value)} className="w-full bg-transparent border-b border-edge py-1.5 text-sm text-ink outline-none" list={`colors-${idx}`} />
                    <datalist id={`colors-${idx}`}>
                      {COLOR_PRESETS.map(c => <option key={c} value={c} />)}
                    </datalist>
                  </div>
                  {/* Stock */}
                  <div className="w-16">
                    <label className="text-[10px] text-ink-tertiary block mb-1">Stock</label>
                    <input type="number" value={v.stock} onChange={e => updateVariant(idx, "stock", e.target.value)} className="w-full bg-transparent border-b border-edge py-1.5 text-sm text-ink outline-none" />
                  </div>
                  {/* Remove */}
                  {variants.length > 1 && (
                    <button type="button" onClick={() => removeVariant(idx)} className="text-red-400 hover:text-red-600 pb-1.5 text-lg leading-none">×</button>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-4 mt-4">
            <button type="button" onClick={onClose} className="flex-1 py-3 text-ink-secondary hover:text-ink transition-colors">Cancel</button>
            <button type="submit" disabled={loading} className="flex-1 py-3 bg-ink text-surface-elevated rounded-full hover:bg-accent transition-colors disabled:opacity-50">
              {loading ? "Saving..." : "Save Product"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}


