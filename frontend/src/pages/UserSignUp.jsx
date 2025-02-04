import React from 'react'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'  //useNavigate is hook to navigate between pages
import axios from 'axios'
import {UserDataContext} from '../context/UserContext'
//Axios javascript library to Make Http request and simplifies fetching data from API  and sending datat to servers

const UserSignUp = () => {
  const [email, setEmail] = useState('')
  const [password,setPassword] = useState('')
  const [userData, setUserData] = useState({})
  const [firstname, setFirstName] = useState('')
  const [lastname, setLastname] = useState('')

  const navigate = useNavigate()

  const {user, setUser} = React.useContext(UserDataContext)

  const submitHandler = async (e) => {
    e.preventDefault();
   
    const newUser = {
      fullname: {
        firstname: firstname,
        lastname: lastname
      },
      email: email,
      password: password
    }

    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/users/register`, newUser)

    if(response.status === 201){
      const data = response.data;

      setUser(data.user)
      console.log(data)
      localStorage.setItem('token', data.token)
      navigate('/home')

    }
    
    // setEmail('')
    // setFirstName('')
    // setLastname('')
    // setPassword('')
  }
  return (

    <div className='p-7 flex flex-col h-screen justify-between'>
            <div>
            <img  className="w-16 pb-6"   src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/58/Uber_logo_2018.svg/2560px-Uber_logo_2018.svg.png" alt='logo'/>
    
            <form onSubmit={(e)=>submitHandler(e)} className='bg-white p-3 rounded-lg shadow-md'>

                <h3 className='text-lg font-medium mb-2'>What's your Name</h3>
                <div className='flex gap-4 mb-6'>
                  <input className='bg-[#eeeeee]  rounded px-4 py-2  w-1/2 text-medium placeholder:text-medium'
                  type="text"
                  value={firstname}
                  onChange={(e)=>setFirstName(e.target.value)}
                  placeholder='firstname'
                  required
                   />
                  <input className='bg-[#eeeeee]  rounded px-4 py-2 w-1/2 text-medium placeholder:text-medium'
                    type='text'
                    placeholder='lastname'
                    onChange={(e)=>setLastname(e.target.value)}
                    value={lastname}
                    required
                  />

                </div>


                <h3 className='text-lg font-medium mb-2'>What's your email</h3>
                <input className='bg-[#eeeeee] mb-6 rounded px-4 py-2  w-full text--mediumplaceholder:text-medium'
                     type="email" 
                     value={email}
                     onChange={(e) => setEmail(e.target.value)}
                     placeholder="email@example.com" 
                     required/>
    
                <h3 className='text-lg font-medium mb-2'>Enter Password</h3>
                <input
                    className='bg-[#eeeeee] mb-6 rounded px-4 py-2 w-full text-medium placeholder:text-medium'
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password" 
                    required/>  
                <button className='bg-black text-white w-full py-2 mb-5 font-semibold rounded text-lg px-4' >Create Account</button>  
                <p className='mb-2 '>Already have an Account? <Link to="/login" className="text-blue-600">Login here</Link>
                </p>
            </form>
            </div>
            <div>
            <p className='text-xs text-gray-500'>
             This site is protected by reCAPTCHA  and the <span className='underline'>Google Privacy
             Policy</span> and <span className='underline'>Terms of Service apply</span>.
            </p>
    
            </div>
        </div>
    
    

  )
}

export default UserSignUp