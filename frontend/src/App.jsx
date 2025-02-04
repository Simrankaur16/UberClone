import { useContext, useState } from 'react'
import {Routes, Route} from 'react-router-dom'
import './App.css'
import Start from './pages/Start'
import UserLogin from './pages/UserLogin'
import CaptainLogin from './pages/CaptainLogin'
import CaptainSignUp from './pages/CaptainSignUp'
import UserSignUp from './pages/UserSignUp'
import { UserDataContext } from './context/UserContext'
import Home from './pages/Home'

function App() {
  const [count, setCount] = useState(0)

  return (
   <div>
      <Routes>
        <Route path="/"element={<Start/>} />
        <Route path="/login"element={<UserLogin/>} />
        <Route path="/signup" element={<UserSignUp/>} />
        <Route path="/captain-login"element={<CaptainLogin/>} />
        <Route path="/captain-signup"element={<CaptainSignUp/>} />
        <Route path="/home" element={<Home/>}/>
      </Routes>
    </div>
    
  )
}

export default App
