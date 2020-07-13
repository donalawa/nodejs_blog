const db = require('../db/db');

module.exports = class Posts {
    constructor(id,title,content,category,author,posturl,publishedDate,postImageUrl){
        this.id = Math.random();
        this.title = title;
        this.content = content;
        this.category = category;
        this.author = author;
        this.posturl = posturl;
        this.publishedDate = publishedDate;
        this.postImageUrl = postImageUrl;
    }

    save() {
        // console.log(this)
        return db.execute(
            'INSERT INTO posts (title,content,category,author,post_url,published_date,post_image_url) VALUES (?,?,?,?,?,?,?)',
            [this.title,this.content,this.category,this.author,this.posturl,this.publishedDate,this.postImageUrl]
        );
    }

    static deleteById(id) {
        return db.execute('DELETE FROM posts WHERE id = ?',[id])
    }

    static fetchAll(){
        // return db.execute('SELECT * FROM products');
        return db.execute('SELECT * FROM posts');
    }

    static findById(id){
        return db.execute('SELECT * FROM posts WHERE posts.id = ?', [id])
    }
}