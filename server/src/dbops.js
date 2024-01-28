const mysql =require('mysql')

//connection with mysql
var connection = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'12345',
    database:'temp'
})

const query = `
  CREATE TABLE IF NOT EXISTS customer (
    id INT AUTO_INCREMENT PRIMARY KEY,
    fullname VARCHAR(30),
    email VARCHAR(30),
    mobilenumber VARCHAR(30),
    address varchar(30),
    username varchar(30),
    password varchar(30)
  )
`;
const productsTableQuery = `
  CREATE TABLE IF NOT EXISTS products (
    productid varchar(10),
    title VARCHAR(100),
    price DECIMAL(10, 2),
    description TEXT
  )
`;

connection.query(query, (err, result) => {
  if (err) {
    console.error('Error creating table:', err);
    throw err;
  }
  console.log('Table is created');
});
connection.query(productsTableQuery, (err, result) => {
    if (err) {
      console.error('Error creating products table:', err);
      throw err;
    }
    console.log('Products table is created');
  });


  module.exports.conn = connection;