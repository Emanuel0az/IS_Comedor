import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../NavPC/NavPC.css'
import ToggleSwitch from '../ToggleSwitch/ToggleSwitch';

const NavPC = () => {
    const horaConCero = ['1:', '2:', '3:', '4:', '5:', '6:', '7:', '8:', '9:'];
    const [currentTime, setCurrentTime] = useState('');

    const navigate = useNavigate();
  
useEffect(() => {
  const updateTime = () => {
    const currentTime = new Date().toLocaleTimeString().slice(0, 4);
    if (horaConCero.includes(currentTime.slice(0, 2))) {
      setCurrentTime('0' + currentTime);
    } else {
      setCurrentTime(new Date().toLocaleTimeString().slice(0, 5))
    }
  };
  updateTime();
  const intervalId = setInterval(updateTime, 1000);
  return () => clearInterval(intervalId);
}, [horaConCero]);

  function log () {
    localStorage.removeItem('user');
  navigate('/login');
  }
    
  

  
    return (
      <>
      <nav>
        <div>LEGO</div>
        <div onClick={log}>LOGO</div>
        <div><ToggleSwitch /></div>
        <div>{currentTime}</div>
      </nav>
    </>
    );
  };

export default NavPC


// https://mui.com/material-ui/getting-started/templates/dashboard/