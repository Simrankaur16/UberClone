import React, { createContext, useContext, useEffect } from 'react';
import { io } from 'socket.io-client';

export const SocketContext = createContext();

const socket = io(`${import.meta.env.VITE_BASE_URL}`);

const SocketProvider = ({ children }) => {
  

  useEffect(() => {
    // Connect to the server

    socket.on('connect', () => {
        console.log('Connected to socket server');
    })

    socket.on('disconnect', () => {
        console.log('Disconnected from socket server');
    });

  
    
  }, []);

  // Send message to a specific event
  
  return (
    <SocketContext.Provider value={{ socket}}>
      {children}
    </SocketContext.Provider>
  );
};

export default SocketProvider;