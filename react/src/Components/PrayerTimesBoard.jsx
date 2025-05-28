import { Card } from 'primereact/card';
import { Toast } from 'primereact/toast';
import { usePrayerTimes } from "../Hooks/usePrayerTimes";

const PrayerTimesBoard = () => {
  const { prayerTimes, error, today, toast } = usePrayerTimes();

  if (!prayerTimes && !error) {
    return <p className="text-center text-gray-600 text-xl">טוען זמני תפילה...</p>;
  }

  const cardHeader = (
    <div style={{ textAlign: 'center', marginBottom: '1rem' }}>
      <h2 style={{ fontSize: '2.5rem', fontWeight: 'bold', margin: 0, color: '#3b3b98' }}>
        זמני תפילה ליום
      </h2>
      <p style={{ fontSize: '1.5rem', color: '#6c757d', margin: 0 }}>
        {today.toLocaleDateString('he-IL')}
      </p>
    </div>
  );

  return (
    <div className="max-w-md mx-auto mt-6" dir="rtl" style={{ paddingTop: "10vh" }}>
      <Toast ref={toast} position="top-center" />
      <Card header={cardHeader} className="shadow-2xl border-round-xl p-6">
        {error ? (
          <p className="text-red-600 text-xl" style={{ textAlign: 'center' }}>{error}</p>
        ) : (
          <ul className="list-none p-0 m-0 space-y-4 text-2xl text-gray-900 leading-relaxed" style={{ textAlign: 'center' }}>
            <li><strong style={{ fontSize: '2.8rem' }}>שחרית:</strong> <span style={{ fontSize: '2.8rem', color: '#3182ce' }}>{prayerTimes.shacharit}</span></li>
            <li><strong style={{ fontSize: '2.8rem' }}>מנחה:</strong> <span style={{ fontSize: '2.8rem', color: '#38a169' }}>{prayerTimes.mincha}</span></li>
            <li><strong style={{ fontSize: '2.8rem' }}>ערבית:</strong> <span style={{ fontSize: '2.8rem', color: '#805ad5' }}>{prayerTimes.maariv}</span></li>
          </ul>
        )}
      </Card>
    </div>
  );
};

export default PrayerTimesBoard;

