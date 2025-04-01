import React, { useState, useEffect } from 'react';
import axios from 'axios';

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
      <h2>Prayer Times</h2>
      {prayerTimes && (
        <ul>
          <li>Shacharit: {prayerTimes.shacharit}</li>
          <li>Mincha: {prayerTimes.mincha}</li>
          <li>Arvit: {prayerTimes.arvit}</li>
        </ul>
      )}
    </div>
  );
};

export default PrayerTimesBoard;
