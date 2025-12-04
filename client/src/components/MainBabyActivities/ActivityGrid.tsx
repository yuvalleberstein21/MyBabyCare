import { SubTitle } from '../ui/SubTitle';

const ActivityGrid = ({
  activities,
  onSelect,
  isSleepActive,
  sleepDuration,
  loading,
}) => (
  <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-2 gap-6">
    {activities.map((act) => {
      const isSleepButton = act.key === 'sleep';

      const customColor =
        isSleepButton && isSleepActive ? 'from-red-600 to-red-400' : act.color;

      const customLabel =
        isSleepButton && isSleepActive
          ? `עצור שינה (${sleepDuration})`
          : act.label;

      return (
        <button
          key={act.key}
          onClick={() => onSelect(act.key)}
          className={`bg-gradient-to-br ${customColor} text-white rounded-2xl shadow-md p-8 flex flex-col items-center justify-center gap-3 transform hover:scale-105 transition duration-300`}
          disabled={loading}
        >
          {act.icon}
          <SubTitle className="text-lg font-semibold">
            {loading && isSleepButton ? 'טוען נתונים...' : customLabel}
          </SubTitle>
        </button>
      );
    })}
  </div>
);

export default ActivityGrid;
