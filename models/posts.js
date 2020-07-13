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
        // console.log(this.author)
        // console.log('Before Executing')
        if(this.author){
            return db.execute(
                'INSERT INTO posts (id,title,content,category,author,post_url,published_date,post_image_url) VALUES (?,?,?,?,?,?,?,?)',
                [this.id,this.title,this.content,this.category,this.author,this.posturl,this.publishedDate,this.postImageUrl]
            );
        }else {
            return console.error();
        }
      
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

    static findByEmail(email){
        return email ? db.execute('SELECT * FROM posts WHERE posts.author = ?', [email]) : console.error();
    }
}