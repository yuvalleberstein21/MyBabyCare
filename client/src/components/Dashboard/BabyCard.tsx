import React, { useState } from 'react';
import { Pencil, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import EditBabyModal from '../Dialogs/EditBabyModal';
import DeleteDialog from '../Dialogs/DeleteBabyDialog';
import type { Baby } from '../../types';
import BabyCardContent from './BabyCardContent';

interface BabyCardProps {
  baby: Baby;
  onDelete?: (id: string) => void;
  onUpdate?: (id: string, updatedData: Baby) => void;
}

const BabyCard: React.FC<BabyCardProps> = ({ baby, onDelete, onUpdate }) => {
  const { _id } = baby;

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalEditOpen, setIsModalEditOpen] = useState(false);

  const handleDelete = () => {
    setIsModalOpen(false);
    if (onDelete) onDelete(_id!);
  };

  return (
    <>
      <Link
        to={`/baby/${_id}`}
        className="group relative block rounded-2xl overflow-hidden bg-white shadow-lg hover:shadow-xl transition-all border border-gray-100"
      >
        <BabyCardContent baby={baby} />

        {/* כפתורי מחיקה ועריכה */}
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            setIsModalOpen(true);
          }}
          className="
            absolute top-3 right-3 z-20 
            bg-red-500 hover:bg-red-600 text-white 
            rounded-full p-1 shadow-lg 
            transition-opacity duration-200
            opacity-100 
            md:opacity-100
            sm:opacity-0
            sm:group-hover:opacity-100"
        >
          <X className="h-4 w-4" />
        </button>

        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            setIsModalEditOpen(true);
          }}
          className="
            absolute top-3 right-10 z-20
            bg-green-500 hover:bg-green-600 text-white
            rounded-full p-1 shadow-lg
            transition-opacity duration-200
            opacity-100
            md:opacity-100
            sm:opacity-0
            sm:group-hover:opacity-100"
        >
          <Pencil className="h-4 w-4" />
        </button>
      </Link>

      {isModalOpen && (
        <DeleteDialog
          name={baby.name}
          setIsModalOpen={setIsModalOpen}
          handleDelete={handleDelete}
        />
      )}

      {isModalEditOpen && (
        <EditBabyModal
          setIsModalEditOpen={setIsModalEditOpen}
          baby={baby}
          handleUpdate={(updatedData: Baby) =>
            onUpdate?.(baby._id, updatedData)
          }
        />
      )}
    </>
  );
};

export default BabyCard;
