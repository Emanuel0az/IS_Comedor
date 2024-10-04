import React from 'react'
import '../SideBar/SideBar.css'
import HomeIcon from '@mui/icons-material/Home';
import BarChartIcon from '@mui/icons-material/BarChart';
import MailIcon from '@mui/icons-material/Mail';
import InventoryIcon from '@mui/icons-material/Inventory';
import { useNavigate } from 'react-router-dom';

const SideBar = () => {

  const navigate = useNavigate();

  return (
    <>
    <div className="sideBarContainer">
        <div className='sideBarTop'>
          <div onClick={(() => navigate('home/'))}>
            <HomeIcon style={{ fontSize: 25 }} />
            <div>Home</div>
          </div>
          <div onClick={(() => navigate('stock/'))}>
            <InventoryIcon style={{ fontSize: 23 }} />
            <div>Inventario</div>
          </div>
          <div onClick={(() => navigate('estadisticas/'))}>
            <BarChartIcon style={{ fontSize: 26 }} />
            <div>Estadísticas</div>
          </div>

        </div>
        <div className='sideBarBottom'>
            <div className="sideBarBottom">

            </div>
        </div>
    </div>

    </>
  )
}

export default SideBar