var orm = requireLocal('lib/orm');

module.exports = function (name) {
    return function (req, res, next) {
        var body = req.body,
            model = orm[name];
        
        model
            .create(body)
            .then(createCallback)
            .catch(next);
            
        function createCallback(row) {
            res.set('Location', req.path + '/' + row.id);
            res.status(201).send(row);
        }
    };
};