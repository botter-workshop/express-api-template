var jsonschema = require('jsonschema');

module.exports = function (schemas) {
    return function (req, res, next) {
        var body = req.body,
            schema = schemas[req.method][req.path];
        
        var errors = jsonschema.validate(body, schema).errors;
        if (errors.length > 0) {
            res.status(400).send(errors);
        } else {
            next();
        }
    };
};