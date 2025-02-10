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
        height: '70%',
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
    <div className='h-screen relative'>
      <img className='w-16 absolute left-5 top-5' src='https://upload.wikimedia.org/wikipedia/commons/thumb/5/58/Uber_logo_2018.svg/2560px-Uber_logo_2018.svg.png'/>

      <div className='h-screen w-screen'>
        {/* image for temp React.useState(); */}
        <img className='h-full w-full object-cover' src='https://s.wsj.net/public/resources/images/BN-XR452_201802_M_20180228165525.gif'/>
      </div>

      <div className='  flex flex-col justify-end h-screen  absolute top-0 w-full '>
        <div className='h-[30%] p-6 bg-white relative'>
          <h5 ref={panelCloseRef} className='absolute top-6 right-6 text-2xl opacity-0'
           onClick={()=>setpanelOpen(false)}>
          <i className="ri-arrow-down-wide-line"></i>
          </h5>
            <h4 className='text-2xl font-semibold'>Find a trip</h4>

            <form onSubmit={(e)=>submitHandler(e)}>
              <div className='line bg-gray-900 w-1 h-16 absolute top-[38%] left-10  rounded-full'></div>
              <input className='bg-[#eee] px-10 py-2 text-lg rounded-base w-full mt-5' 
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
            </form>
        </div>
        <div ref={panelRef} className=' bg-teal-700 opacity-0 h-0  '>
          <LocationSearchPanel/>
          
        </div>
      </div>
    </div>
  )
}

export default Home