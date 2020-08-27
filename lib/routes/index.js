const books = require('../controllers/books');

const mapPathNameToHandler = {
  // register routes
  PUT: {
    "books": books.getAllBooks
  },
  POST: {
    "books": books.addBook
  },
  GET: {
    "books": books.getBook
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
    return callback(403,{ message:'Invalid HTTP method'})
  }
}

module.exports = responseHandler;