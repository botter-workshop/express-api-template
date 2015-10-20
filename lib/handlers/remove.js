var orm = requireLocal('lib/orm');

module.exports = function (name) {
    return function (req, res, next) {
        var model = orm[name];
        
        model
            .findById(req.params.id)
            .then(findByIdCallback)
            .catch(next);
            
        function findByIdCallback(row) {
            if (!row) {
                res.sendStatus(404);
            } else {
                row
                    .destroy()
                    .then(destroyCallback)
                    .catch(next);
            }
        }
        
        function destroyCallback(row) {
            res.sendStatus(204);
        }
    };
};