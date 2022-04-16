const express = require('express');
const {v4:uuidv4} = require('uuid')
const app = express();
const server = require('http').Server(app)
const io = require('socket.io')(server)

const { ExpressPeerServer } = require('peer');
const peerServer = ExpressPeerServer(server,{
    debug:true
})

app.set('view engine','ejs')
app.use(express.static('public'))
app.use(express.urlencoded({ extended:true}))
app.use('/peerjs',peerServer)

app.get('/',(req,res)=>{
    res.redirect(`/${uuidv4()}`)
})

app.get('/:room',(req,res)=>{
    res.render('room',{roomId: req.params.room})
})

io.on('connection',socket=>{
    socket.on('join-room', (roomId, userId) => {
        socket.join(roomId)
        socket.broadcast.to(roomId).emit('user-connected', userId)
        socket.on('message',message => {
            io.to(roomId).emit('createMessage',message)
        })
    })
})

const Port = process.env.PORT || 3000
// app.listen(Port,()=>{
//     console.log(`app is listening at ${Port} port`)
// })

server.listen(Port,()=>{
    console.log(`app is listening at port ${Port}`)
})

// 1:22:15 / 3:28:02