import React, {createContext, useState, useContext} from 'react'

export const CaptainDataContext = createContext();

const CaptianContext = ({children}) => {
    const [captian, setCaptian] = useState(null);
    const [ isLoading, setIsLoading ] = useState(false);
    const [ error, setError ] = useState(null);

    const updateCaptian = (captainData) =>{
        setCaptian(captainData)
    }

    const value = {
        captian,
        setCaptian,
        isLoading,
        setIsLoading,
        error
    }


  return (
   <div>
    <CaptainDataContext.Provider value={value}>
        {children}
    </CaptainDataContext.Provider>
   </div>
  )
}

export default CaptianContext