import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

export function FoundationPage() {
  return (
    <motion.section
      animate={{ opacity: 1, y: 0 }}
      className="mx-auto max-w-4xl"
      initial={{ opacity: 0, y: 12 }}
      transition={{ duration: 0.25 }}
    >
      <div className="text-center">
        <p className="mb-3 text-sm font-medium uppercase tracking-[0.28em] text-orange-300">
          Restaurant ordering
        </p>
        <h1 className="text-4xl font-black tracking-tight text-stone-50 sm:text-6xl">
          Scan the QR code on your table to order
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-lg leading-8 text-stone-300">
          Each table has its own printed QR code. Scanning it opens the secure menu link for that
          table directly, without asking customers to select or edit a table number.
        </p>
      </div>

      <div className="mt-8 rounded-2xl border border-stone-800 bg-[#17110f] p-6 shadow-xl shadow-black/20">
        <h2 className="text-xl font-bold text-stone-50">How it works</h2>
        <div className="mt-5 grid gap-4 md:grid-cols-3">
          {['Scan printed QR', 'Order from the table menu', 'Kitchen receives the ticket'].map((step) => (
            <div className="rounded-xl bg-black/30 p-4" key={step}>
              <p className="font-semibold text-stone-100">{step}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-6 flex flex-wrap justify-center gap-3">
        <Link className="rounded-full bg-orange-600 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-orange-950/30" to="/admin/dashboard">
          Admin Dashboard
        </Link>
        <Link className="rounded-full border border-stone-700 bg-[#17110f] px-4 py-2 text-sm font-semibold text-stone-200" to="/kitchen">
          Kitchen Dashboard
        </Link>
      </div>
    </motion.section>
  );
}
