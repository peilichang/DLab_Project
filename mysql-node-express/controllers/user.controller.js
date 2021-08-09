const UserModel = require('../models/user.model');
const HttpException = require('../utils/HttpException.utils');
const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();
// var conn = mysql.createConnection(config.dbInfo)
const { multipleColumnSet } = require('../utils/common.utils');

/******************************************************************************
 *                              User Controller
 ******************************************************************************/
class UserController {
    getAllUsers = async (req, res, next) => {
        let userList = await UserModel.find();
        if (!userList.length) {
            throw new HttpException(404, 'Users not found');
        }

        userList = userList.map(user => {
            const { password, ...userWithoutPassword } = user;
            return userWithoutPassword;
        });

        res.send(userList);
    };

    userLogin = async (req, res, next) => {
        const params = req.body
        const login_email = req.body.email
        const login_password = req.body.password
        console.log(req.body.email,req.body.password)
        const selectedUser = await UserModel.findUser({"email":req.body.email})
        if (selectedUser){
            const user_password = selectedUser['password']
            const account_id = selectedUser['account_id']

            const validPass =bcrypt.compareSync(login_password, user_password)
            if (!validPass) return res.send('Invalid Password!')
            //create token
            const token = jwt.sign({login_email,account_id}, process.env.SECRET_JWT, { expiresIn: '1 day' })
            res.header('auth-token', token) //.send(token)
            res.send('Logged in successfully!')
        }
        else{
            res.send("Please register first!")
        }
    }

    followUser = async (req, res, next) => {
        const follow_params = {"follower_id":req.body['user_id'],"following_id":req.user['account_id']}
        const existence = await UserModel.checkIfExist("follower",follow_params)
        if (existence){
            res.send("You have already followed this user!")
        }
        else{
            const result = await UserModel.newFollow(follow_params);
            res.send(`Congrats🎉 You just followed this user ("account_id = ${req.body['user_id']}")`)
        }
        //console.log(existence)
    }
    unfollowUser = async (req, res, next) => {
        const follow_params = {"follower_id":req.body['user_id'],"following_id":req.user['account_id']}
        const existence = await UserModel.checkIfExist("follower",follow_params)
        if (!existence){
            res.send("You didn't follow this user!")
        }
        else{
            const result = await UserModel.removeFollow(follow_params);
            res.send(`You just unfollowed this user ("account_id = ${req.body['user_id']}")`)
        }
        
    }

    getUserById = async (req, res, next) => {
        const user = await UserModel.findOne({ id: req.params.id });
        if (!user) {
            throw new HttpException(404, 'User not found');
        }

        const { password, ...userWithoutPassword } = user;

        res.send(userWithoutPassword);
    };

    getUserByuserName = async (req, res, next) => {
        const user = await UserModel.findOne({ username: req.params.username });
        if (!user) {
            throw new HttpException(404, 'User not found');
        }

        const { password, ...userWithoutPassword } = user;

        res.send(userWithoutPassword);
    };

}



/******************************************************************************
 *                               Export
 ******************************************************************************/
module.exports = new UserController;