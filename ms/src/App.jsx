import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
// import './App.css'
import Navbar from './Component/Navbar'
import AllRoutes from './Routes/AllRoutes'
import Mainpage from './Pages/Mainpage'
import { useLocation } from 'react-router-dom'

function App() {
  const [count, setCount] = useState(0)
const location=useLocation()
  return (
    <>

   {location.pathname=="/"&&<Mainpage/>   }
{location.pathname!=="/"&&<AllRoutes/>}
    </>
  )
}

export default App
