const express=require("express")
var jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { connection } = require("../Connection/connection")
const empRouter=express.Router()
empRouter.post("/login",async(req,res)=>{
    const {email,password}=req.body
    // console.log(email,password,"back")
    const [empdata]= await connection.promise().query(`SELECT * FROM employ WHERE email='${email}'`)

    const [joindata]=await connection.promise().query(`SELECT * FROM employ  INNER JOIN
    category ON employ.category_id=category.id WHERE email='${email}'`)
    // console.log(joindata)
    // console.log(empdata,"empdata")
// console.log(empdata[0].password)
    try{
        if(empdata.length>0){
            bcrypt.compare(password, empdata[0].password, function(err, result) {
        
             if(result){
                var token = jwt.sign({ userId:empdata[0].id,role:"employee",email:empdata[0].email }, 'ms');
                // console.log(token)
                res.status(200).json({msg:"Login Successfully",empdetails:joindata[0],token,role:"employee"})
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