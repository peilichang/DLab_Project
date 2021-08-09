const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');
const articleController = require('../controllers/article.controller');
//const auth = require('../middleware/auth.middleware');
const vertify = require("../middleware/vertifyToken")
const Role = require('../utils/userRoles.utils');
const awaitHandlerFactory = require('../middleware/awaitHandlerFactory.middleware');

//const { createUserSchema, updateUserSchema, validateLogin } = require('../middleware/validators/userValidator.middleware');
//const { route } = require('../../../0802/mysql-node-express/src/routes/ user');


// Create an article
router.post('/create_article', vertify.user_auth, awaitHandlerFactory(articleController.createArticle));
// 閱讀文章（判斷premium）
router.get('/get_article/:id', vertify.user_auth, awaitHandlerFactory(articleController.getArticleById));
// Update an article
router.put('/update_article/:id', vertify.user_auth, awaitHandlerFactory(articleController.updateArticle));
// Delete an article
router.delete('/delete_article/:id', vertify.user_auth, awaitHandlerFactory(articleController.deleteArticle))

router.get('/likes_btn/:id', vertify.user_auth, awaitHandlerFactory(articleController.getClap))
router.get('/save_btn/:id', vertify.user_auth, awaitHandlerFactory(articleController.saveArticle))
// route.post('/follow', vertify.user_auth, awaitHandlerFactory(userController.followUser))
// route.post('/unfollow', vertify.user_auth, awaitHandlerFactory(userController.unfollowUser))

// route.post()
module.exports = router;