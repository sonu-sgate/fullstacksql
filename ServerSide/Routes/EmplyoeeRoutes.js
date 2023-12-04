const express=require("express")
var jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { connection } = require("../Connection/connection")
const empRouter=express.Router()
empRouter.post("/login",async(req,res)=>{
    const {email,password}=req.body
    const [empdata]= await connection.promise().query(`SELECT * FROM employ WHERE email='${email}'`)
    // console.log(empdata,"empdata")
    
    try{
        if(empdata.length>0){
            bcrypt.compare(password, empdata[0].password, function(err, result) {
             if(result){
                var token = jwt.sign({ userId:empdata[0].id,role:"employee",email:empdata[0].email }, 'ms');
                res.status(200).json({msg:"Login Successfully",empdetails:empdata[0],token,role:"employee"})
             }else{
                res.status(400).json({msg:"Wrong Password"})
             }
            });
            
        }else{
            res.status(400).json({msg:"No Data Found!!"})
        }
// res.status(200).json({msg:empdata[0],role:"employee"})

    }catch(err){
        res.status(400).json({msg:"Something going wrong"})
    }

})
module.exports={empRouter}