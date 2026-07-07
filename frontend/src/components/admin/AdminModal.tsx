import { AnimatePresence, motion } from 'framer-motion';
import { ReactNode } from 'react';

type AdminModalProps = {
  isOpen: boolean;
  title: string;
  children: ReactNode;
  onClose: () => void;
};

export function AdminModal({ isOpen, title, children, onClose }: AdminModalProps) {
  return (
    <AnimatePresence>
      {isOpen ? (
        <motion.div
          animate={{ opacity: 1 }}
          className="fixed inset-0 z-50 grid place-items-center bg-black/75 p-4"
          exit={{ opacity: 0 }}
          initial={{ opacity: 0 }}
        >
          <motion.div
            animate={{ scale: 1, y: 0 }}
            className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl border border-stone-800 bg-[#17110f] p-6 shadow-2xl"
            exit={{ scale: 0.97, y: 12 }}
            initial={{ scale: 0.97, y: 12 }}
          >
            <div className="mb-5 flex items-center justify-between gap-4">
              <h2 className="text-2xl font-bold text-stone-50">{title}</h2>
              <button className="rounded-full bg-black/30 px-3 py-1 text-sm font-bold text-stone-300" onClick={onClose} type="button">
                Close
              </button>
            </div>
            {children}
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
