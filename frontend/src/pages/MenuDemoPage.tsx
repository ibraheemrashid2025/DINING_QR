import { AnimatePresence, motion } from 'framer-motion';
import { useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

import { SteakhouseLogo } from '../components/brand/SteakhouseLogo';
import { QuantityControl } from '../components/demo/QuantityControl';
import { saveDemoOrder } from '../data/mockOrderStorage';
import { menuCategories, menuItems, restaurantProfile } from '../data/mockData';
import { resolveMockTableToken } from '../data/mockTableTokens';
import { MenuItem } from '../types/demo';
import { formatCurrency } from '../utils/format';

type CartLine = {
  item: MenuItem;
  quantity: number;
};

export function MenuDemoPage() {
  const { qrToken } = useParams();
  const tableToken = resolveMockTableToken(qrToken);
  const [activeCategory, setActiveCategory] = useState(menuCategories[0]?.id ?? 'signature');
  const [searchTerm, setSearchTerm] = useState('');
  const [cart, setCart] = useState<Record<string, CartLine>>({});
  const [customerName, setCustomerName] = useState('');
  const [notes, setNotes] = useState('');
  const [isSuccessOpen, setIsSuccessOpen] = useState(false);

  const filteredItems = useMemo(
    () =>
      menuItems.filter((item) => {
        const categoryName =
          menuCategories.find((category) => category.id === item.categoryId)?.name ?? '';
        const matchesCategory = item.categoryId === activeCategory;
        const query = searchTerm.trim().toLowerCase();
        const matchesSearch =
          query.length === 0 ||
          item.name.toLowerCase().includes(query) ||
          item.description.toLowerCase().includes(query) ||
          categoryName.toLowerCase().includes(query);

        return matchesCategory && matchesSearch;
      }),
    [activeCategory, searchTerm],
  );

  const cartLines = Object.values(cart);
  const itemCount = cartLines.reduce((total, line) => total + line.quantity, 0);
  const subtotal = cartLines.reduce((total, line) => total + line.item.price * line.quantity, 0);

  if (!tableToken) {
    return <InvalidQrCodePage />;
  }

  const updateQuantity = (item: MenuItem, nextQuantity: number) => {
    setCart((current) => {
      const next = { ...current };

      if (nextQuantity <= 0) {
        delete next[item.id];
        return next;
      }

      next[item.id] = { item, quantity: nextQuantity };
      return next;
    });
  };

  const placeOrder = () => {
    if (itemCount === 0) {
      return;
    }

    saveDemoOrder({
      id: `ORD-${Date.now().toString().slice(-6)}`,
      tableId: tableToken.tableId,
      tableNumber: tableToken.tableNumber,
      branchId: tableToken.branchId,
      branchName: tableToken.branchName,
      qrToken: tableToken.qrToken,
      customerName: customerName.trim() || 'Walk-in Customer',
      totalBill: subtotal,
      status: 'new',
      createdAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      notes: notes.trim() || undefined,
      items: cartLines.map((line) => ({
        id: line.item.id,
        name: line.item.name,
        quantity: line.quantity,
        price: line.item.price,
      })),
    });
    setIsSuccessOpen(true);
    setCart({});
    setCustomerName('');
    setNotes('');
  };

  return (
    <div className="min-h-screen bg-[#0b0908] text-stone-50">
      <section className="relative min-h-[430px] overflow-hidden bg-black text-white sm:min-h-[520px]">
        <img
          alt="Flame grilled steakhouse table"
          className="absolute inset-0 h-full w-full object-cover opacity-55"
          src={restaurantProfile.heroImage}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black via-[#170b08]/90 to-black/35" />
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#0b0908] to-transparent" />
        <div className="relative mx-auto flex min-h-[430px] max-w-7xl items-end px-4 py-8 sm:min-h-[520px] sm:py-16 lg:py-20">
          <motion.div
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl"
            initial={{ opacity: 0, y: 18 }}
            transition={{ duration: 0.45 }}
          >
            <SteakhouseLogo mobileTight />
            <p className="mt-5 text-xs font-bold uppercase tracking-[0.22em] text-orange-300 sm:mt-6 sm:text-sm sm:tracking-[0.28em]">
              {tableToken.branchName} / Table {tableToken.tableNumber}
            </p>
            <h1 className="mt-3 text-4xl font-black tracking-tight text-stone-50 sm:mt-4 sm:text-7xl">
              {tableToken.restaurantName}
            </h1>
            <p className="mt-4 max-w-2xl text-base leading-7 text-stone-200 sm:mt-5 sm:text-lg sm:leading-8">
              {restaurantProfile.tagline}
            </p>
            <div className="mt-5 flex flex-wrap gap-2 text-xs font-semibold sm:mt-6 sm:gap-3 sm:text-sm">
              <span className="rounded-full border border-orange-400/40 bg-orange-500/15 px-4 py-2 text-orange-100 backdrop-blur">
                Open flame grill
              </span>
              <span className="rounded-full border border-white/15 bg-white/10 px-4 py-2 text-stone-100 backdrop-blur">
                Rating {restaurantProfile.rating}
              </span>
            </div>
          </motion.div>
        </div>
      </section>

      <main className="mx-auto grid max-w-7xl gap-6 px-3 pb-5 pt-4 sm:px-4 sm:pt-6 lg:grid-cols-[1fr_390px] lg:pb-10">
        <section>
          <div className="sticky top-0 z-20 -mx-3 border-b border-orange-900/40 bg-[#0b0908]/95 px-3 py-3 backdrop-blur sm:-mx-4 sm:px-4 sm:py-4">
            <div className="no-scrollbar flex gap-2 overflow-x-auto pb-2">
              {menuCategories.map((category) => (
                <button
                  className={`whitespace-nowrap rounded-full px-4 py-2 text-xs font-semibold sm:text-sm ${
                    activeCategory === category.id
                      ? 'bg-orange-600 text-white shadow-lg shadow-orange-950/40'
                      : 'border border-stone-800 bg-[#17110f] text-stone-300'
                  }`}
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  type="button"
                >
                  {category.name}
                </button>
              ))}
            </div>
            <input
              className="mt-3 w-full rounded-full border border-stone-800 bg-[#17110f] px-5 py-3 text-sm text-stone-100 shadow-sm outline-none placeholder:text-stone-500 focus:border-orange-500 sm:mt-4"
              onChange={(event) => setSearchTerm(event.target.value)}
              placeholder="Search steaks, burgers, sides, drinks..."
              type="search"
              value={searchTerm}
            />
          </div>

          {filteredItems.length > 0 ? (
            <div className="mt-4 grid gap-4 sm:mt-6 sm:grid-cols-2 sm:gap-5 xl:grid-cols-3">
              {filteredItems.map((item) => {
              const quantity = cart[item.id]?.quantity ?? 0;

              return (
                <motion.article
                  animate={{ opacity: 1, y: 0 }}
                  className="overflow-hidden rounded-2xl border border-stone-800 bg-[#17110f] shadow-xl shadow-black/20"
                  initial={{ opacity: 0, y: 14 }}
                  key={item.id}
                  layout
                  transition={{ duration: 0.25 }}
                >
                  <div className="relative h-44 sm:h-52">
                    <img alt={item.name} className="h-full w-full object-cover" src={item.imageUrl} />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute left-3 top-3 flex gap-2">
                      {item.isPopular ? (
                        <span className="rounded-full bg-orange-500 px-3 py-1 text-xs font-bold text-white">
                          Popular
                        </span>
                      ) : null}
                      {item.isNew ? (
                        <span className="rounded-full bg-red-700 px-3 py-1 text-xs font-bold text-white">
                          New
                        </span>
                      ) : null}
                    </div>
                  </div>
                  <div className="p-4">
                    <div className="flex items-start justify-between gap-3">
                      <h2 className="text-base font-bold text-stone-50 sm:text-lg">{item.name}</h2>
                      <span className="shrink-0 text-sm font-bold text-orange-300 sm:text-base">{formatCurrency(item.price)}</span>
                    </div>
                    <p className="mt-2 min-h-12 text-sm leading-6 text-stone-400">{item.description}</p>
                    <div className="mt-4 flex items-center justify-between gap-3">
                      {quantity > 0 ? (
                        <QuantityControl
                          onDecrease={() => updateQuantity(item, quantity - 1)}
                          onIncrease={() => updateQuantity(item, quantity + 1)}
                          quantity={quantity}
                        />
                      ) : (
                        <button
                          className="rounded-full bg-orange-600 px-4 py-2 text-sm font-bold text-white shadow-lg shadow-orange-950/30 hover:bg-orange-500"
                          onClick={() => updateQuantity(item, 1)}
                          type="button"
                        >
                          Add to Cart
                        </button>
                      )}
                    </div>
                  </div>
                </motion.article>
              );
              })}
            </div>
          ) : (
            <motion.div
              animate={{ opacity: 1, y: 0 }}
              className="mt-4 rounded-2xl border border-stone-800 bg-[#17110f] p-8 text-center shadow-xl shadow-black/20 sm:mt-6"
              initial={{ opacity: 0, y: 12 }}
            >
              <p className="text-lg font-bold text-stone-50">No items found</p>
            </motion.div>
          )}
        </section>

        <aside className="sticky bottom-3 z-30 max-h-[72vh] overflow-y-auto rounded-3xl border border-orange-900/40 bg-[#17110f]/95 p-4 shadow-2xl shadow-black/50 backdrop-blur sm:p-5 lg:top-6 lg:max-h-none lg:rounded-2xl">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-wide text-orange-300">Your cart</p>
              <h2 className="text-xl font-bold text-stone-50 sm:text-2xl">Table {tableToken.tableNumber}</h2>
            </div>
            <span className="rounded-full bg-orange-500/15 px-3 py-1 text-sm font-bold text-orange-200">
              {itemCount} items
            </span>
          </div>

          <div className="mt-4 max-h-44 space-y-3 overflow-y-auto pr-1 sm:mt-5 sm:max-h-none">
            {cartLines.length > 0 ? (
              cartLines.map((line) => (
                <div className="rounded-xl bg-black/30 p-3" key={line.item.id}>
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="font-semibold text-stone-50">{line.item.name}</p>
                      <p className="text-sm text-stone-400">{formatCurrency(line.item.price)}</p>
                    </div>
                    <QuantityControl
                      onDecrease={() => updateQuantity(line.item, line.quantity - 1)}
                      onIncrease={() => updateQuantity(line.item, line.quantity + 1)}
                      quantity={line.quantity}
                    />
                  </div>
                </div>
              ))
            ) : (
              <p className="rounded-xl bg-black/30 p-4 text-sm text-stone-400">
                Your selected items will appear here.
              </p>
            )}
          </div>

          <label className="mt-5 block text-sm font-semibold text-stone-300" htmlFor="customer-name">
            Customer name
          </label>
          <input
            className="mt-2 w-full rounded-xl border border-stone-800 bg-black/30 p-3 text-sm text-stone-100 outline-none placeholder:text-stone-500 focus:border-orange-500"
            id="customer-name"
            onChange={(event) => setCustomerName(event.target.value)}
            placeholder="Name for the order"
            type="text"
            value={customerName}
          />

          <label className="mt-5 block text-sm font-semibold text-stone-300" htmlFor="order-notes">
            Order notes
          </label>
          <textarea
            className="mt-2 min-h-24 w-full rounded-xl border border-stone-800 bg-black/30 p-3 text-sm text-stone-100 outline-none placeholder:text-stone-500 focus:border-orange-500"
            id="order-notes"
            onChange={(event) => setNotes(event.target.value)}
            placeholder="Allergies, spice level, serving instructions..."
            value={notes}
          />

          <div className="mt-5 flex items-center justify-between border-t border-stone-800 pt-5">
            <span className="font-semibold text-stone-300">Subtotal</span>
            <span className="text-xl font-bold text-orange-300">{formatCurrency(subtotal)}</span>
          </div>
          <button
            className="mt-5 w-full rounded-full bg-orange-600 px-5 py-3.5 font-bold text-white shadow-lg shadow-orange-950/40 hover:bg-orange-500 disabled:cursor-not-allowed disabled:bg-stone-700"
            disabled={itemCount === 0}
            onClick={placeOrder}
            type="button"
          >
            Checkout / Place Order
          </button>
        </aside>
      </main>

      <AnimatePresence>
        {isSuccessOpen ? (
          <motion.div
            animate={{ opacity: 1 }}
            className="fixed inset-0 z-50 grid place-items-center bg-black/75 p-4"
            exit={{ opacity: 0 }}
            initial={{ opacity: 0 }}
          >
            <motion.div
              animate={{ scale: 1, y: 0 }}
              className="w-full max-w-md rounded-2xl border border-orange-900/40 bg-[#17110f] p-6 text-center shadow-2xl"
              exit={{ scale: 0.96, y: 12 }}
              initial={{ scale: 0.96, y: 12 }}
            >
              <div className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-orange-500/15 text-2xl font-bold text-orange-300">
                OK
              </div>
              <h2 className="mt-4 text-2xl font-bold text-stone-50">Order placed</h2>
              <p className="mt-2 text-stone-400">
                Your demo order for table {tableToken.tableNumber} was created locally. No backend or database was used.
              </p>
              <button
                className="mt-6 rounded-full bg-orange-600 px-5 py-3 font-semibold text-white"
                onClick={() => setIsSuccessOpen(false)}
                type="button"
              >
                Continue browsing
              </button>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}

function InvalidQrCodePage() {
  return (
    <div className="grid min-h-screen place-items-center bg-[#0b0908] px-4 text-stone-50">
      <section className="w-full max-w-lg rounded-2xl border border-stone-800 bg-[#17110f] p-8 text-center shadow-xl shadow-black/20">
        <p className="text-sm font-semibold uppercase tracking-wide text-orange-300">Invalid QR Code</p>
        <h1 className="mt-3 text-3xl font-bold">This table link is not recognized</h1>
        <p className="mt-4 text-stone-400">
          Please scan the QR code placed on your table again, or ask a staff member for assistance.
        </p>
        <Link
          className="mt-6 inline-flex rounded-full bg-orange-600 px-5 py-3 font-semibold text-white"
          to="/"
        >
          Return to home
        </Link>
      </section>
    </div>
  );
}
