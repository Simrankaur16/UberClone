import React, {useContext, useEffect, useState} from 'react'
import { useNavigate } from 'react-router-dom'
import { CaptainDataContext } from '../context/CaptainContext'
import axios from 'axios';


const CaptainProtectWrapper = ({
  children}) => {

    const token = localStorage.getItem('token');
    const navigate = useNavigate();
    const {captain, setCaptain} = useContext(CaptainDataContext)
    const [isLoading, setLoading] = useState(true)

    useEffect(()=>{

        if(!token){
             console.log("No token found, redirecting to captain login");
            navigate('/captain-login');
        }
      axios.get(`${import.meta.env.VITE_BASE_URL}/captain/profile`,{
          headers:{
            Authorization:`Bearer ${token}`
        }
       }).then(response => {
        if(response.status === 200){
          console.log('Captain profile data:', response.data);
            setCaptain(response.data.captain)
          
            setLoading(false)
        }
    }).catch(err => {
       
        console.log(err)
        localStorage.removeItem('token')
        navigate('/captain-login')
    })
    
    },[token])

    if(isLoading){
        return(
            <div>Loading...</div>
        )
    }




  return (
    <>
      {children}
    </>

    
  )
}

export default CaptainProtectWrapper