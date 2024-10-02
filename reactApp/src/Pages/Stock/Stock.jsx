import React from 'react'
import StockComponent from '../../components/Stock/StockComponent'
import AlertaAsistencia from '../../components/Alertas/Alertas'

const Stock = () => {
  return (
    <>
    <div>
      <div className='Alert_Container'><AlertaAsistencia/></div>
      <StockComponent/>
    </div>
    
    </>
  )
}

export default Stock