type QuantityControlProps = {
  quantity: number;
  onDecrease: () => void;
  onIncrease: () => void;
};

export function QuantityControl({ quantity, onDecrease, onIncrease }: QuantityControlProps) {
  return (
    <div className="inline-flex items-center rounded-full border border-slate-200 bg-white p-1 shadow-sm">
      <button
        className="grid h-8 w-8 place-items-center rounded-full text-lg font-semibold text-slate-700 hover:bg-slate-100"
        onClick={onDecrease}
        type="button"
      >
        -
      </button>
      <span className="min-w-8 text-center text-sm font-semibold text-slate-950">{quantity}</span>
      <button
        className="grid h-8 w-8 place-items-center rounded-full bg-slate-950 text-lg font-semibold text-white hover:bg-slate-800"
        onClick={onIncrease}
        type="button"
      >
        +
      </button>
    </div>
  );
}

