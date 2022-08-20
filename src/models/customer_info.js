"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class customer_info extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
			customer_info.belongsTo(models.customer, {
				foreignKey: "customer_id",
				onDelete: "Cascade",
			});
		}
	}
	customer_info.init(
		{
			customer_id: {
				type: DataTypes.INTEGER,
				allowNull: false,
			},
			street_number: {
				type: DataTypes.INTEGER,
				allowNull: false,
			},
			street_name: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			suburb: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			postcode: {
				type: DataTypes.INTEGER,
				allowNull: false,
			},
			state: {
				type: DataTypes.STRING,
				allowNull: false,
			},
		},
		{
			sequelize,
			modelName: "customer_info",
		}
	);
	return customer_info;
};
