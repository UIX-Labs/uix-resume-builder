'use client';

import { useDeleteResume } from '@entities/resume';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@shared/ui/dialog';
import { Button } from '@shared/ui/button';
import { toast } from 'sonner';

interface DeleteResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
  resume: {
    id: string;
    title: string;
  };
  onDeleteSuccess?: () => void;
}

export function DeleteResumeModal({ isOpen, onClose, resume, onDeleteSuccess }: DeleteResumeModalProps) {
  const deleteResumeMutation = useDeleteResume();

  const handleConfirmDelete = async () => {
    if (deleteResumeMutation.isPending) return;

    try {
      await deleteResumeMutation.mutateAsync(resume.id);
      toast.success('Resume Deleted Successfully');
      onDeleteSuccess?.();
      onClose();
    } catch (error) {
      toast.error('Error deleting Resume');
      console.error('Delete failed:', error);
    }
  };

  const handleCancel = () => {
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="md:max-w-md bg-[rgba(245,248,250,1)]">
        <DialogHeader>
          <DialogTitle className="text-center">Delete Resume</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete "{resume.title}"? This action cannot be undone.
          </DialogDescription>
        </DialogHeader>

        <div className="flex gap-3 justify-between mt-6">
          <Button
            variant="outline"
            onClick={handleCancel}
            disabled={deleteResumeMutation.isPending}
            className="w-1/2 rounded-4xl cursor-pointer"
          >
            Cancel
          </Button>

          <Button
            variant="destructive"
            onClick={handleConfirmDelete}
            disabled={deleteResumeMutation.isPending}
            className="w-1/2 rounded-4xl cursor-pointer"
          >
            {deleteResumeMutation.isPending ? 'Deleting...' : 'Delete Resume'}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
