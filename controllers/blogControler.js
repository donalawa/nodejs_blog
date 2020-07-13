// const postModel  = require('../models/posts');
const Post = require('../models/posts');
const multer = require('multer')
const path = require('path');

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'public/uploads/');
    },
    filename: function(req,file,cb) {
        cb(null,file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
})

//Init
const upload = multer({
    storage: storage
}).single('postImage')


module.exports.home = (req,res,next) => {
    Post.fetchAll().then(([posts]) => {
        res.render('home',{
            home: true,
            posts: posts
        });
    }).catch(err => console.log(err))
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
    // console.log('post file')
    // console.log(req.get('Cookie').split(';')[1]);
    upload(req,res,(err) => {
        if(err) {
            console.log(err)
            res.redirect('/')
        }else {
            try {
                if(isLoggedIn){
                    var post = new Post(
                        null,
                        req.body.title,
                        req.body.content,
                        parseInt(req.body.category),
                        req.session.userEmail,
                        req.body.title.split(' ').join('-'),
                        new Date().toLocaleDateString(),
                        req.file.filename
                    );
                    post.save().then(() => {
                        res.redirect('/')
                    }).catch(err => console.log(err));
                    
                }
            } catch (error) {
                console.log(error)
                res.redirect('/login')
            }
        }
    })
 
}



module.exports.getSinglePost = (req,res,next) => {
    var id = req.params.id;
    // Post.findById(+id).then((post) => {
    //     res.render('singlepost',{
    //         post: post
    //     })
    // }).catch(err => console.log(err))
    res.render('singlepost')
   
}