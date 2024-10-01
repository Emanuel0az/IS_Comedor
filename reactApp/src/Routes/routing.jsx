import { Route, Routes } from 'react-router-dom'

import Home from '../Pages/Home_/Home'
import Estadisticas from '../Pages/Estadisticas/Estadisticas'


const Routing = () => {
  return (
    <>
    <Routes>

        <Route path='*' element={<Home/>} />
        <Route path='estadisticas/' element={<Estadisticas/>} />
    </Routes>
    </>
  )
}


export default Routing