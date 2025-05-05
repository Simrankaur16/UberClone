import React from 'react'
import {Link } from 'react-router-dom'  

const CaptainRiding = () => {
  return (
    <div>
         <div className='h-screen'>
       
        <div className='fixed p-3 top-0 flex items-center justify-between w-full'>
          <img className='w-16' src='https://upload.wikimedia.org/wikipedia/commons/thumb/5/58/Uber_logo_2018.svg/2560px-Uber_logo_2018.svg.png' alt="logo" />
          <Link to="/home" className=' h-10 w-10 bg-white flex items-center justify-center rounded-full'>
            <i className=" text-lg font-medium ri-logout-box-r-line"></i>
          </Link>

        </div>




        <div className='h-4/5'>
          <img className='h-full w-full object-cover' src="https://s.wsj.net/public/resources/images/BN-XR452_201802_M_20180228165525.gif" />

        </div>

        <div className='h-1/5 p-4 flex items-center justify-between relative bg-[#dbbb46]'>
        <h5 className='p-1 text-center w-[95%] absolute top-0' onClick={() => {
               
             
            }}><i className=" text-3xl text-black ri-arrow-down-wide-line"></i></h5>
             
         <h4 className='text-xl font-semibold '>4 KM away</h4>
          <button className='  text-white font-semibold p-2 bg-[#3e8670] rounded-lg'>Complete Ride</button>
               
        </div>

    




      </div>
    </div>
  )
}

export default CaptainRiding