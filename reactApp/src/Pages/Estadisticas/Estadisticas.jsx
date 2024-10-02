import React from 'react'
import NavPC from '../../components/NavPC/NavPC'
import '../Estadisticas/Estadisticas.css'
import Donut from '../../components/Donut/Donut'

import SessionsChart from '../../components/Grafica/Grafica'




const Estadisticas = () => {

  return (
    <>
      <NavPC/>
      <div className='main'>
        <div className='mainLeft'>
          <div className='mainLeftTop'>Morado</div>
          <div className='mainLeftBottom'>Celeste</div>
        </div>
        <div className='mainRight'>
          <div className='mainRightDonutGraphics'>
          <Donut/>
          <Donut/>
          <Donut/>
          <Donut/>
          
          </div>
          {/* /////// */}
          <div className="apartOfCharts">
            <div className="containerBarChart">
            <SessionsChart/>

            </div>
            <div className="containerChartLine"></div>

            
            </div>
            <div className="containerChartLine">
            
            </div>

          </div>
          
        </div>
      
    </>
  )
}

export default Estadisticas