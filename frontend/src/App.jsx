import {  useState } from 'react'
import {Routes, Route} from 'react-router-dom'
import './App.css'
import Start from './pages/Start'
import UserLogin from './pages/UserLogin'
import CaptainLogin from './pages/CaptainLogin'
import CaptainSignUp from './pages/CaptainSignUp'
import UserSignUp from './pages/UserSignUp'
import Home from './pages/Home'
import UserProtectedWrapper from './pages/UserProtectedWrapper'
import UserLogout from './pages/UserLogout'
import CaptianHome from './pages/CaptianHome'
import CaptainProtectWrapper from './pages/CaptainProtectWrapper'
import CaptainLogout from './pages/CaptainLogout'
import Rinding from './pages/Rinding'

function App() {
  const [count, setCount] = useState(0)

  return (
   <div>
      <Routes>
        <Route path="/"element={<Start/>} />
        <Route path="/login"element={<UserLogin/>} />
        <Route path='/riding' element={<Rinding/>}/>
        <Route path="/signup" element={<UserSignUp/>} />
        <Route path="/captain-login"element={<CaptainLogin/>} />
        <Route path="/captain-signup"element={<CaptainSignUp/>} />
        <Route path="/home" element={
          <UserProtectedWrapper>
            <Home/>
          </UserProtectedWrapper>
          }/>
        <Route path='/user/logout' element=
          {<UserProtectedWrapper>
            <UserLogout/>
          </UserProtectedWrapper>}/>

        <Route path='/captain-home'  element=

        {<CaptainProtectWrapper>
           <CaptianHome/>
        </CaptainProtectWrapper>} />

        <Route path='/captain/logout' element= 
        {
          <CaptainProtectWrapper>
            <CaptainLogout/>
          </CaptainProtectWrapper>
        } />

        
      </Routes>
    </div>
    
  )
}

export default App
