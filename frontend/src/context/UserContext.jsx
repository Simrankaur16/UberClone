import React, { useSyncExternalStore } from 'react'

export const UserDataContext = createContext()


const UserContext = ({children}) => {
    const [user, setuser] = useState({
        email: '',
        fullname:{
            firstname:'',
            lastname:''
        }
    })
    
  return (
    <div>
        <UserContext.Provider value={user}>
            {children}
        </UserContext.Provider>
    </div>
    
  )
}

export default UserContext