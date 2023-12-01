 
 const jwt=require("jsonwebtoken")
const auth=(req,res,next)=>{


    const token = req.cookies.token; 
 
    // console.log("token",token)
    if(token){
        jwt.verify(token, 'ms', function(err, decoded) {
            if(decoded){
                req.body.role=decoded.role
                req.body.userId=decoded.userId
                req.body.email=decoded.email
                next()
            }else{
                res.status(400).json({msg:"Token Expired/Please login again"})}
          });
      
        
    }else{
        res.status(400).json({msg:"Please Login first"})
    }

}
module.exports={
    auth
}