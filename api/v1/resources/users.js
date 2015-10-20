var bcrypt = require('bcryptjs'),
    router = require('express').Router();
    
var config = requireLocal('config.json'),
    orm = requireLocal('lib/orm');

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
        .spread(findOrCreateCallback)
        .catch(next);
        
    function findOrCreateCallback(row, created) {
        if (created) {
            res.send('Login created'); 
        } else {
            res.send('Login exists');
        }
    }
});

module.exports = router;