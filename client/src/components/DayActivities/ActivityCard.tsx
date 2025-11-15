import {
  formatISDate,
  typeIcons,
  typeLabels,
} from '../../utils/FormatedISDate';

export const ActivityCard = ({ act }) => {
  return (
    <div className="p-4 rounded-xl shadow-sm border bg-white flex flex-col gap-2">
      <div className="flex items-center gap-2 mb-1">
        <span className="text-lg">{typeIcons[act.type]}</span>
        <span className="font-semibold text-gray-800">
          {typeLabels[act.type]}
        </span>
      </div>

      {act.time && (
        <p className="text-sm text-gray-600">
          <span className="font-semibold">תאריך ושעה:</span>{' '}
          {formatISDate(act.time)}
        </p>
      )}

      {act.startTime && (
        <p className="text-sm text-gray-600">
          <span className="font-semibold">התחלה:</span>{' '}
          {formatISDate(act.startTime)}
        </p>
      )}

      {act.endTime && (
        <p className="text-sm text-gray-600">
          <span className="font-semibold">סיום:</span>{' '}
          {formatISDate(act.endTime)}
        </p>
      )}

      {act.duration && (
        <p className="text-sm text-gray-600">
          <span className="font-semibold">משך:</span> {act.duration} דק'
        </p>
      )}

      {act.amount && (
        <p className="text-sm text-gray-600">
          <span className="font-semibold">כמות:</span> {act.amount} מ״ל
        </p>
      )}

      {act.notes && (
        <p className="text-xs text-gray-500 italic">הערות: {act.notes}</p>
      )}
    </div>
  );
};
