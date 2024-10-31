import React from 'react'
import Footer from '../../components/Footer/Footer'
import SessionsChart from '../../components/Grafica/Grafica'
import Donut from '../../components/Donut/Donut'

const Home = () => {
  return (
    <>
    <div className='mainRight'></div>
    <div className='mainRightDonutGraphics'>
          <Donut/>
          
          
      </div>
      <div></div>
      <SessionsChart/>
      <Footer/>
    <div/>
    </>
  )
}

export default Home