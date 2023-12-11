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
const date=new Date()
const formattedDate = `${currentDate.getDate()}-${currentDate.getMonth() + 1}-${currentDate.getFullYear()}`;
const formattedTime = date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });
// console.log(formattedTime,"sfs")

const [existingdata]=await connection.promise().query(`SELECT * FROM attendencetable WHERE date='${formattedDate}' AND userId=${req.body.userId}`)

// console.log(existingdata,"existingdata")
if(existingdata.length>0){
  connection.query(`UPDATE attendencetable SET signIn='${signIn}' , signInat='${formattedTime}' WHERE date='${formattedDate}'`,(error,results)=>{
    if(error){
      res.status(400).json({msg:"Not able to signIn"})
    }else{
      res.status(200).json({msg:"SignIn Successfully"})
    }
  })
}
else{
try{
connection.query(`Insert INTO attendencetable (userId,signIn,signOut,date,signInat) VALUES (?,?,?,?,?)`,[userId,signIn,signOut,formattedDate,formattedTime],(error,results)=>{
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
  const {signOut}=req.body
  const {id}=req.params
const currentDate = new Date();
const date=new Date()
// console.log("hijji")
const formattedDate = `${currentDate.getDate()}-${currentDate.getMonth() + 1}-${currentDate.getFullYear()}`;
const formattedTime = date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });
const [existingdata]=await connection.promise().query(`SELECT * FROM attendencetable WHERE date='${formattedDate}'`)
// console.log(existingdata,"signout")


const convertTimeStringToDate = (timeString) => {
  const [time, period] = timeString.split(' ');
  const [hour, minute] = time.split(':');
  const date = new Date();
  date.setHours(parseInt(hour) + (period === 'PM' && hour !== '12' ? 12 : 0));
  date.setMinutes(parseInt(minute));
  date.setSeconds(0);
  return date;
};



// console.log(`User logged in at ${loginTimeString} and logged out at ${logoutTimeString}.`);
// console.log(`User was on the site for ${hours} hours and ${minutes} minutes.`);

if(existingdata.length>0){
  // Convert login and logout time strings to Date objects
const loginTime = convertTimeStringToDate(existingdata[0].signInat);
const logoutTime = convertTimeStringToDate(formattedTime);

const timeDifferenceMs = logoutTime - loginTime;

// Convert milliseconds to minutes
const timeDifferenceMin = Math.floor(timeDifferenceMs / (1000 * 60));

// Calculate hours and remaining minutes
const hours = Math.floor(timeDifferenceMin / 60);
const minutes = timeDifferenceMin % 60;
try{
connection.query(`UPDATE attendencetable SET signOut='${signOut}' , signOutat='${formattedTime}' ,totalworktime='${hours} hours ${minutes} minutes' WHERE id=${id}`,(error,results)=>{
  if(error){
    // console.log(error)
    res.status(400).json({msg:"something going wrong"})
  }else{
    res.status(200).json({msg:"SignOut Successfully"})
  }
})

}catch(err){
  // console.log(err,"error")
  res.status(400).json({msg:"something going wrong"})
}
}else{
  res.status(400).json({msg:"Please signIn first"})
}



})
empActivityrouter.get('/get',async(req,res)=>{
const currentDate = new Date();
// console.log("hijji")
const {userId}=req.body
// console.log(userId)
const formattedDate = `${currentDate.getDate()}-${currentDate.getMonth() + 1}-${currentDate.getFullYear()}`;
const [data] = await connection.promise().query('SELECT * FROM attendencetable WHERE userId = ? AND date = ?', [req.body.userId, formattedDate]);
if(data.length>0){
try{


res.status(200).json({msg:data[0]})
}catch(err){
  // console.log(err)
  res.status(400).json({msg:"somthing going wrong"})
}
}else{
res.status(200).json({msg:{}})
}

})
module.exports={empActivityrouter}