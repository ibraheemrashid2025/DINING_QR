type QuantityControlProps = {
  quantity: number;
  onDecrease: () => void;
  onIncrease: () => void;
};

export function QuantityControl({ quantity, onDecrease, onIncrease }: QuantityControlProps) {
  return (
    <div className="inline-flex items-center rounded-full border border-stone-700 bg-black/35 p-1 shadow-sm">
      <button
        className="grid h-8 w-8 place-items-center rounded-full text-lg font-semibold text-stone-200 hover:bg-stone-800"
        onClick={onDecrease}
        type="button"
      >
        -
      </button>
      <span className="min-w-8 text-center text-sm font-semibold text-stone-50">{quantity}</span>
      <button
        className="grid h-8 w-8 place-items-center rounded-full bg-orange-600 text-lg font-semibold text-white hover:bg-orange-500"
        onClick={onIncrease}
        type="button"
      >
        +
      </button>
    </div>
  );
}
