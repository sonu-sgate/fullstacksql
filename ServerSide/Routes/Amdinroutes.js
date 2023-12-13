const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { connection } = require('../Connection/connection');

const adminRouter = express.Router();

// Admin Login
adminRouter.post("/adminlogin", async (req, res) => {
  const { email, password } = req.body;

  // Fetching the user data based on email
  const query = `SELECT * FROM admin WHERE email="${email}"`;
  const [data] = await connection.promise().query(query);

  if (data.length >= 1) {
    try {
      // Start a database transaction
      await connection.promise().beginTransaction();

      bcrypt.compare(password, data[0].password, function(err, result) {
        if (result) {
          var token = jwt.sign({ userId: data[0].empid, role: 'admin', email: data[0].email }, 'ms', { expiresIn: '1d' });
          res.cookie("token", token);
          res.status(200).json({ msg: "LOGIN SUCCESSFULLY", role: "admin" });
        } else {
          res.status(400).json({ msg: "Password Mismatch" });
        }
      });

      // Commit the transaction after successful login
      await connection.promise().commit();
    } catch (err) {
      // Rollback the transaction in case of an error
      await connection.promise().rollback();
      res.status(500).json({ msg: "something going wrong" });
    }
  } else {
    // User is not registered
    res.status(400).json({ msg: "USER IS NOT REGISTERED" });
  }
});

// Admin Signup
adminRouter.post("/adminsignup", async (req, res) => {
  const { email, password } = req.body;

  // Check if the user is already registered
  const query = `SELECT * FROM admin WHERE email='${email}'`;
  const [singledata] = await connection.promise().query(query);

  if (singledata.length > 0) {
    // User is already registered
    res.status(400).json({ msg: "Already Registered" });
  } else {
    try{
  bcrypt.hash(password, 5, async (err, hash) => {
      if (hash) {
        try {
            await connection.promise().beginTransaction()
          // Insert new user data into the database
          const query = `INSERT INTO admin (email,password) VALUES ('${email}','${hash}')`;
          connection.query(query, (async(error) => {
            if (error) {
                await connection.promise().rollback()
              res.status(400).json({ msg: "Error In Signup" });
            } else {
                await connection.promise().commit()
              res.status(200).json({ msg: "Signup Successfully" });
            }
          }));
        } catch (err) {
 await connection.promise().rollback()
          res.status(500).json({ msg: "Error In Signup" });
        }
      }
    });
    }catch(err){
      await connection.promise().rollback()
        res.status(500).json({msg:"Server Error Is Going"})
    }
  
  }
});

module.exports = { adminRouter };
