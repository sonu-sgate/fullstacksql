const express=require('express')
const cors=require("cors")
const { connection } = require('./ServerSide/Connection/connection')
const { adminRouter } = require('./ServerSide/Routes/Amdinroutes')
const app=express()
app.use(cors())
app.use(express.json())

app.use("/auth",adminRouter)
app.listen(3000,async(req,res)=>{
    try{
        connection.connect((error)=>{
            if(error){
                console.log("not able to connect with database")
            }else{
                console.log("we connected with database enjoy!")
            }
            console.log('server is running on port 3000')
        })
    }catch{
        console.log("something going wrong !!")
    }
})
