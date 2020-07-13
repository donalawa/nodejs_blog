const db = require('../db/db');
const crypto = require('crypto');

const getHashedPassword = (password) => {
    const sha256 = crypto.createHash('sha256');
    const hash = sha256.update(password).digest('base64');
    return hash;
}



module.exports = class Posts {
    constructor(id,username,email,password,author,posturl,publishedDate){
        this.id = Math.random();
        this.username = username;
        this.email = email;
        this.password = getHashedPassword(password);
    }

    save() {
        // console.log(this)
        return db.execute(
            'INSERT INTO users (id,name,email,password) VALUES (?,?,?,?)',
            [this.id,this.username,this.email,this.password]
        );
    }

    static deleteById(id) {
        return db.execute('DELETE FROM users WHERE id = ?',[id])
    }

    static fetchAll(){
        // return db.execute('SELECT * FROM products');
        return db.execute('SELECT * FROM users');
    }

    static findByEmail(email){
        return db.execute('SELECT * FROM users WHERE users.email = ?', [email])
    }
}