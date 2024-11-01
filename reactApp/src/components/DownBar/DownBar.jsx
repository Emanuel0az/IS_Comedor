import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './DownBar.css'
import Cookies from 'js-cookie';
import HomeIcon from '@mui/icons-material/Home';
import BarChartIcon from '@mui/icons-material/BarChart';
import MailIcon from '@mui/icons-material/Mail';
import PeopleIcon from '@mui/icons-material/People';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';

const DownBar = () => {
  const [colorState, setColorState] = useState(() => {
    return localStorage.getItem('colorState') === 'true';
  });

  const [selectedLink, setSelectedLink] = useState('');

  const changeSelection = (link) => {
    setSelectedLink(link);
  };

  const navigate = useNavigate();


  useEffect(() => {
    const checkColorState = () => {
      const storedColorState = localStorage.getItem('colorState') === 'true';
      setColorState(storedColorState);
    };

    const intervalId = setInterval(checkColorState, 10);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <>
      <div className='navMobile'>
        <div className={selectedLink === 'home' ? 'selected' : 'inselected'} onClick={() => { changeSelection('home'); navigate('home/'); Cookies.remove('token'); }}>
          <HomeIcon style={{ fontSize: 25 }} />
        </div>
        <div className={selectedLink === 'asistencia' ? 'selected' : 'inselected'} onClick={() => { changeSelection('asistencia'); navigate('asistencias/'); Cookies.remove('token'); }}>
          <PeopleIcon style={{ fontSize: 25 }} />
        </div>
        <div className={selectedLink === 'estadisticas' ? 'selected' : 'inselected'} onClick={() => { changeSelection('estadisticas'); navigate('estadisticas/'); Cookies.remove('token'); }}>
          <BarChartIcon style={{ fontSize: 25 }} />
        </div>
        <div className={selectedLink === 'email' ? 'selected' : 'inselected'} onClick={() => { changeSelection('email'); navigate('email/'); Cookies.remove('token'); }}>
          <MailIcon style={{ fontSize: 25 }} />
        </div>
        <div className={selectedLink === 'estudiantes' ? 'selected' : 'inselected'} onClick={() => { changeSelection('estudiantes'); navigate('estudiantes/'); Cookies.remove('token'); }}>
          <PersonAddAlt1Icon style={{ fontSize: 25 }} />
        </div>
      </div>
    </>
  );
};

export default DownBar;