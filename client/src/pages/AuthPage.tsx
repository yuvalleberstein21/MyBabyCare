import { useState } from 'react';
import { BabyLogo } from '../components/ui/BabyLogo';
import AuthTabs from '../components/auth/AuthTabs';
import AuthForm from '../components/auth/AuthForm';
import ToggleLink from '../components/auth/ToggleLink';
import { useAuth } from '../hooks/useAuth';

export const AuthPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'login' | 'register'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState<string | null>(null);

  const { handleLogin } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    if (activeTab === 'login') {
      try {
        await handleLogin(email, password);
      } catch (err: any) {
        setError(err.message || 'Login failed');
      }
    }
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
          handleSubmit={handleSubmit}
        />

        {error && (
          <p className="text-red-500 text-sm text-center mt-2">{error}</p>
        )}

        <ToggleLink activeTab={activeTab} setActiveTab={setActiveTab} />
      </div>
    </div>
  );
};
