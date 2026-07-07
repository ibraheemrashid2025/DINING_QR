import { FormEvent, useState } from 'react';

import { AdminButton } from '../../components/admin/AdminButton';
import { AdminCard } from '../../components/admin/AdminCard';
import { AdminModal } from '../../components/admin/AdminModal';
import { AdminPageHeader } from '../../components/admin/AdminPageHeader';
import { ConfirmDialog } from '../../components/admin/ConfirmDialog';
import { QrPreview } from '../../components/admin/QrPreview';
import { useAdminMock } from '../../contexts/useAdminMock';
import { getDemoMenuPath, getDemoQrImageUrl, mockTableTokens } from '../../data/mockTableTokens';
import { RestaurantTable } from '../../types/demo';

const emptyTable: RestaurantTable = { id: '', number: 1, seats: 2, branchId: '' };

export function AdminTablesPage() {
  const { addTable, branches, deleteTable, notify, tables, updateTable } = useAdminMock();
  const origin = typeof window === 'undefined' ? '' : window.location.origin;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editing, setEditing] = useState<RestaurantTable | null>(null);
  const [deleting, setDeleting] = useState<RestaurantTable | null>(null);
  const [form, setForm] = useState(emptyTable);
  const [isSaving, setIsSaving] = useState(false);

  const openCreate = () => {
    const nextNumber = Math.max(0, ...tables.map((table) => table.number)) + 1;
    setEditing(null);
    setForm({ id: '', number: nextNumber, seats: 2, branchId: branches[0]?.id ?? '' });
    setIsModalOpen(true);
  };

  const openEdit = (table: RestaurantTable) => {
    setEditing(table);
    setForm(table);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditing(null);
    setForm(emptyTable);
  };

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSaving(true);
    window.setTimeout(() => {
      const table = {
        ...form,
        id: editing?.id ?? `table-${form.number}`,
        number: Number(form.number),
        seats: Number(form.seats),
      };
      if (editing) {
        updateTable(table);
        notify('Table updated');
      } else {
        addTable(table);
        notify('Table created with QR preview');
      }
      setIsSaving(false);
      closeModal();
    }, 350);
  };

  const confirmDelete = () => {
    if (!deleting) {
      return;
    }
    deleteTable(deleting.id);
    notify('Table deleted');
    setDeleting(null);
  };

  const downloadQr = (tableNumber: number, imageUrl: string) => {
    const link = document.createElement('a');
    link.href = imageUrl;
    link.download = `table-${tableNumber}-qr.png`;
    link.rel = 'noopener';
    document.body.appendChild(link);
    link.click();
    link.remove();
    notify(`QR download started for table ${tableNumber}`, 'info');
  };

  const printQr = (tableNumber: number, imageUrl: string, menuPath: string) => {
    const printWindow = window.open('', '_blank', 'width=420,height=620');

    if (!printWindow) {
      notify('Please allow popups to print the QR code', 'info');
      return;
    }

    printWindow.document.write(`
      <html>
        <head>
          <title>Table ${tableNumber} QR</title>
          <style>
            body { font-family: Arial, sans-serif; margin: 32px; text-align: center; }
            img { width: 260px; height: 260px; border: 1px solid #ddd; padding: 12px; }
            p { color: #475569; word-break: break-all; }
          </style>
        </head>
        <body>
          <h1>Table ${tableNumber}</h1>
          <img alt="QR code for table ${tableNumber}" src="${imageUrl}" />
          <p>${origin}${menuPath}</p>
        </body>
      </html>
    `);
    printWindow.document.close();
    printWindow.focus();
    printWindow.print();
  };

  return (
    <>
      <AdminPageHeader
        action={<AdminButton onClick={openCreate}>Create Table</AdminButton>}
        description="Manage mock restaurant tables and generated QR previews."
        title="Restaurant Tables"
      />
      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
        {tables.map((table) => (
          <AdminCard key={table.id}>
            {(() => {
              const token = mockTableTokens.find((tableToken) => tableToken.tableNumber === table.number);
              const menuPath = token ? getDemoMenuPath(token.qrToken) : '';
              const qrImageUrl = token ? getDemoQrImageUrl(origin, token.qrToken) : '';
              return (
                <>
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-sm font-semibold uppercase tracking-wide text-orange-300">Table Number</p>
                      <h3 className="text-3xl font-bold text-stone-50">{table.number}</h3>
                      <p className="mt-1 text-sm text-stone-400">{table.seats} seats</p>
                    </div>
                    <QrPreview imageUrl={qrImageUrl || undefined} tableNumber={table.number} />
                  </div>
                  <p className="mt-4 break-all rounded-xl bg-black/30 p-3 text-sm text-stone-300">
                    QR URL: {token ? menuPath : 'Token not generated in demo data'}
                  </p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    <AdminButton
                      disabled={!token}
                      onClick={() => downloadQr(table.number, qrImageUrl)}
                      variant="secondary"
                    >
                      Download QR
                    </AdminButton>
                    <AdminButton
                      disabled={!token}
                      onClick={() => printQr(table.number, qrImageUrl, menuPath)}
                      variant="secondary"
                    >
                      Print QR
                    </AdminButton>
                    <AdminButton onClick={() => openEdit(table)} variant="secondary">
                      Edit
                    </AdminButton>
                    <AdminButton onClick={() => setDeleting(table)} variant="danger">
                      Delete
                    </AdminButton>
                  </div>
                </>
              );
            })()}
          </AdminCard>
        ))}
      </div>

      <AdminModal isOpen={isModalOpen} onClose={closeModal} title={editing ? 'Edit Table' : 'Create Table'}>
        <form className="grid gap-4" onSubmit={submit}>
          <div className="grid gap-4 sm:grid-cols-2">
            <NumberInput label="Table Number" onChange={(value) => setForm((current) => ({ ...current, number: value }))} value={form.number} />
            <NumberInput label="Seats" onChange={(value) => setForm((current) => ({ ...current, seats: value }))} value={form.seats} />
          </div>
          <label className="block text-sm font-semibold text-stone-300">
            Branch
            <select
              className="mt-2 w-full rounded-xl border border-stone-700 bg-black/30 px-4 py-3 text-stone-100 outline-none focus:border-orange-500"
              onChange={(event) => setForm((current) => ({ ...current, branchId: event.target.value }))}
              value={form.branchId}
            >
              {branches.map((branch) => (
                <option key={branch.id} value={branch.id}>
                  {branch.name}
                </option>
              ))}
            </select>
          </label>
          <div className="rounded-2xl bg-black/30 p-4 text-center">
            <QrPreview
              imageUrl={
                mockTableTokens.find((tableToken) => tableToken.tableNumber === form.number)
                  ? getDemoQrImageUrl(
                      origin,
                      mockTableTokens.find((tableToken) => tableToken.tableNumber === form.number)?.qrToken ?? '',
                    )
                  : undefined
              }
              tableNumber={form.number}
            />
            <p className="mt-3 text-sm font-semibold text-stone-300">Auto-generated QR preview</p>
          </div>
          <div className="flex justify-end gap-3">
            <AdminButton onClick={closeModal} variant="secondary">
              Cancel
            </AdminButton>
            <AdminButton disabled={isSaving}>{isSaving ? 'Saving...' : 'Save Table'}</AdminButton>
          </div>
        </form>
      </AdminModal>

      <ConfirmDialog
        isOpen={deleting !== null}
        message={`Delete table ${deleting?.number ?? ''} from mock data?`}
        onCancel={() => setDeleting(null)}
        onConfirm={confirmDelete}
        title="Delete Table"
      />
    </>
  );
}

function NumberInput({ label, onChange, value }: { label: string; onChange: (value: number) => void; value: number }) {
  return (
    <label className="block text-sm font-semibold text-stone-300">
      {label}
      <input
        className="mt-2 w-full rounded-xl border border-stone-700 bg-black/30 px-4 py-3 text-stone-100 outline-none focus:border-orange-500"
        min={1}
        onChange={(event) => onChange(Number(event.target.value))}
        required
        type="number"
        value={value}
      />
    </label>
  );
}
