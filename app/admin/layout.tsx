import Link from "next/link";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

async function isAuthenticated() {
  const cookieStore = await cookies();
  const token = cookieStore.get("admin_token");
  return token?.value === process.env.ADMIN_SECRET;
}

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const authed = await isAuthenticated();

  // Allow login page to render without auth
  // The middleware approach is cleaner, but for simplicity we check here
  // and the login page itself will handle its own rendering

  return (
    <div className="flex h-screen overflow-hidden bg-background text-on-background font-body-md text-body-md antialiased">
      {authed ? (
        <>
          {/* Sidebar */}
          <aside className="h-screen w-64 border-r border-zinc-200 bg-zinc-50 flex flex-col p-6 space-y-2 flex-shrink-0">
            <div className="mb-12 mt-4 px-3">
              <h1 className="font-bold text-lg text-black font-['Inter'] text-sm tracking-widest uppercase">
                Admin Panel
              </h1>
              <p className="font-label-sm text-label-sm text-zinc-500 mt-2 uppercase tracking-widest">
                Management Console
              </p>
            </div>
            <nav className="flex-1 flex flex-col space-y-2">
              <Link
                className="flex items-center gap-4 px-3 py-2.5 text-zinc-500 hover:bg-zinc-200 rounded-[4px] transition-all duration-200 font-['Inter'] text-sm"
                href="/admin/dashboard"
              >
                <span className="material-symbols-outlined text-[20px]">grid_view</span>
                Overview
              </Link>
              <Link
                className="flex items-center gap-4 px-3 py-2.5 text-zinc-500 hover:bg-zinc-200 rounded-[4px] transition-all duration-200 font-['Inter'] text-sm"
                href="/admin/dashboard?tab=products"
              >
                <span className="material-symbols-outlined text-[20px]">inventory_2</span>
                Products
              </Link>
              <Link
                className="flex items-center gap-4 px-3 py-2.5 text-zinc-500 hover:bg-zinc-200 rounded-[4px] transition-all duration-200 font-['Inter'] text-sm"
                href="/admin/dashboard?tab=orders"
              >
                <span className="material-symbols-outlined text-[20px]">shopping_cart</span>
                Orders
              </Link>
            </nav>
            <div className="border-t border-zinc-200 pt-4">
              <form action="/api/admin/logout" method="POST">
                <button
                  type="submit"
                  className="flex items-center gap-4 px-3 py-2.5 text-zinc-500 hover:bg-zinc-200 rounded-[4px] transition-all duration-200 font-['Inter'] text-sm w-full"
                >
                  <span className="material-symbols-outlined text-[20px]">logout</span>
                  Logout
                </button>
              </form>
            </div>
          </aside>
          {/* Main Content */}
          <main className="flex-1 overflow-y-auto bg-background px-[48px] py-12">
            <div className="max-w-[1440px] mx-auto">{children}</div>
          </main>
        </>
      ) : (
        <main className="flex-1 flex items-center justify-center">
          {children}
        </main>
      )}
    </div>
  );
}
