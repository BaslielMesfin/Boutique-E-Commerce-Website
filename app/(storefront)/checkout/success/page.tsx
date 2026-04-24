import Link from "next/link";

export default async function CheckoutSuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ ref?: string }>;
}) {
  const params = await searchParams;
  const reference = params.ref || "N/A";

  return (
    <main className="flex-grow flex items-center justify-center px-8 py-section-gap">
      <div className="max-w-md text-center">
        <div className="w-20 h-20 mx-auto mb-8 rounded-full bg-primary flex items-center justify-center">
          <span className="material-symbols-outlined text-on-primary text-[36px]">
            check
          </span>
        </div>

        <h1 className="font-headline-lg text-headline-lg text-on-background mb-4">
          Payment Successful
        </h1>
        <p className="font-body-lg text-body-lg text-on-surface-variant mb-2">
          Thank you for your order. We&apos;ll be in touch shortly.
        </p>
        <p className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-widest mb-10">
          Reference: {reference}
        </p>

        <Link
          href="/"
          className="bg-primary text-on-primary font-label-sm text-label-sm uppercase tracking-[0.1em] px-8 py-4 rounded-lg hover:bg-surface-tint transition-colors duration-300 inline-block"
        >
          Continue Shopping
        </Link>
      </div>
    </main>
  );
}
