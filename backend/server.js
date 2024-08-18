require('dotenv').config();
const express = require("express")
const app =express()
const router = require("./routers/auth-router")
const connectdb= require("./utils/db")
const errorMiddleware = require("./middlewares/error-middleware")
const PORT = process.env.PORT
app.use(express.json())
app.use("/",router)

connectdb().then(()=>{
    app.listen(PORT,(req,res)=>{
        console.log("server is running on port no " , PORT)
    })
})
app.use(errorMiddleware)