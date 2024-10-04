import React, { useState } from 'react'
import '../ToggleSwitch/ToggleSwitch.css'
import ModeNightIcon from '@mui/icons-material/ModeNight';
import LightModeIcon from '@mui/icons-material/LightMode';

const ToggleSwitch = () => {
    const [colorState, setColorState] = useState(false)
    localStorage.setItem('colorState', colorState)

    const handleColorState = () => {
        setColorState(!colorState)
    }


  return (
    <div onClick={(() => handleColorState())} className={`toggle_switch_container_${colorState ? 'day' : 'night'}`}>
        <div className={`circleSwitch${colorState ? 'Day' : 'Night'}`}>
            {colorState ? 
            <ModeNightIcon className='imgNight'/> :
            <LightModeIcon className='imgDay' />
            }
        </div>
    </div>
  )
}

export default ToggleSwitch