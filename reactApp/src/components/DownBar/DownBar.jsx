import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './DownBar.css'
import Cookies from 'js-cookie';
import HomeIcon from '@mui/icons-material/Home';
import BarChartIcon from '@mui/icons-material/BarChart';
import MailIcon from '@mui/icons-material/Mail';
import PeopleIcon from '@mui/icons-material/People';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import { useIdContext } from '../UsinngContext';

const DownBar = () => {
  const [colorState, setColorState] = useState(() => {
    return localStorage.getItem('colorState') === 'true';
  });
  const {colorStateGlobal} = useIdContext()

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
      <div className={`navMobile${colorStateGlobal ? 'White' : 'Dark'}`}>
        <div className={selectedLink === 'home' ? 'selectedDown' : 'inselectedDown'} onClick={() => { changeSelection('home'); navigate('home/'); Cookies.remove('token'); }}>
          <div><HomeIcon style={{ fontSize: 25 }} /></div>
        </div>
        <div className={selectedLink === 'asistencia' ? 'selectedDown' : 'inselectedDown'} onClick={() => { changeSelection('asistencia'); navigate('asistencias/'); Cookies.remove('token'); }}>
        <div><PeopleIcon style={{ fontSize: 25 }} /></div>
        </div>
        <div className={selectedLink === 'email' ? 'selectedDown' : 'inselectedDown'} onClick={() => { changeSelection('email'); navigate('email/'); Cookies.remove('token'); }}>
        <div><MailIcon style={{ fontSize: 25 }} /></div>
        </div>
        <div className={selectedLink === 'estudiantes' ? 'selectedDown' : 'inselectedDown'} onClick={() => { changeSelection('estudiantes'); navigate('estudiantes/'); Cookies.remove('token'); }}>
          <div><PersonAddAlt1Icon style={{ fontSize: 25 }} /></div>
        </div>
        {/* {hasToken2 && (
          <div className={selectedLink === 'usuarios' ? 'selected' : 'inselectedDown'} onClick={() => { changeSelection('usuarios'); navigate('usuarios/'); Cookies.remove('token'); }}>
            <PersonAddAlt1Icon style={{ fontSize: 25 }} />
          </div>
        )} */}
      </div>
    </>
  );
};

export default DownBar;