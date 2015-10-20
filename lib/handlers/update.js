var orm = requireLocal('lib/orm');

module.exports = function (name) {
    return function (req, res, next) {
        var body = req.body,
            model = orm[name];
        
        model
            .findById(req.params.id)
            .then(findByIdCallback)
            .catch(next);
            
        function findByIdCallback(row) {
            if (!row) {
                res.sendStatus(404);
            } else {
                row
                    .updateAttributes(body)
                    .then(updateAttributesCallback)
                    .catch(next);
            }
        }
        
        function updateAttributesCallback(row) {
            res.status(200).send(row);
        }
    };
};