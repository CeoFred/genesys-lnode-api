const responseFactory = require('./routes/index');

const routeHandler = {};
routeHandler.resolve = (data, callback) => responseFactory(data,callback)


module.exports = routeHandler;