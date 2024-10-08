import Routing from "./Routes/Routing"
import NavPC from "./components/NavPC/NavPC"
import SideBar from "./components/SideBar/SideBar"
import { useState, useEffect } from "react"

const App = () => {
  const [users, setUsers] = useState(() => {
    // Obtener el valor inicial desde localStorage
    return localStorage.getItem('user') === 'true';
  });

  useEffect(() => {
    const checkUsersState = () => {
      // Función que actualiza el estado basado en el localStorage
      const storedUsers = localStorage.getItem('user') === 'true';
      if (storedUsers !== users) {
        setUsers(storedUsers);
      }
    };

    // Revisar cada segundo si el valor en el localStorage cambió
    const intervalId = setInterval(checkUsersState, 1000);

     // Limpiar el intervalo cuando el componente se desmonta
    return () => clearInterval(intervalId);
  }, [users]);

  return (
    <>
      {users ? (
        <>
          <NavPC />
          <main>
            <SideBar />
            <Routing />
          </main>
        </>
      ) : (
        <Routing />
      )}
    </>
  )
}

export default App