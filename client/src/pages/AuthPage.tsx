import { useState } from 'react';
import { BabyLogo } from '../components/ui/BabyLogo';
import AuthTabs from '../components/auth/AuthTabs';
import AuthForm from '../components/auth/AuthForm';
import ToggleLink from '../components/auth/ToggleLink';

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
        <div className="flex justify-center mb-6">
          <BabyLogo size={80} bgColor="bg-primary" iconColor="text-white" />
        </div>

        <AuthTabs activeTab={activeTab} setActiveTab={setActiveTab} />

        <AuthForm
          activeTab={activeTab}
          email={email}
          setEmail={setEmail}
          password={password}
          setPassword={setPassword}
          confirmPassword={confirmPassword}
          setConfirmPassword={setConfirmPassword}
          handleSubmit={activeTab === 'login' ? handleLogin : handleRegister}
        />

        <ToggleLink activeTab={activeTab} setActiveTab={setActiveTab} />
      </div>
    </div>
  );
};
