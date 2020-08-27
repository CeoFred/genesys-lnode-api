const fileUtil = require('../fileUtil');
const helper = require('../helper')

let books = {}

books.getAllBooks = function(data, callback) {
  if (data.query.name) {
        fileUtil.update('books', data.query.name,data.payload,  (err) => {
            if (!err) {
                callback(200, {message : 'book updated successfully'})
            }else{
                callback(400, {err : err, data : null, message : 'could not update book'});
            }
        });
    } else {
        callback(404, { message: 'book name is required' });
    }
        
}

books.addBook = function (data, callback) {
  
    var name = typeof(data.payload.name) === 'string' && data.payload.name.trim().length > 0 ? data.payload.name : false;
    var price = typeof(data.payload.price) === 'string' && !isNaN(parseInt(data.payload.price)) ? data.payload.price : false;
    var author = typeof(data.payload.author) === 'string' && data.payload.author.trim().length > 0 ? data.payload.author : false;
    var publisher = typeof(data.payload.publisher) === 'string' && data.payload.publisher.trim().length > 0 ? data.payload.publisher : false;
    if(name && price && author && publisher){
        const fileName = helper.generateRandomString(30);
        fileUtil.create('books', fileName, data.payload, (err) => {
            if (!err) {
                callback(200, { message: "book added successfully", data: null });
            } else {
                callback(400, { message: "could add book" });
            }
        });
    } else {
        callback(403,{message: " incomplete data",data:{name,price,author,publisher}})
    }
}


books.getBook = function (data, callback) {
    if (data.query.name) {
        fileUtil.read('books', data.query.name, (err, data) => {
            if (!err && data) {
                callback(200, { message: 'book retrieved', data: data });
            } else {
                callback(404, { err: err, data: data, message: 'could not retrieve book' });
            }
        });
    } else {
        callback(404, { message: 'book not found', data: null });
    }
}

books.removeBook = function (data, callback) {
      if(data.query.name){
        fileUtil.delete('books', data.query.name, (err) => {
            if(!err){   
                callback(200, {message : 'book deleted successfully'});
            }else{
                callback(400, {err : err, message : 'could not delete book'});
            }
        })
    }else{
        callback(404, {message : 'book not found'});
    }
}

module.exports = books;