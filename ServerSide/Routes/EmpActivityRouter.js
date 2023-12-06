const express=require('express')
const nodemailer = require("nodemailer");
const { connection } = require('../Connection/connection')
const { join } = require('path')
const empActivityrouter=express.Router()
empActivityrouter.get("/profile",async(req,res)=>{
    const {email}=req.body
    // console.log(email,"back")
    try{
const [joindata]=await connection.promise().query(`SELECT * FROM employ INNER JOIN category ON employ.category_id=category.id Where email='${email}'`)
// console.log(joindata,"joindataprofile")
res.status(200).json({profile:joindata[0]})
    }catch(err){
        res.status(400).json({msg:"Something going wrong"})
    }
})

// Report system....................................
empActivityrouter.post("/report",async(req,res)=>{
    const {name,message,email,}=req.body
    
    const transporter = nodemailer.createTransport({
      service:"gmail",
        auth: {
          // TODO: replace `user` and `pass` values from <https://forwardemail.net>
          user: "sonu992000parjapat@gmail.com",
          pass: "djxtqalkcgbjopoy",
        },
      });
      
      // async..await is not allowed in global scope, must use a wrapper
   
 

          const mailOptions = {
            from:`MS 😕 `,
            to: "sgate.sonu@gmail.com",
            subject: 'Query from MS application user',
            text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
            html: `<b>Name: ${name}<br> From: ${email}<br>Message:-<br> ${message}</b>`, 
          };
        
         transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
              // console.error(error);
              return res.status(500).json({ message: 'Failed to send email' });
            }
        
            // Email sent successfully
            return res.status(200).json({ message: 'Email sent successfully' });
          });
      
      
    
})

// getting all emloyees.module.............
empActivityrouter.get("/get",async(req,res)=>{
  try{
const [data]=await connection.promise().query('SELECT * FROM emloy')
res.status(400).json({msg:data})
  }catch(err){
    res.status(400).json({msg:"something going wrong"})
  }
})
// payment system..........................................

module.exports={empActivityrouter}