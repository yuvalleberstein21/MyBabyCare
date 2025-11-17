export const Filters = ({ filter, setFilter }) => {
  const buttons = [
    { key: 'all', label: 'הכל' },
    { key: 'feeding', label: 'האכלה' },
    { key: 'sleep', label: 'שינה' },
    { key: 'diaper', label: 'חיתולים' },
    { key: 'health', label: 'בריאות' },
  ];

  return (
    <div className="flex gap-2 mb-4 flex-wrap">
      {buttons.map((btn) => (
        <button
          key={btn.key}
          onClick={() => setFilter(btn.key)}
          className={`px-3 py-1 rounded-full border text-sm transition ${
            filter === btn.key
              ? 'bg-blue-600 text-white border-blue-700'
              : 'bg-white text-gray-700 border-gray-300'
          }`}
        >
          {btn.label}
        </button>
      ))}
    </div>
  );
};
