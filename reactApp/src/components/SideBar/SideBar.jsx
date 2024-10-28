import React, { useState, useEffect } from 'react';
import HomeIcon from '@mui/icons-material/Home';
import BarChartIcon from '@mui/icons-material/BarChart';
import MailIcon from '@mui/icons-material/Mail';
import InventoryIcon from '@mui/icons-material/Inventory';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import { useNavigate } from 'react-router-dom';
import './SideBar.css';
import Cookies from 'js-cookie';

const SideBar = () => {
  const [colorState, setColorState] = useState(() => {
    return localStorage.getItem('colorState') === 'true';
  });

  const [selectedLink, setSelectedLink] = useState('');

  useEffect(() => {
    const checkColorState = () => {
      const storedColorState = localStorage.getItem('colorState') === 'true';
      setColorState(storedColorState);
    };

    const intervalId = setInterval(checkColorState, 10);
    return () => clearInterval(intervalId);
  }, []);

  const changeSelection = (link) => {
    setSelectedLink(link);
  };

  const navigate = useNavigate();

  return (
    <div className={`sideBarContainer${colorState ? 'Day' : 'Night'}`}>
      <div className='sideBarTop'>
        <div className={selectedLink === 'home' ? 'selected' : 'inselected'} onClick={() => { changeSelection('home'); navigate('home/'); Cookies.remove('token'); }}>
          <HomeIcon style={{ fontSize: 20 }} />
          <div>Home</div>
        </div>
        <div className={selectedLink === 'asistencia' ? 'selected' : 'inselected'} onClick={() => { changeSelection('asistencia'); navigate('asistencias/'); Cookies.remove('token'); }}>
          <InventoryIcon style={{ fontSize: 19 }} />
          <div>Asistencia</div>
        </div>
        <div className={selectedLink === 'estadisticas' ? 'selected' : 'inselected'} onClick={() => { changeSelection('estadisticas'); navigate('estadisticas/'); Cookies.remove('token'); }}>
          <BarChartIcon style={{ fontSize: 21 }} />
          <div>Estadísticas</div>
        </div>
        <div className={selectedLink === 'email' ? 'selected' : 'inselected'} onClick={() => { changeSelection('email'); navigate('email/'); Cookies.remove('token'); }}>
          <MailIcon style={{ fontSize: 20 }} />
          <div>Email</div>
        </div>
        <div className={selectedLink === 'ingredientes' ? 'selected' : 'inselected'} onClick={() => { changeSelection('ingredientes'); navigate('ingredientes/'); Cookies.remove('token'); }}>
          <RestaurantIcon style={{ fontSize: 20 }} />
          <div>Ingredientes</div>
        </div>
      </div>
      <div className='sideBarBottom'>
        <div className="sideBarBottom"></div>
      </div>
    </div>
  );
};

export default SideBar;
