import React from 'react'
import Footer from '../../components/Footer/Footer'
import SessionsChart from '../../components/Grafica/Grafica'
import Donut from '../../components/Donut/Donut'
import Donut2 from '../../components/Donut/Donut2'

const Home = () => {
  return (
    <>
    <div className='mainRight'></div>
    <div className='mainRightDonutGraphics'>
          <Donut/>
          <Donut2/>
          
          
      </div>
      <div></div>
      <SessionsChart/>
      <Footer/>
    <div/>
    </>
  )
}

export default Home