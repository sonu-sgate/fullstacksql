const express=require('express')
const cors=require("cors")
const { connection } = require('./ServerSide/Connection/connection')
const { adminRouter } = require('./ServerSide/Routes/Amdinroutes')
const { adminactivityRouter } = require('./ServerSide/Routes/AdminActivityRoutes')
const app=express()
app.use(cors({
    origin:["http://localhost:5174"],
    methods:["GET","POST","PUT","PATCH"],
    credentials:true
}))
app.use(express.json())

app.use("/auth",adminRouter)
app.use("/adminside",adminactivityRouter)
app.use(express.static('public'))
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
