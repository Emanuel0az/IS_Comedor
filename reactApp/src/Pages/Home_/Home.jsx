import React from 'react'
import Footer from '../../components/Footer/Footer'
import SessionsChart from '../../components/Grafica/Grafica'
import Donut from '../../components/Donut/Donut'
import Donut2 from '../../components/Donut/Donut2'
import Donut3 from '../../components/Donut/Donut3'
import Donut4 from '../../components/Donut/Donut4'
import Donut5 from '../../components/Donut/Donut5'
import './Home.css'
import { Panae } from '../../components/Panae/Panae'
import { Panae2 } from '../../components/Panae/Panae2'
import { Panae3 } from '../../components/Panae/Panae3'

const Home = () => {
  return (
    <>
    <div className='xdxd'></div>
      <div className='Panae_container'>
        <div>
          <Panae/>
        </div>
        <div>
          <Panae2/>
        </div>
        <div>
          <Panae3/>
        </div>
      </div>

      <div className='containerDonuts'>
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