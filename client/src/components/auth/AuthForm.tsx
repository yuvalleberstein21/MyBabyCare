import Button from '../ui/Button';

const AuthForm = ({
  activeTab,
  fullName,
  setFullName,
  email,
  setEmail,
  password,
  setPassword,
  confirmPassword,
  setConfirmPassword,
  handleSubmit,
  loading,
}: {
  activeTab: 'login' | 'register';
  fullName: string;
  setFullName: (val: string) => void;
  email: string;
  setEmail: (val: string) => void;
  password: string;
  setPassword: (val: string) => void;
  confirmPassword: string;
  setConfirmPassword: (val: string) => void;
  handleSubmit: (e: React.FormEvent) => void;
  loading: boolean;
}) => (
  <div className="space-y-4">
    <form onSubmit={handleSubmit} className="space-y-3">
      {activeTab === 'register' && (
        <div className="relative">
          <input
            type="fullName"
            placeholder="שם מלא"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className="w-full border border-gray-300 rounded-lg p-3 pl-10 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
          />
          <span className="absolute left-3 top-3 text-gray-400">📧</span>
        </div>
      )}
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
        disabled={loading}
        className="w-full text-white rounded-xl py-3 font-semibold hover:opacity-90 transition shadow-lg"
        type="submit"
      >
        {loading ? 'טוען...' : activeTab === 'login' ? 'התחברות' : 'הרשמה'}
      </Button>
    </form>
  </div>
);

export default AuthForm;
