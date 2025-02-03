
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const NotificationIcon = () => {
  const [announcementCount, setAnnouncementCount] = useState(0);

  useEffect(() => {
    const fetchAnnouncementCount = async () => {
      try {
        const res = await axios.get('https://bistro-boss-server-eight-cyan.vercel.app/announcements/count');
        setAnnouncementCount(res.data.count);
      } catch (err) {
        console.error('Error fetching announcement count:', err);
      }
    };

    fetchAnnouncementCount();
  }, []);

  return (
    <div className="relative">
      <button className="relative">
        <span role="img" aria-label="notification" className="text-2xl">
          🔔
        </span>
        {announcementCount > 0 && (
          <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs px-2 py-0.5 rounded-full">
            {announcementCount}
          </span>
        )}
      </button>
    </div>
  );
};

export default NotificationIcon;
