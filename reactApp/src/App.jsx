import Routing from "./Routes/Routing"
import NavPC from "./components/NavPC/NavPC"
import SideBar from "./components/SideBar/SideBar"

const App = () => {
  return (
    <>
      <NavPC/>
      <main>
        <SideBar/>
        <Routing/>
      </main>
    </>
  )
}

export default App