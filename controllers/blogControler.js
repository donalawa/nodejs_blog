// const postModel  = require('../models/posts');
const Post = require('../models/posts');

module.exports.home = (req,res,next) => {

    res.render('home',{
        home: true
    });
}

module.exports.getpostPage = (req,res) => {
    res.render('posts',{
        posts: true
    })
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
    res.render('posts',{
        posts: true
    })
}

module.exports.aboutPage = (req,res) => {
    res.render('about',{
        about: true
    })
}

module.exports.contactPage = (req,res) => {
    res.render('contact',{
        contact: true
    })
}

module.exports.getNewPost = (req,res) => {
    res.render('newpost',{
        newpost: true
    })
}

module.exports.postNewPost = (req,res) => {
    // const isLoggedIn = req.get('Cookie').split(';')[1].trim().split('=')[1]
    const isLoggedIn = req.get('Cookie').split('=')[1];
    console.log(req.body)
    // console.log('post file')
    // console.log(req.get('Cookie').split(';')[1]);
    try {
        if(isLoggedIn){
            var post = new Post(
                null,
                req.body.title,
                req.body.content,
                parseInt(req.body.category),
                req.session.userEmail,
                req.body.title.split(' ').join('-'),
                new Date().toLocaleDateString()
            );
            post.save();
            res.redirect('/')
        }
    } catch (error) {
        console.log(error)
        res.redirect('/login')
    }
        // if(req.cookie.isLoggedIn){
        //     var post = new Post(
        //         req.body.title,
        //         req.body.content,
        //         req.body.category,
        //         req.cookie.userEmail,
        //         req.body.title.split(' ').join('-'),
        //         new Date().toLocaleDateString()
        //     );
        //     post.save();
        //     res.redirect('/')
        // }else {
        //     res.redirect('/login')
        // }
}

