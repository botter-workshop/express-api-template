module.exports = function (sequelize, DataTypes) {
	return sequelize.define('User', {
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true, 
			autoIncrement: true
		},
		name: {
			type: DataTypes.STRING(40)
		},
		hash: {
			type: DataTypes.STRING(60)
		}
	}, { 
		timestamps: false
	});
};