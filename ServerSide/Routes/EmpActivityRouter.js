const express=require('express')
const { connection } = require('../Connection/connection')
const { join } = require('path')
const empActivityrouter=express.Router()
empActivityrouter.get("/profile",async(req,res)=>{
    try{
const [joindata]=await connection.promise().query(`SELECT * FROM employ INNER JOIN category ON employ.category_id=category.id Where email='${email}'`)
res.status(200).json({msg:joindata[0]})
    }catch(err){
        res.status(400).json({msg:"Something going wrong"})
    }
})
module.exports={empActivityrouter}