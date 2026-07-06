import { AnimatePresence, motion } from 'framer-motion';
import { useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import { QuantityControl } from '../components/demo/QuantityControl';
import { menuCategories, menuItems, restaurantProfile } from '../data/mockData';
import { MenuItem } from '../types/demo';
import { formatCurrency } from '../utils/format';

type CartLine = {
  item: MenuItem;
  quantity: number;
};

export function MenuDemoPage() {
  const [searchParams] = useSearchParams();
  const tableNumber = searchParams.get('table') ?? 'Guest';
  const [activeCategory, setActiveCategory] = useState(menuCategories[0]?.id ?? 'signature');
  const [searchTerm, setSearchTerm] = useState('');
  const [cart, setCart] = useState<Record<string, CartLine>>({});
  const [notes, setNotes] = useState('');
  const [isSuccessOpen, setIsSuccessOpen] = useState(false);

  const filteredItems = useMemo(
    () =>
      menuItems.filter((item) => {
        const matchesCategory = item.categoryId === activeCategory;
        const query = searchTerm.trim().toLowerCase();
        const matchesSearch =
          query.length === 0 ||
          item.name.toLowerCase().includes(query) ||
          item.description.toLowerCase().includes(query);

        return matchesCategory && matchesSearch;
      }),
    [activeCategory, searchTerm],
  );

  const cartLines = Object.values(cart);
  const itemCount = cartLines.reduce((total, line) => total + line.quantity, 0);
  const subtotal = cartLines.reduce((total, line) => total + line.item.price * line.quantity, 0);

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

    setIsSuccessOpen(true);
    setCart({});
    setNotes('');
  };

  return (
    <div className="min-h-screen bg-stone-50 text-slate-950">
      <section className="relative overflow-hidden bg-slate-950 text-white">
        <img
          alt="Restaurant interior"
          className="absolute inset-0 h-full w-full object-cover opacity-45"
          src={restaurantProfile.heroImage}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/75 to-transparent" />
        <div className="relative mx-auto max-w-7xl px-4 py-12 sm:py-16 lg:py-20">
          <motion.div animate={{ opacity: 1, y: 0 }} initial={{ opacity: 0, y: 16 }}>
            <p className="text-sm font-semibold uppercase tracking-wide text-emerald-300">
              Table {tableNumber}
            </p>
            <h1 className="mt-3 max-w-2xl text-4xl font-bold tracking-tight sm:text-6xl">
              {restaurantProfile.name}
            </h1>
            <p className="mt-4 max-w-xl text-lg leading-8 text-slate-200">
              {restaurantProfile.tagline}
            </p>
            <div className="mt-6 flex flex-wrap gap-3 text-sm font-semibold">
              <span className="rounded-full bg-white/15 px-4 py-2 backdrop-blur">
                {restaurantProfile.location}
              </span>
              <span className="rounded-full bg-white/15 px-4 py-2 backdrop-blur">
                Rating {restaurantProfile.rating}
              </span>
            </div>
          </motion.div>
        </div>
      </section>

      <main className="mx-auto grid max-w-7xl gap-6 px-4 py-8 lg:grid-cols-[1fr_380px]">
        <section>
          <div className="sticky top-0 z-10 -mx-4 border-b border-stone-200 bg-stone-50/95 px-4 py-4 backdrop-blur">
            <div className="flex gap-2 overflow-x-auto pb-2">
              {menuCategories.map((category) => (
                <button
                  className={`whitespace-nowrap rounded-full px-4 py-2 text-sm font-semibold ${
                    activeCategory === category.id
                      ? 'bg-slate-950 text-white'
                      : 'bg-white text-slate-700 shadow-sm'
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
              className="mt-4 w-full rounded-full border border-stone-200 bg-white px-5 py-3 text-sm shadow-sm outline-none focus:border-slate-950"
              onChange={(event) => setSearchTerm(event.target.value)}
              placeholder="Search dishes, ingredients, drinks..."
              type="search"
              value={searchTerm}
            />
          </div>

          <div className="mt-6 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {filteredItems.map((item) => {
              const quantity = cart[item.id]?.quantity ?? 0;

              return (
                <motion.article
                  animate={{ opacity: 1, y: 0 }}
                  className="overflow-hidden rounded-lg border border-stone-200 bg-white shadow-sm"
                  initial={{ opacity: 0, y: 12 }}
                  key={item.id}
                  layout
                >
                  <div className="relative h-48">
                    <img alt={item.name} className="h-full w-full object-cover" src={item.imageUrl} />
                    <div className="absolute left-3 top-3 flex gap-2">
                      {item.isPopular ? (
                        <span className="rounded-full bg-amber-400 px-3 py-1 text-xs font-bold text-amber-950">
                          Popular
                        </span>
                      ) : null}
                      {item.isNew ? (
                        <span className="rounded-full bg-emerald-500 px-3 py-1 text-xs font-bold text-white">
                          New
                        </span>
                      ) : null}
                    </div>
                  </div>
                  <div className="p-4">
                    <div className="flex items-start justify-between gap-3">
                      <h2 className="text-lg font-bold text-slate-950">{item.name}</h2>
                      <span className="font-bold text-emerald-700">{formatCurrency(item.price)}</span>
                    </div>
                    <p className="mt-2 min-h-12 text-sm leading-6 text-slate-600">{item.description}</p>
                    <div className="mt-4 flex items-center justify-between gap-3">
                      {quantity > 0 ? (
                        <QuantityControl
                          onDecrease={() => updateQuantity(item, quantity - 1)}
                          onIncrease={() => updateQuantity(item, quantity + 1)}
                          quantity={quantity}
                        />
                      ) : (
                        <button
                          className="rounded-full bg-slate-950 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800"
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
        </section>

        <aside className="h-fit rounded-lg border border-stone-200 bg-white p-5 shadow-sm lg:sticky lg:top-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-wide text-slate-500">Your cart</p>
              <h2 className="text-2xl font-bold text-slate-950">Table {tableNumber}</h2>
            </div>
            <span className="rounded-full bg-emerald-50 px-3 py-1 text-sm font-bold text-emerald-700">
              {itemCount} items
            </span>
          </div>

          <div className="mt-5 space-y-3">
            {cartLines.length > 0 ? (
              cartLines.map((line) => (
                <div className="rounded-md bg-stone-50 p-3" key={line.item.id}>
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="font-semibold text-slate-950">{line.item.name}</p>
                      <p className="text-sm text-slate-500">{formatCurrency(line.item.price)}</p>
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
              <p className="rounded-md bg-stone-50 p-4 text-sm text-slate-500">
                Your selected items will appear here.
              </p>
            )}
          </div>

          <label className="mt-5 block text-sm font-semibold text-slate-700" htmlFor="order-notes">
            Order notes
          </label>
          <textarea
            className="mt-2 min-h-24 w-full rounded-md border border-stone-200 p-3 text-sm outline-none focus:border-slate-950"
            id="order-notes"
            onChange={(event) => setNotes(event.target.value)}
            placeholder="Allergies, spice level, serving instructions..."
            value={notes}
          />

          <div className="mt-5 flex items-center justify-between border-t border-stone-200 pt-5">
            <span className="font-semibold text-slate-600">Subtotal</span>
            <span className="text-xl font-bold text-slate-950">{formatCurrency(subtotal)}</span>
          </div>
          <button
            className="mt-5 w-full rounded-full bg-emerald-600 px-5 py-3 font-bold text-white shadow-lg shadow-emerald-600/20 hover:bg-emerald-700 disabled:cursor-not-allowed disabled:bg-slate-300"
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
            className="fixed inset-0 z-50 grid place-items-center bg-slate-950/60 p-4"
            exit={{ opacity: 0 }}
            initial={{ opacity: 0 }}
          >
            <motion.div
              animate={{ scale: 1, y: 0 }}
              className="w-full max-w-md rounded-lg bg-white p-6 text-center shadow-2xl"
              exit={{ scale: 0.96, y: 12 }}
              initial={{ scale: 0.96, y: 12 }}
            >
              <div className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-emerald-100 text-2xl font-bold text-emerald-700">
                OK
              </div>
              <h2 className="mt-4 text-2xl font-bold text-slate-950">Mock order placed</h2>
              <p className="mt-2 text-slate-600">
                Your demo order for table {tableNumber} was created locally. No backend or database was used.
              </p>
              <button
                className="mt-6 rounded-full bg-slate-950 px-5 py-3 font-semibold text-white"
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

