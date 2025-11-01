import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Button from '../components/ui/Button';
import { ArrowLeft, Baby } from 'lucide-react';
import { BabiesMockData } from '../mock/BabiesMockData';
import { SleepTracker } from '../components/babyDetails/SleepTracker';
import { FeedingTracker } from '../components/babyDetails/FeedingTracker';
import { DiaperTracker } from '../components/babyDetails/DiaperTracker';
import { BabyLogo } from '../components/ui/BabyLogo';

const BabyDetails = () => {
  const { babyId } = useParams<{ babyId: string }>();
  const baby = BabiesMockData.find((baby) => baby.id === babyId);
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('sleep');

  if (!babyId) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-2">לא נמצא תינוק</h2>
          <Button onClick={() => navigate('/dashboard')}>
            חזרה ללוח הראשי
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-gray-50 to-blue-50">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-10 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <button
            onClick={() => navigate('/dashboard')}
            className="flex items-center text-gray-600 hover:bg-accent rounded-full p-2 mb-3"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            חזרה ללוח הראשי
          </button>

          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-300 to-blue-500 flex items-center justify-center overflow-hidden">
              {baby.photo ? (
                <img
                  src={baby.photo}
                  alt={baby.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <BabyLogo bgColor="primary" size={65} iconColor="text-white" />
              )}
            </div>
            <div>
              <h1 className="text-2xl font-bold">{baby.name}</h1>
              <p className="text-sm text-gray-500">
                מעקב שינה, האכלה והחלפת חיתולים
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Tabs */}
      <main className="container mx-auto px-4 py-8">
        <div className="flex justify-center mb-8 gap-4">
          {['sleep', 'feeding', 'diaper'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-lg font-medium transition ${
                activeTab === tab
                  ? 'bg-blue-500 text-white shadow'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {tab === 'sleep' && 'שינה'}
              {tab === 'feeding' && 'האכלה'}
              {tab === 'diaper' && 'חיתולים'}
            </button>
          ))}
        </div>

        {/* Tab content */}
        <div className="bg-white shadow-md rounded-2xl p-6 text-center">
          {activeTab === 'sleep' && (
            <div>
              <h2 className="text-xl font-semibold mb-3">מעקב שינה</h2>
              <SleepTracker />
            </div>
          )}

          {activeTab === 'feeding' && (
            <div>
              <h2 className="text-xl font-semibold mb-3">מעקב האכלה</h2>
              <FeedingTracker />
            </div>
          )}

          {activeTab === 'diaper' && (
            <div>
              <h2 className="text-xl font-semibold mb-3">מעקב חיתולים</h2>
              <DiaperTracker />
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default BabyDetails;
