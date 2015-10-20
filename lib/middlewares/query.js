var _ = require('lodash');
    
var config = requireLocal('config.json'),
    orm = requireLocal('lib/orm'),
    tools = requireLocal('lib/tools');

module.exports = function (name) {
    return function (req, res, next) {
        var model = orm[name],
            qs = tools.qs,
            query = {},
            keys = {};
        
        keys.model = _.keys(model.rawAttributes);
        keys.query = _.keys(req.query);
        keys.filters = _.intersection(keys.model, keys.query);
        
        query.attributes = qs.fields(req.query.fields);
        query.limit = qs.limit(req.query.limit) || config.settings.limit;
        query.offset = qs.offset(req.query.offset);
        query.order = qs.sort(req.query.sort);
        query.where = qs.filters(_.pick(req.query, keys.filters));
        
        query = _.omit(query, _.isNull);
        
        req.locals = req.locals || {};
        req.locals.query = query;
        
        next();
    };
};
