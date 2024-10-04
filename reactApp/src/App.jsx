import { useEffect, useState } from "react"
import Routing from "./Routes/Routing"
import NavPC from "./components/NavPC/NavPC"
import SideBar from "./components/SideBar/SideBar"



const App = () => {
  const [colorStateC, setColorStateC] = useState()
  
  useEffect(() => {
    const colorState = localStorage.getItem('colorState');
    setColorStateC(colorState)
    console.log(colorStateC);
  }, [])

  
  
  return (
    <>
    <body className={`body${colorStateC ? 'Night' : 'Day'}`}> 
        <NavPC/>
      <main>
        <SideBar/>
        <Routing/>
      </main>
    </body>
    </>
  )
}

export default App