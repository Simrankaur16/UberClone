import React from 'react'


const RidePopup = (props) => {
  return (
    <div>
         <h5 className='p-1 text-center w-[93%] absolute top-0' onClick={() => {
               
                props.setridePopupPanel(false)
            }}><i className=" text-3xl text-gray-200 ri-arrow-down-wide-line"></i></h5>
            <h3 className='text-xl font-semibold '>New Ride Available</h3>

            <div className='flex items-center justify-between p-2 bg-[#dfd9a0] rounded-lg mt-4 '>
                <div className=' flex items-center gap-3 mt-3 '>
                   
                    <img className='w-14 h-14 rounded-full object-cover' src="data:image/jpeg;base64,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"/>
                    <h2 className='text-lg font-medium'>Jhon Brown</h2>
                </div>
                <h2 className='text-lg font-semibold'>3.2 KM</h2>

            </div>
            <div className='flex flex-col gap-2 justify-between items-center'>
                <img className='h-20' src='https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1555367538/assets/31/ad21b7-595c-42e8-ac53-53966b4a5fee/original/Final_Black.png' alt='' />

                <div className='w-full mt-3 '>

                    <div className='flex items-center  gap-6 p-2 border-b-1 border-zinc-200 '>

                        <i className="p-2 text-lg ri-map-pin-user-fill"></i>
                        <div >
                            <h3 className='text-lg font-medium'>638/3A</h3>
                            <p className='text-sm -m-1 text-gray-600'>3 queen Street, Brampton, ON</p>
                        </div>
                    </div>
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
                <button onClick={()=> {
                       props.setConfirmRidePopupPanel(true)
                     }}className='w-full text-white font-semibold p-2 bg-[#3e8670] rounded-lg'>Accept</button>
               
                <button onClick={()=> {
                        props.setridePopupPanel(false)
                     }}className='w-full text-white font-semibold p-2  bg-gray-500 text-gray-700 rounded-lg'>Ignore</button>
            </div>



    </div>
  )
}

export default RidePopup