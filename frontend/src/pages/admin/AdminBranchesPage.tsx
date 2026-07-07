import { FormEvent, useState } from 'react';

import { AdminButton } from '../../components/admin/AdminButton';
import { AdminCard } from '../../components/admin/AdminCard';
import { AdminModal } from '../../components/admin/AdminModal';
import { AdminPageHeader } from '../../components/admin/AdminPageHeader';
import { ConfirmDialog } from '../../components/admin/ConfirmDialog';
import { useAdminMock } from '../../contexts/useAdminMock';
import { Branch } from '../../types/demo';
import { createSlug } from '../../utils/format';

const emptyBranch: Branch = { id: '', name: '', location: '', manager: '', phone: '' };

export function AdminBranchesPage() {
  const { addBranch, branches, deleteBranch, notify, updateBranch } = useAdminMock();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editing, setEditing] = useState<Branch | null>(null);
  const [deleting, setDeleting] = useState<Branch | null>(null);
  const [form, setForm] = useState(emptyBranch);
  const [isSaving, setIsSaving] = useState(false);

  const openCreate = () => {
    setEditing(null);
    setForm(emptyBranch);
    setIsModalOpen(true);
  };

  const openEdit = (branch: Branch) => {
    setEditing(branch);
    setForm(branch);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditing(null);
    setForm(emptyBranch);
  };

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSaving(true);
    window.setTimeout(() => {
      const branch = {
        ...form,
        id: editing?.id ?? createSlug(form.name),
      };
      if (editing) {
        updateBranch(branch);
        notify('Branch updated');
      } else {
        addBranch(branch);
        notify('Branch created');
      }
      setIsSaving(false);
      closeModal();
    }, 350);
  };

  const confirmDelete = () => {
    if (!deleting) {
      return;
    }
    deleteBranch(deleting.id);
    notify('Branch deleted');
    setDeleting(null);
  };

  return (
    <>
      <AdminPageHeader
        action={<AdminButton onClick={openCreate}>Create Branch</AdminButton>}
        description="Create and manage mock restaurant branches."
        title="Branches"
      />
      <div className="grid gap-5 lg:grid-cols-2">
        {branches.map((branch) => (
          <AdminCard key={branch.id}>
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <p className="text-sm font-semibold uppercase tracking-wide text-orange-300">Branch</p>
                <h3 className="mt-1 text-2xl font-bold text-stone-50">{branch.name}</h3>
                <p className="mt-2 text-stone-300">{branch.location}</p>
                <p className="mt-3 text-sm text-stone-500">Manager: {branch.manager}</p>
                <p className="mt-1 text-sm text-stone-500">Phone: {branch.phone}</p>
              </div>
              <div className="flex gap-2">
                <AdminButton onClick={() => openEdit(branch)} variant="secondary">
                  Edit
                </AdminButton>
                <AdminButton onClick={() => setDeleting(branch)} variant="danger">
                  Delete
                </AdminButton>
              </div>
            </div>
          </AdminCard>
        ))}
      </div>

      <AdminModal isOpen={isModalOpen} onClose={closeModal} title={editing ? 'Edit Branch' : 'Create Branch'}>
        <form className="grid gap-4" onSubmit={submit}>
          <TextInput label="Branch name" onChange={(value) => setForm((current) => ({ ...current, name: value }))} value={form.name} />
          <TextInput label="Location" onChange={(value) => setForm((current) => ({ ...current, location: value }))} value={form.location} />
          <div className="grid gap-4 sm:grid-cols-2">
            <TextInput label="Manager" onChange={(value) => setForm((current) => ({ ...current, manager: value }))} value={form.manager} />
            <TextInput label="Phone" onChange={(value) => setForm((current) => ({ ...current, phone: value }))} value={form.phone} />
          </div>
          <div className="flex justify-end gap-3">
            <AdminButton onClick={closeModal} variant="secondary">
              Cancel
            </AdminButton>
            <AdminButton disabled={isSaving}>{isSaving ? 'Saving...' : 'Save Branch'}</AdminButton>
          </div>
        </form>
      </AdminModal>

      <ConfirmDialog
        isOpen={deleting !== null}
        message={`Delete ${deleting?.name ?? 'this branch'} from mock data?`}
        onCancel={() => setDeleting(null)}
        onConfirm={confirmDelete}
        title="Delete Branch"
      />
    </>
  );
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
