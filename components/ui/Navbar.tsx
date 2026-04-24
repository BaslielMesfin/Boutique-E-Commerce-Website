import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="bg-white dark:bg-black text-black dark:text-white font-['Inter'] text-[13px] tracking-[0.05em] uppercase docked full-width top-0 z-50 border-b border-zinc-200 dark:border-zinc-800 flat no-shadow flex justify-between items-center h-20 px-8 max-w-[1440px] mx-auto sticky">
      <div className="flex items-center gap-8">
        <Link className="text-xl font-bold tracking-tighter text-black dark:text-white active:scale-[0.98] transition-transform duration-200 hover:opacity-70" href="/">ESSENTIAL</Link>
        <div className="hidden md:flex gap-6 items-center">
          <Link className="text-black dark:text-white border-b border-black dark:border-white pb-1 active:scale-[0.98] transition-transform duration-200 hover:opacity-70" href="/">Collections</Link>
          <Link className="text-zinc-400 dark:text-zinc-500 hover:text-black dark:hover:text-white transition-colors active:scale-[0.98] duration-200 hover:opacity-70" href="/">New Arrivals</Link>
          <Link className="text-zinc-400 dark:text-zinc-500 hover:text-black dark:hover:text-white transition-colors active:scale-[0.98] duration-200 hover:opacity-70" href="/">Archive</Link>
          <Link className="text-zinc-400 dark:text-zinc-500 hover:text-black dark:hover:text-white transition-colors active:scale-[0.98] duration-200 hover:opacity-70" href="/">Journal</Link>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <button aria-label="search" className="text-zinc-400 dark:text-zinc-500 hover:text-black dark:hover:text-white transition-colors active:scale-[0.98] duration-200 hover:opacity-70">
          <span className="material-symbols-outlined" data-icon="search">search</span>
        </button>
        <button aria-label="person" className="text-zinc-400 dark:text-zinc-500 hover:text-black dark:hover:text-white transition-colors active:scale-[0.98] duration-200 hover:opacity-70">
          <span className="material-symbols-outlined" data-icon="person">person</span>
        </button>
        <Link href="/checkout" aria-label="shopping_bag" className="text-zinc-400 dark:text-zinc-500 hover:text-black dark:hover:text-white transition-colors active:scale-[0.98] duration-200 hover:opacity-70">
          <span className="material-symbols-outlined" data-icon="shopping_bag">shopping_bag</span>
        </Link>
      </div>
    </nav>
  );
}
