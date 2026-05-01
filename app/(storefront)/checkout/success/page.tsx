"use client";

import { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

type OrderData = {
  id: string;
  customerName: string;
  customerPhone: string;
  deliverySubCity: string;
  deliveryWoreda: string;
  totalAmount: number;
  chapaReference: string;
  paymentStatus: string;
  createdAt: string;
  items: {
    name: string;
    size: string;
    color: string;
    quantity: number;
    price: number;
    image: string;
  }[];
};

function SuccessContent() {
  const searchParams = useSearchParams();
  const ref = searchParams.get("ref");
  const [order, setOrder] = useState<OrderData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!ref) { setLoading(false); return; }
    fetch(`/api/orders/${ref}`)
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => { if (data && !data.error) setOrder(data); })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [ref]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-pulse text-ink-tertiary text-[14px]">Loading your order...</div>
      </div>
    );
  }

  return (
    <div className="max-w-[600px] mx-auto px-6 py-20 text-center">
      <div className="w-20 h-20 mx-auto mb-8 rounded-full bg-green-50 flex items-center justify-center animate-in zoom-in duration-500">
        <span className="material-symbols-outlined text-green-600 text-[42px]">check_circle</span>
      </div>

      <h1 className="text-[28px] font-medium text-ink mb-2">Order Confirmed!</h1>
      <p className="text-[15px] text-ink-secondary mb-10">
        Thank you for shopping with Habesha Store.
        {order ? " Your order details are below." : " Your payment is being processed."}
      </p>

      {order ? (
        <div className="bg-surface-subtle rounded-2xl p-8 text-left mb-8">
          <div className="flex items-center justify-between pb-5 mb-5 border-b border-edge">
            <div>
              <p className="text-[11px] font-medium uppercase tracking-[0.1em] text-ink-tertiary mb-1">Order Reference</p>
              <p className="text-[15px] font-mono font-semibold text-ink">{order.chapaReference}</p>
            </div>
            <div className={`px-3 py-1 rounded-full text-[11px] font-semibold uppercase ${
              order.paymentStatus === "PAID" ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"
            }`}>
              {order.paymentStatus}
            </div>
          </div>

          <div className="mb-5 pb-5 border-b border-edge">
            {order.items.map((item, i) => (
              <div key={i} className="flex gap-4 mb-3 last:mb-0">
                {item.image && (
                  <div className="w-14 h-18 rounded-lg overflow-hidden bg-surface-muted flex-shrink-0">
                    <img alt={item.name} src={item.image} className="w-full h-full object-cover" />
                  </div>
                )}
                <div className="flex-1">
                  <p className="text-[14px] font-medium text-ink">{item.name}</p>
                  <p className="text-[12px] text-ink-secondary">{item.size} · {item.color} · Qty: {item.quantity}</p>
                </div>
                <p className="text-[14px] font-medium text-ink">ETB {item.price.toLocaleString()}</p>
              </div>
            ))}
          </div>

          <div className="mb-5 pb-5 border-b border-edge">
            <p className="text-[11px] font-medium uppercase tracking-[0.1em] text-ink-tertiary mb-2">Delivery</p>
            <p className="text-[13px] text-ink">{order.customerName}</p>
            <p className="text-[13px] text-ink-secondary">{order.customerPhone}</p>
            <p className="text-[13px] text-ink-secondary">{order.deliverySubCity}, Woreda {order.deliveryWoreda}</p>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-[16px] font-semibold text-ink">Total</span>
            <span className="text-[20px] font-semibold text-ink">ETB {order.totalAmount.toLocaleString()}</span>
          </div>

          <p className="text-[12px] text-ink-tertiary mt-4">
            Placed on {new Date(order.createdAt).toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}
          </p>
        </div>
      ) : (
        <div className="bg-surface-subtle rounded-2xl p-8 text-left mb-8">
          {ref && (
            <div>
              <p className="text-[11px] font-medium uppercase tracking-[0.1em] text-ink-tertiary mb-1">Reference</p>
              <p className="text-[15px] font-mono font-semibold text-ink">{ref}</p>
            </div>
          )}
          <p className="text-[13px] text-ink-secondary mt-4">Your order is being processed. Please save this page or take a screenshot for your records.</p>
        </div>
      )}

      <div className="bg-blue-50 border border-blue-100 rounded-xl px-6 py-4 mb-8 text-left flex items-start gap-3">
        <span className="material-symbols-outlined text-blue-500 text-[20px] mt-0.5">photo_camera</span>
        <div>
          <p className="text-[13px] font-medium text-blue-900">Save your receipt</p>
          <p className="text-[12px] text-blue-700 mt-0.5">Take a screenshot of this page as proof of your purchase.</p>
        </div>
      </div>

      <Link href="/products" className="inline-block bg-ink text-surface-elevated px-8 py-3.5 rounded-full text-[14px] font-medium hover:bg-accent transition-colors">
        Continue Shopping
      </Link>
    </div>
  );
}

export default function CheckoutSuccessPage() {
  return (
    <Suspense fallback={
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-pulse text-ink-tertiary text-[14px]">Loading...</div>
      </div>
    }>
      <SuccessContent />
    </Suspense>
  );
}
