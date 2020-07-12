
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
    res.setHeader('Set-Cookie','isLoggedIn=true');
    req.session.userEmail = req.body.email;
    //Using a session 
    // req.cookie.isLoggedIn = true;
    // req.cookie.userEmail = req.body.email;

    res.redirect('/')
}

