import React from 'react'
import '../Estadisticas/Estadisticas.css'
import Donut from '../../components/Donut/Donut'

import SessionsChart from '../../components/Grafica/Grafica'




const Estadisticas = () => {

  return (
    <>
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
    </>
  )
}

export default Estadisticas