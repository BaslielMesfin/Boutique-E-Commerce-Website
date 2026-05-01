"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

type CartItem = {
  variantId: string;
  name: string;
  size: string;
  color: string;
  price: number;
  quantity: number;
  image: string;
};

const SUB_CITIES = [
  "Addis Ketema", "Akaky Kaliti", "Arada", "Bole", "Gulele", 
  "Kirkos", "Kolfe Keranio", "Lemi Kura", "Lideta", "Nifas Silk-Lafto", "Yeka"
];

export default function CheckoutPage() {
  const [loading, setLoading] = useState(false);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    subCity: "",
    woreda: "",
    instructions: "",
  });

  useEffect(() => {
    // Read from Buy Now item
    const buyNow = localStorage.getItem("habesha_buynow");
    if (buyNow) {
      try {
        const parsed = JSON.parse(buyNow);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setCartItems(parsed);
          return;
        }
      } catch { /* ignore */ }
    }
    // No item to buy — redirect back
    window.location.href = "/products";
  }, []);

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customerName: formData.fullName,
          customerPhone: `+251${formData.phone}`,
          deliverySubCity: formData.subCity,
          deliveryWoreda: formData.woreda,
          deliveryLandmark: formData.instructions || undefined,
          items: cartItems.map(item => ({ variantId: item.variantId, quantity: item.quantity })),
        }),
      });
      const data = await res.json();
      if (data.checkoutUrl) {
        localStorage.removeItem("habesha_buynow");
        window.location.href = data.checkoutUrl;
      } else {
        alert(data.error || "Payment failed. Please try again.");
      }
    } catch {
      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  if (cartItems.length === 0) return null; // loading or redirecting

  return (
    <div className="max-w-[1200px] mx-auto px-6 py-16 grid grid-cols-1 lg:grid-cols-12 gap-12 min-h-[70vh]">

      {/* Form */}
      <div className="lg:col-span-7">
        <nav className="flex items-center gap-2 text-[12px] text-ink-tertiary mb-8">
          <Link href="/" className="hover:text-ink transition-colors">Home</Link>
          <span>/</span>
          <span className="text-ink-secondary">Checkout</span>
        </nav>

        <h1 className="text-[28px] font-medium text-ink mb-10">Checkout</h1>

        <form onSubmit={onSubmit} className="flex flex-col gap-7 max-w-lg">
          <p className="text-[12px] font-medium uppercase tracking-[0.1em] text-ink-secondary">
            Delivery details
          </p>

          <div>
            <label className="text-[12px] text-ink-secondary block mb-2" htmlFor="fullName">Full Name</label>
            <input
              required id="fullName" name="fullName" type="text"
              value={formData.fullName} onChange={onChange}
              placeholder="e.g. Abebe Kebede"
              className="w-full bg-transparent border-b border-edge px-0 py-2.5 text-[14px] text-ink focus:outline-none focus:border-accent transition-colors placeholder:text-ink-tertiary"
            />
          </div>

          <div>
            <label className="text-[12px] text-ink-secondary block mb-2" htmlFor="phone">Phone</label>
            <div className="flex items-end">
              <span className="text-[14px] text-ink-secondary py-2.5 pr-2 border-b border-edge">+251</span>
              <input
                required id="phone" name="phone" type="tel"
                value={formData.phone} onChange={onChange}
                placeholder="911 234 567"
                className="flex-1 bg-transparent border-b border-edge px-0 py-2.5 text-[14px] text-ink focus:outline-none focus:border-accent transition-colors placeholder:text-ink-tertiary"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-5">
            <div>
              <label className="text-[12px] text-ink-secondary block mb-2" htmlFor="subCity">Sub City</label>
              <select
                required id="subCity" name="subCity"
                value={formData.subCity} onChange={onChange}
                className="w-full bg-transparent border-b border-edge px-0 py-2.5 text-[14px] text-ink focus:outline-none focus:border-accent transition-colors"
              >
                <option value="" disabled>Select Sub City</option>
                {SUB_CITIES.map(city => (
                  <option key={city} value={city}>{city}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-[12px] text-ink-secondary block mb-2" htmlFor="woreda">Woreda</label>
              <input
                required id="woreda" name="woreda" type="text"
                value={formData.woreda} onChange={onChange}
                placeholder="e.g. 03"
                className="w-full bg-transparent border-b border-edge px-0 py-2.5 text-[14px] text-ink focus:outline-none focus:border-accent transition-colors placeholder:text-ink-tertiary"
              />
            </div>
          </div>

          <div>
            <label className="text-[12px] text-ink-secondary block mb-2" htmlFor="instructions">Delivery Instructions (Optional)</label>
            <textarea
              id="instructions" name="instructions" rows={3}
              value={formData.instructions} onChange={onChange}
              placeholder="Nearest landmark, gate code, etc."
              className="w-full bg-transparent border-b border-edge px-0 py-2.5 text-[14px] text-ink focus:outline-none focus:border-accent resize-none transition-colors placeholder:text-ink-tertiary"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-4 rounded-full text-[14px] font-medium mt-4 transition-all ${
              loading
                ? "bg-surface-muted text-ink-tertiary cursor-not-allowed"
                : "bg-ink text-surface-elevated hover:bg-accent active:scale-[0.98]"
            }`}
          >
            {loading ? "Processing…" : "Pay with Chapa"}
          </button>
        </form>
      </div>

      {/* Summary */}
      <div className="lg:col-span-5">
        <div className="bg-surface-subtle rounded-2xl p-8 sticky top-24">
          <h3 className="text-[18px] font-medium text-ink mb-6">Order Summary</h3>

          <div className="flex flex-col gap-5 mb-6 pb-6 border-b border-edge max-h-[300px] overflow-y-auto no-scrollbar">
            {cartItems.map((item, idx) => (
              <div key={idx} className="flex gap-5">
                <div className="relative w-20 h-28 bg-surface-muted rounded-xl overflow-hidden flex-shrink-0">
                  <img alt={item.name} src={item.image} className="absolute inset-0 w-full h-full object-cover object-center" />
                </div>
                <div className="flex flex-col justify-between py-1">
                  <div>
                    <h4 className="text-[14px] font-medium text-ink mb-1">{item.name}</h4>
                    <p className="text-[13px] text-ink-secondary">Size: {item.size} · {item.color}</p>
                    <p className="text-[13px] text-ink-secondary">Qty: {item.quantity}</p>
                  </div>
                  <span className="text-[14px] font-medium text-ink">ETB {(item.price * item.quantity).toLocaleString()}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-between text-[14px] mb-2">
            <span className="text-ink-secondary">Subtotal</span>
            <span className="text-ink">ETB {subtotal.toLocaleString()}</span>
          </div>
          <div className="flex justify-between text-[14px] mb-6 pb-6 border-b border-edge">
            <span className="text-ink-secondary">Shipping</span>
            <span className="text-ink-secondary">Calculated at delivery</span>
          </div>
          <div className="flex justify-between">
            <span className="text-[16px] font-semibold text-ink">Total</span>
            <span className="text-[18px] font-semibold text-ink">ETB {subtotal.toLocaleString()}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
