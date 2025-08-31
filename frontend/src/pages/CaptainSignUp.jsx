import React from 'react'
import { useState, useContext } from 'react'
import { data, Link } from 'react-router-dom'
import { CaptainDataContext } from '../context/CaptainContext'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const CaptainSignUp = () => {
    const [email, setEmail] = useState('')
    const [password,setPassword] = useState('')
    const [userData, setUserData] = useState({})
    const [firstname, setFirstName] = useState('')
    const [lastname, setLastname] = useState('')
    const [vehicleColor, setVehicleColor] = useState('')
    const [vehiclePlate, setVehiclePlate] = useState('')
    const [vehicleCapacity, setVehicleCapacity] = useState('')
    const [vehicleType, setVehicleType] = useState('')

    const {captain, setCaptain} = useContext(CaptainDataContext)
    const navigate = useNavigate();
  
    const submitHandler = async (e) => {
      e.preventDefault();
      const  captainData = {
        fullname: {
          firstname: firstname,
          lastname: lastname
        },
        email:email,
        password:password,
        vehicle: {
          color: vehicleColor,
          plate: vehiclePlate,
          capacity: vehicleCapacity,
          vehicleType: vehicleType
        }
  
      }
      
      console.log(captainData)

      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/captain/register`, captainData)

      if(response.status === 201){
        const data = response.data;
        setCaptain(data.captain)
        localStorage.setItem('token', data.token)
        navigate('/captian-home')

      }
      
      // setEmail('')
      // setFirstName('')
      // setLastname('')
      // setPassword('')
      // setVehicleCapacity('')
      // setVehicleColor('')
      // setVehiclePlate('')
      // setVehicleType('')
    }


  return (

    <div className='p-5 flex flex-col h-screen justify-between'>
    <div>
    <img  className="w-16 pb-6"   src="https://www.svgrepo.com/show/505031/uber-driver.svg" alt='logo'/>

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
            className='bg-[#eeeeee] mb-1 rounded px-4 py-2 w-full text-medium placeholder:text-medium'
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password" 
            required/> 
        {password.length > 0 && password.length <= 6 && (
            <span className='p-5' style={{ color: '#B22222', fontSize: '0.8em' }}>
              Password must be more than 6 characters
            </span>
          )}

          <h3 className='text-lg font-medium mt-2 mb-2'>Vehicle Information</h3>
          <div className='flex gap-4 mb-6'>
            <input
              className='bg-[#eeeeee] rounded px-4 py-2 w-1/2 text-medium placeholder:text-medium'
              type='text'
              placeholder='Vehicle Color'
              value={vehicleColor}
              onChange={(e) => setVehicleColor(e.target.value)}
              required
            />
            <input
              className='bg-[#eeeeee] rounded px-4 py-2 w-1/2 text-medium placeholder:text-medium'
              type='text'
              placeholder='Vehicle Plate'
              value={vehiclePlate}
              onChange={(e) => setVehiclePlate(e.target.value)}
              required
            />
          </div>

          <div className='flex gap-4 mb-6'>
            <input
              className='bg-[#eeeeee] rounded px-4 py-2 w-1/2 text-medium placeholder:text-medium'
              type='number'
              placeholder='Vehicle Capacity'
              value={vehicleCapacity}
              onChange={(e) => setVehicleCapacity(e.target.value)}
              required
            />
            <select
              className='bg-[#eeeeee] rounded px-2 py-2 w-1/2 text-medium placeholder:text-medium'
              value={vehicleType}
              onChange={(e) => setVehicleType(e.target.value)}
              required
            >
              <option value='' disabled>Select Vehicle Type</option>
              <option value='car'>Car</option>
              <option value='bike'>Bike</option>
            </select>
          </div>




        <button className='bg-black text-white w-full py-2 mb-5 font-semibold rounded text-lg px-4' >Create Account</button>  
        <p className='mb-2 '>Already have an Account? <Link to="/captain-login" className="text-blue-600">Login here</Link>
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

export default CaptainSignUp