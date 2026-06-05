import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { isUserAdmin } from '@/lib/admin-check';
import AdminDashboardContent from '@/components/AdminDashboardContent';

export const dynamic = "force-dynamic";

export default async function AdminDashboard() {
  const dfm = cookies().get("dfm_session")?.value;
  if (!dfm) {
    redirect("/login?next=/admin");
  }

  const isAdmin = await isUserAdmin(dfm);
  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="bg-red-500/10 border border-red-500/30 backdrop-blur-sm rounded-xl p-8 text-center">
            <div className="text-red-400 text-4xl mb-3">🔒</div>
            <h1 className="text-2xl font-bold text-red-200 mb-2">Access Denied</h1>
            <p className="text-red-300">You do not have permission to access the admin panel.</p>
          </div>
        </div>
      </div>
    );
  }

  return <AdminDashboardContent userId={dfm} />;
}
