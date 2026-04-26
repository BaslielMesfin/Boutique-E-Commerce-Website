import Link from "next/link";

export default async function CheckoutSuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ ref?: string }>;
}) {
  const { ref: reference = "N/A" } = await searchParams;

  return (
    <div className="flex-1 flex items-center justify-center px-6 py-24">
      <div className="max-w-sm text-center">
        <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-success flex items-center justify-center">
          <span className="material-symbols-outlined text-white text-[28px]">check</span>
        </div>

        <h1 className="text-[24px] font-medium text-ink mb-3">
          Payment Successful
        </h1>
        <p className="text-[15px] text-ink-secondary mb-2 leading-relaxed">
          Thank you for your order. We&apos;ll be in touch shortly.
        </p>
        <p className="text-[12px] text-ink-tertiary uppercase tracking-[0.1em] mb-10">
          Ref: {reference}
        </p>

        <Link
          href="/"
          className="inline-flex items-center gap-2 bg-ink text-surface-elevated text-[13px] font-medium px-7 py-3 rounded-full hover:bg-accent transition-colors"
        >
          Continue Shopping
          <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
        </Link>
      </div>
    </div>
  );
}
