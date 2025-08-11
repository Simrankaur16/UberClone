import React from 'react'
import { useState, useEffect, useRef, useContext } from 'react'
import { Link } from 'react-router-dom'
import CaptainDetails from '../components/CaptainDetails'
import RidePopup from '../components/RidePopup'
import gsap from 'gsap'
import ConfirmRidePopUp from '../components/ConfirmRidePopUp'
import {SocketContext} from '../context/SocketContext.jsx'
import { CaptainDataContext } from '../context/CaptainContext.jsx'
import axios from 'axios'


const CaptianHome = () => {
  const [ridePopupPanel, setridePopupPanel] = useState(false);
  const ridePopupPanelRef = useRef(null)


  const [confirmRidePopupPanel, setConfirmRidePopupPanel] = useState(false)

  const confirmRidePopupPanelRef = useRef(null)
  const [ ride, setRide ] = useState(null)

  const {socket} = useContext(SocketContext);
  const {captain} = useContext(CaptainDataContext);

  useEffect(() => 
    {
    socket.emit("join", {
      userId: captain._id,
      userType: 'captain'
      
    })

    const updateLocation = () => {
 
      if(navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {


          console.log("captain location", position.coords.latitude, position.coords.longitude)

          console.log({
            _id: captain._id,
            captainId: captain._id,
            location: {
              ltd: position.coords.latitude,
              lng: position.coords.longitude
            }
          });

          
            socket.emit('update-location-captain', {
            userId: captain._id, 
            location : {
              ltd: position.coords.latitude,
              lng: position.coords.longitude
            }
             })
          })
        } 
      }

      const locationInterval = setInterval(updateLocation, 10000)
      updateLocation();
 
   
  },[])

  socket.on('new-ride', (data) => {

    console.log(data , "new ride data");
    setRide(data);
    setridePopupPanel(true);
  })

  async function confirmRide() {



   const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/rides/confirm`, {

      rideId: ride._id,
      captainId: captain._id,

      
    },{
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`

      }
    })

   setridePopupPanel(false);
   setConfirmRidePopupPanel(true);

  }

  useEffect(function () {
    if (ridePopupPanel) {
      gsap.to(ridePopupPanelRef.current, {
        transform: 'translateY(0)'
      })
    } else {
      gsap.to(ridePopupPanelRef.current, {
        transform: 'translateY(100%)'
      })
    }

  }, [ridePopupPanel])


  useEffect(function () {
    if (confirmRidePopupPanel) {
      gsap.to(confirmRidePopupPanelRef.current, {
        transform: 'translateY(0)'
      })
    } else {
      gsap.to(confirmRidePopupPanelRef.current, {
        transform: 'translateY(100%)'
      })
    }

  }, [confirmRidePopupPanel])

  


  return (
    <div>
      <div className='h-screen'>
        <div className='fixed p-3 top-0 flex items-center justify-between w-full'>
          <img className='w-16' src='https://upload.wikimedia.org/wikipedia/commons/thumb/5/58/Uber_logo_2018.svg/2560px-Uber_logo_2018.svg.png' alt="logo" />
          <Link to="/home" className=' h-10 w-10 bg-white flex items-center justify-center rounded-full'>
            <i className=" text-lg font-medium ri-logout-box-r-line"></i>
          </Link>

        </div>




        <div className='h-3/5'>
          <img className='h-full w-full object-cover' src="https://s.wsj.net/public/resources/images/BN-XR452_201802_M_20180228165525.gif" />

        </div>

        <div className='h-2/5 p-4'>
          <CaptainDetails />

        </div>

        <div ref={ridePopupPanelRef} className='fixed translate-y-full w-full z-10 bottom-0  bg-white px-3 py-10 pt-12'>
          <RidePopup setridePopupPanel={setridePopupPanel} 
          setConfirmRidePopupPanel={setConfirmRidePopupPanel} 
          ride={ride}
          confirmRide={confirmRide}
           />

        </div>
        <div ref={confirmRidePopupPanelRef} className='fixed h-screen translate-y-full w-full z-10 bottom-0  bg-white px-3 py-10 pt-12'>
          <ConfirmRidePopUp setConfirmRidePopupPanel={setConfirmRidePopupPanel} setridePopupPanel={setridePopupPanel} />
           
        </div>




      </div>
    </div>
  )
}



export default CaptianHome