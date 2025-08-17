import React, { useContext } from 'react'
import {CaptainDataContext} from '../context/CaptainContext'
import userImg from '../assets/userImg.png'

const CaptainDetails = () => {

const {captain} = useContext(CaptainDataContext) 


  return (
    <>
      <div className='flex items-center justify-between'>
            <div className='flex items-center justify-between gap-3'>
              <img className='h-10 w-10 rounded-full object-cover' src={userImg}/>
              <h4 className='text-lg font-medium'>{captain.fullname.firstname + " " + captain.fullname.lastname}</h4>

            </div>
            <div>
              <h4 className='text-lg font-semibold'>$350.3</h4>
              <p className='text-sm text-gray-600 '>Earned</p>
            </div>
          </div>
          <div className='flex justify-center mt-5 p-4 bg-gray-100 rounded-2xl gap-5 items-start'>
            <div className='text-center'>
              <i className="text-3xl mb-2 font-thin ri-timer-2-line"></i>
              <h5 className='text-lg font-medium'>20.2</h5>
              <p className='text-sm text-gray-600'>Hours Online</p></div>
            <div className='text-center'>
              <i className="text-3xl mb-2 font-thin ri-speed-up-line"></i>
              <h5 className='text-lg font-medium'>24.6</h5>
              <p className='text-sm text-gray-600'>Total Hours</p>

            </div>
            {/* <div className='text-center'>
            <i className="text-3xl mb-2 font-thin ri-booklet-line"></i>

              <h5 className='text-lg font-medium'>12.3</h5>
              <p className='text-sm text-gray-600'>Hours Online</p>
            </div> */}

          </div>
    
    </>
  )
}

export default CaptainDetails