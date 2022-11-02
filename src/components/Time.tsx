import React, { useState } from 'react';

const Time = () => {
  let now = new Date().toLocaleTimeString();
  const [time, settime] = useState(now);

  const updateTime = () => {
    now = new Date().toLocaleTimeString();
    settime(now);
  };

  setInterval(updateTime, 1000);
  return <div className="absolute left-5 font-Worksans -mt-2 font-semibold text-[15px]">{time.slice(0, 5)}</div>;
};

export default Time;
