import { Route, Routes } from 'react-router-dom'
import ToDo from '../Pages/ToDo'
import Home from '../Pages/Home'

const Routing = () => {
  return (
    <>
    <Routes>
        <Route path='/' element={<Home/>} />
        <Route path="todo/" element={<ToDo/>} />
    </Routes>
    </>
  )
}

export default Routing