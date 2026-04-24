import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-white dark:bg-black text-black dark:text-white font-['Inter'] text-[12px] tracking-wider uppercase w-full pt-20 pb-10 border-t border-zinc-100 dark:border-zinc-900 flat max-w-[1440px] mx-auto px-8 flex flex-col md:flex-row justify-between items-center gap-8 transition-all mt-auto">
      <div className="flex items-center gap-8 flex-col md:flex-row">
        <span className="text-sm font-bold active:scale-[0.98] transition-transform duration-200">ESSENTIAL</span>
        <div className="flex gap-6">
          <Link className="text-zinc-400 hover:text-black dark:hover:text-white transition-colors hover:underline underline-offset-4" href="#">About</Link>
          <Link className="text-zinc-400 hover:text-black dark:hover:text-white transition-colors hover:underline underline-offset-4" href="#">Shipping</Link>
          <Link className="text-zinc-400 hover:text-black dark:hover:text-white transition-colors hover:underline underline-offset-4" href="#">Returns</Link>
          <Link className="text-zinc-400 hover:text-black dark:hover:text-white transition-colors hover:underline underline-offset-4" href="#">Contact</Link>
        </div>
      </div>
      <div className="text-zinc-400">
        © {new Date().getFullYear()} ESSENTIAL. ALL RIGHTS RESERVED.
      </div>
    </footer>
  );
}
