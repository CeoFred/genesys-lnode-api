const { lendBook,create,createUser,readSingle,readAll,update,delete: deleteBook} =  require('../lib/fileUtil');

test('A new book is added', done => {
  function callback(err) {
    try {
      expect(err).toBe(false);
      done();

    } catch (error) {
      done(error);
    }
  }
  const data = {fileName:'dummyFilename'}
  create(data, callback)
});

test('Fail to lend a book to a user', done => {
  function callback(err) {
    try {
      expect(err).toBe("User not found");
      done();

    } catch (error) {
      done(error);
    }
  }
  const data = {book:'dummyFilename',user:432}
  lendBook(data, callback)
});


test('Should lend a book to a user', done => {
  function callback(err) {
    try {
      expect(err).toBe("User has a copy of this book");
      done();

    } catch (error) {
      done(error);
    }
  }
  const data = {book:'o2ua9o2h1uyq582put2hllwaq0ekj1',user:"vlogtmk2nk4mlnhsb7xqlm80o2j8o8456543"}
  lendBook(data, callback)
});
test('Read a book', done => {
  function callback(err) {
    try {
      expect(err).toBe(false);
      done();

    } catch (error) {
      done(error);
    }
  }
  const data = {fileName:'dummyFilename'}
  readSingle(data.fileName, callback)
});


  test('Fail to Read a book', done => {
    function callback(err) {
      try {
        expect(err).toBe(true);
        done();

      } catch (error) {
        done(error);
      }
    }
    const data = {fileName:'dummyFilename__'}
    readSingle(data.fileName, callback)
  });

  test('Update a book', done => {
    function callback(err) {
      try {
        expect(err).toBe(false);
        done();

      } catch (error) {
        done(error);
      }
    }
    const data = {fileName:'dummyFilename__',copies:432,price:300000}
    update("o2ua9o2h1uyq582put2hllwaq0ekj1",data.fileName, callback)
  });


    test('Fail to Update a book', done => {
    function callback(err) {
      try {
        expect(err).toBe("Book not found");
        done();

      } catch (error) {
        done(error);
      }
    }
    const data = {fileName:'dummyFilename__',copies:432,price:300000}
    update("o2ua9o2h1uyq582putcc2hllwaq0ekj1",data.fileName, callback)
  });

test('Should delete a book', done => {
  function callback(err) {
    try {
      expect(err).toBe(false);
      done();

    } catch (error) {
      done(error);
    }
  }
  const data = {fileName:'dummyFilename'}
  deleteBook(data.fileName, callback)
});

test('Should read all bokks', done => {
  function callback(err,data) {
    try {
      expect(err).toBe(false)
      done()
    } catch (error){
      done(error)
    }
  }
  readAll(callback)
})

test('Fail to create a book', done => {
  function callback(err,data) {
    try {
      expect(err).toBe(true);
      done();
    } catch (error) {
      done(error);
    }
  }
  const data = {}
  create(data, callback)
});

test('Should create a new user', done => {
  function callback(err,data) {
    try {
      expect(err).toBe(false);
      done();
    } catch (error) {
      done(error);
    }
  }
  const data = {_id:"vlogtmk2nk4mlnhsb7xqlm80o2j8o8456543"}
  createUser(data, callback)
});

test('Should fail to create a new user', done => {
  function callback(err,data) {
    try {
      expect(err).toBe("user data is required");
      done();
    } catch (error) {
      done(error);
    }
  }
  const data = undefined;
  createUser(data, callback)
});