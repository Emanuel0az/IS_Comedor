import React, { useState, useEffect } from 'react';
import HomeIcon from '@mui/icons-material/Home';
import BarChartIcon from '@mui/icons-material/BarChart';
import MailIcon from '@mui/icons-material/Mail';
import InventoryIcon from '@mui/icons-material/Inventory';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import PeopleIcon from '@mui/icons-material/People';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import { useNavigate } from 'react-router-dom';
import './SideBar.css';
import Cookies from 'js-cookie'; 

const SideBar = () => {
  const [colorState, setColorState] = useState(() => {
    // Obtener el valor inicial desde localStorage
    return localStorage.getItem('colorState') === 'true';
  });

  useEffect(() => {
    // Función que actualiza el estado basado en el localStorage
    const checkColorState = () => {
      const storedColorState = localStorage.getItem('colorState') === 'true';
      setColorState(storedColorState);
    };

    // Revisar cada segundo si el valor en el localStorage cambió
    const intervalId = setInterval(checkColorState, 10);

    // Limpiar el intervalo cuando el componente se desmonta
    return () => clearInterval(intervalId);
  }, []);

  const navigate = useNavigate();

  return (
    <>
      <div className={`sideBarContainer${colorState ? 'Day' : 'Night '}`}>
        <div className='sideBarTop'>
            <div onClick={() => { navigate('home/');  Cookies.remove('token'); }}>           
               <HomeIcon style={{ fontSize: 20 }} />
            <div>Home</div>
          </div>
          <div onClick={() => {navigate('asistencias/');  Cookies.remove('token');}}>
            <PeopleIcon style={{ fontSize: 19 }} />
            <div>Asistencia</div>
          </div>
          <div onClick={() => {navigate('estadisticas/');  Cookies.remove('token');}}>
            <BarChartIcon style={{ fontSize: 21 }} />
            <div>Estadísticas</div>
          </div>
          <div onClick={() => {navigate('email/');  Cookies.remove('token');}}>
            <MailIcon style={{ fontSize: 20 }} />
            <div>Email</div>
          </div>
          <div onClick={() => {navigate('ingredientes/');  Cookies.remove('token');}}>
            <RestaurantIcon style={{ fontSize: 20 }} />
            <div>Ingredientes</div>
          </div>
          <div onClick={() => {navigate('add-estudiantes/');  Cookies.remove('token');}}>
            <PersonAddAlt1Icon style={{ fontSize: 20 }} />
            <div>Estudiantes</div>
          </div>
        </div>
        <div className='sideBarBottom'>
          <div className="sideBarBottom"></div>
        </div>
      </div>
    </>
  );
};

export default SideBar;
