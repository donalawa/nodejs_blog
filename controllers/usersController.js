const User = require('../models/user');
const crypto = require('crypto')

const getHashedPassword = (password) => {
    const sha256 = crypto.createHash('sha256');
    const hash = sha256.update(password).digest('base64');
    return hash;
}

module.exports.getLogin = (req,res) => {
    // const isLoggedIn = req.get('Cookie').split(';')[1].trim().split('=')[1]
    // console.log(req.get('Cookie').split('=')[1])
    res.render('login',{
        loginPage: true
    });
}


//When login form is submited
module.exports.postLogin = (req,res) => {
    //Set a cookie in the users browser 

    User.findByEmail(req.body.email).then(([user]) => {
        var currentuser = user[0];
        //Received from request
    
        var password = getHashedPassword(req.body.pass);
        
        if(currentuser.password == password) {
            res.setHeader('Set-Cookie','isLoggedIn=true');
            req.session.userEmail = req.body.email;
            res.render('newpost');
        }else {
            res.redirect('/login')
        }
    }).catch(err => {
        console.log(err)
    })
    //Using a session 
    // req.cookie.isLoggedIn = true;
    // req.cookie.userEmail = req.body.email;

    // res.redirect('/')
}

module.exports.getRegister = (req,res) => {
  
    res.render('register',{
        //we set login page to true so as to insert the css files needed
        loginPage: true
    })
}

module.exports.postRegister = (req,res) => {
    var username = req.body.username;
    var email = req.body.email;
    var password = req.body.password;
    var confpassword = req.body.passwordConfirm;
    if(password == confpassword) {
        //Insert New User
        var user = new User(null,username,email,password);
        user.save().then(() => {
            res.redirect('/login')
        }).catch(err => {
            console.log(err)
        });
    }else {
        res.redirect('/register')
    }
    
}