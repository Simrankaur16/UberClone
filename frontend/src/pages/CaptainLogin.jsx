import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { CaptainDataContext } from '../context/CaptianContext'



const CaptainSignUp = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const {captain, setCaptain} = React.useContext(CaptainDataContext)
    const navigate = useNavigate()



    const submitHandler = async (e) => {
        e.preventDefault();

        const captain = {
            email:email, 
            password:password
        }
        console.log(captain)

        const response = await  axios.post(`${import.meta.env.VITE_BASE_URL}/captain/login`,captain)

        if(response.status === 200) {
            const data = response.data
            console.log(data)

            setCaptain(data.captain);
            localStorage.setItem('token', data.token)
            navigate('/captain-home')

        }

        setEmail('')
        setPassword('')
    }

    
  return (
    <div className='p-7 flex flex-col h-screen justify-between'>
        <div>
        <img  className="w-16 pb-6"   src="https://www.svgrepo.com/show/505031/uber-driver.svg" alt='logo'/>

        <form onSubmit={(e)=>submitHandler(e)} className='bg-white p-7 rounded-lg shadow-md'>
            <h3 className='text-lg font-medium mb-2'>What's your email</h3>
            <input className='bg-[#eeeeee] mb-7 rounded px-4 py-2  w-full text-lg placeholder:text-base'
                 type="email" 
                 value={email}
                 onChange={(e) => setEmail(e.target.value)}
                 placeholder="email@example.com" 
                 required/>

            <h3 className='text-lg font-medium mb-2'>Enter Password</h3>
            <input
                className='bg-[#eeeeee] mb-7 rounded px-4 py-2 w-full text-lg placeholder:text-base'
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password" 
                required/>  
            <button className='bg-black text-white w-full py-2 mb-5 font-semibold rounded text-lg px-4' >Login</button>  
            <p className='mb-2 '> New Captain? <Link to="/captain-signup" className="text-blue-600">Create New Account</Link>
            </p>
        </form>
        </div>
        <div>
        <Link to='/login' className='bg-[#3e8670] flex items-center justify-center text-white w-full py-2 mb-7 font-semibold rounded text-lg px-4' >
            Sign in as User</Link>  

        </div>
    </div>

    
  )
}

export default CaptainSignUp