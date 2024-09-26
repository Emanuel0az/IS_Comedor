import { BrowserRouter as Router,Routes,Route } from "react-router-dom"
import Register from '../Pages/register'
import Logins from "../Pages/login"
import  Home  from "../pages/home"


function Routing() {
  return (
    <div>

        <Router>
            <Routes>
                <Route path='/register' element={<Register/>}   />
                <Route path='' element={<Home/>}   />
                <Route path='/login' element={<Logins/>} />
            </Routes>
        </Router>
      
    </div>
  )
}

export default Routing