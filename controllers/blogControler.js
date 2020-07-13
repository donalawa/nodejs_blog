// const postModel  = require('../models/posts');
const Post = require('../models/posts');
const multer = require('multer')
const path = require('path');
const { all, post } = require('../routes/apiRoutes');
const { error } = require('console');

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
    Post.fetchAll().then(([posts]) => {
        res.render('posts',{
            home: true,
            posts: posts
        });
    }).catch(err => console.log(err))
}


module.exports.aboutPage = (req,res) => {
    Post.fetchAll().then(([posts]) => {
        res.render('about',{
            home: true,
            posts: posts
        });
    }).catch(err => console.log(err))

}

module.exports.contactPage = (req,res) => {
    Post.fetchAll().then(([posts]) => {
        res.render('contact',{
            home: true,
            posts: posts
        });
    }).catch(err => console.log(err))
}

module.exports.getNewPost = (req,res) => {
    try {
        const isLoggedIn = req.get('Cookie').split('=')[1];
        Post.fetchAll().then(([posts]) => {
            if(isLoggedIn){
                res.render('newpost',{
                    newpost: true,
                    posts: posts
                });
            }else {
                res.redirect('/login')
            }
           
        }).catch(err => console.log(err))
    } catch (error) {
        res.redirect('/login')
    }
    
  
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
                    console.log('before save')
                    post.save().then(() => {
                        res.redirect('/')
                    }).catch(err => {
                        // res.redirect('/login')
                        // console.log(err)
                    });
                    
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
    var allPost = [];

    Post.fetchAll().then(([posts]) => {
       allPost = posts;
       
    }).catch(err => console.log(err))

    Post.findById(+id).then(([post]) => {
        res.render('singlepost',{
            post: post[0],
            posts: allPost
        })
    }).catch(err => console.log(err))
    // res.render('singlepost')
   
}


exports.getUsersPosts = (req,res,next) => {
 

 try {
    var allPost = [];

    Post.fetchAll().then(([posts]) => {
       allPost = posts;
       
    }).catch(err => console.log(err))
    // console.log(req.session.userEmail)
    Post.findByEmail(req.session.userEmail).then(([posts]) => {
    
        res.render('userposts',{
            posts: allPost,
            userPosts: posts
        })
     }).catch(err => {
         console.log(error)
         res.redirect('/login')
     })
 } catch (error) {
    res.redirect('/login')
 }
    
}

exports.getEditPost = (req,res,next) => {

    try {
        var allPost = [];
        var id = req.params.id;
  
        Post.fetchAll().then(([posts]) => {
           allPost = posts;
           
        }).catch(err => console.log(err))
        // console.log(req.session.userEmail)
        Post.findById(id).then(([posts]) => {
            // console.log(posts[0])
            res.render('editpost',{
                posts: allPost,
                editPost: posts[0]
            })
         }).catch(err => {
             console.log(error)
             res.redirect('/login')
         })
     } catch (error) {
        res.redirect('/login')
     }
}

exports.postUpdatePost = (req,res,next) => {
    res.redirect('/')
}

module.exports.getDelete = (req,res,next) => {
    try {
        var allPost = [];
        var id = req.params.id;
  
        Post.fetchAll().then(([posts]) => {
           allPost = posts;
           
        }).catch(err => console.log(err))
        // console.log(req.session.userEmail)
        Post.deleteById(id).then(() => {
            // console.log(posts[0])
            res.redirect('/blog')
         }).catch(err => {
             console.log(error)
             res.redirect('/login')
         })
     } catch (error) {
        res.redirect('/login')
     }
}