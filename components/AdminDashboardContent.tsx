"use client";

import { useEffect, useState } from "react";
import { ChevronDown, Search, TrendingUp, Clock, CheckCircle2, XCircle } from "lucide-react";

type Transaction = {
  id: string;
  userId: string;
  courseTitle: string;
  price: number;
  utrNumber: string;
  status: string;
  createdAt: string;
};

type Stats = {
  total: number;
  pending: number;
  approved: number;
  rejected: number;
  totalRevenue: number;
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function AdminDashboardContent({ userId }: { userId: string }) {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [stats, setStats] = useState<Stats>({
    total: 0,
    pending: 0,
    approved: 0,
    rejected: 0,
    totalRevenue: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [approving, setApproving] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  async function fetchTransactions() {
    try {
      const response = await fetch("/api/transactions/list");
      if (!response.ok) throw new Error("Failed to fetch transactions");
      const data = await response.json();
      const txs = data.transactions || [];
      setTransactions(txs);

      const computedStats = {
        total: txs.length,
        pending: txs.filter((t: Transaction) => t.status === "pending").length,
        approved: txs.filter((t: Transaction) => t.status === "approved").length,
        rejected: txs.filter((t: Transaction) => t.status === "rejected").length,
        totalRevenue: txs
          .filter((t: Transaction) => t.status === "approved")
          .reduce((sum: number, t: Transaction) => sum + t.price, 0),
      };
      setStats(computedStats);
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err);
      setError(message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchTransactions();
    const interval = setInterval(fetchTransactions, 30000);
    return () => clearInterval(interval);
  }, []);

  async function handleApprove(transactionId: string) {
    if (!confirm("Are you sure you want to approve this transaction?")) return;

    setApproving(transactionId);
    try {
      const response = await fetch("/api/transactions/approve", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ transactionId, status: "approved" }),
      });

      if (!response.ok) {
        const data = await response.json().catch(() => ({}));
        throw new Error(data?.message || "Failed to approve transaction");
      }

      await fetchTransactions();
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err);
      alert(`Error: ${message}`);
    } finally {
      setApproving(null);
    }
  }

  async function handleReject(transactionId: string) {
    if (!confirm("Are you sure you want to reject this transaction?")) return;

    setApproving(transactionId);
    try {
      const response = await fetch("/api/transactions/approve", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ transactionId, status: "rejected" }),
      });

      if (!response.ok) {
        const data = await response.json().catch(() => ({}));
        throw new Error(data?.message || "Failed to reject transaction");
      }

      await fetchTransactions();
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err);
      alert(`Error: ${message}`);
    } finally {
      setApproving(null);
    }
  }

  const filteredTransactions = transactions.filter((tx) => {
    const matchesSearch =
      tx.utrNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tx.courseTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tx.userId.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === "all" || tx.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 py-8 px-4 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-400 mb-4"></div>
          <p className="text-slate-300">Loading transactions...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <h1 className="text-4xl font-bold text-white">💼 Admin Dashboard</h1>
            <div className="text-sm text-slate-400">Last updated: {new Date().toLocaleTimeString('en-IN')}</div>
          </div>
          <p className="text-slate-400">Manage payments and verify UPI transactions</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
          <StatCard
            icon="📊"
            label="Total Transactions"
            value={stats.total}
            color="from-blue-600 to-blue-800"
          />
          <StatCard
            icon={<Clock className="w-5 h-5" />}
            label="Pending"
            value={stats.pending}
            color="from-yellow-600 to-yellow-800"
            highlight={stats.pending > 0}
          />
          <StatCard
            icon={<CheckCircle2 className="w-5 h-5" />}
            label="Approved"
            value={stats.approved}
            color="from-green-600 to-green-800"
          />
          <StatCard
            icon={<XCircle className="w-5 h-5" />}
            label="Rejected"
            value={stats.rejected}
            color="from-red-600 to-red-800"
          />
          <StatCard
            icon={<TrendingUp className="w-5 h-5" />}
            label="Revenue"
            value={`₹${stats.totalRevenue}`}
            color="from-purple-600 to-purple-800"
          />
        </div>

        {/* Transactions Card */}
        <div className="bg-slate-800/40 backdrop-blur-sm border border-slate-700/50 rounded-2xl overflow-hidden shadow-2xl">
          {/* Header */}
          <div className="bg-gradient-to-r from-slate-800 to-slate-700 px-6 py-5 border-b border-slate-700/50">
            <h2 className="text-2xl font-bold text-white mb-4">Transactions</h2>

            {/* Search and Filter */}
            <div className="flex flex-col md:flex-row gap-3">
              <div className="flex-1 relative">
                <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search by UTR, Course, or User ID..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-slate-700/50 border border-slate-600/50 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/30 transition"
                />
              </div>

              <div className="relative group">
                <button className="flex items-center justify-between gap-2 px-4 py-2 bg-slate-700/50 border border-slate-600/50 rounded-lg text-white hover:bg-slate-700 transition">
                  <span>Status: {filterStatus === "all" ? "All" : filterStatus}</span>
                  <ChevronDown className="w-4 h-4" />
                </button>
                <div className="absolute right-0 mt-1 w-40 bg-slate-700 border border-slate-600 rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-10">
                  {["all", "pending", "approved", "rejected"].map((status) => (
                    <button
                      key={status}
                      onClick={() => setFilterStatus(status)}
                      className={`w-full text-left px-4 py-2 hover:bg-slate-600 transition first:rounded-t-lg last:rounded-b-lg ${
                        filterStatus === status ? "bg-blue-600/50 text-blue-200" : "text-slate-300"
                      }`}
                    >
                      {status.charAt(0).toUpperCase() + status.slice(1)}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Error State */}
          {error && (
            <div className="px-6 py-4 bg-red-500/10 border-b border-red-500/30 text-red-300">
              Error: {error}
            </div>
          )}

          {/* Table */}
          {filteredTransactions.length === 0 ? (
            <div className="px-6 py-12 text-center text-slate-400">
              <div className="text-4xl mb-2">📭</div>
              <p>No transactions found</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-slate-700/50 border-b border-slate-600/50">
                  <tr>
                    <th className="px-4 py-3 text-left text-slate-300 font-semibold">ID</th>
                    <th className="px-4 py-3 text-left text-slate-300 font-semibold">User</th>
                    <th className="px-4 py-3 text-left text-slate-300 font-semibold">Course</th>
                    <th className="px-4 py-3 text-left text-slate-300 font-semibold">UTR</th>
                    <th className="px-4 py-3 text-right text-slate-300 font-semibold">Amount</th>
                    <th className="px-4 py-3 text-left text-slate-300 font-semibold">Status</th>
                    <th className="px-4 py-3 text-left text-slate-300 font-semibold">Date</th>
                    <th className="px-4 py-3 text-center text-slate-300 font-semibold">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-700/50">
                  {filteredTransactions.map((tx) => (
                    <tr
                      key={tx.id}
                      className="hover:bg-slate-700/20 transition duration-150 group"
                    >
                      <td className="px-4 py-3 text-slate-300 font-mono text-xs group-hover:text-blue-300">
                        {tx.id.slice(0, 8)}...
                      </td>
                      <td className="px-4 py-3 text-slate-300 font-mono text-xs">
                        {tx.userId.slice(0, 10)}...
                      </td>
                      <td className="px-4 py-3 text-slate-200 font-medium">{tx.courseTitle}</td>
                      <td className="px-4 py-3 text-slate-300 font-mono text-sm">{tx.utrNumber}</td>
                      <td className="px-4 py-3 text-right text-slate-200 font-semibold">
                        ₹{tx.price}
                      </td>
                      <td className="px-4 py-3">
                        <span
                          className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold ${
                            tx.status === "pending"
                              ? "bg-yellow-500/20 text-yellow-300 border border-yellow-500/30"
                              : tx.status === "approved"
                              ? "bg-green-500/20 text-green-300 border border-green-500/30"
                              : "bg-red-500/20 text-red-300 border border-red-500/30"
                          }`}
                        >
                          {tx.status === "pending" && <Clock className="w-3 h-3" />}
                          {tx.status === "approved" && <CheckCircle2 className="w-3 h-3" />}
                          {tx.status === "rejected" && <XCircle className="w-3 h-3" />}
                          {tx.status.charAt(0).toUpperCase() + tx.status.slice(1)}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-slate-400 text-xs">
                        {tx.createdAt
                          ? new Date(tx.createdAt).toLocaleDateString("en-IN", {
                              day: "numeric",
                              month: "short",
                              year: "numeric",
                              hour: "2-digit",
                              minute: "2-digit",
                            })
                          : "-"}
                      </td>
                      <td className="px-4 py-3 text-center">
                        {tx.status === "pending" && (
                          <div className="flex gap-2 justify-center">
                            <button
                              onClick={() => handleApprove(tx.id)}
                              disabled={approving === tx.id}
                              className="px-3 py-1 bg-green-600 hover:bg-green-500 text-white rounded-lg text-xs font-semibold transition disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                              {approving === tx.id ? "..." : "✓ Approve"}
                            </button>
                            <button
                              onClick={() => handleReject(tx.id)}
                              disabled={approving === tx.id}
                              className="px-3 py-1 bg-red-600 hover:bg-red-500 text-white rounded-lg text-xs font-semibold transition disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                              {approving === tx.id ? "..." : "✗ Reject"}
                            </button>
                          </div>
                        )}
                        {tx.status === "approved" && (
                          <span className="text-green-400 text-xs font-semibold">✓ Approved</span>
                        )}
                        {tx.status === "rejected" && (
                          <span className="text-red-400 text-xs font-semibold">✗ Rejected</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Footer */}
          <div className="px-6 py-4 bg-slate-700/20 border-t border-slate-700/50 text-sm text-slate-400">
            Showing {filteredTransactions.length} of {transactions.length} transactions
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({
  icon,
  label,
  value,
  color,
  highlight,
}: {
  icon: React.ReactNode;
  label: string;
  value: string | number;
  color: string;
  highlight?: boolean;
}) {
  return (
    <div
      className={`bg-gradient-to-br ${color} p-5 rounded-xl border border-white/10 text-white transform transition hover:scale-105 ${
        highlight ? "ring-2 ring-yellow-400/50" : ""
      }`}
    >
      <div className="flex items-center justify-between mb-3">
        <div className="text-2xl">{icon}</div>
        {highlight && <div className="animate-pulse w-2 h-2 rounded-full bg-yellow-400"></div>}
      </div>
      <p className="text-white/80 text-sm font-medium">{label}</p>
      <p className="text-3xl font-bold mt-1">{value}</p>
    </div>
  );
}
