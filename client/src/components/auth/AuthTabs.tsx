const AuthTabs = ({
  activeTab,
  setActiveTab,
}: {
  activeTab: 'login' | 'register';
  setActiveTab: (tab: 'login' | 'register') => void;
}) => (
  <div className="flex justify-center mb-6 border-b border-gray-200">
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
);

export default AuthTabs;
