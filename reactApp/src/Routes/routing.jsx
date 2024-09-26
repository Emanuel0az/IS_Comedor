import { Route, Routes } from 'react-router-dom'
import FormRegister from '../components/FormRegister/FormRegister'
import Home from '../Pages/Home'

const Routing = () => {
  return (
    <>
    <Routes>
        <Route path='/' element={<Home/>} />
        <Route path="register/" element={<FormRegister/>} />
    </Routes>
    </>
  )
}

export default Routing