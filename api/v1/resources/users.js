var bcrypt = require('bcryptjs'),
    router = require('express').Router();
    
var orm = requireLocal('lib/orm');

router.post('/users', function (req, res, next) {
    var query = {},
        body = req.body;

    query.defaults = {
        hash: bcrypt.hashSync(body.secret, 8)
    };
    
    query.where = {
        name: body.name
    };
    
    orm.User
        .findOrCreate(query)
        .spread(respond)
        .catch(next);
        
    function respond(row, created) {
        if (created) {
            row.hash = undefined;
            res.status(201).send(row);
        } else {
            res.sendStatus(409);
        }
    }
});

module.exports = router;