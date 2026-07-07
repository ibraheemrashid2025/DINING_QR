import { FormEvent, useMemo, useState } from 'react';

import { AdminButton } from '../../components/admin/AdminButton';
import { AdminCard } from '../../components/admin/AdminCard';
import { AdminModal } from '../../components/admin/AdminModal';
import { AdminPageHeader } from '../../components/admin/AdminPageHeader';
import { ConfirmDialog } from '../../components/admin/ConfirmDialog';
import { useAdminMock } from '../../contexts/useAdminMock';
import { MenuCategory } from '../../types/demo';
import { createSlug } from '../../utils/format';

const emptyCategory: MenuCategory = { id: '', name: '' };

export function AdminCategoriesPage() {
  const { addCategory, categories, deleteCategory, notify, updateCategory } = useAdminMock();
  const [search, setSearch] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editing, setEditing] = useState<MenuCategory | null>(null);
  const [deleting, setDeleting] = useState<MenuCategory | null>(null);
  const [form, setForm] = useState(emptyCategory);
  const [isSaving, setIsSaving] = useState(false);

  const filteredCategories = useMemo(
    () => categories.filter((category) => category.name.toLowerCase().includes(search.toLowerCase())),
    [categories, search],
  );

  const openCreate = () => {
    setEditing(null);
    setForm(emptyCategory);
    setIsModalOpen(true);
  };

  const openEdit = (category: MenuCategory) => {
    setEditing(category);
    setForm(category);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditing(null);
    setForm(emptyCategory);
  };

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSaving(true);
    window.setTimeout(() => {
      const category = {
        id: editing?.id ?? createSlug(form.name),
        name: form.name.trim(),
      };
      if (editing) {
        updateCategory(category);
        notify('Category updated');
      } else {
        addCategory(category);
        notify('Category created');
      }
      setIsSaving(false);
      closeModal();
    }, 350);
  };

  const confirmDelete = () => {
    if (!deleting) {
      return;
    }
    deleteCategory(deleting.id);
    notify('Category deleted');
    setDeleting(null);
  };

  return (
    <>
      <AdminPageHeader
        action={<AdminButton onClick={openCreate}>Create Category</AdminButton>}
        description="Create, edit, delete, and search mock restaurant categories."
        title="Categories"
      />
      <AdminCard>
        <input
          className="mb-5 w-full rounded-xl border border-stone-700 bg-black/30 px-4 py-3 text-sm text-stone-100 outline-none placeholder:text-stone-500 focus:border-orange-500"
          onChange={(event) => setSearch(event.target.value)}
          placeholder="Search categories..."
          type="search"
          value={search}
        />
        <div className="overflow-x-auto">
          <table className="w-full min-w-[520px] text-left text-sm">
            <thead className="bg-black/30 text-stone-400">
              <tr>
                <th className="px-4 py-3">Category</th>
                <th className="px-4 py-3">Slug</th>
                <th className="px-4 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-800">
              {filteredCategories.map((category) => (
                <tr key={category.id}>
                  <td className="px-4 py-4 font-semibold text-stone-100">{category.name}</td>
                  <td className="px-4 py-4 text-stone-500">{category.id}</td>
                  <td className="px-4 py-4">
                    <div className="flex justify-end gap-2">
                      <AdminButton onClick={() => openEdit(category)} variant="secondary">
                        Edit
                      </AdminButton>
                      <AdminButton onClick={() => setDeleting(category)} variant="danger">
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

      <AdminModal isOpen={isModalOpen} onClose={closeModal} title={editing ? 'Edit Category' : 'Create Category'}>
        <form className="space-y-4" onSubmit={submit}>
          <label className="block text-sm font-semibold text-stone-300">
            Category name
            <input
              className="mt-2 w-full rounded-xl border border-stone-700 bg-black/30 px-4 py-3 text-stone-100 outline-none focus:border-orange-500"
              onChange={(event) => setForm((current) => ({ ...current, name: event.target.value }))}
              required
              value={form.name}
            />
          </label>
          <div className="flex justify-end gap-3">
            <AdminButton onClick={closeModal} variant="secondary">
              Cancel
            </AdminButton>
            <AdminButton disabled={isSaving}>{isSaving ? 'Saving...' : 'Save Category'}</AdminButton>
          </div>
        </form>
      </AdminModal>

      <ConfirmDialog
        isOpen={deleting !== null}
        message={`Delete ${deleting?.name ?? 'this category'} from mock data?`}
        onCancel={() => setDeleting(null)}
        onConfirm={confirmDelete}
        title="Delete Category"
      />
    </>
  );
}
