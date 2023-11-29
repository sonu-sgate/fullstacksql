const express=require('express')
const { connection } = require('../Connection/connection')
const { adminRouter } = require('./Amdinroutes')
const adminactivityRouter=express.Router()

adminactivityRouter.post("/addcat",async(req,res)=>{
    const {name}=req.body
    const query=`INSERT INTO category (name) VALUES ('${name}')`
    try{
        connection.query(query,((error)=>{
            if(error){
                res.status(400).json({msg:"Error to add Category"})
            }else{
                res.status(200).json({msg:"Category Added Successfully"})
            }
        }))
    }catch(err){
        res.status(400).json({msg:"Error in adding Category"})
    }
})
adminRouter.get("/getcat",async(req,res)=>{
    const query="SELECT * FROM category"
    try{
const [data]=await connection.promise().query(query)
console.log(data)
res.status(200).json({msg:data})
    }catch(err){
        res.status(400).json({msg:"Something going wrong"})
    }
})
module.exports={adminactivityRouter}