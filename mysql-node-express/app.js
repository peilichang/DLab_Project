const express = require("express");
const dotenv = require('dotenv');
const cors = require("cors");
const HttpException = require('./utils/HttpException.utils');
const errorMiddleware = require('./middleware/error.middleware');
const userRouter = require('./routes/user.route');
const articleRouter = require('./routes/article.route');

// Init express
const app = express();
// Init environment
dotenv.config();
// parse requests of content-type: application/json
// parses incoming requests with JSON payloads
app.use(express.json());
// enabling cors for all requests by using cors middleware
app.use(cors());
// Enable pre-flight
app.options("*", cors());

const port = Number(process.env.PORT || 3331);

app.use(`/api/v1/users`, userRouter);
app.use(`/api/v1/articles`, articleRouter);

// 404 error
app.all('*', (req, res, next) => {
    const err = new HttpException(404, 'Endpoint Not Found');
    next(err);
});

// Error middleware
app.use(errorMiddleware);

// starting the server
app.listen(port, () =>
    console.log(`🚀 Server running http://${process.env.HOST}:${port}!`));


module.exports = app;

// const express = require('express')
// const app = express()
// const mysql = require('mysql')
// const config = require("./config")

// const hostname = '127.0.0.1'
// const port = 3000
// const articles = require('./routes/articles')
// const users = require('./routes/users')
// app.use('/articles',articles)
// app.use('/users',users)

// app.use(express.urlencoded({ extended: false }))
// app.use(express.json())

// // connect with MySQL
// var conn = mysql.createConnection(config.dbInfo);

// conn.connect((err) => {
//     if (err) throw err
//     console.log('MySQL connected..')
// });

// // Create database
// app.get('/createdb', (req, res) => {
//     let sql = 'CREATE DATABASE nodetest0709'
//     conn.query(sql, (err,result) => {
//         if(err) throw err;
//         console.log(result)
//         res.send('Database created..')
//     })
// })

// // Create table
// app.get('/createtable', (req, res) => {
//     let sql = 'CREATE TABLE article(id int AUTO_INCREMENT, title VARCHAR(255), content VARCHAR(255), PRIMARY KEY(id))'
//     conn.query(sql, (err, result) => {
//         if(err) throw err
//         console.log(result)
//         res.send('account table created..')
//     })
// })

// // Create post
// app.get('/createpost1', (req, res) => {
//     let post = {title:'Post Three', content:'This is third post!'}
//     let sql = 'INSERT INTO article SET ?'
//     conn.query(sql, post, (err, result) => {
//         if(err) throw err
//         console.log(result)
//         res.send('Post 3 added..')
//     })
// })

// // Select posts
// app.get('/getposts', (req, res) => {
//     let sql = 'SELECT * FROM article'
//     conn.query(sql, (err, results) => {
//         if(err) throw err
//         console.log(results)
//         res.send(results)
//     })
// })

// // Select single post
// app.get('/getpost/:id', (req, res) => {
//     let sql = `SELECT * FROM article WHERE id =${req.params.id}`
//     conn.query(sql, (err, result) => {
//         if(err) throw err
//         console.log(result)
//         console.log(req.params.id)
//         // orres.send(`Post ${req.params.id} fetched..`)
//         res.send(result)
//     })
// })

// // Update post
// app.get('/updatepost/:id', (req, res) => {
//     let newTitle = 'Updated Title'
//     let sql = `UPDATE article SET title = '${newTitle}' WHERE id =${req.params.id}`
//     conn.query(sql, (err, result) => {
//         if(err) throw err
//         console.log(result)
//         res.send('Post updated..')
//     })
// })

// // Delete post
// app.delete('/deletepost/:id', (req, res) => {
//     let sql = `DELETE FROM article WHERE id = ${req.params.id}`
//     conn.query(sql, (err, result) => {
//         if(err) throw err
//         console.log(result)
//         res.send('Post deleted..')
//     })
// })

// app.get('/', (req, res) => {
//     res.send('Hello World!!!')
// })

// app.listen(port ,() => {
//     console.log(`Server is running at http://${hostname}:${port}!`)
// })