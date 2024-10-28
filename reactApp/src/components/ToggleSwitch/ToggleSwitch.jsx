import React, { useState, useEffect, useContext } from 'react'
import '../ToggleSwitch/ToggleSwitch.css'
import ModeNightIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';


const ToggleSwitch = () => {  

  const [colorState, setColorState] = useState(() => {
    // Inicializa el estado a partir de localStorage
    return localStorage.getItem('colorState') === 'true'; // Convierte a booleano
  });

  const handleColorState = () => {
    const newColorState = !colorState; // Calcula el nuevo estado.
    setColorState(newColorState);
    localStorage.setItem('colorState', newColorState); // Guarda el nuevo estado.
  };

  useEffect(() => {
    // Actualiza el localStorage cuando colorState cambie.
    localStorage.setItem('colorState', colorState);
  }, [colorState]);

  return (
    <>
      {/*He creado esto para aplicar un displayNone, ya que si no,
      los codigos de color se muestran como texto. */}
      <div className='oculto'>
        {document.body.style.backgroundColor = colorState ? '#ffffff' : '#262428'}
        {document.body.style.color = colorState ? 'black' : 'white'}
      </div>

      <div onClick={(() => handleColorState())} className={`toggle_switch_container_${colorState ? 'day' : 'night'}`}>
          <div className={`circleSwitch${colorState ? 'Day' : 'Night'}`} >
              {colorState ? 
              <div><LightModeIcon style={{ fontSize: 15 }} className='imgDay'/></div> :
              <div><ModeNightIcon style={{ fontSize: 18 }} className='imgNight' /></div>
              }
          </div>
      </div>
    </>
  )
}

export default ToggleSwitch