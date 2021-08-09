const jwt = require('jsonwebtoken')
const dotenv = require('dotenv');
dotenv.config({path:"../utils/.env"});
//const secret = require("../config")


function user_auth (req, res, next){
    const token = req.header('auth-token')
    if (!token) return res.send("Access Denied")
    
    try{
        const vertified = jwt.verify(token, process.env.SECRET_JWT)
        req.user = vertified
        next()
    }catch (err){
        res.send("Invalid Token")
    }
}

module.exports.user_auth = user_auth;