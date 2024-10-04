import React from 'react'
import StockComponent from '../../components/Stock/StockComponent'
import AlertaAsistencia from '../../components/Alertas/Alertas'
import { CustomModal  } from '../../components/Modal/Modal'

const Stock = () => {
  return (
    <>
    
    <div>
      
        <div className='Alert_Container'></div>
        <StockComponent/>
        

    </div>
    
    </>
  )
}

export default Stock