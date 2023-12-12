const express=require('express')
var jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { connection } = require('../Connection/connection')

const adminRouter=express.Router()

adminRouter.post("/adminlogin",async(req,res)=>{
// console.log(req.body)
const {email,password}=req.body

// we needed whole data of user to check
const query=`SELECT * FROM admin WHERE email="${email}"`

const [data]=await connection.promise().query(query)

if(data.length>=1){
   try{
    await connection.promise().beginTransaction()
    bcrypt.compare(password, data[0].password, function(err, result) {
       if(result){
        var token = jwt.sign({ userId:data[0].empid,role:'admin',email:data[0].email }, 'ms',{expiresIn:'1d'})
        res.cookie("token",token)
        res.status(200).json({msg:"LOGIN SUCCESSFULLY",role:"admin"})
       }else{
        res.status(400).json({msg:"Password Mismatch"})
       }
    });
    await connection.promise().commit()
   }catch(err){
    await connection.promise().rollback()
    res.status(500).json({msg:"something going wrong"})
   }
}else{
await connection.promise.rollback()
    res.status(400).json({msg:"USER IS NOT REGISTERED"})
}
// res.status(200).json({msg:data})
})
adminRouter.post("/adminsignup",async(req,res)=>{
    const {email,password}=req.body
    const query=`SELECT * FROM admin WHERE email='${email}'`
const [singledata]=await connection.promise().query(query)
// console.log(singledata)
if(singledata.length>0){
    res.status(400).json({msg:"Already Registered"})
}else{
    bcrypt.hash(password, 5, async(err, hash)=> {
     if(hash){
       
        try{
            const query=`INSERT INTO admin (email,password) VALUES ('${email}','${hash}')`
            connection.query(query,((error)=>{
                if(error){
                    res.status(400).json({msg:"Error In Signup"})
                }else{
                    res.status(200).json({msg:"Signup Successfully"})
                }
            }))
        }catch(err){
            res.status(400).json({msg:"Error In Signup"})
        }
     }
    });
}
})
module.exports={adminRouter}