import React, { useState } from 'react';
import { Calendar, Pencil, Ruler, Scale, User, X } from 'lucide-react';
import DeleteBabyDialog from '../Dialogs/DeleteBabyDialog';
import { Link } from 'react-router-dom';
import EditBabyModal from '../Dialogs/EditBabyModal';
import { Title } from '../ui/Title';
import { SubTitle } from '../ui/SubTitle';

type Baby = {
  _id: string;
  name: string;
  birthDate: string;
  gender: 'זכר' | 'נקבה';
  weight: number;
  height: number;
  photo?: string | undefined;
};

interface BabyCardProps {
  baby: Baby;
  onDelete?: (id: string) => void;
  onUpdate?: (id: string, updatedData: Baby) => void;
}

const BabyCard: React.FC<BabyCardProps> = ({ baby, onDelete, onUpdate }) => {
  const { _id, name, birthDate, gender, weight, height, photo } = baby;

  const [isHovered, setIsHovered] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalEditOpen, setIsModalEditOpen] = useState(false);

  const getDefaultImage = () =>
    gender === 'נקבה'
      ? 'https://cdn-icons-png.flaticon.com/512/4151/4151022.png'
      : 'https://cdn-icons-png.flaticon.com/512/4151/4151047.png';

  const handleDelete = () => {
    setIsModalOpen(false);
    if (onDelete) onDelete(_id);
  };

  return (
    <>
      {/* כרטיס התינוק */}
      <Link
        to={`/baby/${_id}`}
        className="relative block rounded-2xl overflow-hidden bg-white shadow-lg hover:shadow-xl transition-all border border-gray-100"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* תמונה + תג מין */}
        <div className="relative">
          <img
            src={photo || getDefaultImage()}
            alt={name}
            className="w-full h-40 object-cover bg-gray-100"
          />
          <div
            className={`absolute top-3 left-3 px-3 py-1 text-xs rounded-full font-medium text-white shadow ${
              gender === 'נקבה' ? 'bg-pink-500' : 'bg-blue-500'
            }`}
          >
            {gender === 'נקבה' ? 'בת' : 'בן'}
          </div>

          {/* כפתור מחיקה (רק בהובר) */}
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setIsModalOpen(true);
            }}
            className={`absolute top-3 right-3 z-20 bg-red-500 hover:bg-red-600 text-white rounded-full p-1 shadow-lg transition-opacity duration-200 ${
              isHovered ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <X className="h-4 w-4" />
          </button>

          {/* כפתור עריכה */}
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setIsModalEditOpen(true);
            }}
            className={`absolute top-3 right-10 z-20 bg-green-500 hover:bg-green-600 text-white rounded-full p-1 shadow-lg transition-opacity duration-200 ${
              isHovered ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <Pencil className="h-4 w-4" />
          </button>
        </div>

        {/* פרטים */}
        <div className="p-5 space-y-3">
          <div className="flex items-center gap-2">
            <User className="h-5 w-5 text-indigo-500" />
            <Title className="font-semibold text-lg text-gray-800">
              {name}
            </Title>
          </div>

          <div className="flex items-center gap-2 text-sm text-gray-500">
            <Calendar className="h-4 w-4 text-gray-400" />
            <SubTitle>
              תאריך לידה: {new Date(birthDate).toLocaleDateString()}
            </SubTitle>
          </div>

          <div className="grid grid-cols-2 gap-2 pt-2 text-sm">
            <div className="flex items-center gap-2 bg-indigo-50 p-2 rounded-lg">
              <Scale className="h-4 w-4 text-indigo-500" />
              <SubTitle>{weight} ק״ג</SubTitle>
            </div>
            <div className="flex items-center gap-2 bg-indigo-50 p-2 rounded-lg">
              <Ruler className="h-4 w-4 text-indigo-500" />
              <SubTitle>{height} ס״מ</SubTitle>
            </div>
          </div>
        </div>
      </Link>

      {/* מודל אישור מחיקה */}
      {isModalOpen && (
        <DeleteBabyDialog
          name={name}
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
