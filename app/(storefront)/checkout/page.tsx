"use client";

import { useState } from "react";
import Image from "next/image";

export default function CheckoutPage() {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    subCity: "",
    woreda: "",
    instructions: ""
  });

  // Mock cart item for demonstration based on our previous fallback
  const mockCartItem = {
    variantId: "v1", // Note: Ensure this exists in the DB if you run an actual payment test
    name: "Essential Trench Coat",
    size: "S",
    color: "Midnight",
    price: 14500,
    quantity: 1,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAGszCDr_gDnn7Zjxv6du_zwnQp_tzD2xIt3D9tJACWLHSEUCYC4bwmdswoeRvSlYFyLb0Vlj6e0817cbVq9VRyJD76oDc0Jr4dxubhaqMkPjTFT8UIyHWvHqCGaQnYQ6hWIIElgvZP42G4V0_tQYd1hTF_Ac9Nle_2vkwLVlX8QvHgzq15NtDNE3Sh2hUSV1Fh6sqmDsjGmpNsW8n5ok_7GWgcuN5zBiuUDiR8ybq0yMS3PrluPARDd2R3iLi8Pb6wEwW5XJC1RtYa"
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCheckout = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customerName: formData.fullName,
          customerPhone: `+251${formData.phone}`,
          deliverySubCity: formData.subCity,
          deliveryWoreda: formData.woreda,
          deliveryLandmark: formData.instructions,
          items: [
            {
              variantId: mockCartItem.variantId,
              quantity: mockCartItem.quantity
            }
          ]
        })
      });

      const data = await response.json();

      if (data.checkoutUrl) {
        window.location.href = data.checkoutUrl;
      } else {
        alert(data.error || "Payment initialization failed. Please try again.");
      }
    } catch (error) {
      console.error("Checkout Error:", error);
      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="max-w-container-max mx-auto px-8 py-section-gap grid grid-cols-1 md:grid-cols-12 gap-gutter min-h-screen">
      <div className="md:col-span-7 flex flex-col pt-8">
         <h1 className="font-headline-lg text-headline-lg text-on-background mb-10">Checkout</h1>
         
         <form onSubmit={handleCheckout} className="flex flex-col gap-8 max-w-xl">
            <h3 className="font-label-sm text-label-sm text-on-surface-variant tracking-widest uppercase border-b border-outline-variant pb-2">Delivery Details</h3>
            
            <div className="relative">
              <label className="font-label-sm text-label-sm text-on-surface uppercase tracking-widest block mb-2" htmlFor="fullName">Full Name</label>
              <input 
                required
                className="w-full bg-transparent border-0 border-b border-outline-variant px-0 py-2 font-body-md text-body-md text-on-surface focus:ring-0 focus:border-primary transition-colors placeholder:text-on-surface-variant/40" 
                id="fullName" 
                name="fullName" 
                value={formData.fullName}
                onChange={handleInputChange}
                placeholder="e.g. Abebe Kebede" 
                type="text"
              />
            </div>

            <div className="relative">
              <label className="font-label-sm text-label-sm text-on-surface uppercase tracking-widest block mb-2" htmlFor="phone">Phone Number</label>
              <div className="flex items-end">
                <span className="font-body-md text-body-md text-on-surface-variant py-2 pr-2 border-b border-outline-variant">+251</span>
                <input 
                  required
                  className="w-full bg-transparent border-0 border-b border-outline-variant px-0 py-2 font-body-md text-body-md text-on-surface focus:ring-0 focus:border-primary transition-colors placeholder:text-on-surface-variant/40" 
                  id="phone" 
                  name="phone" 
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="911 234 567" 
                  type="tel"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="relative">
                <label className="font-label-sm text-label-sm text-on-surface uppercase tracking-widest block mb-2" htmlFor="subCity">Sub City</label>
                <input 
                  required
                  className="w-full bg-transparent border-0 border-b border-outline-variant px-0 py-2 font-body-md text-body-md text-on-surface focus:ring-0 focus:border-primary transition-colors placeholder:text-on-surface-variant/40" 
                  id="subCity" 
                  name="subCity" 
                  value={formData.subCity}
                  onChange={handleInputChange}
                  placeholder="Bole" 
                  type="text"
                />
              </div>
              <div className="relative">
                <label className="font-label-sm text-label-sm text-on-surface uppercase tracking-widest block mb-2" htmlFor="woreda">Woreda</label>
                <input 
                  required
                  className="w-full bg-transparent border-0 border-b border-outline-variant px-0 py-2 font-body-md text-body-md text-on-surface focus:ring-0 focus:border-primary transition-colors placeholder:text-on-surface-variant/40" 
                  id="woreda" 
                  name="woreda" 
                  value={formData.woreda}
                  onChange={handleInputChange}
                  placeholder="03" 
                  type="text"
                />
              </div>
            </div>

            <div className="relative mt-2">
              <label className="font-label-sm text-label-sm text-on-surface uppercase tracking-widest block mb-2" htmlFor="instructions">Nearest Landmark / Delivery Instructions</label>
              <textarea 
                required
                className="w-full bg-transparent border-0 border-b border-outline-variant px-0 py-2 font-body-md text-body-md text-on-surface focus:ring-0 focus:border-primary transition-colors resize-none placeholder:text-on-surface-variant/40" 
                id="instructions" 
                name="instructions" 
                value={formData.instructions}
                onChange={handleInputChange}
                placeholder="Specific directions, gate codes, etc." 
                rows={3}
              ></textarea>
            </div>

            <button 
              type="submit"
              disabled={loading}
              className={`w-full h-14 rounded-lg flex items-center justify-center gap-2 mt-8 transition-opacity ${loading ? 'bg-surface-dim text-on-surface cursor-not-allowed' : 'bg-primary text-on-primary hover:opacity-90 active:scale-[0.98]'}`}
            >
              <span className="font-label-sm text-label-sm uppercase tracking-widest">{loading ? 'Processing...' : 'Pay with Chapa'}</span>
              {!loading && <span className="material-symbols-outlined text-[18px]">arrow_forward</span>}
            </button>
         </form>
      </div>

      <div className="md:col-span-5 bg-surface-container-low p-8 rounded-lg h-fit sticky top-24 mt-8 md:mt-0">
        <h3 className="font-headline-md text-headline-md text-on-surface mb-8">Order Summary</h3>
        
        <div className="flex gap-6 mb-8 pb-8 border-b border-outline-variant">
          <div className="w-[100px] h-[140px] bg-surface flex-none relative">
            <img 
              alt={mockCartItem.name} 
              className="w-full h-full object-cover mix-blend-multiply" 
              src={mockCartItem.image}
            />
          </div>
          <div className="flex-1 flex flex-col justify-between py-1">
            <div>
              <h3 className="font-body-lg text-body-lg text-on-surface mb-1">{mockCartItem.name}</h3>
              <p className="font-body-md text-body-md text-on-surface-variant">Size: {mockCartItem.size}</p>
              <p className="font-body-md text-body-md text-on-surface-variant">Color: {mockCartItem.color}</p>
              <p className="font-body-md text-body-md text-on-surface-variant mt-2">Qty: {mockCartItem.quantity}</p>
            </div>
          </div>
        </div>
        
        <div className="flex justify-between items-end mb-2">
          <span className="font-body-md text-body-md text-on-surface-variant">Subtotal</span>
          <span className="font-body-lg text-body-lg text-on-surface">ETB {mockCartItem.price.toLocaleString()}</span>
        </div>
        <div className="flex justify-between items-end mb-6 pb-6 border-b border-outline-variant">
          <span className="font-body-md text-body-md text-on-surface-variant">Shipping</span>
          <span className="font-body-lg text-body-lg text-on-surface">Calculated at delivery</span>
        </div>
        <div className="flex justify-between items-end">
          <span className="font-body-lg text-body-lg font-bold text-on-surface">Total</span>
          <span className="font-headline-md text-headline-md text-on-surface">ETB {mockCartItem.price.toLocaleString()}</span>
        </div>
      </div>
    </main>
  );
}
