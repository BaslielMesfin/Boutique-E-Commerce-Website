import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import AdminLoginForm from "@/components/ui/AdminLoginForm";

export default async function AdminPage() {
  const cookieStore = await cookies();
  const token = cookieStore.get("admin_token");

  if (token?.value === process.env.ADMIN_SECRET) {
    redirect("/admin/dashboard");
  }

  return <AdminLoginForm />;
}
