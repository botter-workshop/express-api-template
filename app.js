// Local module loader
global.requireLocal = function(name) {
    return require(__dirname + '/' + name);
};

// NPM modules
var express = require('express'),
    jwt = require('express-jwt'),
    cors = require('cors'),
    bodyParser = require('body-parser');
    	
// Local modules
var config = requireLocal('config.json');
    	
// Setup Express
var app = express();

app.use(cors());
app.use(bodyParser.json());
app.disable('x-powered-by');

// Setup Documentation
app.use('/api/docs', express.static(__dirname + '/apidoc'));

// Setup Resources
app.use('/api/v1', [
    // Anonymous Resources
	requireLocal('api/v1/resources/auth'),
	requireLocal('api/v1/resources/users'),
	// Protected Resources
	jwt(config.jwt),
	// Error Handling
	requireLocal('lib/middlewares').error
]);

// Start Express
var server = app.listen(process.env.PORT || 8090, function () {
    var host = server.address().address,
        port = server.address().port;
    
    console.log('API listening at http://%s:%s', host, port);
});