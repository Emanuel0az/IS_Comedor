import React, { useState, useEffect } from 'react';
import HomeIcon from '@mui/icons-material/Home';
import BarChartIcon from '@mui/icons-material/BarChart';
import MailIcon from '@mui/icons-material/Mail';
import PeopleIcon from '@mui/icons-material/People';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import LogoutIcon from '@mui/icons-material/Logout';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import { useNavigate } from 'react-router-dom';
import './SideBar.css';
import Cookies from 'js-cookie';
import { useIdContext } from '../UsinngContext';

const SideBar = () => {
  const [colorState, setColorState] = useState(() => {
    return localStorage.getItem('colorState') === 'true';
  });

  const {colorStateGlobal, setColorStateGlobal} = useIdContext()

  const [selectedLink, setSelectedLink] = useState('');
  const [hasToken2, setHasToken2] = useState(false);

  useEffect(() => {

    const checkToken2 = () => {
      const token2Exists = !!Cookies.get('token2');
      setHasToken2(token2Exists);
    };

    setColorStateGlobal(colorState)

    const intervalId = setInterval(() => {
      checkToken2();
    }, 10);

    return () => clearInterval(intervalId);
  }, [colorState]);

  const changeSelection = (link) => {
    setSelectedLink(link);
  };

  const navigate = useNavigate();

  function log () {     // 🔴🔴🔴🔴🔴🔴
    Cookies.remove('token2');
    Cookies.remove('token3');
    localStorage.removeItem('chef');
  navigate('/login');
  }

  return (
    <div className={`sideBarContainer${colorStateGlobal ? 'Day' : 'Night'}`}>
      <div className='sideBarTop'>
        <div className={selectedLink === 'home' ? 'selected' : 'inselected'} onClick={() => { changeSelection('home'); navigate('home/'); Cookies.remove('token'); }}>
          <HomeIcon style={{ fontSize: '2vw' }} />
          <div>Home</div>
        </div>
        <div className={selectedLink === 'asistencia' ? 'selected' : 'inselected'} onClick={() => { changeSelection('asistencia'); navigate('asistencias/'); Cookies.remove('token'); }}>
          <PeopleIcon style={{ fontSize: '2vw' }} />
          <div>Asistencia</div>
        </div>
        <div className={selectedLink === 'email' ? 'selected' : 'inselected'} onClick={() => { changeSelection('email'); navigate('email/'); Cookies.remove('token'); }}>
          <MailIcon style={{ fontSize: '2vw' }} />
          <div>Email</div>
        </div>
        <div className={selectedLink === 'estudiantes' ? 'selected' : 'inselected'} onClick={() => { changeSelection('estudiantes'); navigate('estudiantes/'); Cookies.remove('token'); }}>
          <PersonAddAlt1Icon style={{ fontSize: '2vw' }} />
          <div>Estudiantes</div>
        </div>

        {hasToken2 && (
          <div className={selectedLink === 'usuarios' ? 'selected' : 'inselected'} onClick={() => { changeSelection('usuarios'); navigate('usuarios/'); Cookies.remove('token'); }}>
            <PersonAddAlt1Icon style={{ fontSize: 20 }} />
            <div>Usuarios</div>
          </div>
        )}
      </div>
      <div className='sideBarBottom'> 
        <div className="sideBarBottom2"  onClick={log}><LogoutIcon style={{ fontSize: 30 }} /></div>
      </div>
    </div>
  );
};

export default SideBar;