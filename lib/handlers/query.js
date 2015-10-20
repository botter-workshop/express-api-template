var orm = requireLocal('lib/orm');

module.exports = function (name) {
    return function (req, res, next) {
        var model = orm[name],
            query = req.locals.query;

        model
            .findAndCountAll(query)
            .then(findAndCountAllCallback)
            .catch(next);
            
        function findAndCountAllCallback(result) {
            var count = result.count,
                start = query.offset, 
                end = query.offset + query.limit;
            
            if (end >= count) {
                end = count;
                res.status(200);
            } else {
                res.status(206);
            }
            
            res.set('Content-Range', start + '-' + end + '/' + count);
            res.send(result.rows);
        }
    };
};