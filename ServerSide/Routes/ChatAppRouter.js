const express=require('express')
const { connection } = require('../Connection/connection')


  const chatapp=(io)=>{

const chatRouter=express.Router()
chatRouter.post("/postchat",async(req,res)=>{
    const {userId,message,To}=req.body
    console.log(userId,message,To)
let newarr=[]
newarr.push(message)
try{
    connection.promise().beginTransaction()
 connection.query("INSERT INTO chattable (userId,messages,To",[userId,newarr,To],async(error,results)=>{
    if(error){
        res.status(400).json({msg:"Something going wrong"})
    }else{
        await connection.promise().commit()
        res.status(200).json({msg:"message send successfully"})
    }
 })
}catch(err){
await connection.promise().rollback()
    res.status(500).json({msg:"Something going wrong"})
}
    
})
return chatRouter

  }
  module.exports={chatapp}