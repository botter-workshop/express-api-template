var jwt = require('jsonwebtoken');
	
var config = requireLocal('config.json');

module.exports = function (req, res, next) {
	var header = req.headers.authorization,
		pattern = /^Bearer (\S+)$/,
		token;
	
	var match = pattern.exec(header);
	if (!match) {
		res.sendStatus(400);
		return;
	} else {
		token = match[1];
	}
	
	if (token) {
		jwt.verify(token, config.settings.secret, verifyCallback);
	} else {
		res.sendStatus(401);
	}
	
	function verifyCallback(err, dec) {
		if (err) {
			res.sendStatus(401);
		} else {
			next();
		}
	}
};