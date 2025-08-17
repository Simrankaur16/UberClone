import React from 'react'

const WaitingDriver = (props) => {
  return (
    <div>
            <h5 className='p-1 text-center w-[93%] absolute top-0' onClick={() => {
                props.waitingForDriver(false)
            }}><i className=" text-3xl text-gray-200 ri-arrow-down-wide-line"></i></h5>

            <div className='flex items-center justify-between mx-5 '>
              <img className='h-15' src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1644837706/assets/c4/fba88e-502f-4b43-8443-4c82f580be73/original/UberXL-logo-app.png" alt="" />
              <div className='text-right'>
                <h2 className='text-lg'>{props.ride?.captain.fullname.firstname || 'no captain '}</h2>
                <h4 className='text text-gray-700 '>{props.ride?.captain.vehicle.plate}</h4>
                <p className='text-sm text-gray-700'>Civic</p>
                <h1 className='text-sm font-semibold text-gray-700 '>OTP: {props.ride?.otp}</h1>
                
              </div>
            </div>

            <div className='flex flex-col gap-2 justify-between items-center'>

                <div className='w-full mt-3 '>

                    <div className='flex items-center  gap-6 p-2 border-b-1 border-zinc-200 '>

                        <i className="p-2 text-lg ri-map-pin-user-fill"></i>
                        <div >
                            
                            <p className='text-m -m-1 text-gray-900'>{props.ride?.pickup}</p>
                        </div>
                    </div>
                    <div className='flex items-center  gap-6 p-2 border-b-1  border-zinc-200'>
                        <i className="p-2 text-lg ri-map-pin-2-fill"></i>
                        <div >
                           
                            <p className='text-m -m-1 text-gray-900'>{props.ride?.destination}</p>
                        </div>
                    </div>

                    <div className='flex items-center  gap-6 p-2 mb-2 '>

                        <i className="p-2 text-lg ri-currency-fill"></i>
                        <div >
                            <h3 className='text-m font-normal text-gray-900'>${props.ride?.fare}</h3>
                            <p className='text-sm -m-1 text-gray-700'>Cash Cash</p>
                        </div>
                    </div>


                </div>
            </div>

        </div>
  )
}

export default WaitingDriver