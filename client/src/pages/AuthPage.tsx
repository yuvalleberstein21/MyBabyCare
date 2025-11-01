import React, { useState } from 'react';
import Button from '../components/ui/Button';
import { BabyLogo } from '../components/ui/BabyLogo';

export const AuthPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'login' | 'register'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleLogin = () => {
    console.log('Login:', { email, password });
  };

  const handleRegister = () => {
    console.log('Register:', { email, password, confirmPassword });
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-purple-50 to-pink-50 p-4"
      dir="rtl"
    >
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md p-8 mx-4 relative overflow-hidden mb-10">
        {/* Logo / Icon */}
        <div className="flex justify-center mb-6">
          <BabyLogo size={80} bgColor="bg-primary" iconColor="text-white" />
        </div>

        {/* Tabs */}
        <div className="flex justify-center mb-6 border-b border-gray-200 relative">
          <button
            className={`px-4 py-2 font-semibold transition-colors ${
              activeTab === 'login'
                ? 'border-b-2 border-blue-500 text-blue-500'
                : 'text-gray-400 hover:text-blue-400'
            }`}
            onClick={() => setActiveTab('login')}
          >
            התחברות
          </button>
          <button
            className={`px-4 py-2 font-semibold transition-colors ${
              activeTab === 'register'
                ? 'border-b-2 border-blue-500 text-blue-500'
                : 'text-gray-400 hover:text-blue-400'
            }`}
            onClick={() => setActiveTab('register')}
          >
            הרשמה
          </button>
        </div>

        {/* Form */}
        <div className="space-y-4">
          <div className="relative">
            <input
              type="email"
              placeholder="אימייל"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-gray-300 rounded-lg p-3 pl-10 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
            />
            <span className="absolute left-3 top-3 text-gray-400">📧</span>
          </div>

          <div className="relative">
            <input
              type="password"
              placeholder="סיסמא"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-gray-300 rounded-lg p-3 pl-10 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
            />
            <span className="absolute left-3 top-3 text-gray-400">🔒</span>
          </div>

          {activeTab === 'register' && (
            <div className="relative">
              <input
                type="password"
                placeholder="אשר/י סיסמא"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full border border-gray-300 rounded-lg p-3 pl-10 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
              />
              <span className="absolute left-3 top-3 text-gray-400">🔑</span>
            </div>
          )}

          <Button
            variant="primary"
            className="w-full text-white rounded-xl py-3 font-semibold hover:opacity-90 transition shadow-lg"
            onClick={activeTab === 'login' ? handleLogin : handleRegister}
          >
            {activeTab === 'login' ? 'התחברות' : 'הרשמה'}
          </Button>
        </div>

        {/* Toggle Link */}
        <p className="text-sm text-gray-500 mt-4 text-center">
          {activeTab === 'login' ? (
            <>
              אין לך עדיין משתמש?{' '}
              <button
                className="text-blue-500 font-medium hover:underline"
                onClick={() => setActiveTab('register')}
              >
                משתמש חדש
              </button>
            </>
          ) : (
            <>
              יש לך כבר משתמש ?{' '}
              <button
                className="text-blue-500 font-medium hover:underline"
                onClick={() => setActiveTab('login')}
              >
                התחבר כאן
              </button>
            </>
          )}
        </p>
      </div>
    </div>
  );
};
