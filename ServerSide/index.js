const express=require('express')
const cors=require("cors")
const { connection } = require('./Connection/connection')
const { adminRouter } = require('./Routes/Amdinroutes')
const { adminactivityRouter } = require('./Routes/AdminActivityRoutes')
const app=express()
app.use(cors({
    origin:["http://localhost:5173"],
    methods:["GET","POST","PUT","PATCH"],
    credentials:true
}))
app.use(express.json())

app.use("/auth",adminRouter)
// importent to get static data(images)
app.use(express.static('Public'))
app.use("/adminside",adminactivityRouter)


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
