const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');
const articleController = require('../controllers/article.controller');
const vertify = require("../middleware/vertifyToken")
const dotenv = require('dotenv');
dotenv.config({path:"../utils/.env"});
const Role = require('../utils/userRoles.utils');
const awaitHandlerFactory = require('../middleware/awaitHandlerFactory.middleware');

router.post('/follow', vertify.user_auth, awaitHandlerFactory(userController.followUser))
router.post('/unfollow', vertify.user_auth, awaitHandlerFactory(userController.unfollowUser))

router.post('/login',  awaitHandlerFactory(userController.userLogin))

router
    .route("/loginn")
    .post((req, res)=>{
        const login_email = req.body.email
        const login_password = req.body.password
        let sql = `SELECT * FROM account WHERE email = "${login_email}"`
        // conn.query(sql, (err, selectedUser) => {
        //     if(err) throw err
        //     // console.log(`This user with the email : ${login_email} has logged!`)
        //     console.log(selectedUser)
            
        //     // check email
        //     if (selectedUser.length == 0) return res.send('Please register first!')

        //     // check password
        //     const user_password = selectedUser[0]['password']
        //     const account_id = selectedUser[0]['account_id']
        //     const validPass =bcrypt.compareSync(login_password, user_password)
        //     if (!validPass) return res.send('Invalid Password!')

        //     // create token
        //     const token = jwt.sign({login_email,account_id}, process.env.SECRET_JWT, { expiresIn: '1 day' })
        //     res.header('auth-token', token) //.send(token)
        //     res.send('Logged in successfully!')
        // })
    })

module.exports = router;