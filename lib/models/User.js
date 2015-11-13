module.exports = function (sequelize, DataTypes) {
	return sequelize.define('user', {
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true, 
			autoIncrement: true
		},
		username: {
			type: DataTypes.STRING(40)
		},
		hash: {
			type: DataTypes.STRING(60)
		}
	}, { 
		timestamps: false
	});
};