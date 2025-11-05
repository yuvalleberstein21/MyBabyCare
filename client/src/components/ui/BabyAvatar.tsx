import { BabyLogo } from './BabyLogo';

const BabyAvatar = ({ image, name }: any) => (
  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-300 to-blue-500 flex items-center justify-center overflow-hidden">
    {image ? (
      <img src={image} alt={name} className="w-full h-full object-cover" />
    ) : (
      <BabyLogo bgColor="primary" size={65} iconColor="text-white" />
    )}
  </div>
);

export default BabyAvatar;
