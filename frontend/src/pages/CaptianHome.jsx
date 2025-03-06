import React from 'react'
import { Link } from 'react-router-dom'
import CaptainDetails from '../components/CaptainDetails'
import RidePopup from '../components/RidePopup'

const CaptianHome = () => {
  return (
    <div>
      <div className='h-screen'>
        <div className='fixed p-3 top-0 flex items-center justify-between w-full'>
          <img className='w-16' src='https://upload.wikimedia.org/wikipedia/commons/thumb/5/58/Uber_logo_2018.svg/2560px-Uber_logo_2018.svg.png' alt="logo" />
          <Link to="/home" className=' h-10 w-10 bg-white flex items-center justify-center rounded-full'>
            <i className=" text-lg font-medium ri-logout-box-r-line"></i>
          </Link>

        </div>




        <div className='h-3/5'>
          <img className='h-full w-full object-cover' src="https://s.wsj.net/public/resources/images/BN-XR452_201802_M_20180228165525.gif" />

        </div>

        <div className='h-2/5 p-4'>
          <CaptainDetails/>

        </div>

        <div className='fixed w-full z-10 bottom-0  bg-white px-3 py-10 pt-12'>
           <RidePopup/>
          
        </div>




      </div>
    </div>
  )
}

export default CaptianHome