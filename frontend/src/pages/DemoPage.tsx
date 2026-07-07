import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

import { getDemoMenuPath, getDemoQrImageUrl, mockTableTokens } from '../data/mockTableTokens';

export function DemoPage() {
  const origin = typeof window === 'undefined' ? '' : window.location.origin;

  return (
    <motion.section
      animate={{ opacity: 1, y: 0 }}
      className="mx-auto max-w-5xl"
      initial={{ opacity: 0, y: 12 }}
      transition={{ duration: 0.25 }}
    >
      <div className="text-center">
        <p className="mb-3 text-sm font-medium uppercase tracking-[0.28em] text-orange-300">
          Developer demo
        </p>
        <h1 className="text-4xl font-black tracking-tight text-stone-50 sm:text-6xl">
          QR Table Demo Controls
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-lg leading-8 text-stone-300">
          Internal page for demonstrations only. Customers should scan printed table QR codes.
        </p>
      </div>

      <div className="mt-8 grid gap-5 md:grid-cols-2">
        {mockTableTokens.map((tableToken) => {
          const menuPath = getDemoMenuPath(tableToken.qrToken);
          const qrImageUrl = getDemoQrImageUrl(origin, tableToken.qrToken);

          return (
            <article
              className="rounded-2xl border border-stone-800 bg-[#17110f] p-5 text-center shadow-xl shadow-black/20"
              key={tableToken.qrToken}
            >
              <p className="text-sm font-semibold uppercase tracking-wide text-orange-300">
                Table {tableToken.tableNumber} QR
              </p>
              <img
                alt={`QR code for table ${tableToken.tableNumber}`}
                className="mx-auto mt-5 h-56 w-56 rounded-md border border-slate-200 bg-white p-3"
                src={qrImageUrl}
              />
              <p className="mt-4 break-all rounded-xl bg-black/30 p-3 text-xs font-medium text-stone-300">
                {menuPath}
              </p>
            </article>
          );
        })}
      </div>

      <div className="mt-6 flex flex-wrap justify-center gap-3">
        <Link className="rounded-full bg-orange-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-orange-950/30" to="/admin/dashboard">
          Open Admin
        </Link>
        <Link className="rounded-full border border-stone-700 bg-[#17110f] px-5 py-3 text-sm font-semibold text-stone-200" to="/kitchen">
          Open Kitchen
        </Link>
      </div>
    </motion.section>
  );
}
