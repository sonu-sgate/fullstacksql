const express=require('express')
const { connection } = require('../Connection/connection')
const { join } = require('path')
const empActivityrouter=express.Router()
empActivityrouter.get("/profile",async(req,res)=>{
    const {email}=req.body
    try{
const [joindata]=await connection.promise().query(`SELECT * FROM employ INNER JOIN category ON employ.category_id=category.id Where email='${email}'`)
console.log(joindata,"joindataprofile")
res.status(200).json({profile:joindata[0]})
    }catch(err){
        res.status(400).json({msg:"Something going wrong"})
    }
})
module.exports={empActivityrouter}