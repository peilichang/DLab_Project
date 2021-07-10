"use strict"

const express = require("express")
const moment = require('moment')
const mysql = require('mysql')
let router = express.Router()
const app = express()
// var bodyParser = require('body-parser')
// parse application/x-www-form-urlencoded
router.use(express.urlencoded({ extended: false }))
// parse application/json
router.use(express.json())

var conn = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    database : 'nodetest0709'
});

const querystring = require('querystring')
router.use(function(req, res, next){
    console.log(req.url, "@", Date.now());
    const url = req.url
    req.query = querystring.parse(url.split('?')[1])
    console.log(req.query)
    
    next();
});

// Get all posts
router
    .route("/get_articles")
    .get((req, res) => {
        let sql = 'SELECT * FROM article'
        conn.query(sql, (err, results) => {
            if(err) throw err
            console.log(results)
            res.send(results)
        })
    })

// Get single post
router
    .route('/get_article')
    .get((req, res) => {
        let sql = `SELECT * FROM article WHERE id =${req.query['id']}`
        conn.query(sql, (err, result) => {
            if(err) throw err
            console.log(`This article where id = ${req.query['id']} has been selected!`)
            console.log(result)
            res.send(result)
        })
    })

// Create an article
router
    .route("/create_article")
    .post((req, res) => {
        let time = moment(new Date()).format('YYYY-MM-DD HH:mm:ss')
        const params = req.body
        let sql = 'INSERT INTO article SET ?'
        conn.query(sql, params, (err, result) => {
            if(err) throw err
            console.log(result)
            res.send(`Post with the title :${params.title} has been added..`)
        })
    })

//Update an article
router
    .route("/update_article")
    .put((req, res) => {
        const { id, title, content} = req.body
        let sql = `UPDATE article SET title = ?, content = ? WHERE id = ?`
        conn.query(sql, [title, content, id],(err, result) => {
            if(err) throw err
            console.log(result)
            res.send(req.body)
        })
    })

// Delete an article
router
    .route("/delete_article")
    .delete((req, res) => {
        let sql = `DELETE FROM article WHERE id = ${req.query['id']}`
        conn.query(sql, (err, result) => {
            if(err) throw err
            console.log(result)
            res.send(`The post which id is ${req.query['id']} has been deleted :(`)
        })
    })


module.exports = router