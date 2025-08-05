const socketIo = require('socket.io');
const userModel = require('./models/userModel'); // Assuming you have a user modelco
const captainModel = require('./models/captain.model'); // Assuming you have a captain model

let io; 

function initializeSocket(server) {
    io = socketIo(server, {
        cors: {
            origin: '*', 
            methods: ['GET', 'POST'],
        }
    });

    io.on('connection', (socket) => {
        console.log('A user connected:', socket.id);

        socket.on('join', async(data)=> {
             const {userId, userType } = data;

             if(userType === 'user') {
                await userModel.findByIdAndUpdate(userId, {socketId: socket.id});

             }else if(userType === 'captain') {
                await captainModel.findByIdAndUpdate(userId, {socketId: socket.id}) };

        });;
    
        socket.on('update-location-captain ', async(data) => {
            const {userId,  location} = data;

            if(!location || !location.ltd|| !location.lng) {
               
                return socket.emit('error', 'Invalid location data');
            }

            await captainModel.findByIdandUpdate(userId, {
                location: {
                    ltd: location.ltd,
                    lng: location.lng
                }
            });


        })

        socket.on('disconnect', () => {
            console.log('User disconnected:', socket.id);
        });

        // Add more event listeners as needed
    })
}


function sendMessageToSocketId(socketId, messageObject) {
    console.log('Sending message to socketId:', socketId, 'Message:', messageObject);
    if (io) {
        io.to(socketId).emit(messageObject.event, messageObject.data);
    } else {
        console.error('Socket.io is not initialized');
    }
}


module.exports = {
    initializeSocket,sendMessageToSocketId };