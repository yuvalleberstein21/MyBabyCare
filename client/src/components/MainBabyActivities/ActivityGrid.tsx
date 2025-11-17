const ActivityGrid = ({ activities, onSelect }: any) => (
  <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-2 gap-6">
    {activities.map((act: any) => (
      <button
        key={act.key}
        onClick={() => onSelect(act.key)}
        className={`bg-gradient-to-br ${act.color} text-white rounded-2xl shadow-md p-8 flex flex-col items-center justify-center gap-3 transform hover:scale-105 transition duration-300`}
      >
        {act.icon}
        <span className="text-lg font-semibold">{act.label}</span>
      </button>
    ))}
  </div>
);

export default ActivityGrid;
