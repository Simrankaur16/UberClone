import React from 'react'

const VehiclePanel = (props) => {
    return (
        <div>

            <div >
                <h5 className='p-1 text-center w-[93%] absolute top-0' onClick={() => {
                    props.setvehiclePanel(false)
                }}><i className=" text-3xl text-gray-200 ri-arrow-down-wide-line"></i></h5>
                <h3 className='text-xl font-semibold mb-4'>Choose a Vehicle</h3>
                <div onClick={()=>{props.setconfirmedRidePanel(true)}} className='flex border-white border-2  active:border-black  active:border-2 bg-gray-100 rounded-2xl w-full items-center p-3 justify-between  mb-2'>
                    <img className='h-12' src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1555367538/assets/31/ad21b7-595c-42e8-ac53-53966b4a5fee/original/Final_Black.png" alt="uber image" />
                    <div className='w-1/2'>
                        <h4 className='font-medium text-base'>UberGo <span><i className="ri-user-fill"></i>4</span></h4>
                        <h5 className='font-medium text-sm'>2 mins away </h5>
                        <p className='text-xs text-gray-600'>Affordable, compact rides</p>
                    </div>
                    <h2 className='text-lg font-semibold '>$16.33</h2>
                </div>
                <div onClick={()=>{props.setconfirmedRidePanel(true)}} className='flex border-white border-2    active:border-black active:border-2 bg-gray-100 rounded-2xl w-full items-center p-3 justify-between  mb-2'>
                    <img className='h-12' src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1644837706/assets/c4/fba88e-502f-4b43-8443-4c82f580be73/original/UberXL-logo-app.png" alt="uber image" />
                    <div className='w-1/2'>
                        <h4 className='font-medium text-base'>UberGo <span><i className="ri-user-fill"></i>4</span></h4>
                        <h5 className='font-medium text-sm'>2 mins away </h5>
                        <p className='text-xs text-gray-600'>Affordable, compact rides</p>
                    </div>
                    <h2 className='text-lg font-semibold '>$16.33</h2>
                </div>









            </div>


        </div>
    )
}

export default VehiclePanel