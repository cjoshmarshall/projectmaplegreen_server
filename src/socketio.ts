// import { io } from "./index"

// let users: any = []

// const addUser = (userId: number, socketId: string) => {
//     !users.some((user: any) => user.userId === userId && user.userId !== null) &&
//         users.push({ userId, socketId })
// }

// const removeUser = (socketId: string) => {
//     users = users.filter((user: any) => user.socketId !== socketId)
// }

// io.on('connection', (socket: any) => {

//     // Socket Connected
//     console.log('Socket Connected')

//     // Receieve Data from User
//     socket.on('addUser', (userId: number) => {
//         addUser(userId, socket.id)
//         io.emit('getUsers', users)
//     })

//     // Send Notification
//     // socket.on()

//     //Socket Disconnect
//     socket.on('disconnect', () => {
//         console.log('Socket Disconnected')
//         removeUser(socket.id)
//         io.emit('getUser', users)

//     })
// })
