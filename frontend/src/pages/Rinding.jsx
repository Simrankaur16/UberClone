import React from 'react'
import { Link } from 'react-router-dom'

const Rinding = () => {
    return (
        <div className='h-screen'>
            <Link to="/home" className='fixed right-2 top-2 h-10 w-10 bg-white flex items-center justify-center rounded-full'>
            <i className=" text-lg font-medium ri-home-4-line"></i> 
            </Link>
                       
            <div className='h-1/2 '>
                <img className='h-full w-full object-cover' src="https://s.wsj.net/public/resources/images/BN-XR452_201802_M_20180228165525.gif" />

            </div>

            <div className='h-1/2 p-4'>
                <div className='flex items-center justify-between mx-5 '>
                    <img className='h-15' src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1644837706/assets/c4/fba88e-502f-4b43-8443-4c82f580be73/original/UberXL-logo-app.png" alt="" />
                    <div className='text-right'>
                        <h2 className='text'>Sartak</h2>
                        <h4 className='text-xl font-semibold '>OOJf23</h4>
                        <p className='text-sm text-gray-600'>Civic</p>
                    </div>
                </div>
                <div className='flex flex-col gap-2 justify-between items-center'>

                    <div className='w-full mt-3 '>

                        
                        <div className='flex items-center  gap-6 p-2 border-b-1  border-zinc-200'>
                            <i className="p-2 text-lg ri-map-pin-2-fill"></i>
                            <div >
                                <h3 className='text-lg font-medium'>638/3A</h3>
                                <p className='text-sm -m-1 text-gray-600'>3 queen Street, Brampton, ON</p>
                            </div>
                        </div>

                        <div className='flex items-center  gap-6 p-2 mb-2 '>

                            <i className="p-2 text-lg ri-currency-fill"></i>
                            <div >
                                <h3 className='text-lg font-medium'>$20.32</h3>
                                <p className='text-sm -m-1 text-gray-600'>Cash Cash</p>
                            </div>
                        </div>


                    </div>
                </div>

                <button className='w-full text-white font-semibold p-2 bg-[#3e8670] rounded-lg'>Make a Payment</button>
            </div>
        </div>
    )
}

export default Rinding