module.exports = function (err, req, res, next) {
    console.log(err);
    if (err && err.status) {
        res.sendStatus(err.status);
    } else {
        res.sendStatus(500);
    }
};