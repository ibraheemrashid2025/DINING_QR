import { motion } from 'framer-motion';

import { DashboardShell } from '../components/demo/DashboardShell';
import { adminMenuRows, adminStats, menuCategories } from '../data/mockData';
import { formatCurrency } from '../utils/format';

export function AdminDemoPage() {
  return (
    <DashboardShell eyebrow="Admin workspace" sidebar title="Restaurant Control Center">
      <div className="mb-6 flex flex-col gap-3 rounded-lg border border-slate-200 bg-white p-4 shadow-sm sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm font-semibold text-slate-500">Branch selector</p>
          <h2 className="text-xl font-bold text-slate-950">Casa Lumiere - Gulberg</h2>
        </div>
        <select className="rounded-md border border-slate-200 bg-white px-4 py-3 text-sm font-semibold">
          <option>Gulberg Branch</option>
          <option>DHA Branch</option>
          <option>Johar Town Branch</option>
        </select>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {adminStats.map((stat) => (
          <motion.div
            animate={{ opacity: 1, y: 0 }}
            className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm"
            initial={{ opacity: 0, y: 12 }}
            key={stat.label}
          >
            <p className="text-sm font-semibold text-slate-500">{stat.label}</p>
            <p className="mt-2 text-3xl font-bold text-slate-950">{stat.value}</p>
            <p className="mt-2 text-sm font-semibold text-emerald-700">{stat.change}</p>
          </motion.div>
        ))}
      </div>

      <div className="mt-6 grid gap-6 xl:grid-cols-[1.5fr_1fr]">
        <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-sm font-semibold uppercase tracking-wide text-slate-500">Menu items</p>
              <h2 className="mt-1 text-2xl font-bold text-slate-950">Catalog Overview</h2>
            </div>
            <button className="rounded-full bg-slate-950 px-4 py-2 text-sm font-semibold text-white" type="button">
              Add item
            </button>
          </div>
          <div className="mt-5 overflow-x-auto">
            <table className="w-full min-w-[640px] text-left text-sm">
              <thead className="bg-slate-50 text-slate-500">
                <tr>
                  <th className="px-4 py-3 font-semibold">Item</th>
                  <th className="px-4 py-3 font-semibold">Category</th>
                  <th className="px-4 py-3 font-semibold">Price</th>
                  <th className="px-4 py-3 font-semibold">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {adminMenuRows.map((row) => (
                  <tr key={row.id}>
                    <td className="px-4 py-4 font-semibold text-slate-950">{row.name}</td>
                    <td className="px-4 py-4 text-slate-600">{row.category}</td>
                    <td className="px-4 py-4 text-slate-600">{formatCurrency(row.price)}</td>
                    <td className="px-4 py-4">
                      <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">
                        {row.availability}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="grid gap-6">
          <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-sm font-semibold uppercase tracking-wide text-slate-500">Categories</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {menuCategories.map((category) => (
                <span className="rounded-full bg-emerald-50 px-4 py-2 text-sm font-semibold text-emerald-800" key={category.id}>
                  {category.name}
                </span>
              ))}
            </div>
          </div>

          <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-sm font-semibold uppercase tracking-wide text-slate-500">Tables / QR</p>
            <div className="mt-4 grid grid-cols-3 gap-3">
              {Array.from({ length: 9 }, (_, index) => index + 1).map((table) => (
                <div className="rounded-md border border-slate-200 bg-slate-50 p-3 text-center" key={table}>
                  <p className="font-bold text-slate-950">T{table}</p>
                  <p className="mt-1 text-xs text-slate-500">QR ready</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </DashboardShell>
  );
}

