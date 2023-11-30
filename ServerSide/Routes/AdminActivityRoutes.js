const express=require('express')
const { connection } = require('../Connection/connection')
const { adminRouter } = require('./Amdinroutes')
const bcrypt = require('bcrypt');
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
adminactivityRouter.get("/getcat",async(req,res)=>{
    const query="SELECT * FROM category"
    // console.log("ihi")
    try{
const [data]=await connection.promise().query(query)
// console.log(data)
res.status(200).json({msg:data})
    }catch(err){
        res.status(400).json({msg:"Something going wrong"})
    }
})
adminactivityRouter.post("/addemployee",async(req,res)=>{
    const {name,email,password,category_id,address,image,salary}=req.body
//   console.log("hi")
const [result]=await connection.promise().query("SELECT * FROM employ WHERE email=?",[email])
if(result.length>0){
    res.status(400).json({msg:"Employee is already present"})
}else{


try{
    
   
            
            bcrypt.hash(password, 5, function(err, hash) {
                // console.log(hash)
                if(hash){
                    const query=`INSERT INTO employ (name,email,password,salary,address,category_id,image)
            VALUES ( '${name}','${email}' ,'${password}' ,'${+salary}' ,'${address}','${category_id}','${image}')`
               
            connection.query(query,((error)=>{
                if(error){
                    console.log(error)
                    res.status(400).json({msg:"Something going wrong"})
                }else{

                    res.status(200).json({msg:"Employee Added Successfully"})
                }}))
          
            // res.status(200).json({msg:"Empoyee Added Successfully"})
        }else{
            res.status(400).json({msg:"Error In adding employ"})
        
        }})
}catch(err){
    res.status(400).json({msg:"something going wrong"})
}}


    })



module.exports={adminactivityRouter}