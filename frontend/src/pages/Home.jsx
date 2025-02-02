import React from 'react'
import { Link } from 'react-router-dom'
import UberBack from '../assets/uber.png'

const Home = () => {
  return (
    <div>
        <div style={{backgroundImage:`url(${UberBack})`}} className='bg-cover  bg-center h-screen flex justify-between pt-8  w-full flex-col '>
            
            <img  className="w-16   ml-8"   src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/58/Uber_logo_2018.svg/2560px-Uber_logo_2018.svg.png" alt='logo'/>
            <div className='bg-white pb-7 py-4 px-4'>
                <h2 className='text-3xl font-bold'>Get Started with Uber</h2>
                <Link to='/login' className='bg-black flex items-center justify-center w-full  text-white py-3 mt-5 rounded-2xl '>Continue</Link>
            </div>

        </div>
    </div>
  )
}

export default Home