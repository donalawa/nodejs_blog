const postModel  = require('../models/posts');

module.exports.home = (req,res,next) => {
    res.render('home');
}

module.exports.getpostPage = (req,res) => {
    res.render('posts')
}

module.exports.postPage = (req,res) => {
    // var tags = tagsToArray(req.body.tags); 
    // var post = new Post({
    //     Title: req.body.title,
    //     Content: req.body.content,
    //     category: req.body.category,
    //     tags : tags,
    //     ImageURL : req.body.image,
    //     Author : req.cookies.decoded._doc.username,
    //     posturl  : req.body.title.split(' ').join('-'),
    //     PublishDate: new Date().toLocaleDateString()
    // }
    res.render('posts')
}

module.exports.aboutPage = (req,res) => {
    res.render('about')
}

module.exports.contactPage = (req,res) => {
    res.render('contact')
}

module.exports.getNewPost = (req,res) => {
    res.render('newpost')
}

module.exports.postNewPost = (req,res) => {
    console.log(req.body)
    res.redirect('/')
}

