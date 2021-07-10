const express = require('express')
const mysql = require('mysql')
const app = express()
const hostname = '127.0.0.1'
const port = 3000
const articles = require('./routes/articles')
const users = require('./routes/users')
app.use('/articles',articles)
app.use('/users',users)


// connect with MySQL
var conn = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
//   password : '07170142',
  database : 'nodetest0709'
});

conn.connect((err) => {
    if (err){
        throw err
    }
    console.log('MySQL connected..')
});

// Create database
// app.get('/createdb', (req, res) => {
//     let sql = 'CREATE DATABASE Medium_DB'
//     conn.query(sql, (err,result) => {
//         if(err) throw err;
//         console.log(result)
//         res.send('Database created..')
//     })
// })

// Create table
app.get('/createtable', (req, res) => {
    let sql = 'CREATE TABLE article(id int AUTO_INCREMENT, title VARCHAR(255), content VARCHAR(255), PRIMARY KEY(id))'
    conn.query(sql, (err, result) => {
        if(err) throw err
        console.log(result)
        res.send('account table created..')
    })
})

app.get('/', (req, res) => {
    res.send('Hello World!!!')
})

app.listen(port ,() => {
    console.log(`Server is running at http://${hostname}:${port}!`)
})