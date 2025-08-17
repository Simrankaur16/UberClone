import React , {useRef, useState , useEffect} from 'react'
// import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import 'remixicon/fonts/remixicon.css'
import LocationSearchPanel from '../components/LocationSearchPanel'
import VehiclePanel from '../components/VehiclePanel'
import ConfiredRide from '../components/ConfiredRide'
import LookingDriver from '../components/LookingDriver'
import WaitingForDriver from '../components/WaitingDriver'
import axios from 'axios'
import {SocketContext} from '../context/SocketContext'
import { UserDataContext } from '../context/UserContext'
import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'





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
    const [vehicleFound, setVehicleFound] = useState(false)
    const [waitingForDriver, setWaitingForDriver] = useState(false)
    const [pickupSuggestions, setPickupSuggestions] = useState([]);
    const [destinationSuggestions, setdestinationSuggestions] = useState([]);
    const [activeField, setActiveField] = useState(null);
    const [fare, setfare] = useState({})
    const [vehicleType, setVehicleType] = useState(null);
    const [ride , setRide] = useState(null);
   
    const navigate = useNavigate();

    const {socket} = useContext(SocketContext);
    const {user} = useContext(UserDataContext);

   

    useEffect(() => {

      console.log(user);

    socket.emit("join" , {userType: "user", userId: user._id})

    },[user])



    socket.on('ride-confirmed', (ride) => {

      setVehicleFound(false);
      setWaitingForDriver(true);
      setRide(ride);
      console.log('Ride confirmed:', ride);

    })


    socket.on('ride-started', ride => {

      console.log('Ride started:', ride);
      setWaitingForDriver(false);
      navigate('/riding', {state: {ride}});

    })

    
    
    const handlePickupChange = async (e) => {
        setpickup(e.target.value);
        console.log('Pickup value:', e.target.value);
        try {

          const response = await  axios.get(`${import.meta.env.VITE_BASE_URL}/maps/get-suggestions`, {
              params: {input: e.target.value},
              headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
              }
            
            })
            console.log('Pickup suggestions:', response.data);

            setPickupSuggestions(response.data);
      } catch (error){
          console.error('Error fetching pickup suggestions:', error);
        }
}
    
const handleDestinationChange = async (e) => {

  setdestination(e.target.value) 
  try {
    const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/maps/get-suggestions`, {
      params: {input: e.target.value},
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`

      }
 })
  setdestinationSuggestions(response.data);

} catch(error) {
  console.error('Error fetching destination suggestions:', error);
  }
}









 
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
        gsap.to(confirmedRidePanelRef.current, {
          transform: 'translateY(0)'
        })
      }else {
          gsap.to(confirmedRidePanelRef.current, {
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
       
     },[waitingForDriver ])

async function findTrip() {
  setvehiclePanel(true);
  setpanelOpen(false);

  const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/rides/get-fare`, 
    {   params: {pickup, destination},  
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`
    }

    }
  )
  
  setfare(response.data);
  console.log('Fare data:', response.data);
 
}

async function createRide(){
       const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/rides/create`, {
        pickup,
        destination,
        vehicleType
       }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
       }
       )
       console.log(response.data)
}

          


  return (
    <div className='h-screen relative overflow-hidden'>
      <img className='w-16 absolute left-5 top-5' src='https://upload.wikimedia.org/wikipedia/commons/thumb/5/58/Uber_logo_2018.svg/2560px-Uber_logo_2018.svg.png'/>

      <div onClick={()=>{setvehiclePanel(false)}} className='h-screen w-screen'>
        {/* image for temp React.useState(); */}
        <img className='h-full w-full object-cover' src='https://s.wsj.net/public/resources/images/BN-XR452_201802_M_20180228165525.gif'/>
      </div>

      <div className='  flex flex-col justify-end h-screen  absolute top-0 w-full '>
        <div className='h-[38%] p-6 bg-white relative'>
          <h5 ref={panelCloseRef} className='absolute top-6 right-6 text-2xl opacity-0'
           onClick={()=>setpanelOpen(false)}>
          <i className="ri-arrow-down-wide-line"></i>
          </h5>
            <h4 className='text-2xl font-semibold'>Find a trip</h4>

            <form onSubmit={(e)=>submitHandler(e)}>
              <div className='line bg-gray-900 w-1 h-16  absolute top-[100px] left-10  rounded-full'></div>
              <div>
              <input className='bg-[#eee] px-10 py-2 text-lg  rounded-base w-full mt-6'
                onClick={()=> {
                  setpanelOpen(true) 
                  setActiveField('pickup')
                }}
                value={pickup}
                onChange= {handlePickupChange}
                type="text" 
                placeholder='Add a pick-up location '
              
           />
              
              
              <input 

              onClick = {() => {
                 setpanelOpen(true);
                  setActiveField('destination')
                }
              }

              value = {destination}
              onChange= {handleDestinationChange}
              className='bg-[#eee] px-10 py-2 text-lg rounded-base w-full mt-3' 
                
                type="text" 
                placeholder='Enter your destination'
               
                
                 />
                 </div>
            </form>
            <button onClick={findTrip} className='bg-black text-white px-2 py-2 mt-3 mb-1  w-full text-m font-semibold rounded-xl'>
             Find Trip 
            </button>

        </div>
        <div ref={panelRef} className=' bg-[#fff]  h-0  '>
          <LocationSearchPanel setpanelOpen={setpanelOpen}  setvehiclePanel={setvehiclePanel}
          suggestions={activeField === 'pickup' ? pickupSuggestions : destinationSuggestions}
          setpickup={setpickup} setdestination={setdestination} activeField={activeField}/>
          
        </div>
      </div>

      <div ref={vehiclePanelRef} className=' fixed w-full z-10 bottom-0 translate-y-full   bg-white px-3 py-10 pt-12'>
        <VehiclePanel  
        selectVehicle={setVehicleType}
        fare={fare} setconfirmedRidePanel={setconfirmedRidePanel} setvehiclePanel={setvehiclePanel}/>
      </div>

      <div ref={confirmedRidePanelRef} className='fixed w-full z-10 bottom-0 translate-y-full   bg-white px-3 py-6 pt-12'>
        <ConfiredRide 
          createRide={createRide} 
          pickup={pickup}
          destination={destination} 
          fare={fare} 
          vehicleType={vehicleType}
          
        setconfirmedRidePanel={setconfirmedRidePanel} setVehicleFound={setVehicleFound}  />
      </div>

      <div ref={vehicleFoundRef} className='fixed w-full z-10 bottom-0 translate-y-full   bg-white px-3 py-6 pt-12'>
        <LookingDriver  createRide={createRide} pickup={pickup} destination={destination} fare={fare} vehicleType={vehicleType}
        setVehicleFound={setVehicleFound}  />
      </div>
      <div ref={waitingForDriverRef} className='fixed w-full z-10 bottom-0    bg-white px-3 py-6 pt-12'>
      <WaitingForDriver ride={ride} setVehicleFound={setVehicleFound}
        setWaitingForDriver={setWaitingForDriver} waitingForDriver={waitingForDriver} />
      </div>

    </div>
  )


}


export default Home