type QrPreviewProps = {
  imageUrl?: string;
  tableNumber: number;
};

export function QrPreview({ imageUrl, tableNumber }: QrPreviewProps) {
  if (imageUrl) {
    return (
      <img
        alt={`QR code for table ${tableNumber}`}
        className="mx-auto h-28 w-28 rounded-md border border-slate-200 bg-white p-2"
        src={imageUrl}
      />
    );
  }

  return (
    <div className="mx-auto grid h-28 w-28 grid-cols-5 gap-1 rounded-md border border-slate-200 bg-white p-2">
      {Array.from({ length: 25 }, (_, index) => {
        const filled = (index + tableNumber) % 3 !== 0 || index === 0 || index === 4 || index === 20;
        return <span className={`rounded-sm ${filled ? 'bg-slate-950' : 'bg-white'}`} key={index} />;
      })}
    </div>
  );
}
