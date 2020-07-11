// const db = require('../util/database')

module.exports = class Posts {
    constructor(id,title,content,category,tags,imageURL,author,posturl){
        this.id = id;
        this.title = title;
        this.content = content;
        this.category = category;
        this.tags = tags;
        this.imageURL = imageURL;
        this.author = author;
        this.posturl = posturl;
    }

    save() {
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