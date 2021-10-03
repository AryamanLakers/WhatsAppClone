const express=require('express')
const app=express()
const cors=require('cors')
const {Server}=require('socket.io')
const server=app.listen(process.env.PORT||3001,()=>{
    console.log("The server is up and running")
})
app.use(express.static('./public'))
app.use(cors())
const io=new Server(server,{
    cors:{
        origin:'*',
        methods:['GET','POST']
    }
})

io.on("connection",(socket)=>{
    console.log(`New connection made:${socket.id}`)
    
    socket.on("join-room",(data)=>{
        socket.join(data.id)
       
        console.log(`Username:${data.username} joined to room: ${data.id}`)
    })

    socket.on('send-message',(matter)=>{
        socket.to(matter.id).emit('receive-message',matter)
        
    })

})
