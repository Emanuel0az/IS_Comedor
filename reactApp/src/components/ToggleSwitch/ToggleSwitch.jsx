import React, { useState } from 'react'
import '../ToggleSwitch/ToggleSwitch.css'
import dayLogo from '../../assets/sun.png'
import nightLogo from '../../assets/moon.png'

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
            <img className='imgNight' src={nightLogo}></img> :
            <img className='imgDay' src={dayLogo}></img>}
        </div>
    </div>
  )
}

export default ToggleSwitch