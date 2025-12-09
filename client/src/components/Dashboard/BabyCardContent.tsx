import React from 'react';
import { Calendar, Ruler, Scale, User } from 'lucide-react';
import { Title } from '../ui/Title';
import { SubTitle } from '../ui/SubTitle';

import { getDefaultImage } from '../../utils/getDefaultBabyImage';
import type { Baby } from '../../types';

interface BabyCardContentProps {
  baby: Baby;
}

const BabyCardContent: React.FC<BabyCardContentProps> = ({ baby }) => {
  const { name, birthDate, gender, weight, height, image } = baby;

  const imageUrl = image ? image : getDefaultImage(gender);

  return (
    <>
      {/* תמונה + תג מין */}
      <div className="relative">
        <img
          src={imageUrl}
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
      </div>

      {/* פרטים */}
      <div className="p-5 space-y-3">
        <div className="flex items-center gap-2">
          <User className="h-5 w-5 text-indigo-500" />
          <Title className="font-semibold text-lg text-gray-800">{name}</Title>
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
    </>
  );
};

export default BabyCardContent;
