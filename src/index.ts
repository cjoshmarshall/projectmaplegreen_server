import express, { Request, Response } from 'express';
import path from 'path';
import { createServer } from "http";
import { db } from './db'
import { Server } from 'socket.io';
import multerRoute from "./routes/multer";
import authRoute from "./routes/auth";
import treeRoute from "./routes/trees";
import userRoute from "./routes/users";
import notificationsRoute from "./routes/notifications";

const app = express()
const server = createServer(app);
const dotenv = require('dotenv')
const cors = require("cors")
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser');


dotenv.config({ path: path.resolve(__dirname + '/.env') });

db.connect((err: Error) => {
    if (err) throw err;
    console.log("Database Connected!");
});

app.use(express.json())
app.use(cors({ credentials: true }))
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json())
app.use(cookieParser());

app.get('/', (req: Request, res: Response) => {
    res.send('Server Connected');
});


app.use('/api/images', multerRoute)

app.use('/api/auth', authRoute)
app.use('/api/trees', treeRoute)
app.use('/api/users', userRoute)
app.use('/api/notifications', notificationsRoute)

let users: any = []

const addUser = (userId: number, socketId: string, admin: number) => {
    !users.some((user: any) => user.userId === userId && user.userId !== null) &&
        users.push({ userId, socketId, admin })
}

const removeUser = (socketId: string) => {
    users = users.filter((user: any) => user.socketId !== socketId)
}


const io = new Server(server, {
    cors: {
        origin: process.env.port || "http://localhost:3000",
        // origin: "https://projectmaplegreen.netlify.app"
    }
});

io.on('connection', (socket: any) => {

    // Socket Connected
    console.log('Socket Connected')

    // Receieve Data from User
    socket.on('addUser', (userId: number, admin: number) => {
        addUser(userId, socket.id, admin)
        io.emit('getUsers', users)
    })

    // Get Notification
    socket.on('importTree', ({ userId }: any) => {
        const admin: any = users.find((user: any) => user.admin === 1)
        io.to(admin?.socketId).emit('getNotification', { userId })
    })

    //Socket Disconnect
    socket.on('disconnect', () => {
        console.log('Socket Disconnected')
        removeUser(socket.id)
        io.emit('getUser', users)

    })
})

server.listen(
    process.env.PORT || 3006, () => console.log('Server Running')
)