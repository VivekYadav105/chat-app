const express = require("express")
const morgan = require("morgan")
const mongoose = require("mongoose")
const dotenv = require('dotenv')
const cors = require('cors')
const bodyParser = require('body-parser') 
const errorMiddleware = require("./middleware/error.middleware")
const intializeSocketServer = require('./utils/socket-config')
require('./utils/db')
const http = require('http');
const userRouter = require("./router/user.router")
const chatRouter = require("./router/chat.router")
const contactRouter = require("./router/contact.router")

dotenv.config()

const app = express()
const port = process.env.PORT || 4000

app.use(express.json())
app.options('*', cors());
app.use(cors({
    origin:process.env.NODE_FRONTEND_URL,
    methods: ['GET', 'POST', 'PUT','DELETE'],
    allowedHeaders: ['Content-Type','Authorization'],
}))
app.use(morgan('dev'))
app.use(bodyParser.urlencoded({extended:true}))

app.use('/user',userRouter)
app.use('/chat',chatRouter)
app.use('/contact',contactRouter)

app.use(errorMiddleware)

app.get('/',(req,res,next)=>{
    try{
        res.send(`<a href='${process.env.NODE_FRONTEND_URL}'>Click here</> to visit frontend`)
    }catch(err){
        res.send(err)
    }
})

app.get('*',(req,res,next)=>{
    try{
        res.status(404)
        throw new Error("Route Not found")
    }catch(err){
        next(err)
    }
})

const server = http.createServer(app)


server.on('error', (err) => {
    console.error('Server error:', err);
});
  
server.on('request', (req, res) => {
    // request error to be handled here
    req.on('error', (err) => {
      console.error('Request error:', err);
      console.log('Request details:', req.method, req.url, req.headers);
    });
});

const socketServer = intializeSocketServer(server)

server.listen(port,()=>{
    try{
        console.log("connected to port "+port)
        console.log("socket server up and listening")    
    }catch(err){
        console.log(err)
        res.end(err)
    }
})


