const db = require('../db/db');

module.exports = class Posts {
    constructor(id,title,content,category,author,posturl,publishedDate){
        this.id = Math.random();
        this.title = title;
        this.content = content;
        this.category = category;
        this.author = author;
        this.posturl = posturl;
        this.publishedDate = publishedDate;
    }

    save() {
        console.log(this)
        // return db.execute(
        //     'INSERT INTO products (title,price,description,imageUrl) VALUES (?,?,?,?)',
        //     [this.title,this.price,this.description,this.imageUrl]
        // );
    }

    static deleteById(id) {

    }

    static fetchAll(){
        // return db.execute('SELECT * FROM products');
        // return db.execute('SELECT * FROM products');
    }

    static findById(id){
        // return db.execute('SELECT * FROM products WHERE products.id = ?', [id])
    }
}