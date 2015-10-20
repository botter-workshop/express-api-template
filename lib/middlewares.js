var error = require('./middlewares/error'),
	jsonschema = require('./middlewares/jsonschema'),
	jwt  = require('./middlewares/jwt'),
	query = require('./middlewares/query');
	
var middlewares = {
	error: error,
	jsonschema: jsonschema,
	jwt: jwt,
	query: query
};

module.exports = middlewares;