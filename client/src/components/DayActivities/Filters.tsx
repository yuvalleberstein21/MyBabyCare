// @ts-nocheck
interface FiltersProps {
  filter: 'all' | 'feeding' | 'sleep' | 'diaper' | 'health';
  setFilter: (
    filter: 'all' | 'feeding' | 'sleep' | 'diaper' | 'health'
  ) => void;
}
export const Filters: React.FC<FiltersProps> = ({ filter, setFilter }) => {
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
          className={`px-2 py-1 rounded-full border text-md transition ${
            filter === btn.key
              ? 'border-primary border-2 px-4 rounded-lg bg-slate-100 text-primary font-semibold'
              : 'border-none rounded-lg px-4 bg-gray-100 text-slate-600 font-semibold'
          }`}
        >
          {btn.label}
        </button>
      ))}
    </div>
  );
};
