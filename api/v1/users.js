var bcrypt = require('bcryptjs'),
    router = require('express').Router();
    
var models = require('../../lib/models');
    
router.post('/users', function (req, res, next) {
    var query = {},
        body = req.body;

    query.defaults = {
        hash: bcrypt.hashSync(body.password, 8)
    };
    
    query.where = {
        username: body.username
    };
    
    models.User
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