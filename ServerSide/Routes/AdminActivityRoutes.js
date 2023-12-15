const express = require('express');
const path = require('path');
const { connection } = require('../Connection/connection');
const { adminRouter } = require('./Amdinroutes');
const bcrypt = require('bcrypt');
const multer = require('multer');
const { error } = require('console');
const adminactivityRouter = express.Router();
// Route to get singleadmin

adminactivityRouter.get('/getadmin/:id',async(req,res)=>{
const {id}=req.params

try{
const [data]=await connection.promise().query(`SELECT * FROM amdin WHERE id=${id}`)
res.status(200).json({msg:data})
}catch(err){
 res.status(500).json({msg:"Something going Wrong"})
}
})

// Edit admin Profile Route
adminactivityRouter.patch('/editadmin/:id',async(req,res)=>{
  const {id}=req.params
  const {name,email}=req.body
  try{
    await connection.promise().beginTransaction()
connection.query(`UPDATE admin SET ${name&&"name"} ${req.file.filename!==undefined&&", image"},${email&&", eamil"} `,[
  name&&name,email&&email,req.file.file!==undefined&&req.file.filename
],async(error,results)=>{
  if(error){
    await connection.promise.rollback()
    res.status(400).json({msg:"Not able to update"})
  }else{
    await connection.promise().commit()
    res.status(200).json({msg:"Updated Successfully"})
  }
})
  }catch(err){
    await connection.promise().rollback()
    res.status(500).json({msg:"Something Going Wrong"})
  }
  
})
// Route to add a new category
adminactivityRouter.post('/addcat', async (req, res) => {
  const { name } = req.body;
  const query = `INSERT INTO category (categoryname) VALUES ('${name}')`;
  try {
    await connection.promise().beginTransaction()
    connection.query(query, async(error) => {
      if (error) {
        await connection.promise().rollback()
        res.status(400).json({ msg: 'Error adding Category' });
      } else {
        await connection.promise().commit()
        res.status(200).json({ msg: 'Category added successfully' });
      }
    });
  } catch (err) {
    await connection.promise().rollback()
    res.status(400).json({ msg: 'Error in adding Category' });
  }
});

// Route to get all categories
adminactivityRouter.get('/getcat', async (req, res) => {
  const query = 'SELECT * FROM category';
  try {
    await connection.promise().commit()
    const [data] = await connection.promise().query(query);
    res.status(200).json({ msg: data });
  } catch (err) {
    await connection.promise().rollback()
    res.status(400).json({ msg: 'Something went wrong' });
  }
});

// Image upload configuration using multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'Public/Images'); // Set your destination folder
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

// Route to add a new employee with image upload
adminactivityRouter.post('/addemployee', upload.single('image'), async (req, res) => {
  try {
    await connection.promise().beginTransaction()
    const { name, email, password, category_id, address, salary } = req.body;

    // Check if the email already exists
    const [result] = await connection.promise().query('SELECT * FROM employ WHERE email=?', [email]);
    if (result.length > 0) {
      await connection.promise().rollback()
      return res.status(400).json({ msg: 'Employee is already present' });
    }

    // Hash the password
    bcrypt.hash(password, 5, async (err, hash)=> {
      if (err) {
        // console.log(err);
             await connection.promise().rollback()
        return res.status(400).json({ msg: 'Error in hashing password' });
      }

      // Construct the SQL query using placeholders to prevent SQL injection
      const query = `INSERT INTO employ (name, email, password, salary, address, category_id, image)
                       VALUES (?, ?, ?, ?, ?, ?, ?)`;
      const values = [name, email, hash, +salary, address, category_id, req.file.filename];

      // Execute the query
      connection.query(query, values, async(error) => {
        if (error) {
          await connection.promise().rollback()
          return res.status(400).json({ msg: 'Not able to add employee' });
        } else {
          await connection.promise().commit()
          return res.status(200).json({ msg: 'Employee added successfully' });
        }
      });
    });
  } catch (err) {
         await connection.promise().rollback()
    return res.status(500).json({ msg: 'Internal server error' });
  }
});

// Route to get all employees
adminactivityRouter.get('/getemp', async (req, res) => {
  const query = 'SELECT * FROM employ';
  try {
    // await connection.promise().beginTransaction()
    const [data] = await connection.promise().query(query);
    res.status(200).json({ msg: data });
  } catch (err) {
         await connection.promise().rollback()
    res.status(500).json({ msg: 'Something went wrong' });
  }
});

// Route to get a single employee by ID
adminactivityRouter.get('/getsingleemp/:id', async (req, res) => {
  const { id } = req.params;
  const query = `SELECT * FROM employ WHERE empid=${id}`;
  try {
    const [data] = await connection.promise().query(query);
    res.status(200).json({ msg: data });
  } catch (err) {
    res.status(500).json({ msg: 'Something went wrong' });
  }
});

// Route to get the count of admins, employees, and total
adminactivityRouter.get('/getcount', async (req, res) => {
  const queryAdminCount = 'SELECT count(id) FROM admin';
  const queryEmpCount = 'SELECT count(empid) FROM employ';
  const queryAdmins = 'SELECT * FROM admin';

  try {
    const [admins] = await connection.promise().query(queryAdmins);
    const [adminCount] = await connection.promise().query(queryAdminCount);
    const [empCount] = await connection.promise().query(queryEmpCount);

    res.status(200).json({
      admincount: adminCount[0]['count(id)'],
      empcount: empCount[0]['count(empid)'],
      total: +(empCount[0]['count(empid)']) + (+adminCount[0]['count(id)']),
      admins,
    });
  } catch (err) {
    res.status(500).json({ msg: 'Something went wrong' });
  }
});
// route to get admins.............
adminactivityRouter.get("/admins",async(req,res)=>{
  const {email,sortby,order,page,limit}=req.query

  let query='SELECT * FROM admin '
  let query2='SELECT COUNT(id) FROM admin '
if(email){
query+=`WHERE email LIKE '%${email}%' `
query2+=`WHERE email LIKE '%${email}%' `
}
// console.log(query)
if(order&&sortby){
  query+=`ORDER BY ${sortby} ${order} `
  query2+=`ORDER BY ${sortby} ${order} `
}
let totalpages=0

  const [data]=await connection.promise().query(query2)
  // console.log(data,"data")
  totalpages=Math.ceil(+(data[0]['COUNT(id)']/+limit))

  if(page&&limit){
    const OFFSET=(+page-1)*(+limit)
    query+=`LIMIT ${+limit} OFFSET ${+OFFSET} `
    query2+=`LIMIT ${+limit} OFFSET ${+OFFSET} `
    

    // console.log('totalpages',totalpages)
const [admins]=await connection.promise().query(query)
  res.status(200).json({msg:admins,totalpages})
  try{

  }catch(err){
    res.status(400).json({msg:"Something going wrong"})
  }}else{
    // console.log(query,"query")
    const [admins]=await connection.promise().query(query)

    res.status(200).json({msg:admins})
  }
})

// Route to get attendence details of employeee

adminactivityRouter.get('/get/:id',async(req,res)=>{
  const {id}=req.params
  // console.log(id)
  try{
const [data]=await connection.promise().query(`SELECT * FROM attendencetable WHERE userId=${id}`)
res.status(200).json({msg:data})
  }catch(err){
    
    res.status(400).json({msg:"something going wrong"})
  }
})
// Route for admin logout
adminactivityRouter.get('/adminlogout', async (req, res) => {
  try {
    res.clearCookie('token');
    res.status(200).json({ msg: 'Logout Successfully' });
  } catch (err) {
    res.status(400).json({ msg: 'Failed to logout' });
  }
});


module.exports = { adminactivityRouter };
