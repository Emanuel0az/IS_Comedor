import React, { useState, useEffect } from 'react';
import HomeIcon from '@mui/icons-material/Home';
import BarChartIcon from '@mui/icons-material/BarChart';
import MailIcon from '@mui/icons-material/Mail';
import InventoryIcon from '@mui/icons-material/Inventory';
import { useNavigate } from 'react-router-dom';
import './SideBar.css';

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
          <div onClick={() => navigate('home/')}>
            <HomeIcon style={{ fontSize: 20 }} />
            <div>Home</div>
          </div>
          <div onClick={() => navigate('stock/')}>
            <InventoryIcon style={{ fontSize: 19 }} />
            <div>Inventario</div>
          </div>
          <div onClick={() => navigate('estadisticas/')}>
            <BarChartIcon style={{ fontSize: 21 }} />
            <div>Estadísticas</div>
          </div>
          <div onClick={() => navigate('email/')}>
            <MailIcon style={{ fontSize: 20 }} />
            <div>Email</div>
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
