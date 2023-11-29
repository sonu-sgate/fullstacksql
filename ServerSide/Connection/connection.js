const mysql=require('mysql2')

// making connection

const connection=mysql.createConnection({
    'user':"root",
    'host':"localhost",
    "password":"",
    "database":"college",
    waitForConnections:true,
    queueLimit:10,


})
module.exports={connection}
