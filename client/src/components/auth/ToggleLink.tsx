const ToggleLink = ({
  activeTab,
  setActiveTab,
}: {
  activeTab: 'login' | 'register';
  setActiveTab: (tab: 'login' | 'register') => void;
}) => (
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
);

export default ToggleLink;
