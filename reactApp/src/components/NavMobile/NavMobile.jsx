import React, { useState, useEffect } from 'react';
import '../NavMobile/NavMobile.css'

const NavMobile = () => {
  const [currentTime, setCurrentTime] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const currentTime = new Date().toLocaleTimeString().slice(0, 5);
      setCurrentTime(currentTime);
    };
    updateTime();
    const intervalId = setInterval(updateTime, 1000);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <>
      <nav>
        <div><img src="" />Logo</div>
        <div>{currentTime}</div>
      </nav>
    </>
  );
};

export default NavMobile;