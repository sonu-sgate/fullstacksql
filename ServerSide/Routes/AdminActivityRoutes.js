const express=require('express')
const path=require("path")
const { connection } = require('../Connection/connection')
const { adminRouter } = require('./Amdinroutes')
const bcrypt = require('bcrypt');
const multer  = require('multer');
const { error } = require('console');
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

// image upload////////////////////

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'Public/Images'); // Set your destination folder
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    },
  });
  
  const upload = multer({ storage: storage });
  
  
  adminactivityRouter.post("/addemployee", upload.single('image'), async (req, res) => {
    try {
      const { name, email, password, category_id, address, salary} = req.body;
  console.log(req.file,"imageurl")
      // Check if the email already exists
      const [result] = await connection.promise().query("SELECT * FROM employ WHERE email=?", [email]);
      if (result.length > 0) {
        return res.status(400).json({ msg: "Employee is already present" });
      }
  
      // Hash the password
      bcrypt.hash(password, 5, function (err, hash) {
        if (err) {
          console.log(err);
          return res.status(400).json({ msg: "Error in hashing password" });
        }
  
        // Construct the SQL query using placeholders to prevent SQL injection
        const query = `INSERT INTO employ (name, email, password, salary, address, category_id, image)
                       VALUES (?, ?, ?, ?, ?, ?, ?)`;
        const values = [name, email, hash, +salary, address, category_id,req.file.filename];
  
        // Execute the query
        connection.query(query, values, (error) => {
          if (error) {
            // console.log(error);
            return res.status(400).json({ msg: "Something went wrong" });
          } else {
            return res.status(200).json({ msg: "Employee added successfully" });
          }
        });
      });
    } catch (err) {
      // console.log(err);
      return res.status(500).json({ msg: "Internal server error" });
    }
  });
  
// Getting employees......................

adminactivityRouter.get("/getemp",async(req,res)=>{
  const query="SELECT * FROM employ"

  try{
const [data]=await connection.promise().query(query)

res.status(200).json({msg:data})
  }catch(err){
    res.status(400).json({msg:"something going wrong"})
  }
})
adminactivityRouter.get("/getsingleemp/:id",async(req,res)=>{
  const {id}=req.params
  // console.log(id)
  const query=`SELECT * FROM employ WHERE id=${id}`
  try{
const [data]=await connection.promise().query(query)
res.status(200).json({msg:data})
  }catch(err){
    res.status(400).json({msg:"something going wrong "})
  }
})
module.exports={adminactivityRouter}