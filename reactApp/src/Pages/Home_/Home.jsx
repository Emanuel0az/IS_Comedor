import React from 'react'
import Footer from '../../components/Footer/Footer'
import SessionsChart from '../../components/Grafica/Grafica'
import Donut from '../../components/Donut/Donut'
import Donut2 from '../../components/Donut/Donut2'
import Donut3 from '../../components/Donut/Donut3'
import Donut4 from '../../components/Donut/Donut4'
import Donut5 from '../../components/Donut/Donut5'
import './Home.css'

const Home = () => {
  return (
    <>
    <div className='xdxd'></div>
    <div className='faffa'>
      <div>
          <Donut/>
      </div>
      <div>
          <Donut2/>
      </div>
      <div>
          <Donut3/>
      </div>
      <div>
          <Donut4/>
      </div>
      <div>
          <Donut5/>
      </div>
          
    </div>
    <SessionsChart/>
    <Footer/>
    <div/>
    </>
  )
}

export default Home