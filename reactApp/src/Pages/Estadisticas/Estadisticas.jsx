import React from 'react'
import NavPC from '../../components/NavPC/NavPC'
import '../Estadisticas/Estadisticas.css'
import Donut from '../../components/Donut/Donut'
import SessionsChart from '../../components/LineChart/LineChart'

const Estadisticas = () => {

  return (
    <>
        <div className='mainRight'>
          <div className='mainRightDonutGraphics'>
          <Donut/>
          <Donut/>
          </div>
          {/* /////// */}
          <div className="apartOfCharts">
            <div className="containerBarChart">
            <SessionsChart/>
            </div>
            <div className="containerChartLine">
              
            </div>
          </div>
          
        </div>
    </>
  )
}

export default Estadisticas