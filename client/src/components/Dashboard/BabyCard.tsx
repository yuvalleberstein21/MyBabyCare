import React from 'react';
import { Calendar, Ruler, Scale, User } from 'lucide-react';

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
}

const BabyCard: React.FC<BabyCardProps> = ({ baby }) => {
  const { name, birthDate, gender, weight, height, photo } = baby;

  const getDefaultImage = () =>
    gender === 'female'
      ? 'https://cdn-icons-png.flaticon.com/512/4151/4151022.png'
      : 'https://cdn-icons-png.flaticon.com/512/4151/4151047.png';

  return (
    <div className="rounded-2xl overflow-hidden bg-white shadow-lg hover:shadow-xl transition-all border border-gray-100">
      <div className="relative">
        <img
          src={photo || getDefaultImage()}
          alt={name}
          className="w-full h-40 object-cover bg-gray-100"
        />
        <div
          className={`absolute top-3 right-3 px-3 py-1 text-xs rounded-full font-medium text-white shadow ${
            gender === 'female' ? 'bg-pink-500' : 'bg-blue-500'
          }`}
        >
          {gender === 'female' ? 'Girl' : 'Boy'}
        </div>
      </div>

      <div className="p-5 space-y-3">
        <div className="flex items-center gap-2">
          <User className="h-5 w-5 text-indigo-500" />
          <h3 className="font-semibold text-lg text-gray-800">{name}</h3>
        </div>

        <div className="flex items-center gap-2 text-sm text-gray-500">
          <Calendar className="h-4 w-4 text-gray-400" />
          <span>Born: {new Date(birthDate).toLocaleDateString()}</span>
        </div>

        <div className="grid grid-cols-2 gap-2 pt-2 text-sm">
          <div className="flex items-center gap-2 bg-indigo-50 p-2 rounded-lg">
            <Scale className="h-4 w-4 text-indigo-500" />
            <span>{weight} kg</span>
          </div>
          <div className="flex items-center gap-2 bg-indigo-50 p-2 rounded-lg">
            <Ruler className="h-4 w-4 text-indigo-500" />
            <span>{height} cm</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BabyCard;
