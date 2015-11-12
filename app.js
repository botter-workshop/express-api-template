require('app-module-path').addPath(__dirname);

// NPM modules
var express = require('express'),
    jwt = require('express-jwt'),
    cors = require('cors'),
    bodyParser = require('body-parser');
    	
// Local modules
var config = require('config.json');

var env = process.env.NODE_ENV || 'development',
    environment = config.environments[env];    

// Setup Sequelize
require('lib/models').init(environment);
    	
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
	require('api/v1/auth'),
	require('api/v1/users'),
	// Protected Resources
	jwt(config.jwt),
	// Error Handling
	require('lib/middlewares/error')
]);

// Start Express
var server = app.listen(process.env.PORT || 8090, function () {
    var host = server.address().address,
        port = server.address().port;
    
    console.log('API listening at http://%s:%s', host, port);
});