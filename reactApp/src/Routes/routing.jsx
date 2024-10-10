import { Route, Routes } from 'react-router-dom'

import Home from '../Pages/Home_/Home'
import Estadisticas from '../Pages/Estadisticas/Estadisticas'
import Stock from '../Pages/Stock/Stock'
import Email from '../Pages/Email_/Email'
import { Ingredientes } from '../Pages/Ingredientes/Ingredientes'
import { Login } from '../Pages/Login/Login'
import { Login2 } from '../Pages/Login/Login2'
import { PrivateRoutes, PrivateRoutes2 } from "./privateRoutes"


const Routing = () => {
  return (
    <>
    <Routes>
        {/* <Route path='' element={<Home/>} />
        <Route path='home/' element={<Home/>} />
        <Route path='estadisticas/' element={<Estadisticas/>} />
        <Route path='stock/' element={<Stock/>} />
        <Route path='email/' element={<Email/>} />
        <Route path='ingredientes/' element={<Ingredientes/>} />
        <Route path='login/' element={<Login/>} /> */}
        <Route path="/login" element={<Login />} />
        <Route path="/access" element={<Login2 />} />
        <Route path='' element={
            <PrivateRoutes>
               <Home />
            </PrivateRoutes>
          } />
        <Route path='home/' element={
            <PrivateRoutes>
               <Home />
            </PrivateRoutes>
          } />
        <Route path='estadisticas/' element={
            <PrivateRoutes>
               <Estadisticas />
            </PrivateRoutes>
          } />
        <Route path='stock/' element={
            <PrivateRoutes>
               <Stock />
            </PrivateRoutes>
          } />
        <Route path='email/' element={
            <PrivateRoutes>
               <Email />
            </PrivateRoutes>
          } />
        <Route path='ingredientes/' element={
            <PrivateRoutes2>
               <Ingredientes />
            </PrivateRoutes2>
          } />

    </Routes>
    </>
  )
}


export default Routing