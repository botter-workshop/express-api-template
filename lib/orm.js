var Sequelize = require('sequelize'),
    SequelizeImport = require('sequelize-import');

var env = process.env.NODE_ENV || 'development',
    environment = requireLocal('config.json').environments[env];    

var sequelize = new Sequelize(
    environment.database, 
    environment.username, 
    environment.password, 
    environment.options
);

var models = SequelizeImport(__dirname + '/models', sequelize);
models.sequelize = sequelize;

module.exports = models;