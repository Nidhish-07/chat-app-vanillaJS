const path = require('path')
const express = require('express')
const http = require('http')
const socketio = require('socket.io')

const app = express()

const port = process.env.PORT || 3000
const server = http.createServer(app)
const io = socketio(server)


const publicDirectory = path.join(__dirname, "../public")


let message = "Hello"

io.on('connection', (socket) => {
    console.log("New web socket connection");



    socket.emit("message", message)
    socket.broadcast.emit("message", "A new User has joined")

    socket.on("sendMessage", (msg) => {
        io.emit("message", msg)
        // console.log(msg);
    })

    socket.on('disconnect', () => {
        io.emit("message", "A user has left")
    })

    socket.on('sendLocation', (location) => {
        console.log(location.lat, location.lng);
        io.emit('message', `https://google.com/maps?q=${location.lat},${location.lng}`)
    })
})


app.use(express.static(publicDirectory))

server.listen(port, () => {
    console.log("Server is up and running at http://localhost:3000");
})

