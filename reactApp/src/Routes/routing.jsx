import { Route, Routes } from 'react-router-dom'

import Home from '../Pages/Home_/Home'
import Estadisticas from '../Pages/Estadisticas/Estadisticas'
import Stock from '../Pages/Stock/Stock'
import Email from '../Pages/Email_/Email'
import { Add_Students } from '../Pages/Add_Students/Add_Students'
import { Login } from '../Pages/Login/Login'
import { Login2 } from '../Pages/Login/Login2'
import { Login3 } from '../Pages/Login/Login3'
import { ColorProvider } from '../components/UsinngContext'
import { PrivateRoutes, PrivateRoutes2, PrivateRoutes3 } from "./privateRoutes"
import ToggleSwitch from '../components/ToggleSwitch/ToggleSwitch'


const Routing = () => {
  return (
    <>
      <ColorProvider>
        <Routes>
            <Route path="/habdcayciaysxsabciabOQOADibcascbasc" element={<ToggleSwitch/>} />
            <Route path="/login" element={<Login />} />

            <Route path="/access" element={ 
              <PrivateRoutes>
                <Login2 /> 
              </PrivateRoutes>
            } />
            <Route path="/accesss" element={ 
              <PrivateRoutes>
                <Login3 /> 
              </PrivateRoutes>
            } />

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
            <Route path='asistencias/' element={
                <PrivateRoutes3>
                  <Stock />
                </PrivateRoutes3>
              } />
            <Route path='email/' element={
                <PrivateRoutes>
                  <Email />
                </PrivateRoutes>
              } />
            <Route path='estudiantes/' element={
                <PrivateRoutes2>
                  <Add_Students />
                </PrivateRoutes2>
              } />

        </Routes>
      </ColorProvider>
    </>
  )
}


export default Routing