const express = require('express')
const app = express()
const http = require('http')
const {Server} = require("socket.io");
const cors = require('cors')

app.use(cors())

const appserver =  http.createServer(app)

const io = new Server(appserver,{
    cors:{
        origin:"http://localhost:5173/",
        methods:["POST","GET"]
    }


})


appserver.listen(3000,()=>{
    console.log("server is running")
})