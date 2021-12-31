const express = require("express");
// const path = require("path");
const http = require("http");
const { userJoin, getCurrentUser, userLeave, getRoomUsers,getRoomUsers2 } = require("./slither/users")
const socketio = require("socket.io");
const app = express();
const server = http.createServer(app);
const io = socketio(server)
const room = "one";
app.use(express.static('slither'));
const port = process.env.PORT || 3000 ;
io.on('connection', socket => {
    socket.emit("message", "Welcome to Vlither.io");
    socket.on('join', ({namee,points,score}) => {
        const users = userJoin(socket.id, namee, room,points,score);
        socket.join(users.room);
        io.to(users.room).emit("roomUsers", {
            room: users.room,
            userr: getRoomUsers(users.room)
        })
    })
    socket.on("uppdate",({x,y})=>{
        io.to('one').emit("uppdate",({
            x,
            y
        }))
    })
    io.to("one").emit("roomUseer", {
        room: "one",
        userr: getRoomUsers("one")
    })
    socket.on('disconnect', () => {
        const user = userLeave(socket.id);
        if (user) {
            io.to(user.room).emit('messageLeft', `${user.username} has left the game`)
            io.to(user.room).emit('roomUsers',{
                room: user.room,
                userr: getRoomUsers(user.room)
            })
        }
    })
})


server.listen(port, () => console.log(`Server is running ${port}`)); 
