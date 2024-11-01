import Routing from "./Routes/Routing.jsx"
import NavPC from "./components/NavPC/NavPC"
import SideBar from "./components/SideBar/SideBar"
import NavMobile from "./components/DownBar/DownBar.jsx"
import { useState, useEffect } from "react"
import CalendarioModal from "./components/Calendario/Calendario.jsx"
import Cookies from 'js-cookie';

const App = () => {
  const [users, setUsers] = useState(() => {
    // Obtener el valor inicial desde localStorage
    return Cookies.get('token2');
  });


  useEffect(() => {
    const checkUsersState = () => {
      const storedUsers = Cookies.get('token2');
      if (storedUsers !== users) {
        setUsers(storedUsers);
      }
    };

    // Revisar cada segundo si el valor en el localStorage cambió
    const intervalId = setInterval(checkUsersState, 100);

     // Limpiar el intervalo cuando el componente se desmonta
    return () => clearInterval(intervalId);
  }, [users]);

  return (
    <>
      {users ? (
        <>
          <div className="NavPC">
            <NavPC />
          </div>
          <main>
            <div className="SideBar">
              <SideBar/>
            </div>
            <div>
              <div className="structureHeader">
                <div></div>
                <CalendarioModal/>
              </div>
              <div className="Routing">
                <Routing/> 
              </div>
            </div>
            <div className="NavMobileResponsive">
              <NavMobile/>
            </div>
          </main>
        </>
      ) : (
        <>
          <NavPC />
          <Routing />
        </>
      )}
    </>
  )
}

export default App