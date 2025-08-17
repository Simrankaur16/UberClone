import React from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import userImg from '../assets/userImg.png'


const FinishRide = (props) => {

    const navigate = useNavigate();

    async function endRide(){
        const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/rides/end-ride`, {

            rideId: props.ride._id,
    },{
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
        }
    })

    if(response.status === 200) {
        
        navigate('/captain-home');
    }

}

  return (
    <div >
            <h5 className='p-1 text-center w-[93%] absolute top-0' onClick={() => {

                props.setfinishRidePane(false)
            }}><i className=" text-3xl text-gray-200 ri-arrow-down-wide-line"></i></h5>
            <h3 className='text-xl font-semibold '>Finish this Ride</h3>

            <div className='flex items-center justify-between p-2 bg-gray-200 rounded-lg mt-4 '>
                <div className=' flex items-center gap-3 mt-3 '>

                     <img className='w-14 h-14 rounded-full object-cover' src={userImg}/>
                    <h2 className='text-lg font-medium'>{props.ride?.user.fullname.firstname}</h2>
                </div>
                

            </div>
            <div className='flex flex-col gap-2 justify-between items-center'>
                <img className='h-20' src='https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1555367538/assets/31/ad21b7-595c-42e8-ac53-53966b4a5fee/original/Final_Black.png' alt='' />

                <div className='w-full mt-3 '>

                    <div className='flex items-center  gap-6 p-2 border-b-1 border-zinc-200 '>

                        <i className="p-2 text-lg ri-map-pin-user-fill"></i>
                        <div >
                            {/* <h3 className='text-lg font-medium'>638/3A</h3> */}
                            <p className='text-m -m-1 text-gray-800'>{props.ride?.pickup}</p>
                        </div>
                    </div>
                    <div className='flex items-center  gap-6 p-2 border-b-1  border-zinc-200'>
                        <i className="p-2 text-lg ri-map-pin-2-fill"></i>
                        <div >
                            {/* <h3 className='text-lg font-medium'>638/3A</h3> */}
                            <p className='text-m -m-1 text-gray-800'>{props.ride?.destination}</p>
                        </div>
                    </div>

                    <div className='flex items-center  gap-6 p-2 mb-2 '>

                        <i className="p-2 text-lg ri-currency-fill"></i>
                        <div >
                            <h3 className='text-lg font-medium'>${props.ride?.fare}</h3>
                            <p className='text-sm -m-1 text-gray-600'>Cash Cash</p>
                        </div>
                    </div>


                </div>


                <div className='mt-3 w-full'>

                    
                       
                        <button onClick={endRide} 
                        className='w-full flex justify-center text-white font-semibold p-2 bg-[#3e8670] rounded-lg'>Finish Ride</button>

                       


                </div>

            </div>



        </div>
  )
}

export default FinishRide