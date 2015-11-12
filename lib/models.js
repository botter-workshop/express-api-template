var _ = require('lodash'),
    Sequelize = require('sequelize'),
    SequelizeImport = require('sequelize-import');

var models = {};

models.init = function (environment) {
    models.sequelize = new Sequelize(
        environment.database, 
        environment.username, 
        environment.password, 
        environment.options
    );
    
    _.assign(models, SequelizeImport(__dirname + '/models', models.sequelize));
};

module.exports = models;