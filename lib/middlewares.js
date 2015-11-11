var error = require('./middlewares/error'),
	jsonschema = require('./middlewares/jsonschema');
	
var middlewares = {
	error: error,
	jsonschema: jsonschema
};

module.exports = middlewares;