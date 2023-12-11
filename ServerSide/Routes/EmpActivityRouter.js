const express=require('express')
const nodemailer = require("nodemailer");
const { connection } = require('../Connection/connection')
const { join, format } = require('path')
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
empActivityrouter.get("/getdata",async(req,res)=>{
  // console.log("hi")
  try{
const [data]=await connection.promise().query('SELECT * FROM employ INNER JOIN category ON category.id=employ.category_id')
// console.log(data)
res.status(200).json({msg:data})
  }catch(err){
    res.status(400).json({msg:"something going wrong"})
  }
})

// attendence system ....................................................

// signiN...........
empActivityrouter.post("/signIn",async(req,res)=>{
  const {signIn,signOut,userId}=req.body
const currentDate = new Date();
const formattedDate = `${currentDate.getDate()}-${currentDate.getMonth() + 1}-${currentDate.getFullYear()}`;

const [existingdata]=await connection.promise().query(`SELECT * FROM attendencetable WHERE date='${formattedDate}'`)
console.log(existingdata,"existingdata")
if(existingdata.length>0){
  connection.query(`UPDATE attendencetable SET signIn='${signIn}' WHERE date='${formattedDate}'`,(error,results)=>{
    if(error){
      res.status(400).json({msg:"Not able to signIn"})
    }else{
      res.status(200).json({msg:"SignIn Successfully"})
    }
  })
}
else{
try{
connection.query(`Insert INTO attendencetable (userId,signIn,signOut,date) VALUES (?,?,?,?)`,[userId,signIn,signOut,formattedDate],(error,results)=>{
  if(error){
    // console.log(error)
    res.status(400).json({msg:"Something going wrong"})
  }else{
    // console.log("done")
    res.status(200).json({msg:"SignIn Successfully"})
  }
})

// res.status(200).json({msg:"successfully"})
}catch(err){
  res.status(400).json({msg:"Something going wrong"})
}

}


})

// signOut,,,,,,,,,,,,,,,,,,,,,,,,,,,,
empActivityrouter.patch("/signOut/:id",async(req,res)=>{
const currentDate = new Date();
// console.log("hijji")
const formattedDate = `${currentDate.getDate()}-${currentDate.getMonth() + 1}-${currentDate.getFullYear()}`;

const [existingdata]=await connection.promise().query(`SELECT * FROM attendencetable WHERE date='${formattedDate}'`)
if(existingdata){
try{
connection.query(`UPDATE attendencetable SET signOut='${signOut} WHERE id=${req.params}'`)
}catch(err){
  res.status(400).json({msg:"something going wrong"})
}
}else{
  res.status(400).json({msg:"Please signIn first"})
}



})
module.exports={empActivityrouter}