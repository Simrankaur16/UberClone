import React from 'react'
import {Link, useLocation } from 'react-router-dom'  
import { useState, useEffect, useRef } from 'react'
import gsap from 'gsap'
import FinishRide from '../components/FinishRide'
import LiveTracking from '../components/LiveTracking'


const CaptainRiding = () => {

  const [finishRidePane, setfinishRidePane] = useState(false);
  const finishRidePanelRef = useRef(null )
  const location = useLocation();
  const rideData = location.state?.ride ;

   useEffect(function () {
    if (finishRidePane) {
      gsap.to(finishRidePanelRef.current, {
        transform: 'translateY(0)'
      })
    } else {
      gsap.to(finishRidePanelRef.current, {
        transform: 'translateY(100%)'
      })
    }

  }, [finishRidePane])

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
          <LiveTracking/>

        </div>

        <div className='h-1/5 p-4 flex items-center justify-between relative bg-[#dbbb46]' onClick={() => setfinishRidePane(true)}>
        <h5 className='p-1 text-center w-[95%] absolute top-0' onClick={() => {
               
             
            }}><i className=" text-3xl text-black ri-arrow-down-wide-line"></i></h5>
             
         <h4 className='text-xl font-semibold '>4 KM away</h4>
          <button className='  text-white font-semibold p-2 bg-[#3e8670] rounded-lg'>Complete Ride</button>
               
        </div>

        <div ref={finishRidePanelRef} className='fixed translate-y-full w-full z-10 bottom-0  bg-white px-3 py-10 pt-12'>
          <FinishRide ride={rideData} setfinishRidePane={setfinishRidePane}/>

        </div>

    




      </div>
    </div>
  )
}

export default CaptainRiding