const express =require('express')
const cors = require('cors')
const mysqlConnection = require('./dbops');

const app = express()

app.use(cors())
app.use(express.json())
app.post('/postData', (req, res) => {
    console.log('Received POST request to /postData');
    const formData = req.body;
    const insertQuery = `
      INSERT INTO customer (fullname, email, mobilenumber, address, username, password)
      VALUES (?, ?, ?, ?, ?, ?)
    `;
  
    const values = [
      formData.fullname,
      formData.email,
      formData.mobilenumber,
      formData.address,
      formData.username,
      formData.password
    ];
  
    mysqlConnection.conn.query(insertQuery, values, (err, result) => {
        
      if (err) {
        console.error('Error inserting data:', err);
        res.status(500).json({ error: 'Internal Server Error' });
      } else {
        console.log('Data inserted successfully');
        res.status(200).json({ message: 'Data inserted successfully' });
      }
    });
  });
  app.post('/login', (req, res) => {
    const { username, password } = req.body;
    const selectQuery = 'SELECT * FROM customer WHERE username = ? AND password = ?';
    mysqlConnection.conn.query(selectQuery, [username, password], (err, results) => {
        if (err) {
            console.error('Error executing MySQL query:', err);
            res.status(500).json({ error: 'Internal Server Error' });
            return;
        }
        if (results.length === 0) {
            res.json({ error: 'Invalid credentials' })
        } else {
            const user = results[0];
            res.send({ message: 'Login successful', user })
        }
    });
});
app.get("/getData",(req,res)=>{
  querystr="select * from products"
  mysqlConnection.conn.query(querystr,(err,data)=>{
    if(err){
       console.log(err)
       res.send(err)
    }
    else if(data.length===0)
         {
            res.send("No Data Found")
         }
   else {
          res.send(data)
       }
    })

  })
  app.get('/product',(req,res)=>{
    const pid=req.query.id
     console.log(pid)
    const query="select * from products where productid=?"
    mysqlConnection.conn.query(query,[pid],(err,data)=>{
      if(err){
         console.log(err)
         res.send(err)
      }
      else if(data.length===0)
           {
              res.send("No Data Found")
           }
     else {
            res.send(data)
         }
      })

  })
  app.listen(8000,()=>{
    console.log(`server is running in port no 8000`)
})