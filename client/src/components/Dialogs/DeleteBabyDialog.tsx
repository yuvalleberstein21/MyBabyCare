import React from 'react';
import Button from '../ui/Button';

interface DeleteBabyDialogProps {
  name: string;
  setIsModalOpen: (open: boolean) => void;
  handleDelete: () => void;
}

const DeleteDialog: React.FC<DeleteBabyDialogProps> = ({
  setIsModalOpen,
  name,
  handleDelete,
}) => {
  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl p-6 shadow-xl text-center w-[90%] max-w-sm animate-fadeIn">
        <h2 className="text-xl font-semibold mb-4">האם אתה בטוח?</h2>
        <p className="text-gray-600 mb-6">
          פעולה זו תמחק את <b>{name}</b> לצמיתות.
        </p>
        <div className="flex justify-center gap-4">
          <Button
            variant="secondary"
            onClick={() => setIsModalOpen(false)}
            className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 transition"
          >
            ביטול
          </Button>
          <Button
            onClick={handleDelete}
            className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
          >
            מחק
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DeleteDialog;
