const fs = require('fs');
const path = require('path');
var lib = {
    booksDirectory: path.join(__dirname, '/../.data/books.json'),
    usersDirectory: path.join(__dirname,'../.data/users.json')
};


lib.returnBook = function (data, callback) {
     const library_card_id = data.library_card_id;
    const user = data.user;
    const book = data.book;


    const usersfilePath = lib.usersDirectory;
    const booksFilePath = lib.booksDirectory;


      fs.readFile(usersfilePath, 'utf-8', (err, data) => {
        if (!err && data) {
            let parsed = JSON.parse(data)
          
            if(parsed[user] && parsed[user].library_card_id == library_card_id){

                // find book
                fs.readFile(booksFilePath, 'utf-8', (err, books) => {
        if (!err && books) {
            let parsedBooks = JSON.parse(books);
            if(parsedBooks[book]){

                parsedBooks[book].copies = parsedBooks[book].copies + 1;

                // check if user has borrwed before

                const bookBorrowedByUser = parsedBooks[book].borrowedCopies.filter(user => {
                    return user.card_id == library_card_id
                });

                if(bookBorrowedByUser.length <= 0){
                   return callback("User did not borrow this book",null);
                } else {
                    
                    parsedBooks[book].borrowedCopies = parsedBooks[book].borrowedCopies.filter(user => {
                        return user.card_id !== library_card_id
                    })
                    
            fs.writeFile(booksFilePath, JSON.stringify(parsedBooks), (err) => {
                if (!err) {
                    return callback(false);
                    
                } else {
                    return callback("Error updating");
                }
            });
                }

            } else {
               return  callback("Book not available",null)
            }
        } else {
           return callback(err,null)
        }
                })


            } else {
                return callback("User not found", null);
            }

            // write to file
          
        }
        else {
           return callback(err, data);
        }
    });
}


lib.lendBook = function (data, callback) {
    const library_card_id = data.library_card_id;
    const user = data.user;
    const book = data.book;


    const usersfilePath = lib.usersDirectory;
    const booksFilePath = lib.booksDirectory;


      fs.readFile(usersfilePath, 'utf-8', (err, data) => {
        if (!err && data) {
            let parsed = JSON.parse(data)
          
            if(parsed[user] && parsed[user].library_card_id == library_card_id){

                // find book
                fs.readFile(booksFilePath, 'utf-8', (err, books) => {
        if (!err && books) {
            let parsedBooks = JSON.parse(books);
            if(parsedBooks[book]){


                if(parsedBooks[book].copies == 0){
                    return callback("Book not available for lending",null)
                }
                parsedBooks[book].copies = parsedBooks[book].copies - 1;

                // check if user has borrwed before

                const bookBorrowedByUser = parsedBooks[book].borrowedCopies.filter(user => {
                    return user.card_id == library_card_id
                });

                if(bookBorrowedByUser.length > 0){
                   return callback("User has a copy of this book",null);
                } else {
                    parsedBooks[book].copies = parsedBooks[book].copies - 1;
                    parsedBooks[book].borrowedCopies.push({card_id: library_card_id,copies:1,date: new Date().getTimezoneOffset()})
  
            fs.writeFile(booksFilePath, JSON.stringify(parsedBooks), (err) => {
                if (!err) {
                    return callback(false);
                    
                } else {
                    return callback("Error updating");
                }
            });
                }

            } else {
               return  callback("Book not available",null)
            }
        } else {
           return callback(err,null)
        }
                })


            } else {
                return callback("User not found", null);
            }

            // write to file
          
        }
        else {
           return callback(err, data);
        }
    });

}


lib.createUser = (data__, callback) => {
     //open file for writing
    const filePath = lib.usersDirectory;
  fs.readFile(filePath, 'utf-8', (err, data) => {
        if (!err && data) {
            let parsed = JSON.parse(data)
            if(!data__){
                return callback('user data is required')
            }
            
            delete parsed[data__._id];
            parsed[data__._id] = data__;
            parsed = JSON.stringify(parsed);
            // write to file
            
            fs.writeFile(filePath, parsed, (err) => {
                if (!err) {
                    callback(false);
                    
                } else {
                    callback("Error updating");
                }
            });
        }
        else {
            callback(err, data);
        }
    });
}
//creating
lib.create = (data__, callback) => {
    //open file for writing
    const filePath = lib.booksDirectory;
  fs.readFile(filePath, 'utf-8', (err, data) => {
        if (!err && data) {
            let parsed = JSON.parse(data)
            delete parsed[data.fileName];
            if(!data__.fileName){
               return callback(true);
            }
            parsed[data__.fileName] = data__;
            
            parsed = JSON.stringify(parsed);

            // write to file
            
            fs.writeFile(filePath, parsed, (err) => {
                if (!err) {
                    callback(false);
                    
                } else {
                    callback("Error writing to new file");
                }
            });
        }
        else {
            callback(err, data);
        }
    });
  
};

//reding

lib.readSingle = (name, callback) => {
    const filePath = lib.booksDirectory;
    fs.readFile(filePath, 'utf-8', (err, data) => {
        if (!err && data) {
            const parsed = JSON.parse(data)
            if(parsed[name] !== undefined){
                return callback(false, parsed[name]);
            } else {
                return callback(true,{message:'book not found'})
            }
        }
        else {
            callback(err, data);
        }
    });
};


lib.readAll = (callback) => {
    const filePath = lib.booksDirectory;
    fs.readFile(filePath, 'utf-8', (err, data) => {
        if (!err && data) {
           callback(false,JSON.parse(data))
        }
        else {
            callback(err, data);
        }
    });
};

//updating
lib.update = (id, data__, callback) => {
    //open the file
       const filePath = lib.booksDirectory;
  fs.readFile(filePath, 'utf-8', (err, data) => {
        if (!err && data) {
            let parsed = JSON.parse(data)
            let file = parsed[id];

            if(file){
                file = {...file,...data__}
                parsed[id] = file;
            parsed = JSON.stringify(parsed);
            console.log(file)
            // write to file
            
            fs.writeFile(filePath, parsed, (err) => {
                if (!err) {
                    callback(false, parsed[id]);
                    
                } else {
                    callback("Error writing to new file");
                }
            });
            } else {
                callback("Book not found")
            }
           
        }
        else {
            callback(err, data);
        }
    });
};

//Delete File
lib.delete = (filename, callback) => {
     const filePath = lib.booksDirectory;
  fs.readFile(filePath, 'utf-8', (err, data) => {
        if (!err && data) {
            let parsed = JSON.parse(data)
            delete parsed[filename];
            parsed = JSON.stringify(parsed)
            // write to file
            
            fs.writeFile(filePath, parsed, (err) => {
                if (!err) {
                    callback(false);
                    
                } else {
                    callback("Error writing to new file");
                }
            });
        }
        else {
            callback(err, data);
        }
    });
};

module.exports = lib;