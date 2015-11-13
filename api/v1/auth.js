var bcrypt = require('bcryptjs'),
    jwt = require('jsonwebtoken'),
    router = require('express').Router();
    
var models = require('../../lib/models');

router.post('/auth', function (req, res, next) {
    var query = {},
        app = req.app,
        body = req.body;
    
    query.where = {
        username: body.username
    };
    
    models.User
        .findOne(query)
        .then(respond)
        .catch(next);
    
    function respond(row) {
       var secret, token;        

       if (!row) {
           res.sendStatus(404);
       } else {
           if (bcrypt.compareSync(body.password, row.hash)) {
               row.hash = undefined;
               secret = app.get('jwt').secret;
               token = jwt.sign(row, secret);
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