const books = require('../controllers/books');
const users = require('../controllers/users');

const mapPathNameToHandler = {
  // register routes
  PUT: {
    "books/copies": books.updateCopies
  },
  POST: {
    "books": books.addBook,
    "user": users.create,
    "user/books/request": users.requestBook,
    "user/books/return": users.returnBook
  },
  GET: {
    "books": books.getAllBooks,
    "book": books.getSingleBook
  },
  DELETE: {
    "books": books.removeBook
  }
} 

const responseHandler = function(data,callback){
  if(mapPathNameToHandler[data.method.toUpperCase()]){
    if(mapPathNameToHandler[data.method.toUpperCase()][data.trimedPath]){
     return mapPathNameToHandler[data.method.toUpperCase()][data.trimedPath](data, callback)
    } else {
      return callback(404,{ message: 'Path not found'})
    }
  } else {
    return callback(403,{ message:'Invalid HTTP Verb'})
  }
}

module.exports = responseHandler;