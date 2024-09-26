import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../NavPC/NavPC.css'

const NavPC = () => {
    const [currentTime, setCurrentTime] = useState('');

    const navigate = useNavigate();
  
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
          <div>Logo</div>
          <button onClick={() => navigate('estadisticas/')}>Ir</button>
          <div>{currentTime}</div>
        </nav>
      </>
    );
  };

export default NavPC