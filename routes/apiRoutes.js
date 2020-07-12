const express = require('express');
const blogController = require('../controllers/blogControler');
const userController = require('../controllers/usersController')
const router = express.Router();

router.get('/',blogController.home)

router.route('/new')
        .get(blogController.getNewPost)
        .post(blogController.postNewPost)

router.get('/blog',blogController.getpostPage)

router.get('/contact',blogController.contactPage)


router.get('/about',blogController.aboutPage)

router.get('/login',userController.getLogin);

router.post('/login',userController.postLogin);

module.exports = router;


