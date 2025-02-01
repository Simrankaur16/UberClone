import React, { useState } from 'react'
import { use } from 'react'
import { Link } from 'react-router-dom'

const UserLogin = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [userData, setUserData] = useState({})

    const submitHandler = (e) => {
        e.preventDefault();

        setUserData({
            email:email, 
            password:password
        })
        console.log(userData)

        setEmail('')
        setPassword('')
    }

    
  return (
    <div className='p-7 flex flex-col h-screen justify-between'>
        <div>
        <img  className="w-16 pb-6"   src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/58/Uber_logo_2018.svg/2560px-Uber_logo_2018.svg.png" alt='logo'/>

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
            <p className='mb-2 '>New User? <Link to="/signup" className="text-blue-600">Create New Account</Link>
            </p>
        </form>
        </div>
        <div>
        <Link to='/captain-login' className='bg-[#c79332] flex items-center justify-center text-white w-full py-2 mb-7 font-semibold rounded text-lg px-4' >
            Sign in as Captain</Link>  

        </div>
    </div>

    
  )
}

export default UserLogin