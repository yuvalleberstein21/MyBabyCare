import React, { useState } from 'react';
import { Calendar, Ruler, Scale, User, X } from 'lucide-react';
import DeleteBabyDialog from './DeleteBabyDialog';
import { Link, useNavigate } from 'react-router-dom';

type Baby = {
  id: string;
  name: string;
  birthDate: string;
  gender: 'male' | 'female';
  weight: number;
  height: number;
  photo?: string | undefined;
};

interface BabyCardProps {
  baby: Baby;
  onDelete?: (id: string) => void;
}

const BabyCard: React.FC<BabyCardProps> = ({ baby, onDelete }) => {
  const { id, name, birthDate, gender, weight, height, photo } = baby;
  const navigate = useNavigate();

  const [isHovered, setIsHovered] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const getDefaultImage = () =>
    gender === 'female'
      ? 'https://cdn-icons-png.flaticon.com/512/4151/4151022.png'
      : 'https://cdn-icons-png.flaticon.com/512/4151/4151047.png';

  const handleDelete = () => {
    setIsModalOpen(false);
    if (onDelete) onDelete(id);
  };

  return (
    <>
      {/* כרטיס התינוק */}
      <Link
        to={`/baby/${id}`}
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
              gender === 'female' ? 'bg-pink-500' : 'bg-blue-500'
            }`}
          >
            {gender === 'female' ? 'בת' : 'בן'}
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
        </div>

        {/* פרטים */}
        <div className="p-5 space-y-3">
          <div className="flex items-center gap-2">
            <User className="h-5 w-5 text-indigo-500" />
            <h3 className="font-semibold text-lg text-gray-800">{name}</h3>
          </div>

          <div className="flex items-center gap-2 text-sm text-gray-500">
            <Calendar className="h-4 w-4 text-gray-400" />
            <span>תאריך לידה: {new Date(birthDate).toLocaleDateString()}</span>
          </div>

          <div className="grid grid-cols-2 gap-2 pt-2 text-sm">
            <div className="flex items-center gap-2 bg-indigo-50 p-2 rounded-lg">
              <Scale className="h-4 w-4 text-indigo-500" />
              <span>{weight} ק״ג</span>
            </div>
            <div className="flex items-center gap-2 bg-indigo-50 p-2 rounded-lg">
              <Ruler className="h-4 w-4 text-indigo-500" />
              <span>{height} ס״מ</span>
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
    </>
  );
};

export default BabyCard;
