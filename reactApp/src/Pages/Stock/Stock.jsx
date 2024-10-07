import React from 'react'
import StockComponent from '../../components/Stock/StockComponent'


import '../Stock/Stock.css'


const Stock = () => {
  
  return (
    <>
    
    <div>
      
        <div className='Alert_Container'></div>
        <StockComponent/>
        

    </div>
    
    <div className='StockPage'>
      
    </div>  
    </>
  )
}

export default Stock