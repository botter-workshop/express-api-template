var bcrypt = require('bcryptjs'),
    jwt = require('jsonwebtoken'),
    router = require('express').Router();
    
var config = requireLocal('config.json'),
    middlewares = requireLocal('lib/middlewares'),
    orm = requireLocal('lib/orm'),
    schema = requireLocal('api/v1/resources/auth.json');

router.post('/auth', middlewares.jsonschema(schema), function (req, res, next) {
    var query = {},
        body = req.body;
    
    query.where = {
        name: body.name
    };
    
    orm.User
        .findOne(query)
        .then(respond)
        .catch(next);
    
    function respond(row) {
       var token;        

       if (!row) {
           res.sendStatus(404);
       } else {
           if (bcrypt.compareSync(body.secret, row.hash)) {
               row.hash = undefined;
               token = jwt.sign(row, config.jwt.secret);
               res.json({
                   token: token
               });
           } else {
               res.sendStatus(400);
           }
       }
    }
});

module.exports = router;