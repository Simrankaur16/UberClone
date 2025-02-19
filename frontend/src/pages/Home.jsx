import React , {useRef, useState , useEffect} from 'react'
// import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import 'remixicon/fonts/remixicon.css'
import LocationSearchPanel from '../components/LocationSearchPanel'
import VehiclePanel from '../components/VehiclePanel'
import ConfiredRide from '../components/ConfiredRide'
import LookingDriver from '../components/LookingDriver'
import WaitingDriver from '../components/WaitingDriver'



const Home = () => {

    const [pickup, setpickup] = useState('')
    const [destination, setdestination] = useState('')
    const [panelOpen, setpanelOpen] = useState(false);
    const panelRef = useRef(null)
    const panelCloseRef = useRef(null);
    const [vehiclePanel, setvehiclePanel] = useState(false)
    const vehiclePanelRef = useRef(null)
    const confirmedRidePanelRef = useRef(null)
    const vehicleFoundRef = useRef(null)
    const waitingForDriverRef = useRef(null)
    const [confirmedRidePanel, setconfirmedRidePanel] = useState(false);
    const [vehicleFound, setvehicleFound] = useState(false)
    const [ waitingForDriver, setwaitingForDriver] = useState(false)
 
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

     useEffect(function(){
       if(vehiclePanel){
        gsap.to(vehiclePanelRef.current, {
          transform: 'translateY(0)'
        })
      }else {
          gsap.to(vehiclePanelRef.current, {
            transform:'translateY(100%)'
          })
        }
       
     },[vehiclePanel])

     useEffect(function(){
       if(confirmedRidePanel){
        gsap.to(confirmedRidePanel.current, {
          transform: 'translateY(0)'
        })
      }else {
          gsap.to(confirmedRidePanel.current, {
            transform:'translateY(100%)'
          })
        }
       
     },[confirmedRidePanel])

     useEffect(function(){
       if(vehicleFound){
        gsap.to(vehicleFoundRef.current, {
          transform: 'translateY(0)'
        })
      }else {
          gsap.to(vehicleFoundRef.current, {
            transform:'translateY(100%)'
          })
        }
       
     },[vehicleFound])

     useEffect(function(){
       if(waitingForDriver){
        gsap.to(waitingForDriverRef.current, {
          transform: 'translateY(0)'
        })
      }else {
          gsap.to(waitingForDriverRef.current, {
            transform:'translateY(100%)'
          })
        }
       
     },[vehicleFound])

          


  return (
    <div className='h-screen relative overflow-hidden'>
      <img className='w-16 absolute left-5 top-5' src='https://upload.wikimedia.org/wikipedia/commons/thumb/5/58/Uber_logo_2018.svg/2560px-Uber_logo_2018.svg.png'/>

      <div onClick={()=>{setvehiclePanel(false)}} className='h-screen w-screen'>
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
          <LocationSearchPanel setpanelOpen={setpanelOpen}  setvehiclePanel={setvehiclePanel}/>
          
        </div>
      </div>
      <div ref={vehiclePanelRef} className=' fixed w-full z-10 bottom-0 translate-y-full   bg-white px-3 py-10 pt-12'>
        <VehiclePanel setconfirmedRidePanel={setconfirmedRidePanel} setvehiclePanel={setvehiclePanel}/>
      </div>
      <div ref={confirmedRidePanelRef} className='fixed w-full z-10 bottom-0 translate-y-full   bg-white px-3 py-6 pt-12'>
        <ConfiredRide setconfirmedRidePanel={setconfirmedRidePanel} setvehicleFound={setvehicleFound}  />
      </div>
      <div ref={vehicleFoundRef} className='fixed w-full z-10 bottom-0 translate-y-full   bg-white px-3 py-6 pt-12'>
        <LookingDriver setVehicleFound={setvehicleFound} setconfirmedRidePanel={setconfirmedRidePanel}/>
      </div>
      <div ref={waitingForDriverRef} className='fixed w-full z-10 bottom-0    bg-white px-3 py-6 pt-12'>
      <WaitingDriver waitingForDriver={waitingForDriver} />
      </div>

    </div>
  )
}

export default Home