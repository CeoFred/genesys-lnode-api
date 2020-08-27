const fs = require('fs');
const path = require('path');
const helper = require('./helper')
var lib = {
    booksDirectory: path.join(__dirname, '/../.data/books.json')
};

//creating
lib.create = (data__, callback) => {
    //open file for writing
    const filePath = lib.booksDirectory;
  fs.readFile(filePath, 'utf-8', (err, data) => {
        if (!err && data) {
            let parsed = JSON.parse(data)
            delete parsed[data.fileName];
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
            console.log()
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