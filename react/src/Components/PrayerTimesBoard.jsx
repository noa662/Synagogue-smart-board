import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card } from 'primereact/card';

const PrayerTimesBoard = ({ apiUrl }) => {
  const [prayerTimes, setPrayerTimes] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPrayerTimes = async () => {
      try {
        const response = await axios.get(apiUrl);
        setPrayerTimes(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch prayer times');
        setLoading(false);
      }
    };

    fetchPrayerTimes();
    const interval = setInterval(fetchPrayerTimes, 60000); // עדכון כל דקה
    return () => clearInterval(interval);
  }, [apiUrl]);

  if (loading) return <p>Loading prayer times...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>

      <Card title="זמני תפילה" className="w-full md:w-6 mx-auto mt-4 shadow-lg">
        {prayerTimes && (
          <ul className="list-none p-0 m-0">
            <li><strong>שחרית:</strong> {prayerTimes.shacharit}</li>
            <li><strong>מנחה:</strong> {prayerTimes.mincha}</li>
            <li><strong>ערבית:</strong> {prayerTimes.arvit}</li>
          </ul>
        )}
      </Card>
    </div>
  );
};

export default PrayerTimesBoard;
