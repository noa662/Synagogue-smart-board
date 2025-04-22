import { Card } from 'primereact/card';

const PrayerTimesBoard = ({ prayerTimes }) => {
  if (!prayerTimes) {
    return <p className="text-center text-gray-600">טוען זמני תפילה...</p>;
  }

  return (
    <div className="max-w-md mx-auto mt-6">
      <Card title="זמני תפילה" className="shadow-2xl border-round-xl">
        <ul className="text-lg text-gray-800 space-y-2 leading-relaxed list-none p-0 m-0">
          <li><strong>שחרית:</strong> {prayerTimes.shacharit}</li>
          <li><strong>מנחה:</strong> {prayerTimes.mincha}</li>
          <li><strong>ערבית:</strong> {prayerTimes.maariv}</li>
        </ul>
      </Card>
    </div>
  );
};

export default PrayerTimesBoard;
