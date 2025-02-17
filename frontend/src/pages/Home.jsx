import React , {useRef, useState , useEffect} from 'react'
// import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import 'remixicon/fonts/remixicon.css'
import LocationSearchPanel from '../components/LocationSearchPanel'


const Home = () => {

    const [pickup, setpickup] = useState('')
    const [destination, setdestination] = useState('')
    const [panelOpen, setpanelOpen] = useState(false);
    const panelRef = useRef(null)
    const panelCloseRef = useRef(null)
 
     const submitHandler = (e)=>{
      e.preventDefault()
     }

     useEffect(function(){
      if(panelOpen) {
        gsap.to(panelRef.current, {
        height: '78%',
        opacity:1
        })
        gsap.to(panelCloseRef.current, {
          opacity:1
        })
      
      } else{
           gsap.to(panelRef.current, {
            height: '0%',
            opacity:0

           })
           gsap.to(panelCloseRef.current, {
            opacity:0
          
          })
           
        }
     }, [panelOpen])

          


  return (
    <div className='h-screen relative overflow-hidden'>
      <img className='w-16 absolute left-5 top-5' src='https://upload.wikimedia.org/wikipedia/commons/thumb/5/58/Uber_logo_2018.svg/2560px-Uber_logo_2018.svg.png'/>

      <div className='h-screen w-screen'>
        {/* image for temp React.useState(); */}
        <img className='h-full w-full object-cover' src='https://s.wsj.net/public/resources/images/BN-XR452_201802_M_20180228165525.gif'/>
      </div>

      <div className='  flex flex-col justify-end h-screen  absolute top-0 w-full '>
        <div className='h-[28%] p-6 bg-white relative'>
          <h5 ref={panelCloseRef} className='absolute top-6 right-6 text-2xl opacity-0'
           onClick={()=>setpanelOpen(false)}>
          <i className="ri-arrow-down-wide-line"></i>
          </h5>
            <h4 className='text-2xl font-semibold'>Find a trip</h4>

            <form onSubmit={(e)=>submitHandler(e)}>
              <div className='line bg-gray-900 w-1 h-16  absolute top-[100px] left-10  rounded-full'></div>
              <div>
              <input className='bg-[#eee] px-10 py-2 text-lg  rounded-base w-full mt-6' 
                onClick={()=> setpanelOpen(true)}
                type="text" 
                placeholder='Add a pick-up location '
                value={pickup}
                onChange={(e)=> setpickup(e.target.value)} />
              <input className='bg-[#eee] px-10 py-2 text-lg rounded-base w-full mt-3' 
                onClick={()=> setpanelOpen(true)}
                type="text" 
                placeholder='Enter your destination'
                value={destination}
                onChange={(e)=> setdestination(e.target.value)}
                 />
                 </div>
            </form>
        </div>
        <div ref={panelRef} className=' bg-[#fff]  h-0  '>
          <LocationSearchPanel/>
          
        </div>
      </div>
      <div className='fixed w-full z-10 bottom-0 bg-white px-3 py-6'>
        <h3 className='text-xl font-semibold mb-4'>Choose a Vehicle</h3>
        <div className='flex border-2 border-black rounded-2xl w-full items-center p-3 justify-between  mb-2'>
        <img className='h-12' src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1555367538/assets/31/ad21b7-595c-42e8-ac53-53966b4a5fee/original/Final_Black.png" alt="uber image" />
        <div className='w-1/2'>
          <h4 className='font-medium text-base'>UberGo <span><i className="ri-user-fill"></i>4</span></h4>
          <h5 className='font-medium text-sm'>2 mins away </h5>
          <p className='text-xs text-gray-600'>Affordable, compact rides</p>
        </div>
        <h2 className='text-lg font-semibold '>$16.33</h2>
        </div>
        <div className='flex border-2 border-black rounded-2xl w-full items-center p-3 justify-between  mb-2'>
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

export default Home