import { ChangeEvent, FormEvent, useState } from 'react';

import { AdminButton } from '../../components/admin/AdminButton';
import { AdminCard } from '../../components/admin/AdminCard';
import { AdminModal } from '../../components/admin/AdminModal';
import { AdminPageHeader } from '../../components/admin/AdminPageHeader';
import { ConfirmDialog } from '../../components/admin/ConfirmDialog';
import { useAdminMock } from '../../contexts/useAdminMock';
import { MenuItem } from '../../types/demo';
import { createSlug, formatCurrency } from '../../utils/format';

const defaultImage =
  'https://images.unsplash.com/photo-1558030006-450675393462?auto=format&fit=crop&w=900&q=85';

const emptyMenuItem: MenuItem = {
  id: '',
  name: '',
  categoryId: '',
  description: '',
  price: 0,
  imageUrl: defaultImage,
  isAvailable: true,
  isPopular: false,
  isNew: false,
};

export function AdminMenuPage() {
  const { addMenuItem, categories, deleteMenuItem, menuItems, notify, updateMenuItem } = useAdminMock();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editing, setEditing] = useState<MenuItem | null>(null);
  const [deleting, setDeleting] = useState<MenuItem | null>(null);
  const [form, setForm] = useState<MenuItem>(emptyMenuItem);
  const [isSaving, setIsSaving] = useState(false);

  const openCreate = () => {
    setEditing(null);
    setForm({ ...emptyMenuItem, categoryId: categories[0]?.id ?? '' });
    setIsModalOpen(true);
  };

  const openEdit = (item: MenuItem) => {
    setEditing(item);
    setForm(item);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditing(null);
    setForm(emptyMenuItem);
  };

  const handleImage = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) {
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      setForm((current) => ({ ...current, imageUrl: String(reader.result) }));
    };
    reader.readAsDataURL(file);
  };

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSaving(true);
    window.setTimeout(() => {
      const item = {
        ...form,
        id: editing?.id ?? createSlug(form.name),
        price: Number(form.price),
      };
      if (editing) {
        updateMenuItem(item);
        notify('Menu item updated');
      } else {
        addMenuItem(item);
        notify('Menu item created');
      }
      setIsSaving(false);
      closeModal();
    }, 350);
  };

  const confirmDelete = () => {
    if (!deleting) {
      return;
    }
    deleteMenuItem(deleting.id);
    notify('Menu item deleted');
    setDeleting(null);
  };

  return (
    <>
      <AdminPageHeader
        action={<AdminButton onClick={openCreate}>Create Menu Item</AdminButton>}
        description="Manage mock dishes, pricing, badges, availability, and image previews."
        title="Menu Items"
      />
      <AdminCard>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[860px] text-left text-sm">
            <thead className="bg-black/30 text-stone-400">
              <tr>
                <th className="px-4 py-3">Item</th>
                <th className="px-4 py-3">Category</th>
                <th className="px-4 py-3">Price</th>
                <th className="px-4 py-3">Badges</th>
                <th className="px-4 py-3">Availability</th>
                <th className="px-4 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-800">
              {menuItems.map((item) => (
                <tr key={item.id}>
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-3">
                      <img alt={item.name} className="h-12 w-12 rounded-md object-cover" src={item.imageUrl} />
                      <div>
                        <p className="font-semibold text-stone-100">{item.name}</p>
                        <p className="line-clamp-1 max-w-xs text-stone-500">{item.description}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-4 text-stone-300">
                    {categories.find((category) => category.id === item.categoryId)?.name ?? 'Unassigned'}
                  </td>
                  <td className="px-4 py-4 font-semibold text-orange-300">{formatCurrency(item.price)}</td>
                  <td className="px-4 py-4">
                    <div className="flex flex-wrap gap-2">
                      {item.isPopular ? <Badge>Popular</Badge> : null}
                      {item.isNew ? <Badge>New</Badge> : null}
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <span className={`rounded-full px-3 py-1 text-xs font-bold ${item.isAvailable ? 'bg-orange-500/15 text-orange-200' : 'bg-red-500/15 text-red-200'}`}>
                      {item.isAvailable ? 'Available' : 'Unavailable'}
                    </span>
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex justify-end gap-2">
                      <AdminButton onClick={() => openEdit(item)} variant="secondary">
                        Edit
                      </AdminButton>
                      <AdminButton onClick={() => setDeleting(item)} variant="danger">
                        Delete
                      </AdminButton>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </AdminCard>

      <AdminModal isOpen={isModalOpen} onClose={closeModal} title={editing ? 'Edit Menu Item' : 'Create Menu Item'}>
        <form className="grid gap-4" onSubmit={submit}>
          <img alt="Preview" className="h-48 w-full rounded-lg object-cover" src={form.imageUrl} />
          <label className="block text-sm font-semibold text-stone-300">
            Upload image preview
            <input className="mt-2 w-full text-sm text-stone-300" onChange={handleImage} type="file" accept="image/*" />
          </label>
          <div className="grid gap-4 sm:grid-cols-2">
            <TextInput label="Name" onChange={(value) => setForm((current) => ({ ...current, name: value }))} value={form.name} />
            <NumberInput label="Price" onChange={(value) => setForm((current) => ({ ...current, price: value }))} value={form.price} />
          </div>
          <label className="block text-sm font-semibold text-stone-300">
            Category
            <select
              className="mt-2 w-full rounded-xl border border-stone-700 bg-black/30 px-4 py-3 text-stone-100 outline-none focus:border-orange-500"
              onChange={(event) => setForm((current) => ({ ...current, categoryId: event.target.value }))}
              value={form.categoryId}
            >
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </label>
          <label className="block text-sm font-semibold text-stone-300">
            Description
            <textarea
              className="mt-2 min-h-24 w-full rounded-xl border border-stone-700 bg-black/30 px-4 py-3 text-stone-100 outline-none focus:border-orange-500"
              onChange={(event) => setForm((current) => ({ ...current, description: event.target.value }))}
              value={form.description}
            />
          </label>
          <div className="grid gap-3 sm:grid-cols-3">
            <Checkbox label="Available" onChange={(value) => setForm((current) => ({ ...current, isAvailable: value }))} value={Boolean(form.isAvailable)} />
            <Checkbox label="Popular" onChange={(value) => setForm((current) => ({ ...current, isPopular: value }))} value={Boolean(form.isPopular)} />
            <Checkbox label="New" onChange={(value) => setForm((current) => ({ ...current, isNew: value }))} value={Boolean(form.isNew)} />
          </div>
          <div className="flex justify-end gap-3">
            <AdminButton onClick={closeModal} variant="secondary">
              Cancel
            </AdminButton>
            <AdminButton disabled={isSaving}>{isSaving ? 'Saving...' : 'Save Item'}</AdminButton>
          </div>
        </form>
      </AdminModal>

      <ConfirmDialog
        isOpen={deleting !== null}
        message={`Delete ${deleting?.name ?? 'this item'} from mock data?`}
        onCancel={() => setDeleting(null)}
        onConfirm={confirmDelete}
        title="Delete Menu Item"
      />
    </>
  );
}

function Badge({ children }: { children: string }) {
  return <span className="rounded-full bg-orange-500/15 px-3 py-1 text-xs font-bold text-orange-200">{children}</span>;
}

function TextInput({ label, onChange, value }: { label: string; onChange: (value: string) => void; value: string }) {
  return (
    <label className="block text-sm font-semibold text-stone-300">
      {label}
      <input
        className="mt-2 w-full rounded-xl border border-stone-700 bg-black/30 px-4 py-3 text-stone-100 outline-none focus:border-orange-500"
        onChange={(event) => onChange(event.target.value)}
        required
        value={value}
      />
    </label>
  );
}

function NumberInput({ label, onChange, value }: { label: string; onChange: (value: number) => void; value: number }) {
  return (
    <label className="block text-sm font-semibold text-stone-300">
      {label}
      <input
        className="mt-2 w-full rounded-xl border border-stone-700 bg-black/30 px-4 py-3 text-stone-100 outline-none focus:border-orange-500"
        min={0}
        onChange={(event) => onChange(Number(event.target.value))}
        required
        type="number"
        value={value}
      />
    </label>
  );
}

function Checkbox({ label, onChange, value }: { label: string; onChange: (value: boolean) => void; value: boolean }) {
  return (
    <label className="flex items-center gap-3 rounded-xl border border-stone-700 bg-black/30 p-3 text-sm font-semibold text-stone-300">
      <input checked={value} onChange={(event) => onChange(event.target.checked)} type="checkbox" />
      {label}
    </label>
  );
}
