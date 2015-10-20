var _ = require('lodash'),
    Sequelize = require('sequelize'),
    SequelizeImport = require('sequelize-import');

var env = process.env.NODE_ENV || 'development',
    config = requireLocal('config.json')[env];    

var sequelize = new Sequelize(
    config.database, 
    config.username, 
    config.password, 
    config.options
);

var models = SequelizeImport(__dirname + '/models', sequelize);

module.exports = _.assign(models, {
    sequelize: sequelize
});