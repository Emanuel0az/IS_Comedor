import { Route, Routes } from 'react-router-dom'

import Home from '../Pages/Home_/Home'
import Estadisticas from '../Pages/Estadisticas/Estadisticas'
import Stock from '../Pages/Stock/Stock'
import Email from '../Pages/Email_/Email'


const Routing = () => {
  return (
    <>
    <Routes>
        <Route path='' element={<Home/>} />
        <Route path='estadisticas/' element={<Estadisticas/>} />
        <Route path='stock/' element={<Stock/>} />
        <Route path='email/' element={<Email/>} />
    </Routes>
    </>
  )
}


export default Routing