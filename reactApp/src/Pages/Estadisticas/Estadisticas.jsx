import React from 'react'
import NavPC from '../../components/NavPC/NavPC'
import '../Estadisticas/Estadisticas.css'
import Donut from '../../components/Donut/Donut'

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
          {/* Aquí va el top ese de Home > Estadísticas */}

          <div className='mainRightDonutGraphics'>

          <div className="containerDonut">
              <div className="containerTopDonut">
                <div className='donutLeft'>
                  <div className='tittleDonut'>Nombre</div>
                  <div className='imgDonut'>img</div>
                </div>
                <div className='donutRight'></div>
              </div>
              <div className='containerButtomDonut'>
                <div className="textoDonut">Aquí va el texto</div>
                <div className="estadoStock">Bajo</div>
              </div>
            </div>            

            <div className="containerDonut">
              <div className="containerTopDonut">
                <div className='donutLeft'>
                  <div className='tittleDonut'>Nombre</div>
                  <div className='imgDonut'>img</div>
                </div>
                <div className='donutRight'></div>
              </div>
              <div className='containerButtomDonut'>
                <div className="textoDonut">Aquí va el texto</div>
                <div className="estadoStock">Alto</div>
              </div>
            </div>

            <div className="containerDonut">
              <div className="containerTopDonut">
                <div className='donutLeft'>
                  <div className='tittleDonut'>Nombre</div>
                  <div className='imgDonut'>img</div>
                </div>
                <div className='donutRight'></div>
              </div>
              <div className='containerButtomDonut'>
                <div className="textoDonut">Aquí va el texto</div>
                <div className="estadoStock">Bajo</div>
              </div>
            </div>

            <div className="containerDonut">
              <div className="containerTopDonut">
                <div className='donutLeft'>
                  <div className='tittleDonut'>Nombre</div>
                  <div className='imgDonut'>img</div>
                </div>
                <div className='donutRight'>
                  <Donut/>
                </div>
              </div>
              <div className='containerButtomDonut'>
                <div className="textoDonut">Aquí va el texto</div>
                <div className="estadoStock">Medio</div>
              </div>
            </div>
          </div>
          {/* /////// */}
          <div className="apartOfCharts">
            <div className="containerBarChart"></div>
            <div className="containerChartLine"></div>
          </div>
          
        </div>
      </div>
    </>
  )
}

export default Estadisticas