
var jwt = require('jsonwebtoken');
 const empauth=(req,res,next)=>{
    const token=req.cookies.token
if(token){
    jwt.verify(token, 'ms', function(err, decoded) {
       if(decoded){
        req.body.userId=decoded.userId
        req.body.email=decoded.email
        req.body.role=decoded.role
        next()
       }else{
        res.status(400).json({msg:"wrong token/Please login again"})
       }
      });
}else{
    res.status(400).json({msg:"Please Login First"})
}
}
module.exports={empauth}