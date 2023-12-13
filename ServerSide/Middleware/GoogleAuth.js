const express=require('express')
const passport = require('passport')
const authRouter=express.Router()

authRouter.get('/login/success',async(req,res)=>{
if(req.user){
    res.status(200).json({error:false,user:req.user,msg:"loginSuccessfully"})
}else{
    res.status(403).json({error:true,msg:"Not Authorised"})
}
})
authRouter.get('/login/failed',async(req,res)=>{
    res.status(401).json({error:true,msg:"Login Failed"})
})
authRouter.get("/google/callback",passport.authenticate("google",{"scope":["email","profile"]}))


authRouter.get('/logout',async(req,res)=>{
    req.logOut()
    res.redirect('http://localhost:5173/')
})
module.exports={authRouter}