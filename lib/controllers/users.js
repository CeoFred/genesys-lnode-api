const fileUtil = require('../fileUtil');
const helper = require('../helper')

let users = {}

users.create = function (data, callback) {
  
    var firstName = typeof(data.payload.firstName) === 'string' && data.payload.firstName.trim().length > 0 ? data.payload.firstName : false;
  
    if(firstName){
        const _id = helper.generateRandomString(30);
        data.payload._id = _id;
        data.payload.library_card_id = helper.generateRandomString(20);

        fileUtil.createUser( data.payload, (err) => {
            if (!err) {
                callback(200, { message: "user created successfully", data: null });
            } else {
                callback(400, { message: "could add user" });
            }
        });
    } else {
        callback(403,{message: " incomplete data",data:{firstName}})
    }

}


users.returnBook = function (data, callback) {
  var libraryCard_id = typeof(data.payload.libraryCard_id) === 'string' && data.payload.libraryCard_id.trim().length > 0 ? data.payload.libraryCard_id : false;
    var book_id = typeof(data.payload.book_id) === 'string' && data.payload.book_id.trim().length > 0 ? data.payload.book_id : false;
    var user_id = typeof(data.payload.user_id) === 'string' && data.payload.user_id.trim().length > 0 ? data.payload.user_id : false;

    const data__ = {library_card_id: libraryCard_id,book: book_id,user: user_id}
if(libraryCard_id && book_id && user_id ){
       
        fileUtil.returnBook( data__, (err) => {
            if (!err) {
                callback(200, { message: "book returned", data: null });
            } else {
                callback(400, { message: err });
            }
        });
    } else {
        callback(403,{message: " incomplete data",data:{book_id,libraryCard_id,user_id}})
    }
}

users.requestBook = function (data, callback) {
   
    var libraryCard_id = typeof(data.payload.libraryCard_id) === 'string' && data.payload.libraryCard_id.trim().length > 0 ? data.payload.libraryCard_id : false;
    var book_id = typeof(data.payload.book_id) === 'string' && data.payload.book_id.trim().length > 0 ? data.payload.book_id : false;
    var user_id = typeof(data.payload.user_id) === 'string' && data.payload.user_id.trim().length > 0 ? data.payload.user_id : false;

    const data__ = {library_card_id: libraryCard_id,book: book_id,user: user_id}
if(libraryCard_id && book_id && user_id ){
       
        fileUtil.lendBook( data__, (err) => {
            if (!err) {
                callback(200, { message: "book rent successful", data: null });
            } else {
                callback(400, { message: err });
            }
        });
    } else {
        callback(403,{message: " incomplete data",data:{book_id,libraryCard_id,user_id}})
    }
}


module.exports = users;