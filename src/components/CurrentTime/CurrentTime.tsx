import React, { useState, useEffect } from 'react';

function CurrentTime() {
  const [currentTime, setCurrentTime] = useState('');

  useEffect(() => {
    const intervalId = setInterval(() => {
      const date = new Date();
      const hours = String(date.getHours()).padStart(2, '0');
      const minutes = String(date.getMinutes()).padStart(2, '0');
      const seconds = String(date.getSeconds()).padStart(2, '0');
      const dateFormat = `${hours}:${minutes}:${seconds}`;
      setCurrentTime(dateFormat);
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return <>{currentTime}</>;
}

export default CurrentTime;
