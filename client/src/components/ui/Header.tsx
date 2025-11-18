import { ArrowLeft } from 'lucide-react';
import { Title } from './Title';
import { SubTitle } from './SubTitle';
import BabyAvatar from './BabyAvatar';

const Header = ({ baby, activeActivity, onBack }: any) => (
  <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-10 shadow-sm">
    <div className="container mx-auto px-4 py-4">
      <button
        onClick={onBack}
        className="flex items-center text-gray-600 hover:bg-gray-100 rounded-full p-2 mb-3 transition"
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        {activeActivity ? 'חזרה לבחירה' : 'חזרה ללוח הראשי'}
      </button>

      <div className="flex items-center gap-4">
        <BabyAvatar image={baby.image} name={baby.name} />
        <div>
          <Title className="text-2xl font-bold">{baby.name}</Title>
          <SubTitle className="text-sm text-gray-500">
            מעקב שינה, בריאות, האכלה והחלפת חיתולים
          </SubTitle>
        </div>
      </div>
    </div>
  </header>
);

export default Header;
