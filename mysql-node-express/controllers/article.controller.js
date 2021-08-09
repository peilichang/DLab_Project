const UserModel = require('../models/user.model');
const ArticleModel = require('../models/article.model');
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
class ArticleController {
    getArticleById = async (req, res, next) => {
        const selected_article = await UserModel.findOne({ id: req.params.id });
        var string=JSON.stringify(selected_article)
        var article = JSON.parse(string)
        // res.send(selected_article)
        if (article['is_premium'] == 1){
            const user = await UserModel.findUser({ account_id: req.user['account_id'] });
            if (user['role'] == "Premium"){
                res.send(article['content'])
            }
            else{
                var less = "「" + article['content'].substr(0,10) + "···」 " 
                less += "Get Premium to read more!"
                res.send(less)
                // res.send("you need to be premium to read this")
            }
        }
        else{
            res.send(article['content'])
        }
    }
    createArticle = async (req, res, next) => {
        const params = req.body
        params["author_id"] = req.user['account_id']
        const article_id = await ArticleModel.createArticle(params);
        
        console.log("文章id",article_id)
        // 新增至like_count裡
        const like_count_params = {"user_id" :req.user['account_id'], "article_id":article_id}
        const result = await ArticleModel.createLikeCount(like_count_params);
        res.send(params)
    }
    getClap = async (req, res, next) => {
        const selected_article = await ArticleModel.checkIfExist("like_count",{ article_id: req.params.id });
        if (selected_article){
            var string=JSON.stringify(selected_article)
            var article = JSON.parse(string)
            const result = await ArticleModel.updateLikeCounts("like_count", {"count":article['count']+1},req.params.id);
            res.send(`「article_id:${selected_article["article_id"]}」claps👏 +1 => total claps is ${article['count']+1}`)
        }
        else{
            throw new HttpException(404, 'Article not found');
        }
    }

    saveArticle = async (req, res, next) => {
        const selected_article = await UserModel.findOne({ id: req.params.id });
        var string=JSON.stringify(selected_article)
        var article = JSON.parse(string)
        if (!selected_article){
            throw new HttpException(404, 'Article not found');
        }
        else{
            const article_id =  article['id']
            const user_id = req.user['account_id']
            const saved_param = {"article_id" : article_id, "user_id" : user_id}
            const existence = await ArticleModel.checkIfExist("article_saved",saved_param)
            if (existence){
                const result = await ArticleModel.removeSave(saved_param);
                console.log(`User(${article_id}) "unsaved" an article "${article_id}"`)
                res.send(`You just "unsaved" the article "${article['title']}"`)
            }
            else{
                const result = await ArticleModel.newSave([article_id,user_id]);
                res.send(`You just saved the article "${article['title']}"`)
                
            }
        }
    }

    updateArticle = async (req, res, next) => {
        // 找到此user的id
        const account_id = req.user['account_id']

        // 找到author_id
        const selected_article = await UserModel.findOne({ id: req.params.id });
        var string=JSON.stringify(selected_article)
        var article = JSON.parse(string)
        const author_id = article['author_id']

        // 比較
        if (account_id == author_id){
            // const id = req.params.id
            const {title, content} = req.body
            const result = await ArticleModel.updateById(req.body, req.params.id);
            res.send("Updated article successfully")
            // res.send(result)
        }
        else {
            res.send("You're not the author of this article")
        }
    };

    deleteArticle = async (req, res, next) => {
        // 找到此user的id
        const account_id = req.user['account_id']

        // 找到author_id
        const selected_article = await UserModel.findOne({ id: req.params.id });
        var string=JSON.stringify(selected_article)
        var article = JSON.parse(string)
        const author_id = article['author_id']

        // 比較
        if (account_id == author_id){
            // const id = req.params.id
            const {title, content} = req.body
            const result = await ArticleModel.deleteById(req.params.id);
            res.send("Delete article successfully")
            // res.send(result)
        }
        else {
            res.send("Action denied'")
        }
    };

}



/******************************************************************************
 *                               Export
 ******************************************************************************/
module.exports = new ArticleController;