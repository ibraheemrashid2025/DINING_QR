import { AdminButton } from './AdminButton';
import { AdminModal } from './AdminModal';

type ConfirmDialogProps = {
  isOpen: boolean;
  title: string;
  message: string;
  onCancel: () => void;
  onConfirm: () => void;
};

export function ConfirmDialog({ isOpen, title, message, onCancel, onConfirm }: ConfirmDialogProps) {
  return (
    <AdminModal isOpen={isOpen} onClose={onCancel} title={title}>
      <p className="text-stone-300">{message}</p>
      <div className="mt-6 flex justify-end gap-3">
        <AdminButton onClick={onCancel} variant="secondary">
          Cancel
        </AdminButton>
        <AdminButton onClick={onConfirm} variant="danger">
          Delete
        </AdminButton>
      </div>
    </AdminModal>
  );
}
