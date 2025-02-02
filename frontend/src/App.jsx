import { useState } from 'react'
import {Routes, Route} from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
import UserLogin from './pages/UserLogin'
import CaptainLogin from './pages/CaptainLogin'
import CaptainSignUp from './pages/CaptainSignUp'
import UserSignUp from './pages/UserSignUp'

function App() {
  const [count, setCount] = useState(0)

  return (
   <div>
      <Routes>
        <Route path="/"element={<Home/>} />
        <Route path="/login"element={<UserLogin/>} />
        <Route path="/signup" element={<UserSignUp/>} />
        <Route path="/captain-login"element={<CaptainLogin/>} />
        <Route path="/captain-signup"element={<CaptainSignUp/>} />
      </Routes>
    </div>
    
  )
}

export default App
