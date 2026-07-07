import { AnimatePresence, motion } from 'framer-motion';

import { useAdminMock } from '../../contexts/useAdminMock';

export function ToastStack() {
  const { dismissToast, toasts } = useAdminMock();

  return (
    <div className="fixed right-4 top-4 z-[60] grid w-[calc(100%-2rem)] max-w-sm gap-3">
      <AnimatePresence>
        {toasts.map((toast) => (
          <motion.button
            animate={{ opacity: 1, x: 0 }}
            className={`rounded-lg border p-4 text-left text-sm font-semibold shadow-lg ${
              toast.tone === 'success'
                ? 'border-emerald-200 bg-emerald-50 text-emerald-900'
                : 'border-sky-200 bg-sky-50 text-sky-900'
            }`}
            exit={{ opacity: 0, x: 20 }}
            initial={{ opacity: 0, x: 20 }}
            key={toast.id}
            onClick={() => dismissToast(toast.id)}
            type="button"
          >
            {toast.message}
          </motion.button>
        ))}
      </AnimatePresence>
    </div>
  );
}
